export const MAX_GENERATION_HISTORY_ITEMS = 1;

export const addGenerationHistoryItem = (history, item) => {
  return [item, ...(Array.isArray(history) ? history : [])]
    .slice(0, MAX_GENERATION_HISTORY_ITEMS);
};
