import assert from 'node:assert/strict';
import test from 'node:test';
import { PAGE_LAYOUT, detectPageBands, detectVariablePanelFrames, buildPageDrawPlan, normalizePageCandidate, scalePageLayout } from '../src/lib/manga-page-layout.js';
import * as pagePixels from '../src/lib/manga-page-layout.js';

test('monochrome finishing removes only chroma, retains geometry/alpha/neutral tones, and never processes color candidates', async () => {
  const data = new Uint8ClampedArray([255,255,255,255, 0,0,0,255, 127,127,127,255, 180,160,170,200]);
  const original = data.slice();
  const result = pagePixels.neutralizeMonochromePixels({width:2,height:2,data});
  assert.deepEqual(data,original);
  assert.deepEqual([result.width,result.height,result.changedPixels],[2,2,1]);
  assert.deepEqual([...result.data.slice(0,12)],[...data.slice(0,12)]);
  assert.deepEqual([...result.data.slice(12)],[165,165,165,200]);
  for(let i=0;i<result.data.length;i+=4) assert.equal(result.data[i],result.data[i+2]);
  const source={base64Img:'YWJj',mimeType:'image/png',modelId:'image-model'};
  let calls=0;
  const normalize=async()=>{calls++;return {dataUrl:'data:image/png;base64,ZGVm',changedPixels:1,width:2,height:2};};
  assert.equal(await pagePixels.finalizeMonochromeCandidate(source,'color',normalize),source);
  assert.equal(calls,0,'color must bypass even decoding');
  const mono=await pagePixels.finalizeMonochromeCandidate(source,'monochrome',normalize);
  assert.equal(calls,1); assert.equal(mono.base64Img,'ZGVm'); assert.equal(mono.modelId,'image-model');
  assert.equal(mono.originalImage,'data:image/png;base64,YWJj');
});

test('slightly sloped borders and rounded corners retain real frames without accepting a deep notch',()=>{
  const width=1000,height=1400;
  const make=(notch=false,tilt=8)=>{
    const data=new Uint8ClampedArray(width*height*4).fill(255);
    for(const [left,top] of [[20,40],[510,40],[20,460],[510,460],[20,880],[510,880]]) {
      const w=470,h=380,radius=9;
      const inside=(x,y)=>{
        if(x<0||x>=w||y<0||y>=h-Math.floor(x/w*tilt))return false;
        if(notch&&left===20&&top===460&&x>180&&x<280&&y<32)return false;
        const cx=Math.max(radius,Math.min(w-1-radius,x));
        const cy=Math.max(radius,Math.min(h-1-radius,y));
        return (x-cx)**2+(y-cy)**2<=radius**2;
      };
      for(let y=0;y<h;y++)for(let x=0;x<w;x++) {
        if(!inside(x,y)||inside(x-3,y)&&inside(x+3,y)&&inside(x,y-3)&&inside(x,y+3))continue;
        const p=((top+y)*width+left+x)*4;data[p]=data[p+1]=data[p+2]=0;
      }
    }
    return {data,width,height};
  };
  const diagnostics=[];
  const frames=detectVariablePanelFrames(make(),undefined,d=>diagnostics.push(d));
  assert.equal(frames.length,6,'drawn border variation is not a missing panel');
  assert.deepEqual(frames,detectVariablePanelFrames(make()));
  assert.ok(diagnostics[0].components.some(c=>c.shapeFallbackAccepted));
  assert.equal(detectVariablePanelFrames(make(false,13)).length,6,'fractional pixel envelope rounds outward');
  assert.deepEqual(detectVariablePanelFrames(make(true)),[],'a material inward notch stays ambiguous');
});

