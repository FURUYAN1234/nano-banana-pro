import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let assertScenarioGestureVariety;
let buildScenarioEnhancementPrompt;
let validateScenarioEnhancement;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ assertScenarioGestureVariety } = await server.ssrLoadModule('/src/lib/composition-variety.js'));
  ({ buildScenarioEnhancementPrompt, validateScenarioEnhancement } = await server.ssrLoadModule('/src/lib/scenario-enhancement.js'));
});

after(async () => {
  await server?.close();
});

test('exports a scenario gesture-variety quality gate', () => {
  assert.equal(typeof assertScenarioGestureVariety, 'function');
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

test('rejects repeated pointing, lens-facing thrust, and support-surface impact as one gesture family', () => {
  assert.throws(
    () => assertScenarioGestureVariety({ scenario: REPEATED_FORWARD_EXTENSION_SCENARIO }),
    /repeated_forward_extension_gesture/
  );
});

test('accepts one necessary pointing action among varied story-specific acting', () => {
  assert.equal(
    assertScenarioGestureVariety({ scenario: VARIED_ACTING_SCENARIO }),
    true
  );
});

test('preserves intentional repetition for a selected running-gag ending', () => {
  assert.equal(
    assertScenarioGestureVariety({
      scenario: REPEATED_FORWARD_EXTENSION_SCENARIO,
      punchlineType: 'RunningGag'
    }),
    true
  );
});

test('preserves repetition explicitly requested by the user', () => {
  assert.equal(
    assertScenarioGestureVariety({
      scenario: REPEATED_FORWARD_EXTENSION_SCENARIO,
      protectedText: '各コマで同じ指さしを繰り返す天丼演出にする。'
    }),
    true
  );
});

test('STEP2 routes repeated default gestures through the shared quality-retry loop', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');

  assert.match(source, /assertScenarioGestureVariety/);
  assert.match(source, /GESTURE_VARIETY:\s*'身体演技とジェスチャーの多様性'/);
  assert.match(source, /\['GESTURE_VARIETY',[\s\S]*?assertScenarioGestureVariety\(\{/);
  assert.match(source, /protectedText:\s*manualTopic/);
  assert.match(source, /GESTURE_VARIETY:\s*GESTURE_VARIETY_RETRY_INSTRUCTION/);
});

test('scenario enhancement does not reintroduce a repeated forward-extension gesture family', () => {
  const candidate = VARIED_ACTING_SCENARIO
    .replace('椅子を引いて隣の人物へ席を譲る', '片手を画面手前へ大きく突き出す')
    .replace('資料を両手で受け取り、重心を後ろ足へ移す', '机を強く叩いて立ち上がる');

  const prompt = buildScenarioEnhancementPrompt({
    scenario: VARIED_ACTING_SCENARIO,
    selectedCategories: ['body']
  });
  const validation = validateScenarioEnhancement({
    originalScenario: VARIED_ACTING_SCENARIO,
    candidateScenario: candidate,
    selectedCategories: ['body']
  });

  assert.match(prompt, /身体演技・ジェスチャー反復抑制/);
  assert.ok(validation.issueCodes.includes('repeated_forward_extension_gesture'));
  assert.equal(validation.ok, false);
});
