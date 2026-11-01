import { useEffect, useRef } from 'react';
import { configureDiagnosticSettings, observeDiagnosticRun, endDiagnosticRun, recordDiagnostic } from '../lib/diagnostics.js';

// Observe existing state; diagnostic recording never drives the workflow itself.
export function useWorkflowDiagnostics({isAnalyzing, isSearching, isAssembling, isGeneratingImage, isEnhancing, isFixingPolicy,
  provider, analysisModel, scenarioModel, promptModel, inputMode, colorMode,
  fullAuto, experimental, imageCount, scenarioLength, promptLength}) {
  const active = useRef({});
  useEffect(() => {
    const settings = {provider, analysisModel, scenarioModel, promptModel, inputMode, colorMode,
      fullAuto, experimental, imageCount, scenarioLength, promptLength};
    configureDiagnosticSettings(settings);
  }, [provider, analysisModel, scenarioModel, promptModel, inputMode, colorMode,
    fullAuto, experimental, imageCount, scenarioLength, promptLength]);

  useEffect(() => {
    void recordDiagnostic('workflow.settings', {provider, analysisModel, scenarioModel, promptModel,
      inputMode, colorMode, fullAuto, experimental});
  }, [provider, analysisModel, scenarioModel, promptModel, inputMode, colorMode, fullAuto, experimental]);

  useEffect(() => {
    for (const [operation, busy] of Object.entries({step1:isAnalyzing, step2:isSearching, step3:isAssembling, step4:isGeneratingImage, enhance:isEnhancing, safe_prompt:isFixingPolicy})) {
      if (busy && !active.current[operation]) {
        const run = observeDiagnosticRun(operation);
        active.current[operation] = {...run, startedAt: Date.now()};
      } else if (!busy && active.current[operation]) {
        const {startedAt, ...run} = active.current[operation];
        // Busy-state completion cannot establish generation/quality success.
        endDiagnosticRun({...run, elapsedMs: Date.now() - startedAt}, 'settled');
        delete active.current[operation];
      }
    }
  }, [isAnalyzing, isSearching, isAssembling, isGeneratingImage, isEnhancing, isFixingPolicy]);
}
