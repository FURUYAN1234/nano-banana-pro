const EXCLUSION_RULES = [
  {
    label: 'お金ネタ',
    directives: ['お金ネタ', '金銭ネタ', '金ネタ'],
    markers: ['財布', '節約', '小遣い', '金欠', 'お得']
  },
  {
    label: 'レトロねた',
    directives: ['レトロねた', 'レトロネタ', '懐古ネタ', '昭和ネタ'],
    markers: ['レトロ', '昭和', '懐かしの', '昔ながら']
  },
  {
    label: '都市伝説',
    directives: ['都市伝説', '怪談ネタ', 'オカルトネタ'],
    markers: ['都市伝説', '怪談', '幽霊', '呪い', '陰謀論']
  },
  {
    label: '風紀ねた',
    directives: ['風紀ねた', '風紀ネタ', '校則ネタ'],
    markers: ['風紀', '校則', '生徒指導', '没収', '取締']
  }
];

const normalize = (value) => String(value || '').normalize('NFKC').toLocaleLowerCase('ja-JP');

export const getManualTopicExclusionRules = (manualTopic = '') => {
  const source = normalize(manualTopic);
  if (!source.includes('禁止')) return [];
  return EXCLUSION_RULES.filter((rule) => rule.directives.some((directive) => source.includes(normalize(directive))));
};

export const buildManualTopicExclusionPrompt = (manualTopic = '') => {
  const rules = getManualTopicExclusionRules(manualTopic);
  if (rules.length === 0) return '';

  return `【手動入力の禁止コメディ条件（最優先）】\n${rules.map((rule) => `- 「${rule.label}」は禁止。ギャグ、オチ、セリフ、状況に ${rule.markers.join('／')} を使わない。`).join('\n')}\n- 消費税や税率差など、入力本文に含まれる事実説明は保持し、禁止カテゴリをオチやギャグとして復活させない。`;
};

export const assertManualTopicExclusions = (scenarioText = '', manualTopic = '') => {
  const text = normalize(scenarioText);
  const violated = getManualTopicExclusionRules(manualTopic).find((rule) => (
    rule.markers.some((marker) => text.includes(normalize(marker)))
  ));

  if (violated) {
    const error = new Error(`手動入力の禁止条件「${violated.label}」に反する表現を検出しました。`);
    error.code = 'MANUAL_TOPIC_EXCLUSION';
    throw error;
  }
  return true;
};

export const MANUAL_TOPIC_EXCLUSION_RETRY_INSTRUCTION = `MANUAL TOPIC EXCLUSION RETRY:
The prior scenario used a comedy marker that the user's manual input explicitly banned. Rewrite the complete scenario while preserving the supplied factual topic. Do not revive banned topics in dialogue, actions, props, punchlines, or narration.`;
