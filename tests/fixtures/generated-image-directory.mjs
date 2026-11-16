import {promises as fs} from 'node:fs';import path from 'node:path';import os from 'node:os';
const missing=()=>new DOMException('Missing fixture entry','NotFoundError');
export async function directoryFixture({failWrite}={}){
 const base=process.env.MANGA_MCP_TEST_ROOT||os.tmpdir();await fs.mkdir(base,{recursive:true});const root=await fs.mkdtemp(path.join(base,'normal-save-'));
 function directory(dir){return {kind:'directory',name:path.basename(dir),fixturePath:dir,isSameEntry:async other=>other.fixturePath===dir,queryPermission:async()=> 'granted',getDirectoryHandle:async(name,options={})=>{const p=path.join(dir,name);try{await fs.stat(p);}catch(error){if(error.code!=='ENOENT')throw error;if(!options.create)throw missing();await fs.mkdir(p);}return directory(p);},getFileHandle:async(name,options={})=>{const p=path.join(dir,name);try{await fs.stat(p);}catch(error){if(error.code!=='ENOENT')throw error;if(!options.create)throw missing();await fs.writeFile(p,'',{flag:'wx'});}return {name,getFile:async()=>new Blob([await fs.readFile(p)]),createWritable:async()=>{let bytes;return {write:async(blob)=>{await failWrite?.(name);bytes=Buffer.from(await blob.arrayBuffer());},close:async()=>fs.writeFile(p,bytes),abort:async()=>{bytes=null;}};}};}};}
 return {root,handle:directory(root)};
}
