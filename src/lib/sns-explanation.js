// Keep posting copy outside the manga script and take URLs only from source metadata.
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

export function buildSnsExplanation({ text, sources, inputMode, manualTopic = '' }) {
  const { explanation } = splitSnsExplanation(text);
  const references = inputMode === 'manual'
    ? normalizeSources((manualTopic.match(/https?:\/\/[^\s<>「」]+/g) || [])
      .map(url => ({ url: url.replace(/[。）、,.)]+$/, '') })))
    : normalizeSources(sources);
  const label = inputMode === 'manual' ? '参考リンク（入力URL・内容は要確認）' : '参考リンク';
  const referenceText = references.length
    ? `\n\n${label}\n${references.map(s => `${s.title ? `${s.title}\n` : ''}${s.url}`).join('\n')}`
    : '';
  return {
    text: explanation ? explanation + referenceText : referenceText.trim(),
    notice: !explanation ? '解説を取得できませんでした。手入力できます。'
      : inputMode === 'manual' && !references.length ? '投稿前に内容をご確認ください。新しいシナリオを生成すると置き換わります。'
      : references.length ? '投稿前に内容と参考リンクをご確認ください。'
        : '参考リンクは取得されていません。必要に応じて追記してください。'
  };
}
