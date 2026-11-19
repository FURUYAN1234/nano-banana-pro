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
  await client.close();client=null;
  assert.equal((await fetch(origin+'/service/stop',{method:'POST',headers:{Authorization:`Bearer ${token}`}})).status,200);
  for(let i=0;i<40;i++){try{await fs.access(path.join(workspace,'local-service.json'));await new Promise(r=>setTimeout(r,10));}catch(e){if(e.code!=='ENOENT')throw e;break;}}
  await assert.rejects(fs.access(path.join(workspace,'local-service.json')),{code:'ENOENT'});
  service=await startMangaService({workspace,port:0,downloadsDirectory:downloads});
  const restarted=await adapter.callTool({name:'manga_capabilities',arguments:{}});
  assert.notEqual(restarted.isError,true);
  assert.equal(restarted.structuredContent.connection.status,'not_connected');
 }finally{await adapter?.close();await client?.close();await service?.close();await fs.rm(workspace,{recursive:true,force:true});}
});

test('explicit local MCP pairing transfers only an idle browser and revokes its former session',async()=>{
 const root=process.env.MANGA_MCP_TEST_ROOT||os.tmpdir();
 await fs.mkdir(root,{recursive:true});
 const workspace=await fs.mkdtemp(path.join(root,'manga-handover-'));
 await fs.mkdir(path.join(workspace,'downloads'));
 let service,client;
 try{
  service=await startMangaService({workspace,port:0,downloadsDirectory:path.join(workspace,'downloads')});
  const {origin,token}=service.record;
  client=new Client({name:'local-handover-regression',version:'1.0.0'});
  await client.connect(new StreamableHTTPClientTransport(new URL('/mcp',origin),{requestInit:{headers:{Authorization:`Bearer ${token}`}}}));
  const makeOffer=async (args={})=>{
   const result=await client.callTool({name:'manga_connection',arguments:args});
   assert.notEqual(result.isError,true);
   return new URLSearchParams(new URL(result.structuredContent.url).hash.slice(1)).get('mcp');
  };
  const post=(route,key,body)=>fetch(new URL('/mcp-bridge/'+route,origin),{
   method:'POST',headers:{Origin:origin,Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify(body),
  });
  const body=clientId=>({clientId,contractVersion:1,operations:['read_state']});
  const old=await post('connect',await makeOffer(),body('visible-old'));
  assert.equal(old.status,200);
  const oldSession=(await old.json()).token;
  const ordinary=await post('connect',await makeOffer(),{...body('visible-new'),replaceIdle:true});
  assert.equal((await ordinary.json()).error.code,'BROWSER_ALREADY_CONNECTED');
  assert.equal((await post('heartbeat',oldSession,{})).status,200);

  const handover=await post('connect',await makeOffer({replaceIdle:true}),body('visible-new'));
  assert.equal(handover.status,200);
  const newSession=(await handover.json()).token;
  assert.equal((await post('heartbeat',newSession,{})).status,200);
  assert.equal((await post('heartbeat',oldSession,{})).status,401);
  assert.equal(service.jobs.client.id,'visible-new');
  assert.equal(service.jobs.jobs.size,0);
 }finally{await client?.close();await service?.close();await fs.rm(workspace,{recursive:true,force:true});}
});
