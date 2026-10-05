import { callAI } from './ai-provider';
import { getPolicyAnalysisPrompt, getPolicyFallbackPrompt } from './prompts';

const promptLiterals = (prompt, pattern) => String(prompt).match(pattern) || [];

export function assertPolicyRepairPreservesPrompt(original, candidate) {
  if (typeof candidate !== 'string' || !candidate.trim()) throw new Error('修正文が空です。');
  const bubbles = /\bB\d+\s*=\s*"(?:\\.|[^"\\])*"/g;
  const title = /(?:Top title EXACTLY\s*"[^"]*"|^- Title:\s*[^\n]+|Top page:[^\n]*title:\s*"[^"]*")/gm;
  if (JSON.stringify(promptLiterals(original, bubbles)) !== JSON.stringify(promptLiterals(candidate, bubbles))) {
    throw new Error('修正文で確定台詞が変更されました。');
  }
  if (JSON.stringify(promptLiterals(original, title)) !== JSON.stringify(promptLiterals(candidate, title))) {
    throw new Error('修正文でタイトルが変更されました。');
  }
  if (JSON.stringify(promptLiterals(original, /^## Panel \d+/gm)) !== JSON.stringify(promptLiterals(candidate, /^## Panel \d+/gm))) {
    throw new Error('修正文でコマ構造が変更されました。');
  }
  return candidate;
}

export function applyPolicyReplacements(finalPrompt, replacements, onProgress = () => {}) {
  let modifiedPrompt = finalPrompt;
  let appliedCount = 0;
  let failedCount = 0;
  for (const rep of replacements) {
    if (typeof rep?.from !== 'string' || !rep.from || typeof rep?.to !== 'string' || !rep.to) continue;
    if (modifiedPrompt.includes(rep.from)) {
      modifiedPrompt = modifiedPrompt.replace(rep.from, () => rep.to);
      appliedCount++;
      onProgress(`✅ "${rep.from.substring(0, 40)}..." → "${rep.to.substring(0, 40)}..." (${rep.reason || ''})`);
    } else {
      failedCount++;
      onProgress(`⚠️ 未発見（スキップ）: "${rep.from.substring(0, 50)}..."`);
    }
  }
  return {modifiedPrompt, appliedCount, failedCount};
}

// [v3.85-alpha] コンテンツポリシー自動修正ロジックの外部モジュール化

/**
 * プロンプトに含まれるポリシー違反（検閲）になりそうな箇所を安全な表現に自動置換または再生成する
 */
export async function fixPolicyViolation({
  finalPrompt,
  policyErrorMsg,
  repairFeedback = '',
  shouldStop = () => false,
  onProgress = () => {}
}) {
  if (!finalPrompt || !policyErrorMsg) {
    throw new Error("プロンプトとエラーメッセージが必要です。");
  }
  if (shouldStop()) return {success: false, reason: 'cancelled'};
  const finalizeRepair = (candidate, details) => {
    try {
      const modifiedPrompt = assertPolicyRepairPreservesPrompt(finalPrompt, candidate);
      return {success: true, ...details, modifiedPrompt};
    } catch (error) {
      onProgress(error.message);
      return {success: false, reason: 'invalid_repair', message: error.message};
    }
  };

  onProgress("[Phase 1/5] エラーメッセージを解析中...");
  onProgress("[Phase 2/5] 問題箇所の特定をAIにリクエスト中...");

  const metaPrompt = getPolicyAnalysisPrompt(policyErrorMsg.trim(), finalPrompt, repairFeedback);

  const result = await callAI(metaPrompt, [], null, onProgress);
  if (shouldStop()) return {success: false, reason: 'cancelled'};
  onProgress("[Phase 3/5] AIの応答を受信・解析中...");

  if (!result.text || !result.text.trim()) {
    const message = 'AIからの応答が空で、修正案を確認できませんでした。';
    onProgress(message);
    return {success: false, reason: 'invalid_response', message};
  }

  onProgress("[Phase 4/5] 置換テーブルをプロンプトに適用中...");

  let replacements = [];
  let isJsonSuccess = false;
  try {
    let jsonStr = result.text.trim();
    const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }
    const bracketStart = jsonStr.indexOf('[');
    const bracketEnd = jsonStr.lastIndexOf(']');
    if (bracketStart !== -1 && bracketEnd !== -1) {
      jsonStr = jsonStr.substring(bracketStart, bracketEnd + 1);
    }
    replacements = JSON.parse(jsonStr);
    isJsonSuccess = Array.isArray(replacements);
  } catch (parseError) {
    console.warn("JSON parse error, falling back to full regeneration:", parseError);
  }

  if (isJsonSuccess) {
    if (!replacements.length) {
      const message = '承認済み契約を保った安全な修正箇所を特定できませんでした。元の内容は変更していません。';
      onProgress(message);
      return {success: false, reason: 'no_safe_revision', message};
    }
    const {modifiedPrompt, appliedCount, failedCount} = applyPolicyReplacements(finalPrompt, replacements, onProgress);

    if (appliedCount > 0) {
      return finalizeRepair(modifiedPrompt, {
        method: "replacement",
        appliedCount,
        failedCount
      });
    }
  }

  // 置換テーブルの取得に失敗したか、置換箇所がプロンプト内に見つからなかった場合は
  // 全文再生成方式のフォールバック処理を実行する
  onProgress("[Fallback] 全文再生成モードで修正中...");
  if (shouldStop()) return {success: false, reason: 'cancelled'};
  const fallbackPrompt = getPolicyFallbackPrompt(policyErrorMsg.trim(), finalPrompt, repairFeedback);
  const fallbackResult = await callAI(fallbackPrompt, [], null, onProgress);
  if (shouldStop()) return {success: false, reason: 'cancelled'};

  if (fallbackResult.text && fallbackResult.text.length > 100) {
    return finalizeRepair(fallbackResult.text.trim(), {method: "regeneration"});
  } else {
    const message = 'フォールバックの応答が空または短すぎるため、完全な修正案を確認できませんでした。';
    onProgress(message);
    return {success: false, reason: 'invalid_response', message};
  }
}
