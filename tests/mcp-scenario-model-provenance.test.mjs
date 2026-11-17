import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolveMcpScenarioUsedModel,preserveMcpRecognitionScenario,selectMcpPageSnapshot} from '../src/lib/mcp/page-state.js';
import {createServer} from 'vite';
const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true,hmr:false}});
const {buildMangaWatermark}=await server.ssrLoadModule('/src/lib/prompt-assembler.js');
await server.close();
const planned={pageId:'page',scenario:'Approved page',model:'gpt-6-luna'};
const project={id:'book',plan:{detail:{pages:[planned]}}};
const owner={projectId:'book',pageId:'page'};
test('fresh detailed page keeps actual scenario model and the ordinary 1P watermark',()=>{
 const model=resolveMcpScenarioUsedModel(undefined,planned);
 assert.equal(model,'gpt-6-luna');
 const label=model==='gpt-6-luna'?'GPT-6 Luna':undefined;
 assert.equal(buildMangaWatermark({imageEngineLabel:'ChatGPT Images 2.6',scenarioModelLabel:label,systemVersion:'8.0.2',isChatGPTFamily:true}),'ChatGPT Images 2.6 / GPT-6 Luna / FURU AI 4-koma 8.0.2');
});
test('saved actual provenance wins; old same-script snapshot recovers detail provenance',()=>{
 assert.equal(resolveMcpScenarioUsedModel({scenario:'Revised page',scenarioUsedModel:'actual-other'},planned),'actual-other');
 assert.equal(resolveMcpScenarioUsedModel({scenario:planned.scenario,scenarioUsedModel:null},planned),'gpt-6-luna');
});
test('unknown provenance and changed/empty authored scripts are not attributed to selected settings',()=>{
 for(const snapshot of [{scenario:'Manual revised page'},{scenario:''}])assert.equal(resolveMcpScenarioUsedModel(snapshot,planned),null);
 assert.equal(resolveMcpScenarioUsedModel(undefined,{scenario:'Unknown',settings:{scenarioModelId:'gpt-6-luna'}}),null);
 assert.equal(resolveMcpScenarioUsedModel({scenarioUsedModel:'unknown-actual'},planned),'unknown-actual');
});
test('foreign state is rejected before resolving the fresh page and normal restoration never borrows book model',()=>{
 assert.throws(()=>selectMcpPageSnapshot({bookPageContext:{projectId:'other',pageId:'page'},scenarioUsedModel:'foreign'},'book','page'),{code:'PAGE_SNAPSHOT_MISMATCH'});
 assert.equal(resolveMcpScenarioUsedModel({scenario:planned.scenario},planned,{restoreNormal:true}),null);
});
test('recognition retains model provenance with the matching restored script only',()=>{
 const restored=preserveMcpRecognitionScenario({}, {bookPageContext:owner,scenario:planned.scenario,scenarioUsedModel:'actual-snapshot'},project,'page');
 assert.equal(restored.scenarioUsedModel,'actual-snapshot');
 assert.equal(preserveMcpRecognitionScenario({},null,project,'page').scenarioUsedModel,'gpt-6-luna');
 assert.equal(preserveMcpRecognitionScenario({},{bookPageContext:owner,scenario:'Edited'},project,'page').scenarioUsedModel,null);
 assert.equal(preserveMcpRecognitionScenario({},{bookPageContext:{projectId:'foreign',pageId:'page'},scenarioUsedModel:'foreign'},project,'page').scenarioUsedModel,'gpt-6-luna');
});
test('normal MCP page apply uses provenance resolver after ownership validation',()=>{
 const source=readFileSync(new URL('../src/hooks/useMangaWorkflow.js',import.meta.url),'utf8');
 assert.match(source,/scenarioUsedModelRef\.current=resolveMcpScenarioUsedModel\(snapshot,planned,\{restoreNormal\}\)/);
});
