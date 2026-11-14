// 上下のSTEP移動で同じ境界を使い、制作データには触れず表示位置だけを変える。
export function hasStep1WorkflowInput({ images = [], referenceAssets = [], castEditorText = '', castList = '', recognitionText = '', bg360Image, styleJson } = {}) {
  return Boolean(images.length || referenceAssets.length || castEditorText.trim() || castList.trim()
    || recognitionText.trim() || bg360Image || (styleJson && Object.keys(styleJson).length));
}

export function shouldScrollToEmptyStep1(previous, next) {
  return Boolean(next.step === 1 && next.empty && next.unlocked && !next.busy
    && (!previous || previous.step !== 1 || !previous.empty || !previous.unlocked || previous.busy));
}

export function scheduleWorkflowScroll(action, browserWindow) {
  let cancelled = false;
  const frame = browserWindow.requestAnimationFrame(() => { if (!cancelled) action(); });
  return () => { cancelled = true; browserWindow.cancelAnimationFrame(frame); };
}

export function scrollToWorkflowAction(target, { browserWindow, headerOffset = 0, gap = 16 } = {}) {
  if (!target || target.isConnected === false || typeof browserWindow?.scrollTo !== 'function') return false;
  const rect = target.getBoundingClientRect?.();
  const { innerHeight, scrollY } = browserWindow;
  if (![rect?.top, rect?.height, innerHeight, scrollY, headerOffset, gap].every(Number.isFinite)
      || rect.height <= 0 || headerOffset < 0 || gap < 0) return false;
  const visibleTop = headerOffset + gap;
  const visibleBottom = innerHeight - gap;
  if (rect.top >= visibleTop && rect.top + rect.height <= visibleBottom) return true;
  const available = Math.max(0, visibleBottom - visibleTop);
  const targetY = visibleTop + Math.max(0, (available - rect.height) / 2);
  const top = Math.max(0, scrollY + rect.top - targetY);
  const behavior = browserWindow.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ? 'instant' : 'smooth';
  browserWindow.scrollTo({ top, behavior });
  return true;
}

export function scrollToWorkflowStep(step, { currentStep, disabled = false, targets = {}, browserWindow, headerOffset = 0 } = {}) {
  if (disabled || !Number.isInteger(step) || step < 1 || step > 4
      || !Number.isInteger(currentStep) || currentStep < 1 || currentStep > 5 || step > currentStep
      || !Number.isFinite(headerOffset) || headerOffset < 0 || typeof browserWindow?.scrollTo !== 'function') return false;

  let top = 0;
  if (step !== 1) {
    const targetTop = targets[step]?.getBoundingClientRect?.()?.top;
    if (!Number.isFinite(targetTop) || !Number.isFinite(browserWindow.scrollY)) return false;
    top = Math.max(0, browserWindow.scrollY + targetTop - headerOffset);
  }
  const behavior = browserWindow.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ? 'instant' : 'smooth';
  browserWindow.scrollTo({ top, behavior });
  return true;
}
