const SEASONS = Object.freeze({
  spring: Object.freeze({
    key: 'spring',
    label: '春',
    climateHint: '寒暖差を考慮した軽い羽織りまたは春向けの服装'
  }),
  summer: Object.freeze({
    key: 'summer',
    label: '夏',
    climateHint: '高温多湿を考慮した通気性のよい夏向けの服装'
  }),
  autumn: Object.freeze({
    key: 'autumn',
    label: '秋',
    climateHint: '残暑または冷え込みを考慮した秋向けの服装'
  }),
  winter: Object.freeze({
    key: 'winter',
    label: '冬',
    climateHint: '低温を考慮した防寒性のある冬向けの服装'
  })
});

const AMBIGUOUS_OUTFIT_RE = /^(?:なし|未指定|デフォルト|キャラシート準拠|おまかせ|none|default)$/i;
const WARDROBE_LABEL_RE = /^(?:服装|衣装|衣服|outfit|clothing|clothes|wardrobe|costume|attire)(?:\s*[（(][^）)]*[）)])?(?:\s*[:：]|\s*$)/i;
const SCHOOL_OUTFIT_RE = /学校制服|学生服|学ラン|セーラー服|ブレザー制服|学生ボランティア|通学用|school\s+uniform|sailor\s+uniform/i;
const SCHOOL_SOURCE_RE = /学校|学園|高校|中学|小学校|通学|登校|下校|文化祭|学園祭|卒業式|入学式|学生服|学校制服|セーラー服|school|campus/i;

