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
Rewrite the complete scenario and correct the Outfit field. Respect this priority: explicit user outfit; event-specific clothing; profession/safety/location/weather/indoor environment; target-date season; ordinary auto-selection. Output one concrete broad outfit category and do not use default, character-sheet-compliant, or unspecified wording.`;
