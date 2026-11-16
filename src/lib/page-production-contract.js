// Additive internal page API. Existing four-panel/native defaults are unchanged.
export function createBookPageMode(panelCount, { finalPage = false } = {}) {
  if (!Number.isInteger(panelCount) || panelCount < 1 || panelCount > 8) throw new TypeError('A book page requires 1–8 panels.');
  return `book-page-${panelCount}-${finalPage ? 'final' : 'continue'}`;
}
export function readBookPageMode(mode) {
  const match = /^book-page-([1-8])-(final|continue)$/.exec(String(mode));
  return match ? { panelCount: Number(match[1]), finalPage: match[2] === 'final' } : null;
}
export const isNativePageMode = mode => mode === 'experimental-manga' || Boolean(readBookPageMode(mode));
export function bookPageStoryGuidance(mode) {
  const page = readBookPageMode(mode);
  if (!page) return '';
  return `【本の中の1ページ】指定は全${page.panelCount}コマ。本全体の導入・展開・帰結を前後のページとつなぐ。${page.finalPage
    ? '最終ページでは既に積み上げた出来事を受けて指定された結末へ着地する。'
    : 'このページは途中の出来事・反応・発見を進める。独立したオチ・再導入・毎ページの反転や決着を強制しない。'}1コマでも必要な動作・受け手・画面内因果を読めるようにし、存在しない前コマや0コマ目を要求しない。原文・全台詞・人物・カメラ・演技を保持する。`;
}
export function bindRestoredPagePrepared(prepared,images,backgroundImage) {
  if(!prepared)return undefined;
  if(!Array.isArray(prepared.images)||prepared.images.length!==images.length||prepared.images.some((image,index)=>image!==images[index])||prepared.bg360Image!==backgroundImage)return undefined;
  return {...prepared,images,bg360Image:backgroundImage};
}
