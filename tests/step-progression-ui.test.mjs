import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { getWorkflowStep } from '../src/lib/generation-history.js';

test('new STEP2/STEP3 results advance the next action while repairs preserve source-image readiness', () => {
  const ready = { castList: 'cast', scenario: 'scenario', finalPrompt: 'prompt', generatedImage: 'retained image', promptAssemblyRun: 2 };
  const imageSource = { promptAssemblyRun: 2, finalPrompt: 'prompt' };
  assert.equal(getWorkflowStep(ready), 4);
  assert.equal(getWorkflowStep({ ...ready, imageSource }), 5);
  assert.equal(getWorkflowStep({ ...ready, imageSource, promptAssemblyRun: 3 }), 4, 'same text rebuilt at STEP3 needs generation');
  assert.equal(getWorkflowStep({ ...ready, imageSource, finalPrompt: 'edited prompt' }), 4);
  assert.equal(getWorkflowStep({ ...ready, imageSource, genLog: ['[STOPPED] repair'] }), 5);
  assert.equal(getWorkflowStep({ ...ready, generatedImage: null, imageSource }), 4);
  assert.equal(getWorkflowStep({ ...ready, finalPrompt: '' }), 3);
  assert.equal(getWorkflowStep({ ...ready, scenario: 'regenerated scenario', finalPrompt: '', imageSource }), 3);
});

test('the progress header follows rerun activity before retained completed output and distinguishes image review', async () => {
  const server = await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true,hmr:false}});
  try {
    const {default:ControlBar}=await server.ssrLoadModule('/src/components/ControlBar.jsx');
    const render=props=>renderToStaticMarkup(React.createElement(ControlBar,{currentStep:5,...props}));
    for (const activeStep of [1,2,3,4]) {
      const html=render({activeStep,imagePhase:'検査中'});
      const steps=[...html.matchAll(/<li\b([^>]*)>([\s\S]*?)<\/li>/g)];
      assert.equal(steps.length,4);
      assert.match(steps[activeStep-1][1],/aria-current="step"/);
      assert.match(steps[activeStep-1][2],activeStep===4?/検査中/:/実行中/);
      for(let i=activeStep;i<4;i++) assert.match(steps[i][2],/待機/);
    }
    assert.doesNotMatch(render({activeStep:0}),/aria-current="step"/);
    assert.match(render({activeStep:0}),/生成済み/);
    assert.match(render({activeStep:4,imagePhase:'生成中'}),/生成中/);
  } finally {await server.close();}
});

test('OpenAI STEP4 has no additional review button; only generation pulses when it is next', async () => {
  const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  try {
    const { default: Step4Panel } = await server.ssrLoadModule('/src/components/Step4Panel.jsx');
    const base = { finalPrompt: 'OUTPUT: Single image.', generatedImage: 'data:image/png;base64,fixture', genLog: [],
      policyErrorMsg: '', castList: '', scenario: '', webCopyPartLengths: [], selectedEngine: 'openai' };
    for (const currentStep of [4, 5]) {
      for (const busy of [{}, { isGeneratingImage: true }, { isFixingPolicy: true }]) {
        const html = renderToStaticMarkup(React.createElement(Step4Panel, { ...base, currentStep, ...busy }));
        const buttons = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)];
        const generate = buttons.find(([, , body]) => /APIで新しい画像を生成する|画像を生成中/.test(body));
        const repair = buttons.find(([, , body]) => /表示中の画像を.*再検査/.test(body));
        assert.ok(generate);
        assert.equal(repair,undefined,'do not add a second action under STEP4 generation');
        const idle = !busy.isGeneratingImage && !busy.isFixingPolicy;
        assert.equal(generate[1].includes('next-step-gentle-pulse'), idle && currentStep === 4);
      }
    }
  } finally {
    await server.close();
  }
});

