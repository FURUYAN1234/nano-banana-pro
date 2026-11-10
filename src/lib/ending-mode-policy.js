const DEFAULT_ENDING_POLICY = Object.freeze({
  documentary: false,
  endingTone: 'gag',
  preserveReferenceStyle: false,
  label: null
});

const ACTION_SCENARIO_DIRECTION = `【ページ全体のアクション演出】題材の主題を伝える一つの動きの流れを決め、序盤〜中盤から描く。結末より前の別々のコマで、動きが始まる瞬間と、その動きで人物・物・空間の状態が変わる瞬間を見せ、結末で結果や受け手の反応を回収する。各コマの「状況」に誰が何へどう働きかけ、どこへ動き、次のコマで何が変わったかを描ける形で書く。会話中心の題材でも、登場人物が元からある場所・物・課題に働きかける行動に情報を載せる。視線や指差し、効果線、カメラの変更だけで一連の動作を代用しない。
【一般ニュースにも適用】元記事が制度・価格・技術・生活の穏やかな話題でも、アクション選択時は人物の大胆な身体演技を設計する。記事の事実と、それを受けて動く漫画の登場人物の演出を区別する。新しく台本を作る場合は、そのニュースに関係する試行・作業・受け渡し・身を乗り出す反応など、キャストが何をするかから場面を組み立て、体を使って取り組む瞬間を見せ場にする。原文の登場人物が実際に飛び跳ねた・戦った等の虚偽の報道へ変えない。既存の完成台本を編集する場合は出来事・台詞を変えず、その動作の身体演技を強める。「ニュースなので会話だけ」でアクションを省略しない。
【アクション選択時の身体演技】出来事はそのまま、見せ場の動作を漫画らしく大胆な全身演技へ具体化する。「移動する・運ぶ・驚く」だけで済ませず、踏み込みや蹴り出し、重心の偏り、胴体の反り・ひねり、手足の伸縮、受け手の反動など、元の動作に合う力の方向とシルエットを状況に書く。全項目のノルマにはせず、動作の途中で最も力や変化が読める一瞬を各見せ場に選ぶ。ため・動作・反動や着地を前後のコマにつなぎ、単なる立ち歩きや物の位置替えだけでアクション選択を満たした扱いにしない。Cameraはその接点・身体軸・奥行きが読める撮影位置、寄り引き、短縮遠近や傾きを選び、全コマを同じ正面・距離にしない。強い遠近感はレンズに合わせ、望遠へ広角の誇張を強制せず、広角の四隅を黒くしない。意図した枠越えと縦長連結コマを活かせるが、全身を収めるために指定の接写・遮蔽を弱めない。
【選択を満たす動きの強さ】持つ・置く・指す・歩く・座る・立つという日常動作の列挙だけなら、手順の紹介として成立してもアクション選択には不足。「腰をひねる」「重心を移す」を添えただけの通常姿勢も同じ。身体の大きな振れ幅がシルエットから分かる動作の頂点を設計し、深く沈む膝から伸び上がる、身体を大きく反らして支える、腰と肩を逆方向へ強く回す、伸ばした手足と踏ん張る足で力を受ける等から、題材に合う演技を選ぶ。会話・手順説明だけで見せ場を埋めず、この動勢の開始と結果を絵でつなぐ。静かな題材や静かな場所であることは、ユーザーによる静止指定ではない。静粛さは声量で保てる。ニュースに関係する架空キャストの行動を漫画的に誇張でき、原文にない報道事実の捏造とは区別する。新規生成では演技が成立する場面を最初から選び、元からある作業を題材と無関係な事件に置き換えない。
一つのコマでは一つの時点を描き、受け止めた状態と接点を解いて構え直した状態など、同時に成立しない動作を重ねない。支持足が床に着くか空中にあるか、何が身体を支えるかを同じ瞬間の姿勢として整合させる。すべてのコマを動かす必要はなく、必要な会話・間・静止は残す。原文の事実・時系列、明示されたコマ・動作・静止・カメラ・画風と、台詞の文言・話者・順序を優先し、新しい報道事実や無関係な事件・暴力を足さない。日常の作業もその作業の演技で強め、格闘・事故・破壊や新たな障害へ置き換えない。`;

