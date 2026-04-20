// [v2.53.3] Camera Protocol v4.0 + Intelligent Camera Direction
// App.jsxに以下の変更を適用:
// 1. CAMERA PROTOCOL v3.2 → v4.0 (数値ウェイト化)
// 2. cameraAngles配列にウェイト付きタグ追加
// 3. getRandomAngle() → シャッフルベース重複なし
// 4. MANDATORY LENS ENFORCEMENT簡潔化
// 5. シナリオ生成プロンプトに[Camera: XXX]タグ追加
// 6. §3 IDENTITY ANCHORING(品質劣化指示)削除

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');
let changeCount = 0;

// === 1. CAMERA PROTOCOL v3.2 → v4.0 ===
const oldProtocol = `      // [v2.53] ANTIGRAVITY HYPER-DYNAMIC CAMERA PROTOCOL v3.2 — Gemini推奨の構図・カメラワーク超強化
      const dynamicCamera = \`
ANTIGRAVITY HYPER-DYNAMIC CAMERA PROTOCOL (v3.2):`;

const oldProtocolEnd = `- Sound effect text (SFX, onomatopoeia drawn as art) MUST follow the 3D space distortion. Drawn impact text must curve and distort along the spatial warping of the scene. Do NOT place flat, undistorted text over a warped scene.
    \`;`;

// パターンでプロトコル全体を検出・置換
const protocolRegex = /\/\/ \[v2\.53\] ANTIGRAVITY HYPER-DYNAMIC CAMERA PROTOCOL v3\.2[\s\S]*?Sound effect text[\s\S]*?warped scene\.\s*\n\s*\`;/;

const newProtocol = `      const dynamicCamera = \`
ANTIGRAVITY HYPER-DYNAMIC CAMERA PROTOCOL (v4.0):

§1. CAMERA DISTORTION WEIGHTS (MANDATORY — Apply these weighted tags to EVERY panel):
(extreme perspective distortion:1.8), (NO eye-level shot:2.0), (NO flat symmetrical composition:2.0), (dramatic camera angle:1.7), (visible lens distortion:1.6), (tilted horizon line:1.5), (foreshortened body proportions:1.6), (exaggerated depth of field:1.5)

Available lens effects — EACH PANEL MUST USE ONE:
  * (extreme fish-eye barrel distortion:1.8), (spherical warping:1.6), (bulging foreground:1.5) — Ultra wide-angle spherical distortion
  * (telephoto compression:1.7), (flattened depth layers:1.5), (unnaturally close background:1.4) — Background crushes into foreground
  * (dutch angle 25 degrees:1.7), (tilted world:1.6), (zero horizontal lines:1.5) — Frame tilted 15-45 degrees
  * (extreme low angle:1.7), (worm's eye view:1.6), (giant feet tiny head:1.5) — Camera at ground level looking UP
  * (extreme high angle:1.7), (bird's eye view:1.6), (foreshortened legs:1.5) — Camera from above looking DOWN

[FLAT SHOT BAN]: (eye-level shot:0.1), (straight-on symmetrical:0.1) — Eye-level/straight compositions are FORBIDDEN. Weight them down to near-zero.
[BODY DEFORMATION]: Characters' body parts closest to camera MUST be drawn 50%+ larger than far-side parts. This distortion is INTENTIONAL.

§2. CAST MANAGEMENT & CLONE PREVENTION (CRITICAL):
- Each named character appears ONLY ONCE per panel. Drawing duplicates (foreground+background copy, reflection, silhouette) is FORBIDDEN.
- Background characters use cast members NOT speaking in that panel.

§3. GAG MANGA INTERACTION RULES:
1. Characters MUST interact — no neutral standing poses or direct camera stares.
2. (exaggerated facial expressions:1.5), (extreme emotional reactions:1.4) — Force comical expressions: blank white eyes, jaw drops, fury, waterfall tears.
3. (dynamic body language:1.4), (full body reactions:1.3) — Characters physically react with entire bodies.
4. Do NOT overlay floating close-up eyes or ghostly face inserts as background elements.
5. Do NOT draw "adjusting glasses" pose unless the character explicitly wears glasses.

§4. PERSPECTIVE-ALIGNED VFX:
- Speed lines, explosions, lightning MUST follow the panel's perspective distortion.
- If fish-eye: effects curve radially. If dutch angle: effects tilt with the world.
    \`;`;

if (protocolRegex.test(content)) {
  content = content.replace(protocolRegex, newProtocol);
  changeCount++;
  console.log('[1/6] CAMERA PROTOCOL v3.2 → v4.0: OK');
} else {
  console.log('[1/6] CAMERA PROTOCOL: SKIP (not found or already updated)');
}

// === 2. cameraAngles配列にウェイト付きタグ ===
const oldAnglesMarker = '// [v2.53] HYPER-DYNAMIC Camera Angle Generator';
const newAnglesMarker = '// [v2.53.3] HYPER-DYNAMIC Camera Angle Generator';

