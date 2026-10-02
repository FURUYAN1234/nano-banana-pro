import { MANGA_MANUSCRIPT_STANDARD } from './manga-manuscript-format.js';

// Normalize three page regions. The four-panel artwork is ONE region: never
// infer equal-height panels, redraw lettering, or discard the source image.
export const PAGE_LAYOUT = Object.freeze({
  // 1120:1584 reduces to 70:99, the exact 210:297 A4 paper ratio.
  width: MANGA_MANUSCRIPT_STANDARD.width, height: MANGA_MANUSCRIPT_STANDARD.height,
  titleHeight: 103, panelHeight: 1446,
  footerHeight: 35, inset: 7, titleInkHeight: 87,
});

export const scalePageLayout = (sourceHeight = PAGE_LAYOUT.height) => {
  const scale = sourceHeight / PAGE_LAYOUT.height;
  if (!Number.isFinite(scale) || scale <= 0) return null;
  return Object.freeze(Object.fromEntries(Object.entries(PAGE_LAYOUT)
    .map(([key, value]) => [key, Math.round(value * scale)])));
};

const isInk = (data, offset, threshold) => data[offset + 3] >= 200
  && (data[offset] * 0.2126 + data[offset + 1] * 0.7152 + data[offset + 2] * 0.0722) < threshold;

const contentBounds = ({ data, width }, top, bottom, scanLeft = 0, scanRight = width) => {
  let left = scanRight, right = -1, first = bottom, last = -1;
  for (let y = top; y < bottom; y++) for (let x = scanLeft; x < scanRight; x++) {
    if (!isInk(data, (y * width + x) * 4, 242)) continue;
    left = Math.min(left, x); right = Math.max(right, x);
    first = Math.min(first, y); last = y;
  }
  return right < left ? null : { x: left, y: first, width: right - left + 1, height: last - first + 1 };
};

export const detectPageBands = (pixels) => {
  const { data, width, height } = pixels;
  if (!width || !height || data.length !== width * height * 4) return null;
  const groups = [];
  for (let y = 0; y < height; y++) {
    let run = 0, longest = 0, longestStart = 0, longestEnd = -1;
    for (let x = 0; x < width; x++) {
      run = isInk(data, (y * width + x) * 4, 96) ? run + 1 : 0;
      if (run > longest) {
        longest = run;
        longestStart = x - run + 1;
        longestEnd = x;
      }
    }
    if (longest < width * 0.68) continue;
    const previous = groups.at(-1);
    if (previous && y === previous.bottom + 1) {
      previous.bottom = y;
      previous.left = Math.min(previous.left, longestStart);
      previous.right = Math.max(previous.right, longestEnd);
    } else groups.push({ top: y, bottom: y, left: longestStart, right: longestEnd });
  }
  // Four substantial spaces between frame rules. Small spaces are gutters;
  // shared borders are valid. Height equality is deliberately NOT required.
  const interiors = groups.slice(1).flatMap((group, index) => {
    const previous = groups[index];
    return group.top - previous.bottom >= height * 0.075
      ? [{ top: previous.top, bottom: group.bottom }] : [];
  });
  if (interiors.length !== 4) return null;
  // Keep the antialiased outside of frame strokes with the artwork, not with
  // the title or footer; this avoids detached grey rules in those regions.
  const fringe = Math.max(1, Math.round(height / 768));
  const top = Math.max(0, interiors[0].top - fringe);
  const bottom = Math.min(height, interiors.at(-1).bottom + 1 + fringe);
  if (top > height * 0.25 || bottom < height * 0.7) return null;
  // Use the outer frame rules for horizontal bounds. This removes only page
  // whitespace outside the frame while retaining every panel and gutter as a
  // single variable-height artwork block.
  const panelGroups = groups.filter((group) => group.bottom >= interiors[0].top
    && group.top <= interiors.at(-1).bottom);
  const panelLeft = Math.max(0, Math.min(...panelGroups.map((group) => group.left)) - fringe);
  const panelRight = Math.min(width, Math.max(...panelGroups.map((group) => group.right)) + 1 + fringe);
  const panelFrames = interiors.map(interior => {
    const y = Math.max(0, interior.top - fringe);
    const bottom = Math.min(height, interior.bottom + 1 + fringe);
    return { x: panelLeft, y, width: panelRight - panelLeft, height: bottom - y };
  });
  // Some image models put the title inside an unwanted rectangular box. If
  // two aligned long rules enclose the title, scan only their interior so the
  // model-rendered glyphs survive while the box itself is omitted.
  const titleRules = groups.filter((group) => group.bottom < top);
  const titleFrames = [];
  for (let index = 0; index < titleRules.length; index += 1) {
    for (let next = index + 1; next < titleRules.length; next += 1) {
      const upper = titleRules[index], lower = titleRules[next];
      const aligned = Math.abs(upper.left - lower.left) <= width * 0.03
        && Math.abs(upper.right - lower.right) <= width * 0.03;
      if (aligned && lower.top - upper.bottom >= height * 0.02) titleFrames.push({ upper, lower });
    }
  }
  const titleFrame = titleFrames.sort((a, b) => (b.lower.top - b.upper.bottom) - (a.lower.top - a.upper.bottom))[0];
  const title = titleFrame
    ? contentBounds(pixels, titleFrame.upper.bottom + 1 + fringe, titleFrame.lower.top - fringe,
      Math.max(0, Math.max(titleFrame.upper.left, titleFrame.lower.left) + fringe),
      Math.min(width, Math.min(titleFrame.upper.right, titleFrame.lower.right) + 1 - fringe))
    : contentBounds(pixels, 0, top);
  const footer = contentBounds(pixels, bottom, height);
  if (!title || !footer) return null;
  return { canvas: { width, height }, title,
    panels: { x: panelLeft, y: top, width: panelRight - panelLeft, height: bottom - top }, panelFrames, footer };
};

