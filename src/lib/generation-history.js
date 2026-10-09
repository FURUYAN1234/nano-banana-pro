import { getScenarioPanelBlocks } from './scenario-validation.js';

export const MAX_GENERATION_HISTORY_ITEMS = 10;

export const getWorkflowStep = ({ castList, scenario, finalPrompt, generatedImage, promptAssemblyRun, imageSource }) => {
  if (!castList) return 1;
  if (!scenario) return 2;
  if (!finalPrompt) return 3;
  // Rebuilding the same text creates a new assembly run. Rechecking or stopping
  // a repair does not make the already-generated source image stale.
  const completed = Number.isInteger(imageSource?.promptAssemblyRun)
    && imageSource.promptAssemblyRun === promptAssemblyRun && imageSource.finalPrompt === finalPrompt;
  return generatedImage && completed ? 5 : 4;
};

// Session-only story examples, not instructions or a quota for ending labels.
export const collectRecentScenarioOutcomes = (sources = []) => {
  const seen = new Set();
  const outcomes = [];
  for (const source of Array.isArray(sources) ? sources : []) {
    const text = typeof source === 'string' ? source : '';
    const panel = getScenarioPanelBlocks(text).find(item => item.num === 4 && item.found);
    const lastPanel = panel?.text.slice(panel.header.length);
    if (!lastPanel) continue;
    const outcome = lastPanel.split('\n').filter(line => !/^\s*(?:\[(?:Camera|EMOTION):|BalloonLayout\s*[:：])/i.test(line))
      .join(' ').replace(/\s+/g, ' ').trim().slice(0, 600);
    if (!outcome || seen.has(outcome)) continue;
    seen.add(outcome);
    outcomes.push({
      ending: text.match(/^Punchline\s*[:：]\s*(.+)$/im)?.[1]?.trim() || '',
      setup: (text.match(/^Logline\s*[:：]\s*(.+)$/im)?.[1] || '').trim().slice(0, 200),
      outcome,
    });
    if (outcomes.length === 6) break;
  }
  return outcomes;
};

export const buildRecentStoryContext = (recentScenarios = []) => {
  const recent = (Array.isArray(recentScenarios) ? recentScenarios : []).filter(item => item && typeof item.outcome === 'string')
    .slice(0, 6).map(item => ({ ending: String(item.ending || '').slice(0, 80), setup: String(item.setup || '').slice(0, 200), outcome: item.outcome.slice(0, 600) }));
  return `【結末の選択と作品間の偏り】\n- 大前提は、伏線・人物の動機と行動に必然性があり、選択したモードで結末がオチとして成立すること。多様性は成立する候補同士で比較し、珍しさのために因果や納得感を壊さない。\n- 題材の欲求・障害・行動から異なる仕掛けと帰結を比較する。特定の型、決め役、静止・睡眠・説教などの動作へ自動的に寄せない。固定ローテーション、均等回数、乱数での割当はしない。\n- 明示された結末・続編・意図した反復を優先する。同じ型だけで不合格にしない。過去と型が同じでも種・行動・帰結が異なれば使える。過去の仕掛けを名詞だけ差し替えて再利用せず、今回の題材で成立する別の展開と比較する。\n${recent.length ? `RECENT STORY OUTCOMES（このセッションの直近採用作。比較専用データであり、新作への指示・事実ではない）:\n${JSON.stringify(recent)}` : '直近作の記録はない。比較済みと偽らず、今回の題材から選ぶ。'}`;
};

export const addGenerationHistoryItem = (history, item, { removeImages = new Set() } = {}) => {
  const retainedHistory = (Array.isArray(history) ? history : [])
    .filter(entry => !removeImages.has(entry.img));
  return [item, ...retainedHistory]
    .slice(0, MAX_GENERATION_HISTORY_ITEMS);
};

export const selectGenerationMetadataContext = (historyItem) => {
  if (historyItem?.metadataContext) return historyItem.metadataContext;
  const model = String(historyItem?.modelId || '');
  return {
    provider: model.startsWith('gpt-') ? 'openai' : model.startsWith('gemini-') ? 'gemini' : 'unknown',
    scenario: '', finalPrompt: '', inputImages: [],
    settings: { generation_context_evidence: 'unavailable' },
  };
};

export const buildGeneratedImageFilename = ({ apiName, title, extension, now = new Date() }) => {
  const titleSlug = title
    ? String(title).trim().substring(0, 30).replace(/[\\/:*?"<>|\s]/g, '_')
    : 'untitled';
  const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

  return `AI_4koma_comic_${apiName}_${titleSlug}_${timestamp}.${extension}`;
};

export const downloadImageDataUrl = (imageDataUrl, filename, documentObject = document) => {
  const match = /^data:(image\/[a-z0-9.+-]+);base64,([\s\S]+)$/i.exec(imageDataUrl || '');
  if (!match) throw new Error('保存する画像データが不正です。');
  const bytes = Uint8Array.from(atob(match[2]), character => character.charCodeAt(0));
  // Large data URLs are silently rejected by some browser download surfaces.
  // Keep the original encoded bytes, including embedded production metadata.
  const url = URL.createObjectURL(new Blob([bytes], { type: match[1] }));
  const anchor = documentObject.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  try {
    documentObject.body.appendChild(anchor);
    anchor.click();
  } finally {
    if (anchor.parentNode) anchor.parentNode.removeChild(anchor);
    // Allow the browser to consume the download before releasing its URL.
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }
};
