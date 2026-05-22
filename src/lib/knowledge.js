/**
 * Nano Banana Pro Local RAG Knowledge Base
 * v1.0.0
 * 
 * 4コマ漫画のシナリオ生成において、AI特有の「抽象的でフワッとした描写」を防ぐための辞書データ。
 * 選択された設定（場所やキャラの感情）に応じた具体的なディテールをプロンプトに動的注入する。
 */



import { locationDetails } from './locations.js';






export const getLocationDetails = (locationName) => {
  const details = locationDetails[locationName];
  if (details) {
    return `【環境設定データベース】\n・小道具(Props): ${details.props.join(", ")}\n・環境音: ${details.ambient}\n・視覚的特徴: ${details.visual}`;
  }
  
  // 登録されていない場所の場合は固定の小道具を押し付けず、AIに文脈から推測させる
  return `【環境設定データベース】\n※指定された場所「${locationName}」ならではの具体的なディテール（小道具、環境音、視覚的特徴）を文脈から推測し、積極的に描写せよ。`;
};

/**
 * 感情表現やリアクションを構造的に構築するためのガイドライン
 */
export const getReactionGuidelines = () => {
  return `【リアクション構築ガイドライン（偏り防止構造）】
1. 感情の起伏は「抽象的な表現」ではなく、具体的な「物理的・身体的アクション」に変換して描写せよ。（例：単に「驚愕する」ではなく「目を見開き、持っている物を落とす」など）
2. 過去の定番ギャグ（パイ投げ、バナナの皮、ダイナマイト、黒歴史ノート等）に依存した安易な描写を禁止する。
3. そのシーンの文脈、キャラクターの性格、および指定された場所（Location）の環境・小道具と論理的に結びついた、独自のリアクションを構築せよ。`;
};
