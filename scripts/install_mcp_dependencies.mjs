import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const [major,minor]=process.versions.node.split('.').map(Number);
if(!(major===20&&minor>=19||major===22&&minor>=12||major>22)) {
  process.stderr.write('This app build requires Node ^20.19.0 or >=22.12.0.\n');process.exit(1);
}
const cwd=fileURLToPath(new URL('../mcp/',import.meta.url));
const cli=process.env.npm_execpath;
const result=cli?spawnSync(process.execPath,[cli,'ci','--ignore-scripts'],{cwd,stdio:'inherit'}):spawnSync(process.platform==='win32'?'npm.cmd':'npm',['ci','--ignore-scripts'],{cwd,stdio:'inherit',shell:process.platform==='win32'});
if(result.error){process.stderr.write(`${result.error.message}\n`);process.exit(1);}process.exit(result.status??1);
