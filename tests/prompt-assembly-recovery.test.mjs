import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test, {before, after} from 'node:test';
import {createServer} from 'vite';

let server, assemble, extractBubbleContracts;
const scenario = readFileSync(new URL('./fixtures/translation-question-balloon-layout.txt', import.meta.url), 'utf8');
const castList = ['ミク','リン','サエコ','アカリ','ヒカリ'].map(name => `## ${name}`).join('\n');
const options = {scenario, castList, providerFamily:'chatgpt', colorMode:'color', punchlineType:'Auto'};
const layoutLines = [...scenario.matchAll(/^BalloonLayout: (.*)$/gm)];
const plans = layoutLines.map(match => JSON.parse(match[1]));
const damage = (index, value) => scenario.replace(layoutLines[index][0], `BalloonLayout: ${value}`);
const edit = (panel, value = plans[panel - 1]) => ({panel, field:'BalloonLayout', value});
const response = edits => ({text:JSON.stringify(edits)});
const expected = scenario.split(/\[\dコマ目:[^\]]+\]/).slice(1).map(panel =>
  [...panel.matchAll(/^([^\n「]+)「([^\n]+)」$/gm)].map(([, speaker, text]) => ({speaker, text})));

before(async () => {
  server = await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
  ({assembleMangaPromptWithRecovery:assemble} = await server.ssrLoadModule('/src/lib/prompt-assembly-recovery.js'));
  ({extractBubbleContracts} = await server.ssrLoadModule('/src/lib/image-quality-qa.js'));
});
after(async () => { await server?.close(); });

test('valid original scenario goes straight through without repair requests', async () => {
  let calls = 0;
  const result = await assemble(options, async () => { calls++; throw new Error('unnecessary repair'); });
  assert.equal(calls, 0);
  assert.equal(result.repaired, false);
  assert.equal(result.scenario, scenario);
  assert.deepEqual(extractBubbleContracts(result.artifact.prompt).map(panel => panel.bubbles.map(({speaker,text}) => ({speaker,text}))), expected);
});

test('all layout failure classes self-repair once and continue with exact dialogue and staging', async () => {
  const broken = ['{', '{}', '[]', JSON.stringify(plans[0].slice().reverse()),
    ...['speaker', 'x', 'anchor', 'route'].map(key => JSON.stringify(plans[0].map((item,i) => i ? item : {...item,[key]:key === 'x' ? 1 : ''}))),
    JSON.stringify(plans[0].map((item,i) => ({...item,x:i ? 0.8 : 0.2})))];
  for (const providerFamily of ['chatgpt','gemini']) for (const value of broken) {
    let calls = 0;
    const progress = [];
    const result = await assemble({...options,providerFamily,scenario:damage(0,value)}, async (prompt, _a, _b, _progress, requestOptions) => {
      calls++;
      assert.ok(prompt.includes('台詞を削除・追加して件数を合わせない'));
      assert.ok(prompt.includes(expected[0][0].text));
      assert.equal(requestOptions.signal, undefined);
      return response([edit(1)]);
    }, message => progress.push(message));
    assert.equal(calls,1);
    assert.equal(result.repaired,true);
    assert.equal(result.scenario.replace(/^BalloonLayout: .*$/gm,''),scenario.replace(/^BalloonLayout: .*$/gm,''));
    assert.deepEqual(extractBubbleContracts(result.artifact.prompt).map(panel => panel.bubbles.map(({speaker,text}) => ({speaker,text}))),expected);
    assert.match(progress.at(-1),/完了/);
  }
});

test('multiple broken panels are repaired together in one request', async () => {
  const source = damage(0,'[]').replace(layoutLines[3][0],'BalloonLayout: []');
  let calls = 0;
  const result = await assemble({...options,scenario:source},async () => {calls++;return response([edit(1),edit(4)]);});
  assert.equal(calls,1);
  assert.equal(result.repaired,true);
});

test('repair cannot change dialogue, camera, action, normal panels, or accept invalid output', async () => {
  for (const raw of [response([{panel:1,field:'状況',value:'置き換え'}]), response([{panel:1,field:'Camera',value:'正面'}]),
    response([edit(2)]), response([edit(1,[])]), response([edit(1),edit(1)]), response([{...edit(1),dialogue:'変更'}]), {text:'not JSON'}]) {
    let calls = 0;
    await assert.rejects(assemble({...options,scenario:damage(0,'[]')},async () => {calls++;return raw;}), error =>
      error.code === 'BALLOON_LAYOUT_REPAIR_FAILED' && error.message.includes('1コマ目') && error.message.includes(expected[0][0].text));
    assert.equal(calls,1);
    assert.equal(options.scenario,scenario);
  }
});

test('API failure preserves its cause and original scenario without a paid retry loop', async () => {
  let calls = 0;
  const cause = Object.assign(new Error('API authentication failed'),{status:401});
  await assert.rejects(assemble({...options,scenario:damage(0,'[]')},async () => {calls++;throw cause;}),error =>
    error.code === 'BALLOON_LAYOUT_REPAIR_FAILED' && error.cause === cause && error.message.includes('HTTP 401'));
  assert.equal(calls,1);
});

test('cancellation before or during recovery never publishes a repaired result', async () => {
  const before = new AbortController(); before.abort();
  await assert.rejects(assemble(options,async () => assert.fail('no request'),()=>{},before.signal),{name:'AbortError'});
  const during = new AbortController();
  const progress = [];
  await assert.rejects(assemble({...options,scenario:damage(0,'[]')},async (_p,_a,_b,_progress,{signal}) => {
    assert.equal(signal,during.signal); during.abort(); return response([edit(1)]);
  },message => progress.push(message),during.signal),{name:'AbortError'});
  assert.ok(!progress.some(message => message.includes('完了')));
});

test('unrelated assembly failures do not trigger layout repair', async () => {
  await assert.rejects(assemble({...options,providerFamily:'invalid'},async () => assert.fail('no repair')));
});
