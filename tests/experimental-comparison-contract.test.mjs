import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { buildImageQualityComparisonPrompt } from '../src/lib/image-quality-qa.js';

const approvedPage = () => ({
  count: 5,
  panels: Array.from({ length: 5 }, (_, index) => ({
    panel: index + 1,
    sourcePanel: Math.min(index + 1, 4),
    camera: index % 2 ? '床近くから強いアオリ' : '机の上から強い俯瞰',
    style: index === 2 ? 'WATERCOLOR' : 'NORMAL',
    action: `人物Aが身を乗り出して道具${index + 1}を指す。`,
    dialogue: index === 1 ? [] : [{ speaker: '人物A', text: `元の話を膨らませた、${index + 1}番目の台詞！` }],
  })),
});

test('experimental comparison uses the complete approved expanded page as dialogue and acting authority', () => {
  const approvedExperimentalPage = approvedPage();
  approvedExperimentalPage.panels[0].dialogue.push({ speaker: '人物B', text: 'それなら、私も試す！' });
  const request = buildImageQualityComparisonPrompt({
    scenario: '元の4コマ台本。元の結末を保つ。', finalPrompt: '承認した5コマの描画指示', approvedExperimentalPage,
  });
  assert.ok(request.includes(JSON.stringify(approvedExperimentalPage)));
  assert.match(request, /approved expanded-page contract below defines the exact printed dialogue, speakers, physical panel order and acting/i);
  assert.match(request, /source four-panel scenario remains the plot and ending baseline/i);
  assert.match(request, /approved additions and embellishments are intentional, not invented dialogue/i);
  assert.match(request, /missing, reversed or changed approved-page dialogue, and unapproved extra dialogue, are still material defects/i);
  assert.match(request, /preserve the approved strong camera, style, acting and expressions/i);
  assert.match(request, /元の4コマ台本。元の結末を保つ。/);
});

test('experimental comparison rejects an incomplete or mismatched approved page instead of weakening its contract', () => {
  const invalid = [
    { ...approvedPage(), count: 4 },
    { ...approvedPage(), panels: approvedPage().panels.slice(1) },
    { ...approvedPage(), panels: approvedPage().panels.toReversed() },
    { ...approvedPage(), panels: approvedPage().panels.map((panel, index) => index ? panel : { ...panel, dialogue: [{ speaker: '人物A', text: '' }] }) },
    { ...approvedPage(), panels: approvedPage().panels.map((panel, index) => index ? panel : { ...panel, dialogue: [{ speaker: '', text: '誰の台詞か不明' }] }) },
    { ...approvedPage(), panels: approvedPage().panels.map((panel, index) => index ? panel : { ...panel, camera: '' }) },
  ];
  for (const approvedExperimentalPage of invalid) {
    assert.throws(() => buildImageQualityComparisonPrompt({ approvedExperimentalPage }), /実験ページの比較契約/);
  }
});

test('normal four-panel comparison output remains byte-identical when the experimental page option is absent or null', () => {
  const cases = [
    [{ scenario: '通常4コマの台詞。', castList: '人物A、人物B', finalPrompt: 'approved four-panel prompt' }, '7c62054f784f2990d6817080a6632b8ae07353fe1b6f4b071d05a0bf993996f0'],
    [{ scenario: '通常4コマの台詞。', castList: '人物A、人物B', finalPrompt: 'MONOCHROME', allowIncomplete: true, originalIssues: [{ type: 'bubble_order', panel: 2, reason: '読順' }] }, 'cc03b2891eb2e227a910ad2f62db44c81f7b70bc9f54dd09ccfb6a7d4314bde7'],
  ];
  for (const [options, expectedHash] of cases) {
    const baseline = buildImageQualityComparisonPrompt(options);
    assert.equal(createHash('sha256').update(baseline).digest('hex'), expectedHash);
    assert.equal(buildImageQualityComparisonPrompt({ ...options, approvedExperimentalPage: null }), baseline);
  }
});