test('STEP4 opens for a prepared prompt or saved image and stays hidden during prerequisite work', async () => {
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const gate = app.match(/\{([^\r\n{}]+?)\s*&&\s*\(<Step4Panel/)?.[1];
  assert.ok(gate, 'test the actual App condition that renders STEP4');
  const visible = new Function('finalPrompt','generatedImage','isAnalyzing','isSearching','isAssembling',`return Boolean(${gate});`);
  assert.equal(visible('',null,false,false,false),false);
  assert.equal(visible('   ',null,false,false,false),false);
  assert.equal(visible('prepared prompt',null,false,false,false),true);
  assert.equal(visible('', 'saved-image',false,false,false),true);
  for(const busy of [[true,false,false],[false,true,false],[false,false,true]]) {
    assert.equal(visible('prepared prompt','saved-image',...busy),false);
  }
});

test('STEP4 empty image area describes the selected four-panel or five-to-eight-panel mode', async () => {
  const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  try {
    const { default: Step4Panel } = await server.ssrLoadModule('/src/components/Step4Panel.jsx');
    for (const experimentalEnabled of [false, true]) {
      const html = renderToStaticMarkup(React.createElement(Step4Panel, {
        currentStep: 4, finalPrompt: 'OUTPUT: Single image.', generatedImage: null,
        genLog: [], policyErrorMsg: '', castList: '', scenario: '', webCopyPartLengths: [],
        selectedEngine: 'openai', experimentalEnabled,
      }));
      const message = html.match(/<p[^>]*>(ここに生成された[\s\S]*?漫画が表示されます)<\/p>/)?.[1];
      assert.equal(message, experimentalEnabled
        ? 'ここに生成された5～8コマ漫画が表示されます'
        : 'ここに生成された4コマ漫画が表示されます');
    }
  } finally {
    await server.close();
  }
});

test('STEP3 exposes its live progress and advances to STEP4 only after the prompt is ready', async () => {
  const [app, step3] = await Promise.all([
    readFile(new URL('../src/App.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/Step3Panel.jsx', import.meta.url), 'utf8'),
  ]);

  assert.match(step3, /<ThinkingLog thought=\{assembleThought\}/);
  assert.match(step3, /isAssembling[\s\S]*?scrollIntoView\(\{ behavior: 'smooth', block: 'center' \}\)/);
  assert.match(app, /wasAssemblingRef\.current = true/);
  assert.match(app, /!wasAssemblingRef\.current \|\| !finalPrompt\?\.trim\(\)[\s\S]*?outputRef\.current\?\.scrollIntoView\(\{ behavior: 'smooth', block: 'start' \}\)/);
});

test('each newly actionable STEP button is placed at the lower edge and live work centers its progress window', async () => {
  const [app, step1, step2, step3, step4] = await Promise.all([
    readFile(new URL('../src/App.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/Step1Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/Step2Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/Step3Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
  ]);

  assert.match(app, /activeActionRef\?\.current\?\.scrollIntoView\(\{ behavior: 'smooth', block: 'end' \}\)/);
  assert.match(app, /const step2ActionRef = useRef\(null\)/);
  assert.match(app, /const step3ActionRef = useRef\(null\)/);
  assert.match(app, /const step4ActionRef = useRef\(null\)/);
  assert.doesNotMatch(app, /stepActionRefs\.current/);
  assert.match(app, /isAnalyzing[\s\S]*?step1ProgressRef\.current\?\.scrollIntoView\(\{ behavior: 'smooth', block: 'center' \}\)/);
  assert.match(app, /isSearching[\s\S]*?step2ProgressRef\.current\?\.scrollIntoView\(\{ behavior: 'smooth', block: 'center' \}\)/);
  assert.match(step1, /ref=\{analysisProgressRef\}/);
  assert.match(step2, /ref=\{scenarioActionRef\}[\s\S]*?ref=\{scenarioProgressRef\}/);
  assert.match(step3, /ref=\{promptActionRef\}/);
  assert.match(step4, /ref=\{imageActionRef\}/);
});

test('the next actionable STEP button pulses after each completed step', async () => {
  const [step2, step3, step4, css] = await Promise.all([
    readFile(new URL('../src/components/Step2Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/Step3Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/index.css', import.meta.url), 'utf8'),
  ]);

  assert.match(step2, /currentStep === 2 && !isSearching[\s\S]*?next-step-gentle-pulse/);
  assert.match(step3, /currentStep === 3 && !isAssembling[\s\S]*?next-step-gentle-pulse/);
  assert.match(step4, /currentStep === 4 && !isGeneratingImage[\s\S]*?next-step-gentle-pulse/);
  assert.match(css, /@keyframes next-step-gentle-pulse/);
  assert.match(css, /filter:\s*brightness\(0\.84\)[\s\S]*filter:\s*brightness\(1\.18\)/);
  assert.match(css, /animation:\s*next-step-gentle-pulse 1\.6s ease-in-out infinite/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.next-step-gentle-pulse[\s\S]*animation:\s*none/);
});

test('image generation centers the actual image display once and respects reduced motion', async () => {
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const effect = app.match(/useEffect\(\(\) => \{\s*if \(!isGeneratingImage\) return;([\s\S]*?)\}, \[isGeneratingImage, imageResultRef\]\);/)[1];
  const execute = new Function('isGeneratingImage', 'requestAnimationFrame', 'cancelAnimationFrame', 'imageResultRef', 'window', 'document',
    `if (!isGeneratingImage) return; ${effect}`);
  for (const reduce of [false, true]) {
    const calls = [];
    const options = [fn => { fn(); return 1; }, id => calls.push({ cancelled: id }),
      { current: { scrollIntoView: options => calls.push(options) } },
      { matchMedia: () => ({ matches: reduce }), scrollTo: () => calls.push('incorrect page bottom') },
      { documentElement: { scrollHeight: 9000 } }];
    assert.equal(execute(false, ...options), undefined);
    assert.equal(calls.length, 0);
    const cleanup = execute(true, ...options);
    assert.deepEqual(calls, [{ block: 'center', behavior: reduce ? 'instant' : 'smooth' }]);
    cleanup();
    assert.deepEqual(calls[1], { cancelled: 1 });
  }
});

test('the completed result fades once without animating behind the progress overlay', async () => {
  const [step4, css] = await Promise.all([
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/index.css', import.meta.url), 'utf8'),
  ]);
  assert.match(step4, /isGeneratingImage \? '' : ' generated-image-reveal'/);
  assert.match(css, /@keyframes generated-image-reveal\s*\{\s*from \{ opacity: 0; \}\s*to \{ opacity: 1; \}/);
  assert.match(css, /animation: generated-image-reveal 450ms ease-out both/);
  const reducedMotionRules = css.match(/@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)^\}/m)?.[1] || '';
  assert.match(reducedMotionRules, /\.generated-image-reveal\s*\{\s*animation: none/);
});

test('STEP4 keeps its wall-clock timer visible in the sticky header through generation and QA', async () => {
  const [step4, workflow] = await Promise.all([
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8'),
  ]);
  assert.match(step4, /position: 'sticky'[\s\S]*?isGeneratingImage && generationWaitLog/);
  assert.match(workflow, /Date\.now\(\) - generationStartedAt/);
  assert.match(workflow, /progressPhase = '品質検査'/);
  assert.match(workflow, /progressPhase = repair \? '修正画像生成' : '画像生成'/);
  assert.match(workflow, /finally \{\s*clearInterval\(genTimer\)/);
  assert.doesNotMatch(workflow, /genTickCount/);
});
