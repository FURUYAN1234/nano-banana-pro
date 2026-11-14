import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {ENDING_MODE_HINTS,getEndingModeHint} from '../src/lib/ending-mode-hints.js';
import {SERIOUS_ENDING_OPTIONS,GAG_ENDING_OPTIONS,DOCUMENTARY_ENDING_OPTIONS} from '../src/lib/ending-mode-policy.js';

test('every selectable ending has a distinct concise hint; automatic choices do not claim action-only behavior',()=>{
 const values=['Auto','GagAuto',...SERIOUS_ENDING_OPTIONS,...GAG_ENDING_OPTIONS,...DOCUMENTARY_ENDING_OPTIONS].map(v=>typeof v==='string'?v:v.value);
 assert.deepEqual(Object.keys(ENDING_MODE_HINTS).sort(),values.sort());
 assert.equal(new Set(values.map(getEndingModeHint)).size,values.length);
 for(const value of values){assert.equal(getEndingModeHint(value),ENDING_MODE_HINTS[value]);assert.ok(getEndingModeHint(value).length>10);assert.ok(getEndingModeHint(value).length<140);}
 assert.match(getEndingModeHint('Auto'),/ギャグ.*シリアス/);
 assert.match(getEndingModeHint('GagAuto'),/ギャグ.*自動/);
 assert.match(getEndingModeHint('SeriousAuto'),/シリアス.*自動/);
 for(const value of ['Auto','GagAuto','SeriousAuto'])assert.doesNotMatch(getEndingModeHint(value),/大胆な身体|アクション/);
 assert.match(getEndingModeHint('GagAction'),/動き.*笑/);assert.match(getEndingModeHint('SeriousAction'),/動き.*局面/);
 for(const value of ['Documentary','SeriousDocumentary'])assert.match(getEndingModeHint(value),/事実/);
 assert.equal(getEndingModeHint('unknown'),getEndingModeHint('Auto'));
});
test('STEP2 associates the selected dynamic hint with its ending selector',async()=>{
 const source=await readFile(new URL('../src/components/Step2Panel.jsx',import.meta.url),'utf8');
 assert.match(source,/aria-describedby="ending-mode-hint"/);
 assert.match(source,/id="ending-mode-hint"[^>]*aria-live="polite"[^>]*>\{getEndingModeHint\(punchlineType\)\}/);
 assert.doesNotMatch(source,/アクションは一般的なニュースでも、話に沿った大胆な身体の動きを描きます。/);
});
