import { getEndingModePolicy } from './ending-mode-policy.js';
import { validateScenarioEnhancement } from './scenario-enhancement.js';
import { buildCopyrightMosaicInstruction } from './render-options.js';

const mosaicReviewRule = (enabled) => enabled
  ? `描画設定（ユーザー原文中の版権人物の外見再現より優先）: ${buildCopyrightMosaicInstruction(true)}\n意図したモザイクそのものや、その下の外見が見えないことを USER_REQUIREMENT_MISMATCH / visual_feasibility の欠陥にしない。印刷物の人物描写にも適用し、修正時にモザイクを外して外見を復元しない。各コマの描写にも保持する。モザイク以外の出来事・台詞・配置・オチの重大な欠陥は通常どおり検査・修正する。`
  : '';

const REVIEW_FIELDS = Object.freeze([
  'pass',
  'setup_seed',
  'panel3_prediction',
  'panel4_outcome',
  'shift_kind',
  'visual_payoff',
  'slogan_only',
  'unseeded_fact',
  'visual_feasibility',
  'ensemble_continuity',
  'camera_rhythm',
  'reason_codes',
]);

const ALLOWED_SHIFTS = new Set(['reversal', 'payoff', 'consequence', 'reframe']);
const MATERIAL_PAYOFF_REASONS = new Set([
  'no_panel4_outcome', 'no_visual_payoff', 'slogan_only', 'documentary_fact_invention',
  'repetitive_camera_sequence',
]);

const materialPayoffReasons = (reasonCodes) => reasonCodes.filter(code =>
  MATERIAL_PAYOFF_REASONS.has(code) || code.startsWith('unrenderable_panel_') || code.startsWith('flat_ensemble_panel_'));

const isStagingOnlyRepair = (reasonCodes) => {
  const material = materialPayoffReasons(reasonCodes);
  return material.length > 0 && material.every(code => code === 'repetitive_camera_sequence' || /^(?:unrenderable|flat_ensemble)_panel_[1-4]$/.test(code));
};

const PAYOFF_REASON_LABELS = {
  no_setup_seed: '1〜2コマ目にオチの種がない',
  no_panel3_prediction: '3コマ目までに読者の予測が作れない',
  no_panel4_outcome: '4コマ目の帰結が見えない',
  no_visual_payoff: '絵で伝わるオチがない',
  slogan_only: '4コマ目が標語・説明だけになっている',
  no_payoff_shift: '予測から帰結への変化がない',
  documentary_fact_invention: '原文にない事実が追加された',
};

export const formatPayoffReviewReasons = (evaluation, review) =>
  (evaluation?.reasonCodes || []).map(code => {
    if (code === 'repetitive_camera_sequence') {
      const camera = review.camera_rhythm;
      return `${camera.repeated_panels.join('・')}コマのカメラが反復して見せ場の差を失っています（${camera.evidence}）`;
    }
    const stagingPanel = /^flat_ensemble_panel_(\d+)$/.exec(code);
    if (stagingPanel) {
      const evidence = review?.ensemble_continuity?.find(item => item.panel === Number(stagingPanel[1]))?.evidence;
      return `${stagingPanel[1]}コマ目の人物演技・連続性が弱い${evidence ? `（${evidence}）` : ''}`;
    }
    const panel = /^unrenderable_panel_(\d+)$/.exec(code);
    if (!panel) return PAYOFF_REASON_LABELS[code] || code;
    const evidence = review?.visual_feasibility?.find(item => item.panel === Number(panel[1]))?.evidence;
    return `${panel[1]}コマ目の配置・判読が難しい${evidence ? `（${evidence}）` : ''}`;
  }).join(' / ');

const extractText = (value) => String(value?.text ?? value ?? '').trim();

