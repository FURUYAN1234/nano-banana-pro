import { formatGeneratedMangaTitle } from './manga-title.js';

export const extractScenarioTitle = (scenarioText = '') => {
  const text = String(scenarioText || '').replace(/<thought>[\s\S]*?<\/thought>/gi, '');
  const explicitTitleLine = [...text.matchAll(/^[ \t]*(?:#{1,6}[ \t]*)?(?:タイトル|Title|Topic)[ \t]*[:：][ \t]*([^\r\n]*)/gim)]
    .map(match => match[1].trim()).find(Boolean);
  const firstLine = text.trim().split(/\r?\n/)[0];
  const candidate = firstLine.replace(/^#{1,6}\s*/, '').normalize('NFKC');
  // Imported scripts may begin with page/panel controls rather than a title.
  // Preserve ordinary first-line titles, but never turn structural data into
  // lettering. Empty title labels must not consume the next line as a title.
  const controlLine = /^(?:\[\s*)?(?:PageComposition|Camera|EMOTION|Style|BalloonLayout|Location|Outfit|Punchline|Scenario|Action|Dialogue|タイトル|Title|Topic|状況|台詞|セリフ)\s*[:：]/i.test(candidate)
    || /^(?:\[\s*)?(?:[0-9一二三四五六七八九十]+\s*(?:コマ目|こま目)|Panel\s+\d+)(?:\b|[\s:：\]])/i.test(candidate)
    || /^<[^>]+>/.test(candidate);
  const rawTitle = explicitTitleLine || (!controlLine && firstLine ? firstLine.substring(0, 20) : '無題');
  return formatGeneratedMangaTitle(rawTitle)
    .replace(/\s+([!！?？]+)$/u, '$1')
    .trim();
};
