export const formatGeneratedMangaTitle = (title = '') => String(title)
  .trim()
  .replace(/^(?:#{1,6}\s*)?(?:タイトル|Title|Topic)\s*[:：]\s*/iu, '')
  .trim();
