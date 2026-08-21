import {
  assertActiveFinalPanelStaging,
  FINAL_PANEL_ACTIVE_STAGING_SCENARIO_CONTRACT
} from './final-panel-staging.js';
import {
  assertScenarioGestureVariety,
  SCENARIO_GESTURE_VARIETY_RULES
} from './composition-variety.js';

const CATEGORY_DEFINITIONS = Object.freeze({
  expressions: {
    label: '表情',
    instruction: '各コマのEMOTIONタグと表情・視線・顔の反応だけを、場面の温度に合う範囲で具体化する'
  },
  body: {
    label: '身体',
    instruction: '姿勢、重心、手足の動き、間合いを自然な人体の範囲で具体化する'
  },
  effects: {
    label: '演出',
    instruction: '光、影、効果音、空気感などの演出を追加する。場所そのものや人物の身体構造は変えない'
  },
  background: {
    label: '背景',
    instruction: '既存のLocationを保ったまま、奥行き、材質、周辺物、環境の情報を具体化する'
  },
  camera: {
    label: 'カメラ',
    instruction: '各コマの[Camera:]だけを、読みやすさとオチへの視線誘導が良くなるよう具体化する'
  },
  dialogue: {
    label: 'セリフ',
    instruction: '話者、発言数、事実関係を保ち、キャラクターらしさと間が伝わる文言へ書き換える'
  },
  gag: {
    label: 'ギャグ演出',
    instruction: 'フリ、間、リアクション、オチの見せ方を整える。セリフはdialogueも選択された場合だけ変える'
  }
});

const METADATA_FIELDS = Object.freeze([
  { key: 'title', label: 'タイトル / Topic', prefixes: ['## タイトル:', 'Topic:'] },
  { key: 'logline', label: 'Logline', prefixes: ['Logline:'] },
  { key: 'location', label: 'Location', prefixes: ['Location:'] },
  { key: 'outfit', label: 'Outfit', prefixes: ['Outfit:'] },
  { key: 'punchline', label: 'Punchline', prefixes: ['Punchline:'] }
]);

const CALM_TONE_RE = /静寂|静か|淡々|無表情|抑制|乾いた|シュール|間\b/g;
const ESCALATION_RE = /限界突破|暴走|絶叫|怒り狂|爆発的|激しく|超絶|オーラが.*裂|雷鳴|衝撃波|完全崩壊/g;
const ANATOMY_ESCALATION_RE = /(?:指|腕|脚|関節|眼球|目玉|骨格).{0,10}(?:分裂|増殖|飛び出|破裂)|(?:人体|体型|身体).{0,10}(?:崩壊|変形)|首.{0,8}(?:S字|ねじれ)|異形|クリーチャー/g;
const DIALOGUE_SOFTENING_RE = /もしかしたら|かもしれない|かもね|なんだか|気がする|こういうのも/g;
const BACKGROUND_CLAUSE_RE = /[^。！？\n]*(?:背景|壁|床|天井|空間|照明|スポットライト|景色|室内|屋外|建物|空調)[^。！？\n]*[。！？]?/g;
const BACKGROUND_MUTATION_RE = /背景.{0,24}(?:変形|変化|歪|崩|爆発|追加)|(?:壁|床|天井|空間|建物|部屋).{0,24}(?:波打|ねじれ|渦巻|崩|割れ|変形|消失)/g;

// These break the edit contract or produce an unsafe/structurally unusable scenario.
// Missing a requested enhancement is a quality deficit, not a reason to discard an
// otherwise safe candidate and block the image-generation workflow.
const HARD_ENHANCEMENT_ISSUE_CODES = new Set([
  'output_too_short',
  'passive_final_tableau',
  'repeated_forward_extension_gesture',
  'metadata_changed',
  'panel_structure_changed',
  'speaker_sequence_changed',
  'dialogue_changed_without_selection',
  'camera_changed_without_selection',
  'emotion_changed_without_selection',
  'background_changed_without_selection',
  'tone_escalation',
  'anatomy_escalation'
]);

const normalizeText = (value) =>
  String(value || '')
    .replace(/<thought>[\s\S]*?<\/thought>/gi, '')
    .replace(/\r\n?/g, '\n')
    .trim();

const unique = (values) => [...new Set(values)];

const extractMatches = (text, regex) => {
  const source = normalizeText(text);
  regex.lastIndex = 0;
  return [...source.matchAll(regex)].map((match) => match[0].trim()).filter(Boolean);
};

