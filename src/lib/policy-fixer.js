import { callAI } from './ai-provider';
import { getPolicyAnalysisPrompt, getPolicyFallbackPrompt } from './prompts';

// [v3.85-alpha] コンテンツポリシー自動修正ロジックの外部モジュール化

/**
 * プロンプトに含まれるポリシー違反（検閲）になりそうな箇所を安全な表現に自動置換または再生成する
 */
export async function fixPolicyViolation({
  finalPrompt,
  policyErrorMsg,
  onProgress,
  selectedEngine
}) {
  if (!finalPrompt || !policyErrorMsg) {
    throw new Error("プロンプトとエラーメッセージが必要です。");
  }

  onProgress("[Phase 1/5] エラーメッセージを解析中...");
  onProgress("[Phase 2/5] 問題箇所の特定をAIにリクエスト中...");

  const metaPrompt = getPolicyAnalysisPrompt(policyErrorMsg.trim(), finalPrompt);

  const result = await callAI(metaPrompt, [], null, onProgress);
  onProgress("[Phase 3/5] AIの応答を受信・解析中...");

  if (!result.text || result.text.trim().length < 10) {
    throw new Error("AIからの応答が空です。エラー情報をより詳しく入力して再試行してください。");
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
    isJsonSuccess = Array.isArray(replacements) && replacements.length > 0;
  } catch (parseError) {
    console.warn("JSON parse error, falling back to full regeneration:", parseError);
  }

  if (isJsonSuccess) {
    let modifiedPrompt = finalPrompt;
    let appliedCount = 0;
    let failedCount = 0;

    for (const rep of replacements) {
      if (!rep.from || !rep.to) continue;
      if (modifiedPrompt.includes(rep.from)) {
        modifiedPrompt = modifiedPrompt.replace(rep.from, rep.to);
        appliedCount++;
        onProgress(`✅ "${rep.from.substring(0, 40)}..." → "${rep.to.substring(0, 40)}..." (${rep.reason || ''})`);
      } else {
        failedCount++;
        onProgress(`⚠️ 未発見（スキップ）: "${rep.from.substring(0, 50)}..."`);
      }
    }

    if (appliedCount > 0) {
      return {
        success: true,
        method: "replacement",
        modifiedPrompt,
        appliedCount,
        failedCount
      };
    }
  }

  // 置換テーブルの取得に失敗したか、置換箇所がプロンプト内に見つからなかった場合は
  // 全文再生成方式のフォールバック処理を実行する
  onProgress("[Fallback] 全文再生成モードで修正中...");
  const fallbackPrompt = getPolicyFallbackPrompt(policyErrorMsg.trim(), finalPrompt);
  const fallbackResult = await callAI(fallbackPrompt, [], null, onProgress);

  if (fallbackResult.text && fallbackResult.text.length > 100) {
    return {
      success: true,
      method: "regeneration",
      modifiedPrompt: fallbackResult.text.trim()
    };
  } else {
    throw new Error("フォールバックでも適切な応答が得られませんでした。");
  }
}