export const buildPageDrawPlan = (bands) => {
  if (!bands) return null;
  const layout = scalePageLayout(bands.canvas?.height ?? PAGE_LAYOUT.height);
  if (!layout) return null;
  const { width, titleHeight, panelHeight, footerHeight, inset, titleInkHeight } = layout;
  const safeWidth = width - 2 * inset;
  const contain = (source, y, bandHeight, maxHeight = bandHeight - 2 * inset, maxWidth = safeWidth) => {
    const scale = Math.min(maxWidth / source.width, maxHeight / source.height);
    const drawnWidth = source.width * scale, drawnHeight = source.height * scale;
    return { source, destination: { x: (width - drawnWidth) / 2, y: y + (bandHeight - drawnHeight) / 2, width: drawnWidth, height: drawnHeight } };
  };
  const panelScale = panelHeight / bands.panels.height;
  if (!Number.isFinite(panelScale)) return null;
  let panelPlans;
  if (bands.panels.width * panelScale <= safeWidth) {
    panelPlans = [{ source: bands.panels, destination: { x: (width - bands.panels.width * panelScale) / 2, y: titleHeight, width: bands.panels.width * panelScale, height: panelHeight } }];
  } else {
    // A slightly wide model page used to fall back to containing the whole
    // source, preserving huge outer margins and even an unwanted title box.
    // Scale each detected panel uniformly to the safe width and put the small
    // remaining vertical slack only into the three white gutters.
    if (!Array.isArray(bands.panelFrames) || bands.panelFrames.length !== 4) return null;
    const widthScale = safeWidth / bands.panels.width;
    const heights = bands.panelFrames.map(frame => frame.height * widthScale);
    const remaining = panelHeight - heights.reduce((sum, value) => sum + value, 0);
    if (!Number.isFinite(widthScale) || widthScale <= 0 || remaining < 0) return null;
    const gutter = remaining / 3;
    let y = titleHeight;
    panelPlans = bands.panelFrames.map((frame, index) => {
      const destination = { x: (width - frame.width * widthScale) / 2, y, width: frame.width * widthScale, height: frame.height * widthScale };
      y += destination.height + (index < 3 ? gutter : 0);
      return { source: frame, destination };
    });
  }
  const plan = [
    contain(bands.title, 0, titleHeight, titleInkHeight, width * 0.9),
    ...panelPlans,
    contain(bands.footer, titleHeight + panelHeight, footerHeight),
  ];
  plan.layout = layout;
  return plan;
};

