import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildImageAnatomyRetryPrompt,
  buildImageAnatomyQaPrompt,
  parseImageAnatomyQaResponse
} from '../src/lib/image-anatomy-qa.js';

test('vision QA prompt requires panel-by-panel rejection of visible extra limbs', () => {
  const prompt = buildImageAnatomyQaPrompt({
    scenario: '[2コマ目: 承] サエコが仕分け札を掲げる。',
    castList: '## サエコ\n- long black hair'
  });

  assert.match(prompt, /panel-by-panel/i);
  assert.match(prompt, /extra.*(?:arm|hand)|(?:arm|hand).*extra/i);
  assert.match(prompt, /JSON/i);
});

test('visible third hand is rejected even when the response is fenced JSON', () => {
  const result = parseImageAnatomyQaResponse(`\`\`\`json
{"pass":false,"issues":[{"panel":2,"subject":"サエコ","reason":"visible third hand beside the sorting label"}]}
\`\`\``);

  assert.equal(result.pass, false);
  assert.deepEqual(result.issues, [{
    panel: 2,
    subject: 'サエコ',
    reason: 'visible third hand beside the sorting label'
  }]);
});

test('only an explicit empty-issue pass accepts a generated image', () => {
  assert.deepEqual(parseImageAnatomyQaResponse('{"pass":true,"issues":[]}'), {
    pass: true,
    issues: []
  });

  const inconsistent = parseImageAnatomyQaResponse('{"pass":true,"issues":[{"panel":2,"reason":"extra arm"}]}');
  assert.equal(inconsistent.pass, false);
  assert.equal(inconsistent.issues.length, 1);
});

test('unparseable visual QA fails closed', () => {
  const result = parseImageAnatomyQaResponse('Looks good to me.');
  assert.equal(result.pass, false);
  assert.match(result.issues[0].reason, /unparseable/i);
});

test('anatomy retry preserves the approved prompt while prohibiting the observed extra limb', () => {
  const retryPrompt = buildImageAnatomyRetryPrompt('APPROVED MANGA PROMPT', [{
    panel: 2,
    subject: 'サエコ',
    reason: 'visible third hand beside the sorting label'
  }]);

  assert.match(retryPrompt, /^APPROVED MANGA PROMPT/);
  assert.match(retryPrompt, /VISUAL QA RETRY LOCK/);
  assert.match(retryPrompt, /exactly two arms and two hands/i);
  assert.match(retryPrompt, /panel 2/i);
});
