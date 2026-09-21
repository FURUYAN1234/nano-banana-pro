// Normalize three page regions. The four-panel artwork is ONE region: never
// infer equal-height panels, redraw lettering, or discard the source image.
export const PAGE_LAYOUT = Object.freeze({
  width: 1024, height: 1536, titleHeight: 100, panelHeight: 1402,
  footerHeight: 34, inset: 6, titleInkHeight: 84,
});

export const scalePageLayout = (sourceWidth = PAGE_LAYOUT.width) => {
  const scale = sourceWidth / PAGE_LAYOUT.width;
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
  const layout = scalePageLayout(bands.canvas?.width ?? bands.panels.width);
  if (!layout) return null;
  const { width, titleHeight, panelHeight, footerHeight, inset, titleInkHeight } = layout;
  const safeWidth = width - 2 * inset;
  const panelScale = panelHeight / bands.panels.height;
  // Fitting both fixed height and safe width must not distort or crop artwork.
  if (!Number.isFinite(panelScale) || bands.panels.width * panelScale > safeWidth) return null;
  const contain = (source, y, bandHeight, maxHeight = bandHeight - 2 * inset, maxWidth = safeWidth) => {
    const scale = Math.min(maxWidth / source.width, maxHeight / source.height);
    const drawnWidth = source.width * scale, drawnHeight = source.height * scale;
    return { source, destination: { x: (width - drawnWidth) / 2, y: y + (bandHeight - drawnHeight) / 2, width: drawnWidth, height: drawnHeight } };
  };
  const plan = [
    contain(bands.title, 0, titleHeight, titleInkHeight, width * 0.9),
    { source: bands.panels, destination: { x: (width - bands.panels.width * panelScale) / 2, y: titleHeight, width: bands.panels.width * panelScale, height: panelHeight } },
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
  if (!plan) return { applied: false, reason: bands ? '固定領域に縦横比を保ったまま収まりません。' : 'タイトル・4コマ全体・フッターの境界を確定できません。' };
  const canvas = document.createElement('canvas');
  canvas.width = plan.layout.width; canvas.height = plan.layout.height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('ページ配置用Canvasを初期化できません。');
  context.fillStyle = '#fff'; context.fillRect(0, 0, canvas.width, canvas.height);
  context.imageSmoothingEnabled = true; context.imageSmoothingQuality = 'high';
  for (const { source: from, destination: to } of plan) {
    context.drawImage(image, from.x, from.y, from.width, from.height, to.x, to.y, to.width, to.height);
  }
  return { applied: true, dataUrl: canvas.toDataURL('image/png'), bands, plan, layout: plan.layout };
};

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

export const normalizePageCandidate = async (candidate, normalize = normalizeMangaPage) => {
  if (candidate.pageLayout?.applied) return candidate;
  const originalImage = `data:${candidate.mimeType || 'image/png'};base64,${candidate.base64Img}`;
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