const ENDING_MODE_POLICIES = Object.freeze({
  Auto: Object.freeze({
    documentary: false,
    endingTone: 'auto',
    preserveReferenceStyle: false,
    label: '自動（題材に合わせてギャグ／シリアス）'
  }),
  GagAuto: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: 'ギャグ内でおまかせ（ギャグの結末から自動選択）' }),
  SeriousAuto: Object.freeze({
    documentary: false,
    endingTone: 'serious',
    preserveReferenceStyle: false,
    label: 'シリアス内でおまかせ'
  }),
  QuietAftermath: Object.freeze({
    documentary: false,
    endingTone: 'serious',
    preserveReferenceStyle: false,
    label: '静かな余韻'
  }),
  Resolve: Object.freeze({
    documentary: false,
    endingTone: 'serious',
    preserveReferenceStyle: false,
    label: '決意・再出発'
  }),
  Warning: Object.freeze({
    documentary: false,
    endingTone: 'serious',
    preserveReferenceStyle: false,
    label: '警告'
  }),
  OpenQuestion: Object.freeze({
    documentary: false,
    endingTone: 'serious',
    preserveReferenceStyle: false,
    label: '問題提起'
  }),
  EmotionalClosure: Object.freeze({
    documentary: false,
    endingTone: 'serious',
    preserveReferenceStyle: false,
    label: '感動・救い'
  }),
  TragicClosure: Object.freeze({
    documentary: false,
    endingTone: 'serious',
    preserveReferenceStyle: false,
    label: '悲劇・喪失'
  }),
  AngerProtest: Object.freeze({
    documentary: false,
    endingTone: 'serious',
    preserveReferenceStyle: false,
    label: '怒り・抗議',
    guidance: '不当な扱いや踏みにじられた価値に対し、人物が怒りを持って抗議する結末にする。何に怒り、何を守ろうとするかを先の出来事と結び、抗議・拒絶・境界を示す行動で締める。静かな抗議や毅然とした拒否も認め、叫びや暴力を必須にしない。単なる困惑や再出発に置き換えない。'
  }),
  EarnedReversal: Object.freeze({
    documentary: false,
    endingTone: 'serious',
    preserveReferenceStyle: false,
    label: '逆転・反撃',
    guidance: '不利な状況にいた人物が、先に示した行動・準備・証拠を使って局面を逆転させ、反撃または主導権の回復を具体的に示す。勝利の宣言だけにせず、何がどう変わったかを見せる。突然の能力や偶然だけで解決しない。反撃に暴力を必須にしない。'
  }),
  SeriousAction: Object.freeze({
    documentary: false, endingTone: 'serious', preserveReferenceStyle: false,
    label: 'アクション（シリアス）',
    actionDirection: ACTION_SCENARIO_DIRECTION,
    guidance: '題材に根拠のある緊迫した動作を軸に、きっかけ・身体の反応・判断・結果をつなぐ。追跡、競技、救助、作業、攻防など場面に合う行動を選び、最後の動作で局面や人物の選択がどう変わったかを見せる。台詞や効果線だけで動作を代用せず、指定されたカメラと接触を保つ。'
  }),
  Surreal: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: '静寂型 (シュール)' }),
  Explosion: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: '爆発型 (カオス)' }),
  FakeEmotion: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: '感動詐欺' }),
  Metafiction: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: 'メタフィクション' }),
  Unreasonable: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: '理不尽な制裁' }),
  RunningGag: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: '天丼' }),
  Dream: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: '夢オチ (ループ)' }),
  Misunderstanding: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: '盛大な勘違い (すれ違い)' }),
  CanceledEnding: Object.freeze({ documentary: false, endingTone: 'gag', preserveReferenceStyle: false, label: '打ち切りエンド (俺たちの戦いはこれからだ)' }),
  ComicRage: Object.freeze({
    documentary: false,
    endingTone: 'gag',
    preserveReferenceStyle: false,
    label: '激怒・逆ギレ',
    guidance: '先のコマで怒りの原因と期待・思い込みや責任の所在を示し、最後の過剰な激怒または筋違いな逆ギレとの落差で笑わせる。逆ギレなら自分の責任を他人へ転嫁する筋違いを読者に分かるようにする。受け手の反応も見せ、無関係な相手への突然の暴力に置き換えない。'
  }),
  SelfInflicted: Object.freeze({
    documentary: false,
    endingTone: 'gag',
    preserveReferenceStyle: false,
    label: '自業自得・ブーメラン',
    guidance: '本人の発言・行動が原因となり、その結果が本人へ返る様子を先のコマからつなぐ。自分で作った仕掛けや主張が自分に効くと読者に見える帰結で笑わせる。理不尽な制裁とは区別し、無関係な罰を突然与える結末にしない。'
  }),
  RoleReversal: Object.freeze({
    documentary: false,
    endingTone: 'gag',
    preserveReferenceStyle: false,
    label: '立場逆転',
    guidance: '先に示した力関係や役割が、仕込んだ行動・弱点・条件によって最後にひっくり返る結末にする。入れ替わった人物双方の振る舞いと反応で落差を見せる。勝敗だけでなく役割の逆転で笑わせ、最後に新設定を足して逆転を説明しない。'
  }),
  GagAction: Object.freeze({
    documentary: false, endingTone: 'gag', preserveReferenceStyle: false,
    label: 'アクション（ギャグ）',
    actionDirection: ACTION_SCENARIO_DIRECTION,
    guidance: '題材に根拠のある大きな動きやドタバタを軸に、仕掛け・動き・予想外の着地や受け手の反応で笑わせる。キャストの欲張り・早合点・張り切りなどが題材に関係する大きな行動を生み、その反動や身体的な食い違いを結末まで回収する。ニュースの手順を順に紹介し、最後は普通に落ち着くだけではこの選択を満たさない。新しい台本では最初に動きのオチを決め、そこへつながる出来事を組み立てる。動いた人・物とその結果が絵でつながるようにする。無関係な暴力や表情だけのオチに置き換えず、指定されたカメラと接触を保つ。'
  }),
  SeriousDocumentary: Object.freeze({
    documentary: true,
    endingTone: 'serious',
    preserveReferenceStyle: true,
    label: 'シリアス・ドキュメンタリー（原文忠実＋オチだけシリアス漫画化・絵柄変更無し）'
  }),
  Documentary: Object.freeze({
    documentary: true,
    endingTone: 'gag',
    preserveReferenceStyle: false,
    label: 'ギャグ・ドキュメンタリー（原文忠実＋オチだけギャグ漫画化）'
  })
});

