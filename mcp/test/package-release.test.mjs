import test from 'node:test';
import assert from 'node:assert/strict';
import {promises as fs} from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {collectReleaseFiles} from '../src/package-release.mjs';

const sourceRoot=fileURLToPath(new URL('../../',import.meta.url));
test('release inputs support normal startup, original CSS/build/lint configuration and advertised MCP tests',async()=>{
 // A clean checkout has no dist yet. Use an explicit unbuilt packaging-input
 // fixture, rather than requiring a production build or skipping this check.
 const base=process.env.MANGA_MCP_TEST_ROOT||os.tmpdir();await fs.mkdir(base,{recursive:true});
 const root=await fs.mkdtemp(path.join(base,'package-inputs-'));
 for(const name of ['scripts/tool-glob','.npmrc','src','public','docs/assets','docs/licenses','mcp/src','mcp/test','mcp/skills','mcp/package.json','mcp/package-lock.json','mcp/README.md','mcp/ARCHITECTURE.md','package.json','package-lock.json','index.html','vite.config.js','postcss.config.js','tailwind.config.js','eslint.config.js','start_app.bat','README.md','LICENSE','LICENSE-CONTENT.md','THIRD_PARTY_NOTICES.md','.gitattributes','scripts/verify_package.py','scripts/install_mcp_dependencies.mjs','scripts/generate_workflow_diagram.mjs','scripts/web-security.mjs'])await fs.cp(path.join(sourceRoot,name),path.join(root,name),{recursive:true});
 await fs.mkdir(path.join(root,'dist'));await fs.writeFile(path.join(root,'dist/index.html'),'Unbuilt input fixture');
 await fs.mkdir(path.join(root,'mcp/src/node_modules/private'),{recursive:true});await fs.writeFile(path.join(root,'mcp/src/node_modules/private/private.txt'),'Excluded fixture');
 await fs.writeFile(path.join(root,'mcp/src/.env'),'Excluded fixture');
 const files=await collectReleaseFiles(root),names=new Set(files.map(file=>file.name));
 for(const name of ['.npmrc','scripts/tool-glob/package.json','scripts/tool-glob/index.cjs','scripts/tool-glob/lib/scan.js','scripts/tool-glob/lib/utils.js','scripts/tool-glob/lib/constants.js','scripts/tool-glob/LICENSE.picomatch'])assert.ok(names.has(name),name);

 for(const name of ['start_app.bat','vite.config.js','postcss.config.js','tailwind.config.js','eslint.config.js','scripts/install_mcp_dependencies.mjs','scripts/generate_workflow_diagram.mjs','scripts/web-security.mjs','mcp/test/stdio.test.mjs','mcp/test/bootstrap-fixtures.ps1','mcp/test/bootstrap-concurrent-worker.ps1','mcp/test/bootstrap-lifecycle-fixtures.ps1','mcp/skills/manga-book-production/bootstrap.ps1','mcp/skills/manga-book-production/Launch-Manga.cmd','mcp/skills/manga-book-production/SKILL.md','mcp/skills/manga-book-production/compatibility.json'])assert.ok(names.has(name),`Missing usable release input: ${name}`);
 assert.equal(files.some(file=>/(?:^|\/)(?:node_modules|\.git|\.env|workspace|objects|jobs)(?:\/|$)/.test(file.name)),false);
 assert.equal(files.some(file=>/(?:^|\/)(?:local-service|project|credentials|api-key)\.json$/i.test(file.name)),false);
 for(const file of files.filter(item=>/\.(?:mjs|js|jsx)$/.test(item.name))){
  const text=await fs.readFile(file.source,'utf8');
  for(const match of text.matchAll(/(?:\bfrom\s*|\bimport\s*\(|\bnew URL\s*\()\s*['"](\.{1,2}\/[^'"]+)['"]/g)){
   const relative=match[1].split('?')[0];
   if(relative.endsWith('/'))continue;
   const target=path.resolve(path.dirname(file.source),relative),name=path.relative(root,target).replaceAll('\\','/');
   if(!(await fs.stat(target).catch(()=>null))?.isFile())continue; // Template/regex examples are not module imports.
   assert.ok(names.has(name),`${file.name} depends on omitted relative input ${name}`);
  }
 }
 await fs.writeFile(path.join(root,'.npmrc'),'install-links=true\nextra-setting=fixture\n');
 await assert.rejects(collectReleaseFiles(root),/Unexpected release npm configuration/);
 await fs.copyFile(path.join(sourceRoot,'.npmrc'),path.join(root,'.npmrc'));
 await fs.writeFile(path.join(root,'src/credentials.json'),'{}');
 await assert.rejects(collectReleaseFiles(root),/Private production state is not a release input/);
});
