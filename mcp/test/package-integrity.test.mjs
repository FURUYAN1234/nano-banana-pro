import test from'node:test';import assert from'node:assert/strict';import{promises as fs}from'node:fs';import path from'node:path';import os from'node:os';import{spawnSync}from'node:child_process';import{createHash}from'node:crypto';import{fileURLToPath}from'node:url';
import{packageManifest,assertReleaseCheckoutBytes,releasePackageSets}from'../src/package-release.mjs';
const helper=fileURLToPath(new URL('../../scripts/verify_package.py',import.meta.url)),sha=bytes=>createHash('sha256').update(bytes).digest('hex');
async function fixture(){const root=await fs.mkdtemp(path.join(process.env.MANGA_MCP_TEST_ROOT||os.tmpdir(),'strict-package-'));await fs.copyFile(helper,path.join(root,'verify_package.py'));await fs.writeFile(path.join(root,'data.txt'),'exact payload\n');return root;}
async function manifest(root){const files=[];for(const name of ['data.txt','verify_package.py'])files.push({name,sha256:sha(await fs.readFile(path.join(root,name)))});await fs.writeFile(path.join(root,'SHA256SUMS.json'),JSON.stringify(packageManifest(files),null,2)+'\n');return files;}
function verify(root){return spawnSync('python',[path.join(root,'verify_package.py'),root,'--strict'],{encoding:'utf8',windowsHide:true});}
test('strict extracted verification rejects absent manifest/missing/extra/hash mismatch and accepts exact set',async()=>{const root=await fixture();try{
 assert.notEqual(verify(root).status,0,'manifest missing must fail before packaging fix');
 const files=await manifest(root),first=await fs.readFile(path.join(root,'SHA256SUMS.json'));assert.equal(verify(root).status,0);assert.deepEqual(packageManifest(files),packageManifest([...files].reverse()));assert.doesNotMatch(first.toString(),/generatedAt|builtAt|timestamp/);
 await fs.unlink(path.join(root,'data.txt'));assert.notEqual(verify(root).status,0);await fs.writeFile(path.join(root,'data.txt'),'exact payload\n');
 await fs.writeFile(path.join(root,'extra.txt'),'unexpected');assert.notEqual(verify(root).status,0);await fs.unlink(path.join(root,'extra.txt'));
 await fs.writeFile(path.join(root,'data.txt'),'changed');assert.notEqual(verify(root).status,0);await fs.writeFile(path.join(root,'data.txt'),'exact payload\n');assert.equal(verify(root).status,0);
 await fs.writeFile(path.join(root,'SHA256SUMS.json'),JSON.stringify({schemaVersion:1,algorithm:'sha256',files:{'../escape':sha('x')}}));assert.notEqual(verify(root).status,0);
 }finally{await fs.rm(root,{recursive:true,force:true});}});
test('manifest refuses self hash, duplicate/case collision and nonportable traversal entries',()=>{
 for(const names of [['SHA256SUMS.json'],['../x'],['C:/outside'],['a\\b'],['a','a'],['File.txt','file.txt']])assert.throws(()=>packageManifest(names.map(name=>({name,sha256:sha('x')}))),/Unsafe or duplicate/);
});
test('Git attribute byte guard rejects CRLF check-in conversion but keeps exact-byte exceptions untouched',async()=>{
 const root=await fs.mkdtemp(path.join(process.env.MANGA_MCP_TEST_ROOT||os.tmpdir(),'git-package-bytes-'));try{
 const init=spawnSync('git',['init','-q',root],{encoding:'utf8',windowsHide:true});assert.equal(init.status,0,init.stderr);
 await fs.writeFile(path.join(root,'.gitattributes'),'* text=auto eol=lf\nexact.txt -text\n');await fs.writeFile(path.join(root,'text.txt'),'line\r\n');await fs.writeFile(path.join(root,'exact.txt'),'exact\r\n');const files=[{name:'text.txt'},{name:'exact.txt'}],gitEnv={...process.env,GIT_CONFIG_COUNT:'1',GIT_CONFIG_KEY_0:'safe.directory',GIT_CONFIG_VALUE_0:root};
 await assert.rejects(assertReleaseCheckoutBytes(root,files,{gitEnv}),/differ from Git check-in form/);await fs.writeFile(path.join(root,'text.txt'),'line\n');await assertReleaseCheckoutBytes(root,files,{gitEnv});assert.equal(await fs.readFile(path.join(root,'exact.txt'),'utf8'),'exact\r\n');
 }finally{await fs.rm(root,{recursive:true,force:true});}
});

test('actual app and skill ZIP layouts embed a complete manifest and runnable strict verifier',async()=>{
 const root=await fixture();try{
 const skill=path.join(root,'SKILL.md');await fs.writeFile(skill,'Fixture skill\n');
 const files=[{source:helper,name:'scripts/verify_package.py',sha256:sha(await fs.readFile(helper))},{source:path.join(root,'data.txt'),name:'public/example.txt',sha256:sha(await fs.readFile(path.join(root,'data.txt')))},{source:skill,name:'mcp/skills/manga-book-production/SKILL.md',sha256:sha(await fs.readFile(skill))}];
 for(const [index,set]of releasePackageSets(files).entries()){
  const manifestFile=path.join(root,`manifest-${index}.json`),content=Buffer.from(JSON.stringify(packageManifest(set.files),null,2)+'\n');await fs.writeFile(manifestFile,content);
  const inventory=path.join(root,`inventory-${index}.json`),zip=path.join(root,set.name);await fs.writeFile(inventory,JSON.stringify({output:zip,files:[...set.files,{source:manifestFile,name:'SHA256SUMS.json',sha256:sha(content)}]}));
  const packed=spawnSync('powershell.exe',['-NoProfile','-NonInteractive','-File',fileURLToPath(new URL('../src/package-release.ps1',import.meta.url)),'-Inventory',inventory],{encoding:'utf8',windowsHide:true});assert.equal(packed.status,0,packed.stderr);
  const extracted=path.join(root,`extracted-${index}`);const unpack=spawnSync('python',['-c','import zipfile,sys; zipfile.ZipFile(sys.argv[1]).extractall(sys.argv[2])',zip,extracted],{encoding:'utf8',windowsHide:true});assert.equal(unpack.status,0,unpack.stderr);assert.equal(verify(extracted).status,0);
  const list=JSON.parse(await fs.readFile(path.join(extracted,'SHA256SUMS.json'),'utf8'));assert.equal(Object.keys(list.files).length,set.files.length);assert.ok(list.files['verify_package.py']);assert.equal(list.files['SHA256SUMS.json'],undefined);
  await fs.writeFile(path.join(extracted,'unlisted.txt'),'unexpected');assert.notEqual(verify(extracted).status,0);
 }
 }finally{await fs.rm(root,{recursive:true,force:true});}
});
