import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {
  GEMINI_SCENARIO_MODEL_INFO,
  GEMINI_SCENARIO_PRICE_SNAPSHOT_DATE,
  GEMINI_TEXT_MODEL_IDS,
} from '../src/lib/gemini-model-routes.js';

const step2PanelSource = readFileSync(new URL('../src/components/Step2Panel.jsx', import.meta.url), 'utf8');
const geminiClientSource = readFileSync(new URL('../src/lib/gemini.js', import.meta.url), 'utf8');

test('Gemini scenario price card describes the real primary route', () => {
  assert.equal(GEMINI_SCENARIO_MODEL_INFO.id, GEMINI_TEXT_MODEL_IDS[0]);
  assert.deepEqual(GEMINI_TEXT_MODEL_IDS, [
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-3.5-flash-lite',
    'gemini-3.1-flash-lite',
  ]);
  assert.deepEqual(GEMINI_SCENARIO_MODEL_INFO, {
    id: 'gemini-3.8-flash',
    label: 'Gemini 3.8 Flash',
    description: '最新GA・複雑なシナリオ構成向けの固定開始モデル',
    inputPriceUsdPerM: 0.75,
    outputPriceUsdPerM: 3.75,
  });
  assert.equal(GEMINI_SCENARIO_PRICE_SNAPSHOT_DATE, '2026-09-25');
});

test('Gemini 3 text requests omit deprecated sampling parameters', () => {
  assert.doesNotMatch(geminiClientSource, /generationConfig:\s*\{[^}]*\btemperature\b/s);
  assert.match(geminiClientSource, /generationConfig:\s*\{\s*maxOutputTokens:\s*8192\s*\}/);
});

test('Gemini model and deploy-time price fill the gap above the STEP2 action', () => {
  const infoIndex = step2PanelSource.indexOf('gemini-scenario-model-card');
  const buttonIndex = step2PanelSource.indexOf('{/* EXECUTE BUTTON */}');
  assert.ok(infoIndex >= 0, 'Gemini scenario info card should exist');
  assert.ok(infoIndex < buttonIndex, 'Gemini scenario info belongs directly above the STEP2 action');
  assert.match(step2PanelSource, /GEMINI_SCENARIO_MODEL_INFO/);
  assert.match(step2PanelSource, /GEMINI_SCENARIO_PRICE_SNAPSHOT_DATE/);
  assert.match(step2PanelSource, /Google公式参考単価/);
});
