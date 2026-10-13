import assert from 'node:assert/strict';
import test from 'node:test';
import * as scenarioHistory from '../src/lib/generation-history.js';

import {
  addGenerationHistoryItem,
  selectGenerationMetadataContext,
  buildGeneratedImageFilename,
  downloadImageDataUrl,
  MAX_GENERATION_HISTORY_ITEMS
} from '../src/lib/generation-history.js';

test('manual source keys identify the same explicit input without retaining its text', async () => {
  const key = await scenarioHistory.createScenarioSourceKey({ inputMode: 'manual', manualTopic: '風鈴を直す。\n二人で支える。' });
  assert.match(key, /^manual:sha256:[a-f0-9]{64}$/);
  assert.equal(await scenarioHistory.createScenarioSourceKey({ inputMode: 'manual', manualTopic: ' 風鈴を直す。\r\n二人で支える。 ' }), key);
  assert.notEqual(await scenarioHistory.createScenarioSourceKey({ inputMode: 'manual', manualTopic: '風鈴を直す。\n一人で支える。' }), key);
  assert.equal(await scenarioHistory.createScenarioSourceKey({ inputMode: 'news', manualTopic: '風鈴を直す。\n二人で支える。' }), '');
  assert.equal(await scenarioHistory.createScenarioSourceKey({ inputMode: 'manual', manualTopic: ' ' }), '');
});

test('recent outcomes follow the actual final panel for native 5 and 8 panel scenarios', () => {
  for (const count of [5, 8]) {
    const source = `Punchline: 決意\nLogline: 札を揃えて案内を通す\n` + Array.from({ length: count }, (_, index) =>
      `[${index + 1}コマ目: 展開]\n[EMOTION: NORMAL]\n[Camera: 俯瞰]\nBalloonLayout: []\n状況: ${index + 1 === count ? '最後の札が正しい入口を示す。' : `${index + 1}枚目の札を確認する。`}\nセリフなし`).join('\n');
    const [record] = scenarioHistory.collectRecentScenarioOutcomes([source]);
    assert.equal(record.ending, '決意');
    assert.match(record.outcome, /最後の札が正しい入口を示す/);
    assert.doesNotMatch(record.outcome, /4枚目|Camera|EMOTION|BalloonLayout/);
  }
});

test('same-source reruns exclude only proven matching entries while other and unknown stories remain comparable', () => {
  const sourceKey = `manual:sha256:${'a'.repeat(64)}`;
  const differentKey = `manual:sha256:${'b'.repeat(64)}`;
  const story = action => `[4コマ目: 結]\n状況: ${action}`;
  const sources = [
    { scenario: story('同じ原案を再現する。'), sourceKey },
    { scenario: story('別の原案で同じ仕掛けを使う。'), sourceKey: differentKey },
    story('旧履歴で出所は不明。'),
    { scenario: story('自由生成で重複した仕掛け。'), sourceKey: '' },
  ];
  const filtered = scenarioHistory.collectRecentScenarioOutcomes(sources, { sourceKey, currentScenario: sources[0].scenario, isManualRerun: true });
  assert.deepEqual(filtered.map(item => item.outcome), ['状況: 別の原案で同じ仕掛けを使う。', '状況: 旧履歴で出所は不明。', '状況: 自由生成で重複した仕掛け。']);
  assert.equal(scenarioHistory.collectRecentScenarioOutcomes(sources).length, 4, 'free generation still compares every source');
  assert.equal(scenarioHistory.collectRecentScenarioOutcomes(sources, { sourceKey }).length, 4, 'a fixed topic alone is not an intentional rerun');
  assert.equal(scenarioHistory.collectRecentScenarioOutcomes(sources, { sourceKey, currentScenario: '', isManualRerun: true }).length, 4, 'a new work without a current scenario retains comparison');
  assert.equal(scenarioHistory.collectRecentScenarioOutcomes(sources, { sourceKey, currentScenario: sources[0].scenario, isManualRerun: false }).length, 4, 'automatic generation retains comparison');
  assert.equal(scenarioHistory.collectRecentScenarioOutcomes([{ scenario: sources[0].scenario, sourceKey: 'unknown' }], { sourceKey: 'unknown' }).length, 1);
  assert.equal(scenarioHistory.findScenarioSourceKey(sources[0].scenario, sources), sourceKey);
  assert.equal(scenarioHistory.findScenarioSourceKey('edited output', sources), '');
  assert.equal(scenarioHistory.findScenarioSourceKey(sources[0].scenario, [...sources, { scenario: sources[0].scenario, sourceKey: differentKey }]), '', 'ambiguous origin is unknown');
  assert.equal(scenarioHistory.findScenarioSourceKey(sources[0].scenario, [...sources, sources[0].scenario]), '', 'a legacy match does not prove origin');
});

