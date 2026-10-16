import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
test('STEP dropdown scrolls to the requested existing section without resetting work', () => {
  const handler = source.match(/aria-label="STEPへ移動"[\s\S]*?onChange=\{\(event\) => \{([\s\S]*?)\n\s+\}\}/);
  assert.ok(handler, 'the four-step navigation dropdown must exist');
  const calls = [];
  const ref = step => ({ current: { scrollIntoView: options => calls.push({ step, options }) } });
  const context = { window: { scrollTo: options => calls.push({ step: 1, options }) },
    step2Ref: ref(2), step3Ref: ref(3), outputRef: ref(4) };
  const onChange = vm.runInNewContext(`(event) => {${handler[1]}}`, context);
  for (const step of ['1', '2', '3', '4']) {
    const event = { currentTarget: { value: step } };
    onChange(event);
    assert.equal(calls.at(-1).step, Number(step));
    assert.equal(calls.at(-1).options.behavior, 'smooth');
    assert.equal(event.currentTarget.value, '');
  }
  onChange({ currentTarget: { value: '' } });
  assert.equal(calls.length, 4);
  assert.doesNotMatch(handler[1], /setGenerated|setScenario|setCast|setImages|reset|generate|fetch/);
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const step4 = app.slice(app.indexOf('<Step4Panel'));
  assert.match(step4, /step2Ref=\{step2Ref\}/);
  assert.match(step4, /step3Ref=\{step3Ref\}/);
});
