import assert from 'node:assert/strict';
import test from 'node:test';

import {
  assertSafeScenarioOutput,
  createHybridLocationPlan,
  getSafeCuratedLocationNames,
  isSafeLocationContent,
  requestSafeScenario
} from '../src/lib/location-policy.js';

test('rejects horror, gore, body-interior, and creepy organic location descriptions', () => {
  const unsafeDescriptions = [
    'ピンク色の脳漿に囲まれた会議室',
    '巨大な胃の中で肉壁が脈打つ',
    '内臓と臓器が並ぶ体内空間',
    '人体内部を模した不気味な生体背景',
    '[EMOTION: HORROR] 暗い背景',
    'a body-horror chamber with viscera',
    'a blood-soaked flesh wall inside the body'
  ];

  for (const description of unsafeDescriptions) {
    assert.equal(isSafeLocationContent(description), false, description);
  }

  assert.equal(isSafeLocationContent('夕焼けの展望デッキと赤いベンチ'), true);
  assert.equal(isSafeLocationContent('a concert hall with a pipe organ'), true);
});

test('filters unsafe curated entries by name and all detail fields', () => {
  const details = {
    '海辺の図書館': {
      props: ['本棚', '大きな窓'],
      ambient: '静かな波音',
      visual: '青い海と白いカーテン'
    },
    '不穏な地下室': {
      props: ['古い机'],
      ambient: '低い音',
      visual: '壁一面の生体組織が脈打つ'
    }
  };

  assert.deepEqual(getSafeCuratedLocationNames(details), ['海辺の図書館']);
});

test('keeps automatic settings adaptive while preserving an explicit safe location lock', () => {
  const details = {
    '屋上庭園': {
      props: ['ベンチ'],
      ambient: '風の音',
      visual: '街を見渡す空'
    },
    '駅前広場': {
      props: ['時計台'],
      ambient: '人々の話し声',
      visual: '明るい舗装広場'
    }
  };

  const plan = createHybridLocationPlan({ locationDetails: details });

  assert.equal(plan.mode, 'adaptive');
  assert.equal(plan.anchorName, '');
  assert.deepEqual(plan.anchors, []);
  assert.match(plan.guidance, /ニュース本文|ユーザー入力/);

  const explicitPlan = createHybridLocationPlan({
    locationDetails: details,
    customLocation: '駅前広場'
  });

  assert.equal(explicitPlan.mode, 'custom');
  assert.equal(explicitPlan.anchorName, '駅前広場');
  assert.match(explicitPlan.guidance, /指定場所/);
});

test('fails closed for unsafe explicit locations and unsafe AI scenario output', () => {
  assert.throws(
    () => createHybridLocationPlan({
      locationDetails: {},
      customLocation: '巨大な胃の中'
    }),
    /安全ポリシー/
  );

  assert.throws(
    () => assertSafeScenarioOutput({
      location: '会議室',
      scenario: '背景に血まみれの肉壁が広がる。'
    }),
    /安全ポリシー/
  );

  assert.equal(assertSafeScenarioOutput({
    location: '明るい市役所ロビー',
    scenario: '窓辺で三人が書類を見ながら話している。'
  }), true);
});

test('fails closed when 360-degree background analysis hides organic scenery behind a safe location name', () => {
  assert.throws(
    () => createHybridLocationPlan({
      locationDetails: {},
      backgroundLocation: '展示室',
      backgroundDetails: {
        objects: '壁一面の生体組織',
        mood: '薄暗い空間'
      }
    }),
    /安全ポリシー/
  );
});

test('retries one unsafe AI scenario once and returns only the safe parsed result', async () => {
  const prompts = [];
  const responses = [
    { text: 'Location: 地下室\nScenario: 背景に血まみれの肉壁が広がる。' },
    { text: 'Location: 明るい駅前広場\nScenario: 時計台の前で三人が話している。' }
  ];

  const result = await requestSafeScenario({
    initialPrompt: 'BASE PROMPT',
    requestScenario: async (prompt) => {
      prompts.push(prompt);
      return responses[prompts.length - 1];
    },
    parseScenario: (response) => {
      const location = response.text.match(/Location:\s*(.+)/)?.[1] || '';
      const scenario = response.text.match(/Scenario:\s*([\s\S]+)/)?.[1] || '';
      return { location, scenario };
    }
  });

  assert.equal(result.attempts, 2);
  assert.equal(result.parsed.location, '明るい駅前広場');
  assert.equal(prompts.length, 2);
  assert.equal(prompts[0], 'BASE PROMPT');
  assert.match(prompts[1], /SAFE LOCATION RETRY/);
  assert.doesNotMatch(prompts[1], /血まみれ|肉壁/);
});

test('fails closed after two unsafe AI scenario responses', async () => {
  let attempts = 0;

  await assert.rejects(
    requestSafeScenario({
      initialPrompt: 'BASE PROMPT',
      requestScenario: async () => {
        attempts += 1;
        return { text: 'unsafe' };
      },
      parseScenario: () => ({
        location: '巨大な胃の中',
        scenario: '内臓の背景。'
      })
    }),
    /安全ポリシー/
  );

  assert.equal(attempts, 2);
});

test('retries once when a scenario lacks required visual story evidence', async () => {
  const responses = [
    { text: 'first response' },
    { text: 'second response' }
  ];
  let requests = 0;

  const result = await requestSafeScenario({
    initialPrompt: 'base prompt',
    requestScenario: async (prompt) => {
      if (requests === 1) assert.match(prompt, /VISUAL STORY EVIDENCE RETRY/);
      return responses[requests++];
    },
    parseScenario: (response) => response.text === 'first response'
      ? { location: '港', scenario: '人物が話している。', visualEvidence: '式典看板、乗船ゲート、港湾職員' }
      : { location: '港', scenario: '[1コマ目] 式典看板。\n[2コマ目] 乗船ゲートと港湾職員。', visualEvidence: '式典看板、乗船ゲート、港湾職員' },
    validateScenario: (parsed) => {
      const coveredPanels = String(parsed.scenario).split(/\[\d+コマ目[^\]]*\]/).filter((panel) =>
        /式典看板|乗船ゲート|港湾職員/.test(panel)
      ).length;
      if (coveredPanels < 2) throw new Error('visual_story_evidence_missing');
    },
    retryInstruction: 'VISUAL STORY EVIDENCE RETRY',
    maxAttempts: 2
  });

  assert.equal(requests, 2);
  assert.equal(result.parsed.scenario.includes('港湾職員'), true);
});
