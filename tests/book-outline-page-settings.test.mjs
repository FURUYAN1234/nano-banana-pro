import test from 'node:test';
import assert from 'node:assert/strict';
import {buildBookOutlineRequest} from '../src/lib/mcp/book-plan.js';

test('outline planning receives effective page settings, preserving true and explicit false overrides',()=>{
 const project={brief:'A cover and two comic pages',settings:{colorMode:'color',showTitle:false,showWatermarks:false,pageNumber:true},pages:[
  {id:'cover',kind:'illustration',panelCount:1,presentation:{authorName:'Author'},settings:{showTitle:true,pageNumber:false}},
  {id:'middle',kind:'comic',panelCount:5,presentation:{}},
  {id:'last',kind:'comic',panelCount:4,presentation:{endingText:'END'},settings:{showWatermarks:true}},
 ]};
 const before=JSON.stringify(project);
 const data=JSON.parse(buildBookOutlineRequest(project).split('DATA:\n')[1]);
 assert.deepEqual(data.pages.map(page=>page.settings),[
  {colorMode:'color',showTitle:true,showWatermarks:false,pageNumber:false},
  {colorMode:'color',showTitle:false,showWatermarks:false,pageNumber:true},
  {colorMode:'color',showTitle:false,showWatermarks:true,pageNumber:true},
 ]);
 assert.equal(JSON.stringify(project),before);
 project.settings.showWatermarks=true;
 project.pages[2].settings.showWatermarks=false;
 const changed=JSON.parse(buildBookOutlineRequest(project).split('DATA:\n')[1]);
 assert.equal(changed.pages[2].settings.showWatermarks,false);
});