test('optional frame diagnostics explain rejection without changing detection or exposing pixels',()=>{
  const width=200,height=240,data=new Uint8ClampedArray(width*height*4).fill(255);
  const ink=(x,y)=>{const p=(y*width+x)*4;data[p]=data[p+1]=data[p+2]=0;};
  for(const [left,top] of [[10,20],[110,20],[10,130],[110,130]]) {
    for(let y=top;y<top+90;y++)for(let x=left;x<left+80;x++) {
      if(x<left+2||x>=left+78||y<top+2||y>=top+88)ink(x,y);
    }
  }
  const inspect=(pixels,expectedCount)=>{
    const reports=[];
    const actual=detectVariablePanelFrames(pixels,expectedCount,report=>reports.push(report));
    assert.deepEqual(actual,detectVariablePanelFrames(pixels,expectedCount));
    assert.equal(reports.length,1);
    assert.equal(Object.hasOwn(reports[0],'data'),false);
    assert.equal(reports[0].resultCount,actual.length);
    return reports[0];
  };
  const valid=inspect({data,width,height});
  assert.equal(valid.reason,'ok');assert.equal(valid.frameCount,4);assert.equal(valid.ambiguous,false);
  assert.equal(valid.componentCount,4);assert.equal(valid.paperThreshold,238);
  assert.deepEqual(valid.components[0].bbox,[10,20,80,90]);
  assert.equal(valid.components[0].area,7200);assert.equal(valid.components[0].fill,1);
  assert.ok(Object.values(valid.components[0].edgeCoverage).every(edge=>edge.coverage===1&&edge.missing===0));
  const mismatch=inspect({data,width,height},5);
  assert.equal(mismatch.reason,'expected_count_mismatch');assert.equal(mismatch.frameCount,4);
  for(let y=60;y<62;y++)for(let x=88;x<112;x++)ink(x,y);
  const joined=inspect({data,width,height});
  assert.equal(joined.reason,'ambiguous');assert.equal(joined.ambiguous,true);assert.equal(joined.frameCount,2);
  assert.ok(joined.components.some(component=>component.accepted===false&&Object.values(component.edgeCoverage).some(edge=>edge.missing>edge.allowedMissing)));
  const blank=inspect({data:new Uint8ClampedArray(data.length).fill(255),width,height});
  assert.equal(blank.reason,'no_frames');assert.equal(blank.componentCount,0);
  assert.equal(inspect({data,width:0,height}).reason,'invalid_input');
  assert.doesNotThrow(()=>detectVariablePanelFrames({data,width,height},undefined,()=>{throw new Error('diagnostic sink unavailable');}));
});

test('independent frame observation retains clear count mismatches but rejects connected or incomplete candidates',()=>{
  const width=400,height=600;
  const frames=[[10,30,180,120],[210,30,180,120],[10,165,180,120],[210,165,180,120],[10,300,180,120],[210,300,180,120],[10,435,380,130]];
  const fixture=count=>{
    const data=new Uint8ClampedArray(width*height*4).fill(255);
    for(const [x,y,w,h] of frames.slice(0,count)) for(let dy=0;dy<h;dy++) for(let dx=0;dx<w;dx++) {
      if(dx>2&&dx<w-3&&dy>2&&dy<h-3)continue;
      const pos=((y+dy)*width+x+dx)*4;data[pos]=data[pos+1]=data[pos+2]=0;
    }
    return data;
  };
  for(const count of [6,7]) assert.equal(detectVariablePanelFrames({data:fixture(count),width,height}).length,count,'observed geometry must not depend on requested count');
  const withSmallMark=fixture(6);
  for(let y=7;y<11;y++)for(let x=15;x<25;x++){const p=(y*width+x)*4;withSmallMark[p]=withSmallMark[p+1]=withSmallMark[p+2]=0;}
  assert.equal(detectVariablePanelFrames({data:withSmallMark,width,height}).length,6,'small title/footer marks are not extra panels');
  const connected=fixture(7);
  for(let y=75;y<78;y++)for(let x=180;x<225;x++){const p=(y*width+x)*4;connected[p]=connected[p+1]=connected[p+2]=0;}
  assert.deepEqual(detectVariablePanelFrames({data:connected,width,height}),[],'connected neighboring panels do not certify a lower count');
  const rectangularJoin=fixture(6);
  for(const top of [30,147])for(let y=top;y<top+3;y++)for(let x=180;x<225;x++) {
    const p=(y*width+x)*4;rectangularJoin[p]=rectangularJoin[p+1]=rectangularJoin[p+2]=0;
  }
  assert.equal(detectVariablePanelFrames({data:rectangularJoin,width,height}).length,5,'closed merged components can undercount real panels; collection is not proof of total count');
  assert.deepEqual(detectVariablePanelFrames({data:rectangularJoin,width,height},6),[],'the legacy exact-count sampler stays fail-closed');
  const incomplete=fixture(7);
  for(let y=435;y<438;y++)for(let x=80;x<130;x++){const p=(y*width+x)*4;incomplete[p]=incomplete[p+1]=incomplete[p+2]=255;}
  assert.deepEqual(detectVariablePanelFrames({data:incomplete,width,height}),[],'an open missing boundary must not certify the remaining six panels');
  assert.deepEqual(detectVariablePanelFrames({data:new Uint8ClampedArray(width*height*4).fill(255),width,height}),[]);
});

