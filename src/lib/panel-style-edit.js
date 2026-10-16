import { detectVariablePanelFrames, extractNativeImageRegion } from './manga-page-layout.js';
import { buildImageEditRequest } from './image-edit.js';
import { normalizeImageDataUrl } from './openai-image-references.js';
import { OPENAI_IMAGE_SIZE_OPTIONS, DEFAULT_OPENAI_IMAGE_SIZE } from './openai-image-settings.js';
import { buildEmotionBlock } from './panel-utils.js';
import { orderObservedFrames, experimentalLayout } from './experimental-manga.js';

const EDIT_STYLES = new Set(['NORMAL', 'POP_ART', 'WATERCOLOR', 'GEKIGA', 'SKETCH', 'CHIBI_GAG']);

function dimensions(value) {
  if (!value || ![value.width, value.height].every(n => Number.isSafeInteger(n) && n > 0)
    || !Number.isSafeInteger(value.width * value.height * 4)) throw new RangeError('画像の寸法が不正です。');
}

function pixelData(value) {
  dimensions(value);
  if (!(value.data instanceof Uint8ClampedArray || value.data instanceof Uint8Array)
    || value.data.length !== value.width * value.height * 4) throw new RangeError('画像の画素データが不正です。');
}

function validateRegion(page, region) {
  dimensions(page);
  if (!region || ![region.x, region.y, region.width, region.height].every(Number.isSafeInteger)
    || region.x < 0 || region.y < 0 || region.width < 1 || region.height < 1
    || region.x + region.width > page.width || region.y + region.height > page.height) {
    throw new RangeError('修正領域は元画像の範囲内の整数pixelで指定してください。');
  }
}

// The existing provider accepts these manuscript canvases only. Padding keeps
// the selected panel at native resolution; no invented API size or resampling.
export function createPanelStyleEditPlan(page, region, requestedSize = DEFAULT_OPENAI_IMAGE_SIZE) {
  validateRegion(page, region);
  const size = OPENAI_IMAGE_SIZE_OPTIONS.find(option => option.value === requestedSize);
  if (!size) throw new RangeError('対応していない画像サイズです。');
  if (region.width > size.width || region.height > size.height) {
    throw new RangeError('原寸のコマが収まりません。大きい画像サイズを選択してください。');
  }
  return Object.freeze({
    page: Object.freeze({ width: page.width, height: page.height }),
    region: Object.freeze({ x: region.x, y: region.y, width: region.width, height: region.height }),
    size: size.value,
    canvas: Object.freeze({ width: size.width, height: size.height }),
    editRegion: Object.freeze({ x: Math.floor((size.width - region.width) / 2), y: Math.floor((size.height - region.height) / 2), width: region.width, height: region.height }),
  });
}

function validatePlan(plan) {
  const expected = createPanelStyleEditPlan(plan?.page, plan?.region, plan?.size);
  for (const key of ['canvas', 'editRegion']) {
    if (!plan[key] || Object.keys(expected[key]).some(field => plan[key][field] !== expected[key][field])) {
      throw new RangeError('画風修正の領域計画が一致しません。');
    }
  }
  return expected;
}