if (content.includes(oldAnglesMarker)) {
  // 配列全体を置換
  const anglesRegex = /\/\/ \[v2\.53\] HYPER-DYNAMIC Camera Angle Generator[^\n]*\n\s*const cameraAngles = \[[\s\S]*?\];/;
  const newAngles = `// [v2.53.3] HYPER-DYNAMIC Camera Angle Generator — 数値ウェイト付きタグ強化版
      const cameraAngles = [
        "EXTREME FISH-EYE LOW ANGLE: (fish-eye barrel distortion:1.8), (extreme low angle:1.7), (bulging foreground objects:1.6), (curved horizon:1.5). Camera at knee height, spherical distortion warps floor outward, character legs appear massive",
        "DYNAMIC TELEPHOTO HIGH ANGLE: (telephoto compression:1.8), (extreme high angle:1.7), (flattened depth:1.6), (compressed background:1.5). Looking down from above, faces large, bodies compress vertically",
        "EXTREME DUTCH ANGLE (30° tilt): (dutch angle 30 degrees:1.8), (tilted horizon:1.7), (diagonal composition:1.6), (zero horizontal lines:1.5). Entire scene tilted 30 degrees, floor becomes steep diagonal",
        "ULTRA LOW ANGLE FISH-EYE: (extreme low angle:1.8), (fish-eye distortion:1.7), (exaggerated foreshortening:1.6), (towering characters:1.5). Camera on floor looking straight up, ceiling curves into dome",
        "DRAMATIC TELEPHOTO MEDIUM SHOT: (telephoto compression:1.8), (claustrophobic depth:1.7), (flattened spatial layers:1.6). Background objects unnaturally close to characters",
        "BIRD'S EYE DUTCH ANGLE (20° tilt): (extreme high angle:1.8), (bird's eye view:1.7), (dutch angle 20 degrees:1.6), (foreshortened bodies:1.5). Directly overhead, tilted 20 degrees",
        "EXTREME WIDE ANGLE OVER-THE-SHOULDER: (fish-eye distortion:1.7), (over-the-shoulder composition:1.6), (barrel distortion:1.5). Fish-eye from behind one character's massive shoulder",
        "CINEMATIC LOW ANGLE TELEPHOTO: (extreme low angle:1.8), (telephoto compression:1.7), (imposing heroic pose:1.5). Camera below chin level, background compresses dramatically flat",
        "DYNAMIC ACTION FISH-EYE WIDE SHOT: (fish-eye barrel distortion:1.8), (spherical scene distortion:1.7), (exaggerated depth separation:1.6). Full scene through spherical distortion, edges curve dramatically",
        "WORM'S EYE EXTREME DUTCH (15° tilt): (extreme low angle:1.8), (worm's eye view:1.7), (dutch angle 15 degrees:1.6), (giant shoes tiny heads:1.5). Camera at ground level tilted, ant's-eye perspective"
      ];`;
  
  if (anglesRegex.test(content)) {
    content = content.replace(anglesRegex, newAngles);
    changeCount++;
    console.log('[2/6] cameraAngles weights: OK');
  }
} else {
  console.log('[2/6] cameraAngles: SKIP (not found or already updated)');
}

// === 3. getRandomAngle() → シャッフルベース ===
const oldRandom = `      const getRandomAngle = () => cameraAngles[Math.floor(Math.random() * cameraAngles.length)];`;
const newShuffle = `      // [v2.53.2] Fisher-Yatesシャッフルで4パネル全て異なるカメラアングルを保証
      // 旧getRandomAngle()は重複が発生していたため廃止
      const shuffleArray = (arr) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };
      const shuffledCameras = shuffleArray(cameraAngles).slice(0, 4);
      let cameraSlotIndex = 0;`;

if (content.includes(oldRandom)) {
  content = content.replace(oldRandom, newShuffle);
  changeCount++;
  console.log('[3/6] Shuffle-based camera: OK');
} else {
  console.log('[3/6] Shuffle: SKIP');
}

// === 4. getCameraForPanel: ランダムフォールバック → シャッフルプール ===
const oldFallback = `if (!cameraMatch) return getRandomAngle();`;
const newFallback = `if (!cameraMatch) {
          // カメラ指示なし → シャッフルプールから重複なしで割り当て
          const camera = shuffledCameras[cameraSlotIndex % shuffledCameras.length];
          cameraSlotIndex++;
          return camera;
        }`;

if (content.includes(oldFallback)) {
  content = content.replace(oldFallback, newFallback);
  changeCount++;
  console.log('[4a/6] getCameraForPanel fallback: OK');
}

const oldReturn = `        return bestMatch || getRandomAngle();`;
const newReturn = `        if (bestMatch) {
            cameraSlotIndex++;
            return bestMatch;
          }
          // マッチ失敗 → シャッフルプールから
          const camera = shuffledCameras[cameraSlotIndex % shuffledCameras.length];
          cameraSlotIndex++;
          return camera;`;

if (content.includes(oldReturn)) {
  content = content.replace(oldReturn, newReturn);
  changeCount++;
  console.log('[4b/6] getCameraForPanel return: OK');
}

