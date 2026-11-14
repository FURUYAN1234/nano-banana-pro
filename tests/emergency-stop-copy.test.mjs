import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('current edit and full-auto guidance name the actual emergency button exactly',()=>{
 const control=read('src/components/ControlBar.jsx');const label=control.match(/>(緊急停止)<\/button>/)?.[1];assert.ok(label,'actual emergency button label');
 const edit=read('src/App.jsx').match(/自動処理を使う場合は「([^」]+)」で止めてから編集/);assert.ok(edit);assert.equal(edit[1],label);
 const auto=read('src/hooks/useMangaWorkflow.js').match(/処理が終わるか「([^」]+)」で停止してから、フルオート/);assert.ok(auto);assert.equal(auto[1],label);
});
test('current README guidance and editable manual sources use the same emergency-stop name',()=>{
 const readme=read('README.md');
 for(const prefix of ['Malformed text-review responses','Next-action guidance:','The emergency stop is red']){
 const line=readme.split(/\r?\n/).find(line=>line.startsWith(prefix));assert.ok(line);assert.match(line,/緊急停止/);assert.doesNotMatch(line,/Force Stop|強制ストップ/);
 }
 for(const file of ['src/App.jsx','src/hooks/useMangaWorkflow.js','docs/manuals/build_manuals.py','docs/manuals/build_openai_guide.py'])assert.doesNotMatch(read(file),/解析・生成強制ストップ/);
 assert.match(read('docs/manuals/build_manuals.py'),/「緊急停止」/);
});
