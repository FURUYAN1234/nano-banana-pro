import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  buildScenarioEnhancementPrompt,
  validateScenarioEnhancement,
} from '../src/lib/scenario-enhancement.js';

const scenario = `## タイトル: 閉館後の記録
Logline: 二人が閉館後の資料室で記録を確認する。
Location: 資料室
Outfit: 参照画像どおり
Punchline: シリアス・ドキュメンタリー

[1コマ目: 起]
[EMOTION: NORMAL]
[Camera: ミディアム]
状況: 二人が記録を開く。
A「時刻を確認しよう」
（リアクション: B→静かにうなずく）

[2コマ目: 承]
[EMOTION: SHADOW]
[Camera: 寄り]
状況: 数字を指で追う。
B「記録と一致している」
（リアクション: A→表情を引き締める）

[3コマ目: 転]
[EMOTION: GEKIGA]
[Camera: ローアングル]
状況: 扉の外から足音が近づく。
A「誰か来る」
（リアクション: B→記録を抱える）

[4コマ目: 結]
[EMOTION: SHADOW]
[Camera: 引き]
状況: 二人が記録を所定の棚へ戻す。
B「事実だけを残そう」
（リアクション: A→扉を閉める）`;

test('narrative timing enhancement follows Serious Documentary without gag or chibi directions', () => {
  const prompt = buildScenarioEnhancementPrompt({
    scenario,
    selectedCategories: ['gag'],
    punchlineType: 'SeriousDocumentary',
  });

  assert.match(prompt, /- シリアス演出:/);
  assert.match(prompt, /緊張、沈黙、間、リアクション、結末/);
  assert.match(prompt, /全4コマで既存の絵柄と通常頭身を維持/);
  assert.match(prompt, /ギャグ化、ちびキャラ化、コミカルなデフォルメを追加しない/);
  assert.doesNotMatch(prompt, /- ギャグ演出:/);
});

test('narrative timing enhancement remains gag-oriented outside Serious Documentary', () => {
  const prompt = buildScenarioEnhancementPrompt({
    scenario,
    selectedCategories: ['gag'],
    punchlineType: 'GagDocumentary',
  });

  assert.match(prompt, /- ギャグ演出:/);
  assert.doesNotMatch(prompt, /- シリアス演出:/);
});

test('Serious Documentary validation rejects a chibi emotion tag introduced by enhancement', () => {
  const candidateScenario = scenario.replace(
    '[EMOTION: SHADOW]\n[Camera: 引き]',
    '[EMOTION: CHIBI_GAG]\n[Camera: 引き]',
  );
  const validation = validateScenarioEnhancement({
    originalScenario: scenario,
    candidateScenario,
    selectedCategories: ['gag'],
    punchlineType: 'SeriousDocumentary',
  });

  assert.equal(validation.ok, false);
  assert.ok(validation.issueCodes.includes('serious_style_switch'));
});

test('STEP2 and STEP4 label the same enhancement category from the selected ending mode', async () => {
  const [step2, step4, hook, provider] = await Promise.all([
    readFile(new URL('../src/components/Step2Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8'),
  ]);

  assert.match(step2, /const isSeriousEnhancementMode = getEndingModePolicy\(punchlineType\)\.endingTone === 'serious';/);
  assert.match(step2, /isSeriousEnhancementMode \? 'シリアス演出' : 'ギャグ演出'/);
  assert.match(step2, /isSeriousEnhancementMode \? '緊張・間・結末' : '間・反応・オチ'/);
  assert.match(step4, /isSeriousEnhancementMode \? "シリアス演出強化" : "ギャグ演出強化"/);
  assert.match(hook, /enhanceScenarioText\(\{[\s\S]*?punchlineType,[\s\S]*?\}\)/);
  assert.match(provider, /buildScenarioEnhancementPrompt\(\{[\s\S]*?punchlineType,[\s\S]*?\}\)/);
});