export const SERIOUS_ENDING_OPTIONS = Object.freeze([
  Object.freeze({ value: 'SeriousAuto', icon: '🤖', menuLabel: 'シリアス内でおまかせ（シリアスの結末から自動選択）' }),
  Object.freeze({ value: 'QuietAftermath', icon: '🌙', menuLabel: '静かな余韻（言葉を抑え、感情を残す）' }),
  Object.freeze({ value: 'Resolve', icon: '🌅', menuLabel: '決意・再出発（困難を受け止め、次へ進む）' }),
  Object.freeze({ value: 'Warning', icon: '⚠️', menuLabel: '警告（危機や代償を示す）' }),
  Object.freeze({ value: 'OpenQuestion', icon: '❓', menuLabel: '問題提起（答えを急がず、問いを残す）' }),
  Object.freeze({ value: 'EmotionalClosure', icon: '🕯️', menuLabel: '感動・救い（理解や支えで心を結ぶ）' }),
  Object.freeze({ value: 'TragicClosure', icon: '🌧️', menuLabel: '悲劇・喪失（取り戻せないものと向き合う）' }),
  Object.freeze({ value: 'AngerProtest', icon: '✊', menuLabel: '怒り・抗議（不当な扱いに異議を示す）' }),
  Object.freeze({ value: 'EarnedReversal', icon: '↗️', menuLabel: '逆転・反撃（積み上げた行動で局面を変える）' }),
  Object.freeze({ value: 'SeriousAction', icon: '⚡', menuLabel: 'アクション（緊迫した動きで局面を変える）' })
]);