export const buildScenarioPayoffReviewPrompt = ({ scenario, punchlineType, userTopic, mosaicCopyrightedCharacters = true } = {}) => {
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
${mosaicReviewRule(mosaicCopyrightedCharacters)}
${userTopic ? `
USER REQUIREMENTS (監査の基準となるユーザー原文):
${String(userTopic).trim()}
- 明示された人物・台詞・出来事・オチを監査側の好みで失格にしない。指定された終幕の語句を「原文にない追加事実」と扱わない。指定内で絵として伝わるかを判定する。表情・姿勢・視線による認識のズレも視覚的帰結になり、物の破壊や別の事件は必須ではない。
` : ''}

判定条件:
- 初回画像の構図を守る。既に別コマで読める印字の再掲、全員の細かな表情、補助的な手元を毎コマ拡大する義務はない。ユーザーが明示した再掲可読条件は守るが、AIが追加した反復可読要求だけで引き・アオリ・身体演技を寄りへ変えない。横長4コマの高さは内容に応じて可変であり、等高の帯を前提にしない。
- visual_feasibilityにはmaterial_lossを併記する。feasible=falseでも、そのコマでユーザー必須情報・初めて読む重要文字・物語に必要な動作・台詞と話者の対応を失うときだけmaterial_loss=true。evidenceに失われる内容と必要な理由を書く。既出文字の小ささや補助細部だけならmaterial_loss=falseとし、修正案を出さない。修正は主動作と距離・上下角を保つ余白、コマ高、前後配置、情報配分から検討する。
- setup_seed: 1〜2コマ目に置かれた、4コマ目へ効く具体的な種。
- panel3_prediction: 3コマ目までに読者が自然に予測する次の展開。
- panel4_outcome: 4コマ目で実際に起きる、目で確認できる帰結。
- shift_kind: reversal / payoff / consequence / reframe / none のいずれか。
- visual_payoff: セリフの説明や標語ではなく、人物の行動・表情・小道具・空間変化で帰結が見えるか。
- slogan_only: 4コマ目がまとめ、教訓、標語、解説だけで終わるなら true。
- unseeded_fact: 4コマ目だけに新しい事実を持ち込み成立させているなら true。
- visual_feasibility: BalloonLayoutがある場合は台詞順・話者・xの右→左と、anchor/routeがCamera・状況の人物配置に一致し、非話者の顔を横切らない余白で尾を結べるか確認する。明確な矛盾のみfeasible=falseとして同じ事件と演技を保つ配置修正へ。配置が未確定なだけで同じ高さの横並びへ戻さない。4コマそれぞれについて、指定Cameraから見た人物・身体・手・対象物の位置を頭の中で一枚に配置する。各コマは縦A4を4分割した横長の帯である。物理的に手が届き、物語上重要な動作・接触・文字・位置関係がその画角と人物の大きさで読める場合だけ feasible=true。遠景で複数の小さな手元を同時に判読させる等、具体的に成立しない場合は false。人数・勢い・誇張・シュールさだけで false にしてはならない。面白さ、キャラクターの生きた演技、オチを最優先し、具体的な衝突や読めない対象を evidence に示す。false なら、題材・オチ・ユーザーの明示指定を保ち、カメラ・前後関係・小道具の見せ方や補助動作のコマ配分で直す correction を書く。
- ensemble_continuity: 同じ監査呼び出しで4コマの人物配置と演技を確認する。複数人が見えるコマでは、前後・左右・距離、顔と身体の向き、誰の働きかけが誰の反応や次の動作へつながるかを、シナリオの具体的な人物名と動作から判定する。前のコマの位置・手・小道具・視線から自然につながるかも確認する。配置が分散していても、同じ顔・視線・反応を複製して働きかけと受け手の違いが消え、物語上の相互作用が読めない明確な場合は material_break=true。横並び、口の開閉だけ、軽微な差や好みでは失格にしない。誰かの動作や感情が相手へ伝わる自然さを判定し、人物数・反応の種類・奥行き段数のノルマは設けない。明示された整列、共同作業、一斉注視、意図的な静止や沈黙、単独人物、画面外の人物には機械的に違うポーズや位置を要求せず false。evidence には台本上の人物・動作・位置の根拠、true なら correction に同じ出来事を保つ具体的な演技・配置の修正を書く。
- camera_rhythm: 4コマ全体を比較し、shotsへ各Cameraの実際の投影signature（上下・左右前後、仰俯角、寄り引き、レンズ遠近／魚眼、ロール、人物配置）と物語上のpurposeを書く。隣接だけでなく離れたコマも比較する。肩越し・Hyper Perspective・Slant等の名称が違っても、同じアオリ・距離・遠近が続き発見／反応／見せ場の差を明確に消すなら material_repeat=true。repeated_panelsに該当コマ、evidenceに重なる投影と失われた役割、correctionに同じ事件・台詞・演技・読順を保つ具体的なカメラ変更を書く。同じ高さだけ、好み、軽微な差では false。ユーザー指定の同型ショットや意味のある反復演出はintentional_repeat=trueとして保持し、その根拠を書く。種類の数合わせや、既に生成AIが書いたCameraをユーザー固定指定とみなして見逃すことは禁止。 寄り・中景・引きも比較し、広角レンズだけで引きとみなさない。寄り続きで事件に必要な空間や人物間距離が読めない場合はその根拠と引きにするコマを示す。意図した寄りだけのページや、空間が既に読める場合は維持する。
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
  "visual_feasibility": [{"panel":1,"feasible":true,"evidence":"camera, actor, and focal hand/prop relation at readable scale","correction":""},{"panel":2,"feasible":true,"evidence":"camera, actor, and focal hand/prop relation at readable scale","correction":""},{"panel":3,"feasible":true,"evidence":"camera, actor, and focal hand/prop relation at readable scale","correction":""},{"panel":4,"feasible":true,"evidence":"camera, actor, and focal hand/prop relation at readable scale","correction":""}],
  "ensemble_continuity": [{"panel":1,"material_break":false,"evidence":"specific cast positions, actions and reactions or why stillness is intentional","correction":""},{"panel":2,"material_break":false,"evidence":"specific cast positions, actions and reactions or why stillness is intentional","correction":""},{"panel":3,"material_break":false,"evidence":"specific cast positions, actions and reactions or why stillness is intentional","correction":""},{"panel":4,"material_break":false,"evidence":"specific cast positions, actions and reactions or why stillness is intentional","correction":""}],
  "camera_rhythm": {"shots":[{"panel":1,"signature":"physical camera geometry","purpose":"story role"},{"panel":2,"signature":"physical camera geometry","purpose":"story role"},{"panel":3,"signature":"physical camera geometry","purpose":"story role"},{"panel":4,"signature":"physical camera geometry","purpose":"story role"}],"repeated_panels":[],"material_repeat":false,"intentional_repeat":false,"evidence":"cross-panel comparison grounded in Camera and story actions","correction":""},
  "reason_codes": []
}