// === 5. getRandomAngle() → getCameraForPanel() in panel prompts ===
const oldPanelCamera = /Camera: \$\{getRandomAngle\(\)\}\./g;
let panelCount = 0;
content = content.replace(oldPanelCamera, () => {
  panelCount++;
  const panelVar = `panel${panelCount}Text`;
  return `Camera: \${getCameraForPanel(${panelVar})}.`;
});
if (panelCount > 0) {
  console.log(`[5a/6] Panel camera calls: ${panelCount} replaced`);
  changeCount++;
}

// === 5b. MANDATORY LENS ENFORCEMENT簡潔化 ===
const oldLens = `[MANDATORY LENS ENFORCEMENT — DO NOT IGNORE]: This camera angle is NOT a suggestion. It is a HARD REQUIREMENT. You MUST visually distort the entire panel composition to match the described lens effect. Specific proof required: (1) The floor/ground/horizon MUST be drawn at a visible angle — NOT flat horizontal. (2) Characters' body parts closest to the camera MUST be drawn significantly LARGER than parts farther away. (3) Background elements MUST bend, compress, or stretch according to the lens type. If this panel looks like a normal, undistorted, eye-level photograph, it has CRITICALLY FAILED. Do NOT choose readability over distortion — the distortion IS the art.`;
const newLens = `[LENS ENFORCEMENT]: (apply above camera distortion:1.9), (NOT a normal photograph:2.0), (visible perspective warping:1.7), (tilted non-horizontal horizon:1.6), (near-side body parts 50% larger:1.5). This is a HARD REQUIREMENT, not a suggestion.`;

const lensCount = (content.match(new RegExp(oldLens.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
if (lensCount > 0) {
  content = content.split(oldLens).join(newLens);
  changeCount++;
  console.log(`[5b/6] LENS ENFORCEMENT: ${lensCount} replaced`);
}

// === 6. シナリオ生成プロンプトにカメラタグ追加 ===
// EMOTIONリストの後にカメラタグセクションを追加
const emotionEndMarker = `            - オチのコマ（4コマ目）は特に、NORMAL以外のタグを優先的に選べ。`;
const cameraTagSection = `            - オチのコマ（4コマ目）は特に、NORMAL以外のタグを優先的に選べ。

        6. **【カメラ演出タグ (Camera Direction Tag)】**:
           - 各コマの冒頭に、そのコマの演出に最適な[Camera: XXX]タグを**必ず1つ**付与せよ。
           - 話の内容・感情・ドラマに合わせて最も効果的なカメラを選べ。**ランダムに選ぶな、演出意図を持って選べ。**
           - 選択肢（この中から選べ）:
             - フィッシュアイ/ローアングル: 登場人物が偉大・強大に見える場面、圧倒感、仰ぎ見るシーン
             - 望遠/ハイアングル: 俯瞰で全体を見渡すシーン、群像劇、整然とした場面、冷静な観察
             - ダッチアングル: 不安定・混乱・予期せぬ展開、ツッコミ、世界が揺らぐ場面
             - 超ローアングル: 威圧感、見上げる構図、巨大なものとの対比、権威の表現
             - 超ハイアングル: 見下ろし、孤立感、全景把握、客観的な視点
             - 望遠圧縮: キャラの密集感、逃げ場のない緊張感、圧迫される大群
             - フィッシュアイ/ワイド: 広大な空間の歪み、非日常感、パニック
             - ワームズアイ: 地面からの極端な仰ぎ、足元のクローズアップ、虫の視点
           - 【制約】4コマの中で**同じカメラを2回以上使うのは禁止**。必ず4種類の異なるカメラを選べ。
           - 【演出ガイドライン】:
             * 1コマ目（起）: 場面の広さを見せるワイド系 or 観察的なハイアングル推奨
             * 2コマ目（承）: 会話の緊張感を出す望遠圧縮 or 不穏なダッチアングル推奨
             * 3コマ目（転）: 転換の衝撃を見せるローアングル系 or フィッシュアイ推奨
             * 4コマ目（結）: オチの感情に合わせて自由選択（威圧のローアングル、絶望のハイアングル等）`;

if (content.includes(emotionEndMarker) && !content.includes('カメラ演出タグ (Camera Direction Tag)')) {
  content = content.replace(emotionEndMarker, cameraTagSection);
  changeCount++;
  console.log('[6a/6] Camera Direction Tag section: OK');
}

// 出力フォーマットに[Camera: XXX]追加
const oldFormat = `        [EMOTION: XXX]
        (状況とセリフ...)`;
const newFormat = `        [EMOTION: XXX]
        [Camera: XXX]
        (状況とセリフ...)`;

if (content.includes(oldFormat)) {
  content = content.split(oldFormat).join(newFormat);
  changeCount++;
  console.log('[6b/6] Output format [Camera:] tags: OK');
}

// 保存
fs.writeFileSync(filePath, content, 'utf8');
console.log(`\nDONE: ${changeCount} changes applied.`);