export const normalizeMangaPage = async (dataUrl) => {
  const image = new Image();
  image.src = dataUrl;
  await image.decode();
  const source = document.createElement('canvas');
  source.width = image.naturalWidth; source.height = image.naturalHeight;
  const sourceContext = source.getContext('2d', { willReadFrequently: true });
  if (!sourceContext) throw new Error('ページ配置用Canvasを初期化できません。');
  sourceContext.drawImage(image, 0, 0);
  const bands = detectPageBands(sourceContext.getImageData(0, 0, source.width, source.height));
  const plan = buildPageDrawPlan(bands);
  const layout = plan?.layout || scalePageLayout(source.height);
  const canvas = document.createElement('canvas');
  canvas.width = layout.width; canvas.height = layout.height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('ページ配置用Canvasを初期化できません。');
  context.fillStyle = '#fff'; context.fillRect(0, 0, canvas.width, canvas.height);
  context.imageSmoothingEnabled = true; context.imageSmoothingQuality = 'high';
  if (plan) {
    for (const { source: from, destination: to } of plan) {
      context.drawImage(image, from.x, from.y, from.width, from.height, to.x, to.y, to.width, to.height);
    }
  } else {
    // Detection can fail on unusual model artwork. The completed page must
    // still leave the app as an A4 manuscript without cropping or distortion.
    const scale = Math.min(canvas.width / source.width, canvas.height / source.height);
    const width = source.width * scale, height = source.height * scale;
    context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
  }
  return { applied: true, dataUrl: canvas.toDataURL('image/png'), bands, plan, layout,
    mode: plan ? 'band-layout' : 'contained-source' };
};

export const inspectImageDimensions = async (dataUrl) => {
  const image = new Image();
  image.src = dataUrl;
  await image.decode();
  return { width: image.naturalWidth, height: image.naturalHeight };
};

// Read-only chroma evidence, not a grayscale conversion or a manuscript-quality
// verdict. Neutral antialiasing is allowed; sparse colored dots/lines are not a
// broad color area. Bounds and samples always refer to the supplied native grid.
export const analyzeNativeMonochromeChroma = ({ data, width, height } = {}) => {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1
    || data?.length !== width * height * 4) throw new RangeError('原寸RGBA画素と画像寸法が一致しません。');
  const count = width * height;
  const mask = new Uint8Array(count);
  let coloredPixels = 0, maxChannelDifference = 0;
  for (let i = 0; i < count; i++) {
    const offset = i * 4;
    if (data[offset + 3] < 200) continue;
    const difference = Math.max(data[offset], data[offset + 1], data[offset + 2])
      - Math.min(data[offset], data[offset + 1], data[offset + 2]);
    maxChannelDifference = Math.max(maxChannelDifference, difference);
    if (difference > 8) { mask[i] = 1; coloredPixels++; }
  }
  let region = null;
  const stack = new Uint32Array(coloredPixels);
  for (let start = 0; start < count; start++) {
    if (mask[start] !== 1) continue;
    let pending = 1, area = 0, left = width, right = 0, top = height, bottom = 0;
    stack[0] = start; mask[start] = 2;
    while (pending) {
      const index = stack[--pending], x = index % width, y = Math.floor(index / width);
      area++; left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y);
      if (x > 0 && mask[index - 1] === 1) { mask[index - 1] = 2; stack[pending++] = index - 1; }
      if (x + 1 < width && mask[index + 1] === 1) { mask[index + 1] = 2; stack[pending++] = index + 1; }
      if (y > 0 && mask[index - width] === 1) { mask[index - width] = 2; stack[pending++] = index - width; }
      if (y + 1 < height && mask[index + width] === 1) { mask[index + width] = 2; stack[pending++] = index + width; }
    }
    const bounds = { x: left, y: top, width: right - left + 1, height: bottom - top + 1 };
    const fraction = area / (bounds.width * bounds.height);
    // Require a filled two-dimensional component, not its bounding box alone.
    if (bounds.width >= 16 && bounds.height >= 16 && area >= 256 && fraction >= 0.5
      && (!region || area > region.coloredPixels)) {
      region = { bounds, coloredPixels: area, coloredFraction: fraction,
        sampleRgb: Array.from(data.slice(start * 4, start * 4 + 3)) };
    }
  }
  return { status: region ? 'detected' : 'not_detected', width, height, coloredPixels,
    coloredFraction: coloredPixels / count, maxChannelDifference, region };
};

export const inspectNativeMonochromeChroma = async (dataUrl) => {
  const image = new Image();
  image.src = dataUrl;
  await image.decode();
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('原寸RGB検査用Canvasを初期化できません。');
  context.imageSmoothingEnabled = false;
  context.drawImage(image, 0, 0);
  return analyzeNativeMonochromeChroma(context.getImageData(0, 0, canvas.width, canvas.height));
};