test('variable frame sampling follows drawn unequal widths and spanning panels, never equal divisions',()=>{
  for(const frames of [
    [[10,30,230,150],[245,30,145,150],[10,185,380,170],[10,360,180,200],[195,360,195,200]],
    [[10,30,380,140],[10,175,180,385],[195,175,195,180],[195,360,195,200]],
  ]) {
    const width=400,height=600,data=new Uint8ClampedArray(width*height*4).fill(255);
    for(const [x,y,w,h] of frames) for(let dy=0;dy<h;dy++) for(let dx=0;dx<w;dx++) {
      if(dx>2&&dx<w-3&&dy>2&&dy<h-3) continue;
      const pos=((y+dy)*width+x+dx)*4;data[pos]=data[pos+1]=data[pos+2]=0;
    }
    const detected=detectVariablePanelFrames({data,width,height},frames.length);
    assert.equal(detected.length,frames.length);
    for(const [x,y,w,h] of frames) assert.ok(detected.some(r=>Math.abs(r.x-x)<8&&Math.abs(r.y-y)<8&&Math.abs(r.width-w)<12&&Math.abs(r.height-h)<12));
    assert.deepEqual(detectVariablePanelFrames({data,width,height},frames.length+1),[],'never fabricate a missing frame');
    // A heavy crossing drawing can connect neighboring frames. Refuse to
    // invent a boundary through that connected artwork.
    const joined=data.slice();
    for(let y=100;y<103;y++) for(let x=180;x<300;x++) {
      const offset=(y*width+x)*4;joined[offset]=joined[offset+1]=joined[offset+2]=0;
    }
    if(frames.length===5)assert.deepEqual(detectVariablePanelFrames({data:joined,width,height},frames.length),[]);
    assert.deepEqual(detectVariablePanelFrames({data:new Uint8ClampedArray(width*height*4).fill(255),width,height},frames.length),[]);
  }
});

const fixture = (rows = [80, 435, 442, 744, 750, 1070, 1078, 1498]) => {
  const width = 128, height = 1536;
  const data = new Uint8ClampedArray(width * height * 4).fill(255);
  const ink = (x, y) => { const i = (y * width + x) * 4; data[i] = data[i + 1] = data[i + 2] = 0; };
  for (const y of rows) for (let x = 2; x < width - 2; x++) ink(x, y);
  for (let y = 10; y < 65; y++) for (let x = 20; x < 110; x++) ink(x, y);
  for (let y = 1510; y < 1524; y++) for (let x = 3; x < 125; x++) ink(x, y);
  return { data, width, height };
};

const liveSizeFixture = () => {
  const width = 1536, height = 2304;
  const data = new Uint8ClampedArray(width * height * 4).fill(255);
  const ink = (x, y) => { const i = (y * width + x) * 4; data[i] = data[i + 1] = data[i + 2] = 0; };
  for (const y of [129, 595, 614, 1096, 1114, 1600, 1623, 2237]) {
    for (let x = 15; x <= 1521; x++) ink(x, y);
  }
  for (let y = 9; y <= 125; y++) for (let x = 369; x <= 1165; x++) ink(x, y);
  for (let y = 2256; y <= 2281; y++) for (let x = 25; x <= 1508; x++) ink(x, y);
  return { data, width, height };
};

const framedTitleFixture = () => {
  const pixels = fixture([80, 420, 790, 1110, 1498]);
  const { data, width } = pixels;
  const ink = (x, y) => { const i = (y * width + x) * 4; data[i] = data[i + 1] = data[i + 2] = 0; };
  data.fill(255, 0, 80 * width * 4);
  for (const y of [4, 70]) for (let x = 8; x < width - 8; x++) ink(x, y);
  for (let y = 4; y <= 70; y++) for (const x of [8, width - 9]) ink(x, y);
  // Model-rendered title glyph block inside the unwanted rectangle.
  for (let y = 20; y < 56; y++) for (let x = 28; x < 100; x++) ink(x, y);
  return pixels;
};