test('generated image history keeps multiple recent API images for selection during a loop', () => {
  const oldHistory = [
    { id: 1, img: `data:image/png;base64,${'a'.repeat(128)}` },
    { id: 2, img: `data:image/png;base64,${'b'.repeat(128)}` }
  ];
  const latest = { id: 3, img: `data:image/png;base64,${'c'.repeat(128)}` };

  assert.equal(MAX_GENERATION_HISTORY_ITEMS, 10);
  assert.deepEqual(addGenerationHistoryItem(oldHistory, latest), [latest, ...oldHistory]);
});

test('generated image history retains only the newest ten images in memory', () => {
  const oldHistory = Array.from({ length: 10 }, (_, index) => ({ id: index + 1, img: `data:image/png;base64,${index}` }));
  const latest = { id: 11, img: 'data:image/png;base64,latest' };

  assert.deepEqual(addGenerationHistoryItem(oldHistory, latest), [latest, ...oldHistory.slice(0, 9)]);
});

test('quality repair history keeps only the final accepted image from the current generation', () => {
  const previousAccepted = { id: 1, img: 'data:image/png;base64,previous' };
  const originalCandidate = { id: 2, img: 'data:image/png;base64,original' };
  const repairCandidate = { id: 3, img: 'data:image/png;base64,repair' };
  const accepted = { ...repairCandidate, id: 4, selected: true };

  const result = addGenerationHistoryItem(
    [originalCandidate, previousAccepted],
    accepted,
    { removeImages: new Set([originalCandidate.img, repairCandidate.img]) }
  );

  assert.deepEqual(result, [accepted, previousAccepted]);
});

test('a selected history image uses its generation snapshot, never current controls', () => {
  const saved = {scenario:'old', finalPrompt:'sent prompt', provider:'openai', inputImages:[{role:'character',dataUrl:'data:image/png;base64,AA=='}], settings:{color_mode:'color'}};
  const history = {img:'old-image', metadataContext:saved};
  assert.equal(selectGenerationMetadataContext(history), saved);
  const legacy = selectGenerationMetadataContext({img:'legacy-image', modelId:'gpt-image-2.5-sunburst'});
  assert.equal(legacy.provider, 'openai');
  assert.equal(legacy.finalPrompt, '');
  assert.equal(legacy.inputImages.length, 0);
  assert.equal(legacy.settings.generation_context_evidence, 'unavailable');
});

test('manual save keeps the existing API-title-date-time filename convention', () => {
  const filename = buildGeneratedImageFilename({
    apiName: 'ChatGPT',
    title: 'タイトル / 使用禁止:文字',
    extension: 'png',
    now: new Date(2026, 8, 16, 7, 5, 9)
  });

  assert.equal(filename, 'AI_4koma_comic_ChatGPT_タイトル___使用禁止_文字_20260916070509.png');
});

test('download helper preserves large encoded images through a Blob download', async (t) => {
  const clicked = [];
  const parent = { appendChild: node => {node.parentNode = parent; clicked.push(['append', node]);}, removeChild: node => clicked.push(['remove', node]) };
  const documentObject = { body: parent, createElement: () => ({ click() { clicked.push(['click', this]); } }) };
  const timers = [];
  t.mock.method(globalThis, 'setTimeout', (callback, delay) => timers.push({callback, delay}));
  const bytes = new Uint8Array(9_000_000).fill(173);
  downloadImageDataUrl(`data:image/png;base64,${Buffer.from(bytes).toString('base64')}`, 'AI_4koma_comic_ChatGPT_title_20260916070509.png', documentObject);

  assert.equal(clicked[0][0], 'append');
  assert.equal(clicked[1][0], 'click');
  assert.equal(clicked[2][0], 'remove');
  assert.match(clicked[0][1].href, /^blob:/);
  assert.equal(clicked[0][1].download, 'AI_4koma_comic_ChatGPT_title_20260916070509.png');
  const response = await fetch(clicked[0][1].href);
  assert.equal(response.headers.get('content-type'), 'image/png');
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), bytes);
  assert.equal(timers[0].delay, 60_000);
  timers[0].callback();
  await assert.rejects(fetch(clicked[0][1].href));
});

test('download helper rejects invalid data before creating a download', () => {
  const documentObject = { createElement() { throw new Error('must not reach download'); } };
  assert.throws(() => downloadImageDataUrl('https://example.com/image.png', 'x.png', documentObject), /画像データが不正/);
  assert.throws(() => downloadImageDataUrl('data:image/png;base64,!!!!', 'x.png', documentObject));
});
