// UI observation only: provider signals, automatic routing and timers stay owned by the workflow.
export function hasPendingAutomaticWork({ isFullAutoMode = false, fullAutoStep = 0, triggerFullAuto = 0, consumedFullAutoTrigger = 0, automaticAborted = false } = {}) {
  return Boolean(isFullAutoMode && !automaticAborted
    && ((Number.isInteger(fullAutoStep) && fullAutoStep >= 2 && fullAutoStep <= 4)
      || (Number.isInteger(triggerFullAuto) && Number.isInteger(consumedFullAutoTrigger) && triggerFullAuto > consumedFullAutoTrigger)));
}

export function isEmergencyStopWorkActive(state = {}, signal) {
  if (state.isAborting) return false;
  // An owned new queue can precede the next transport controller after an earlier stop.
  if (state.pendingAutomaticWork) return true;
  if (signal?.aborted) return false;
  return ['isAnalyzing', 'is360Analyzing', 'isSearching', 'isEnhancing', 'isAssembling',
    'isGeneratingImage', 'isFixingPolicy', 'is360CameraWorking', 'policyAutoRetrying']
    .some(flag => Boolean(state[flag]));
}
