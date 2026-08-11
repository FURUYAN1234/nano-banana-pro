import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { buildSettingContinuityLock } from '../src/lib/setting-continuity.js';

const readSource = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('keeps only concrete location and explicit time-weather cues as a low-priority lock', () => {
  const scenario = `Location: 駅前広場
Scenario:
[1コマ目: 起]
状況: 夕方の雨上がり、二人が話す。`;
  const lock = buildSettingContinuityLock(scenario);

  assert.match(lock, /SETTING CONTINUITY \(LOW PRIORITY\)/);
  assert.match(lock, /駅前広場/);
  assert.match(lock, /夕方/);
  assert.match(lock, /雨上がり/);
  assert.match(lock, /subordinate to CHARACTER ANATOMY, HAND\/PROP OWNERSHIP, and DIALOGUE\/BUBBLE ACCURACY/);
  assert.doesNotMatch(lock, /Background(?:Space|Layers|Lighting|Atmosphere|Anchors|Interactions|Avoid)/);
});

test('omits the setting lock when no concrete Location is declared', () => {
  assert.equal(buildSettingContinuityLock('Scenario:\n状況: 二人が話す。'), '');
  assert.equal(buildSettingContinuityLock('Location: Unspecified\nScenario: ...'), '');
});

test('scenario generation and workflow no longer require or serialize the seven-field background schema', async () => {
  const [prompts, provider, workflow, assembler] = await Promise.all([
    readSource('../src/lib/prompts.js'),
    readSource('../src/lib/scenario-provider.js'),
    readSource('../src/hooks/useMangaWorkflow.js'),
    readSource('../src/lib/prompt-assembler.js'),
  ]);
  const combined = [prompts, provider, workflow, assembler].join('\n');

  assert.doesNotMatch(combined, /BackgroundSpace|BackgroundLayers|BackgroundLighting|BackgroundAtmosphere|BackgroundAnchors|BackgroundInteractions|BackgroundAvoid/);
  assert.doesNotMatch(combined, /DYNAMIC_BACKGROUND|dynamicBackground|assertDynamicBackground|formatDynamicBackground/);
  assert.match(assembler, /HAND_PROP_KINEMATICS_LOCK[\s\S]*?settingContinuityLock/);
});