// Project the structured analysis; never mutate the saved character sheet or
// discard personality/relationships by reducing the scenario cast to image tags.
export const stripReferenceWardrobe = (castList = '') => {
  let skipWardrobe = false;
  return String(castList).split(/\r?\n/).filter((raw) => {
    const line = raw.replace(/\*\*/g, '').trim();
    const label = line.replace(/^#{1,6}\s+|^[-*]\s+/, '').replace(/^\|\s*/, '').split('|')[0].trim();
    if (WARDROBE_LABEL_RE.test(label)) {
      skipWardrobe = true;
      return false;
    }
    // The next field/section ends a multiline wardrobe field. WEIGHTS belongs
    // to the current field and must not accidentally revive its clothing tags.
    if (/^(?:#{1,6}\s|\||(?:-\s*)?Character\s*\[|---\s*$)/i.test(line)
      || (!/^\[(?:WEIGHTS?|weighted tags)\]/i.test(line) && /^(?:[-*]\s+)?[^:：]+[:：]/.test(line))) {
      skipWardrobe = false;
    }
    return !skipWardrobe;
  }).join('\n').trim();
};

export const SCENARIO_WARDROBE_CONTRACT = `CHARACTER IDENTITY, NOT STORY SETTING:
キャラ情報から名前・顔・髪・体格・性格・口調・人物間の関係性を保つ。参考衣装は今回の衣装・舞台・職業・出来事を決める根拠にしない。性格欄の学校・職業上の役割も、今回の場面をその活動へ変える理由にしない。
今回の題材・原文・ユーザー指定から出来事と役割を先に決め、その行為、場所、季節に合う衣装を選ぶ。衣装を使う口実として学校行事や学生ボランティア等を後付けしない。明示衣装指定を最優先し、学校制服は題材・原文・ユーザー指定に学校活動または制服指定の根拠がある場合だけ選ぶ。職業服・安全装備・行事衣装や私服は場面に応じて選べる。
演出強化では確定済みOutfitを維持し、ト書きの衣装もそれに合わせる。参考衣装へ戻さない。この内部ルールは漫画のセリフや画面文字にしない。`;

export const buildScenarioCastContext = (castList = '') =>
  `${SCENARIO_WARDROBE_CONTRACT}\n\n${stripReferenceWardrobe(castList)}`;
const SUMMER_CONFLICT_RE = /(?:ダウン(?:ジャケット)?|厚手(?:の)?コート|マフラー|防寒着|heavy\s+coat|winter\s+clothes)/i;
const WINTER_CONFLICT_RE = /(?:水着|薄手(?:の)?半袖|ノースリーブ|タンクトップ|swimwear|swimsuit)/i;
const COLD_EXCEPTION_RE = /(?:雪山|雪上|降雪|吹雪|スキー|スケート|冷凍|冷蔵|氷点下|寒冷|屋内氷|南半球|winter|snow|freezer|ice\s+rink)/i;
const WARM_EXCEPTION_RE = /(?:屋内プール|温水プール|サウナ|熱帯|南半球|ビーチ|海水浴|暖房|summer|tropical|heated\s+pool|sauna)/i;

const getSeasonKey = (month) => {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
};

export const getSeasonContext = ({ targetDate = '', inputMode = 'news' } = {}) => {
  if (inputMode !== 'news') return null;

  const match = String(targetDate).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year
    || parsed.getUTCMonth() + 1 !== month
    || parsed.getUTCDate() !== day
  ) return null;

  const definition = SEASONS[getSeasonKey(month)];
  return { ...definition, sourceDate: targetDate, month };
};

export const buildSeasonalOutfitInstruction = ({
  seasonContext = null,
  inputMode = 'news',
  manualTopic = '',
  customOutfit = ''
} = {}) => {
  const explicitOutfit = String(customOutfit).trim();
  if (explicitOutfit) {
    return `ユーザー指定衣装「${explicitOutfit}」を最優先し、季節目安で変更してはならない。`;
  }

  if (inputMode === 'manual') {
    return `手動トピック「${String(manualTopic).trim()}」に季節、天候、行事、職業、安全装備、場所、屋内環境が明示されている場合、それを衣装選定の必須条件として扱う。対象日付から季節を推測してはならない。`;
  }

  if (!seasonContext) return '';

  return `対象日付 ${seasonContext.sourceDate} の日本の季節目安は「${seasonContext.label}」。基本は${seasonContext.climateHint}を選ぶ。ただし、イベント固有衣装、職業・安全装備、場所、実際の天候、屋内環境、海外の現地季節が明確なら、それらを季節目安より優先する。理由のない季節外れの服装は禁止する。`;
};

export const assertSeasonalOutfit = ({
  outfit = '',
  seasonContext = null,
  contextText = '',
  wardrobeSourceText = '',
  customOutfit = ''
} = {}) => {
  if (String(customOutfit).trim()) return true;

  const normalizedOutfit = String(outfit).trim();
  if (!normalizedOutfit) {
    throw new Error('Outfitが空です。具体的な衣装カテゴリーを出力してください。');
  }
  if (AMBIGUOUS_OUTFIT_RE.test(normalizedOutfit)) {
    throw new Error('Outfitに具体的な衣装カテゴリーがありません。');
  }
  if ((normalizedOutfit === '制服' || SCHOOL_OUTFIT_RE.test(normalizedOutfit))
    && !SCHOOL_SOURCE_RE.test(String(wardrobeSourceText))) {
    throw new Error('学校制服の根拠が元の題材・原文・ユーザー指定にありません。生成した学校行事や学生の役割を口実にせず、今回の行為に合う衣装を選び直してください。');
  }

  const context = `${contextText}\n${normalizedOutfit}`;
  if (
    seasonContext?.key === 'summer'
    && SUMMER_CONFLICT_RE.test(normalizedOutfit)
    && !COLD_EXCEPTION_RE.test(context)
  ) {
    throw new Error(`夏（${seasonContext.month}月）なのに防寒着が選ばれました。寒冷な場所・天候・屋内環境の根拠が必要です。`);
  }
  if (
    seasonContext?.key === 'winter'
    && WINTER_CONFLICT_RE.test(normalizedOutfit)
    && !WARM_EXCEPTION_RE.test(context)
  ) {
    throw new Error(`冬（${seasonContext.month}月）なのに夏向けの薄着が選ばれました。温暖な場所・屋内環境の根拠が必要です。`);
  }

  return true;
};

export const SEASONAL_OUTFIT_RETRY_INSTRUCTION = `SEASONAL OUTFIT RETRY:
Rewrite the complete scenario and correct the Outfit field AND action descriptions. Respect this priority: explicit user outfit; source-grounded event-specific clothing; profession/safety/location/weather/indoor environment; target-date season; ordinary auto-selection. Do not justify reference clothing by inventing school activities or student volunteer roles. Output one concrete broad outfit category and do not use default, character-sheet-compliant, or unspecified wording.`;
