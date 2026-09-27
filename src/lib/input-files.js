export function readFileAsDataURL(file, FileReaderClass = FileReader) {
  return new Promise((resolve, reject) => {
    const reader = new FileReaderClass();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('画像ファイルの読み込みに失敗しました。'));
    reader.onabort = () => reject(new Error('画像ファイルの読み込みが中断されました。'));
    reader.readAsDataURL(file);
  });
}

export async function isEquirectangularFile(file, { ImageClass = Image, urlApi = URL } = {}) {
  const buffer = await file.slice(0, 65536).arrayBuffer();
  const view = new Uint8Array(buffer);
  const marker = 'equirectangular';
  let matchIndex = 0;
  let metadataFound = false;
  for (const byte of view) {
    matchIndex = byte === marker.charCodeAt(matchIndex) ? matchIndex + 1 : (byte === marker.charCodeAt(0) ? 1 : 0);
    if (matchIndex === marker.length) {
      metadataFound = true;
      break;
    }
  }
  if (!metadataFound) return false;

  return new Promise((resolve) => {
    const image = new ImageClass();
    const objectUrl = urlApi.createObjectURL(file);
    const finish = (value) => {
      urlApi.revokeObjectURL(objectUrl);
      resolve(value);
    };
    image.onload = () => finish(Math.abs(image.naturalWidth / image.naturalHeight - 2) < 0.15);
    image.onerror = () => finish(false);
    try {
      image.src = objectUrl;
    } catch {
      finish(false);
    }
  });
}
