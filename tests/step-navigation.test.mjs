import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { scrollToWorkflowStep } from '../src/lib/step-navigation.js';

const source = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
test('STEP dropdown scrolls to the requested existing section without resetting work', () => {
  const handler = source.match(/aria-label="STEPへ移動"[\s\S]*?onChange=\{\(event\) => \{([\s\S]*?)\n\s+\}\}/);
  assert.ok(handler, 'the four-step navigation dropdown must exist');
  const calls = [];
  const ref = step => ({ current: { getBoundingClientRect: () => ({ top: step * 100 }) } });
  const targets = { 2: ref(2).current, 3: ref(3).current, 4: ref(4).current };
  const context = { onNavigateToStep: step => scrollToWorkflowStep(step, {
    currentStep: 5, targets, browserWindow: { scrollY: 1000,
      scrollTo: options => calls.push({ step: options.top === 0 ? 1 : (options.top - 1000) / 100, options }) },
  }) };
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
  assert.match(step4, /onNavigateToStep=\{handleNavigateToStep\}/);
  assert.match(step4, /isStepNavigationDisabled=\{isStepNavigationDisabled\}/);
  const controlBar = app.slice(app.indexOf('<ControlBar'), app.indexOf('/>', app.indexOf('<ControlBar')));
  assert.match(controlBar, /onNavigateToStep=\{handleNavigateToStep\}/);
});

test('shared STEP scrolling rejects unavailable, invalid and busy destinations before touching the page', () => {
  const unexpectedScroll = () => assert.fail('unavailable navigation must not touch the page');
  const options = { currentStep: 2, browserWindow: { scrollTo: unexpectedScroll, matchMedia: unexpectedScroll },
    targets: { 2: { scrollIntoView: unexpectedScroll }, 3: { scrollIntoView: unexpectedScroll } } };
  for (const step of [0, 3, 4, 5, -1, 1.5, '1', '', null, undefined, true, NaN]) {
    assert.equal(scrollToWorkflowStep(step, options), false);
  }
  for (const step of [1, 2, 3, 4]) {
    assert.equal(scrollToWorkflowStep(step, { ...options, currentStep: 5, disabled: true }), false);
  }
  for (const currentStep of [undefined, NaN, 0, 6]) {
    assert.equal(scrollToWorkflowStep(1, { ...options, currentStep }), false);
  }
});

test('shared STEP scrolling preserves current-step navigation and reduced-motion settings', () => {
  for (const reduce of [false, true]) {
    const calls = [];
    const browserWindow = { scrollY: 100, matchMedia: query => {
      assert.equal(query, '(prefers-reduced-motion: reduce)');
      return { matches: reduce };
    }, scrollTo: options => calls.push(options) };
    const target = { getBoundingClientRect: () => ({ top: 400 }) };
    assert.equal(scrollToWorkflowStep(1, { currentStep: 1, browserWindow }), true);
    assert.equal(scrollToWorkflowStep(4, { currentStep: 4, browserWindow, targets: { 4: target } }), true);
    assert.deepEqual(calls, [
      { top: 0, behavior: reduce ? 'instant' : 'smooth' },
      { top: 500, behavior: reduce ? 'instant' : 'smooth' },
    ]);
  }
});

test('a missing STEP section fails without changing data or scrolling elsewhere', () => {
  const calls = [];
  const browserWindow = { scrollTo: options => calls.push(options) };
  assert.equal(scrollToWorkflowStep(2, { currentStep: 5, browserWindow }), false);
  assert.equal(scrollToWorkflowStep(1, { currentStep: 5 }), false);
  assert.deepEqual(calls, []);
});

test('STEP navigation keeps section headings below the measured fixed header', () => {
  const calls = [];
  const browserWindow = { scrollY: 500, scrollTo: options => calls.push(options) };
  const target = { getBoundingClientRect: () => ({ top: 200 }) };
  assert.equal(scrollToWorkflowStep(2, {
    currentStep: 3, headerOffset: 180, targets: { 2: target }, browserWindow,
  }), true);
  assert.deepEqual(calls, [{ top: 520, behavior: 'smooth' }]);
  assert.equal(scrollToWorkflowStep(2, {
    currentStep: 3, headerOffset: 800, targets: { 2: target }, browserWindow,
  }), true);
  assert.deepEqual(calls.at(-1), { top: 0, behavior: 'smooth' });
});