export const GAG_ENDING_OPTIONS = Object.freeze([
  Object.freeze({ value: 'Surreal', icon: '❄️', menuLabel: '静寂型 (シュール/無言)' }),
  Object.freeze({ value: 'Explosion', icon: '🔥', menuLabel: '爆発型 (カオス/叫び)' }),
  Object.freeze({ value: 'FakeEmotion', icon: '😢', menuLabel: '感動詐欺 (いい話風の狂気)' }),
  Object.freeze({ value: 'Metafiction', icon: '📖', menuLabel: 'メタフィクション (枠を越える)' }),
  Object.freeze({ value: 'Unreasonable', icon: '🔨', menuLabel: '理不尽な制裁 (突然の暴力)' }),
  Object.freeze({ value: 'RunningGag', icon: '🔁', menuLabel: '天丼 (同じボケの最終形態)' }),
  Object.freeze({ value: 'Dream', icon: '🛏️', menuLabel: '夢オチ (ループの恐怖)' }),
  Object.freeze({ value: 'Misunderstanding', icon: '🤷', menuLabel: '盛大な勘違い (すれ違いの頂点)' }),
  Object.freeze({ value: 'CanceledEnding', icon: '🏃', menuLabel: '打ち切りエンド (俺たちの戦いはこれからだ)' }),
  Object.freeze({ value: 'ComicRage', icon: '😡', menuLabel: '激怒・逆ギレ（怒りと責任転嫁の落差で笑う）' }),
  Object.freeze({ value: 'SelfInflicted', icon: '🪃', menuLabel: '自業自得・ブーメラン（自分の行動が自分へ返る）' }),
  Object.freeze({ value: 'RoleReversal', icon: '🔄', menuLabel: '立場逆転（役割や力関係がひっくり返る）' }),
  Object.freeze({ value: 'GagAction', icon: '💨', menuLabel: 'アクション（ドタバタと動きのオチ）' })
]);

export const DOCUMENTARY_ENDING_OPTIONS = Object.freeze([
  Object.freeze({ value: 'SeriousDocumentary', menuLabel: ENDING_MODE_POLICIES.SeriousDocumentary.label }),
  Object.freeze({ value: 'Documentary', menuLabel: ENDING_MODE_POLICIES.Documentary.label })
]);

const SERIOUS_AUTO_RESULT_TYPES = new Set(
  SERIOUS_ENDING_OPTIONS
    .map(({ value }) => value)
    .filter((value) => value !== 'SeriousAuto')
);
const GAG_AUTO_RESULT_TYPES = new Set(GAG_ENDING_OPTIONS.map(({ value }) => value));

export const getEndingModePolicy = (type) => ENDING_MODE_POLICIES[type] || DEFAULT_ENDING_POLICY;

const normalizeEndingLabel = (value) => String(value || '')
  .normalize('NFKC')
  .replace(/\s*[（(][^）)]*[）)]\s*$/u, '')
  .trim();

export const resolveScenarioEndingType = (scenario, fallback) => {
  const label = String(scenario || '').match(/^Punchline:\s*([^\r\n]+)/mi)?.[1]?.trim();
  const entries = Object.entries(ENDING_MODE_POLICIES);
  const exact = entries.find(([key, policy]) => key === label || String(policy.label).normalize('NFKC') === label?.normalize('NFKC'));
  if (exact) return exact[0];
  const normalizedLabel = normalizeEndingLabel(label);
  const matches = entries.filter(([, policy]) => normalizedLabel && normalizeEndingLabel(policy.label) === normalizedLabel);
  return matches.length === 1 ? matches[0][0] : fallback;
};

export const resolveGeneratedEnding = ({ activeType, generatedPunchline } = {}) => {
  const selectedType = String(activeType || 'Auto');
  const generatedType = resolveScenarioEndingType(`Punchline: ${String(generatedPunchline || '').trim()}`, '');

  if (selectedType === 'SeriousAuto' && SERIOUS_AUTO_RESULT_TYPES.has(generatedType)) {
    return { type: generatedType, label: ENDING_MODE_POLICIES[generatedType].label };
  }
  if (selectedType === 'GagAuto' && GAG_AUTO_RESULT_TYPES.has(generatedType)) {
    return { type: generatedType, label: ENDING_MODE_POLICIES[generatedType].label };
  }
  if (generatedType === selectedType) {
    return {
      type: selectedType,
      label: String(generatedPunchline || '').trim() || ENDING_MODE_POLICIES[selectedType].label
    };
  }

  const selectedPolicy = getEndingModePolicy(selectedType);
  return {
    type: selectedType,
    label: selectedPolicy.label || String(generatedPunchline || '').trim()
  };
};

export const isDocumentaryEnding = (type) => getEndingModePolicy(type).documentary;

export const isSeriousEnding = (type) => getEndingModePolicy(type).endingTone === 'serious';

