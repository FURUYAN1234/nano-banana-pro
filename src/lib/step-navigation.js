// 上下のSTEP移動で同じ境界を使い、制作データには触れず表示位置だけを変える。
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
