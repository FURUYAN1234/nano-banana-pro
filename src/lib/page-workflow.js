import { inferImageQualityMode } from './image-quality-failsafe.js';
import { buildExperimentalImagePrompt, readExperimentalSource } from './experimental-manga.js';

// The page contract travels with the prepared prompt, never inferred from panel count.
export function resolvePageWorkflow({ experimentalEnabled, prepared, prompt, input }) {
  if (experimentalEnabled && input?.providerFamily === 'gemini') throw new Error('Geminiは4コマのみ対応しています。');
  if (!experimentalEnabled) {
    if (/^Create ONE complete Japanese manga page with EXACTLY \d+ framed panels\./.test(prompt)) {
      throw new Error('実験用の指示文を通常4コマの処理には送れません。STEP3を作り直してください。');
    }
    const kind = inferImageQualityMode(prompt);
    return {kind, count:kind === 'four-panel' ? 4 : 1};
  }
  if (!prepared || prepared.source.scenario !== input.scenario || prepared.source.castList !== input.castList
    || (prepared.source.userDirection || '') !== (input.userDirection || '')
    || prepared.source.colorMode !== input.colorMode || prepared.prompt !== prompt
    || prepared.prompt !== buildExperimentalImagePrompt(prepared.plan, readExperimentalSource(input), input)) {
    throw new Error('実験の元台本・設定・描画指示が変更されています。STEP3を作り直してください。');
  }
  return {kind:'experimental-manga',count:prepared.plan.count};
}

export function applyPageCandidateSelection(outcome, selection, retainedReview) {
  const retained = selection.candidate !== outcome.candidate;
  const finalReview = retained ? selection.selectedReview || retainedReview : outcome.finalReview;
  return {...outcome, candidate:selection.candidate, finalReview,
    validationWarning:finalReview?.pass !== true || !outcome.canContinue,
    stopReason:!outcome.canContinue ? outcome.stopReason : finalReview?.pass === true ? null : 'no_improvement',
    history:[...outcome.history,{comparison:selection.comparison}]};
}
