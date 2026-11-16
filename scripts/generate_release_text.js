import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Release facts belong to the versioned notes, not a permanent old template.
const root=fileURLToPath(new URL('../',import.meta.url));
const {version}=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const notes=path.join(root,'docs','releases',`v${version}.md`);
console.log(`Tag version: v${version}\nTarget: main\n\n[Title]\nv${version} - Update / 更新内容\n\n[Body]`);
if(fs.existsSync(notes))console.log(fs.readFileSync(notes,'utf8'));
else{
 console.error(`Version-specific release notes are required: docs/releases/v${version}.md`);
 process.exitCode=1;
}
