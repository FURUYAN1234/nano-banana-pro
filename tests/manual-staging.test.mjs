import test from 'node:test';
import assert from 'node:assert/strict';

import { applyManualStagingLocks } from '../src/lib/manual-staging.js';

const SCENARIO = `[1コマ目: 起]
状況: AとBが会議を始める。
A「始めます。」

[2コマ目: 承]
状況: Bが資料を出す。
B「確認を。」

[3コマ目: 転]
状況: Cが質問する。
C「質問です。」

[4コマ目: 結]
状況: Aが答え、全員が反応する。
A「終わります。」`;

test('global manual eye-line directions are copied into every panel action', () => {
  const manual = 'B・C・DはAに話しかける。画面正面は禁止。Aも全員に向かって話し、お互いに視線を合わせる。';
  const result = applyManualStagingLocks(SCENARIO, manual);

  assert.equal((result.match(/\[USER STAGING LOCK - ABSOLUTE\]/g) || []).length, 4);
  assert.equal((result.match(/B・C・DはAに話しかける。/g) || []).length, 4);
  assert.equal((result.match(/画面正面は禁止。/g) || []).length, 4);
  assert.equal((result.match(/お互いに視線を合わせる。/g) || []).length, 4);
});

test('panel-specific staging directions are copied only to named panels', () => {
  const manual = '1コマ目と2コマ目はBがAを見る。3コマ目はCがAへ話しかける。';
  const result = applyManualStagingLocks(SCENARIO, manual);
  const panels = result.split(/(?=\[[1-4]コマ目)/);

  assert.match(panels[0], /BがAを見る/);
  assert.match(panels[1], /BがAを見る/);
  assert.doesNotMatch(panels[2], /BがAを見る/);
  assert.match(panels[2], /CがAへ話しかける/);
  assert.doesNotMatch(panels[3], /USER STAGING LOCK/);
});

test('non-staging manual content is not duplicated into panel actions', () => {
  const result = applyManualStagingLocks(SCENARIO, '会議室で新作の締切について相談する。');
  assert.equal(result, SCENARIO);
});

test('topical prose mentioning viewers and looking at characters is not treated as staging', () => {
  const manual = 'フィクションのキャラに最適解ばかり求める視聴者が増えている。つまらないことで悩むキャラを見ると、すぐ解決すれば終わると思う。読者の共感を生む人間らしい失敗が話題になっている。';
  const result = applyManualStagingLocks(SCENARIO, manual);

  assert.equal(result, SCENARIO);
  assert.doesNotMatch(result, /USER STAGING LOCK/);
});

test('one-shot narrative beats without panel numbers are not copied into every panel', () => {
  const manual = '上映後、ミクは大きく身体を開いて平気なふりをするが、リンは震える指で古い半券を差し出す。ミクが初めて言葉を失い、二人で暗い客席に残る光を見つめる。';
  const result = applyManualStagingLocks(SCENARIO, manual);

  assert.equal(result, SCENARIO);
  assert.doesNotMatch(result, /USER STAGING LOCK/);
});

test('staging lock application is idempotent', () => {
  const once = applyManualStagingLocks(SCENARIO, 'BはAへ話しかけ、カメラを見ない。');
  assert.equal(applyManualStagingLocks(once, 'BはAへ話しかけ、カメラを見ない。'), once);
});

test('reported appeals and English topic words never become page-wide acting locks', () => {
  for (const topic of [
    '利用者らはモデル選びや出力確認の重要性を共有し、人間による事実検証を呼びかけています。',
    '市長は市民に節水を呼びかけている。',
    'The interface looks different. Researchers address uncertainty.',
    '研究者は将来を見つめ、新しい社会に向き合う。'
  ]) assert.equal(applyManualStagingLocks(SCENARIO, topic), SCENARIO, topic);
});

test('concrete cast directions and explicit camera directions remain enforceable', () => {
  for (const directive of ['AはBへ呼びかける。', 'BはAを見つめる。', 'カメラを見ない。', 'A looks at B.', '3コマ目は読者に語りかける。']) {
    assert.match(applyManualStagingLocks(SCENARIO, directive), /USER STAGING LOCK/, directive);
  }
});

const SIX_PANEL_SCENARIO = Array.from({ length: 6 }, (_, index) =>
  `[${index + 1}コマ目: 場面]\n[Camera: ${index === 3 ? '一人の顔の接写' : index === 5 ? '反対側から見上げる' : '斜め上から見下ろす'}]\n状況: AとBとCが作業する。\n${['A', 'B', 'C'][index % 3]}「確認${index + 1}。」`).join('\n');

test('continuation sentences inherit their panel scope before staging-cue filtering', () => {
  const scoped = 'Aだけが背面で、奥のBとCは対象への視線に応じた横顔や斜め正面でよい。';
  const next = 'BはAへ話しかける。';
  const manual = '4コマ目は一人の接写。5コマ目は鉛筆スケッチの望遠。\n' + scoped
    + 'カメラを見ない。\n6コマ目は反対側からのアオリ。' + next;
  const result = applyManualStagingLocks(SIX_PANEL_SCENARIO, manual);
  const panels = result.split(/(?=\[[1-6]コマ目)/);
  assert.equal(panels.length, 6);
  assert.equal((result.match(/USER STAGING LOCK - ABSOLUTE/g) || []).length, 2);
  for (const [index, panel] of panels.entries()) {
    assert.equal(panel.includes(scoped), index === 4);
    assert.equal(panel.includes('カメラを見ない。'), index === 4);
    assert.equal(panel.includes(next), index === 5);
  }
  assert.deepEqual(result.match(/\[Camera:[^\n]+/g), SIX_PANEL_SCENARIO.match(/\[Camera:[^\n]+/g));
  assert.deepEqual(result.match(/[ABC]「[^」]+」/g), SIX_PANEL_SCENARIO.match(/[ABC]「[^」]+」/g));
  assert.equal(applyManualStagingLocks(result, manual), result);
});

test('explicit whole-page scope ends local inheritance while earlier global rules remain global', () => {
  for (const wholePage of ['全コマ', '全6コマ', '各コマ', 'ページ全体']) {
    const global = 'AはBへ話しかける。';
    const local = 'CはAを見つめる。';
    const later = `${wholePage}で読者に視線を向けない。`;
    const result = applyManualStagingLocks(SIX_PANEL_SCENARIO, global + '\n5コマ目は手元の接写。' + local + '\n' + later + 'BはAを見る。');
    const panels = result.split(/(?=\[[1-6]コマ目)/);
    for (const [index, panel] of panels.entries()) {
      assert.ok(panel.includes(global), wholePage);
      assert.equal(panel.includes(local), index === 4, wholePage);
      assert.ok(panel.includes(later), wholePage);
      assert.ok(panel.includes('BはAを見る。'), wholePage);
    }
  }
});

test('continuations retain each explicitly named panel without promoting ambiguous new paragraphs', () => {
  const directive = 'AはBを見つめる。';
  const result = applyManualStagingLocks(SIX_PANEL_SCENARIO, '２コマ目と五コマ目は水彩。\n\n' + directive);
  const panels = result.split(/(?=\[[1-6]コマ目)/);
  panels.forEach((panel, index) => assert.equal(panel.includes(directive), [1, 4].includes(index)));
});
