import { MANGA_MANUSCRIPT_STANDARD } from './manga-manuscript-format.js';
import { readRenderOptions } from './render-options.js';

// Normalize three page regions. The four-panel artwork is ONE region: never
// infer equal-height panels, redraw lettering, or discard the source image.
export const PAGE_LAYOUT = Object.freeze({
  // 1120:1584 reduces to 70:99, the exact 210:297 A4 paper ratio.
  width: MANGA_MANUSCRIPT_STANDARD.width, height: MANGA_MANUSCRIPT_STANDARD.height,
  titleHeight: 103, panelHeight: 1446,
  footerHeight: 35, inset: 7, titleInkHeight: 87,
});

export const scalePageLayout = (sourceHeight = PAGE_LAYOUT.height, { showTitle = true } = {}) => {
  const scale = sourceHeight / PAGE_LAYOUT.height;
  if (!Number.isFinite(scale) || scale <= 0) return null;
  const layout = Object.fromEntries(Object.entries(PAGE_LAYOUT)
    .map(([key, value]) => [key, Math.round(value * scale)]));
  if (!showTitle) {
    layout.titleHeight = layout.inset;
    layout.titleInkHeight = 0;
    layout.panelHeight = layout.height - layout.footerHeight - layout.titleHeight;
  }
  return Object.freeze(layout);
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

export const detectPageBands = (pixels, { showTitle = true, showWatermarks = true } = {}) => {
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
  if ((showTitle && !title) || (showWatermarks && !footer)) return null;
  return { canvas: { width, height }, title,
    panels: { x: panelLeft, y: top, width: panelRight - panelLeft, height: bottom - top }, panelFrames, footer };
};

export const buildPageDrawPlan = (bands, options = {}) => {
  if (!bands) return null;
  const layout = scalePageLayout(bands.canvas?.height ?? PAGE_LAYOUT.height, options);
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
    ...(options.showTitle === false ? [] : [contain(bands.title, 0, titleHeight, titleInkHeight, width * 0.9)]),
    ...panelPlans,
    ...(bands.footer ? [contain(bands.footer, titleHeight + panelHeight, footerHeight)] : []),
  ];
  plan.layout = layout;
  return plan;
};

