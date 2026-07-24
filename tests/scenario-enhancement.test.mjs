import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const modulePath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/lib/scenario-enhancement.js'
);
const enhancementModule = existsSync(modulePath)
  ? await import(pathToFileURL(modulePath).href)
  : {};

const originalScenario = `## タイトル: AI苦手分野4連発 !?
Logline: 5人が「AI作画が苦手な表現」に次々と挑戦するが、誰一人ツッコミもせず淡々とカオスを受け入れる異様な静寂ギャグ。
Location: 精神と時の部屋
Outfit: カジュアルな私服
Punchline: ドキュメンタリー (原文忠実)

[1コマ目: 起]
[EMOTION: GEKIGA]
[Camera: ローアングル/アオリ]
状況: 真っ白な床で、5人がリング状に並び、静かに構える。
サエコ「始めるわよ。」
（リアクション: ミク→無表情で髪をかき上げる）

[2コマ目: 承]
[EMOTION: NORMAL]
[Camera: 超広角/フィッシュアイ]
状況: 魚眼レンズで全員の顔や手足が丸く引き伸ばされる。
アカリ「なんか丸い？」
（リアクション: ミク→肩をすくめる）

[3コマ目: 転]
[EMOTION: SHADOW]
[Camera: 俯瞰/バードアイ]
状況: 天井近くから全員を見下ろし、しんと静まり返っている。
ヒカリ「地面が遠い……。」
（リアクション: リン→じっと下を覗き込む）

[4コマ目: 結]
[EMOTION: CHIBI_GAG]
[Camera: Cinematic Slant]
状況: 全員の体型やパーツ配置が明らかに狂っている。空調の微かな音だけがする。
ミク「これ、流行るかな。」
（リアクション: サエコ→呆れ顔）`;

const dialogueOnlyCandidate = originalScenario.replace(
  'ミク「これ、流行るかな。」',
  'ミク「次の流行、これで決まり？」'
);

const weakenedPunchlineCandidate = originalScenario.replace(
  'ミク「これ、流行るかな。」',
  'ミク「こういうのも、もしかしたら新しい流行になるかもね。」'
);

const minimalMetadataScenario = originalScenario
  .replace('## タイトル: AI苦手分野4連発 !?', 'Topic: AI苦手分野4連発 !?')
  .replace(/^Logline:.*\n/m, '')
  .replace(/^Outfit:.*\n/m, '')
  .replace(/^Punchline:.*\n/m, '');

const minimalMetadataCandidate = minimalMetadataScenario.replace(
  'ミク「これ、流行るかな。」',
  'ミク「次の流行、これで決まり？」'
);

const representativeBadCandidate = originalScenario
  .replace('[EMOTION: GEKIGA]', '[EMOTION: GEKIGA（MAX OVERDRIVE）]')
  .replace('[Camera: ローアングル/アオリ]', '[Camera: 超ローアングル/アオリ（地割れから覗く超絶パース）]')
  .replace(
    '状況: 真っ白な床で、5人がリング状に並び、静かに構える。',
    '状況: 床下から鋭いスポットライトが全員を照射し、黒い稲妻状のオーラが空間を裂く。'
  )
  .replace(
    '状況: 魚眼レンズで全員の顔や手足が丸く引き伸ばされる。',
    '状況: 空間が万華鏡のようにねじれ、指が分裂し、関節が増殖して壁と床が激しく波打つ。'
  )
  .replace(
    '状況: 天井近くから全員を見下ろし、しんと静まり返っている。',
    '状況: 一点照明で影がビル級に伸び、雷鳴のような足音で床に衝撃波が走る。'
  )
  .replace(
    '状況: 全員の体型やパーツ配置が明らかに狂っている。空調の微かな音だけがする。',
    '状況: 全員の体型が物理法則を超えて完全崩壊し、首はS字、腕は8の字に絡まり、背景がサイケデリックに爆発する。'
  );

test('scenario enhancement contract module exists', () => {
  assert.ok(
    existsSync(modulePath),
    'src/lib/scenario-enhancement.js should define category-aware diff validation'
  );
});

test('enhancement prompt requires selected-only changes and protects the original tone', () => {
  assert.equal(typeof enhancementModule.buildScenarioEnhancementPrompt, 'function');
  const prompt = enhancementModule.buildScenarioEnhancementPrompt({
    scenario: originalScenario,
    selectedCategories: ['expressions', 'body', 'effects', 'camera', 'dialogue']
  });

  assert.match(prompt, /選択されていないカテゴリ.*変更しない/s);
  assert.match(prompt, /Logline.*最優先/s);
  assert.match(prompt, /セリフ.*最低1つ.*必ず変更/s);
  assert.match(prompt, /背景.*変更しない/s);
  assert.match(prompt, /人体.*変形|人体変形/s);
  assert.doesNotMatch(prompt, /限界突破|2\.5[〜～-]3\.0|MAX OVERDRIVE/);
});