const extractMetadata = (scenario) => {
  const lines = normalizeText(scenario).split('\n');
  return Object.fromEntries(
    METADATA_FIELDS.map((field) => {
      const line = lines.find((candidate) => {
        const normalizedLine = candidate.trim().toLowerCase();
        return field.prefixes.some((prefix) =>
          normalizedLine.startsWith(prefix.toLowerCase())
        );
      });
      return [field.key, line?.trim() || ''];
    })
  );
};

const extractPanelHeaders = (scenario) =>
  extractMatches(scenario, /^\s*\[[1-4１-４一二三四]コマ目[^\]]*\]\s*$/gmu);

const extractTagValues = (scenario, tag) =>
  extractMatches(scenario, new RegExp(`^\\s*\\[${tag}:\\s*[^\\]]*\\]\\s*$`, 'gmi'));

const extractDialogue = (scenario) => {
  const records = [];
  const regex = /^\s*([^「」\n]{1,24})「([^」]+)」\s*$/gmu;
  const text = normalizeText(scenario);
  let match;
  while ((match = regex.exec(text)) !== null) {
    records.push({
      speaker: match[1].trim(),
      text: match[2].trim(),
      full: match[0].trim()
    });
  }
  return records;
};

const extractSituationLines = (scenario) =>
  extractMatches(scenario, /^\s*状況(?:演出)?:\s*.*$/gmu);

const extractReactionLines = (scenario) =>
  extractMatches(scenario, /^\s*（リアクション:\s*.*）\s*$/gmu);

const extractEffectLines = (scenario) =>
  extractMatches(scenario, /^\s*(?:SFX|SE|効果音|音響|BGM)\s*[:：]\s*.*$/gmi);

const extractBackgroundClauses = (scenario) =>
  unique(extractMatches(scenario, BACKGROUND_CLAUSE_RE));

const arraysEqual = (left, right) =>
  left.length === right.length && left.every((value, index) => value === right[index]);

const addIssue = (issues, issueCodes, code, message) => {
  if (!issueCodes.includes(code)) issueCodes.push(code);
  if (!issues.includes(message)) issues.push(message);
};

const hasHardEnhancementIssue = (validation) =>
  validation.issueCodes.some((code) => HARD_ENHANCEMENT_ISSUE_CODES.has(code));

const scoreEnhancementCandidate = (text, validation) => (
  validation.changedCategories.length * 1000 -
  validation.issueCodes.length * 100 +
  Math.min(normalizeText(text).length, 999) / 1000
);

const categoryChanged = (category, original, candidate) => {
  switch (category) {
    case 'expressions':
      return (
        !arraysEqual(original.emotions, candidate.emotions) ||
        !arraysEqual(original.reactions, candidate.reactions)
      );
    case 'body':
      return (
        !arraysEqual(original.situations, candidate.situations) ||
        !arraysEqual(original.reactions, candidate.reactions)
      );
    case 'effects':
      return (
        !arraysEqual(original.effects, candidate.effects) ||
        !arraysEqual(original.situations, candidate.situations)
      );
    case 'background':
      return !arraysEqual(original.backgroundClauses, candidate.backgroundClauses);
    case 'camera':
      return !arraysEqual(original.cameras, candidate.cameras);
    case 'dialogue':
      return !arraysEqual(
        original.dialogue.map((entry) => entry.text),
        candidate.dialogue.map((entry) => entry.text)
      );
    case 'gag':
      return (
        !arraysEqual(original.situations, candidate.situations) ||
        !arraysEqual(original.reactions, candidate.reactions)
      );
    default:
      return false;
  }
};

const inspectScenario = (scenario) => ({
  text: normalizeText(scenario),
  metadata: extractMetadata(scenario),
  panelHeaders: extractPanelHeaders(scenario),
  emotions: extractTagValues(scenario, 'EMOTION'),
  cameras: extractTagValues(scenario, 'Camera'),
  dialogue: extractDialogue(scenario),
  situations: extractSituationLines(scenario),
  reactions: extractReactionLines(scenario),
  effects: extractEffectLines(scenario),
  backgroundClauses: extractBackgroundClauses(scenario),
  backgroundMutations: extractMatches(scenario, BACKGROUND_MUTATION_RE)
});

export const SCENARIO_ENHANCEMENT_CATEGORIES = CATEGORY_DEFINITIONS;

