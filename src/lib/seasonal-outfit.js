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
// Call with one scope only: the scenario preamble or one panel, never both.
export const readExplicitOutfit = (scopeText = '') => {
  const match=String(scopeText).replace(/<thought>[\s\S]*?<\/thought>/gi,'')
    .match(/(?:^|\n)[ \t]*(\[)?[ \t]*Outfit[ \t]*[:：][ \t]*([^\r\n]*)/i);
  const value=(match?.[1]?match[2].replace(/\][ \t]*$/,''):match?.[2]||'').trim();
  return AMBIGUOUS_OUTFIT_RE.test(value)?'':value;
};

// A named/role-scoped assignment needs the other actors' reference defaults.
// This is conservative scope detection, not an attempt to parse clothing prose.
export const hasScopedOutfitAssignment = (outfit = '', castEntries = [], plainRoster = '') => {
  // Older inputs may contain only comma-separated names. Accept that whole
  // format here; descriptive/structured text must keep conservative defaults.
  const roster=String(plainRoster).trim();
  const names=!castEntries.length&&/^[\p{L}\p{M}\p{N}][\p{L}\p{M}\p{N} '’\-]*(?:[、,，][ \t]*[\p{L}\p{M}\p{N}][\p{L}\p{M}\p{N} '’\-]*)+$/u.test(roster)
    ? roster.split(/[、,，]/).map(name=>name.trim()) : [];
  const aliases=(castEntries.length?castEntries:names).map(entry=>typeof entry==='string'?[entry]:entry.aliases||[]);
  const namePattern=name=> {
    const escaped=String(name).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    return /^[\w -]+$/.test(name)
      ? `(?<![\\w])${escaped}(?![\\w])` : escaped;
  };
  // Only a direct assignment for every known actor can discard all defaults.
  // Merely mentioning an actor or saying "everyone" must not assign their clothes.
  const preservesDefaults=/参照|キャラシート|デフォルト|未指定|以外|除外|除く|ではな|じゃな|着ない|着用しない|\b(?:only|reference|default|except|not|without|keep)\b/i.test(outfit);
  if(aliases.length&&!preservesDefaults&&aliases.every(names=>names.some(name=>
    new RegExp(`${namePattern(name)}\\s*(?:は|[:：]|wears?\\b)`,'i').test(outfit)
  ))) return false;
  return /は|のみ|だけ|参照|キャラシート|\b(?:only|for|wears?|assigned|reference|default)\b/i.test(outfit)
    || aliases.some(names=>names.some(name=>new RegExp(namePattern(name),'i').test(outfit)));
};

