import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createServer} from 'vite';
import {isMaterialImageQualityIssue} from '../src/lib/image-quality-failsafe.js';

const frames=JSON.parse(fs.readFileSync(new URL('./fixtures/observed-frame-proportions.json',import.meta.url),'utf8'));
test('a reviewer cannot spend a repair solely to force numeric frame proportions',()=>{
  const ratio={type:'panel_layout',panel:1,materialImpact:'material',reason:'コマの高さの比率が指定と異なる。実際31%、指定38%。',impactReason:'下辺の座標が目標と7%異なる。'};
  assert.equal(isMaterialImageQualityIssue(ratio),false);
  assert.equal(isMaterialImageQualityIssue({...ratio,reason:'下辺が伸び、P2の台詞が隠れて読めない。実際31%、指定38%。'}),true);
  assert.equal(isMaterialImageQualityIssue({type:'panel_layout',panel:2,reason:'Two story frames are merged and the final scene is missing.'}),true);
  assert.equal(isMaterialImageQualityIssue({type:'anatomy',materialImpact:'minor_variation',impactReason:'Some difference',reason:'Two detached heads.'}),true);
});
test('coherent six frames with a 31-percent hero are not repaired merely to match 38 percent',async()=>{
  const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
  try {
    const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
    const plan={count:6,layout:'hero_top',expectedCast:[],panels:Array.from({length:6},(_,i)=>({sourcePanel:i+1,camera:'斜め上から見下ろす',action:'人物が幕を支える。',dialogueIds:[],breakout:null}))};
    const issues=m.experimentalRepairIssues({corrections:[],observedFrames:frames,evidence:[]},plan);
    assert.deepEqual(issues,[]);
    const review={status:'pass',observedCount:6,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',breakout:'not_requested',pageEvidence:'題字と台詞が判読できる。',issues:[],corrections:[],observedFrames:frames,
      evidence:frames.map((f,i)=>({panel:i+1,bounds:f.bounds,camera:'人物と背景の上面が自然につながる。',style:'線と陰影は同じ描法で描かれている。',story:'人物の動作と台詞の意味が一致する。',anatomy:'首と胴と四肢は自然につながる。'}))};
    assert.equal(m.validateExperimentalReview(review,plan).status,'pass');
    const missing={...review,observedCount:5,evidence:review.evidence.slice(1),observedFrames:frames.slice(1)};
    assert.notEqual(m.validateExperimentalReview(missing,plan).status,'pass','a missing physical story panel remains unverified/failed');
  } finally {await server.close();}
});
test('uniform outer margin changes and narrow gutters do not authorize changing valid frame proportions',async()=>{
  const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
  try {
    const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
    for(const layout of ['hero_top','two_columns','mixed_rows']) {
      const plan={count:6,layout,expectedCast:[]};
      const observed=m.experimentalLayout(6,layout).map(r=>({bounds:[.02+.96*r.x,.065+.91*r.y,.96*r.w-.006,.91*r.h-.006]}));
      assert.deepEqual(m.experimentalRepairIssues({corrections:[],observedFrames:observed,evidence:[]},plan),[]);
    }
    for(const malformed of [frames.slice(1),frames.map(()=>frames[0]),[{bounds:[0,0,1,1]}]]) {
      assert.deepEqual(m.experimentalRepairIssues({corrections:[],observedFrames:malformed,evidence:[]},{count:6,layout:'hero_top',expectedCast:[]}),[]);
    }
  } finally {await server.close();}
});
