import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createServer} from 'vite';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {hasPendingAutomaticWork,isEmergencyStopWorkActive} from '../src/lib/emergency-stop-ui.js';
import {beginApiWork,cancelApiWork,getApiWorkSignal} from '../src/lib/api-work-cancellation.js';

test('stop activation tracks actual manual work and terminal cancellation, not the auto toggle alone',()=>{
 beginApiWork('ui-state-fixture');
 assert.equal(isEmergencyStopWorkActive({isFullAutoMode:true},getApiWorkSignal()),false);
 for(const flag of ['isAnalyzing','is360Analyzing','isSearching','isEnhancing','isAssembling','isGeneratingImage','isFixingPolicy','is360CameraWorking','policyAutoRetrying'])assert.equal(isEmergencyStopWorkActive({[flag]:true},getApiWorkSignal()),true);
 assert.equal(isEmergencyStopWorkActive({},getApiWorkSignal()),false,'normal/error completion has no active work');
 cancelApiWork();assert.equal(isEmergencyStopWorkActive({isEnhancing:true,policyAutoRetrying:true},getApiWorkSignal()),false,'late busy flags cannot reactivate a stopped request');
 beginApiWork('fresh-ui-fixture');assert.equal(isEmergencyStopWorkActive({isSearching:true},getApiWorkSignal()),true);cancelApiWork();
});
test('owned full-auto gaps, retry waits and loop reservations remain stoppable, including a fresh queue after a previous abort',()=>{
 const base={isFullAutoMode:true,triggerFullAuto:2,consumedFullAutoTrigger:2,automaticAborted:false};
 assert.equal(hasPendingAutomaticWork({...base,fullAutoStep:0}),false,'armed input wait alone has no submitted work');
 for(const fullAutoStep of [2,3,4])assert.equal(hasPendingAutomaticWork({...base,fullAutoStep}),true);
 assert.equal(hasPendingAutomaticWork({...base,fullAutoStep:0,triggerFullAuto:3}),true,'unconsumed first trigger owns queued work');
 assert.equal(hasPendingAutomaticWork({...base,fullAutoStep:4,automaticAborted:true}),false);
 cancelApiWork();const pending=hasPendingAutomaticWork({...base,fullAutoStep:0,triggerFullAuto:3});assert.equal(isEmergencyStopWorkActive({pendingAutomaticWork:pending},getApiWorkSignal()),true,'old aborted transport does not disable a newly owned queue');
 assert.equal(isEmergencyStopWorkActive({pendingAutomaticWork:false},getApiWorkSignal()),false);
});
test('existing full-auto trigger consumes the UI observation without changing resume or execution routing',()=>{
 const hook=readFileSync(new URL('../src/hooks/useMangaWorkflow.js',import.meta.url),'utf8').replace(/\r\n/g,'\n');
 const match=hook.match(/フルオート生成トリガー監視\n  useEffect\(\(\) => \{([\s\S]*?)\n    \/\/ eslint-disable/);assert.ok(match);
 const calls=[],context=vm.createContext({triggerFullAuto:3,consumedFullAutoTriggerRef:{current:2},fullAutoAbortRef:{current:false},scenarioRunEpochRef:{nextFullAutoRound:true},runFullAuto:options=>calls.push(options)});
 vm.runInContext(`(()=>{${match[1]}\n})()`,context);assert.equal(context.consumedFullAutoTriggerRef.current,3);assert.equal(calls.length,1);assert.equal(calls[0].resume,false);
 context.triggerFullAuto=4;context.fullAutoAbortRef.current=true;vm.runInContext(`(()=>{${match[1]}\n})()`,context);assert.equal(context.consumedFullAutoTriggerRef.current,4);assert.equal(calls.length,1);
});
test('actual stop markup and styles distinguish grey idle/stopped from red active, with compact nonoverlapping geometry',async()=>{
 const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
 try{const {EmergencyStopButton}=await server.ssrLoadModule('/src/components/ControlBar.jsx');
 assert.equal(renderToStaticMarkup(React.createElement(EmergencyStopButton)), '');
 for(const active of [false,true]){const html=renderToStaticMarkup(React.createElement(EmergencyStopButton,{workReady:true,isApiProcessing:active}));assert.equal(/ disabled=/.test(html),!active);assert.match(html,new RegExp('aria-disabled="'+(!active)+'"'));assert.match(html,/>緊急停止<\/button>/);}
 const css=readFileSync(new URL('../src/index.css',import.meta.url),'utf8');assert.match(css,/\.api-force-stop:disabled\s*\{[^}]*background-color: #4b5563;[^}]*opacity: 1;/);assert.match(css,/\.api-force-stop,[\s\S]*?height: 40px;/);assert.match(css,/padding-top: 72px;/);assert.match(css,/top: calc\(20px \+ env\(safe-area-inset-top\)\);/);
 }finally{await server.close();}
});
