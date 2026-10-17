const SAMPLE_SHEETS = [
  'sample-character-sheet-1.jpg',
  'sample-character-sheet-2.jpg',
];

export async function loadSampleCharacterSheets({ fetchImpl = fetch, baseUrl = '/' } = {}) {
  const root = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return Promise.all(SAMPLE_SHEETS.map(async name => {
    const response = await fetchImpl(`${root}sample-character-sheets/${name}`);
    if (!response.ok) throw new Error('サンプルキャラシートを読み込めませんでした。');
    const blob = await response.blob();
    if (blob.type !== 'image/jpeg' || blob.size === 0) {
      throw new Error('サンプルキャラシートの画像形式を確認できませんでした。');
    }
    return new File([blob], name, { type: 'image/jpeg' });
  }));
}