export function buildPanelStyleEditRequest(paddedSource, plan, { mode = 'style', style, instruction, colorMode = 'color' } = {}) {
  validatePlan(plan);
  if (!['style', 'free'].includes(mode)) throw new RangeError('編集方法は画風または自由入力を指定してください。');
  if (!['color', 'monochrome'].includes(colorMode)) throw new RangeError('カラーまたは白黒を指定してください。');
  if (mode === 'free') {
    if (style !== undefined) throw new RangeError('自由入力と画風の指定は併用できません。');
    if (typeof instruction !== 'string' || !instruction.trim()) throw new Error('修正したい内容を入力してください。');
    return buildImageEditRequest(paddedSource, [
      'SELECTED PANEL EDIT: apply the user instruction only inside the existing panel rectangle.',
      `The source is a ${plan.canvas.width} x ${plan.canvas.height} canvas. The panel rectangle in pixels is ${JSON.stringify(plan.editRegion)}.`,
      'The surrounding white padding is not part of the scene. Keep the panel rectangle fixed; requested scene and camera changes occur inside it.',
      'USER PANEL INSTRUCTION:', instruction.trim(),
      `Return exactly one ${plan.canvas.width} x ${plan.canvas.height} image with the edited panel in its original pixel rectangle and white padding outside.`,
    ].join('\n'));
  }
  if (instruction !== undefined) throw new RangeError('画風指定と自由入力は併用できません。');
  if (!EDIT_STYLES.has(style)) throw new RangeError('対応していない画風です。');
  const recipe = buildEmotionBlock(`[EMOTION: ${style}]`, colorMode, { providerFamily: 'chatgpt' }).trim()
    || 'NORMAL: standard Japanese manga ink drawing. Keep identifying facial features and all acting.';
  return buildImageEditRequest(paddedSource, [
    `SELECTED PANEL STYLE EDIT: ${style}. Change only the drawing medium of the single existing panel.`,
    `The source is a ${plan.canvas.width} x ${plan.canvas.height} canvas. The panel rectangle in pixels is ${JSON.stringify(plan.editRegion)}.`,
    'The surrounding white padding is not part of the scene. Keep the panel at exactly this rectangle, dimensions and crop; do not expand, move, rotate or resize it.',
    'Preserve every character identity, age, defining features, hair, skin, costume, character count, object, and spatial relationship. Translate the drawing construction into the selected medium.',
    'Keep the existing Camera/Action, lens, perspective, foreshortening, expressions, gaze and poses. Do not expose hidden faces, straighten a Dutch angle or zoom in.',
    'Keep all dialogue text exactly, including punctuation, balloon count, locations, tails and speaker assignments. Preserve silent panels as silent. Do not add labels, speaker names, titles or editing instructions.',
    colorMode === 'monochrome' ? 'Maintain monochrome ink/paper and the existing skin base distinctions.' : 'Maintain full color and the characters’ identifying colors.',
    'Apply the selected medium to every visible actor, face, hair, garment, prop and background within this panel, without changing the acting or scene.',
    recipe,
    `Return exactly one ${plan.canvas.width} x ${plan.canvas.height} image with the edited panel in its original pixel rectangle and white padding outside.`,
  ].join('\n'));
}

// Copy-on-write RGBA composition. The provider's surrounding canvas is never
// copied, so unchanged page pixels do not depend on model obedience.
export function composePanelPixels(source, patch, region) {
  pixelData(source); pixelData(patch); validateRegion(source, region);
  if (patch.width !== region.width || patch.height !== region.height) throw new RangeError('修正コマの寸法が原寸と一致しません。');
  const data = new Uint8ClampedArray(source.data);
  for (let row = 0; row < region.height; row++) {
    const start = row * region.width * 4;
    data.set(patch.data.subarray(start, start + region.width * 4), ((region.y + row) * source.width + region.x) * 4);
  }
  return { width: source.width, height: source.height, data };
}

function canvasFor(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('画風修正の原寸画像を処理できません。');
  context.imageSmoothingEnabled = false;
  return { canvas, context };
}

async function readPixels(dataUrl) {
  const image = new Image();
  image.src = normalizeImageDataUrl(dataUrl, 'コマ修正画像');
  await image.decode();
  dimensions({ width: image.naturalWidth, height: image.naturalHeight });
  const { canvas, context } = canvasFor(image.naturalWidth, image.naturalHeight);
  context.drawImage(image, 0, 0);
  return { image, canvas, context, pixels: context.getImageData(0, 0, canvas.width, canvas.height) };
}

export function orderPanelStyleEditFrames(regions, page, { plan } = {}) {
  dimensions(page);
  if (!Array.isArray(regions) || !regions.length) throw new RangeError('コマ領域がありません。');
  regions.forEach(region => validateRegion(page, region));
  for (let i = 0; i < regions.length; i++) for (let j = i + 1; j < regions.length; j++) {
    const a = regions[i], b = regions[j];
    if (Math.min(a.x + a.width, b.x + b.width) > Math.max(a.x, b.x)
      && Math.min(a.y + a.height, b.y + b.height) > Math.max(a.y, b.y)) {
      throw new RangeError('コマ領域が重なっています。安全に切り出せません。');
    }
  }
  const ordered = orderObservedFrames(regions.map(region => ({ region,
    bounds: [region.x / page.width, region.y / page.height, region.width / page.width, region.height / page.height],
  })), regions.length);
  // Use the QA reader's 2% row tolerance. A left column that continues beside
  // a later right column has two plausible paths; do not invent panel numbers.
  const tolerance = .02;
  let readingOrderConfirmed = !ordered.some((frame, i) => ordered.slice(i + 1).some(next =>
    frame.bounds[0] < next.bounds[0]
    && Math.min(frame.bounds[1] + frame.bounds[3], next.bounds[1] + next.bounds[3])
      - Math.max(frame.bounds[1], next.bounds[1]) > tolerance));
  if (plan != null) {
    let planned = [];
    try {
      if (plan.count === regions.length && typeof plan.layout === 'string') {
        planned = experimentalLayout(plan.count, plan.layout).map(r => [r.x, r.y, r.w, r.h]);
      }
    } catch { /* Unknown saved layouts cannot confirm numbers, but crops stay usable. */ }
    const relation = (a, b, axis) => a[axis] + a[axis + 2] <= b[axis] + tolerance ? -1
      : b[axis] + b[axis + 2] <= a[axis] + tolerance ? 1 : 0;
    readingOrderConfirmed &&= planned.length === ordered.length && ordered.every((frame, i) =>
      ordered.slice(i + 1).every((next, offset) => [0, 1].every(axis =>
        relation(frame.bounds, next.bounds, axis) === relation(planned[i], planned[i + offset + 1], axis))));
  }
  return {
    readingOrderConfirmed,
    readingOrderNote: readingOrderConfirmed ? '右から左、上から下の読み順です。'
      : 'コマの読み順を確認できません。番号は未確認です。画像で修正領域を選んでください。',
    frames: ordered.map(({ region }, index) => ({ index, panelNumber: readingOrderConfirmed ? index + 1 : null, region: { ...region } })),
  };
}