export const normalizeEnhancementCategories = (selectedCategories = []) =>
  unique(selectedCategories.filter((category) => CATEGORY_DEFINITIONS[category]));

export const buildScenarioEnhancementPrompt = ({
  scenario,
  selectedCategories = [],
  styleJson = null,
  validationIssues = []
}) => {
  const selected = normalizeEnhancementCategories(selectedCategories);
  const locked = Object.keys(CATEGORY_DEFINITIONS).filter((category) => !selected.includes(category));
  const selectedInstructions = selected
    .map(
      (category) =>
        `- ${CATEGORY_DEFINITIONS[category].label}: ${CATEGORY_DEFINITIONS[category].instruction}`
    )
    .join('\n');
  const lockedLabels = locked.map((category) => CATEGORY_DEFINITIONS[category].label).join('、');
  const dialogueRule = selected.includes('dialogue')
    ? `- セリフ強化を選択したため、「」内のセリフを最低1つは必ず変更する。話者の順序と人数は変えない
- 変更が不要なセリフまで一律に言い換えない。短く口語的に保ち、セリフ全体を元の約1.5倍以内に収める
- 4コマ目のオチは元より冗長にせず、「もしかしたら」「かもしれない」「気がする」など弱い婉曲表現を新たに足さない`
    : '- セリフは未選択なので、「」内の全文を一字一句変更しない';
  const backgroundRule = selected.includes('background')
    ? '- 背景は選択済み。Locationを変えず、背景情報だけを具体化する'
    : '- 背景は未選択なので、背景・壁・床・天井・照明・空間構造の記述を変更しない';
  const styleBlock = styleJson
    ? `\n【作風情報】\n選択カテゴリの編集範囲内だけで参照する。元のLogline、Punchline、静けさやテンポを上書きしない。\n- 作風名: ${styleJson.style_name || ''}\n- 詳細: ${styleJson.reproduction_prompt || ''}\n${styleJson.anti_patterns ? `- 禁止: ${styleJson.anti_patterns}` : ''}\n`
    : '';
  const retryBlock = validationIssues.length
    ? `\n【前回出力の検証エラー】\n${validationIssues.map((issue) => `- ${issue}`).join('\n')}\nこのエラーをすべて解消して再出力すること。\n`
    : '';

  return `あなたは4コマ漫画の編集者です。元シナリオを、選択されたカテゴリだけ部分編集してください。

【最優先の編集契約】
- タイトル、Logline、Location、Outfit、Punchline、登場人物、話者順、4コマ構造をそのまま保つ
- LoglineとPunchlineが示す笑いの温度、静けさ、テンポを最優先し、派手さを目的に反転させない
- 選択されていないカテゴリは変更しない。未選択: ${lockedLabels || 'なし'}
- 自然な人体の可動範囲を守り、人体変形、部位の増殖、身体崩壊、ボディホラーを新たに加えない
- 「MAX」「限界」「極端に」など強度語の機械的な足し算ではなく、具体性と読みやすさを上げる
- 元にない事件、設定、キャラクター、場所、建造物を追加しない
${dialogueRule}
${backgroundRule}
${FINAL_PANEL_ACTIVE_STAGING_SCENARIO_CONTRACT}
${SCENARIO_GESTURE_VARIETY_RULES}

【選択されたカテゴリ — 変更必須】
${selectedInstructions || '- なし'}
${styleBlock}${retryBlock}
【出力形式】
- 元と同じ見出し・タグ形式のシナリオ本文だけを返す
- 解説、採点、前置き、<thought>タグを出力しない

【元のシナリオ】
${scenario}`;
};

