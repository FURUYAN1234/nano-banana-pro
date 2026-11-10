import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createServer} from 'vite';

const frames=JSON.parse(fs.readFileSync(new URL('./fixtures/observed-frame-proportions.json',import.meta.url),'utf8'));
test('actual six correct frames with a 31-percent hero cannot silently satisfy the approved 38-percent hero',async()=>{
  const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
  try {
    const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
    const plan={count:6,layout:'hero_top',expectedCast:[]};
    const issues=m.experimentalRepairIssues({corrections:[],observedFrames:frames,evidence:[]},plan);
    assert.equal(issues.filter(i=>i.type==='panel_layout').length,1);
    assert.match(issues[0].reason,/コマの高さ/);
    assert.match(issues[0].reason,/0.380/);
    const top=Math.min(...frames.map(f=>f.bounds[1]));
    const bottom=Math.max(...frames.map(f=>f.bounds[1]+f.bounds[3]));
    assert(issues[0].reason.includes(`画布y=${((top+(bottom-top)*.38)*100).toFixed(1)}%`));
    assert.match(issues[0].correction,/原文のrect/);
    assert.match(issues[0].correction,/隣接/);
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
