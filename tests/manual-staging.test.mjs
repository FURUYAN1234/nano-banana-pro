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

test('staging lock application is idempotent', () => {
  const once = applyManualStagingLocks(SCENARIO, 'BはAへ話しかけ、カメラを見ない。');
  assert.equal(applyManualStagingLocks(once, 'BはAへ話しかけ、カメラを見ない。'), once);
});
