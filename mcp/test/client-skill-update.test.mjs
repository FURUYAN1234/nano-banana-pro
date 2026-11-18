import test from 'node:test';
import assert from 'node:assert/strict';
import {promises as fs} from 'node:fs';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {createHash} from 'node:crypto';
import http from 'node:http';
import {execFile,spawn} from 'node:child_process';
import {once} from 'node:events';
import {setTimeout as delay} from 'node:timers/promises';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';
import {syncClientSkills} from '../src/client-skill-update.mjs';

const repo=fileURLToPath(new URL('../../',import.meta.url));
const name='manga-book-production', prefix='mcp/skills/'+name+'/';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const run=promisify(execFile);
async function put(root,rel,data) {
  const dest=path.join(root,rel); await fs.mkdir(path.dirname(dest),{recursive:true}); await fs.writeFile(dest,data);
}
async function release(base,version,extra={}) {
  const root=path.join(base,'versions','v'+version);
  const data={
    'package.json':JSON.stringify({version,type:'module'}),
    'mcp/src/service.mjs':'// fixture','mcp/src/http-stdio-adapter.mjs':'// fixture','dist/index.html':'fixture',
    'mcp/src/client-skill-update.mjs':await fs.readFile(path.join(repo,'mcp/src/client-skill-update.mjs')),
    [prefix+'SKILL.md']:'approved edition '+version,
    [prefix+'compatibility.json']:JSON.stringify({repository:'FURUYAN1234/nano-banana-pro'}),
    [prefix+'references/rules.md']:'first read the complete diagnostics '+version,
    ...extra,
  };
  const files={};
  for(const [rel,bytes] of Object.entries(data)){await put(root,rel,bytes);files[rel]=hash(bytes);}
  const manifest=JSON.stringify({schemaVersion:1,algorithm:'sha256',files});
  await put(root,'SHA256SUMS.json',manifest);
  await put(root,'verified-install.json',JSON.stringify({repository:'FURUYAN1234/nano-banana-pro',tag:'v'+version,files:{...files,'SHA256SUMS.json':hash(manifest)}}));
  return root;
}
async function fixture(t) {
  const root=await fs.mkdtemp(path.join(process.env.MANGA_MCP_TEST_ROOT||tmpdir(),'furu-client-skill-'));
  t.after(()=>fs.rm(root,{recursive:true,force:true}));
  return root;
}

test('install, upgrade with local edits, same-version preservation, recovery and downgrade',async t=>{
  const root=await fixture(t),home=path.join(root,'user'),client=path.join(home,'.codex/skills',name);
  const first=await release(root,'8.0.4',{[prefix+'references/retired.md']:'old'});
  const next=await release(root,'8.0.5');
  const sync=app=>syncClientSkills(app,{home,env:{},report(){}});
  assert.deepEqual(await sync(first),[]);
  await fs.mkdir(path.join(home,'.codex'),{recursive:true});
  assert.equal((await sync(first))[0].status,'installed');
  await put(client,'SKILL.md','local additions'); await put(client,'my-notes.md','personal');
  assert.equal((await sync(first))[0].status,'current');
  const [updated]=await sync(next);
  assert.equal(updated.status,'updated');
  assert.equal(await fs.readFile(path.join(updated.backup,'SKILL.md'),'utf8'),'local additions');
  assert.equal(await fs.readFile(path.join(client,'my-notes.md'),'utf8'),'personal');
  assert.equal(await fs.readFile(path.join(client,'SKILL.md'),'utf8'),'approved edition 8.0.5');
  assert.ok(!(await fs.readdir(path.join(client,'references'))).includes('retired.md'));
  assert.equal((await sync(first))[0].status,'newer-kept');
  const pending=path.join(path.dirname(updated.backup),'previous-pending');
  await fs.rename(client,pending);
  assert.equal((await sync(next))[0].status,'current');
  assert.equal(await fs.readFile(path.join(client,'SKILL.md'),'utf8'),'approved edition 8.0.5');
  await put(next,prefix+'references/rules.md','changed after installation');
  await assert.rejects(sync(next),/differs from its package/);
  assert.equal(await fs.readFile(path.join(client,'references/rules.md'),'utf8'),'first read the complete diagnostics 8.0.5');
});

test('existing clients, a custom skill directory, unrelated contents and concurrent launches',async t=>{
  const root=await fixture(t),home=path.join(root,'home'),app=await release(root,'8.0.5');
  const targets=['.agents','.claude'].map(folder=>path.join(home,folder,'skills',name));
  for(const target of targets)await put(target,'compatibility.json',JSON.stringify({repository:'FURUYAN1234/nano-banana-pro'}));
  assert.equal((await syncClientSkills(app,{home,env:{},report(){}})).filter(r=>r.status==='updated').length,2);
  const custom=path.join(root,'custom skill directory');
  const options={home,env:{FURU_MANGA_SKILL_ROOT:custom},report(){}};
  await put(custom,name+'/SKILL.md','someone else');
  assert.equal((await syncClientSkills(app,options))[0].status,'failed');
  assert.equal(await fs.readFile(path.join(custom,name,'SKILL.md'),'utf8'),'someone else');
  const fresh={...options,env:{FURU_MANGA_SKILL_ROOT:path.join(root,'fresh')}};
  const pair=await Promise.all([syncClientSkills(app,fresh),syncClientSkills(app,fresh)]);
  assert.deepEqual(pair.map(r=>r[0].status).sort(),['current','installed']);
});