// Sampling evidence must not acquire interpolation artefacts from the preview.
export const extractNativeImageRegion = async (dataUrl, region) => {
  const { x, y, width, height } = region || {};
  if (![x, y, width, height].every(Number.isInteger) || x < 0 || y < 0 || width < 1 || height < 1) {
    throw new RangeError('原寸領域は正しい整数pixelで指定してください。');
  }
  const image = new Image();
  image.src = dataUrl;
  await image.decode();
  if (x + width > image.naturalWidth || y + height > image.naturalHeight) {
    throw new RangeError('原寸領域が画像の外へ出ています。');
  }
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('原寸画像を切り出せません。');
  context.imageSmoothingEnabled = false;
  context.drawImage(image, x, y, width, height, 0, 0, width, height);
  return { dataUrl: canvas.toDataURL('image/png'), x, y, width, height, scale: 1 };
};

const hasA4PageRatio = ({ width, height } = {}) => Number.isFinite(width)
  && Number.isFinite(height) && width > 0 && height > 0
  && Math.abs(width - (height * PAGE_LAYOUT.width / PAGE_LAYOUT.height)) <= 1;

export const extractMangaPanelCrops = async (dataUrl) => {
  const image = new Image();
  image.src = dataUrl;
  await image.decode();
  const source = document.createElement('canvas');
  source.width = image.naturalWidth; source.height = image.naturalHeight;
  const context = source.getContext('2d', { willReadFrequently: true });
  if (!context) return [];
  context.drawImage(image, 0, 0);
  const bands = detectPageBands(context.getImageData(0, 0, source.width, source.height));
  if (!bands?.panelFrames?.length) return [];
  return bands.panelFrames.map(frame => {
    const scale = Math.min(2, 1536 / frame.width);
    const crop = document.createElement('canvas');
    crop.width = Math.round(frame.width * scale);
    crop.height = Math.round(frame.height * scale);
    const cropContext = crop.getContext('2d');
    if (!cropContext) return '';
    cropContext.imageSmoothingEnabled = true;
    cropContext.imageSmoothingQuality = 'high';
    cropContext.drawImage(image, frame.x, frame.y, frame.width, frame.height, 0, 0, crop.width, crop.height);
    return crop.toDataURL('image/png');
  }).filter(Boolean);
};

export const formatPageLayoutStatus = (pageLayout) => {
  if (!pageLayout?.applied) {
    return `[ページ配置] 未適用：${pageLayout?.reason || '配置情報を確認できません。'} 元画像を保持します。`;
  }
  if (pageLayout.mode === 'already-a4') {
    return `[ページ配置] ${pageLayout.width}×${pageLayout.height}はA4比率のため、再処理せずそのまま表示します。`;
  }
  const layout = pageLayout.layout;
  if (!layout) return '[ページ配置] 配置の詳細は未確認です。画像は保持します。';
  return `[ページ配置] ${layout.width}×${layout.height}へ自動補正してから表示します。タイトル${layout.titleHeight}px・コマ全体${layout.panelHeight}px・フッター${layout.footerHeight}px。元のAPI画像も保持しました。`;
};

export const normalizePageCandidate = async (
  candidate,
  normalize = normalizeMangaPage,
  inspect = inspectImageDimensions,
) => {
  if (candidate.pageLayout?.applied) return candidate;
  const originalImage = `data:${candidate.mimeType || 'image/png'};base64,${candidate.base64Img}`;
  try {
    const dimensions = await inspect(originalImage);
    if (hasA4PageRatio(dimensions)) {
      return { ...candidate, pageLayout: {
        applied: true, mode: 'already-a4', width: dimensions.width, height: dimensions.height,
      } };
    }
  } catch {
    // The normalizer below owns the actionable decode error and reason.
  }
  try {
    const result = await normalize(originalImage);
    if (!result.applied) return { ...candidate, pageLayout: result };
    const match = result.dataUrl?.match(/^data:image\/png;base64,([\s\S]+)$/);
    if (!match) throw new Error('ページ配置後のPNGを読み取れません。');
    return { ...candidate, base64Img: match[1], mimeType: 'image/png', originalImage,
      pageLayout: { applied: true, layout: result.layout } };
  } catch (error) {
    return { ...candidate, pageLayout: { applied: false, reason: error.message } };
  }
};