test('unchanged dialogue is rejected when dialogue enhancement was selected', () => {
  assert.equal(typeof enhancementModule.validateScenarioEnhancement, 'function');
  const validation = enhancementModule.validateScenarioEnhancement({
    originalScenario,
    candidateScenario: originalScenario,
    selectedCategories: ['dialogue']
  });

  assert.equal(validation.ok, false);
  assert.ok(validation.issueCodes.includes('dialogue_unchanged'));
});

test('a change to an unselected camera category is rejected', () => {
  assert.equal(typeof enhancementModule.validateScenarioEnhancement, 'function');
  const candidate = dialogueOnlyCandidate.replace(
    '[Camera: ローアングル/アオリ]',
    '[Camera: 超ローアングル]'
  );
  const validation = enhancementModule.validateScenarioEnhancement({
    originalScenario,
    candidateScenario: candidate,
    selectedCategories: ['dialogue']
  });

  assert.equal(validation.ok, false);
  assert.ok(validation.issueCodes.includes('camera_changed_without_selection'));
});

test('a selected dialogue-only rewrite is accepted when protected fields stay unchanged', () => {
  assert.equal(typeof enhancementModule.validateScenarioEnhancement, 'function');
  const validation = enhancementModule.validateScenarioEnhancement({
    originalScenario,
    candidateScenario: dialogueOnlyCandidate,
    selectedCategories: ['dialogue']
  });

  assert.equal(validation.ok, true, validation.issues?.join('; '));
});

test('Topic format and omitted optional metadata remain valid', () => {
  assert.equal(typeof enhancementModule.validateScenarioEnhancement, 'function');
  const validation = enhancementModule.validateScenarioEnhancement({
    originalScenario: minimalMetadataScenario,
    candidateScenario: minimalMetadataCandidate,
    selectedCategories: ['dialogue']
  });

  assert.equal(validation.ok, true, validation.issues?.join('; '));
});

test('a dry punchline is rejected when the rewrite becomes verbose and hedged', () => {
  assert.equal(typeof enhancementModule.validateScenarioEnhancement, 'function');
  const validation = enhancementModule.validateScenarioEnhancement({
    originalScenario,
    candidateScenario: weakenedPunchlineCandidate,
    selectedCategories: ['dialogue']
  });

  assert.equal(validation.ok, false);
  assert.ok(
    validation.issueCodes.includes('dialogue_overexpanded') ||
      validation.issueCodes.includes('punchline_softened')
  );
});

test('the reported all-except-background failure is rejected for unchanged dialogue and category bleed', () => {
  assert.equal(typeof enhancementModule.validateScenarioEnhancement, 'function');
  const validation = enhancementModule.validateScenarioEnhancement({
    originalScenario,
    candidateScenario: representativeBadCandidate,
    selectedCategories: ['expressions', 'body', 'effects', 'camera', 'dialogue']
  });

  assert.equal(validation.ok, false);
  assert.ok(validation.issueCodes.includes('dialogue_unchanged'));
  assert.ok(
    validation.issueCodes.includes('background_changed_without_selection') ||
      validation.issueCodes.includes('tone_escalation')
  );
});

test('invalid first output is retried once and only a validated rewrite is returned', async () => {
  assert.equal(typeof enhancementModule.runValidatedScenarioEnhancement, 'function');
  const responses = [originalScenario, dialogueOnlyCandidate];
  const prompts = [];

  const result = await enhancementModule.runValidatedScenarioEnhancement({
    originalScenario,
    selectedCategories: ['dialogue'],
    buildPrompt: ({ validationIssues = [] }) => {
      prompts.push(validationIssues);
      return `prompt:${validationIssues.join(',')}`;
    },
    requestEnhancement: async () => ({ text: responses.shift(), model: 'test-model' })
  });

  assert.equal(result.text, dialogueOnlyCandidate);
  assert.equal(result.attempts, 2);
  assert.equal(prompts.length, 2);
  assert.ok(prompts[1].includes('dialogue_unchanged'));
});

test('enhancement fails closed after two invalid outputs', async () => {
  assert.equal(typeof enhancementModule.runValidatedScenarioEnhancement, 'function');

  await assert.rejects(
    enhancementModule.runValidatedScenarioEnhancement({
      originalScenario,
      selectedCategories: ['dialogue'],
      buildPrompt: () => 'prompt',
      requestEnhancement: async () => ({ text: originalScenario, model: 'test-model' })
    }),
    /dialogue_unchanged/
  );
});
