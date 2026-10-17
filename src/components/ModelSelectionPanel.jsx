import React from 'react';
import {
  OPENAI_SCENARIO_MODEL_OPTIONS,
  OPENAI_SCENARIO_PRICE_SNAPSHOT_DATE,
  OPENAI_VISION_MODEL_IDS,
} from '../lib/openai-model-routes.js';

const MODEL_CHOICES = [
  { step: 'STEP1', purpose: '素材の画像解析', value: 'analysisModelId', setter: 'setAnalysisModelId', vision: true },
  { step: 'STEP2', purpose: 'シナリオ生成・強化', value: 'scenarioModelId', setter: 'setScenarioModelId' },
  { step: 'STEP3', purpose: '描画指示の構築・確認', value: 'promptModelId', setter: 'setPromptModelId' },
];

export default function ModelSelectionPanel({
  analysisModelId, setAnalysisModelId,
  scenarioModelId, setScenarioModelId,
  promptModelId, setPromptModelId,
  disabled = false,
}) {
  const values = { analysisModelId, scenarioModelId, promptModelId };
  const setters = { setAnalysisModelId, setScenarioModelId, setPromptModelId };
  return (
    <section className="model-selection-panel" aria-label="制作前のOpenAIモデル選択">
      <h2>🧠 使用モデルを選ぶ</h2>
      <div className="model-selection-grid">
        {MODEL_CHOICES.map(({ step, purpose, value, setter, vision }) => (
          <div className="model-selection-card" key={step}>
            <label htmlFor={`model-${step.toLowerCase()}`}>{step} · {purpose}</label>
            <select
              id={`model-${step.toLowerCase()}`}
              className="scenario-model-select-input"
              value={values[value]}
              onChange={event => setters[setter](event.target.value)}
              disabled={disabled}
            >
              {OPENAI_SCENARIO_MODEL_OPTIONS.filter(({ id }) => !vision || OPENAI_VISION_MODEL_IDS.includes(id)).map(
                ({ id, label, inputPriceUsdPerM, outputPriceUsdPerM }) => (
                  <option key={id} value={id}>{label} · 入力 ${inputPriceUsdPerM} / 出力 ${outputPriceUsdPerM}</option>
                )
              )}
            </select>
          </div>
        ))}
      </div>
      <p className="model-selection-note">参考単価は{OPENAI_SCENARIO_PRICE_SNAPSHOT_DATE}時点のUSD/100万トークン。選択はこの画面を開いている間だけ有効です。</p>
    </section>
  );
}
