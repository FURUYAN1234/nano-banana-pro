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
 const {client}=await connectLocalService(workspace);
 const server=new Server({name:'super-furu-manga-local-adapter',version:'0.1.0'},{capabilities:{tools:{},resources:{},prompts:{}}});
 server.setRequestHandler('tools/list',r=>client.listTools(r.params));
 server.setRequestHandler('tools/call',r=>client.callTool(r.params));
 server.setRequestHandler('resources/list',r=>client.listResources(r.params));
 server.setRequestHandler('resources/templates/list',r=>client.listResourceTemplates(r.params));
 server.setRequestHandler('resources/read',r=>client.readResource(r.params));
 server.setRequestHandler('prompts/list',r=>client.listPrompts(r.params));
 server.setRequestHandler('prompts/get',r=>client.getPrompt(r.params));
 const transport=new StdioServerTransport();
 await server.connect(transport);
 const onclose=transport.onclose;transport.onclose=()=>{onclose?.();void client.close();};
 return server;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const i=process.argv.indexOf('--workspace');
 if(i<0){process.stderr.write('An explicit --workspace is required.\n');process.exitCode=1;}
 else await runStdioAdapter(process.argv[i+1]).catch(e=>{process.stderr.write(`Manga adapter: ${e.message}\n`);process.exitCode=1;});
}
