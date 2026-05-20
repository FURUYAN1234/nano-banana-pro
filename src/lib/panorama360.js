// --- 360°パノラマ画像処理ユーティリティ (panorama360.js) ---
// App.jsx から抽出された純粋関数群
// 360°背景のクロップ処理とバリデーションロジック

/**
 * [v3.53 Phase2] 360°正距円筒図法（equirectangular）画像から指定方角の透視投影ビューをクロップする関数
 * @param {string} base64Img - Base64エンコードされた画像
 * @param {number} yaw - 水平方角（0°=正面, 90°=右, 180°=背面, 270°=左）
 * @param {number} pitch - 垂直方角（0°=水平, +上向き, -下向き）
 * @param {number} fov - 視野角（60°=望遠, 90°=標準, 120°=広角）
 * @param {number} outputWidth - 出力画像の幅（デフォルト: 640）
 * @param {number} outputHeight - 出力画像の高さ（デフォルト: 480）
 * @returns {Promise<string>} クロップ済みBase64画像
 */
export const cropEquirectangular = (base64Img, yaw, pitch, fov, outputWidth = 640, outputHeight = 480) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = outputWidth;
        canvas.height = outputHeight;
        const ctx = canvas.getContext('2d');

        const imgW = img.width;
        const imgH = img.height;

        // equirectangular: 横幅=360°, 縦幅=180°
        // yawからピクセル位置を計算（0°=画像中央, wrapping対応）
        const normalizedYaw = ((yaw % 360) + 360) % 360;
        const centerX = (normalizedYaw / 360) * imgW;

        // FOVからクロップ幅を計算
        const cropW = (fov / 360) * imgW;

        // pitchからY中心を計算（0°=画像中央, ±90°=上下端）
        const centerY = (imgH / 2) - (pitch / 180) * imgH;

        // クロップ高さ（アスペクト比維持）
        const cropH = cropW * (outputHeight / outputWidth);

        const startX = centerX - cropW / 2;
        const startY = Math.max(0, Math.min(imgH - cropH, centerY - cropH / 2));
        const clampedCropH = Math.min(cropH, imgH);

        // 水平方向のラップアラウンド処理
        if (startX >= 0 && startX + cropW <= imgW) {
          // ラップなし — そのまま描画
          ctx.drawImage(img, startX, startY, cropW, clampedCropH, 0, 0, outputWidth, outputHeight);
        } else if (startX < 0) {
          // 左端を超えた → 右端からラップ
          const overflowW = -startX;
          const mainW = cropW - overflowW;
          const mainRatio = mainW / cropW;
          // 右端部分（ラップ）
          ctx.drawImage(img, imgW - overflowW, startY, overflowW, clampedCropH, 0, 0, outputWidth * (1 - mainRatio), outputHeight);
          // メイン部分
          ctx.drawImage(img, 0, startY, mainW, clampedCropH, outputWidth * (1 - mainRatio), 0, outputWidth * mainRatio, outputHeight);
        } else {
          // 右端を超えた → 左端からラップ
          const mainW = imgW - startX;
          const overflowW = cropW - mainW;
          const mainRatio = mainW / cropW;
          // メイン部分
          ctx.drawImage(img, startX, startY, mainW, clampedCropH, 0, 0, outputWidth * mainRatio, outputHeight);
          // 左端部分（ラップ）
          ctx.drawImage(img, 0, startY, overflowW, clampedCropH, outputWidth * mainRatio, 0, outputWidth * (1 - mainRatio), outputHeight);
        }

        resolve(canvas.toDataURL('image/jpeg', 0.85));
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject(new Error('画像の読み込みに失敗しました'));
    img.src = base64Img;
  });
};

/**
 * [v3.48] 360度背景画像バリデーション
 * アスペクト比2:1かつJPEG/PNG/WebP形式であることを検証
 * @param {File} file - 画像ファイル
 * @returns {Promise<{width: number, height: number, aspectRatio: number, warning: string|null}>}
 */
export const validate360Image = (file) => {
  return new Promise((resolve, reject) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      reject(`対応していない形式です（${file.type}）。JPEG/PNG/WebP のみ対応。`);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      const is2to1 = Math.abs(aspectRatio - 2.0) < 0.15; // 誤差15%許容（PanoForge出力の微小なズレに対応）
      if (!is2to1) {
        reject(`360度画像ではありません（アスペクト比 ${aspectRatio.toFixed(2)}:1 — 2:1が必要）。PanoForge等で生成した equirectangular 画像をお使いください。`);
        return;
      }
      const warning = img.naturalWidth < 2048 ? `解像度が低めです（${img.naturalWidth}px — 2048px以上推奨）` : null;
      resolve({ width: img.naturalWidth, height: img.naturalHeight, aspectRatio, warning });
    };
    img.onerror = () => reject('画像の読み込みに失敗しました。');
    img.src = URL.createObjectURL(file);
  });
};

/**
 * 360°空間解析用のAIプロンプトテンプレート
 * @returns {string} Gemini API用のプロンプト文字列
 */
export const get360AnalysisPrompt = () => {
  return `この360度パノラマ画像（equirectangular形式）を分析し、以下の情報を**必ずJSON形式**で返答してください。それ以外のテキストは一切出力しないでください。

{
  "location": "場所の種類と具体的な特徴（例: 教室（窓際席・午後）、カフェテラス（都市部・夕暮れ）等）",
  "lighting": "主光源の方向と種類の簡潔な説明（例: 左側の大窓から自然光 + 天井蛍光灯）",
  "spatialType": "空間タイプ（indoor/outdoor/mixed）",
  "objects": "特徴的なオブジェクト3つ以内（例: 木製の机、黒板、カーテン）",
  "mood": "空間の雰囲気を一言で（例: 放課後の静けさ）"
}`;
};

/**
 * 360°解析結果JSONのパースとフォールバック処理
 * @param {string} responseText - AIからの応答テキスト
 * @returns {{location: string, lighting: string, spatialType: string, objects: string, mood: string}}
 */
export const parse360Analysis = (responseText) => {
  try {
    const jsonStr = responseText.match(/\{[\s\S]*\}/)?.[0];
    if (jsonStr) {
      return JSON.parse(jsonStr);
    }
  } catch (parseErr) {
    console.warn('[360° BG] Analysis JSON parse failed:', parseErr);
  }
  // フォールバック: パース失敗時のデフォルト値
  return {
    location: '360°パノラマ画像',
    lighting: '自動解析',
    spatialType: 'unknown',
    objects: '',
    mood: ''
  };
};
