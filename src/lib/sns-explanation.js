// Keep posting copy outside the manga script and take URLs only from source metadata.
const INPUT_METHOD_METADATA_RE = /(?:手動入力|手入力|自由入力(?:モード)?|入力モード(?:UI)?ラベル|ユーザー提供(?:の)?(?:創作題材|題材|トピック|文|テキスト|内容)?|最新ニュース|ニュース検索|Custom Scenario|Generated Scenario|Generic Background|Unspecified|\bmanual input\b|\buser-provided topic\b|\binput-method metadata\b|\binterface labels?\b)/iu;
const INPUT_METHOD_METADATA_GLOBAL_RE = new RegExp(INPUT_METHOD_METADATA_RE.source, 'giu');

export function hasInputMethodMetadata(text = '') {
  return INPUT_METHOD_METADATA_RE.test(String(text).normalize('NFKC'));
}

export function stripInputMethodMetadata(text = '') {
  return String(text).replace(INPUT_METHOD_METADATA_GLOBAL_RE, '').trim();
}

export function sanitizeInputMethodMetadata(text = '') {
  return String(text).replace(INPUT_METHOD_METADATA_GLOBAL_RE, match => (
    /^ユーザー提供/u.test(match) && /創作題材/u.test(match) ? 'この創作題材' : '題材'
  )).replace(/題材で指定された内容/gu, '指定された内容');
}

export function stripSourceMetadata(text = '') {
  let sourceSection = false;
  const japaneseSourceLabel = '(?:出典(?:情報|一覧|元)?|参考(?:リンク|文献|資料|URL)?)';
  const compoundJapaneseSourceLabel = `${japaneseSourceLabel}(?:\\s*[・/&＋+]\\s*${japaneseSourceLabel})*`;
  const normalized = String(text).replace(/\r\n?/g, '\n').replace(new RegExp(
    `[ \\t]+(?:${compoundJapaneseSourceLabel}|引用元|Sources?|References?|Citations?)[ \\t]*[:：].*$`,
    'gim'
  ), '');
  return normalized.split('\n').filter(line => {
    const clean = line.replace(/\*\*/g, '').trim();
    const label = clean.match(new RegExp(
      `^(?:[-*+>]\\s*|#{1,6}\\s*)?[【\\[]?\\s*(?:${compoundJapaneseSourceLabel}|引用元|Sources?|References?|Citations?)\\s*[】\\]]?\\s*(?=[:：「『"“]|$)(.*)$`,
      'i'
    ));
    if (label) {
      sourceSection = !label[1].replace(/[:：]/g, '').trim();
      return false;
    }
    const dialogueLine = !/^[-*+・>]/.test(clean) && /^[^「」:：]+「[^」]*」\s*$/.test(clean);
    if (sourceSection && (/^\[\s*\d+\s*コマ目/.test(clean) || /^(?:#{1,6}\s*|\[?(?:Camera|EMOTION)|状況[:：]|Action[:：])/.test(clean) || dialogueLine)) sourceSection = false;
    return !sourceSection;
  }).join('\n');
}
export function cleanScenarioTopic(topic = '') {
  return topic.replace(/\s*\(\[[^\]]*\]\(https?:\/\/[^\s)]+\)\)/g, '')
    .replace(/\s*\[[^\]]*\]\(https?:\/\/[^\s)]+\)/g, '')
    .replace(/cite[^]*/g, '').trim();
}

export function splitSnsExplanation(text = '') {
  const match = text.match(/\[SNS_EXPLANATION\]([\s\S]*?)\[\/SNS_EXPLANATION\]/i);
  const explanation = (match?.[1] || '')
    .replace(/\[([^\]]+)\]\(https?:\/\/[^\s)]+\)/g, '$1')
    .replace(/https?:\/\/[^\s<>]+/g, '')
    .replace(/cite[^]*/g, '')
    .replace(/(^|[。\n])((?:実在|実際)の[^。\n（）]*(?:ではありません|ではない)。?)(?=\s*$)/, '$1\n（$2）')
    .replace(/\s*(（(?:実在|実際)の[^（）\n]+）)\s*$/, '\n$1')
    .trim();
  return {
    explanation,
    text: stripSourceMetadata(text.replace(/\[SNS_EXPLANATION\][\s\S]*?(?:\[\/SNS_EXPLANATION\]|$)/gi, '')).trim()
  };
}

export function normalizeSources(sources = []) {
  const seen = new Set();
  return sources.flatMap(source => {
    try {
      const url = new URL(source.url);
      if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return [];
      if (seen.has(url.href)) return [];
      seen.add(url.href);
      return [{ url: url.href, title: String(source.title || '').replace(/\s+/g, ' ').trim() }];
    } catch { return []; }
  });
}

export function openAISources(data) {
  return normalizeSources((data.output || []).flatMap(item => (item.content || [])
    .flatMap(part => (part.annotations || []).filter(a => a.type === 'url_citation'))));
}

export function geminiSources(candidate) {
  return normalizeSources((candidate.groundingMetadata?.groundingChunks || [])
    .filter(chunk => chunk.web).map(chunk => ({ url: chunk.web.uri, title: chunk.web.title })));
}

export function buildSnsExplanation({ text, sources, inputMode, manualTopic = '', title = '' }) {
  const { explanation } = splitSnsExplanation(text);
  const cleanExplanation = inputMode === 'manual'
    && !hasInputMethodMetadata(manualTopic)
    ? sanitizeInputMethodMetadata(explanation)
    : explanation;
  const heading = cleanScenarioTopic(String(title))
    .replace(/^#{1,6}\s*/, '')
    .replace(/^【|】$/g, '')
    .trim();
  const explanationLines = cleanExplanation.split('\n');
  const firstLineTitle = (explanationLines[0] || '')
    .replace(/^#{1,6}\s*/, '')
    .replace(/^【|】$/g, '')
    .replace(/^見出し\s*[:：]\s*/, '')
    .trim();
  const explanationBody = heading && firstLineTitle === heading
    ? explanationLines.slice(1).join('\n').trim()
    : cleanExplanation;
  const postingText = [heading ? `【${heading}】` : '', explanationBody]
    .filter(Boolean)
    .join('\n\n');
  const references = inputMode === 'manual'
    ? normalizeSources((manualTopic.match(/https?:\/\/[^\s<>「」]+/g) || [])
      .map(url => ({ url: url.replace(/[。）、,.)]+$/, '') })))
    : normalizeSources(sources);
  const label = inputMode === 'manual' ? '参考リンク（入力URL・内容は要確認）' : '参考リンク';
  const referenceText = references.length
    ? `\n\n${label}\n${references.map(s => `${s.title ? `${s.title}\n` : ''}${s.url}`).join('\n')}`
    : '';
  return {
    text: postingText ? postingText + referenceText : referenceText.trim(),
    notice: !explanation ? '解説を取得できませんでした。手入力できます。'
      : inputMode === 'manual' && !references.length ? '投稿前に内容をご確認ください。新しいシナリオを生成すると置き換わります。'
      : references.length ? '投稿前に内容と参考リンクをご確認ください。'
        : '参考リンクは取得されていません。必要に応じて追記してください。'
  };
}
