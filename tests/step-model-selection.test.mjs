import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  DEFAULT_OPENAI_STEP1_MODEL_ID,
  DEFAULT_OPENAI_SCENARIO_MODEL_ID,
  DEFAULT_OPENAI_STEP3_MODEL_ID,
  getOpenAIVisionModelRoute,
  getOpenAIScenarioModelRoute,
} from '../src/lib/openai-model-routes.js';
import { getFallbackChains } from '../src/lib/fallback-chain-history.js';

test('local STEP1 Luna verification stops on failure while production keeps its declared route', () => {
  assert.deepEqual(getOpenAIVisionModelRoute('gpt-6-luna', true), ['gpt-6-luna']);
  assert.deepEqual(getOpenAIVisionModelRoute('gpt-6-luna', false), ['gpt-6-luna', 'gpt-5.6-luna']);
  assert.equal(getOpenAIVisionModelRoute('gpt-6.1-sol', true)[0], 'gpt-6.1-sol');
});

test('the three OpenAI steps start on their separate defaults and keep valid selections independent', () => {
  assert.equal(DEFAULT_OPENAI_STEP1_MODEL_ID, 'gpt-6-luna');
  assert.equal(DEFAULT_OPENAI_SCENARIO_MODEL_ID, 'gpt-6-luna');
  assert.equal(DEFAULT_OPENAI_STEP3_MODEL_ID, 'gpt-6-luna');
  assert.equal(getOpenAIVisionModelRoute('gpt-6-luna')[0], 'gpt-6-luna');
  assert.equal(getOpenAIScenarioModelRoute('gpt-6.1-sol')[0], 'gpt-6.1-sol');
  assert.equal(getOpenAIScenarioModelRoute('gpt-6-astra')[0], 'gpt-6-astra');
});

test('Model Chain follows each selected step without changing the others', () => {
  const selected = { analysisModelId: 'gpt-6-sol', scenarioModelId: 'gpt-6.1-sol', promptModelId: 'gpt-6-luna' };
  const chains = getFallbackChains(selected);
  for (const [id, expected] of [['step1-openai', 'gpt-6-sol'], ['step2-openai', 'gpt-6.1-sol'], ['step3-openai', 'gpt-6-luna']]) {
    assert.equal(chains.find(chain => chain.id === id).models[0].id, expected);
  }
});

test('STEP1 vision and STEP3 prompt paths use their own selected models', async () => {
  const [workflow, client, app] = await Promise.all([
    readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/lib/openai-text.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/App.jsx', import.meta.url), 'utf8'),
  ]);
  assert.match(workflow, /visionModelId:\s*analysisModelId/);
  assert.match(workflow, /modelRoute:\s*'scenario',\s*scenarioModelId:\s*promptModelId/);
  assert.match(client, /getOpenAIVisionModelRoute\(options\.visionModelId\)/);
  assert.match(app, /<ModelSelectionPanel[\s\S]*?<Step1Panel/);
});

test('the actual STEP4 review request uses the selected vision model and its local no-fallback route', async () => {
  const source=await readFile(new URL('../src/hooks/useMangaWorkflow.js',import.meta.url),'utf8');
  const start=source.indexOf('const reviewRequest=async(');
  const end=source.indexOf('\n        if(experimentalPrepared)',start);
  const make=new Function('callAI','analysisModelId','signal',`let reviewRequests=0;${source.slice(start,end)};return reviewRequest;`);
  const received=[];
  const request=make(async(...args)=>{received.push(args.at(-1));return {text:'review'};},'gpt-6-luna',new AbortController().signal);
  await request('review',[{}],null,()=>{},{outputProfile:'image-quality-review'});
  assert.equal(received[0].visionModelId,'gpt-6-luna');
  assert.deepEqual(getOpenAIVisionModelRoute(received[0].visionModelId,true),['gpt-6-luna']);
  await assert.rejects(request('review',[{}],null,()=>{}),/1回/);
});
