import { buildGeneratedImageFilename, downloadImageDataUrl, selectGenerationMetadataContext } from './generation-history.js';
import { buildGeneratedImageMetadata, embedGeneratedImageMetadata } from './generated-image-metadata.js';

export const convertImageDataUrlToPng = (dataUrl) => {
  if (/^data:image\/png;base64,/i.test(dataUrl || '')) return Promise.resolve(dataUrl);
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d');
      if (!context) return reject(new Error('PNG保存用の画像処理を開始できませんでした。'));
      context.drawImage(image, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    image.onerror = () => reject(new Error('PNG保存用の画像を読み取れませんでした。'));
    image.src = dataUrl;
  });
};

export const prepareGeneratedImageSave = async (item, appVersion) => {
  if (!item?.img) throw new Error('保存する生成画像がありません。');
  const context = selectGenerationMetadataContext(item);
  const png = await convertImageDataUrlToPng(item.img);
  const metadata = await buildGeneratedImageMetadata({
    appVersion, generatedAt: item.generatedAt || new Date(item.id || Date.now()).toISOString(),
    provider: context.provider, modelId: item.modelId || 'unknown',
    workflowMode: 'api_image_generation', humanOversightLevel: 'prompt_guided',
    scenario: context.scenario, finalPrompt: context.finalPrompt,
    fallbackOccurred: item.fallbackOccurred === true, inputImages: context.inputImages,
    outputImage: png, settings: context.settings, referenceContext: context.referenceContext,
  });
  const title = context.scenario?.match(/##\s*タイトル[:：]\s*(.+)/m)?.[1]?.trim();
  const filename = buildGeneratedImageFilename({ apiName: context.provider === 'openai' ? 'ChatGPT' : context.provider === 'gemini' ? 'Gemini' : 'AI', title, extension: 'png' })
    .replace(/\.png$/, `_${crypto.randomUUID().slice(0, 8)}.png`);
  return { dataUrl: embedGeneratedImageMetadata(png, metadata), filename };
};

// Explicit completion boundary, never an effect watching the displayed image.
export const createFinalImageSaver = ({ prepare = prepareGeneratedImageSave, download = downloadImageDataUrl } = {}) => {
  const completed = new Set();
  const pending = new Map();
  return async (item, appVersion, isCurrent) => {
    if (!isCurrent()) return 'stale';
    if (completed.has(item.id)) return 'duplicate';
    if (pending.has(item.id)) return pending.get(item.id);
    const operation = (async () => {
      const saved = await prepare(item, appVersion);
      if (!isCurrent()) return 'stale';
      download(saved.dataUrl, saved.filename);
      completed.add(item.id);
      if (completed.size > 20) completed.delete(completed.values().next().value);
      return 'requested';
    })();
    pending.set(item.id, operation);
    try { return await operation; } finally { pending.delete(item.id); }
  };
};

export const saveImageToChosenLocation = async ({ prepare, filename,
  picker = typeof window !== 'undefined' && window.showSaveFilePicker ? window.showSaveFilePicker.bind(window) : null,
  download = downloadImageDataUrl,
}) => {
  try {
    // Invoke before awaiting encoding: browser user activation is short-lived.
    const handle = picker ? await picker({ suggestedName: filename, types: [{ description: 'PNG画像', accept: { 'image/png': ['.png'] } }] }) : null;
    const saved = await prepare();
    if (!handle) { download(saved.dataUrl, saved.filename); return 'requested'; }
    const bytes = Uint8Array.from(atob(saved.dataUrl.split(',')[1]), char => char.charCodeAt(0));
    const stream = await handle.createWritable();
    try {
      await stream.write(new Blob([bytes], { type: 'image/png' }));
      await stream.close();
    } catch (error) { await stream.abort().catch(() => {}); throw error; }
    return 'saved';
  } catch (error) {
    if (error?.name === 'AbortError') return 'cancelled';
    throw error;
  }
};
