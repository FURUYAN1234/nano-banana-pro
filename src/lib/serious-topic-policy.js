import { GAG_ENDING_OPTIONS } from './ending-mode-policy.js';

const SERIOUS_REQUIRED_SIGNALS = Object.freeze([
  /(?:死亡|死者|亡くな|犠牲者|遺族|死別|葬儀|追悼|自殺|殺害|殺人|虐殺)/u,
  /(?:大規模)?(?:地震|津波|洪水|土砂崩れ|噴火|災害|被災|震災|戦争|紛争|空爆)/u,
  /(?:虐待|性暴力|性的被害|DV|人身売買|拉致|誘拐|拷問)/iu,
  /(?:重篤|重症|末期|難病|余命|流産|死産)/u,
  /(?:fatalit(?:y|ies)|killed|deaths?|bereave(?:d|ment)|mourning|funeral|massacre|abuse|sexual violence|war casualties|terminal illness)/iu
]);

const SERIOUS_PREFERRED_SIGNALS = Object.freeze([
  /(?:悲惨|悲劇|悲しい|哀しい|喪失|別れ|離別|失業|倒産|被害|事故|負傷|入院|避難|差別|貧困|いじめ|孤独|社会問題)/u,
  /(?:tragic|tragedy|grief|loss|farewell|victim|injur(?:y|ed)|hospitali[sz]ed|discrimination|poverty|bullying)/iu
]);

const findSignal = (text, patterns) => patterns.find((pattern) => pattern.test(text));

export const classifyTopicTreatment = (sourceText = '') => {
  const text = String(sourceText || '').normalize('NFKC');
  const required = findSignal(text, SERIOUS_REQUIRED_SIGNALS);
  if (required) return { tone: 'serious', level: 'serious-required', signal: required.source };

  const preferred = findSignal(text, SERIOUS_PREFERRED_SIGNALS);
  if (preferred) return { tone: 'serious', level: 'serious-preferred', signal: preferred.source };

  return { tone: 'gag', level: 'gag-allowed', signal: null };
};

export const resolveAutoEndingType = (sourceText = '', random = Math.random) => {
  if (classifyTopicTreatment(sourceText).tone === 'serious') return 'SeriousAuto';
  const index = Math.min(
    GAG_ENDING_OPTIONS.length - 1,
    Math.floor(Math.max(0, Number(random()) || 0) * GAG_ENDING_OPTIONS.length)
  );
  return GAG_ENDING_OPTIONS[index].value;
};