SCENARIO:
${String(scenario || '').trim()}`;
};

const hasCameraRhythmEvidence = (camera) => {
  const nonempty = value => typeof value === 'string' && value.trim().length > 0;
  return Boolean(camera
    && Array.isArray(camera.shots) && camera.shots.length === 4
    && camera.shots.every((shot, index) => shot?.panel === index + 1 && nonempty(shot.signature) && nonempty(shot.purpose))
    && Array.isArray(camera.repeated_panels)
    && camera.repeated_panels.every(panel => Number.isInteger(panel) && panel >= 1 && panel <= 4)
    && new Set(camera.repeated_panels).size === camera.repeated_panels.length
    && typeof camera.material_repeat === 'boolean' && typeof camera.intentional_repeat === 'boolean'
    && nonempty(camera.evidence) && typeof camera.correction === 'string'
    && (!camera.material_repeat || camera.intentional_repeat
      || (camera.repeated_panels.length >= 2 && nonempty(camera.correction))));
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
    || !Array.isArray(parsed.visual_feasibility)
    || parsed.visual_feasibility.length !== 4
    || parsed.visual_feasibility.some((item, index) => item?.panel !== index + 1
      || typeof item.feasible !== 'boolean'
      || (!item.feasible && typeof item.material_loss !== 'boolean')
      || typeof item.evidence !== 'string' || !item.evidence.trim()
      || typeof item.correction !== 'string'
      || (!item.feasible && item.material_loss && !item.correction.trim()))
    || !Array.isArray(parsed.ensemble_continuity)
    || parsed.ensemble_continuity.length !== 4
    || parsed.ensemble_continuity.some((item, index) => item?.panel !== index + 1
      || typeof item.material_break !== 'boolean'
      || typeof item.evidence !== 'string' || !item.evidence.trim()
      || typeof item.correction !== 'string'
      || (item.material_break && !item.correction.trim()))
    || !hasCameraRhythmEvidence(parsed.camera_rhythm)
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
    : new Set((review?.reason_codes || []).filter(Boolean).map(String)
      // Panel evidence is authoritative, not an unsupported model-generated code.
      .filter(code => !code.startsWith('flat_ensemble_panel_') && !code.startsWith('unrenderable_panel_') && code !== 'repetitive_camera_sequence'));

  if (!surrealMode && !String(review?.setup_seed || '').trim()) reasons.add('no_setup_seed');
  if (!surrealMode && !String(review?.panel3_prediction || '').trim()) reasons.add('no_panel3_prediction');
  if (!String(review?.panel4_outcome || '').trim()) reasons.add('no_panel4_outcome');
  if (!review?.visual_payoff) reasons.add('no_visual_payoff');
  if (review?.slogan_only) reasons.add('slogan_only');
  if (!surrealMode && !ALLOWED_SHIFTS.has(review?.shift_kind)) reasons.add('no_payoff_shift');
  if (!surrealMode && review?.unseeded_fact) reasons.add('unseeded_fact');
  if (policy.documentary && review?.unseeded_fact) reasons.add('documentary_fact_invention');
  for (const item of review?.visual_feasibility || []) {
    if (item?.feasible === false) reasons.add(item.material_loss === true
      ? `unrenderable_panel_${item.panel}` : `visual_detail_panel_${item.panel}`);
  }
  for (const item of review?.ensemble_continuity || []) {
    if (item?.material_break === true) reasons.add(`flat_ensemble_panel_${item.panel}`);
  }
  const camera = review?.camera_rhythm;
  if (hasCameraRhythmEvidence(camera) && camera.material_repeat && !camera.intentional_repeat) reasons.add('repetitive_camera_sequence');
  if (!surrealMode && !review?.pass && reasons.size === 0) reasons.add('reviewer_rejected');

  return { ok: (surrealMode || review?.pass === true) && reasons.size === 0, reasonCodes: [...reasons] };
};

export const buildScenarioPayoffRepairPrompt = ({ scenario, punchlineType, review, userTopic, mosaicCopyrightedCharacters = true } = {}) => {
  const surrealMode = punchlineType === 'Surreal';
  const reasonCodes = evaluateScenarioPayoffReview(review, { punchlineType }).reasonCodes;
  const stagingOnly = isStagingOnlyRepair(reasonCodes);
  const repairReview = { ...review, reason_codes: reasonCodes,
    visual_feasibility: review?.visual_feasibility?.map(item => item.material_loss === false
      ? { ...item, correction: '' } : item) };
  return `あなたは4コマ漫画の構成編集者です。${stagingOnly
    ? '監査で指摘された演技・配置・カメラだけを修正し、連続性に必要な隣接コマの調整にとどめてください。題材・出来事・オチ、各コマの台詞の話者・文言・順序は変更禁止です。'
    : '監査結果を踏まえ、4コマ目だけを差し替えるのではなく、1〜4コマ目全体を書き直してください。'}

