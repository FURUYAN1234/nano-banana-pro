export const MANGA_MANUSCRIPT_RATIO_LABEL = '210:297';
export const MANGA_MANUSCRIPT_ASPECT_LABEL = '1:1.414';

export const MANGA_MANUSCRIPT_STANDARD = Object.freeze({
  width: 1120,
  height: 1584,
  value: '1120x1584',
  label: 'A4標準：1120×1584',
});

export const MANGA_MANUSCRIPT_LARGE = Object.freeze({
  width: 2240,
  height: 3168,
  value: '2240x3168',
  label: 'A4大：2240×3168',
});

export const MANGA_MANUSCRIPT_SIZE_OPTIONS = Object.freeze([
  MANGA_MANUSCRIPT_STANDARD,
  MANGA_MANUSCRIPT_LARGE,
]);
