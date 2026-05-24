/**
 * AI Provider Router for Nano Banana Pro
 * v1.0.0 - Dual Engine 抽象化レイヤー
 *
 * 起動時に選択された AI Engine に基づいて、
 * テキスト生成（Step 1-3）と画像生成（Step 4）のルーティングを行う。
 *
 * 設計思想:
 * - Gemini側のコード（gemini.js, imagen.js）は一切変更しない
 * - OpenAI側のコード（openai.js, openai-text.js）も独立
 * - この1ファイルだけが切り替えロジックを持つ
 */

import { callThinkingGemini } from './gemini';
import { callOpenAIText } from './openai-text';

// --- エンジン状態管理 ---
// 'gemini' | 'openai'
let activeEngine = 'gemini';

/**
 * アクティブエンジンを設定する（起動時にAPIキー入力で1回だけ呼ばれる）
 */
export const setActiveEngine = (engine) => {
    if (engine !== 'gemini' && engine !== 'openai') {
        console.warn(`[AI Provider] Unknown engine "${engine}". Defaulting to "gemini".`);
        activeEngine = 'gemini';
        return;
    }
    activeEngine = engine;
    console.log(`[AI Provider] Engine switched to: ${engine.toUpperCase()}`);
};

/**
 * 現在のアクティブエンジンを取得する
 */
export const getActiveEngine = () => activeEngine;

/**
 * エンジン名を日本語で返す（UI表示用）
 */
export const getEngineDisplayName = () => {
    return activeEngine === 'openai' ? 'ChatGPT' : 'Gemini';
};

/**
 * 統一テキスト生成関数
 * callThinkingGemini と同一シグネチャ:
 *   (prompt, images, systemInstruction, onThinkingUpdate) => { text, thought, model }
 *
 * activeEngine に応じて Gemini or OpenAI に自動ルーティングする。
 * App.jsx 側は callAI を呼ぶだけで、内部のエンジン差異を意識しなくてよい。
 */
export const callAI = async (prompt, images = null, systemInstruction = null, onThinkingUpdate) => {
    let result;
    if (activeEngine === 'openai') {
        result = await callOpenAIText(prompt, images, systemInstruction, onThinkingUpdate);
    } else {
        result = await callThinkingGemini(prompt, images, systemInstruction, onThinkingUpdate);
    }

    // 思考プロセス（<thought>タグ）の抽出と分離処理（両API対応）
    if (result && result.text) {
        const thoughtRegex = /<thought>([\s\S]*?)<\/thought>/i;
        const match = result.text.match(thoughtRegex);
        if (match) {
            const extractedThought = match[1].trim();
            // text から thought タグ部分を削除してクリーンにする
            result.text = result.text.replace(thoughtRegex, '').trim();
            
            // thought フィールドを更新またはマージ
            if (result.thought && result.thought !== "通常処理が完了しました。" && result.thought !== "通常処理が完了しました（思考トレースは利用不可）。" && !result.thought.includes("による処理が完了しました。")) {
                result.thought = `${result.thought}\n\n[プロンプト内思考プロセス]\n${extractedThought}`;
            } else {
                result.thought = extractedThought;
            }
        }
    }
    return result;
};
