import test from 'node:test';
import assert from 'node:assert/strict';
import * as settings from '../src/lib/openai-image-settings.js';
import {buildOpenAIImageRequest} from '../src/lib/openai.js';
test('retired selections and initial model discovery never send GPT Image 2.0', () => {
  assert.equal(settings.OPENAI_IMAGE_OPTIONS.some(x => x.model === 'gpt-image-2'), false);
  for (const models of [undefined, [], ['gpt-image-2'], ['gpt-image-2.5-flare']]) {
    const selected = settings.selectInitialOpenAIImageQuality(models);
    assert.notEqual(settings.resolveOpenAIImageOption(selected).model, 'gpt-image-2');
  }
  assert.equal(settings.selectInitialOpenAIImageQuality(['gpt-image-2.5-flare']), 'xhigh');
  for (const imageInputs of [[], [{image_url:'data:image/png;base64,c291cmNl'}]]) {
    const {body} = buildOpenAIImageRequest('unchanged story', {quality:'gpt-image-2-high',imageInputs});
    assert.equal(body.model, 'gpt-image-2.6-sunburst');
    assert.equal(body.quality, 'max');
    assert.equal(body.prompt, 'unchanged story');
  }
});
