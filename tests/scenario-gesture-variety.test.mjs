import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let buildScenarioEnhancementPrompt;
let validateScenarioEnhancement;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ buildScenarioEnhancementPrompt, validateScenarioEnhancement } = await server.ssrLoadModule('/src/lib/scenario-enhancement.js'));
});

after(async () => {
  await server?.close();
});

const REPEATED_FORWARD_EXTENSION_SCENARIO = `
[1コマ目: 起]
状況: サエコが壁の予定表を指さす。
サエコ「ここです。」
[2コマ目: 承]
状況: サエコが片手を画面手前へ大きく突き出す。
サエコ「待ってください。」
[3コマ目: 転]
状況: サエコが机を強く叩いて立ち上がる。
サエコ「決めました。」
[4コマ目: 結]
状況: サエコが椅子へ静かに座り直す。
サエコ「続けましょう。」`;

const VARIED_ACTING_SCENARIO = `
[1コマ目: 起]
状況: サエコが壁の予定表を指さす。
サエコ「ここです。」
[2コマ目: 承]
状況: サエコが椅子を引いて隣の人物へ席を譲る。
サエコ「どうぞ。」
[3コマ目: 転]
状況: サエコが資料を両手で受け取り、重心を後ろ足へ移す。
サエコ「確認します。」
[4コマ目: 結]
状況: サエコが窓辺へ二歩進み、肩越しに振り返る。
サエコ「見えました。」`;

test('body enhancement accepts distinct pointing, thrust and impact without a gesture-family cap', () => {
  const candidate = VARIED_ACTING_SCENARIO
    .replace('椅子を引いて隣の人物へ席を譲る', '片手を画面手前へ大きく突き出す')
    .replace('資料を両手で受け取り、重心を後ろ足へ移す', '机を強く叩いて立ち上がる');
  const validation = validateScenarioEnhancement({
    originalScenario: VARIED_ACTING_SCENARIO,
    candidateScenario: candidate,
    selectedCategories: ['body']
  });
  assert.equal(validation.ok, true, JSON.stringify(validation.issues));
  assert.deepEqual(validation.changedCategories, ['body']);
});

test('explicit repeated acting remains available while dialogue stays protected', () => {
  const candidate = REPEATED_FORWARD_EXTENSION_SCENARIO.replace('椅子へ静かに座り直す', '椅子へ大きくのけぞって座り直す');
  const validate = candidateScenario => validateScenarioEnhancement({
    originalScenario: REPEATED_FORWARD_EXTENSION_SCENARIO, candidateScenario, selectedCategories: ['body']
  });
  assert.equal(validate(candidate).ok, true);
  assert.equal(validate(candidate.replace('続けましょう。', '終わりです。')).ok, false);
});

test('STEP2 no longer retries a scenario solely for its gesture family', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /assertScenarioGestureVariety|GESTURE_VARIETY_RETRY_INSTRUCTION/);
  assert.match(source, /assertMangaScenarioDialogueContract/);
  assert.match(source, /assertManualTopicExclusions/);
});

test('enhancement requests contrast while preserving explicitly quiet beats', () => {
  const prompt = buildScenarioEnhancementPrompt({ scenario: VARIED_ACTING_SCENARIO, selectedCategories: ['body'] });
  assert.match(prompt, /全身の誇張/);
  assert.match(prompt, /静かな間/);
  assert.doesNotMatch(prompt, /この系統は4コマ中最大1コマ/);
});