// Only a selected ending mandates a tone; other stories choose from their content.
export const resolveScenarioComedyTone = (type) =>
  type === 'Surreal' || type === 'PsychoHorror' ? 'SurrealQuiet'
    : type === 'Explosion' ? 'HighTension' : 'Auto';

const GENERAL_SERIOUS_PROMPT_CHECKS = Object.freeze([
  Object.freeze({ issue: 'comedy-intent', pattern: /^\s*-?\s*COMEDY INTENT:/im }),
  Object.freeze({ issue: 'chibi-style', pattern: /^\s*(?:MONOCHROME )?PANEL STYLE LOCK:\s*CHIBI(?:\\?_)?GAG\b/im }),
  Object.freeze({ issue: 'gag-overlay', pattern: /^\s*GAG INTENT OVERLAY:/im })
]);

const DOCUMENTARY_STYLE_PROMPT_CHECKS = Object.freeze([
  Object.freeze({ issue: 'proportion-override', pattern: /^\s*PROPORTION OVERRIDE:/im }),
  Object.freeze({ issue: 'panel-style-switch', pattern: /^\s*(?:MONOCHROME )?PANEL STYLE LOCK:/im }),
  Object.freeze({ issue: 'style-difference-qa', pattern: /^\s*(?:MONOCHROME )?ART-STYLE DIFFERENCE QA LOCK:/im })
]);

export const validatePromptEndingModeConsistency = ({ prompt, punchlineType } = {}) => {
  const policy = getEndingModePolicy(punchlineType);
  if (policy.endingTone !== 'serious') {
    return { ok: true, issues: [] };
  }

  const text = String(prompt || '');
  const issues = [];
  if (!/SERIOUS(?: DOCUMENTARY)? INTENT:/i.test(text)) {
    issues.push('missing-serious-intent');
  }
  if (policy.preserveReferenceStyle && !/REFERENCE-SHEET ART-STYLE LOCK \(ABSOLUTE[^\n]*ALL FOUR PANELS\)/i.test(text)) {
    issues.push('missing-reference-style-lock');
  }
  for (const { issue, pattern } of GENERAL_SERIOUS_PROMPT_CHECKS) {
    if (pattern.test(text)) issues.push(issue);
  }
  for (const { issue, pattern } of policy.preserveReferenceStyle ? DOCUMENTARY_STYLE_PROMPT_CHECKS : []) {
    if (pattern.test(text)) issues.push(issue);
  }
  return { ok: issues.length === 0, issues };
};

export const assertPromptEndingModeConsistency = (options = {}) => {
  const result = validatePromptEndingModeConsistency(options);
  if (result.ok) return result;

  const error = new Error(`選択したシリアス結末と最終プロンプトが一致しません（${result.issues.join(', ')}）。STEP2からシナリオを作り直し、STEP3で最終プロンプトを再生成してください。`);
  error.code = 'SERIOUS_PROMPT_MODE_MISMATCH';
  error.issues = result.issues;
  throw error;
};

export const buildReferenceSheetArtStyleLock = ({ monochrome = false } = {}) => `REFERENCE-SHEET ART-STYLE LOCK (ABSOLUTE — ALL FOUR PANELS):
- Use every attached character sheet as the authoritative art-style reference. Across all four panels preserve its ${monochrome ? 'linework, facial construction, eye design, body proportions and degree of stylization; translate shading into the selected ink medium' : 'linework, coloring method, shading design, facial construction, eye design, body proportions and degree of stylization'}.
- Emotion tags describe expression and acting only. They MUST NOT trigger chibi, gekiga, watercolor, painterly, retro, pop-art, sketch, photorealistic or any other panel-specific art-style transformation.
- Keep serious intensity through expression, gaze, body acting, camera, composition and lighting while the drawing style remains unchanged.
- Do not reproduce character-sheet layouts, labels, explanatory text, expression grids, sample poses, duplicate views or white reference backgrounds as story content.
- ${monochrome
  ? 'For monochrome output, change only the color medium to a three-tone manga manuscript: white paper, solid black ink and one bounded Japanese screentone. This is not grayscale or halftone rendering. Retain the reference linework, facial construction, body proportions and shading design as bounded ink shapes; the white-paper reserves override source fills and gradients.'
  : 'For color output, retain the reference sheet\'s color-rendering method and character palette; scene lighting may change illumination, not the underlying art style.'}`;
