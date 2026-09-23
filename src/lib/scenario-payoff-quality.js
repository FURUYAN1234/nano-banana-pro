import { getEndingModePolicy } from './ending-mode-policy.js';

const REVIEW_FIELDS = Object.freeze([
  'pass',
  'setup_seed',
  'panel3_prediction',
  'panel4_outcome',
  'shift_kind',
  'visual_payoff',
  'slogan_only',
  'unseeded_fact',
  'reason_codes',
]);

const ALLOWED_SHIFTS = new Set(['reversal', 'payoff', 'consequence', 'reframe']);

const extractText = (value) => String(value?.text ?? value ?? '').trim();

export const buildScenarioPayoffReviewPrompt = ({ scenario, punchlineType } = {}) => {
  const policy = getEndingModePolicy(punchlineType);
  const surrealMode = punchlineType === 'Surreal';
  const toneRule = surrealMode
    ? '静寂型（シュール）では、通常の因果関係や辻褄を要求しない。物・設備・舞台の大破壊、因果の飛躍、支離滅裂、不条理、突然の無意味な変化を、真顔・沈黙・奇妙な間で視覚的な笑いにできていれば有効とする。後付け説明で合理化しない。'
    : policy.endingTone === 'serious'
    ? 'シリアスでは笑いの反転を強制せず、積み上げた選択の consequence / reframe / payoff を有効とする。'
    : 'ギャグでは、1〜2コマ目の種と3コマ目の読者予測を、4コマ目の reversal / payoff / reframe / consequence で一段ずらす。予測と同じ出来事でも、規模・意味・対象・行為者が意外に増幅され、画面で分かるなら有効な payoff / consequence とする。反転だけを要求しない。';
  const factRule = policy.documentary
    ? 'ドキュメンタリーでは、元シナリオにない新しい事実・数値・時系列を4コマ目へ追加してはならない。追加されていれば unseeded_fact=true。'
    : '新しい事実だけで結末を成立させず、1〜3コマ目に種があるかを判定する。';

  return `あなたは4コマ漫画の構成監査担当です。次のシナリオを、選択された結末モードに合わせて厳格に監査してください。

ENDING MODE: ${punchlineType || 'Auto'}
${toneRule}
${factRule}

判定条件:
- setup_seed: 1〜2コマ目に置かれた、4コマ目へ効く具体的な種。
- panel3_prediction: 3コマ目までに読者が自然に予測する次の展開。
- panel4_outcome: 4コマ目で実際に起きる、目で確認できる帰結。
- shift_kind: reversal / payoff / consequence / reframe / none のいずれか。
- visual_payoff: セリフの説明や標語ではなく、人物の行動・表情・小道具・空間変化で帰結が見えるか。
- slogan_only: 4コマ目がまとめ、教訓、標語、解説だけで終わるなら true。
- unseeded_fact: 4コマ目だけに新しい事実を持ち込み成立させているなら true。
- pass: 上記を総合し、最後まで読ませる4コマとして成立するときだけ true。
- 静寂型（シュール）では setup_seed と panel3_prediction は空でもよく、shift_kind=none と unseeded_fact=true だけで失格にしない。目で分かる不条理な出来事または大破壊と、その狂気を殺さない真顔・沈黙・間があれば pass=true にできる。
- 3コマ目から因果的に続くこと自体を失格理由にしない。予測の単なる反復ではなく、規模・意味・対象・行為者のどれかが一段ずれていれば合格可能。
- pass=true のとき reason_codes は必ず空配列にする。問題が1つでも残るときだけ pass=false として具体的なコードを入れる。

以下のJSONのみを返してください。reason_codes は問題コードの配列です。
{
  "pass": true,
  "setup_seed": "",
  "panel3_prediction": "",
  "panel4_outcome": "",
  "shift_kind": "reversal",
  "visual_payoff": true,
  "slogan_only": false,
  "unseeded_fact": false,
  "reason_codes": []
}

SCENARIO:
${String(scenario || '').trim()}`;
};

export const parseScenarioPayoffReview = (text) => {
  const source = extractText(text).replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  const jsonText = source.match(/\{[\s\S]*\}/)?.[0];
  if (!jsonText) throw new Error('incomplete_payoff_review: JSON object not found');

  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch (error) {
    throw new Error(`incomplete_payoff_review: ${error.message}`);
  }

  if (!parsed || REVIEW_FIELDS.some((field) => !Object.hasOwn(parsed, field))) {
    throw new Error('incomplete_payoff_review: required fields are missing');
  }
  if (
    typeof parsed.pass !== 'boolean'
    || typeof parsed.setup_seed !== 'string'
    || typeof parsed.panel3_prediction !== 'string'
    || typeof parsed.panel4_outcome !== 'string'
    || typeof parsed.shift_kind !== 'string'
    || typeof parsed.visual_payoff !== 'boolean'
    || typeof parsed.slogan_only !== 'boolean'
    || typeof parsed.unseeded_fact !== 'boolean'
    || !Array.isArray(parsed.reason_codes)
  ) {
    throw new Error('incomplete_payoff_review: invalid field types');
  }
  return parsed;
};

