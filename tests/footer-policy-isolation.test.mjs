import assert from 'node:assert/strict';
import test from 'node:test';
import {WATERMARK_ART_PRIORITY} from '../src/lib/render-options.js';
import {restoreFooterPolicyBefore742} from './helpers/prompt-policy-normalization.mjs';

test('footer normalization changes only the reviewed policy, preserving unknown changes and authored fields',()=>{
  const current='FOOTER ONLY: both intended credits once near page bottom; not on in-scene paper. WATERMARK ART PRIORITY applies.';
  const previous='FOOTER ONLY: both exact watermarks once outside panels; no watermark/credit inside panels or on in-scene paper.';
  assert.equal(restoreFooterPolicyBefore742(WATERMARK_ART_PRIORITY+'\n'+current),previous);
  for(const line of [current,WATERMARK_ART_PRIORITY]) {
    for(const prefix of ['Action: ','Camera: ','Dialogue: ']) assert.equal(restoreFooterPolicyBefore742(prefix+line),prefix+line);
    assert.equal(restoreFooterPolicyBefore742(line+' UNREVIEWED'),line+' UNREVIEWED');
  }
  const native='FOOTER ONLY: Bottom-left EXACTLY "left". Bottom-right EXACTLY "right". 横書き各1回、作中道具転載禁止。';
  assert.match(restoreFooterPolicyBefore742(native),/^FOOTER ONLY, below the last panel:/);
  assert.notEqual(restoreFooterPolicyBefore742(native.replace('"right"','"changed"')),restoreFooterPolicyBefore742(native));
  assert.equal(restoreFooterPolicyBefore742(native+' UNREVIEWED'),native+' UNREVIEWED');
  assert.equal(restoreFooterPolicyBefore742('Action: '+native),'Action: '+native);
});