export const validateScenarioEnhancement = ({
  originalScenario,
  candidateScenario,
  selectedCategories = []
}) => {
  const selected = normalizeEnhancementCategories(selectedCategories);
  const original = inspectScenario(originalScenario);
  const candidate = inspectScenario(candidateScenario);
  const issues = [];
  const issueCodes = [];

  if (!candidate.text || candidate.text.length < 50) {
    addIssue(issues, issueCodes, 'output_too_short', '強化後のシナリオが短すぎます');
  }
  if (candidate.text === original.text) {
    addIssue(issues, issueCodes, 'scenario_unchanged', 'シナリオ全体が変更されていません');
  }

  try {
    assertActiveFinalPanelStaging({
      scenario: candidate.text,
      punchlineType: candidate.metadata.punchline
    });
  } catch (error) {
    if (error?.message === 'passive_final_tableau') {
      addIssue(
        issues,
        issueCodes,
        'passive_final_tableau',
        '4コマ目で脇役を横一列・棒立ち・無言の観客にせず、別々の物理アクションを割り当ててください'
      );
    } else {
      throw error;
    }
  }

  let originalAlreadyRepeatsForwardExtension = false;
  try {
    assertScenarioGestureVariety({
      scenario: original.text,
      punchlineType: original.metadata.punchline,
      protectedText: original.text
    });
  } catch (error) {
    if (error?.message === 'repeated_forward_extension_gesture') {
      originalAlreadyRepeatsForwardExtension = true;
    } else {
      throw error;
    }
  }

  if (!originalAlreadyRepeatsForwardExtension) {
    try {
      assertScenarioGestureVariety({
        scenario: candidate.text,
        punchlineType: candidate.metadata.punchline,
        protectedText: original.text
      });
    } catch (error) {
      if (error?.message === 'repeated_forward_extension_gesture') {
        addIssue(
          issues,
          issueCodes,
          'repeated_forward_extension_gesture',
          '指さし、正面への手出し、支持面を叩く動作を複数コマへ反復せず、物語固有の身体演技へ分散してください'
        );
      } else {
        throw error;
      }
    }
  }

  for (const field of METADATA_FIELDS) {
    if (candidate.metadata[field.key] !== original.metadata[field.key]) {
      addIssue(
        issues,
        issueCodes,
        'metadata_changed',
        `${field.label}は変更できません`
      );
    }
  }

  if (!arraysEqual(original.panelHeaders, candidate.panelHeaders)) {
    addIssue(issues, issueCodes, 'panel_structure_changed', '4コマの見出し構造が変わっています');
  }

  const originalSpeakers = original.dialogue.map((entry) => entry.speaker);
  const candidateSpeakers = candidate.dialogue.map((entry) => entry.speaker);
  if (!arraysEqual(originalSpeakers, candidateSpeakers)) {
    addIssue(issues, issueCodes, 'speaker_sequence_changed', '話者またはセリフ数が変わっています');
  }

  if (selected.includes('dialogue')) {
    if (!categoryChanged('dialogue', original, candidate)) {
      addIssue(
        issues,
        issueCodes,
        'dialogue_unchanged',
        'セリフ強化を選択したのにセリフが変更されていません'
      );
    }

    const originalDialogueLength = original.dialogue.reduce(
      (total, entry) => total + entry.text.length,
      0
    );
    const candidateDialogueLength = candidate.dialogue.reduce(
      (total, entry) => total + entry.text.length,
      0
    );
    const dialogueLengthLimit = Math.max(
      originalDialogueLength + 12,
      Math.ceil(originalDialogueLength * 1.6)
    );
    if (candidateDialogueLength > dialogueLengthLimit) {
      addIssue(
        issues,
        issueCodes,
        'dialogue_overexpanded',
        'セリフ全体が説明的に長くなりすぎています'
      );
    }

    const originalPunchline = original.dialogue.at(-1)?.text || '';
    const candidatePunchline = candidate.dialogue.at(-1)?.text || '';
    const punchlineLengthLimit = Math.max(
      originalPunchline.length + 6,
      Math.ceil(originalPunchline.length * 1.5)
    );
    if (candidatePunchline.length > punchlineLengthLimit) {
      addIssue(
        issues,
        issueCodes,
        'punchline_overexpanded',
        '4コマ目のオチのセリフが冗長になっています'
      );
    }

    const originalSoftening = new Set(extractMatches(originalPunchline, DIALOGUE_SOFTENING_RE));
    const newSoftening = extractMatches(candidatePunchline, DIALOGUE_SOFTENING_RE).filter(
      (term) => !originalSoftening.has(term)
    );
    if (newSoftening.length) {
      addIssue(
        issues,
        issueCodes,
        'punchline_softened',
        '4コマ目のオチに弱い婉曲表現が追加されています'
      );
    }
  } else if (!arraysEqual(
    original.dialogue.map((entry) => entry.full),
    candidate.dialogue.map((entry) => entry.full)
  )) {
    addIssue(
      issues,
      issueCodes,
      'dialogue_changed_without_selection',
      'セリフ未選択なのにセリフが変更されています'
    );
  }

  if (!selected.includes('camera') && !arraysEqual(original.cameras, candidate.cameras)) {
    addIssue(
      issues,
      issueCodes,
      'camera_changed_without_selection',
      'カメラ未選択なのにCameraタグが変更されています'
    );
  }

  const emotionMayChange = selected.includes('expressions') || selected.includes('gag');
  if (!emotionMayChange && !arraysEqual(original.emotions, candidate.emotions)) {
    addIssue(
      issues,
      issueCodes,
      'emotion_changed_without_selection',
      '表情未選択なのにEMOTIONタグが変更されています'
    );
  }

  if (
    !selected.includes('background') &&
    !arraysEqual(original.backgroundMutations, candidate.backgroundMutations)
  ) {
    addIssue(
      issues,
      issueCodes,
      'background_changed_without_selection',
      '背景未選択なのに環境描写が変更されています'
    );
  }

  for (const category of selected) {
    if (!categoryChanged(category, original, candidate)) {
      addIssue(
        issues,
        issueCodes,
        `${category}_unchanged`,
        `${CATEGORY_DEFINITIONS[category].label}を選択したのに対象箇所が変更されていません`
      );
    }
  }

  const originalLogline = original.metadata.logline || '';
  if (CALM_TONE_RE.test(originalLogline)) {
    CALM_TONE_RE.lastIndex = 0;
    const originalEscalations = new Set(extractMatches(original.text, ESCALATION_RE));
    const newEscalations = extractMatches(candidate.text, ESCALATION_RE).filter(
      (term) => !originalEscalations.has(term)
    );
    if (newEscalations.length) {
      addIssue(
        issues,
        issueCodes,
        'tone_escalation',
        '元の静かなトーンに反する過剰な激化表現が追加されています'
      );
    }
  }

  const originalAnatomy = new Set(extractMatches(original.text, ANATOMY_ESCALATION_RE));
  const newAnatomy = extractMatches(candidate.text, ANATOMY_ESCALATION_RE).filter(
    (term) => !originalAnatomy.has(term)
  );
  if (newAnatomy.length) {
    addIssue(
      issues,
      issueCodes,
      'anatomy_escalation',
      '元にない人体変形または身体崩壊が追加されています'
    );
  }

  return {
    ok: issueCodes.length === 0,
    issueCodes,
    issues,
    changedCategories: selected.filter((category) => categoryChanged(category, original, candidate))
  };
};