test('detects the whole variable-height panel block, keeping title and footer separate', () => {
  const bands = detectPageBands(fixture());
  assert.equal(bands.panels.y, 78);
  assert.equal(bands.panels.height, 1423);
  assert.equal(bands.title.y, 10);
  assert.equal(bands.footer.y, 1510);
  assert.deepEqual(bands.panelFrames.map(frame => [frame.y, frame.height]), [
    [78, 360], [440, 307], [748, 325], [1076, 425],
  ]);
});

test('shared borders and different individual heights do not require eight grid lines', () => {
  assert.ok(detectPageBands(fixture([80, 420, 790, 1110, 1498])));
});

test('outer page whitespace is excluded without splitting the variable-height panel block', () => {
  const bands = detectPageBands(liveSizeFixture());
  assert.deepEqual(bands.panels, { x: 12, y: 126, width: 1513, height: 2115 });
  const plan = buildPageDrawPlan(bands);
  assert.ok(plan);
  assert.equal(plan.length, 3);
  assert.deepEqual([plan.layout.width, plan.layout.height], [1629, 2304]);
  assert.deepEqual(plan[1].source, bands.panels);
  assert.ok(plan[1].destination.x >= plan.layout.inset);
  assert.ok(plan[1].destination.x + plan[1].destination.width <= plan.layout.width - plan.layout.inset);
});

test('title rectangle is excluded while preserving the model-rendered title glyphs', () => {
  const bands = detectPageBands(framedTitleFixture());
  assert.ok(bands);
  assert.deepEqual(bands.title, { x: 28, y: 20, width: 72, height: 36 });
});

test('ambiguous frame counts and missing footer are rejected without guessing crops', () => {
  assert.equal(detectPageBands(fixture([80, 500, 1000, 1498])), null);
  assert.equal(detectPageBands(fixture([80, 300, 580, 870, 1150, 1498])), null);
  const missing = fixture();
  missing.data.fill(255, 1500 * missing.width * 4);
  assert.equal(detectPageBands(missing), null);
});

test('draw plan fixes an A4 manuscript page, never divides panels, and preserves aspect', () => {
  const bands = { title: { x: 100, y: 5, width: 800, height: 70 }, panels: { x: 0, y: 80, width: 1024, height: 1419 }, footer: { x: 12, y: 1506, width: 1000, height: 20 } };
  const plan = buildPageDrawPlan(bands);
  assert.deepEqual([PAGE_LAYOUT.width, PAGE_LAYOUT.height], [1120, 1584]);
  assert.equal(PAGE_LAYOUT.width / PAGE_LAYOUT.height, 70 / 99);
  assert.equal(plan.length, 3);
  assert.equal(plan[1].destination.y, 103);
  assert.equal(plan[1].destination.height, 1446);
  for (const { source, destination } of plan) {
    assert.ok(Math.abs(source.width / source.height - destination.width / destination.height) < 1e-9);
    assert.ok(destination.x >= 7 && destination.x + destination.width <= 1113);
  }
  assert.ok(plan[2].destination.y >= 1556);
  assert.ok(plan[2].destination.y + plan[2].destination.height <= 1577);
});

test('large API output keeps the exact A4 ratio and scales every fixed band proportionally', () => {
  assert.deepEqual(scalePageLayout(3168), {
    width: 2240, height: 3168, titleHeight: 206, panelHeight: 2892,
    footerHeight: 70, inset: 14, titleInkHeight: 174,
  });
  const plan = buildPageDrawPlan({
    canvas: { width: 2240, height: 3168 },
    title: { x: 300, y: 8, width: 1620, height: 150 },
    panels: { x: 0, y: 160, width: 2240, height: 2930 },
    footer: { x: 35, y: 3100, width: 2170, height: 38 },
  });
  assert.deepEqual([plan.layout.width, plan.layout.height], [2240, 3168]);
  assert.equal(plan[1].destination.height, 2892);
  assert.ok(plan[1].destination.x >= 14);
  assert.ok(plan[1].destination.x + plan[1].destination.width <= 2226);
});

