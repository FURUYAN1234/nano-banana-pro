import test from 'node:test';
import assert from 'node:assert/strict';
import {getModelBadgeInfo} from '../src/lib/constants.js';
import {GEMINI_TEXT_MODEL_IDS,GEMINI_VISION_MODEL_IDS,GEMINI_IMAGE_MODEL_IDS} from '../src/lib/gemini-model-routes.js';
for(const version of ['3.8','3.7','3.6']) test('Gemini '+version+' Flash has an exact badge',()=>{
 const badge=getModelBadgeInfo('gemini-'+version+'-flash');
 assert.equal(badge.label,'Gemini Flash'); assert.equal(badge.tier,'Active');
 assert.ok(badge.desc.includes(version));
});
test('redirected aliases are removed only from text and vision routes',()=>{
 const route=['gemini-3.8-flash','gemini-3.6-flash','gemini-3.5-flash-lite','gemini-3.1-flash-lite'];
 assert.deepEqual(GEMINI_TEXT_MODEL_IDS,route); assert.deepEqual(GEMINI_VISION_MODEL_IDS,route);
 assert.deepEqual(GEMINI_IMAGE_MODEL_IDS,['gemini-nano-banana-2.1']);
});
test('image and Lite families never enter the new Flash badge branch',()=>{
 for(const id of ['gemini-3.8-flash-lite','gemini-3.7-flash-image','gemini-3.6-flash-preview','unknown-model']) assert.notEqual(getModelBadgeInfo(id).label,'Gemini Flash');
 assert.equal(getModelBadgeInfo(null),null);
 assert.equal(getModelBadgeInfo('gpt-6-luna').label,'ChatGPT');
 assert.equal(getModelBadgeInfo('gpt-image-2.5-sunburst').label,'ChatGPT IMG');
});