export async function readPanelStyleEditFrames(sourceDataUrl, count, options = {}) {
  if (!Number.isInteger(count) || count < 4 || count > 8) throw new RangeError('コマ数は4〜8で指定してください。');
  const { pixels } = await readPixels(sourceDataUrl);
  const regions = detectVariablePanelFrames(pixels, count);
  if (regions.length !== count) throw new Error('コマ枠を確定できません。元画像は変更していません。');
  const ordered = orderPanelStyleEditFrames(regions, pixels, options);
  const frames = [];
  for (const frame of ordered.frames) {
    frames.push({ ...frame, thumbnail: (await extractNativeImageRegion(sourceDataUrl, frame.region)).dataUrl });
  }
  return { sourceImage: sourceDataUrl, width: pixels.width, height: pixels.height, ...ordered, frames };
}

export async function preparePanelStyleEdit(sourceDataUrl, region, options = {}) {
  const { pixels } = await readPixels(sourceDataUrl);
  const plan = createPanelStyleEditPlan(pixels, region, options.requestedSize);
  const before = (await extractNativeImageRegion(sourceDataUrl, region)).dataUrl;
  const { image } = await readPixels(before);
  const { canvas, context } = canvasFor(plan.canvas.width, plan.canvas.height);
  context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, plan.editRegion.x, plan.editRegion.y);
  return { sourceImage: sourceDataUrl, plan, before,
    request: buildPanelStyleEditRequest(canvas.toDataURL('image/png'), plan, options) };
}

export async function composePanelStyleEdit(sourceDataUrl, returnedDataUrl, plan) {
  validatePlan(plan);
  const { pixels: original } = await readPixels(sourceDataUrl);
  if (original.width !== plan.page.width || original.height !== plan.page.height) throw new RangeError('元画像の寸法が修正開始時と一致しません。');
  const { pixels: returned } = await readPixels(returnedDataUrl);
  if (returned.width !== plan.canvas.width || returned.height !== plan.canvas.height) {
    throw new RangeError('返却画像の寸法が要求サイズと一致しません。元画像は変更していません。');
  }
  const after = (await extractNativeImageRegion(returnedDataUrl, plan.editRegion)).dataUrl;
  const { pixels: patch } = await readPixels(after);
  const result = composePanelPixels(original, patch, plan.region);
  const { canvas, context } = canvasFor(result.width, result.height);
  const output = context.createImageData(result.width, result.height);
  output.data.set(result.data); context.putImageData(output, 0, 0);
  const dataUrl = canvas.toDataURL('image/png');
  // Check the actual PNG round-trip as well, including alpha and canvas codecs.
  const { pixels: verified } = await readPixels(dataUrl);
  if (verified.width !== original.width || verified.height !== original.height) throw new RangeError('合成画像の寸法が元画像と一致しません。');
  const { x, y, width, height } = plan.region;
  for (let row = 0; row < result.height; row++) for (let column = 0; column < result.width; column++) {
    if (row >= y && row < y + height && column >= x && column < x + width) continue;
    const offset = (row * result.width + column) * 4;
    for (let channel = 0; channel < 4; channel++) {
      if (original.data[offset + channel] !== verified.data[offset + channel]) throw new Error('コマ外の画素一致を確認できません。元画像は変更していません。');
    }
  }
  return { dataUrl, width: result.width, height: result.height, after, outsidePixelsUnchanged: true };
}