ENDING MODE: ${punchlineType || 'Auto'}
監査結果: ${JSON.stringify(repairReview, null, 2)}
${mosaicReviewRule(mosaicCopyrightedCharacters)}

必須条件:
- visual_feasibilityはmaterial_loss=trueの具体的な欠落だけを直す。既出印字の再掲可読性や補助細部だけのために、引き・アオリ・身体演技を顔中心へ変更しない。必要な情報を初めて読むコマと、身体演技を見せるコマを分け、内容に応じたコマ高と前後配置で解決する。ユーザーが明示した可読文字・カメラ・動作は保持する。
${stagingOnly ? '- 成立しているフリ・予測・帰結はそのまま保持する。新しい種や別のオチを追加しない。' : surrealMode
    ? '- 静寂型（シュール）では論理的な種、自然な予測、因果の回収を追加しない。物・設備・舞台の大破壊、因果の飛躍、支離滅裂、不条理を、真顔・沈黙・奇妙な間で目に見える笑いへ強める。辻褄合わせや後付け説明で合理化しない。'
    : `- 1〜2コマ目に具体的な種を置き、3コマ目までに読者の予測を形成し、4コマ目ではその予測を一段ずらす帰結を人物の行動・表情・小道具・空間変化で見せる。
- 3コマ目で宣言・準備した行動を4コマ目でそのまま実行するだけにしない。1〜2コマ目に置いた別の種を再利用し、規模・意味・対象・行為者の少なくとも1つを意外に変える。`}
- 選択された ENDING MODE を守る。シリアスでは安いギャグ反転を強制せず、選択の結果・再解釈・余韻を成立させる。
- 元シナリオの題材、人物、場所、事実、数値、時系列、明示された衣装とセリフ書式を保存する。ドキュメンタリーでは事実を発明しない。
- 各コマを一枚の横長帯として描けるよう、Cameraから重要な顔・手元・対象物が見える位置へ人物と小道具を配置する。手は本人の肩・腕から自然につながり、対象に届くこと。監査で指摘された過密・遮蔽・距離矛盾を、カメラ・前後関係・小道具の見せ方や補助動作のコマ配分で解消する。題材の核、オチの迫力、人物の生きた演技、シュールな飛躍を弱めない。ユーザーが明示したカメラ・動作は保持する。
- 前のコマから連続した動作と位置、小道具の持ち主を引き継ぎ、働きかける人物と受け手の反応を前後関係・視線・身体の向き・重心で描き分ける。監査で指摘された横並びと同一反応を、元の出来事・台詞・意図的な静止や一斉動作を保ちながら直す。全員に余計な動作を増やさない。
- カメラ反復の指摘は、各コマの役割に合わせて撮影位置・仰俯角・距離・レンズ・ロール・配置を組み直す。全4コマの見える投影を比較し、名称だけの変更、固定の角度巡回、全コマのアオリ化を避ける。ユーザーの固定指定、意味のある反復、連続した人物関係と読みやすい吹き出しの順・尾を保持し、画質・演技・光・勢いを弱めない。
- 4コマ目を標語、教訓、解説だけで終わらせない。
- 出力は${stagingOnly ? '元のタイトル・メタデータ行を保持し、' : ''} [1コマ目: 起] から [4コマ目: 結] までのシナリオ本文だけにする。
${userTopic ? `- 次のユーザー原文にある人物・台詞・出来事・カメラ・オチなどの明示条件を最優先で保持する。画像化の調整で削除・反転しない。\nUSER REQUIREMENTS:\n${String(userTopic).trim()}` : ''}

