export const MAX_GENERATION_HISTORY_ITEMS = 10;

export const addGenerationHistoryItem = (history, item) => {
  return [item, ...(Array.isArray(history) ? history : [])]
    .slice(0, MAX_GENERATION_HISTORY_ITEMS);
};

export const buildGeneratedImageFilename = ({ apiName, title, extension, now = new Date() }) => {
  const titleSlug = title
    ? String(title).trim().substring(0, 30).replace(/[\\/:*?"<>|\s]/g, '_')
    : 'untitled';
  const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

  return `AI_4koma_comic_${apiName}_${titleSlug}_${timestamp}.${extension}`;
};

export const downloadImageDataUrl = (imageDataUrl, filename, documentObject = document) => {
  const anchor = documentObject.createElement('a');
  anchor.href = imageDataUrl;
  anchor.download = filename;
  documentObject.body.appendChild(anchor);
  anchor.click();
  documentObject.body.removeChild(anchor);
};

export const writeImageDataUrlToDirectory = async ({
  imageDataUrl,
  filename,
  directoryHandle,
  fetchFn = fetch
}) => {
  if (!directoryHandle) return { ok: false, reason: 'destination-unavailable' };

  const response = await fetchFn(imageDataUrl);
  const blob = await response.blob();
  const fileHandle = await directoryHandle.getFileHandle(filename, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(blob);
  await writable.close();

  return { ok: true, filename };
};
