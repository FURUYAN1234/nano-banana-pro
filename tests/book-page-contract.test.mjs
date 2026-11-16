import test from 'node:test';
import assert from 'node:assert/strict';
import { createBookPageMode, readBookPageMode, bindRestoredPagePrepared } from '../src/lib/page-production-contract.js';
import { getScenarioPanelCountRange, buildScenarioPanelCountInstruction } from '../src/lib/scenario-validation.js';
import { buildStoryStructureGuidance } from '../src/lib/story-structure.js';
import { experimentalLayoutOptions, experimentalLayout, readPageComposition } from '../src/lib/manga-page-composition.js';

test('explicit internal book page counts 1–8 do not change ordinary default ranges', () => {
  assert.deepEqual(getScenarioPanelCountRange('four-panel'), [4, 4]);
  assert.deepEqual(getScenarioPanelCountRange('experimental-manga'), [4, 8]);
  for (let n = 1; n <= 8; n++) {
    const mode = createBookPageMode(n);
    assert.deepEqual(getScenarioPanelCountRange(mode), [n, n]);
    assert.match(buildScenarioPanelCountInstruction(mode), new RegExp(`全${n}コマ`));
  }
  assert.throws(() => createBookPageMode(0)); assert.throws(() => createBookPageMode(9));
  assert.equal(readBookPageMode('four-panel'), null);
});

test('JSON snapshot restoration rebinds only byte-identical references, preserving the generation source guard',()=>{
  const images=['data:image/png;base64,first'],prepared=JSON.parse(JSON.stringify({images,bg360Image:null,prompt:'Approved'}));
  const restored=bindRestoredPagePrepared(prepared,images,null);
  assert.equal(restored.images,images);assert.equal(restored.prompt,'Approved');
  assert.equal(bindRestoredPagePrepared(prepared,['data:image/png;base64,changed'],null),undefined);
  assert.equal(bindRestoredPagePrepared(prepared,images,'changed-background'),undefined);
});

test('low-count A4 vertical geometry has exactly the requested ordered frames and rejects cross-page references', () => {
  for (let n = 1; n <= 3; n++) {
    const option = experimentalLayoutOptions(n)[0];
    const frames = experimentalLayout(n, option.id);
    assert.equal(frames.length, n); assert.equal(frames[0].y, 0);
    assert.equal(frames.at(-1).y + frames.at(-1).h, 1);
    const data = { layout: option.id, reason: '縦の動き', heroPanels: [1], foregrounds: [], breakouts: [], bleed: [] };
    assert.equal(readPageComposition(`PageComposition: ${JSON.stringify(data)}\n[1コマ目]`, n).layout, 'vertical_page');
    assert.throws(() => readPageComposition(`PageComposition: ${JSON.stringify({ ...data, heroPanels: [n + 1] })}\n[1コマ目]`, n));
  }
  assert.throws(() => getScenarioPanelCountRange('book-page-0-continue'));
});

test('book narrative uses whole-book continuity without requiring nonexistent earlier panels or isolated payoffs', () => {
  const text = buildStoryStructureGuidance({ scenarioMode: createBookPageMode(1), phase: 'review' });
  assert.match(text, /独立したオチ.*強制しない/);
  assert.doesNotMatch(text, /panel3_prediction|panel4_outcome|4コマでは/);
  assert.match(buildStoryStructureGuidance({ scenarioMode: createBookPageMode(3, { finalPage: true }) }), /最終ページ/);
});