ORIGINAL SCENARIO:
${String(scenario || '').trim()}`;
};

const retained = (scenario, warning, review = null, renderabilityWarning = false) => ({
  scenario,
  status: 'retained',
  review,
  warning,
  renderabilityWarning,
});

export const runScenarioPayoffGate = async ({
  scenario,
  punchlineType,
  userTopic,
  mosaicCopyrightedCharacters = true,
  requestReview,
  requestRepair,
  validateRepair = () => true,
  onProgress = () => {},
} = {}) => {
  const original = String(scenario || '').trim();
  let firstReview;
  let firstEvaluation;

  try {
    onProgress('4コマのフリ・予測・帰結、配置・演技とカメラの反復を監査しています...');
    firstReview = parseScenarioPayoffReview(await requestReview(buildScenarioPayoffReviewPrompt({
      scenario: original,
      punchlineType,
      userTopic,
      mosaicCopyrightedCharacters,
    })));
    firstEvaluation = evaluateScenarioPayoffReview(firstReview, { punchlineType });
  } catch (error) {
    onProgress(`構成・画像化の検査結果: 判定できませんでした。理由: ${error.message}。元シナリオを保持します。`);
    return retained(original, `構成・画像化監査を完了できなかったため、元シナリオを保持しました（${error.message}）。`, null, true);
  }

  if (firstEvaluation.ok) {
    onProgress('4コマの構成と画像化可能な配置が成立しています。');
    return { scenario: original, status: 'passed', review: firstReview, warning: null };
  }
  const firstMaterialReasons = materialPayoffReasons(firstEvaluation.reasonCodes);
  if (!firstMaterialReasons.length) {
    onProgress(`構成・画像化の検査結果: ${formatPayoffReviewReasons(firstEvaluation, firstReview)}。重大欠陥ではないため再生成せず保持します。`);
    return retained(original, `構成上の軽微または未確認の指摘（${firstEvaluation.reasonCodes.join(', ')}）は再生成せず、元シナリオを保持しました。`, firstReview);
  }
  onProgress(`構成・画像化の再検査理由: ${formatPayoffReviewReasons(firstEvaluation, firstReview)}。重大な指摘だけを修正します。`);
  const maxRepairs = isStagingOnlyRepair(firstEvaluation.reasonCodes) ? 1 : 3;
  let best = { scenario: original, review: firstReview, evaluation: firstEvaluation };
  let current = best;
  let lastError = '';
  for (let attempt = 1; attempt <= maxRepairs; attempt += 1) {
    let repaired;
    try {
      onProgress(`構成・画像化を改善しています（${attempt}/${maxRepairs}）。`);
      repaired = extractText(await requestRepair(buildScenarioPayoffRepairPrompt({
        scenario: current.scenario,
        punchlineType,
        review: current.review,
        userTopic,
        mosaicCopyrightedCharacters,
      }))).replace(/^Scenario:\s*/i, '').trim();
      if (!repaired) throw new Error('empty repair');
      const validatedRepair = await validateRepair(repaired);
      if (validatedRepair === false) throw new Error('invalid repair');
      if (typeof validatedRepair === 'string' && validatedRepair.trim()) repaired = validatedRepair.trim();
      if (isStagingOnlyRepair(current.evaluation.reasonCodes)) {
        const guard = validateScenarioEnhancement({
          originalScenario: current.scenario, candidateScenario: repaired,
          selectedCategories: ['expressions', 'action', 'camera', 'background', 'gag'], punchlineType,
        });
        const protectedChanges = guard.issueCodes.filter(code => [
          'metadata_changed', 'panel_structure_changed', 'speaker_sequence_changed', 'dialogue_changed_without_selection',
        ].includes(code));
        if (protectedChanges.length) throw new Error(`staging_only_scope_violation: ${protectedChanges.join(', ')}`);
      }
      onProgress(`改善案を再監査しています（${attempt}/${maxRepairs}）。`);
      const review = parseScenarioPayoffReview(await requestReview(buildScenarioPayoffReviewPrompt({
        scenario: repaired,
        punchlineType,
        userTopic,
        mosaicCopyrightedCharacters,
      })));
      const evaluation = evaluateScenarioPayoffReview(review, { punchlineType });
      onProgress(evaluation.ok
        ? `改善案の再検査結果 ${attempt}/${maxRepairs}: 合格。構成と画像化可能な配置を確認しました。`
        : `改善案の再検査結果 ${attempt}/${maxRepairs}: ${formatPayoffReviewReasons(evaluation, review)}。`);
      current = { scenario: repaired, review, evaluation };
      if (evaluation.ok) {
        onProgress('改善案の構成と画像化可能な配置を確認しました。');
        return { scenario: repaired, status: 'repaired', review, warning: null };
      }
      if (!materialPayoffReasons(evaluation.reasonCodes).length) {
        onProgress('重大な構成・画像化の問題は解消しました。軽微な指摘は再生成せず保持します。');
        return { scenario: repaired, status: 'repaired', review, warning: `軽微な構成指摘: ${evaluation.reasonCodes.join(', ')}` };
      }
      const materialCount = materialPayoffReasons(evaluation.reasonCodes).length;
      const bestMaterialCount = materialPayoffReasons(best.evaluation.reasonCodes).length;
      if (materialCount < bestMaterialCount
        || (materialCount === bestMaterialCount && evaluation.reasonCodes.length < best.evaluation.reasonCodes.length)) best = current;
    } catch (error) {
      lastError = error.message;
      current = best;
      onProgress(`改善案は採用せず、最良候補から再試行します（${attempt}/${maxRepairs}）。理由: ${error.message}`);
    }
  }
  const renderabilityWarning = best.evaluation.reasonCodes.some(code => code.startsWith('unrenderable_panel_'));
  const warning = `改善・再監査を${maxRepairs}回行いました。最良の検証済み候補を警告付きで採用します（${best.evaluation.reasonCodes.join(', ')}${lastError ? `; ${lastError}` : ''}）。`;
  onProgress(warning);
  return {
    scenario: best.scenario,
    status: best.scenario === original ? 'retained' : 'best_effort',
    review: best.review,
    warning,
    renderabilityWarning,
  };
};