test('width-bound four-panel art fills the page by scaling intact panels and assigning slack only to gutters', () => {
  const frames = [180, 170, 165, 180].map((height, index) => ({ x: 0, y: index * 190, width: 604, height }));
  const plan = buildPageDrawPlan({
    canvas: { width: 848, height: 1200 },
    title: { x: 20, y: 10, width: 560, height: 55 },
    panels: { x: 0, y: 80, width: 604, height: 753 },
    panelFrames: frames,
    footer: { x: 5, y: 1160, width: 594, height: 18 },
  });
  assert.ok(plan);
  assert.equal(plan.length, 6);
  const panelPlans = plan.slice(1, 5);
  assert.ok(panelPlans.every(entry => Math.abs(entry.source.width / entry.source.height - entry.destination.width / entry.destination.height) < 1e-9));
  assert.ok(panelPlans.every(entry => entry.destination.x === plan.layout.inset));
  assert.ok(panelPlans.every(entry => entry.destination.width === plan.layout.width - 2 * plan.layout.inset));
  assert.equal(panelPlans[0].destination.y, plan.layout.titleHeight);
  assert.ok(panelPlans.at(-1).destination.y + panelPlans.at(-1).destination.height <= plan.layout.titleHeight + plan.layout.panelHeight);
  assert.ok(panelPlans.slice(1).every((entry, index) => entry.destination.y > panelPlans[index].destination.y + panelPlans[index].destination.height));
});

test('cannot fill width-bound panel art without four intact frames: reject instead of stretching or slicing', () => {
  assert.equal(buildPageDrawPlan({ title: { width: 400, height: 60 }, panels: { width: 1500, height: 1000 }, footer: { width: 800, height: 20 } }), null);
});

test('candidate retains original bytes and reports skipped normalization honestly', async () => {
  const candidate = { base64Img: 'raw', mimeType: 'image/jpeg', modelId: 'test' };
  const skipped = await normalizePageCandidate(candidate, async () => ({ applied: false, reason: 'ambiguous' }));
  assert.equal(skipped.base64Img, 'raw');
  assert.equal(skipped.pageLayout.applied, false);
  const normalized = await normalizePageCandidate(candidate, async () => ({ applied: true, dataUrl: 'data:image/png;base64,fixed' }));
  assert.equal(normalized.base64Img, 'fixed');
  assert.equal(normalized.originalImage, 'data:image/jpeg;base64,raw');
  assert.equal(normalized.modelId, 'test');
});

test('candidate already at the A4 page ratio bypasses canvas re-encoding', async () => {
  const candidate = { base64Img: 'raw', mimeType: 'image/jpeg', modelId: 'test' };
  let normalizeCalls = 0;
  const preserved = await normalizePageCandidate(
    candidate,
    async () => {
      normalizeCalls += 1;
      return { applied: true, dataUrl: 'data:image/png;base64,reencoded' };
    },
    async () => ({ width: 848, height: 1200 }),
  );
  assert.equal(normalizeCalls, 0);
  assert.equal(preserved.base64Img, 'raw');
  assert.equal(preserved.mimeType, 'image/jpeg');
  assert.equal(preserved.pageLayout.applied, true);
  assert.equal(preserved.pageLayout.mode, 'already-a4');
  assert.deepEqual(
    { width: preserved.pageLayout.width, height: preserved.pageLayout.height },
    { width: 848, height: 1200 },
  );
  assert.equal(preserved.pageLayout.layout, undefined, 'ratio-only evidence must not invent verified title/panel bands');
});

test('off-ratio candidate is normalized before it can be displayed', async () => {
  const candidate = { base64Img: 'raw', mimeType: 'image/jpeg', modelId: 'test' };
  let normalizeCalls = 0;
  const normalized = await normalizePageCandidate(
    candidate,
    async () => {
      normalizeCalls += 1;
      return {
        applied: true,
        dataUrl: 'data:image/png;base64,fixed',
        layout: scalePageLayout(1200),
      };
    },
    async () => ({ width: 896, height: 1200 }),
  );
  assert.equal(normalizeCalls, 1);
  assert.equal(normalized.base64Img, 'fixed');
  assert.equal(normalized.mimeType, 'image/png');
  assert.equal(normalized.originalImage, 'data:image/jpeg;base64,raw');
  assert.equal(normalized.pageLayout.applied, true);
});