export const normalizeMangaPage = async (dataUrl, options = {}) => {
  const image = new Image();
  image.src = dataUrl;
  await image.decode();
  const source = document.createElement('canvas');
  source.width = image.naturalWidth; source.height = image.naturalHeight;
  const sourceContext = source.getContext('2d', { willReadFrequently: true });
  if (!sourceContext) throw new Error('ページ配置用Canvasを初期化できません。');
  sourceContext.drawImage(image, 0, 0);
  const bands = detectPageBands(sourceContext.getImageData(0, 0, source.width, source.height), options);
  const plan = buildPageDrawPlan(bands, options);
  const layout = plan?.layout || scalePageLayout(source.height, options);
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

// Inspect the drawn rules; never infer frame geometry from the requested plan.
// Ambiguous/non-rectangular pages return no crops rather than fabricated bounds.
export const detectVariablePanelFrames = ({data,width,height},expectedCount,onDiagnostic) => {
  const diagnostic=typeof onDiagnostic==='function'?{width,height,paperThreshold:238,
    expectedCount:expectedCount??null,componentCount:0,components:[]}:null;
  const report=(reason,ambiguous=false,frameCount=0,resultCount=0)=>{
    if(!diagnostic)return;
    try {onDiagnostic({...diagnostic,omittedComponents:diagnostic.componentCount-diagnostic.components.length,
      ambiguous,frameCount,resultCount,reason});} catch { /* Diagnostics cannot interrupt image inspection. */ }
  };
  if(!width||!height||data?.length!==width*height*4){report('invalid_input');return [];}
  const size=width*height,seen=new Uint8Array(size),queue=new Uint32Array(size);
  const paper=i=>{const p=i*4;return data[p+3]<32||Math.min(data[p],data[p+1],data[p+2])>=238;};
  let head=0,tail=0;
  const exterior=i=>{if(!seen[i]&&paper(i)){seen[i]=1;queue[tail++]=i;}};
  for(let x=0;x<width;x++){exterior(x);exterior((height-1)*width+x);}
  for(let y=0;y<height;y++){exterior(y*width);exterior(y*width+width-1);}
  while(head<tail){
    const i=queue[head++],x=i%width;
    if(x)exterior(i-1);if(x+1<width)exterior(i+1);
    if(i>=width)exterior(i-width);if(i+width<size)exterior(i+width);
  }
  // Paper reachable from page edges includes the gutters. Its complement
  // contains the complete enclosed panels, including white areas inside them.
  const frames=[];
  let ambiguous=false;
  for(let seed=0;seed<size;seed++){
    if(seen[seed])continue;
    head=0;tail=1;queue[0]=seed;seen[seed]=2;
    let left=width,right=0,top=height,bottom=0;
    const visit=i=>{if(!seen[i]){seen[i]=2;queue[tail++]=i;}};
    while(head<tail){
      const i=queue[head++],x=i%width,y=Math.floor(i/width);
      left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);
      if(x)visit(i-1);if(x+1<width)visit(i+1);
      if(i>=width)visit(i-width);if(i+width<size)visit(i+width);
    }
    const w=right-left+1,h=bottom-top+1;
    const edgeCoverage=diagnostic?{}:null;
    const shapeEdgeCoverage=diagnostic?{}:null;
    let rectangular=false,strictAccepted=false,shapeFallbackAccepted=false;
    if(w>=width*.12&&h>=height*.075) {
      // A bridge between neighboring frames can have a rectangular bounding
      // box too. Require four continuous outer edges of THIS component before
      // treating its rectangle (or the remaining rectangles) as count evidence.
      const band=Math.max(1,Math.floor(Math.min(w,h)*.015));
      const covered=(length,pixel,edge)=>{
        let missing=0;
        const allowedMissing=Math.max(1,Math.floor(length*.002));
        for(let offset=0;offset<length;offset++) {
          let found=false;
          for(let depth=0;depth<=band;depth++) if(seen[pixel(offset,depth)]===2){found=true;break;}
          if(!found&&++missing>allowedMissing&&!diagnostic)return false;
        }
        if(diagnostic)edgeCoverage[edge]={missing,total:length,allowedMissing,coverage:Number((1-missing/length).toFixed(4))};
        return missing<=allowedMissing;
      };
      // Diagnostic mode measures all four edges, including those after the
      // first rejected edge. The acceptance thresholds remain identical.
      const edges=()=>[
        covered(w,(x,d)=>(top+d)*width+left+x,'top'),
        covered(w,(x,d)=>(bottom-d)*width+left+x,'bottom'),
        covered(h,(y,d)=>(top+y)*width+left+d,'left'),
        covered(h,(y,d)=>(top+y)*width+right-d,'right'),
      ].every(Boolean);
      const continuous=diagnostic?edges():null;
      strictAccepted=tail>=size*.012&&tail/(w*h)>=.7&&(diagnostic?continuous:edges());
      // Hand-drawn rules may slope slightly or round their corners. Require a
      // nearly full component and uninterrupted edges inside a bounded inset;
      // this tolerates drawing variation without bridging gaps or inventing crops.
      if(!strictAccepted&&tail>=size*.012&&tail/(w*h)>=.95) {
        const depthLimit=Math.max(1,Math.ceil(Math.min(w,h)*.03));
        const followsEdge=(length,pixel,edge)=>{
          // A sloped adjacent edge can end inside this corner square too.
          // Use the same bounded inset in both axes, never skip mid-edge gaps.
          const trim=depthLimit;
          let missing=0,maxDepth=0,maxRejectedDepth=0;
          for(let offset=trim;offset<length-trim;offset++) {
            let depth=0;
            while(depth<=depthLimit&&seen[pixel(offset,depth)]!==2)depth++;
            if(depth>depthLimit) {
              missing++;
              if(diagnostic) {
                const searchLimit=Math.floor(Math.min(w,h)*.1);
                while(depth<=searchLimit&&seen[pixel(offset,depth)]!==2)depth++;
                maxRejectedDepth=Math.max(maxRejectedDepth,depth);
              }
            }
            else maxDepth=Math.max(maxDepth,depth);
          }
          if(diagnostic)shapeEdgeCoverage[edge]={missing,total:length-2*trim,trim,depthLimit,maxDepth,maxRejectedDepth};
          return missing===0;
        };
        shapeFallbackAccepted=[
          followsEdge(w,(x,d)=>(top+d)*width+left+x,'top'),
          followsEdge(w,(x,d)=>(bottom-d)*width+left+x,'bottom'),
          followsEdge(h,(y,d)=>(top+y)*width+left+d,'left'),
          followsEdge(h,(y,d)=>(top+y)*width+right-d,'right'),
        ].every(Boolean);
      }
      rectangular=strictAccepted||shapeFallbackAccepted;
      if(rectangular)frames.push({x:left,y:top,width:w,height:h});
      else ambiguous=true;
    }
    if(diagnostic) {
      diagnostic.componentCount++;
      // Keep the largest 32 components: enough to expose merged frames while
      // bounding logs from title glyphs and leaked drawing fragments.
      if(diagnostic.components.length<32||tail>diagnostic.components.at(-1).area) {
        diagnostic.components.push({bbox:[left,top,w,h],area:tail,fill:Number((tail/(w*h)).toFixed(4)),
          edgeCoverage,shapeEdgeCoverage,strictAccepted,shapeFallbackAccepted,accepted:rectangular});
        diagnostic.components.sort((a,b)=>b.area-a.area);
        if(diagnostic.components.length>32)diagnostic.components.pop();
      }
    }
    // Distinguish previously visited ink from this component's edge evidence.
    for(let i=0;i<tail;i++)seen[queue[i]]=3;
  }
  const result=!ambiguous&&(expectedCount==null||frames.length===expectedCount)?frames:[];
  report(ambiguous?'ambiguous':expectedCount!=null&&frames.length!==expectedCount?'expected_count_mismatch':frames.length?'ok':'no_frames',ambiguous,frames.length,result.length);
  return result;
};

