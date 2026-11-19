import path from 'node:path';
import {promises as fs} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {randomBytes,randomUUID} from 'node:crypto';
import {createMcpHandler} from '@modelcontextprotocol/server';
import {toNodeHandler} from '@modelcontextprotocol/node';
import {ProjectStore} from './store.mjs';
import {JobQueue} from './jobs.mjs';
import {acquireWorkspaceLease} from './workspace-lease.mjs';
import {startBridge} from './bridge.mjs';
import {createMangaMcpServer} from './server.mjs';
import {verifyProductionRuntime} from './runtime-build.mjs';

// One owner for HTTP clients and stdio adapters. This token authorizes only the
// local service; provider credentials remain inside the browser session.
export async function startMangaService({workspace,port=45931,downloadsDirectory,appRoot=fileURLToPath(new URL('../../',import.meta.url))}){
 if(!workspace||!path.isAbsolute(workspace))throw new Error('An absolute --workspace is required.');
 if(downloadsDirectory&&(!path.isAbsolute(downloadsDirectory)||(await fs.lstat(downloadsDirectory)).isSymbolicLink()||!(await fs.stat(downloadsDirectory)).isDirectory()))throw new Error('--downloads must be an existing absolute non-linked directory.');
 const version=JSON.parse(await fs.readFile(path.join(appRoot,'package.json'),'utf8')).version;
 await verifyProductionRuntime(workspace,appRoot,version);
 const store=await new ProjectStore(workspace).init();
 const lease=await acquireWorkspaceLease(store.root);
 let bridge,closeService;
 try{
  const jobs=await new JobQueue(store,{downloadsDirectory}).init();
  const token=randomBytes(32).toString('base64url'),instanceId=randomUUID();
  const handle=toNodeHandler(createMcpHandler(()=>createMangaMcpServer(store,{jobs,bridge})),{maxRequestBodySize:72_000_000});
  const identity={format:1,instanceId,workspace:store.root,appVersion:version,contractVersion:1,pid:process.pid};
  const connected=()=>Boolean(jobs.client&&Date.now()-jobs.client.seenAt<180000);
  const activeJobs=()=>[...jobs.jobs.values()].filter(j=>['running','cancelling'].includes(j.state)).length;
  bridge=await startBridge({store,jobs,appRoot,distDirectory:path.join(appRoot,'dist'),port,mcpHttp:{token,handle,
   health:()=>({...identity,connected:connected(),activeJobs:activeJobs()}),
   assertCanStop:()=>jobs.prepareShutdown(),
   stop:()=>closeService()}});
  const record={...identity,origin:bridge.origin,token};
  const stateFile=path.join(store.root,'local-service.json');
  await store.atomic(stateFile,record);
  let closed=false;
  closeService=async()=>{if(closed)return;closed=true;await bridge.close();
   try{const current=JSON.parse(await fs.readFile(stateFile,'utf8'));if(current.instanceId===instanceId)await fs.unlink(stateFile);}catch(e){if(e.code!=='ENOENT')throw e;}
   finally{await lease.close();}
  };
  return {store,jobs,bridge,record,close:closeService};
 }catch(e){await bridge?.close();await lease.close();throw e;}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const arg=name=>{const i=process.argv.indexOf(name);return i<0?undefined:process.argv[i+1];};
 try{
  const service=await startMangaService({workspace:arg('--workspace'),port:Number(arg('--port')??45931),downloadsDirectory:arg('--downloads')});
  process.stderr.write(`Manga local service ready: ${service.bridge.origin}\n`);
  for(const signal of ['SIGINT','SIGTERM'])process.once(signal,()=>{void service.close().then(()=>process.exit(0));});
  // An older launcher installs the verified release and starts this new service
  // in the same invocation. Give that first upgrade the same skill update.
  if(process.platform==='win32'&&!process.argv.includes('--client-skill-checked')){
   const root=fileURLToPath(new URL('../../',import.meta.url));
   try{
    await fs.access(path.join(root,'verified-install.json'));
    const {syncClientSkills}=await import('./client-skill-update.mjs');
    await syncClientSkills(root);
   }catch(error){if(error.code!=='ENOENT')process.stderr.write('FURU skill update: '+error.message+'\n');}
  }
 }catch(e){process.stderr.write(`Manga service startup: ${e.message}\n`);process.exitCode=1;}
}
