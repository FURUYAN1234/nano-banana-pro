import { cameraLensMap, cinematicCompositionMap, EMOTION_STYLES } from './constants.js';

// --- Panel Utility Functions (App.jsx assemblePrompt -> externalized) ---
// assemblePrompt 内で定義されていたパネル解析・プロンプト組立ユーティリティ群

const CAST_HEADING_RE = /^##(?!#)\s*(?:\d+\.\s*)?(.*)/;
const CHARACTER_LINE_RE = /^-?\s*Character\s*\[(.*?)\]/i;
const NON_CHARACTER_SECTION_RE = /^(?:#\s*)?(?:備考|補足|注記|メモ|参考|注意|タイトル|作品名|シリーズ名|年号|比較ラベル|ラベル|ロゴ|看板|背景|Notes?|Remarks?|References?|Appendix)(?:\s*[:：].*)?$/i;
const PANEL_HEADER_RE = /^\s*\[\s*\d+\s*コマ目(?:\s*[:：\]])/i;

const normalizeCastDisplayName = (value = '') =>
  String(value)
    .replace(/\s*[:：]\s*$/, '')
    .replace(/^(?:仮名|暫定名|名前|キャラ名|人物名|Name|Temporary\s+Name)\s*[:：]\s*/i, '')
    .trim();

const isValidCastHeadingName = (value = '') => {
  const name = normalizeCastDisplayName(value);
  if (!name || name.startsWith('#')) return false;
  if (/^(?:STYLE_TAG|---|\|)/i.test(name)) return false;
  if (NON_CHARACTER_SECTION_RE.test(name)) return false;
  return true;
};

const pushUnique = (list, value) => {
  const cleanValue = String(value || '').trim();
  if (cleanValue && !list.includes(cleanValue)) list.push(cleanValue);
};

const collectCastNameEntries = (castListText = '') => {
  const entries = [];
  String(castListText).split('\n').forEach((line) => {
    const cleanLine = line.replace(/\*\*/g, '').trim();
    const match = cleanLine.match(CAST_HEADING_RE) || cleanLine.match(CHARACTER_LINE_RE);
    if (!match) return;

    const displayName = normalizeCastDisplayName(match[1]);
    if (!isValidCastHeadingName(displayName)) return;

    const aliases = [];
    pushUnique(aliases, displayName);

    const nameOnly = displayName.split(/[（(]/)[0].trim();
    pushUnique(aliases, nameOnly);

    nameOnly.split(/[\s・]/).forEach(part => pushUnique(aliases, part));

    const romajiMatch = displayName.match(/[\(（]\s*(.*?)\s*[\)）]/);
    if (romajiMatch) pushUnique(aliases, romajiMatch[1].trim());

    entries.push({ displayName, nameOnly: nameOnly || displayName, aliases });
  });
  return entries;
};

const collectCastNames = (castListText = '') => {
  const names = [];
  collectCastNameEntries(castListText).forEach(entry => {
    entry.aliases.forEach(alias => pushUnique(names, alias));
  });
  return names;
};

const buildCastLookup = (castListText = '') => {
  const lookup = {};
  collectCastNameEntries(castListText).forEach(entry => {
    entry.aliases.forEach(alias => {
      lookup[alias] = entry.nameOnly;
    });
  });
  return lookup;
};

export const buildIdentityMatrix = (castListText) => {
  const characters = [];
  let currentChar = null;

  castListText.split('\n').forEach(line => {
    const cleanLine = line.replace(/\*\*/g, '').trim();
    const headingMatch = cleanLine.match(CAST_HEADING_RE) || cleanLine.match(CHARACTER_LINE_RE);

    // キャラ名ヘッダー検出
    if (headingMatch) {
      if (currentChar) characters.push(currentChar);
      const name = normalizeCastDisplayName(headingMatch[1]);
      if (!isValidCastHeadingName(name)) {
        currentChar = null;
        return;
      }
      currentChar = {
        name,
        shortName: name.split(/[（(]/)[0].trim(),
        hairColor: '',
        hairStyle: '',
        glasses: 'unknown',
        features: []
      };
    }
    if (!headingMatch && /^#{2,}/.test(cleanLine)) {
      if (currentChar) characters.push(currentChar);
      currentChar = null;
      return;
    }

    if (!currentChar) return;

    // [v2.31] 髪情報の抽出 - 特徴的スタイル優先ロジック
    if (cleanLine.includes('髪') || cleanLine.toLowerCase().includes('hair')) {
      const weightsMatch = cleanLine.match(/\[WEIGHTS?\]:\s*(.*)/i);
      const tagsSource = weightsMatch ? weightsMatch[1].replace(/\|/g, '') : cleanLine;
      const colorMatch = tagsSource.match(/(red|orange|blonde|yellow|brown|black|silver|white|blue|pink|green|purple|ginger)\s+hair(?!\s*(?:tip|end|gradient|streak|highlight|accent))/i);
      if (colorMatch && !currentChar.hairColor) currentChar.hairColor = colorMatch[1];
      // [v2.31] 特徴的スタイル（twintails, hime cut等）を汎用長さ記述（long hair等）より優先
      // これにより Identity Matrix で「リン: long hair」ではなく「リン: twintails」と出力される
      const distinctiveMatch = tagsSource.match(/(internal\s*round\s*bob|chin-length\s*bob|straight\s*bob|twintails?|twin\s*tails?|ponytail|hime\s*cut|bun|braid|pixie|buzz)/i);
      const genericMatch = tagsSource.match(/(bob|very\s*long\s*hair|waist-length\s*hair|long[\s-]?hair|medium[\s-]?hair|short[\s-]?hair)/i);
      if (!currentChar.hairStyle) {
        if (distinctiveMatch) {
          currentChar.hairStyle = distinctiveMatch[1];
        } else if (genericMatch) {
          currentChar.hairStyle = genericMatch[1];
        }
      }
    }

    // [v2.30] 眼鏡情報の抽出 - 全面改修
    const lowerLine = cleanLine.toLowerCase();
    const hasPlainNoGlasses = /\bno[\s_-]*glasses\b/.test(lowerLine);
    const hasPlainGlasses = /\bglasses\b/.test(lowerLine) && !hasPlainNoGlasses;
    const hasWeightedNoGlasses = /\(no[\s_-]*glasses/i.test(lowerLine);
    const hasWeightedGlasses = /\([^)]*glasses[\s:]/i.test(lowerLine) && !hasWeightedNoGlasses;
    const glassesLocked = currentChar.glasses === 'LOCKED_NO' || currentChar.glasses === 'LOCKED_YES';
    if (!glassesLocked) {
      if (hasWeightedNoGlasses || hasPlainNoGlasses) {
        currentChar.glasses = 'LOCKED_NO';
      } else if (hasWeightedGlasses || hasPlainGlasses) {
        currentChar.glasses = 'LOCKED_YES';
      }
    }
    const glassesNowLocked = currentChar.glasses === 'LOCKED_NO' || currentChar.glasses === 'LOCKED_YES';
    if (!glassesNowLocked && (cleanLine.includes('眼鏡') || cleanLine.includes('メガネ') || lowerLine.includes('eyewear'))) {
      if (lowerLine.includes('bare eyes') || /(?:なし|無し|None|N\/A)/i.test(cleanLine)) {
        currentChar.glasses = 'NO';
      } else if (/(?:あり|有り|有|着用)/i.test(cleanLine) || /(?:under-rim|round|square|oval|rimless|half-rim)/i.test(lowerLine)) {
        currentChar.glasses = 'YES';
      }
    }

  });
  if (currentChar) characters.push(currentChar);

  // [v2.30] デバッグ: 眼鏡判定結果をコンソールに出力
  console.log('[IDENTITY MATRIX] Glasses detection results:');
  characters.forEach(c => {
    console.log(`  ${c.shortName}: glasses=${c.glasses}, hair=${c.hairColor} ${c.hairStyle}`);
  });

  if (characters.length === 0) return '';

  let matrix = `\n【IDENTITY MATRIX - ABSOLUTE LOCK (v2.25)】\n`;
  matrix += `Cross-check EVERY character in EACH panel. Any violation = redraw.\n`;

  characters.forEach(c => {
    const traits = [];
    if (c.hairColor) traits.push(`${c.hairColor} hair`);
    if (c.hairStyle) traits.push(c.hairStyle);
    if (c.glasses === 'YES' || c.glasses === 'LOCKED_YES') traits.push('MUST HAVE glasses (do NOT remove)');
    else if (c.glasses === 'NO' || c.glasses === 'LOCKED_NO') traits.push('MUST NOT have glasses (bare eyes, no frames)');
    else traits.push('check reference image for glasses status');

    matrix += `- [${c.shortName}]: ${traits.join(', ') || 'see reference image'}\n`;
  });

  matrix += `CROSS-CHECK: hair color and glasses status must match; redraw mismatch.\n`;
  matrix += `Reading order: RIGHT-TO-LEFT. Speech bubbles flow right-to-left; each bubble tail points to its speaker.\n`;

  return matrix;
};

const GENERIC_ROLE_WORD_PATTERN = '男性|女性|男子|女子|男|女|青年|若者|成人|大人|中年|老人|老婦人|おじさん|おばさん|お兄さん|お姉さん|おじいさん|おばあさん|高校生|高生|学生|生徒|先生|教師|作家|漫画家|編集者|記者|店員|会社員|社員|医師|看護師|警官|兵士|ギャル|モブ|客|観客|観察者|参加者|司会者|司会|発表者|登壇者|案内役|ナレーター|アナウンサー|スタッフ|社長|主催者|委員長|選手|声|人|キャラ';
const GENERIC_ROLE_SPEAKER_RE = new RegExp(`(?:${GENERIC_ROLE_WORD_PATTERN})(?:[A-ZＡ-Ｚ0-9０-９\\s]*)$`);

const PERSON_DESCRIPTOR_TOKEN_RE = new RegExp(`(?:黒髪|金髪|茶髪|銀髪|白髪|赤髪|青髪|緑髪|紫髪|ピンク髪|ブロンド|スーツ|制服|眼鏡|メガネ|グラス|ギャル|オタク|${GENERIC_ROLE_WORD_PATTERN})`, 'g');
const CONTEXT_ROLE_SPEAKER_RE = new RegExp(`([^\\s、。！？「」:：]{0,24}(?:${GENERIC_ROLE_WORD_PATTERN})(?:[A-ZＡ-Ｚ0-9０-９\\s]*))(?=\\s*(?:が|は|も|を|に|で|から|へ|と|、|。|！|？|!|\\?|$))`, 'gu');

const normalizeSpeakerKey = (value = '') =>
  String(value).split(/[（(]/)[0].trim().replace(/[\s・]/g, '');

const isGenericRoleSpeaker = (name = '') => {
  const cleanName = String(name).replace(/[（(].*?[）)]/g, '').trim();
  return GENERIC_ROLE_SPEAKER_RE.test(cleanName);
};

const isUnregisteredCharacterCategorySpeaker = (name = '', validCharacters = []) => {
  const cleanName = String(name).replace(/[（(].*?[）)]/g, '').trim();
  if (findExactCastMatch(cleanName, validCharacters)) return false;
  return /の(?:キャラ|キャラクター)(?:[A-ZＡ-Ｚ0-9０-９\s]*)$/u.test(cleanName);
};

const getPersonDescriptorTokens = (value = '') => {
  const cleanValue = normalizeSpeakerKey(normalizeCastDisplayName(value));
  return [...new Set(cleanValue.match(PERSON_DESCRIPTOR_TOKEN_RE) || [])];
};

const findExactCastMatch = (speaker, validCharacters = []) => {
  const speakerKey = normalizeSpeakerKey(speaker);
  return validCharacters.find(c => {
    const nameOnly = c.split(/[（(]/)[0].trim();
    return (
      speaker === c ||
      speaker === nameOnly ||
      speakerKey === normalizeSpeakerKey(c) ||
      speakerKey === normalizeSpeakerKey(nameOnly)
    );
  });
};

const findSpeakerCastMatch = (speaker, validCharacters = []) => {
  const exactMatch = findExactCastMatch(speaker, validCharacters);
  if (exactMatch) return exactMatch;

  if (isGenericRoleSpeaker(speaker)) {
    const speakerTokens = getPersonDescriptorTokens(speaker);
    const scoredMatches = validCharacters
      .map(c => {
        const castTokens = getPersonDescriptorTokens(c);
        const overlap = speakerTokens.filter(token => castTokens.includes(token)).length;
        return { name: c, overlap, castTokens };
      })
      .filter(match => match.overlap >= 2 || (speakerTokens.length === 1 && match.overlap === 1 && isGenericRoleSpeaker(match.name)));

    scoredMatches.sort((a, b) => b.overlap - a.overlap);
    if (scoredMatches.length && (scoredMatches.length === 1 || scoredMatches[0].overlap > scoredMatches[1].overlap)) {
      return scoredMatches[0].name;
    }

    // Generic role labels such as "男子" or "ギャル" are valid speakers.
    // Do not collapse them into a longer OCR title that merely contains the same substring.
    return '';
  }

  return validCharacters.find(c => {
    const nameOnly = c.split(/[（(]/)[0].trim();
    return nameOnly && (speaker.includes(nameOnly) || nameOnly.includes(speaker));
  });
};

/**
 * [v4.1.7] Determine if a speaker name refers to a person (either registered cast or third-party/mob)
 * @param {string} name - The name to test
 * @param {Array<string>} validCharacters - List of registered cast names
 * @returns {boolean} True if it looks like a person
 */
export const isLikelyPerson = (name, validCharacters = []) => {
  const cleanName = name.replace(/[（(].*?[）)]/g, '').trim();
  if (!cleanName) return false;

  if (cleanName === '全員' || cleanName === 'みんな') return true;
  if (isGenericRoleSpeaker(cleanName)) return true;

  // Check registered cast list
  const isCast = validCharacters.some(c => {
    const nameOnly = c.split(/[（(]/)[0].trim();
    return cleanName === c || cleanName === nameOnly || nameOnly === cleanName || cleanName.includes(nameOnly) || (cleanName.length >= 2 && c.includes(cleanName));
  });
  if (isCast) return true;

  // Person-indicative keywords (Japanese terms for suffix/roles, and 'mob'/'speaker')
  // [v4.5.12] 観察者A や スタッフ1 のようなサフィックス付きにも対応、役割語を追加
  const personKeywords = GENERIC_ROLE_SPEAKER_RE;
  return personKeywords.test(cleanName) || cleanName.toLowerCase().includes('mob') || cleanName.toLowerCase().includes('speaker');
};

const ACOUSTIC_QUOTE_POST_RE = /^\s*(?:という[^\n「」]{0,12}音|っていう[^\n「」]{0,12}音|と[^\n「」]{0,20}(?:音(?:が|を|で|。|、|$)|異音|金属音|爆音|轟音|衝撃音))/;
const SPOKEN_QUOTE_POST_RE = /^\s*(?:と|って)?\s*(?:[^「」。！？!?\n]{0,32})?(?:言|いう|言い|言う|言った|叫|叫び|叫ぶ|叫ん|呼|呼び|呟|つぶや|つぶやき|囁|ささや|ささやき|読み上げ|読みあげ|読み|発表|告げ|答|返|話|語|宣言|絶叫|嘆|漏ら|口に|述べ|怒鳴|呻|うめ|唸|ツッコ|つっこ|突っ込|問|尋)/;
const STRUCTURAL_LINE_PREFIX_PATTERN = String.raw`(?:[-*+>・●▪◦]\s*)?[【\[（(]?\s*`;
const STAGING_GAG_LABEL_PATTERN = String.raw`(?:演出(?:\s*[・･／/]?\s*ギャグ)?|ギャグ(?:\s*[・･／/]?\s*演出))`;
const VISUAL_DIRECTION_LABEL_TOKEN_PATTERN = String.raw`(?:表情|身体|演出|動作|ポーズ|姿勢|目線|視線|間合い|SFX|SE|効果音|音響効果|音響|音声|BGM)`;
const VISUAL_DIRECTION_LABEL_PATTERN = String.raw`(?:${VISUAL_DIRECTION_LABEL_TOKEN_PATTERN}(?:\s*[・･／/]\s*${VISUAL_DIRECTION_LABEL_TOKEN_PATTERN})*)`;
const META_SPEAKER_LABEL_PATTERN = String.raw`(?:Camera|Location|Outfit|EMOTION|状況(?:演出)?|Action|リアクション|Reaction|設定|物理描写|${VISUAL_DIRECTION_LABEL_PATTERN}|SFX|SE|効果音|音響効果|音響|音声|BGM|ナレーション|テロップ|聴覚|触覚|嗅覚|体内感覚|視覚|照明|光|${STAGING_GAG_LABEL_PATTERN}|空間|構図|背景|Background|カメラワーク|CameraWork|Camera\s*Work|セリフ|台詞|Dialogue|Punchline)`;
const STAGING_GAG_LINE_RE = new RegExp(`^\\s*${STRUCTURAL_LINE_PREFIX_PATTERN}${STAGING_GAG_LABEL_PATTERN}\\s*[:：]`);
const META_SPEAKER_LABEL_RE = new RegExp(`^\\s*${STRUCTURAL_LINE_PREFIX_PATTERN}${META_SPEAKER_LABEL_PATTERN}\\s*[】\\]）)]?\\s*$`, 'i');
const ACTION_VISUAL_LABEL_PATTERN = String.raw`(?:状況(?:演出)?|${STAGING_GAG_LABEL_PATTERN}|${VISUAL_DIRECTION_LABEL_PATTERN}|Situation)`;
const ACTION_VISUAL_LABEL_RE = new RegExp(`(?:^|[\\s　])${STRUCTURAL_LINE_PREFIX_PATTERN}${ACTION_VISUAL_LABEL_PATTERN}\\s*[:：]\\s*`, 'gi');
const ACOUSTIC_VISUAL_LINE_RE = new RegExp(
  `^\\s*${STRUCTURAL_LINE_PREFIX_PATTERN}(?=[^:：]*(?:SFX|SE|効果音|音響効果|音響|音声|BGM))${VISUAL_DIRECTION_LABEL_PATTERN}\\s*[:：]`,
  'i'
);

const hasAcousticQuotePostContext = (postText = '') => ACOUSTIC_QUOTE_POST_RE.test(postText.trim());
const hasSpokenQuotePostContext = (postText = '') => {
  const cleanPostText = postText.trim();
  return !hasAcousticQuotePostContext(cleanPostText) && SPOKEN_QUOTE_POST_RE.test(cleanPostText);
};

const INSTRUCTION_LINE_RE = new RegExp(`^\\s*${STRUCTURAL_LINE_PREFIX_PATTERN}${META_SPEAKER_LABEL_PATTERN}\\s*[:：]`, 'i');

const isInstructionLine = (line = '') => INSTRUCTION_LINE_RE.test(String(line).trim());

const STRUCTURED_SCENARIO_SECTION_RE = new RegExp(
  `^\\s*(?:[-+>・●▪◦]\\s*|\\*\\s+)?\\*{0,2}\\s*(${VISUAL_DIRECTION_LABEL_PATTERN}|背景|Background|セリフ|台詞|Dialogue)\\s*[:：]\\s*\\*{0,2}\\s*$`,
  'i'
);

const getStructuredScenarioSection = (line = '') => {
  const match = String(line).match(STRUCTURED_SCENARIO_SECTION_RE);
  if (!match) return '';
  return /^(?:セリフ|台詞|Dialogue)$/i.test(match[1]) ? 'dialogue' : 'visual';
};

const stripMatchingStructuralWrapper = (line = '') => {
  const match = String(line).match(/^(\s*(?:[-*+>・●▪◦]\s*)?)([【\[（(])([\s\S]*)([】\]）)])\s*$/);
  if (!match) return line;
  const matchingCloser = { '【': '】', '[': ']', '（': '）', '(': ')' }[match[2]];
  return matchingCloser === match[4] ? `${match[1]}${match[3]}` : line;
};

const normalizeDialogueSpeakerPrefix = (value = '') =>
  String(value)
    .replace(/^[\s\-*・、。:：]+/, '')
    .replace(/[【\[（(].*?[】\]）)]/g, '')
    .replace(/^(?:セリフ|台詞|Dialogue|Speech\s*Bubble\s*\d*)\s*[:：-]?\s*/i, '')
    .trim();

const isGenericShortSpeakerPrefix = (value = '') => {
  const clean = normalizeDialogueSpeakerPrefix(value);
  if (!clean || clean.length > 18) return false;
  if (!/[\u3040-\u30FF\u4E00-\u9FFFA-Za-zＡ-Ｚａ-ｚ]/u.test(clean)) return false;
  if (/^(?:Camera|Location|Outfit|EMOTION|Action|Reaction|Background|Punchline)$/i.test(clean)) return false;
  if (isNarrationSubjectSpeakerCandidate(clean)) return false;
  if (/[。！？!?…]/.test(clean)) return false;
  if (/(?:が|を|に|で|へ|は|も|と|から|まで|より)$/.test(clean) && clean.length > 3) return false;
  if (/(?:して|した|する|され|見て|持って|握って|座って|立って|走って|叫んで|つぶやいて)$/.test(clean)) return false;
  return true;
};

const JA_GROUP_SUBJECT_RE = /^(?:全員|みんな|一同|全キャラ|全メンバー)(?:は|が|も|を|に|で|へ|と|から|まで|より).+/u;
const JA_PARTICLE_AFTER_SUBJECT_RE = /^(?:は|が|も|を|に|で|へ|と|から|まで|より).+/u;

const isNarrationSubjectSpeakerCandidate = (value = '', validCharacters = []) => {
  const clean = normalizeDialogueSpeakerPrefix(value);
  if (!clean) return false;
  if (JA_GROUP_SUBJECT_RE.test(clean)) return true;

  return validCharacters.some(c => {
    const nameOnly = c.split(/[・（]/)[0].trim();
    return nameOnly && clean.startsWith(nameOnly) && JA_PARTICLE_AFTER_SUBJECT_RE.test(clean.slice(nameOnly.length));
  });
};

const isExplicitSameLineSpeakerPrefix = (value = '', validCharacters = []) => {
  const clean = normalizeDialogueSpeakerPrefix(value);
  if (!isGenericShortSpeakerPrefix(clean)) return false;
  if (clean === '全員' || clean === 'みんな' || clean === 'Speaker') return true;
  return validCharacters.some(c => {
    const nameOnly = c.split(/[（(]/)[0].trim();
    return nameOnly && (
      clean === c ||
      clean === nameOnly ||
      clean.replace(/[\s・]/g, '') === nameOnly.replace(/[\s・]/g, '')
    );
  }) || isGenericRoleSpeaker(clean);
};

const getExplicitSameLineSpeakerName = (value = '', validCharacters = []) => {
  const clean = normalizeDialogueSpeakerPrefix(value);
  const matchedCast = findSpeakerCastMatch(clean, validCharacters);
  if (matchedCast) return matchedCast.split(/[（(]/)[0].trim();
  return isExplicitSameLineSpeakerPrefix(clean, validCharacters) ? clean : '';
};

const getImmediateInlineSpeakerName = (value = '', validCharacters = []) => {
  const match = String(value).match(/(?:^|[、。！？!?…）)\s])([\p{L}\p{N}_・\s]{1,24})\s*(?:→|[-=]>|[:：])\s*$/u);
  if (!match) return '';
  return getExplicitSameLineSpeakerName(match[1], validCharacters);
};

const extractFirstAttributedDialogueText = (line = '', validCharacters = []) => {
  const source = String(line);
  const openingIndex = source.indexOf('「');
  if (openingIndex === -1) return '';

  let boundary = source.length;
  let nextOpeningIndex = source.indexOf('「', openingIndex + 1);
  while (nextOpeningIndex !== -1) {
    if (getImmediateInlineSpeakerName(source.slice(0, nextOpeningIndex), validCharacters)) {
      boundary = nextOpeningIndex;
      break;
    }
    nextOpeningIndex = source.indexOf('「', nextOpeningIndex + 1);
  }

  const attributedSegment = source.slice(openingIndex + 1, boundary);
  const closingIndex = attributedSegment.lastIndexOf('」');
  return closingIndex === -1 ? '' : attributedSegment.slice(0, closingIndex);
};

const normalizeContextSpeakerCandidate = (value = '') =>
  normalizeDialogueSpeakerPrefix(value)
    .replace(/^(?:状況(?:演出)?|Situation|Action)\s*[:：]\s*/i, '')
    .replace(/^(?:奥|手前|背後|後ろ|前|右|左|横|遠く|入口|出口|棚奥|店内|画面奥|背景|客席|会場|部屋|廊下|外|内側|外側)(?:の)?(?:から|より)/, '')
    .trim();

const getSpokenQuoteSpeakerName = (sameLinePrevText = '', validCharacters = []) => {
  const explicitSpeaker = getExplicitSameLineSpeakerName(sameLinePrevText, validCharacters);
  if (explicitSpeaker) return explicitSpeaker;

  let bestMatch = { index: -1, speaker: '' };
  validCharacters.forEach(c => {
    const nameOnly = c.split(/[（(]/)[0].trim();
    if (!nameOnly) return;
    const index = sameLinePrevText.lastIndexOf(nameOnly);
    if (index > bestMatch.index) {
      bestMatch = { index, speaker: nameOnly };
    }
  });

  CONTEXT_ROLE_SPEAKER_RE.lastIndex = 0;
  let match;
  while ((match = CONTEXT_ROLE_SPEAKER_RE.exec(sameLinePrevText)) !== null) {
    const speaker = normalizeContextSpeakerCandidate(match[1]);
    if (speaker && isLikelyPerson(speaker, validCharacters) && match.index > bestMatch.index) {
      bestMatch = { index: match.index, speaker };
    }
  }

  return bestMatch.speaker;
};

const isLikelyVisualLabelQuote = (dialogueText, prevText = '', postText = '') => {
  const trimmedDialogue = dialogueText.trim();
  const trimmedPost = postText.trim();
  if (!trimmedDialogue || hasSpokenQuotePostContext(trimmedPost)) return false;

  const hasSentenceEnding = /[。！？!?…]$/.test(trimmedDialogue);
  const compactContext = `${prevText.slice(-30)}${trimmedPost.slice(0, 40)}`;
  if (
    !hasSentenceEnding &&
    /(?:席|看板|札|プレート|ラベル|テロップ|字幕|見出し|タイトル|ロゴ|表示|文字|数字|数値|金額|名札|タグ|欄|枠|ボード|画面|スクリーン|モニター|ディスプレイ|サイン|案内|標識|速報|点滅|資料|項目|フォント)/.test(compactContext)
  ) {
    return true;
  }

  return false;
};

const normalizeDialogueCoverageText = (value = '') =>
  String(value)
    .replace(/[「」『』“”"'\s、。，．・…!！?？]/g, '')
    .trim();

const isCoveredByExistingSpeechBubble = (speechBubbleEntries, dialogueText = '') => {
  const target = normalizeDialogueCoverageText(dialogueText);
  if (target.length < 3) return false;

  return speechBubbleEntries.some(entry => {
    const existing = normalizeDialogueCoverageText(entry.text);
    if (!existing) return false;
    if (existing === target) return true;
    return target.length >= 4 && existing.includes(target);
  });
};

const dialogueEditDistance = (left = '', right = '') => {
  const a = Array.from(left);
  const b = Array.from(right);
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);

  for (let i = 1; i <= a.length; i++) {
    let diagonal = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const previous = row[j];
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        diagonal + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      diagonal = previous;
    }
  }

  return row[b.length];
};

const isNearDuplicateSpeechForSpeaker = (speechBubbleEntries, speaker = '', dialogueText = '') => {
  const target = normalizeDialogueCoverageText(dialogueText);
  const speakerKey = normalizeSpeakerKey(speaker);
  if (!speakerKey || target.length < 4) return false;

  return speechBubbleEntries.some(entry => {
    if (normalizeSpeakerKey(entry.speaker) !== speakerKey) return false;
    const existing = normalizeDialogueCoverageText(entry.text);
    if (!existing) return false;
    const longest = Math.max(existing.length, target.length);
    if (Math.abs(existing.length - target.length) > Math.max(1, Math.floor(longest * 0.15))) return false;
    return dialogueEditDistance(existing, target) <= Math.max(1, Math.floor(longest * 0.15));
  });
};

export const getCharTraitsFromMatrix = (charName, castList) => {
  const matrix = buildIdentityMatrix(castList);
  const line = matrix.split('\n').find(l => l.includes(`[${charName}]`));
  if (line) {
    const traits = line.split(':').slice(1).join(':').trim();
    return traits;
  }
  return '';
};

const compactIdentityTraits = (traits = '') =>
  String(traits || 'see reference')
    .replace(/\s*\([^)]*(?:do NOT add glasses|do NOT remove)[^)]*\)/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

export const getCameraForPanel = (panelText, shuffledCameras, cameraState) => {
  // [Camera: XXX] の抽出を試みる
  const cameraMatch = panelText.match(/\[Camera:\s*(.*?)\]/i);
  if (cameraMatch && cameraMatch[1]) {
     const specificCamera = cameraMatch[1].trim();
     const literalCameraPrefix = EXPLICIT_DETAIL_CAMERA_RE.test(specificCamera) ? `${specificCamera}; ` : '';

     // [v4.5.6] シネマティック構図のチェック（歪みを加えず、美しさを強調）
     for (const [keyword, lensTag] of Object.entries(cinematicCompositionMap)) {
       if (specificCamera.toLowerCase().includes(keyword.toLowerCase())) {
         return `${literalCameraPrefix}${lensTag}, (masterpiece, best quality, highly detailed, professional photography:1.2), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)`;
       }
     }

     // [v2.60] AIのカメラ名をマッピング辞書で具体的なレンズ歪みタグに変換
     let matchedLens = '';
     for (const [keyword, lensTag] of Object.entries(cameraLensMap)) {
       if (specificCamera.includes(keyword)) {
         matchedLens = lensTag;
         break;
       }
     }
     // マッピングが見つかった場合はレンズ歪みタグ + 汎用歪みを結合
     if (matchedLens) {
       return `${literalCameraPrefix}${matchedLens}, (EXTREME hyper-dynamic composition:2.6), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)`;
     }
     // マッピングなし → 汎用歪みプロンプトのみ
     return `${literalCameraPrefix}(Extreme intense dynamic camera angle: 2.8), (EXTREME hyper-dynamic composition:2.6), (SEVERE dutch angle or extreme perspective distortion:2.7), (MASSIVE spherical or telephoto depth separation:2.5), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)`;
  }
  // AIがカメラタグを出力しなかった場合のフォールバック（重複なしランダム）
  const fallbackCamera = shuffledCameras[cameraState.index % shuffledCameras.length];
  cameraState.index++;
  return fallbackCamera;
};

export const stripWeightTags = (text) => {
  return text
    .replace(/\(([^()]+?):\d+\.?\d*\)/g, '$1')  // (tag:2.7) → tag
    .replace(/,\s*,+/g, ',')                      // 連続カンマ除去
    .replace(/,\s*$/g, '')                         // 末尾カンマ除去
    .replace(/^\s*,\s*/g, '')                      // 先頭カンマ除去
    .trim();
};

export const getCameraForChatGPT = (panelText, cameraState) => {
  const cameraMatch = panelText.match(/\[Camera:\s*(.*?)\]/i);
  if (cameraMatch && cameraMatch[1]) {
    // シナリオのカメラ説明（日本語の具体的な演出指示）をそのまま使う
    return cameraMatch[1].trim();
  }
  // フォールバック: ランダムカメラの自然言語版
  const fallbackCameras = [
    'Extreme bird\'s-eye view from directly above',
    'Worm\'s-eye view from ground level looking up',
    'Dutch angle with 30-45 degree tilt',
    'Telephoto close-up with background compression',
    'Wide-angle shot with exaggerated perspective'
  ];
  return fallbackCameras[cameraState.index % fallbackCameras.length];
};

export const extractDialogueOnly = (fullPanelText, castList, options = {}) => {
  const lines = fullPanelText.split('\n');

  // Markdown scenario blocks such as **表情:** and **演出:** may contain
  // quoted mouth shapes, breaths, or sound effects. Keep the whole visual
  // section available to Action, but never promote its contents to bubbles.
  const visualDirectionRanges = [];
  let activeStructuredSection = '';
  let sectionSearchStart = 0;
  lines.forEach(line => {
    const lineStart = fullPanelText.indexOf(line, sectionSearchStart);
    const rangeStart = lineStart === -1 ? sectionSearchStart : lineStart;
    if (lineStart !== -1) sectionSearchStart = lineStart + line.length;

    const section = getStructuredScenarioSection(line);
    if (PANEL_HEADER_RE.test(line)) {
      activeStructuredSection = '';
    } else if (section) {
      activeStructuredSection = section;
    } else if (activeStructuredSection === 'visual' && isInstructionLine(line)) {
      activeStructuredSection = '';
    }

    if (activeStructuredSection === 'visual') {
      visualDirectionRanges.push({ start: rangeStart, end: rangeStart + line.length });
    }
  });
  const isVisualDirectionOffset = (offset) => visualDirectionRanges.some(({ start, end }) => offset >= start && offset <= end);

  // Extract valid characters from castList to prevent action instructions being misidentified as speakers
  const validCharacters = collectCastNames(castList);

  const speechBubbleEntries = [];
  const bubbleKeys = new Set();
  let bubbleSequence = 0;

  const pushSpeechBubble = (speaker, text, order = Number.MAX_SAFE_INTEGER) => {
    const cleanText = String(text || '').trim();
    const cleanSpeaker = String(speaker || '').trim();
    if (!cleanText) return;
    const key = `${cleanSpeaker}\u0000${cleanText}`;
    if (bubbleKeys.has(key)) return;
    bubbleKeys.add(key);
    speechBubbleEntries.push({
      order,
      sequence: bubbleSequence,
      speaker: cleanSpeaker,
      text: cleanText
    });
    bubbleSequence++;
  };

  let lineSearchStart = 0;
  lines.forEach(line => {
    const lineStart = fullPanelText.indexOf(line, lineSearchStart);
    const lineOrder = lineStart === -1 ? lineSearchStart : lineStart;
    if (lineStart !== -1) lineSearchStart = lineStart + line.length;

    if (PANEL_HEADER_RE.test(line)) return;
    if (getStructuredScenarioSection(line)) return;
    if (isVisualDirectionOffset(lineOrder)) return;
    // [v4.6.5-fix] SE（効果音演出指示）行をスキップ: （SE: ...）や (SE: ...) の形式に加え、
    // 「音響効果：」「SE：」「効果音：」等のコロン形式も除外
    const trimmedForSE = line.trim();
    if (/^[（(]\s*SE\s*[:：]/i.test(trimmedForSE)) return;
    if (/^(?:音響効果|音響|音声|SE|効果音|SFX|BGM)\s*[:：]/i.test(trimmedForSE)) return;

    // Check if line indicates dialogue
    const match = line.match(/^(.*?)(?:[:：]|「)/);
    let isDialogue = false;
    let clean = line;
    // [v4.6.10] スピーカー名を保持してSpeech Bubbleに明記する
    let detectedSpeaker = '';

    const isInstruction = isInstructionLine(line);
    if (match && match[1].trim() && !isInstruction) {
      let tempSpeaker = match[1].replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
      // ベースとなる話者名（カッコ内のト書きを無視）
      let tempSpeakerBase = tempSpeaker.replace(/[（(].*?[）)]/g, '').trim();

      // [v2.31] 話者名バリデーション強化: ト書き誤検出防止
      // 「サエコが、売店のカウンターに」のような文章が話者名として誤検出されるのを防ぐ
      // [v4.6.4] キャスト名完全一致バイパス: 助詞を含むキャスト名（例: と■のよ■ゆき子）を正しく認識
      // シナリオ内ではスペースが省略されることが多いため、スペース除去比較も行う
      const normalizedSpeaker = tempSpeakerBase.replace(/[\s・]/g, '');
      const isExactCastMatch = validCharacters.some(c => {
        const nameOnly = c.split(/[（(]/)[0].trim();
        const normalizedName = nameOnly.replace(/[\s・]/g, '');
        return nameOnly && (tempSpeakerBase === nameOnly || tempSpeakerBase === c || normalizedSpeaker === normalizedName);
      });
      const hasSentenceParticles = !isExactCastMatch && /(?:が|を|に|で|へ|は|も|と|から|まで|より)/.test(tempSpeakerBase) && tempSpeakerBase.length > 5;
      const endsWithParticle = !isExactCastMatch && /(?:が|を|に|で|へ|は|も|と|から|まで|より)$/.test(tempSpeakerBase);
      const isNarrationSubject = isNarrationSubjectSpeakerCandidate(tempSpeakerBase, validCharacters);
      const isTooLong = tempSpeakerBase.length > 20; // 複数人「アカリ・ヒカリ・ミク・リン」を許容するため長めに変更
      // [v4.6.3] 照明・SE・演出など舞台指示用語をメタタグとして除外
      // [v4.6.10] 「セリフ」「台詞」「Dialogue」をメタタグに追加（スピーカー誤認識防止）
      const isMetaTag = META_SPEAKER_LABEL_RE.test(tempSpeakerBase);
      // [v2.45] 効果音パターン検出: 同じ文字(長音含む)の繰り返しは効果音（シーーーン、ゴゴゴ等）
      const isSoundEffect = /^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(tempSpeakerBase);
      // [v2.45] リアクション指示混入検出: 「（リアクション」等が話者名に含まれていたら除外
      const hasReactionTag = /[（(]\s*リアクション/i.test(match[1]);

      const isUnregisteredCharacterCategory = isUnregisteredCharacterCategorySpeaker(tempSpeakerBase, validCharacters);

      if (hasSentenceParticles || endsWithParticle || isNarrationSubject || isTooLong || isMetaTag || isSoundEffect || hasReactionTag || isUnregisteredCharacterCategory) {
        // 文章構造・メタタグ・効果音・リアクション指示を含む → 話者名ではない
      } else if (isLikelyPerson(tempSpeakerBase, validCharacters) || isGenericShortSpeakerPrefix(tempSpeakerBase) || tempSpeakerBase.includes("全員") || tempSpeakerBase === "Speaker" || match[0].trim().endsWith(':') || match[0].trim().endsWith('：')) {
        isDialogue = true;
        // [v4.6.10] キャスト名を名寄せしてスピーカー名を保持
        const matchedCast = findSpeakerCastMatch(tempSpeakerBase, validCharacters);
        detectedSpeaker = matchedCast ? matchedCast.split(/[（(]/)[0].trim() : normalizeDialogueSpeakerPrefix(tempSpeakerBase);
      }
    } else if (line.trim().startsWith('「')) {
      // [v2.29] 根本修正: 行全体が「...」で完結するセリフ形式のみを判定。
      // 「没収」と書かれた袋を...のようなト書き中の引用語を誤検出しない。
      const trimmedLine = line.trim();
      // [v4.5.13] 「セリフ」（話者）の形式をサポートするため末尾のカッコを許容
      const isFullQuoteLine = /^「[^」]+」[？！。、!?\s]*([（\(][^\)）]+[\)）])?$/.test(trimmedLine);
      if (isFullQuoteLine) {
        // [v4.2.0] ト書き（動作指示）や極端に短い名詞の誤検出防止
        const quoteContent = trimmedLine.match(/^「([^」]+)」/)?.[1] || '';
        const isStageDirection = /(?:ポーズ|表情|リアクション|アクション|身振り|手振り|仕草|動作|姿勢|佇まい|構え|目線|視線|沈黙|間|無言|独白|ジェスチャー|モーション|立ち姿|座り|しぐさ|ため息|溜息|息|うなずき|頷き|首振り|指差し|腕組み|ガッツポーズ|ドヤ顔|苦笑い|苦笑|微笑|爆笑|号泣|絶叫|フリーズ|硬直|脱力|崩れ落ち|土下座|敬礼|拍手|握手|ハイタッチ|決めポーズ|威圧|威嚇|震え|よろめき|のけぞり|ずっこけ|ツッコミ|突っ込み)/.test(quoteContent);
        const isTooShortForDialogue = quoteContent.length <= 4 && !/[がをにでへはもとからよねわ！？!?…。、]/.test(quoteContent);
        if (!isStageDirection && !isTooShortForDialogue) {
          isDialogue = true;
        }
      }
    }

    // [v4.6.3] コロン形式ト書き判定: 「キャラ名：描写テキスト」で「」を含まない長文はト書き（演出指示）
    // 例: 「ミク：両腕ダルんと投げ出し、口を大きく開けて超あくび」はセリフではなくポーズ描写
    if (isDialogue && match && (match[0].trim().endsWith(':') || match[0].trim().endsWith('：'))) {
      const restOfLine = line.substring(match.index + match[0].length);
      const hasNoQuotes = !/[「」]/.test(restOfLine);
      if (hasNoQuotes && restOfLine.trim().length > 15) {
        isDialogue = false;
      }
    }

    if (isDialogue) {
      // [v4.5.13] 「セリフ」（キャラ）の形式の場合、前処理で正確に中身だけを抽出
      const quoteMatch = clean.trim().match(/^「([^」]+)」/);
      if (quoteMatch && clean.trim().startsWith('「')) {
        clean = quoteMatch[1];
      } else if (detectedSpeaker) {
        const attributedQuote = extractFirstAttributedDialogueText(clean, validCharacters);
        if (attributedQuote) clean = attributedQuote;
        else clean = clean.replace(/^.*?(?:[:：])\s*/, '');
      } else {
        // Remove Speaker Name and Colon
        clean = clean.replace(/^.*?(?:[:：]|「)\s*/, '');
        // トリムを行ってからカッコを除去（末尾のスペースで除去漏れが発生するのを防ぐため）
        clean = clean.trim();
        // Remove surrounding Japanese quotes to prevent hallucination in images
        clean = clean.replace(/^「+/, '').replace(/」+$/, '');
      }
      // [v2.04] Remove parenthetical stage directions (e.g. (ため息) or （笑顔）) to prevent them from rendering as printed text in balloons
      clean = clean.replace(/（.*?）|\(.*?\)/g, '');
      clean = clean.trim();

      pushSpeechBubble(detectedSpeaker, clean, lineOrder);
    }
  });

  // [v2.22] フォールバック: キャラ名マッチに失敗しても、カギ括弧「」で囲まれたテキストがあればセリフとして抽出
  // [v2.29] ト書き誤検出防止: カギ括弧内のテキストがト書き（状況説明）でないかをチェック
  // [v4.1.6 Fix] カギ括弧の直前にキャスト名が存在する場合のみセリフとしてパースし、ロゴ名や第三者のボイス（齊藤氏等）の誤抽出を防止
  {
    const regex = /「([^」]+)」/g;
    let match;
    let lastIndex = 0;
    while ((match = regex.exec(fullPanelText)) !== null) {
      if (isVisualDirectionOffset(match.index)) continue;
      let dialogueText = match[1].trim();
      dialogueText = dialogueText.replace(/（.*?）|\(.*?\)/g, '').trim();
      
      // カギ括弧の直前のテキスト（前のカギ括弧の末尾から、現在のカギ括弧の先頭まで）を取得
      const prevText = fullPanelText.substring(lastIndex, match.index);
      // [v4.6.5] lastIndex は「セリフとして処理された場合」のみ更新する（後述）。
      // 非セリフ（形状描写「へ」の字、記号、SFX等）でスキップした場合は lastIndex を進めず、
      // 話者コンテキスト（キャラ名を含むprevText）を次のマッチに引き継ぐ。
      const quoteLineStart = fullPanelText.lastIndexOf('\n', match.index) + 1;
      const quoteLineEndRaw = fullPanelText.indexOf('\n', match.index);
      const quoteLineEnd = quoteLineEndRaw === -1 ? fullPanelText.length : quoteLineEndRaw;
      const quoteLine = fullPanelText.slice(quoteLineStart, quoteLineEnd);
      const sameLinePrevText = fullPanelText.slice(quoteLineStart, match.index);
      const sameLinePostText = fullPanelText.slice(regex.lastIndex, quoteLineEnd);
      const postText = fullPanelText.substring(regex.lastIndex, regex.lastIndex + 40);
      const isSpokenQuoteByPostText = hasSpokenQuotePostContext(sameLinePostText || postText);
      const immediateInlineSpeaker = getImmediateInlineSpeakerName(sameLinePrevText, validCharacters);

      // Same-line speaker labels are reliable. Speech verbs inside situation/reaction
      // narration become bubble contracts only when a nearby person/role can be identified.
      const hasSameLineSpeaker = isExplicitSameLineSpeakerPrefix(sameLinePrevText, validCharacters);
      const inferredSpokenSpeaker = isSpokenQuoteByPostText
        ? getSpokenQuoteSpeakerName(sameLinePrevText, validCharacters)
        : '';
      const hasValidSpeakerInPrevText = hasSameLineSpeaker || Boolean(immediateInlineSpeaker) || Boolean(inferredSpokenSpeaker);

      if (!hasValidSpeakerInPrevText) {
        // 直前にキャスト名や人物名がない場合は、セリフではなく引用や他人の発言としてスキップ
        continue;
      }

      // [v4.1.9] 形状・記号・修飾表現の除外チェック
      // 1. 長さが極めて短い、英数字・記号のみの文字列（例：Ω、∩、Aなど）は除外
      const isPureSymbol = /^[A-Za-z0-9Ω∩αβγδεζηθικλμνξοπρστυφχψω\s\-\+\*\/\\＝\?？!！]{1,3}$/.test(dialogueText);

      // [v4.6.5-fix2] 擬音語・擬態語の除外（バンッ！、ガチャン！、ガリッ！等）
      // ン・リ・ル等の一般的なSFX語尾を許容するため suffix に追加
      const isSfx = /^(バン|ドン|ガン|ドカ|バキ|ドス|ガサ|ゴト|チリン|ピンポン|カチ|パチ|ドーン|バァーン|ドォーン|バーン|ドドド|ゴゴゴ|ザザザ|ピー|ピピッ|ガチャ|ギー|ガリ|バタ|ガタ|ビリ|メリ|パリ|ドサ|ズド|ゴロ|キー|ギシ|ビシ|ガシャ|ミシ|カタ|コト|パタ|ジャリ|ズシ|グシャ|ベキ|メキ)[ッーン!！\s]*$/u.test(dialogueText);
      // [v4.6.5-fix2] 「〜と...音が」「〜と...鳴」等のSE文脈も検出
      const isSfxByPostText = hasAcousticQuotePostContext(postText);
      const isInstructionQuoteWithoutSpeechVerb = isInstructionLine(quoteLine) && !hasSpokenQuotePostContext(sameLinePostText);
      const isLooseContextOnly = !hasValidSpeakerInPrevText;
      const isReactionNoteQuote = /(?:リアクション|Reaction)\s*[:：][^。！？!?\n]*$/i.test(sameLinePrevText);

      // 2. 直前のテキストの末尾が形状や表記指示、比喩表現などを示すものである場合は除外
      const isNotDialogueIndicator = /(?:型|字|感|と書かれた|と書く|と書き|と書いた|という|のような|風の|的な|コード|キー|マーク|記号|ラベル|吹き出し|セリフ|ポーズ)$/.test(prevText.trim());
      const preQuoteContext = prevText.slice(-40);
      // [v4.6.5-fix2] SE関連メタタグ（音響効果、効果音等）が直前にある場合も除外
      // [v4.6.6] 「一文字」「数文字」「何文字」等の複合語が「文字」に誤マッチする問題を修正
      const isVisualTextByContext =
        /(?:空中|宙|空間|画面|紙|原稿|黒板|ホワイトボード|看板|札|プレート|ノート|ページ|壁|床|(?<![一数何])文字|単語|タイトル|見出し|ラベル|テロップ|字幕|サイン|SFX|擬音|音響効果|効果音|SE|BGM|音響|音声)[^「」]{0,12}$/.test(preQuoteContext) ||
        /^(?:と)?[^。！？\n]{0,16}(?:書|描|指書|なぞ|浮か|表示|投影|刻|印字|残像|光|輝|出現|出る|現れる|走る|切り裂く)/.test(postText);

      // [v4.5.11] 3. カギ括弧の直後が助詞（が、を、に、で、へ、も、から、より）などで名詞的に使われている場合は除外
      // ※「の」は「〜の吹き出し」などの場合があるため、「と」は「〜と叫ぶ」などの場合があるため含めない。
      const isUsedAsNoun = /^[がをにでへもからより]/.test(postText.trim());

      // [v4.6.5] 4. 形状描写の除外: 「へ」の字、「Ω」型、「ω」型 等の1〜2文字カギ括弧は
      // 口の形や図形を表す描写であり、セリフではない。直後に「の字」「型」「の形」等が続く場合は除外。
      const isShapeDescription = dialogueText.length <= 2 && /^(?:の字|型|の形|の口|にゆが|に曲|に歪|に変形|に開|に大|のよう|みたい)/.test(postText.trim());

      // [v4.6.6] 表情・動作・状態の描写テキスト除外
      // 漫画の演出上カギ括弧で強調されているが、キャラが口に出すセリフではないもの
      const isExpressionOrActionDescription = (() => {
        // 1. 動作・状態イディオム（「言葉を失う」「息を呑む」等の慣用句）
        if (/^(?:言葉を失う|声を失う|息を呑む|目を見張る|目を疑う|耳を疑う|言葉にならない|声にならない|声が出ない|二の句が継げない|開いた口が塞がらない|頭が真っ白になる|血の気が引く|腰が抜ける|鳥肌が立つ|固まる|フリーズ|硬直|沈黙|絶句|呆然|唖然|戦慄|絶望|覚醒|暴走|崩壊|発狂)$/.test(dialogueText)) {
          return true;
        }
        // 2. 感情記述記号（＋やMAX等、口語では使わない表記）を含む表現描写
        if (/[＋+×]/.test(dialogueText) && /(?:MAX|ＭＡＸ|全開|全力|怒り|呆れ|驚き|喜び|悲しみ|恐怖|焦り|困惑|嫉妬|不安|感動|興奮|緊張)/.test(dialogueText)) {
          return true;
        }
        return false;
      })();

      const isVisualLabelQuote = isLikelyVisualLabelQuote(dialogueText, prevText, postText);

      if (isInstructionQuoteWithoutSpeechVerb || isLooseContextOnly || isReactionNoteQuote || (!isSpokenQuoteByPostText && (isPureSymbol || isSfx || isSfxByPostText || isNotDialogueIndicator || isVisualTextByContext || isUsedAsNoun || isShapeDescription || isExpressionOrActionDescription || isVisualLabelQuote))) {
        // [v4.6.5] 非セリフ — lastIndexを進めず、話者コンテキストを次のマッチに引き継ぐ
        continue;
      }

      // [v2.29] ト書き判定: キャラ名2名以上+動作動詞を含む長文はト書きとみなしスキップ
      const charNamesInText = validCharacters.filter(c => {
        const nameOnly = c.split(/[\(（]/)[0].trim();
        return nameOnly && dialogueText.includes(nameOnly);
      });
      const hasActionVerbs = /(?:走|逃|叫|倒|飛|投|握|振|開|閉|持|回|守|追|暴|掴|奪|叩|殴|蹴|泣|笑|怒|驚|震|立|座|歩|見|向|指|差|押|引|掲|置|取|抱|抜|落|転|上|下|入|出|乗|降|着|脱|食|飲|読|書|聞|話|歌|踊|遊|寝|起|止|始|続|終|帰|来|行|待|送|届|届|渡|受|返|払|買|売|借|貸|集|散|並|重|包|巻|結|解|切|折|曲|伸|縮|揺|動|止|消|現|隠|探|見つ)/.test(dialogueText);
      const isLikelyNarration = (charNamesInText.length >= 2 && hasActionVerbs && dialogueText.length > 15);
      // [v4.6.5] セリフとして処理された場合のみ lastIndex を更新
      lastIndex = regex.lastIndex;
      if (dialogueText && !isLikelyNarration) {
        // Infer a nearby speaker for spoken quotes embedded inside action narration.
        const fallbackSpeakerName = immediateInlineSpeaker || inferredSpokenSpeaker || getSpokenQuoteSpeakerName(sameLinePrevText, validCharacters);
        if (!fallbackSpeakerName) continue;
        if (isNearDuplicateSpeechForSpeaker(speechBubbleEntries, fallbackSpeakerName, dialogueText)) continue;
        if (isCoveredByExistingSpeechBubble(speechBubbleEntries, dialogueText)) continue;
        pushSpeechBubble(fallbackSpeakerName, dialogueText, match.index);
      }
    }
  }

  // [v2.22] 「吹き出し描くな」指示を廃止。セリフが無い場合でも描画を阻害しない
  if (speechBubbleEntries.length === 0) {
    return "(Characters interact without dialogue in this panel)";
  }
  const orderedEntries = speechBubbleEntries
    .sort((a, b) => a.order - b.order || a.sequence - b.sequence);

  if (options.forImagePrompt) {
    const visibleText = orderedEntries
      .map((entry, index) => `B${index + 1}="${entry.text}"`)
      .join('; ');
    const tailTargets = orderedEntries
      .map((entry, index) => entry.speaker ? `B${index + 1}->[${entry.speaker}]` : '')
      .filter(Boolean)
      .join('; ');
    return `TEXT (PRINT VALUES ONLY): ${visibleText}. TAILS (METADATA; NEVER PRINT NAMES): ${tailTargets || 'match the visually speaking character'}.`;
  }

  return orderedEntries
    .map((entry, index) => {
      const speakerTag = entry.speaker ? ` [${entry.speaker}]` : '';
      return `(Speech Bubble ${index + 1}${speakerTag}: "${entry.text}")`;
    })
    .join(', ');
};

const DIRECT_ADDRESS_SUBJECT_RE = /(?:読者|観客|視聴者|カメラ|配信|撮影|レンズ|第四の壁|メタフィクション|reader|viewer|audience|camera|livestream|broadcast|filming|fourth\s+wall|metafiction)/i;
const DIRECT_ADDRESS_ACTION_RE = /(?:話しかけ|呼びかけ|語りかけ|訴えかけ|目線を向け|正面を向|見つめ|address(?:es|ing)?|speak(?:s|ing)?\s+to|talk(?:s|ing)?\s+to|look(?:s|ing)?\s+(?:at|into)|face(?:s|ing)?|stare(?:s|ing)?|gaze(?:s|ing)?)/i;
const CAMERA_FACING_NEGATION_RE = /(?:(?:画面|カメラ|読者|観客|視聴者)[^\n。]{0,48}(?:厳禁|禁止|避け|しない|させない|向けない)|(?:never|do\s+not|don't|must\s+not|avoid)[^.\n]{0,48}(?:camera|reader|viewer|audience))/i;
const CAMERA_INSTRUCTION_LINE_RE = /^\s*\[?\s*(?:Camera|カメラワーク|CameraWork|Camera\s*Work)\s*[:：][^\n]*$/gim;
const EXPLICIT_DETAIL_CAMERA_RE = /(?:手元|真上|超接写|接写|クローズアップ|overhead|top[- ]?down|hand[- ]?detail|macro|close[- ]?up)/i;
const FUNCTIONAL_PRESENTATION_ACTION_RE = /(?:\bsubmit(?:s|ted|ting)?\b|\bpresent(?:s|ed|ing)?\b|\bshow(?:s|ed|ing)?\b|提出|提示|見せ|差し出)/i;
const FUNCTIONAL_SELF_USE_ACTION_RE = /(?:\bread(?:s|ing)?\b|\boperate(?:s|d|ing)?\b|読む|読ん|操作|確認|(?:画面|文面|書類|本|地図|カード|表示)[^。\n]{0,24}(?:見る|見て|見つめ|凝視))/i;
const INTERPERSONAL_STAGING_RE = /(?:話しかけ|語りかけ|呼びかけ|問いかけ|会話|相談|議論|打ち合わせ|返事|答え|叫ぶ|反応|リアクション|向かい合|見つめ合|振り向|speak(?:s|ing)?\s+to|talk(?:s|ing)?\s+to|ask(?:s|ing)?|answer(?:s|ing)?|repl(?:y|ies|ying)|respond(?:s|ing)?|react(?:s|ing)?|conversation|discuss(?:es|ing)?|shout(?:s|ing)?)/i;
const LISTENER_OR_REACTOR_CUE_RE = /(?:全員|一同|みんな|相手|聞き手|編集者(?:たち|一同|[0-9０-９一二三四五六七八九十]+人)?|メンバー(?:たち|一同|[0-9０-９一二三四五六七八九十]+人)?|仲間(?:たち|一同)?|リアクション|反応|→|listeners?|interlocutors?|editors?|the\s+group|everyone|all\s+of\s+them|reactors?)/i;

const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildExplicitStagingSides = (text, castNames) => {
  const marker = String(text).match(/\[USER STAGING LOCK - ABSOLUTE\]\s*:\s*([^\n]+)/i)?.[1] || '';
  if (!marker) return '';

  const sentences = marker.split(/(?<=[。！？!?])\s*/u).filter(Boolean);
  for (const sentence of sentences) {
    const sentenceNames = castNames.filter((name) => sentence.includes(name));
    if (sentenceNames.length < 2) continue;

    for (const target of sentenceNames) {
      const escapedTarget = escapeRegex(target);
      const japaneseTarget = new RegExp(`${escapedTarget}(?:の方)?に(?:向かって)?(?:話しかけ|語りかけ|呼びかけ|問いかけ)`);
      const englishTarget = new RegExp(`(?:speak|talk|address)(?:s|ed|ing)?\\s+to\\s+\\[?${escapedTarget}\\]?`, 'i');
      if (!japaneseTarget.test(sentence) && !englishTarget.test(sentence)) continue;

      const sources = sentenceNames.filter((name) => name !== target);
      if (sources.length === 0) continue;
      return `SIDES> [${target}] ↔ ${sources.map((name) => `[${name}]`).join(',')}; three-quarter or rear/OTS staging; never lens/front; overrides placement.`;
    }
  }
  return '';
};

const extractExplicitRearSubject = (text, castNames) => {
  const cameraText = (String(text || '').match(CAMERA_INSTRUCTION_LINE_RE) || []).join(' ');
  if (!cameraText) return '';

  return castNames.find((name) => {
    const escapedName = escapeRegex(name);
    const japaneseShoulder = new RegExp(`\\[?${escapedName}\\]?(?:の)?(?:肩|ショルダー)(?:越し|ごし)`, 'i');
    const englishShoulder = new RegExp(`(?:over|from\\s+behind|behind)\\s+(?:the\\s+)?\\[?${escapedName}\\]?(?:['’]s)?\\s+shoulder`, 'i');
    return japaneseShoulder.test(cameraText) || englishShoulder.test(cameraText);
  }) || '';
};

const buildRequiredDepthAssignment = (speakers, listeners, requireVisibleRear = false, explicitRearSubject = '', functionalActionMode = '') => {
  const participants = [...new Set([...speakers, ...listeners])];
  const partner = participants.includes(explicitRearSubject)
    ? explicitRearSubject
    : (speakers[1] || listeners[0] || 'described listener group');
  const primary = speakers.find((name) => name !== partner)
    || listeners.find((name) => name !== partner)
    || speakers[0]
    || 'active speaker';
  const primaryLabel = primary === 'active speaker' ? primary : `[${primary}]`;
  const partnerLabel = partner === 'described listener group' ? partner : `[${partner}]`;
  const functionalConsequence = functionalActionMode === 'presentation'
    ? `OTS FUNCTIONAL FACE CONSEQUENCE: derive target from Action, never holder—read/operate=self; submit/present/show=recipient. Face the recipient and derive visibility from recipient side.`
    : functionalActionMode === 'self-use'
      ? `OTS FUNCTIONAL FACE CONSEQUENCE: derive target from Action, never holder—read/operate=self; submit/present/show=recipient. ${partnerLabel} reads/operates: front+UI camera-visible to user+camera; ${primaryLabel} is across the object, so show its back/edge from camera unless Action targets ${primaryLabel}.`
      : 'OTS FUNCTIONAL FACE CONSEQUENCE: Action target—read/operate=self; submit/present/show=recipient; visibility follows target side.';
  const visibleRearCheck = requireVisibleRear
    ? `${explicitRearSubject ? ' EXPLICIT REAR CAMERA:' : ''} VISIBLE REAR DEPTH CHECK: camera is physically behind ${partnerLabel}'s shoulder; show the back of ${partnerLabel}'s head or shoulder foreground, facing ${primaryLabel}, not as backdrop. Do NOT show ${partnerLabel}'s face front-on. ${functionalConsequence}`
    : '';
  return `DEPTH ASSIGNMENT (REQUIRED): ${primaryLabel} PRIMARY THREE-QUARTER toward ${partnerLabel}; ${partnerLabel} BACK-THREE-QUARTER OR OVER-THE-SHOULDER PARTNER toward ${primaryLabel}. Do not render this exchange as two reader-facing frontal poses.${visibleRearCheck}`;
};

export const buildPanelEyeLineRule = (panelText, castList) => {
  const text = String(panelText || '');
  const dialogue = extractDialogueOnly(text, castList);
  const speakers = [...dialogue.matchAll(/Speech Bubble \d+ \[([^\]]+)\]/g)]
    .map((match) => match[1].trim())
    .filter((name, index, names) => name && names.indexOf(name) === index);
  const actionAndDialogueText = text.replace(CAMERA_INSTRUCTION_LINE_RE, '');
  const mentionedCastNames = [...new Set(collectCastNames(castList)
    .map((name) => name.split('(')[0].trim())
    .filter(Boolean))]
    .filter((name) => actionAndDialogueText.includes(name));
  const explicitRearSubject = extractExplicitRearSubject(text, [...new Set([...mentionedCastNames, ...speakers])]);
  const cameraText = (text.match(CAMERA_INSTRUCTION_LINE_RE) || []).join(' ');
  const explicitDetailCamera = !explicitRearSubject && EXPLICIT_DETAIL_CAMERA_RE.test(cameraText);
  const functionalActionMode = FUNCTIONAL_PRESENTATION_ACTION_RE.test(actionAndDialogueText)
    ? 'presentation'
    : FUNCTIONAL_SELF_USE_ACTION_RE.test(actionAndDialogueText)
      ? 'self-use'
      : '';
  const explicitDirectAddress = !CAMERA_FACING_NEGATION_RE.test(actionAndDialogueText)
    && DIRECT_ADDRESS_SUBJECT_RE.test(actionAndDialogueText)
    && DIRECT_ADDRESS_ACTION_RE.test(actionAndDialogueText);
  const stagedSpeakerAndListener = speakers.length === 1
    && INTERPERSONAL_STAGING_RE.test(actionAndDialogueText)
    && (mentionedCastNames.length >= 2 || LISTENER_OR_REACTOR_CUE_RE.test(actionAndDialogueText));

  if (explicitDirectAddress) {
    return 'DIRECT-ADDRESS EXCEPTION: camera-facing is allowed only for the explicit in-story address; all others react toward that speaker or the described camera.';
  }
  if (/\[USER STAGING LOCK - ABSOLUTE\]/i.test(actionAndDialogueText)) {
    const stagingSides = buildExplicitStagingSides(actionAndDialogueText, mentionedCastNames);
    const listeners = mentionedCastNames.filter((name) => !speakers.includes(name));
    return `EYE-LINE LOCK: obey USER STAGING LOCK exactly for speakers and listeners; never lens/front unless explicit direct address. ${stagingSides} ${buildRequiredDepthAssignment(speakers, listeners, speakers.length >= 2, explicitRearSubject, functionalActionMode)} Camera preserves the scenario direction.`;
  }
  if (speakers.length < 2 && !stagedSpeakerAndListener) {
    return explicitDetailCamera
      ? 'EXPLICIT DETAIL CAMERA LOCK: preserve the scripted overhead, hand-detail, or close-up framing; do not invent a rear shoulder or force frontal portraits.'
      : '';
  }

  const participants = mentionedCastNames.length > 0 ? mentionedCastNames : speakers;
  const listeners = participants.filter((name) => !speakers.includes(name));
  const roleStaging = speakers.length === 1
    ? (listeners.length > 0
      ? `[${speakers[0]}] addresses ${listeners.map((name) => `[${name}]`).join(', ')}; listeners look back.`
      : `[${speakers[0]}] addresses the described listener group; group looks back.`)
    : `${speakers.map((name) => `[${name}]`).join(' ↔ ')} address their counterparts; reactors watch the active speaker.`;

  if (explicitDetailCamera) {
    return `EYE-LINE LOCK: ${roleStaging} never lens/front. EXPLICIT DETAIL CAMERA LOCK: preserve the scripted overhead, hand-detail, or close-up framing; do not invent a rear shoulder or force frontal portraits. Camera preserves scenario direction.`;
  }

  return `EYE-LINE LOCK: ${roleStaging} never lens/front. ${buildRequiredDepthAssignment(speakers, listeners, speakers.length >= 2, explicitRearSubject, functionalActionMode)} Camera preserves scenario direction.`;
};

export const cleanseActionGagSymbols = (actionText) => {
  if (!actionText) return actionText;
  
  const gagSymbols = {
    'POPPING VEIN': 'a cartoon popping vein symbol (symbolic representation only, do NOT draw the letters "POPPING VEIN" or any text)',
    'POPPING VEINS': 'cartoon popping vein symbols (symbolic representation only, do NOT draw the letters "POPPING VEINS" or any text)',
    'LARGE SWEAT DROP': 'a cartoon sweat drop symbol on the head (symbolic representation only, do NOT draw the letters "LARGE SWEAT DROP" or any text)',
    'LARGE SWEAT DROPS': 'cartoon sweat drop symbols (symbolic representation only, do NOT draw the letters "LARGE SWEAT DROPS" or any text)',
    'SWEAT DROP': 'a cartoon sweat drop symbol (symbolic representation only, do NOT draw the letters "SWEAT DROP" or any text)',
    'SWEAT DROPS': 'cartoon sweat drop symbols (symbolic representation only, do NOT draw the letters "SWEAT DROPS" or any text)',
    'ANGER MARK': 'a cartoon anger mark (symbolic representation only, do NOT draw the letters "ANGER MARK" or any text)',
    'ANGER MARKS': 'cartoon anger marks (symbolic representation order, do NOT draw the letters "ANGER MARKS" or any text)',
    'SHOCK LINES': 'cartoon shock lines (symbolic representation only, do NOT draw the letters "SHOCK LINES" or any text)',
    'SPEED LINES': 'dynamic speed lines (symbolic representation only, do NOT draw the letters "SPEED LINES" or any text)'
  };
  
  let cleansed = actionText;
  for (const [key, replacement] of Object.entries(gagSymbols)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    cleansed = cleansed.replace(regex, replacement);
  }
  return cleansed;
};

const WRITTEN_TEXT_CONTEXT_RE = /(?:\bwritten\b|\bhandwriting\b|air-writing|finger-writing|\bsignage\b|\bsign\b|\blabel\b|board text|screen text|printed text|text on|letters on|\bposter\b|\u6587\u5b57|\u6570\u5b57|\u6570\u5024|\u91d1\u984d|\u624b\u66f8\u304d|\u7a7a\u4e2d\u306b|\u66f8\u304b\u308c|\u66f8\u304f|\u66f8\u304d|\u66f8\u3044\u305f|\u770b\u677f|\u63b2\u793a|\u8cbc\u308a\u7d19|\u30dd\u30b9\u30bf\u30fc|\u9ed2\u677f|\u30db\u30ef\u30a4\u30c8\u30dc\u30fc\u30c9|\u30ce\u30fc\u30c8\u306b|\u7d19\u306b|\u8cc7\u6599|\u9805\u76ee|\u30b9\u30de\u30db\u753b\u9762|\u753b\u9762|\u30b9\u30af\u30ea\u30fc\u30f3|\u30e2\u30cb\u30bf\u30fc|\u30c7\u30a3\u30b9\u30d7\u30ec\u30a4|\u8868\u793a|\u901f\u5831|\u70b9\u6ec5|\u30d5\u30a9\u30f3\u30c8|\u5370\u5b57|\u523b\u5370|\u30e9\u30d9\u30eb|\u6a19\u8b58)/i;
const SOUND_CONTEXT_RE = /(?:sound|sfx|onomatopoeia|audio|hum|buzz|\u97f3|\u64ec\u97f3|\u52b9\u679c\u97f3|BGM|\u9cf4|\u30d6\u30fc\u30f3|\u30ce\u30a4\u30ba)/i;
// [v4.6.3] MOOD_CONTEXT_RE から頻出語（表情・反応・状態・感情）を除外。
// これらはセリフ周辺のト書きに頻繁に出現し、セリフのカギ括弧まで誤って置換してしまう原因となっていた。
const MOOD_CONTEXT_RE = /(?:aura|mood|emotion|focus|silence|atmosphere|\u30aa\u30fc\u30e9|\u96f0\u56f2\u6c17|\u6c17\u914d|\u6c88\u9ed9|\u7a7a\u6c17|\u611f\u3058|\u30e0\u30fc\u30c9|\u96c6\u4e2d|\u6ca1\u5165|\u30d5\u30a9\u30fc\u30ab\u30b9|\u7dca\u5f35|\u4f59\u97fb)/i;
const SPOKEN_TEXT_CONTEXT_RE = /(?:dialogue|speech|says|said|shouts|whispers|\u8a00|\u7b54|\u53eb|\u547c|\u545f|\u3064\u3076\u3084|\u8a71|\u554f|\u7591\u554f|\u7d76\u53eb|\u30bb\u30ea\u30d5)/i;
const ACTION_QUOTED_TEXT_RE = /[\u300c\u300e"\u201c\u201d]([^\u300c\u300d\u300e\u300f"\u201c\u201d]{1,80})[\u300d\u300f"\u201c\u201d]/g;

const protectNonDialogueTextHints = (actionText) => {
  if (!actionText) return actionText;

  const removedSpokenQuoteMarker = '\uE000';
  const removedSoundQuoteMarker = '\uE001';
  const protectedText = actionText.replace(ACTION_QUOTED_TEXT_RE, (match, _content, offset, fullText) => {
    // [v4.6.2] 1〜2文字の引用（「へ」「O」など）は表情・記号として保護
    if (_content.length <= 2) {
      return match;
    }

    // [v4.6.5-fix2] セリフ判定: カギ括弧の直前にキャラ名パターン（片仮名/漢字/ひらがな + 任意の句読点）がある場合、
    // これはセリフである可能性が極めて高い。extractActionOnly が除去し損ねたセリフを
    // ここで破壊すると extractDialogueOnly のフォールバックも失敗し、セリフが完全消失する。
    const immediateLeft = fullText.slice(Math.max(0, offset - 12), offset).trimEnd();
    // 直前が「キャラ名」パターン（CJK文字 + 任意の句読点・空白）で終わっている場合はスキップ
    // [v4.6.5-fix2] 句読点（、。）やカッコ閉じ（）の直後でもCJK文字がその前にあればセリフと判定
    const isLikelyDialogue = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u25A0-\u25FF■][、。！？!?）)」』\s]*$/.test(immediateLeft);
    // [v4.6.5-fix2] 文脈ウィンドウを56→30文字に縮小。
    // 隣接するセリフの語彙（「オーラ」「鳴らし」等）を誤って文脈として拾い、
    // MOOD_CONTEXT_RE / SOUND_CONTEXT_RE が誤マッチする問題を防止。
    const leftContext = fullText.slice(Math.max(0, offset - 30), offset);
    const rightContext = fullText.slice(offset + match.length, Math.min(fullText.length, offset + match.length + 30));
    const context = `${leftContext} ${rightContext}`;

    if (hasAcousticQuotePostContext(rightContext)) {
      return removedSoundQuoteMarker;
    }

    if (hasSpokenQuotePostContext(rightContext)) {
      return removedSpokenQuoteMarker;
    }

    if (WRITTEN_TEXT_CONTEXT_RE.test(context)) {
      return match;
    }

    if (SOUND_CONTEXT_RE.test(context)) {
      return '';
    }

    if (MOOD_CONTEXT_RE.test(context)) {
      return '';
    }

    if (SPOKEN_TEXT_CONTEXT_RE.test(context)) {
      return '';
    }

    if (isLikelyDialogue) {
      return match;
    }

    return '';
  });

  return protectedText
    .replace(/\uE001\s*(?:という|っていう)\s*(?=音|爆音|銃声|足音)/g, '')
    .replace(/\uE001/g, '')
    .replace(/\uE000\s*(?:と|って)?\s*/g, '')
    .replace(/\uE000/g, '');
};

export const extractActionOnly = (fullPanelText, castList, placementRule = "") => {
  const lines = fullPanelText.split('\n');

  const validCharacters = collectCastNames(castList);
  let activeStructuredSection = '';

  const actionLines = lines.filter(line => {
    if (PANEL_HEADER_RE.test(line)) {
      activeStructuredSection = '';
      return false;
    }
    const structuredSection = getStructuredScenarioSection(line);
    if (structuredSection) {
      activeStructuredSection = structuredSection;
      return false;
    }
    if (activeStructuredSection === 'visual' && isInstructionLine(line)) {
      activeStructuredSection = '';
    }
    if (activeStructuredSection === 'visual') {
      return line.trim() !== '';
    }
    const match = line.match(/^(.*?)(?:[:：]|「)/);
    let isDialogue = false;
    const isInstruction = isInstructionLine(line);
    if (match && match[1].trim() && !isInstruction) {
      let tempSpeaker = match[1].replace(/^(SFX|効果音|BGM|Action)/i, '').trim();
      tempSpeaker = tempSpeaker.replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
      // [v4.6.4] キャスト名完全一致バイパス: 助詞を含むキャスト名（例: と■のよ■ゆき子）を正しく認識
      const normalizedSpeakerA = tempSpeaker.replace(/[\s・]/g, '');
      const isExactCastMatch = validCharacters.some(c => {
        const nameOnly = c.split(/[（(]/)[0].trim();
        const normalizedName = nameOnly.replace(/[\s・]/g, '');
        return nameOnly && (tempSpeaker === nameOnly || tempSpeaker === c || normalizedSpeakerA === normalizedName);
      });
      const hasSentenceParticles = !isExactCastMatch && /[がをにでへはもとからまでより]/.test(tempSpeaker) && tempSpeaker.length > 5;
      const isNarrationSubject = isNarrationSubjectSpeakerCandidate(tempSpeaker, validCharacters);
      // [v4.6.3] extractDialogueOnly と閾値を統一（12→20）。不一致だとセリフがAction側に残り、protectNonDialogueTextHintsで破壊される
      const isTooLong = tempSpeaker.length > 20;
      // [v4.6.3] 照明・SE・演出など舞台指示用語をメタタグとして除外
      // [v4.6.10] 「セリフ」「台詞」「Dialogue」をメタタグに追加
      const isMetaTag = META_SPEAKER_LABEL_RE.test(tempSpeaker);
      // [v2.45] 効果音パターン検出
      const isSoundEffect = /^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(tempSpeaker.replace(/[（(].*$/, '').trim());
      const hasReactionTag = /[（(]\s*リアクション/i.test(match[1]);
      
      const isUnregisteredCharacterCategory = isUnregisteredCharacterCategorySpeaker(tempSpeaker, validCharacters);

      if (hasSentenceParticles || isNarrationSubject || isTooLong || isMetaTag || isSoundEffect || hasReactionTag || isUnregisteredCharacterCategory) {
        // Not a dialogue speaker (meta tag, sound effect, or reaction directive)
      } else if (isLikelyPerson(tempSpeaker, validCharacters) || isGenericShortSpeakerPrefix(tempSpeaker) || tempSpeaker === "全員" || tempSpeaker === "Speaker" || match[0].trim().endsWith(':') || match[0].trim().endsWith('：')) {
        isDialogue = true;
      }
    } else if (!isInstruction && line.trim().startsWith('「')) {
      const trimmedLine = line.trim();
      const isFullQuoteLine = /^「[^」]+」[？！。、!?\s]*$/.test(trimmedLine);
      if (isFullQuoteLine) {
        // [v4.2.0] ト書き（動作指示）や極端に短い名詞の誤検出防止
        const quoteContent = trimmedLine.match(/^「([^」]+)」/)?.[1] || '';
        const isStageDirection = /(?:ポーズ|表情|リアクション|アクション|身振り|手振り|仕草|動作|姿勢|佇まい|構え|目線|視線|沈黙|間|無言|独白|ジェスチャー|モーション|立ち姿|座り|しぐさ|ため息|溜息|息|うなずき|頷き|首振り|指差し|腕組み|ガッツポーズ|ドヤ顔|苦笑い|苦笑|微笑|爆笑|号泣|絶叫|フリーズ|硬直|脱力|崩れ落ち|土下座|敬礼|拍手|握手|ハイタッチ|決めポーズ|威圧|威嚇|震え|よろめき|のけぞり|ずっこけ|ツッコミ|突っ込み)/.test(quoteContent);
        const isTooShortForDialogue = quoteContent.length <= 4 && !/[がをにでへはもとからよねわ！？!?…。、]/.test(quoteContent);
        if (!isStageDirection && !isTooShortForDialogue) {
          isDialogue = true;
        }
      }
    }

    // [v4.6.3] コロン形式ト書き判定: extractDialogueOnly と同期
    if (isDialogue && match && (match[0].trim().endsWith(':') || match[0].trim().endsWith('：'))) {
      const restOfLine = line.substring(match.index + match[0].length);
      const hasNoQuotes = !/[「」]/.test(restOfLine);
      if (hasNoQuotes && restOfLine.trim().length > 15) {
        isDialogue = false;
      }
    }

    const isHeader = line.match(/^\[\d+コマ目/);
    const isEmpty = line.trim() === '';
    return !isDialogue && !isHeader && !isEmpty;
  });

  const visualDirectionQuotes = [];
  let actionStr = actionLines.map((line) => {
    if (!STAGING_GAG_LINE_RE.test(line) && !ACOUSTIC_VISUAL_LINE_RE.test(line)) return line;
    const protectedLine = line.replace(ACTION_QUOTED_TEXT_RE, (match) => {
      const token = `\uE100${visualDirectionQuotes.length}\uE101`;
      visualDirectionQuotes.push(match);
      return token;
    });
    return stripMatchingStructuralWrapper(protectedLine);
  }).join(' ').trim();
  
  // [v2.30] Sanitize action string to remove common trailing onomatopoeia/gag SFX that causes unwanted speech bubbles
  actionStr = actionStr.replace(/[ 　]*(ズコー|ガーン|チーン|ドッ|バシッ|ドカーン|バーン)[。、！？!?\s]*$/g, '');
  
  // [v3.39] ト書き・リアクション指示のカッコを外し、テキストとしての描画を防ぐ
  actionStr = actionStr.replace(/[（(](?:Camera|Location|Outfit|EMOTION|状況(?:演出)?|Action|リアクション|Reaction|設定|背景|Background|カメラワーク|CameraWork|Camera\s*Work)[:：]?\s*(.*?)[)）]/gi, '$1');

  // [FIX] 角括弧で囲まれた制御タグ（[EMOTION: ...]・[Camera: ...] 等）が
  //   「visual only」のはずのアクション文に漏れ込むのを除去する。
  //   これらは画像モデルにとって制御トークン/ノイズであり、(1) ラベル文字をそのまま
  //   描画する、(2) パネルの Camera 欄と二重・競合してカメラ指定がブレる、
  //   (3) 不明な感情タグ（例: OVERDRIVE_SUSPENSE）が意図しない画風へ誘導する、
  //   といったシナリオ↔画像の不整合の原因になっていた。
  //   ※ EMOTION はパネルの PANEL STYLE LOCK 欄、Camera は Camera 欄で既に正規化済み。
  actionStr = actionStr.replace(/\[\s*(?:EMOTION|Camera|Location|Outfit|Action|Reaction|Background|カメラワーク|CameraWork|Camera\s*Work|Punchline)\s*[:：][^\]]*\]/gi, ' ');
  // [FIX] 「状況:」「Situation:」等のラベル語だけを除去し、後続の視覚描写本文は残す。
  actionStr = actionStr.replace(ACTION_VISUAL_LABEL_RE, ' ');
  // 上記除去で生じた連続スペースを圧縮
  actionStr = actionStr.replace(/[ 　]{2,}/g, ' ').trim();

  actionStr = actionStr || "Characters interacting dynamically based on dialogue.";

  // [v2.02] Duplication Removal: If character is already forced in placement, gently remove them from the explicit action subject if possible to prevent cloning hallucination
  if (placementRule) {
    validCharacters.forEach(c => {
      // Extract just the name part before any parenthesis if it exists (e.g. "アカリ (Akari)" -> "アカリ")
      const nameOnly = c.split('(')[0].trim();
      if (placementRule.includes(nameOnly)) {
        // Optional: We can replace exact matches of the name with pronouns or just strip it if it causes too much duplication, 
        // but a safer route for the prompt is to just let the action be, BUT we modify the overall layout rules instead below.
        // For now, we just pass the actionStr, but AI cloning is mostly solved by the rule additions we make to the main prompt.
      }
    });
  }

  return protectNonDialogueTextHints(cleanseActionGagSymbols(actionStr))
    .replace(/\uE100(\d+)\uE101/g, (_match, index) => visualDirectionQuotes[Number(index)] || '')
    .replace(/で\s*と(?=呟|つぶや|言|叫|話|問|答)/g, 'で')
    .replace(/([。！？!?])\s*と(?:呟|つぶや|言|叫|話|問|答)[^、。！？!?]*[、。]?/g, '$1')
    .replace(/[ 　]{2,}/g, ' ')
    .trim();
};

export const injectOutfitReminder = (actionText, activeOutfit) => {
  if (!activeOutfit) return actionText;
  return `(All characters are wearing ${activeOutfit}) ${actionText}`;
};

export const extractPlacementRule = (fullPanelText, castList, options = {}) => {
  const compact = Boolean(options.compact);
  const lines = fullPanelText.split('\n');
  // [v2.28] EMOTIONタグ行・状況行をフィルタリングしてスピーカー抽出の汚染を防止
  const dialogLines = lines.filter(line => {
    const trimmed = line.trim();
    if (PANEL_HEADER_RE.test(trimmed)) return false;
    if (getStructuredScenarioSection(trimmed)) return false;
    if (/^\[EMOTION:/i.test(trimmed)) return false;
    if (/^状況(?:演出)?[：:]/i.test(trimmed)) return false;
    if (isInstructionLine(trimmed)) return false;
    return trimmed.includes('：') || trimmed.includes(':') || trimmed.includes('「');
  });

  // キャラ名バリデーション用リストと名寄せマップ
  const validCharsForPlacement = collectCastNames(castList);
  const charLookup = buildCastLookup(castList);

  const speakers = [];
  dialogLines.forEach(line => {
    const match = line.match(/^(.*?)(?:[:：]|「)/);
    if (match && match[1].trim()) {
      let speaker = match[1].replace(/^(SFX|効果音|BGM|Action|状況(?:演出)?|EMOTION|[\(（].*?[\)）]|\[.*?\])/gi, '').replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
      // [v4.6.4] キャスト名完全一致バイパス: 助詞を含むキャスト名（例: と■のよ■ゆき子）を正しく認識
      const normalizedSpeakerP = speaker.replace(/[\s・]/g, '');
      const isExactCastMatchP = validCharsForPlacement.some(c => {
        const normalizedName = c.replace(/[\s・]/g, '');
        return c === speaker || normalizedSpeakerP === normalizedName;
      });
      const hasSentenceParticles = !isExactCastMatchP && /[がをにでへはもとからまでより]/.test(speaker) && speaker.length > 5;
      const isNarrationSubjectP = isNarrationSubjectSpeakerCandidate(speaker, validCharsForPlacement);
      const isTooLong = speaker.length > 12;
      // [v4.6.3] 照明・SE・演出など舞台指示用語をメタタグとして除外
      // [v4.6.10] 「セリフ」「台詞」「Dialogue」をメタタグに追加
      const isMetaTag = META_SPEAKER_LABEL_RE.test(speaker);
      const isSoundEffect = /^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(speaker.replace(/[（(].*$/, '').trim());
      const hasReactionTag = /[（(]\s*リアクション/i.test(match[1]);
      const isDummySpeaker = /^(全員|みんな|Speaker)$/i.test(speaker);
      if (hasSentenceParticles || isNarrationSubjectP || isTooLong || isMetaTag || isSoundEffect || hasReactionTag || isDummySpeaker) return;
      // [v4.6.3] コロン形式ト書き判定: extractDialogueOnly と同期
      if (match[0].trim().endsWith(':') || match[0].trim().endsWith('：')) {
        const restOfLine = line.substring(match.index + match[0].length);
        if (!/[「」]/.test(restOfLine) && restOfLine.trim().length > 15) return;
      }
      if (speaker && !/^(EMOTION|NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION|SUMI_INK|MONOCHROME_ACCENT|GOLDEN_HOUR)$/i.test(speaker)) {
        // キャラ名判定と名寄せ
        const matchedChar = findSpeakerCastMatch(speaker, validCharsForPlacement);
        if (matchedChar || isLikelyPerson(speaker, validCharsForPlacement) || match[0].trim().endsWith(':') || match[0].trim().endsWith('：')) {
          const canonicalName = matchedChar ? charLookup[matchedChar] : speaker;
          if (!speakers.includes(canonicalName)) {
            speakers.push(canonicalName);
          }
        }
      }
    }
  });

  if (speakers.length >= 3) {
    // [v2.33] 3-Zone Slotting: 3人以上の掛け合いパネル対応
    const traits0 = getCharTraitsFromMatrix(speakers[0], castList);
    const traits1 = getCharTraitsFromMatrix(speakers[1], castList);
    const traits2 = getCharTraitsFromMatrix(speakers[2], castList);
    if (compact) {
      return `PLACEMENT/IDENTITY: RIGHT [${speakers[0]}] (${compactIdentityTraits(traits0)}), CENTER [${speakers[1]}] (${compactIdentityTraits(traits1)}), LEFT [${speakers[2]}] (${compactIdentityTraits(traits2)}). Keep slots exact; do NOT mirror/swap. Bubbles beside actual speakers with tails, right-to-left.`;
    }
    return `CRITICAL PLACEMENT & IDENTITY (3-ZONE SLOTTING):
- RIGHT ZONE: [${speakers[0]}] (${traits0 || 'see reference'}) — First speaker
- CENTER ZONE: [${speakers[1]}] (${traits1 || 'see reference'}) — Second speaker
- LEFT ZONE: [${speakers[2]}] (${traits2 || 'see reference'}) — Third speaker / Reactor
VERIFY: Confirm hair color + glasses status for ALL three characters match the Identity Matrix.
CHARACTER BODY POSITION LOCK (3-ZONE - DO NOT MIRROR):
- [${speakers[0]}] MUST be on the RIGHT third of the panel.
- [${speakers[1]}] MUST be in the CENTER of the panel.
- [${speakers[2]}] MUST be on the LEFT third of the panel.
- Maintain breathing room between zones to prevent overcrowding and attribute fusion.
SPEECH BUBBLE FLOW (RIGHT-TO-LEFT):
- Each character's speech bubble MUST be placed directly above THAT character's head, matching their actual position in the panel.
- If [${speakers[1]}] is in the CENTER, their bubble MUST also be centered — do NOT push it to an edge.
- Each bubble's tail MUST point to its speaker. Flow: Right → Center → Left.`;
  } else if (speakers.length >= 2) {
    const traits0 = getCharTraitsFromMatrix(speakers[0], castList);
    const traits1 = getCharTraitsFromMatrix(speakers[1], castList);
    if (compact) {
      return `PLACEMENT/IDENTITY: RIGHT [${speakers[0]}] (${compactIdentityTraits(traits0)}), LEFT [${speakers[1]}] (${compactIdentityTraits(traits1)}). Keep slots exact; do NOT mirror/swap. Bubbles beside actual speakers with tails.`;
    }
    // [v2.27] 人物+吹き出し位置固定ルール（左右入れ替わり全パターン対策）
    // 髪色等の視覚的特徴で位置をアンカリングし、AIの左右鏡像化を防ぐ
    return `CRITICAL PLACEMENT & IDENTITY:
- RIGHT side: [${speakers[0]}] (${traits0 || 'see reference'})
- LEFT side: [${speakers[1]}] (${traits1 || 'see reference'})
VERIFY: Confirm hair color + glasses status for both characters match the Identity Matrix before finalizing.
CHARACTER BODY POSITION LOCK (CRITICAL - DO NOT MIRROR):
- The character with ${traits0 || speakers[0] + "'s features"} MUST be physically standing/sitting on the RIGHT half of the panel.
- The character with ${traits1 || speakers[1] + "'s features"} MUST be physically standing/sitting on the LEFT half of the panel.
- Do NOT swap, mirror, or reverse their positions under any circumstances.
SPEECH BUBBLE POSITION RULE:
- Each character's speech bubble MUST be placed directly above or beside THAT character's head, matching the character's actual position in the panel.
- If a character is positioned in the center of the panel, their bubble MUST also be centered — do NOT push it to the left or right edge.
- Each bubble's tail MUST point down to its speaker. Do NOT swap bubble positions.`;
  } else if (speakers.length === 1) {
    const traits0 = getCharTraitsFromMatrix(speakers[0], castList);
    return `CRITICAL PLACEMENT & IDENTITY: [${speakers[0]}] (${traits0 || 'see reference'}) is the main focus of this panel.`;
  }
  return `CRITICAL PLACEMENT: Follow the natural dialogue flow.`;
};

export const extractCastLimitRule = (fullPanelText, castList, options = {}) => {
  const compact = Boolean(options.compact);
  const lines = fullPanelText.split('\n');

  // Find valid cast names and create a lookup for full character objects
  // 日本語名とローマ字名両方に対応できるようにする
  const validCharacters = collectCastNames(castList);
  const flatCharLookup = buildCastLookup(castList);
  const charLookup = Object.fromEntries(
    Object.entries(flatCharLookup).map(([alias, name]) => [alias, { name, full: name }])
  );

  // Extract speakers from dialogue lines
  const speakers = [];
  lines.forEach(line => {
    if (PANEL_HEADER_RE.test(line)) return;
    const match = line.match(/^(.*?)(?:[:：]|「)/);
    if (match && match[1].trim()) {
      let speaker = match[1].replace(/^(SFX|効果音|BGM|Action|状況(?:演出)?|[\(（].*?[\)）])/gi, '').replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
      if (speaker) {
        if (isNarrationSubjectSpeakerCandidate(speaker, validCharacters)) return;
        if (speaker === "全員" || speaker === "Speaker") return;
        const matchedChar = findSpeakerCastMatch(speaker, validCharacters);
        if (matchedChar) {
          const canonicalName = charLookup[matchedChar].name;
          if (!speakers.includes(canonicalName)) {
            speakers.push(canonicalName);
          }
        } else if (isLikelyPerson(speaker, validCharacters)) {
          if (!speakers.includes(speaker)) {
            speakers.push(speaker);
          }
        }
      }
    }
  });

  // [v3.95] セリフ行以外のテキストを抽出して登場人物を検出する (セリフ内言及によるキャラ誤認バグの完全排除)
  const actionAndMetaLines = [];
  lines.forEach(line => {
    if (PANEL_HEADER_RE.test(line)) return;
    const match = line.match(/^(.*?)(?:[:：]|「)/);
    let isDialogue = false;
    if (match && match[1].trim()) {
      let tempSpeaker = match[1].replace(/^(SFX|効果音|BGM|Action)/i, '').trim();
      tempSpeaker = tempSpeaker.replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
      // [v4.6.4] キャスト名完全一致バイパス: 助詞を含むキャスト名（例: と■のよ■ゆき子）を正しく認識
      const normalizedSpeakerC = tempSpeaker.replace(/[\s・]/g, '');
      const isExactCastMatchC = validCharacters.some(c => {
        const nameOnly = c.split(/[（(]/)[0].trim();
        const normalizedName = nameOnly.replace(/[\s・]/g, '');
        return nameOnly && (tempSpeaker === nameOnly || tempSpeaker === c || normalizedSpeakerC === normalizedName);
      });
      const hasSentenceParticles = !isExactCastMatchC && /[がをにでへはもとからまでより]/.test(tempSpeaker) && tempSpeaker.length > 5;
      const isNarrationSubjectC = isNarrationSubjectSpeakerCandidate(tempSpeaker, validCharacters);
      const isTooLong = tempSpeaker.length > 12;
      // [v4.6.10] 「セリフ」「台詞」「Dialogue」をメタタグに追加
      const isMetaTag = META_SPEAKER_LABEL_RE.test(tempSpeaker);
      const isSoundEffect = /^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(tempSpeaker.replace(/[（(].*$/, '').trim());
      const hasReactionTag = /[（(]\s*リアクション/i.test(match[1]);
      
      if (hasSentenceParticles || isNarrationSubjectC || isTooLong || isMetaTag || isSoundEffect || hasReactionTag) {
        // メタタグ等
      } else if (isLikelyPerson(tempSpeaker, validCharacters) || tempSpeaker === "全員" || tempSpeaker === "Speaker" || match[0].trim().endsWith(':') || match[0].trim().endsWith('：')) {
        isDialogue = true;
      }
    } else if (line.trim().startsWith('%NOTHING%')) { // dummy check to avoid duplicate tag
      // noop
    } else if (line.trim().startsWith('「')) {
      const trimmedLine = line.trim();
      const isFullQuoteLine = /^「[^」]+」[？！。、!?\s]*$/.test(trimmedLine);
      if (isFullQuoteLine) {
        // [v4.2.0] ト書き（動作指示）や極端に短い名詞の誤検出防止
        const quoteContent = trimmedLine.match(/^「([^」]+)」/)?.[1] || '';
        const isStageDirection = /(?:ポーズ|表情|リアクション|アクション|身振り|手振り|仕草|動作|姿勢|佇まい|構え|目線|視線|沈黙|間|無言|独白|ジェスチャー|モーション|立ち姿|座り|しぐさ|ため息|溜息|息|うなずき|頷き|首振り|指差し|腕組み|ガッツポーズ|ドヤ顔|苦笑い|苦笑|微笑|爆笑|号泣|絶叫|フリーズ|硬直|脱力|崩れ落ち|土下座|敬礼|拍手|握手|ハイタッチ|決めポーズ|威圧|威嚇|震え|よろめき|のけぞり|ずっこけ|ツッコミ|突っ込み)/.test(quoteContent);
        const isTooShortForDialogue = quoteContent.length <= 4 && !/[がをにでへはもとからよねわ！？!?…。、]/.test(quoteContent);
        if (!isStageDirection && !isTooShortForDialogue) {
          isDialogue = true;
        }
      }
    }
    if (!isDialogue) {
      actionAndMetaLines.push(line);
    }
  });
  const actionAndMetaText = actionAndMetaLines.join('\n');
  const hasBroadGroupCue = /(?:全員|みんな|一同|全キャラ|全メンバー|主要人物全員|メンバー全員|全員集合|everyone|all characters|the whole group)/i.test(actionAndMetaText);

  // Visual Action テキストからも登場キャラ名を検出
  const allPanelCharacters = [...speakers];
  const canonicalValidCharacters = [...new Set(Object.values(charLookup).map(obj => obj.name))];
  const explicitRearSubject = extractExplicitRearSubject(fullPanelText, canonicalValidCharacters);
  const hasAllMainCastCue = /(?:他キャラ全員|キャラ全員|全キャラ|全メンバー|全員集合|メンバー全員|主要人物全員|all characters|the whole main cast)/i.test(actionAndMetaText);
  if (hasAllMainCastCue) {
    canonicalValidCharacters.forEach((canonicalName) => {
      if (!allPanelCharacters.includes(canonicalName)) {
        allPanelCharacters.push(canonicalName);
      }
    });
  }
  validCharacters.forEach(charName => {
    const canonicalName = charLookup[charName].name;
    if (!allPanelCharacters.includes(canonicalName) && actionAndMetaText.includes(charName)) {
      allPanelCharacters.push(canonicalName);
    }
  });
  if (explicitRearSubject && !allPanelCharacters.includes(explicitRearSubject)) {
    allPanelCharacters.push(explicitRearSubject);
  }

  // 吹き出し数カウント: セリフ行（「」付き）の数を数えてソロショット判定の矛盾を防ぐ
  let dialogueLineCount = 0;
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.includes('「') && trimmed.includes('」')) {
      dialogueLineCount++;
    } else if (/^[^（(【\[]*?[:：]\s*「/.test(trimmed)) {
      dialogueLineCount++;
    }
  });

  // スピーカー最大3名をメインアクターとして登録
  const panelActors = speakers.slice(0, 3).map(s => `[${s}]`);
  const explicitRearActor = explicitRearSubject ? `[${explicitRearSubject}]` : '';
  const foregroundActors = [...new Set([
    ...panelActors,
    ...(explicitRearActor ? [explicitRearActor] : [])
  ])];

  // [v2.69] 背景キャスト統合ロジックを完全廃止 (No-Show 除外指示への置換)
  // このコマに一切登場しないキャラ（No-Show）を特定
  const noShowCharacters = canonicalValidCharacters.filter(c => !allPanelCharacters.includes(c));

  const allCharBrackets = allPanelCharacters.map(c => `[${c}]`);

  if (foregroundActors.length > 0) {
    const mainFocus = panelActors.length > 0 ? panelActors.join(' and ') : foregroundActors.join(' and ');
    let cloneWarning = compact
      ? `CAST COUNT: ${allCharBrackets.join(', ')} each EXACTLY ONCE; no named-character duplicates.`
      : `ANTI-CLONE REMINDER: ${allCharBrackets.join(', ')} — each appears EXACTLY ONCE. If a character is mentioned in both the placement rule AND the visual action, they are the SAME person — do NOT draw a second copy.`;
    
    if (allPanelCharacters.length === 1 && dialogueLineCount <= 1) {
      cloneWarning += compact
        ? `\nSOLO: only ${allCharBrackets[0]}; no other people or second copy.`
        : `\nSOLO SHOT (SINGLE CHARACTER SCENE): Since only ${allCharBrackets[0]} is listed, THIS IS A SOLO SHOT. Do NOT draw ANY other person. Do NOT draw a second copy of ${allCharBrackets[0]}. Leave the surrounding space empty rather than adding people.`;
    } else if (allPanelCharacters.length === 1 && dialogueLineCount >= 2) {
      cloneWarning += compact
        ? `\nMONOLOGUE: all bubbles belong to ${allCharBrackets[0]}; no extra person.`
        : `\nNOTE: Multiple speech bubbles in this panel are ALL spoken by ${allCharBrackets[0]} (monologue/soliloquy). Draw only ${allCharBrackets[0]} — do NOT add a second character just because there are multiple bubbles.`;
    }
    
    // クローン防止: 空間（前景・後景）で縛る
    const foreground = foregroundActors.join(' and ');
    const bgActors = allCharBrackets.filter(b => !foregroundActors.includes(b));
    const background = bgActors.length > 0 ? bgActors.join(', ') : 'NO ONE ELSE';
    const otsInstanceConstraint = explicitRearActor
      ? (compact
        ? `\nOTS CAST INSTANCE LOCK: ${explicitRearActor}'s rear head/shoulder foreground is that character's sole instance; never draw ${explicitRearActor} again or in BG.`
        : `\nOTS CAST INSTANCE LOCK: The rear head/shoulder foreground depiction of ${explicitRearActor} is that character's one and only instance. Do not repeat ${explicitRearActor} elsewhere in the panel or background.`)
      : '';
    
    // 登場しないキャラへの強力な除外指示（Negative Constraints）を生成
    let negativeConstraint = "";
    if (noShowCharacters.length > 0) {
      const noShowNames = noShowCharacters.map(c => `[${c}]`).join(', ');
      negativeConstraint = compact
        ? `\nABSENT: do NOT draw ${noShowNames}.`
        : `\nDo NOT draw ${noShowNames} in this panel. They are completely absent from this scene.`;
    }

    // [v4.2.1] モブキャラ検出ロジック：本文にモブが含まれる場合はABS制限を緩和する
    const hasMob = /(モブ|スタッフ|観客|群衆|兵士|客|人々|クラスメイト|生徒たち|全員|みんな|ファンたち|ファン|通行人)/.test(fullPanelText);

    let spatialConstraint;
    if (hasMob) {
      spatialConstraint = compact
        ? `\nFG only: ${foreground}. BG only: ${background} plus required adult mobs.${negativeConstraint}${otsInstanceConstraint}\nNo repeated FG characters in BG.`
        : `\nFOREGROUND MUST CONTAIN ONLY: ${foreground}.\nBACKGROUND MUST CONTAIN ONLY: ${background} and background characters (mob).\n${negativeConstraint}${otsInstanceConstraint}\nAllow additional background characters (mobs) as required by the action. Do not draw any main character in the background if they are already in the foreground.`;
    } else {
      spatialConstraint = compact
        ? `\nFG only: ${foreground}. BG only: ${background}.${negativeConstraint}${otsInstanceConstraint}\nNO OTHER HUMANS: exactly ${allPanelCharacters.length} people.`
        : `\nFOREGROUND MUST CONTAIN ONLY: ${foreground}.\nBACKGROUND MUST CONTAIN ONLY: ${background}.${negativeConstraint}${otsInstanceConstraint}\nABSOLUTELY NO OTHER HUMANS ALLOWED. Do not draw any character in the background if they are already in the foreground. Total EXACTLY ${allPanelCharacters.length} distinct individuals.`;
    }

    return compact
      ? `CAST LIMIT: main focus ${mainFocus}.\n${cloneWarning}${spatialConstraint}`
      : `CRITICAL CAST PLACEMENT: Ensure ${mainFocus} are the main focus.\n${cloneWarning}${spatialConstraint}`;
  } else {
    // 登場キャラクターが検出されなかった場合でも、キャスト全体から除外指示を出すことは可能
    if (hasBroadGroupCue) {
      return compact
        ? `CRITICAL CAST PLACEMENT: broad group cue is required by the action; draw the relevant visible group, one generic adult for any non-cast speaker, and never duplicate the same character.`
        : `CRITICAL CAST PLACEMENT: The action uses a broad group cue such as "all characters", "everyone", "全員", "みんな", or "一同". Treat that group as explicitly required by the panel action. Draw the relevant visible group described by the action, and if a speech bubble names a speaker outside the reference cast, draw exactly one generic adult speaker for that bubble. Do NOT exclude registered main characters solely because they are not dialogue speakers in this panel. NEVER draw the exact same character twice.`;
    }

    let negativeConstraint = "";
    if (canonicalValidCharacters.length > 0) {
      const allNames = canonicalValidCharacters.map(c => `[${c}]`).join(', ');
      negativeConstraint = compact
        ? `\nABSENT unless explicitly required: ${allNames}.`
        : `\nDo NOT draw ${allNames} unless explicitly required.`;
    }
    return compact
      ? `CRITICAL CAST PLACEMENT: follow the action naturally; never duplicate a character.${negativeConstraint}`
      : `CRITICAL CAST PLACEMENT: Follow the panel's action naturally. NEVER draw the exact same character twice.${negativeConstraint}`;
  }
};

// --- Emotion Style Functions (Phase 3-C: App.jsx assemblePrompt -> externalized) ---

const EMOTION_STYLE_ALIAS_RULES = [
  ['HORROR', /\b(PANIC|GROTESQUE|FEAR|TERROR|CREEPY|SPOOKY|GHOST|HAUNT|DREAD)\b/],
  ['BLANK', /\b(FROZEN|FREEZE|EMPTY|VOID|NUMB|STUNNED|STIFF|WHITEOUT|SOULLESS)\b/],
  ['IMPACT', /\b(SHOCK|ABSURD|EXPLOSIVE|EXPLOSION|CRASH|IMPACT|ULTRA|EXTREME|OVERDRIVE|HYPER\s+GAG)\b/],
  ['GLITTER', /\b(HYPER|ANTICIPATION|EXCITED|EXCITEMENT|JOY|TRIUMPH|CONFIDENT|CONFIDENCE|SPARKLE|SPARKLING)\b/],
];

const normalizeEmotionTagToKnownStyle = (rawTag = '') => {
  const raw = String(rawTag || '').toUpperCase();
  const knownKeys = Object.keys(EMOTION_STYLES).sort((a, b) => b.length - a.length);

  const directKey = knownKeys.find((key) => {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^A-Z_])${escaped}($|[^A-Z_])`).test(raw);
  });
  if (directKey) return directKey === 'HORROR' ? 'GEKIGA' : directKey;

  const normalized = ` ${raw.replace(/[^A-Z]+/g, ' ')} `;
  const alias = EMOTION_STYLE_ALIAS_RULES.find(([, pattern]) => pattern.test(normalized));
  return alias ? (alias[0] === 'HORROR' ? 'GEKIGA' : alias[0]) : 'NORMAL';
};

// [v2.25] パネルテキストからEMOTIONタグを抽出
// [v4.8.3] 自由記述風タグも既存の強い画風タグへ正規化する
export const extractEmotionStyle = (panelText) => {
  const match = panelText.match(/\[EMOTION:\s*([^\]]+)\]/i);
  return match ? normalizeEmotionTagToKnownStyle(match[1]) : 'NORMAL';
};

// [GAG-OVERLAY] 元の感情タグから「ギャグ／コメディ意図」を検出する。
//   normalizeEmotionTagToKnownStyle と同様に非英字をスペース化してから語境界判定し、
//   日本語のコメディ語は原文に対して直接判定する。
const COMEDY_INTENT_EN_RE = /\s(?:GAG|COMIC|COMEDY|COMEDIC|FUNNY|HUMOR|HUMOUR|SILLY|GOOFY|WACKY|SLAPSTICK)\s/;
const COMEDY_INTENT_JA_RE = /ギャグ|コメディ|コミカル|お笑い|笑い|ボケ|ツッコミ|ずっこけ|ズッコケ/;
const rawTagHasComedyIntent = (rawTag = '') => {
  const raw = String(rawTag || '');
  const normalized = ` ${raw.toUpperCase().replace(/[^A-Z]+/g, ' ')} `;
  return COMEDY_INTENT_EN_RE.test(normalized) || COMEDY_INTENT_JA_RE.test(raw);
};

// [GAG-OVERLAY] シリアス系の暗い画風に写像されたが、元タグがコメディ意図を持つ場合に
//   「画風は維持しつつコミカルな崩しを許可」する加点オーバーレイを当てる対象スタイル。
//   画風そのものは差し替えない（表現の幅を削らない＝ホラーコメディ等を成立させる）。
const SERIOUS_STYLES_FOR_GAG_OVERLAY = new Set(['HORROR', 'GEKIGA', 'SHADOW', 'DARK_ANIME']);
const GAG_INTENT_OVERLAY = `\nGAG INTENT OVERLAY: the source emotion is comedic at its core (a gag), so KEEP this panel's dark/dramatic rendering exactly as specified — lighting, heavy shadows, palette, and composition stay — but let the humor read THROUGH it. Allow exaggerated cartoon reactions, over-the-top expressions, and comedic timing inside this serious art style (horror-comedy / dramatic-comedy). Do NOT play it straight-serious, and do NOT flatten the dramatic styling into a plain chibi gag.`;

const extractRawEmotionTag = (panelText) => {
  const match = String(panelText || '').match(/\[EMOTION:\s*([^\]]+)\]/i);
  return match ? match[1].trim() : '';
};

// [v2.31] パネルの感情スタイル指示を構築（マルチキャラ対応）
export const buildEmotionBlock = (panelText) => {
  const emo = extractEmotionStyle(panelText);
  if (emo === 'NORMAL') return '';
  const s = EMOTION_STYLES[emo];
  const styleLock = `PANEL STYLE LOCK: ${emo}; visibly distinct linework, environmental palette, shading, background/VFX. Change at least three visual axes; pose, expression, saturation, glow, or speed lines alone are insufficient. Environmental palette means background, lighting treatment, and VFX only; preserve every character's canonical garment base and accent colors.`;

  // [GAG-OVERLAY] 元タグがコメディ意図を持ち、かつシリアス系の暗い画風に写像された場合のみ、
  //   画風は維持したまま「コミカルな崩し許可」を加点する（例: [EMOTION: PANIC_GAG] → HORROR）。
  const rawTag = extractRawEmotionTag(panelText);
  const gagOverlay = (SERIOUS_STYLES_FOR_GAG_OVERLAY.has(emo) && rawTagHasComedyIntent(rawTag))
    ? GAG_INTENT_OVERLAY
    : '';

  // [v2.31] IMPACT等のソロ演出スタイルがマルチキャラパネルで使われた場合、
  // 「顔アップで60-80%」指示がANTI-FLOATING-EYE RULEと矛盾するのを防ぐ
  // [v3.83] 五感ラベル・メタタグがスピーカーとして誤カウントされるのを防止
  // [v4.6.10] 「セリフ」「台詞」「Dialogue」をメタタグに追加
  const speakersInPanel = [];
  panelText.split('\n').forEach(line => {
    // EMOTIONタグ行を除外
    if (/^\[EMOTION:/i.test(line.trim())) return;
    const m = line.match(/^(.*?)(?:[:：]|「)/);
    if (m && m[1].trim()) {
      const sp = m[1].replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
      if (sp && !speakersInPanel.includes(sp) && !META_SPEAKER_LABEL_RE.test(sp)) speakersInPanel.push(sp);
    }
  });
  const isMultiChar = speakersInPanel.length >= 2;

  // マルチキャラ用フォールバックが定義されている場合はそちらを使用
  if (isMultiChar && s.styleMulti) {
    let block = `\n${styleLock}\nStyle: ${s.styleMulti}`;
    if (s.proportionsMulti) block += `\nPROPORTION OVERRIDE: ${s.proportionsMulti}`;
    if (s.vfxMulti) block += `\nVFX: ${s.vfxMulti}`;
    if (s.surfaceException) block += `\nSTYLE EXCEPTION: ${s.surfaceException}. Keep faces/skin clean; do not add unrelated noise.`;
    return block + gagOverlay;
  }

  let block = `\n${styleLock}\nStyle: ${s.style}`;
  if (s.proportions) block += `\nPROPORTION OVERRIDE: ${s.proportions}`;
  if (s.vfx) block += `\nVFX: ${s.vfx}`;
  if (s.surfaceException) block += `\nSTYLE EXCEPTION: ${s.surfaceException}. Keep faces/skin clean; do not add unrelated noise.`;
  return block + gagOverlay;
};

// --- Clean Cast List (Phase 3-C: castList parsing -> externalized) ---
// [v2.30] キャストリストからWEIGHTSタグを抽出してクリーンなデータに整形
export const cleanCastList = (castList, activeOutfit) => {
  let cleanCastData = "";
  let currentCharacter = "";
  let isParsingOutfit = false;
  const castLines = castList.split('\n');
  for (let i = 0; i < castLines.length; i++) {
    const line = castLines[i].replace(/\*\*/g, '').trim();
    const headingMatch = line.match(CAST_HEADING_RE);
    if (headingMatch) {
      currentCharacter = normalizeCastDisplayName(headingMatch[1]);
      if (!isValidCastHeadingName(currentCharacter)) {
        currentCharacter = "";
        isParsingOutfit = false;
        continue;
      }
      cleanCastData += `\n- Character [${currentCharacter}]: `;
      isParsingOutfit = false;
    }
    if (!headingMatch && /^#{2,}/.test(line)) {
      currentCharacter = "";
      isParsingOutfit = false;
      continue;
    }
    if (!currentCharacter) continue;
    
    const isCategoryHeader = line.includes('**基本') || line.includes('**髪') || line.includes('**顔') || line.includes('**服装') || line.includes('**性格');
    if (isCategoryHeader) {
      isParsingOutfit = line.includes('服装') || line.includes('Outfit');
    }

    if (activeOutfit && (isParsingOutfit || line.includes('服装') || line.includes('Outfit'))) continue;
    
    const weightsMatch = line.match(/\[WEIGHTS?\]:\s*(.*)/i);
    if (weightsMatch) {
      let tags = weightsMatch[1].replace(/\|/g, '').trim();
      if (tags && tags !== "()" && tags !== "-") {
        cleanCastData += tags + ", ";
      }
      continue;
    }
    const weightedTags = line.match(/\([a-zA-Z\s_-]+:\d+\.?\d*\)/g);
    if (weightedTags && weightedTags.length >= 2) {
      cleanCastData += weightedTags.join(', ') + ", ";
    }
  }
  if (!cleanCastData.trim()) {
    cleanCastData = castList.trim(); // fallback
  }
  return cleanCastData.trim();
};
