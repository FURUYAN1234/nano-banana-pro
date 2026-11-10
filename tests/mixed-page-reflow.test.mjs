import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {buildImageQualityRepairPrompt,runPageImageQuality} from '../src/lib/image-quality-failsafe.js';

const boundary = {type:'panel_layout',panel:1,subject:'ページの枠比率',
  reason:'コマの高さ・幅と境界が指定と異なる。P1下辺 0.286→0.380; P2上辺 0.289→0.380。',
  correction:'指摘境界を指定座標へ移動し、隣接コマも原文のrectへ再配置。'};
const camera = {type:'camera_geometry',panel:2,reason:'The requested underside is absent.'};
const clipping = {type:'panel_layout',panel:3,reason:'Hair contour is severed by the upper frame.'};
const originalPrompt='APPROVED six panels; P1 bottom=38% of comic area; preserve all seven speeches.';

test('combined boundary, camera and clipping repair consistently uses the corrected frame scaffold',()=>{
  for(const compact of [false,true]) {
    const prompt=buildImageQualityRepairPrompt({originalPrompt,sourceMode:'source-image',panelCount:6,compact,
      issues:[camera,clipping,boundary]});
    const instructions=prompt.slice(0,prompt.indexOf('APPROVED CONTENT REFERENCE'));
    assert.match(instructions,/PAGE REFLOW FIRST/);
    assert(instructions.indexOf('PAGE REFLOW FIRST')<instructions.indexOf('panel 2 / camera_geometry'));
    assert.match(instructions,/recompose inside the corrected panel rectangle/);
    assert.match(instructions,/adjacent panels/);
    assert.doesNotMatch(instructions,/every unaffected panel unchanged|Keep page borders|ページ枠を保持|unchanged panel rectangle|ページ溝は動かさない|or moving page gutters|Never redraw the page from scratch|ページを描き直さず|Allow only necessary local contact|局所影だけ/);
    assert(prompt.endsWith(originalPrompt));
  }
});

test('camera or clipping alone retains the original frame protection',()=>{
  for(const issue of [camera,clipping]) {
    const prompt=buildImageQualityRepairPrompt({originalPrompt,sourceMode:'source-image',panelCount:6,issues:[issue]});
    assert.doesNotMatch(prompt,/PAGE REFLOW FIRST/);
    assert.match(prompt,/original page geometry/);
    assert.match(prompt,issue===camera?/Keep page borders and every unaffected panel unchanged/:/unchanged panel rectangle/);
  }
});

test('an invalid panel cannot authorize page-wide reflow',()=>{
  const prompt=buildImageQualityRepairPrompt({originalPrompt,sourceMode:'source-image',panelCount:6,
    issues:[camera,{...boundary,panel:7}]});
  assert.doesNotMatch(prompt,/PAGE REFLOW FIRST/);
  assert.match(prompt,/original page geometry/);
});

test('a synthetic full-length mixed repair with converted frame coordinates still reaches the bounded API call',async()=>{
  const fixture=JSON.parse(fs.readFileSync(new URL('./fixtures/reflow-page-repair.json',import.meta.url),'utf8'));
  let calls=0;
  const result=await runPageImageQuality({kind:'experimental-manga',count:6},{mode:'experimental-manga',allowRepair:true,
    originalCandidate:{base64Img:'original'},originalPrompt:fixture.originalPrompt,repairPromptMaxChars:30165,
    reviewCandidate:async()=>({pass:false,issues:fixture.issues,evidenceContext:{panelCount:6}}),
    generateRepairCandidate:async prompt=>{
      calls++;
      assert(prompt.length<=30165);
      assert(prompt.endsWith(fixture.originalPrompt));
      for(const issue of fixture.issues)assert(prompt.includes(`panel ${issue.panel} / ${issue.type}`));
      assert.match(prompt,/画布y=41.4%/);
      return {base64Img:'corrected'};
    }});
  assert.equal(result.repairError,null);
  assert.equal(calls,1);
});