test('the distributed skill and all reference files reach the client byte-for-byte',async t=>{
  const root=await fixture(t),source=path.join(repo,prefix),custom=path.join(root,'skills');
  const skillFiles={};
  for(const relative of await fs.readdir(source,{recursive:true})){
    const file=path.join(source,relative);
    if((await fs.lstat(file)).isFile())skillFiles[prefix+relative.split(path.sep).join('/')]=await fs.readFile(file);
  }
  const app=await release(root,'8.0.5',skillFiles);
  const [result]=await syncClientSkills(app,{env:{FURU_MANGA_SKILL_ROOT:custom},report(){}});
  assert.equal(result.status,'installed');
  for(const [key,content] of Object.entries(skillFiles)){
    assert.deepEqual(await fs.readFile(path.join(result.target,key.slice(prefix.length))),content);
  }
  const rules=await fs.readFile(path.join(result.target,'references/mcp-production.md'),'utf8');
  assert.match(rules,/全件JSON/);
  assert.match(rules,/詳細台本/);
});

test('Windows start_app.bat updates a client skill from a running app without starting or stopping it',{skip:process.platform!=='win32',timeout:30000},async t=>{
  const root=await fixture(t),app=await release(root,'8.0.5');
  await put(app,'src/lib/mcp/control-error.js',await fs.readFile(path.join(repo,'src/lib/mcp/control-error.js')));
  await fs.copyFile(path.join(repo,'mcp/src/workspace-lease.mjs'),path.join(app,'mcp/src/workspace-lease.mjs'));
  const server=http.createServer((req,res)=>{
    if(req.url!=='/health'||req.headers.authorization!=='Bearer fixture'){res.writeHead(404).end();return;}
    res.setHeader('Content-Type','application/json');res.end(JSON.stringify(record));
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve)); t.after(()=>new Promise(resolve=>server.close(resolve)));
  const workspace=path.join(root,'workspace');
  const record={instanceId:'fixture',pid:process.pid,appVersion:'8.0.5',token:'fixture',contractVersion:1,workspace,origin:'http://127.0.0.1:'+server.address().port};
  await put(workspace,'local-service.json',JSON.stringify(record));
  const custom=path.join(root,'client','skills'),batch=path.join(repo,'start_app.bat');
  const env={...process.env,FURU_MANGA_SKILL_ROOT:custom};delete env.PSModulePath;
  const {stderr}=await run('cmd.exe',['/d','/s','/c',`call "${batch}" -InstallRoot "${root}" -Workspace "${workspace}" -NoShortcut -NoOpen`],{windowsVerbatimArguments:true,windowsHide:true,env,timeout:20000});
  assert.match(stderr,/Reusing the running app/); assert.match(stderr,/FURU skill v8\.0\.5 \[installed\]/);
  assert.equal(await fs.readFile(path.join(custom,name,'SKILL.md'),'utf8'),'approved edition 8.0.5');
  assert.equal(await fs.readFile(path.join(custom,name,'references/rules.md'),'utf8'),'first read the complete diagnostics 8.0.5');
});

test('the first launch from an older Windows bootstrap synchronizes the freshly installed edition', {skip:process.platform!=='win32',timeout:30000}, async t=>{
  const root=await fixture(t);
  const app=await release(root,'8.0.5',{'mcp/src/service.mjs':await fs.readFile(path.join(repo,'mcp/src/service.mjs'))});
  await fs.cp(path.join(repo,'mcp/src'),path.join(app,'mcp/src'),{recursive:true});
  await fs.cp(path.join(repo,'src/lib'),path.join(app,'src/lib'),{recursive:true});
  await fs.cp(path.join(repo,'src/config'),path.join(app,'src/config'),{recursive:true});
  await fs.copyFile(path.join(repo,'mcp/package.json'),path.join(app,'mcp/package.json'));
  for(const dir of ['node_modules','mcp/node_modules']){
    await fs.symlink(path.join(repo,dir),path.join(app,dir),'junction');
  }
  const service=path.join(app,'mcp/src/service.mjs'),workspace=path.join(root,'workspace'),downloads=path.join(root,'downloads');
  const custom=path.join(root,'client','skills');
  await fs.mkdir(downloads);
  const child=spawn(process.execPath,[service,'--workspace',workspace,'--port','0','--downloads',downloads],{
    env:{...process.env,FURU_MANGA_SKILL_ROOT:custom},stdio:['ignore','ignore','pipe'],windowsHide:true,
  });
  let stderr='';child.stderr.on('data',chunk=>{stderr+=chunk.toString();});
  const ended=once(child,'exit');
  try{
    const marker=path.join(custom,name,'.super-furu-skill.json');
    for(let i=0;i<100 && child.exitCode===null;i++){
      if(await fs.access(marker).then(()=>true,()=>false))break;
      await delay(100);
    }
    assert.match(stderr,/Manga local service ready:/);
    assert.equal(JSON.parse(await fs.readFile(marker,'utf8')).tag,'v8.0.5',stderr);
    const record=JSON.parse(await fs.readFile(path.join(workspace,'local-service.json'),'utf8'));
    assert.equal(record.workspace,workspace);
    assert.equal(record.appVersion,'8.0.5');
  }finally{
    if(child.exitCode===null)child.kill();
    await ended;
    for(const dir of ['node_modules','mcp/node_modules'])await fs.unlink(path.join(app,dir));
  }
});
