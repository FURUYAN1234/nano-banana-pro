import test, {before, after} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'vite';
import {bookOutlineResponseFormat, buildBookOutlineRequest, parseBookOutline} from '../src/lib/mcp/book-plan.js';
import {buildBookPresentation} from '../src/lib/book-presentation.js';
const project={pages:[{id:'cover'},{id:'body'}]};
const value={outline:{title:'Title',synopsis:'A reunion',cast:[],assetSpecs:[],pages:[{pageId:'cover',beat:'Portrait',direction:'Low camera'},{pageId:'body',beat:'Reunion',direction:'High camera'}]}};
const text=JSON.stringify(value);
test('outline accepts exact JSON, BOM and a complete JSON fence without editing story content',()=>{
 for(const input of [text,'\uFEFF'+text,'```json\n'+text+'\n```','```json '+text+' ```'])assert.deepEqual(parseBookOutline(input,project),value);
});
test('malformed/truncated/prose wrappers and wrong page identity fail without invented recovery',()=>{
 for(const input of [text.slice(0,-1),'preface '+text,text+' trailing','```json\n'+text,'null',JSON.stringify({...value,outline:{...value.outline,pages:[...value.outline.pages].reverse()}}),JSON.stringify({...value,outline:{...value.outline,pages:[value.outline.pages[0]]}})]) {
  assert.throws(()=>parseBookOutline(input,project),error=>error.code==='PLAN_INVALID'&&error.diagnosticContext.stage==='mcp_book_outline'&&typeof error.diagnosticContext.validationResponse==='string');
 }
});
test('failure-only diagnostic response is bounded and credential/image sanitized',()=>{
 const input='sk-fixtureSecret Bearer privateToken data:image/png;base64,SECRET '+ 'x'.repeat(70000);
 assert.throws(()=>parseBookOutline(input,project),error=>{
  const context=error.diagnosticContext;
  assert.ok(context.validationResponse.length<=64000);
  assert.doesNotMatch(context.validationResponse,/fixtureSecret|privateToken|base64,SECRET/);
  assert.ok(context.truncatedFields.includes('validationResponse'));return true;
 });
 assert.equal(parseBookOutline(text,project).diagnosticContext,undefined);
});
let server,client,session;const originalFetch=globalThis.fetch;
before(async()=>{server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true,hmr:false}});client=await server.ssrLoadModule('/src/lib/openai-text.js');session=await server.ssrLoadModule('/src/lib/api-session.js');session.setApiSession('openai','test-only-credential');});
after(async()=>{globalThis.fetch=originalFetch;session?.clearApiSession();await server?.close();});
test('outline strict JSON schema reaches fixed Luna transport without model fallback or paid retry',async()=>{
 const bodies=[];globalThis.fetch=async(_url,init)=>{bodies.push(JSON.parse(init.body));return Response.json({choices:[{finish_reason:'stop',message:{content:text}}]});};
 const options={modelRoute:'scenario',scenarioModelId:'gpt-6-luna',responseFormat:bookOutlineResponseFormat(project)};
 const result=await client.callOpenAIText(buildBookOutlineRequest(project),null,'JSON only',null,options);
 assert.deepEqual(parseBookOutline(result.text,project),value);
 assert.equal(bodies.length,1);assert.equal(bodies[0].model,'gpt-6-luna');assert.deepEqual(bodies[0].response_format,options.responseFormat);
 assert.equal(bookOutlineResponseFormat(project,'gemini'),'json_object');
 bodies.length=0;globalThis.fetch=async(_url,init)=>{bodies.push(JSON.parse(init.body));return Response.json({choices:[{finish_reason:'length',message:{content:text.slice(0,-2)}}]});};
 await assert.rejects(client.callOpenAIText('JSON only',null,null,null,options),error=>error.code==='OUTPUT_TOKEN_LIMIT');assert.equal(bodies.length,1);
});
test('future ending keeps approved text literal, bottom priority and title typography, independent switches',()=>{
 for(const endingText of ['END','おしまい','おわり'])for(const endingOverlap of [true,false]){
 const prompt=buildBookPresentation({presentation:{endingText,endingOverlap},kind:'comic',pageIndex:4,showTitle:false,pageNumber:true});
 assert.ok(prompt.includes(JSON.stringify(endingText)));assert.match(prompt,/lower-right first.*lower-center, then lower-left/);assert.match(prompt,/inside the final panel/);assert.match(prompt,/Do not move it above/);assert.match(prompt,/typographic mood/);assert.match(prompt,/faces, hands.*page numbers and footer/);assert.match(prompt,/never substitute/);assert.match(prompt,/independent page number/);
 }
 assert.doesNotMatch(buildBookPresentation({presentation:{},pageIndex:2}),/Final story lettering/);
});
