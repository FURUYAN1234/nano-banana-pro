import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
import {hasStep1WorkflowInput,shouldScrollToEmptyStep1,scrollToWorkflowAction,scheduleWorkflowScroll,scrollToWorkflowStep} from '../src/lib/step-navigation.js';

test('next action is centered between measured fixed header and viewport margins, with reduced motion respected',()=>{
 for(const reduced of [false,true]){
 const calls=[];const browserWindow={innerHeight:1338,scrollY:1564,matchMedia:()=>({matches:reduced}),scrollTo:o=>calls.push(o)};
 const target={getBoundingClientRect:()=>({top:1303.531,height:34})};
 assert.equal(scrollToWorkflowAction(target,{browserWindow,headerOffset:419.281}),true);
 const after=1303.531+1564-calls[0].top;assert.ok(after>=419.281+16);assert.ok(after+34<=1338-16);
 assert.equal(calls[0].behavior,reduced?'instant':'smooth');
 }
});
test('already-visible actions are not needlessly scrolled; invalid or detached targets do nothing',()=>{
 const calls=[];const browserWindow={innerHeight:700,scrollY:400,scrollTo:o=>calls.push(o)};
 assert.equal(scrollToWorkflowAction({getBoundingClientRect:()=>({top:300,height:44})},{browserWindow,headerOffset:200}),true);assert.equal(calls.length,0);
 for(const target of [null,{isConnected:false,getBoundingClientRect:()=>({top:800,height:44})},{getBoundingClientRect:()=>({top:NaN,height:44})}])assert.equal(scrollToWorkflowAction(target,{browserWindow,headerOffset:200}),false);
 assert.equal(calls.length,0);
});
test('short viewport still places a fitting action below the header with a bottom margin',()=>{
 const calls=[];const browserWindow={innerHeight:600,scrollY:300,scrollTo:o=>calls.push(o)};
 scrollToWorkflowAction({getBoundingClientRect:()=>({top:900,height:44})},{browserWindow,headerOffset:413});
 const y=1200-calls[0].top;assert.ok(y>=429);assert.ok(y+44<=584);
});
test('STEP1 emptiness uses actual image, reference and text/style inputs rather than workflow progress',()=>{
 assert.equal(hasStep1WorkflowInput({}),false);assert.equal(hasStep1WorkflowInput({castEditorText:'  ',styleJson:{}}),false);
 for(const content of [{images:[{}]},{referenceAssets:[{}]},{castEditorText:'人物A'},{castList:'人物B'},{recognitionText:'人物の特徴'},{bg360Image:'data:image/png;base64,fixture'},{styleJson:{style:'ink'}}])assert.equal(hasStep1WorkflowInput(content),true);
});
test('empty STEP1 scroll happens on arrival/reset/unlock, never unrelated render or locked/active work',()=>{
 const state={step:1,empty:true,unlocked:true,busy:false};
 assert.equal(shouldScrollToEmptyStep1(null,state),true);assert.equal(shouldScrollToEmptyStep1(state,{...state}),false);
 for(const previous of [{...state,step:2},{...state,empty:false},{...state,unlocked:false}])assert.equal(shouldScrollToEmptyStep1(previous,state),true);
 for(const next of [{...state,unlocked:false},{...state,busy:true},{...state,empty:false},{...state,step:2}])assert.equal(shouldScrollToEmptyStep1(null,next),false);
});
test('a queued scroll is cancelled on cleanup, blocking stale completion from stealing a newer location',()=>{
 let queued;const cancelled=[];const browserWindow={requestAnimationFrame:fn=>{queued=fn;return 7;},cancelAnimationFrame:id=>cancelled.push(id)};let moves=0;
 const cleanup=scheduleWorkflowScroll(()=>moves++,browserWindow);cleanup();queued();assert.equal(moves,0);assert.deepEqual(cancelled,[7]);
 scheduleWorkflowScroll(()=>moves++,browserWindow);queued();assert.equal(moves,1);
});

test('actual App reset callback and empty-view effect scroll after repeated same-empty resets without requiring input changes',()=>{
 const source=readFileSync(new URL('../src/App.jsx',import.meta.url),'utf8').replace(/\r\n/g,'\n');
 assert.match(source,/step1Reset=\{handleStep1Reset\}/);
 const handler=source.match(/const handleStep1Reset = (\(\) => \{[\s\S]*?\n  \});/);assert.ok(handler,'App must carry explicit reset intent');
 const effect=source.match(/useEffect\(\(\) => \{(\n    const next = \{ step: currentStep,[\s\S]*?)\n  \}, \[currentStep, step1HasInput,[^\]]+\]\);/);assert.ok(effect);
 const queued=[],moves=[];let resetCalls=0;
 const browserWindow={requestAnimationFrame:fn=>{queued.push(fn);return queued.length;},cancelAnimationFrame(){},scrollY:2012,scrollTo:options=>moves.push(options)};
 const context=vm.createContext({currentStep:1,step1HasInput:false,isMainLocked:false,emptyStep1ScrollBusy:false,step1ResetScrollEpoch:0,previousStep1ViewRef:{current:{step:1,empty:true,unlocked:true,busy:false,intent:0}},step1Reset:()=>resetCalls++,requestStep1ResetScroll:update=>{context.step1ResetScrollEpoch=update(context.step1ResetScrollEpoch);},shouldScrollToEmptyStep1,scheduleWorkflowScroll,scrollToWorkflowStep,window:browserWindow});
 const reset=vm.runInContext(handler[1],context),runEffect=vm.runInContext(`() => {${effect[1]}\n}`,context);
 runEffect();assert.equal(queued.length,0,'unrelated same-empty render must not scroll');
 for(let i=0;i<3;i++){reset();runEffect();assert.equal(queued.length,i+1);queued[i]();assert.equal(moves[i].top,0);assert.equal(context.currentStep,1);assert.equal(context.step1HasInput,false);}
 assert.equal(resetCalls,3);runEffect();assert.equal(queued.length,3);
 for(let i=0;i<2;i++)assert.equal(scrollToWorkflowStep(1,{currentStep:1,browserWindow}),true);
 assert.equal(moves.length,5);assert.ok(moves.every(move=>move.top===0));
});
