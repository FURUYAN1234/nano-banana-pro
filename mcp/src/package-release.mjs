import path from 'node:path';
import {promises as fs} from 'node:fs';
import {createHash,randomUUID} from 'node:crypto';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {readRuntimeBuild} from './runtime-build.mjs';

const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
function command(command,args,{cwd,input,env}={}){
 return new Promise((resolve,reject)=>{const child=spawn(command,args,{cwd,env,stdio:['pipe','pipe','pipe'],windowsHide:true});let output='',error='';child.stdout.on('data',data=>output+=data);child.stderr.on('data',data=>{error=(error+data).slice(-8192);});child.once('error',reject);child.once('exit',code=>code===0?resolve(output):reject(new Error(error||`${command} exited ${code}`)));child.stdin.on('error',()=>{});child.stdin.end(input);});
}
export async function assertReleaseCheckoutBytes(root,files,{gitEnv}={}){
 if((await command('git',['rev-parse','--is-inside-work-tree'],{cwd:root,env:gitEnv})).trim()!=='true')throw new Error('Package from a trusted Git working tree with .gitattributes.');
 const input=files.map(file=>{if(/[\r\n]/.test(file.name))throw new Error('Release entry names must not contain newlines.');return file.name;}).join('\n')+'\n';
 // Git applies the actual .gitattributes clean rules, including exact-byte -text
 // exceptions. No object is written, and no package byte is silently converted.
 const filtered=(await command('git',['hash-object','--stdin-paths'],{cwd:root,input,env:gitEnv})).trim().split(/\r?\n/);
 const raw=(await command('git',['hash-object','--no-filters','--stdin-paths'],{cwd:root,input,env:gitEnv})).trim().split(/\r?\n/);
 if(filtered.length!==files.length||raw.length!==files.length)throw new Error('Git source-byte inspection was incomplete. Package from the reviewed Git checkout.');
 const changed=files.filter((_,index)=>filtered[index]!==raw[index]).map(file=>file.name);
 if(changed.length)throw new Error(`Release bytes differ from Git check-in form; normalize the working tree per .gitattributes, then rebuild and stamp before packaging: ${changed.join(', ')}`);
}
export function packageManifest(files){
 const entries={};const folded=new Set();
 for(const file of [...files].sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0)){
  if(file.name==='SHA256SUMS.json'||file.name.startsWith('/')||/[\\:\r\n\0]/.test(file.name)||file.name.split('/').some(part=>!part||part==='.'||part==='..')||folded.has(file.name.toLowerCase())||!/^[a-f0-9]{64}$/.test(file.sha256))throw new Error('Unsafe or duplicate package manifest entry.');
  entries[file.name]=file.sha256;folded.add(file.name.toLowerCase());
 }
 return {schemaVersion:1,algorithm:'sha256',files:entries};
}
export function releasePackageSets(files){
 const skillPrefix='mcp/skills/manga-book-production/';
 const helper=files.find(file=>file.name==='scripts/verify_package.py');if(!helper)throw new Error('The strict package verifier must be included.');
 const verifier={...helper,name:'verify_package.py'};
 return [{name:'SuperFURU-Manga-MCP.zip',files:[...files,verifier]},
  {name:'SuperFURU-Manga-Skill.zip',files:[...files.filter(file=>file.name.startsWith(skillPrefix)).map(file=>({...file,name:file.name.slice(skillPrefix.length)})),verifier]}];
}
export async function collectReleaseFiles(root){
 const files=[];
 async function walk(relative){
  const location=path.join(root,relative),stat=await fs.lstat(location);
  if(stat.isSymbolicLink())throw new Error('Release packages cannot contain linked source paths.');
  if(stat.isDirectory()){
   for(const entry of (await fs.readdir(location)).sort()){
    if(entry==='node_modules'||entry.startsWith('.')&&!['.nojekyll','.gitattributes'].includes(entry))continue;
    await walk(path.join(relative,entry));
   }
  }else if(stat.isFile()){
   if(/(?:^|[\\/])(?:local-service|project|manifest|credentials|api-key)\.json$/i.test(relative))throw new Error('Private production state is not a release input.');
   files.push({source:location,name:relative.replaceAll('\\','/'),sha256:sha(await fs.readFile(location))});
  }
 }
 for(const name of ['src','public','dist','docs/assets','docs/licenses','mcp/src','mcp/test','mcp/skills','mcp/package.json','mcp/package-lock.json','mcp/README.md','mcp/ARCHITECTURE.md','package.json','package-lock.json','index.html','vite.config.js','postcss.config.js','tailwind.config.js','eslint.config.js','start_app.bat','README.md','LICENSE','LICENSE-CONTENT.md','THIRD_PARTY_NOTICES.md','.gitattributes'])await walk(name);
 for(const name of ['install_mcp_dependencies.mjs','web-security.mjs','generate_workflow_diagram.mjs','verify_package.py'])await walk('scripts/'+name);
 return files;
}
export async function packageRelease({appRoot=fileURLToPath(new URL('../../',import.meta.url)),outputDirectory}){
 if(!outputDirectory||!path.isAbsolute(outputDirectory))throw new Error('An explicit absolute output directory is required.');
 const build=await readRuntimeBuild(appRoot,path.join(appRoot,'dist'));
 if(!build.current)throw new Error('Build and stamp the current runtime before packaging.');
 const files=await collectReleaseFiles(appRoot);await assertReleaseCheckoutBytes(appRoot,files);const version=JSON.parse(await fs.readFile(path.join(appRoot,'package.json'),'utf8')).version;
 if(build.appVersion!==version||build.contractVersion!==1)throw new Error('Package and runtime contracts differ.');
 await fs.mkdir(outputDirectory,{recursive:true});
 if((await fs.lstat(outputDirectory)).isSymbolicLink())throw new Error('Linked package output is not allowed.');
 const sets=releasePackageSets(files);
 const results=[];
 for(const set of sets){
  const output=path.join(outputDirectory,set.name);
  try{await fs.access(output);throw new Error('Use a new output directory; existing packages are preserved.');}catch(e){if(e.code!=='ENOENT')throw e;}
  const key=randomUUID(),inventory=path.join(outputDirectory,`.${key}.json`),pending=path.join(outputDirectory,`.${key}.pending`),manifestFile=path.join(outputDirectory,`.${key}.manifest`);
  const manifestBytes=Buffer.from(JSON.stringify(packageManifest(set.files),null,2)+'\n');await fs.writeFile(manifestFile,manifestBytes,{flag:'wx'});set.files=[...set.files,{source:manifestFile,name:'SHA256SUMS.json',sha256:sha(manifestBytes)}];
  await fs.writeFile(inventory,JSON.stringify({output:pending,files:set.files}),{flag:'wx'});
  await new Promise((resolve,reject)=>{
   const child=spawn('powershell.exe',['-NoProfile','-File',fileURLToPath(new URL('./package-release.ps1',import.meta.url)),'-Inventory',inventory],{stdio:['ignore','ignore','pipe'],windowsHide:true});let error='';
   child.stderr.on('data',d=>{error+=d.toString();});child.once('error',reject);child.once('exit',code=>code===0?resolve():reject(new Error(error||'Package creation failed.')));
  });
  await fs.rename(pending,output);await fs.unlink(inventory);await fs.unlink(manifestFile);
  results.push({file:output,name:set.name,version,contractVersion:1,files:set.files.length,sha256:sha(await fs.readFile(output))});
 }
 await fs.writeFile(path.join(outputDirectory,'package-receipt.json'),JSON.stringify({version,contractVersion:1,runtimeFingerprint:build.fingerprint,assets:results},null,2),{flag:'wx'});
 return results;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const at=process.argv.indexOf('--out');
 try{console.log(JSON.stringify(await packageRelease({outputDirectory:at<0?undefined:process.argv[at+1]}),null,2));}catch(e){console.error(e.message);process.exitCode=1;}
}
