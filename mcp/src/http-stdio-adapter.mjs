import path from 'node:path';
import {promises as fs} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
import {Server} from '@modelcontextprotocol/server';
import {StdioServerTransport} from '@modelcontextprotocol/server/stdio';

export async function connectLocalService(workspace){
 const root=await fs.realpath(workspace),file=path.join(root,'local-service.json');
 if((await fs.lstat(file)).isSymbolicLink())throw new Error('Linked service credentials are not accepted.');
 const record=JSON.parse(await fs.readFile(file,'utf8')),url=new URL(record.origin);
 if(url.protocol!=='http:'||url.hostname!=='127.0.0.1'||url.pathname!=='/'||url.username||url.password||record.workspace!==root||record.contractVersion!==1||typeof record.token!=='string')throw new Error('Invalid local service identity.');
 const headers={Authorization:`Bearer ${record.token}`};
 const response=await fetch(new URL('/health',url),{headers,signal:AbortSignal.timeout(3000)});
 if(!response.ok)throw new Error('The existing local service is not reachable. Start the common launcher first.');
 const health=await response.json();
 if(health.instanceId!==record.instanceId||health.workspace!==root||health.appVersion!==record.appVersion||health.pid!==record.pid)throw new Error('Local service identity does not match the workspace owner.');
 const client=new Client({name:'super-furu-manga-stdio-adapter',version:'0.1.0'});
 await client.connect(new StreamableHTTPClientTransport(new URL('/mcp',url),{requestInit:{headers}}));
 return {client,record};
}
export async function runStdioAdapter(workspace){
 const server=new Server({name:'super-furu-manga-local-adapter',version:'0.1.0'},{capabilities:{tools:{},resources:{},prompts:{}}});
 // A running desktop client may outlive a local app update. Resolve the
 // verified workspace owner before dispatch, never replay a submitted action.
 function forward(method, invoke) {
  server.setRequestHandler(method, async request => {
   const {client}=await connectLocalService(workspace);
   try { return await invoke(client, request.params); }
   finally { await client.close(); }
  });
 }
 forward('tools/list',(c,p)=>c.listTools(p));
 forward('tools/call',(c,p)=>c.callTool(p));
 forward('resources/list',(c,p)=>c.listResources(p));
 forward('resources/templates/list',(c,p)=>c.listResourceTemplates(p));
 forward('resources/read',(c,p)=>c.readResource(p));
 forward('prompts/list',(c,p)=>c.listPrompts(p));
 forward('prompts/get',(c,p)=>c.getPrompt(p));
 const transport=new StdioServerTransport();
 await server.connect(transport);
 return server;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const i=process.argv.indexOf('--workspace');
 if(i<0){process.stderr.write('An explicit --workspace is required.\n');process.exitCode=1;}
 else await runStdioAdapter(process.argv[i+1]).catch(e=>{process.stderr.write(`Manga adapter: ${e.message}\n`);process.exitCode=1;});
}