// Evidence gating only: resolve direct, known-name assignments conservatively.
// Unknown roles, exclusions and compound prose are not permission to repair.
export const resolveOutfitForSubject = (authority, panel, subject) => {
  const names=Array.isArray(authority?.castNames)?authority.castNames.filter(name=>typeof name==='string'&&name.trim()):[];
  if(!names.includes(subject)) return null;
  const escaped=names.sort((a,b)=>b.length-a.length).map(name=>name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|');
  const group=new RegExp(`^(?:${escaped})(?:\\s*(?:と|、|,|，|&|and)\\s*(?:${escaped}))*$`,'i');
  const assignment=outfit=>{
    if(!outfit) return {applies:false,instruction:''};
    const clauses=String(outfit).split(/[。;；\n]+|[、,，](?=[^。、,，;；\n]+(?:は|[:：]|\s+wears?\b))/u).map(value=>value.trim()).filter(Boolean);
    const assigned=[];let named=false,bare=false;
    for(const clause of clauses) {
      if(/参照|キャラシート|デフォルト|未指定|以外|除外|除く|ではな|じゃな|着ない|着用しない|\b(?:only|reference|default|except|not|without|keep)\b/i.test(clause)) return null;
      const match=clause.match(/^(.+?)(?:は|[:：]|\s+wears?\s+)(.+)$/i);
      if(match) {
        const target=match[1].trim();
        if(!group.test(target)) return null;
        named=true;
        if(target.match(new RegExp(escaped,'g'))?.includes(subject)) assigned.push(clause);
      } else {
        if(hasScopedOutfitAssignment(clause,names)||/のみ|だけ|用の|向け|\b(?:for|assigned|whose|who)\b/i.test(clause)) return null;
        bare=true;assigned.push(clause);
      }
    }
    if(named&&bare) return null;
    return {applies:assigned.length>0,instruction:assigned.join('。')};
  };
  const local=Array.isArray(authority?.panels)?authority.panels.find(entry=>entry.panel===panel)?.outfit:'';
  for(const [scope,quote] of [['panel',local],['global',authority?.global]]) {
    const resolved=assignment(quote);
    if(!resolved) return null;
    if(resolved.applies) return {scope,quote,instruction:resolved.instruction};
  }
  return {scope:'reference',quote:'',instruction:''};
};

export const OUTFIT_SCOPE_CONTRACT = 'OUTFIT SCOPE: 全体Outfitは既定。FRAME OUTFITはそのコマの指定人物/役割だけ上書き。人物未指定のカテゴリは当該コマの可視人物全員。未指定人物/コマは全体指定→参照衣装の順。別コマへ展開せず、同一性/髪/眼鏡を保持。この範囲を服装固定の一般指示より優先。';
const WARDROBE_LABEL_RE = /^(?:服装|衣装|衣服|outfit|clothing|clothes|wardrobe|costume|attire)(?:\s*[（(][^）)]*[）)])?(?:\s*[:：]|\s*$)/i;
const SCHOOL_OUTFIT_RE = /学校制服|学生服|学ラン|セーラー服|ブレザー制服|学生ボランティア|通学用|school\s+uniform|sailor\s+uniform/i;
// Ignore only a direct garment exclusion, never its whole clause or actor.
// A partial exclusion (e.g. its jacket) or double negative remains detectable.
const NEGATED_SCHOOL_OUTFIT_RE = new RegExp(
  `(?:${SCHOOL_OUTFIT_RE.source})` + String.raw`\s*(?:(?:ではない|でない|じゃない|ではありません|(?:は|を)(?:着ない|着ません|着用しない|着用しません))(?=$|[\s。、，,.!?！？;；]|が|ので)|(?:ではなく|でなく|じゃなく)(?!ない|もない))`
  + String.raw`|\b(?:no|without)\s+(?:a\s+)?(?:` + SCHOOL_OUTFIT_RE.source + String.raw`)(?=$|[。、，,.!?！？;；]|\s*$)`,
  'gi'
);
const SCHOOL_SOURCE_RE = /学校|学園|高校|中学|小学校|校舎|校庭|校門|放課後|通学|登校|下校|文化祭|学園祭|卒業式|入学式|学生服|学校制服|セーラー服|school|campus/i;

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
今回の題材・原文・ユーザー指定から出来事と役割を先に決め、その行為、場所、季節に合う衣装を選ぶ。衣装を使う口実として学校行事や学生ボランティア等を後付けしない。明示衣装指定を最優先し、学校制服は題材・原文・ユーザー指定に学校活動または制服指定の根拠がある場合だけ選ぶ。
勤務中で職務上の服装が必要な人物には、職業制服・作業服・安全装備を必須とし、私服や一般的なフォーマル服へ一律に置き換えない。来訪者・客・通行人と勤務者を区別し、場所だけを理由に全員を同じ職業服にしない。役割が異なる場合は人物名または役割ごとに衣装をOutfitへ記載する。職務・行事上の指定がない場合は場面に合う私服等を選ぶ。
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

export const getJapaneseWeekdayLabel = (targetDate = '') => {
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

  return new Intl.DateTimeFormat('ja-JP', { weekday: 'long', timeZone: 'UTC' }).format(parsed);
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
  if (SCHOOL_OUTFIT_RE.test(normalizedOutfit.replace(NEGATED_SCHOOL_OUTFIT_RE, ''))
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
Rewrite the complete scenario and correct the Outfit field AND action descriptions. Respect this priority: explicit user outfit; source-grounded event-specific clothing; profession/safety/location/weather/indoor environment; target-date season; ordinary auto-selection. Preserve required work uniforms and protective equipment for on-duty roles; distinguish visitors and off-duty people. Do not justify reference clothing by inventing school activities or student volunteer roles. Output concrete outfit categories by character/role where assignments differ; do not use default, character-sheet-compliant, or unspecified wording.`;
