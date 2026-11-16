import test from 'node:test';
import assert from 'node:assert/strict';
import {promises as fs} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {StdioClientTransport} from '@modelcontextprotocol/client/stdio';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
import {startMangaService} from '../src/service.mjs';

test('one authenticated HTTP service serves official SDK clients and refuses hostile origins and second owners',async()=>{
 const root=process.env.MANGA_MCP_TEST_ROOT||os.tmpdir();await fs.mkdir(root,{recursive:true});
 const workspace=await fs.mkdtemp(path.join(root,'manga-http-'));
 const downloads=path.join(workspace,'downloads');await fs.mkdir(downloads);
 let service,client,adapter;
 try{
  service=await startMangaService({workspace,port:0,downloadsDirectory:downloads});
  const origin=service.bridge.origin,token=service.record.token;
  assert.equal((await fetch(origin+'/health')).status,401);
  assert.equal((await fetch(origin+'/health',{headers:{Authorization:`Bearer ${token}`,Origin:'https://unrelated.example'}})).status,403);
  const health=await(await fetch(origin+'/health',{headers:{Authorization:`Bearer ${token}`}})).json();
  assert.equal(health.instanceId,service.record.instanceId);assert.equal(health.workspace,await fs.realpath(workspace));
  await assert.rejects(startMangaService({workspace,port:0,downloadsDirectory:downloads}),e=>e.code==='WORKSPACE_BUSY');
  client=new Client({name:'local-http-regression',version:'1.0.0'});
  await client.connect(new StreamableHTTPClientTransport(new URL(origin+'/mcp'),{requestInit:{headers:{Authorization:`Bearer ${token}`}}}));
  const tools=await client.listTools();assert.ok(tools.tools.some(t=>t.name==='manga_project_create'));
  adapter=new Client({name:'stdio-to-same-owner',version:'1.0.0'});
  await adapter.connect(new StdioClientTransport({command:process.execPath,args:[fileURLToPath(new URL('../src/http-stdio-adapter.mjs',import.meta.url)),'--workspace',workspace],stderr:'inherit'}));
  assert.ok((await adapter.listTools()).tools.some(t=>t.name==='manga_project_create'));
  const caps=await client.callTool({name:'manga_capabilities',arguments:{}});assert.notEqual(caps.isError,true);
  await service.jobs.connect('browser-test',['read_state']);
  const refused=await fetch(origin+'/service/stop',{method:'POST',headers:{Authorization:`Bearer ${token}`}});
  assert.equal(refused.status,400);assert.equal((await refused.json()).error.code,'SERVICE_BUSY');
  await service.jobs.disconnect('browser-test');
  await adapter.close();adapter=null;await client.close();client=null;
  assert.equal((await fetch(origin+'/service/stop',{method:'POST',headers:{Authorization:`Bearer ${token}`}})).status,200);
  for(let i=0;i<40;i++){try{await fs.access(path.join(workspace,'local-service.json'));await new Promise(r=>setTimeout(r,10));}catch(e){if(e.code!=='ENOENT')throw e;break;}}
  await assert.rejects(fs.access(path.join(workspace,'local-service.json')),{code:'ENOENT'});
 }finally{await adapter?.close();await client?.close();await service?.close();await fs.rm(workspace,{recursive:true,force:true});}
});