export const inspectVariablePanelFrames = async(dataUrl)=>{
  const image=new Image();image.src=dataUrl;await image.decode();
  const canvas=document.createElement('canvas');
  canvas.width=image.naturalWidth;canvas.height=image.naturalHeight;
  const context=canvas.getContext('2d',{willReadFrequently:true});
  if(!context)throw new Error('コマ枠の原寸検査を初期化できません。');
  context.drawImage(image,0,0);
  const onDiagnostic=import.meta.env?.DEV?report=>console.info('[PANEL FRAME DIAGNOSTIC]',JSON.stringify({...report,sourceLength:dataUrl.length})):undefined;
  return detectVariablePanelFrames(context.getImageData(0,0,canvas.width,canvas.height),undefined,onDiagnostic)
    .map(r=>({bounds:[r.x/canvas.width,r.y/canvas.height,r.width/canvas.width,r.height/canvas.height]}));
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

// Preserve native pixel positions, alpha and every neutral ink/paper value.
// This removes residual hue only; it does not threshold or retone the drawing.
export const neutralizeMonochromePixels = ({ data, width, height } = {}) => {
  if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height) || width < 1 || height < 1
    || data?.length !== width * height * 4) throw new RangeError('原寸RGBA画素と画像寸法が一致しません。');
  const output = new Uint8ClampedArray(data);
  let changedPixels = 0;
  for (let i = 0; i < output.length; i += 4) {
    const r = output[i], g = output[i+1], b = output[i+2];
    if (r === g && g === b) continue;
    const neutral = Math.round(r * .2126 + g * .7152 + b * .0722);
    output[i] = output[i+1] = output[i+2] = neutral;
    changedPixels++;
  }
  return { width, height, data: output, changedPixels };
};

export const neutralizeNativeMonochromeImage = async dataUrl => {
  const image = new Image(); image.src = dataUrl; await image.decode();
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('白黒画像の色成分を処理できません。');
  context.imageSmoothingEnabled = false; context.drawImage(image, 0, 0);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  const result = neutralizeMonochromePixels(pixels);
  if (result.changedPixels) { pixels.data.set(result.data); context.putImageData(pixels, 0, 0); }
  return { dataUrl: result.changedPixels ? canvas.toDataURL('image/png') : dataUrl,
    width: result.width, height: result.height, changedPixels: result.changedPixels };
};

export const finalizeMonochromeCandidate = async (candidate, colorMode, normalize = neutralizeNativeMonochromeImage) => {
  if (colorMode !== 'monochrome') return candidate;
  const source = `data:${candidate.mimeType || 'image/png'};base64,${candidate.base64Img}`;
  const result = await normalize(source);
  if (!result.changedPixels) return candidate;
  const match = result.dataUrl.match(/^data:image\/png;base64,(.+)$/s);
  if (!match) throw new Error('白黒仕上げ画像の形式が不正です。');
  const receipt = { changedPixels: result.changedPixels, width: result.width, height: result.height };
  return { ...candidate, base64Img: match[1], mimeType: 'image/png', originalImage: candidate.originalImage || source,
    monochromeNormalization: receipt,
    ...(candidate.metadataContext ? { metadataContext: { ...candidate.metadataContext,
      settings: { ...candidate.metadataContext.settings, monochrome_finish: receipt } } } : {}) };
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
  const bands = detectPageBands(context.getImageData(0, 0, source.width, source.height), { showTitle: false, showWatermarks: false });
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
  return `[ページ配置] ${layout.width}×${layout.height}へ自動補正してから表示します。${layout.titleInkHeight === 0 ? '上余白' : 'タイトル'}${layout.titleHeight}px・コマ全体${layout.panelHeight}px・フッター${layout.footerHeight}px。元のAPI画像も保持しました。`;
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
    const result = await normalize(originalImage, candidate.renderOptions || readRenderOptions(candidate.metadataContext?.finalPrompt));
    if (!result.applied) return { ...candidate, pageLayout: result };
    const match = result.dataUrl?.match(/^data:image\/png;base64,([\s\S]+)$/);
    if (!match) throw new Error('ページ配置後のPNGを読み取れません。');
    return { ...candidate, base64Img: match[1], mimeType: 'image/png', originalImage,
      pageLayout: { applied: true, layout: result.layout } };
  } catch (error) {
    return { ...candidate, pageLayout: { applied: false, reason: error.message } };
  }
};