export const evaluateScenarioPayoffReview = (review, { punchlineType } = {}) => {
  const policy = getEndingModePolicy(punchlineType);
  const surrealMode = punchlineType === 'Surreal';
  const reasons = surrealMode
    ? new Set()
    : new Set((review?.reason_codes || []).filter(Boolean).map(String));

  if (!surrealMode && !String(review?.setup_seed || '').trim()) reasons.add('no_setup_seed');
  if (!surrealMode && !String(review?.panel3_prediction || '').trim()) reasons.add('no_panel3_prediction');
  if (!String(review?.panel4_outcome || '').trim()) reasons.add('no_panel4_outcome');
  if (!review?.visual_payoff) reasons.add('no_visual_payoff');
  if (review?.slogan_only) reasons.add('slogan_only');
  if (!surrealMode && !ALLOWED_SHIFTS.has(review?.shift_kind)) reasons.add('no_payoff_shift');
  if (!surrealMode && review?.unseeded_fact) reasons.add('unseeded_fact');
  if (policy.documentary && review?.unseeded_fact) reasons.add('documentary_fact_invention');
  if (!surrealMode && !review?.pass && reasons.size === 0) reasons.add('reviewer_rejected');

  return { ok: (surrealMode || review?.pass === true) && reasons.size === 0, reasonCodes: [...reasons] };
};

export const buildScenarioPayoffRepairPrompt = ({ scenario, punchlineType, review } = {}) => {
  const surrealMode = punchlineType === 'Surreal';
  return `あなたは4コマ漫画の構成編集者です。監査結果を踏まえ、4コマ目だけを差し替えるのではなく、1〜4コマ目全体を一度だけ書き直してください。

ENDING MODE: ${punchlineType || 'Auto'}
監査結果: ${JSON.stringify(review || {}, null, 2)}

必須条件:
${surrealMode
    ? '- 静寂型（シュール）では論理的な種、自然な予測、因果の回収を追加しない。物・設備・舞台の大破壊、因果の飛躍、支離滅裂、不条理を、真顔・沈黙・奇妙な間で目に見える笑いへ強める。辻褄合わせや後付け説明で合理化しない。'
    : `- 1〜2コマ目に具体的な種を置き、3コマ目までに読者の予測を形成し、4コマ目ではその予測を一段ずらす帰結を人物の行動・表情・小道具・空間変化で見せる。
- 3コマ目で宣言・準備した行動を4コマ目でそのまま実行するだけにしない。1〜2コマ目に置いた別の種を再利用し、規模・意味・対象・行為者の少なくとも1つを意外に変える。`}
- 選択された ENDING MODE を守る。シリアスでは安いギャグ反転を強制せず、選択の結果・再解釈・余韻を成立させる。
- 元シナリオの題材、人物、場所、事実、数値、時系列、明示された衣装とセリフ書式を保存する。ドキュメンタリーでは事実を発明しない。
- 4コマ目を標語、教訓、解説だけで終わらせない。
- 出力は [1コマ目: 起] から [4コマ目: 結] までのシナリオ本文だけにする。

ORIGINAL SCENARIO:
${String(scenario || '').trim()}`;
};

const retained = (scenario, warning, review = null) => ({
  scenario,
  status: 'retained',
  review,
  warning,
});

export const runScenarioPayoffGate = async ({
  scenario,
  punchlineType,
  requestReview,
  requestRepair,
  validateRepair = () => true,
  onProgress = () => {},
} = {}) => {
  const original = String(scenario || '').trim();
  let firstReview;
  let firstEvaluation;

  try {
    onProgress('4コマのフリ・予測・帰結を監査しています...');
    firstReview = parseScenarioPayoffReview(await requestReview(buildScenarioPayoffReviewPrompt({
      scenario: original,
      punchlineType,
    })));
    firstEvaluation = evaluateScenarioPayoffReview(firstReview, { punchlineType });
  } catch (error) {
    return retained(original, `構成監査を完了できなかったため、検証済みの元シナリオを保持しました（${error.message}）。`);
  }

  if (firstEvaluation.ok) {
    onProgress('4コマのフリ・予測・帰結が成立しています。');
    return { scenario: original, status: 'passed', review: firstReview, warning: null };
  }

  let repaired;
  try {
    onProgress('4コマ目の帰結を強めるため、1〜4コマ目全体を一度だけ再構成しています...');
    repaired = extractText(await requestRepair(buildScenarioPayoffRepairPrompt({
      scenario: original,
      punchlineType,
      review: firstReview,
    }))).replace(/^Scenario:\s*/i, '').trim();
    if (!repaired) throw new Error('empty repair');
    const validatedRepair = await validateRepair(repaired);
    if (typeof validatedRepair === 'string' && validatedRepair.trim()) {
      repaired = validatedRepair.trim();
    }
  } catch (error) {
    return retained(original, `再構成案の検証に通らなかったため、元シナリオを保持しました（${error.message}）。`, firstReview);
  }

  try {
    onProgress('再構成案を再監査しています...');
    const secondReview = parseScenarioPayoffReview(await requestReview(buildScenarioPayoffReviewPrompt({
      scenario: repaired,
      punchlineType,
    })));
    const secondEvaluation = evaluateScenarioPayoffReview(secondReview, { punchlineType });
    if (!secondEvaluation.ok) {
      return retained(original, `再構成案が再監査に通らなかったため、元シナリオを保持しました（${secondEvaluation.reasonCodes.join(', ')}）。`, secondReview);
    }
    onProgress('再構成案のフリ・予測・帰結を確認しました。');
    return { scenario: repaired, status: 'repaired', review: secondReview, warning: null };
  } catch (error) {
    return retained(original, `再構成案の再監査を完了できなかったため、元シナリオを保持しました（${error.message}）。`, firstReview);
  }
};