export const runValidatedScenarioEnhancement = async ({
  originalScenario,
  selectedCategories = [],
  buildPrompt,
  requestEnhancement,
  maxAttempts = 2,
  onRetry,
  onWarning
}) => {
  let validationIssues = [];
  let lastResult = null;
  let bestSafeCandidate = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const prompt = buildPrompt({ attempt, validationIssues });
    const result = await requestEnhancement(prompt, attempt);
    const text = normalizeText(result?.text);
    const validation = validateScenarioEnhancement({
      originalScenario,
      candidateScenario: text,
      selectedCategories
    });

    if (validation.ok) {
      return {
        ...result,
        text,
        attempts: attempt,
        validation
      };
    }

    if (!hasHardEnhancementIssue(validation)) {
      const score = scoreEnhancementCandidate(text, validation);
      if (!bestSafeCandidate || score > bestSafeCandidate.score) {
        bestSafeCandidate = { result, text, validation, score };
      }
    }

    lastResult = result;
    validationIssues = validation.issueCodes;
    if (attempt < maxAttempts) onRetry?.(validation, attempt);
  }

  if (bestSafeCandidate) {
    const retainedOriginal = bestSafeCandidate.text === normalizeText(originalScenario);
    onWarning?.(bestSafeCandidate.validation, bestSafeCandidate.text, retainedOriginal);
    return {
      ...bestSafeCandidate.result,
      text: bestSafeCandidate.text,
      attempts: maxAttempts,
      validation: bestSafeCandidate.validation,
      validationWarning: true,
      fallbackToOriginal: retainedOriginal
    };
  }

  // Every generated candidate breached a non-negotiable editing contract. Keep the
  // known-safe original so the user can continue to STEP3/STEP4 rather than lose work.
  const originalText = normalizeText(originalScenario);
  const originalValidation = validateScenarioEnhancement({
    originalScenario,
    candidateScenario: originalText,
    selectedCategories
  });
  onWarning?.(originalValidation, originalText, true);
  return {
    ...lastResult,
    text: originalText,
    attempts: maxAttempts,
    validation: originalValidation,
    validationWarning: true,
    fallbackToOriginal: true
  };
};
