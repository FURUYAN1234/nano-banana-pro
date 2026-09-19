import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(scriptDir, '..');
const outputPath = resolve(appRoot, 'public/diagrams/nano-banana-pro-workflow-a4.svg');
const appVersion = JSON.parse(readFileSync(resolve(appRoot, 'package.json'), 'utf8')).version;

// These anchors keep the diagram tied to the orchestration points it describes.
// When the workflow materially changes, update this visual and replace the
// matching image in README and the public note during the release.
const sourceAnchors = [
  ['src/hooks/useMangaWorkflow.js', 'const processFiles = async'],
  ['src/hooks/useMangaWorkflow.js', 'const generateScenarioFromNews = async'],
  ['src/hooks/useMangaWorkflow.js', 'const assemblePrompt = async'],
  ['src/hooks/useMangaWorkflow.js', 'const generateImageOnce = async'],
  ['src/hooks/useMangaWorkflow.js', 'const runPolicyAutoRetries = async'],
  ['src/hooks/useMangaWorkflow.js', 'const runFullAuto = async'],
  ['src/lib/image-quality-failsafe.js', 'export const runImageQualityFailsafe'],
  ['src/lib/image-policy-retry.js', 'MAX_IMAGE_POLICY_RETRIES'],
];

for (const [relativePath, anchor] of sourceAnchors) {
  if (!readFileSync(resolve(appRoot, relativePath), 'utf8').includes(anchor)) {
    throw new Error(`Workflow diagram source anchor missing: ${relativePath} :: ${anchor}`);
  }
}

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const text = (x, y, value, { size = 15, weight = 400, fill = '#172033', anchor = 'start' } = {}) => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(value)}</text>`;
const lines = (x, y, values, options = {}) => values.map((value, index) => text(x, y + (index * (options.leading ?? 20)), value, options)).join('');
const arrow = (x1, y1, x2, y2, color = '#52617a') => `<path d="M ${x1} ${y1} L ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" marker-end="url(#arrow-${color === '#bf4c5c' ? 'red' : 'navy'})"/>`;

const card = ({ x, y, w, h, color, number, title, detail = [] }) => {
  return `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#ffffff" stroke="${color}" stroke-width="2.5"/><rect x="${x}" y="${y}" width="56" height="${h}" rx="18" fill="${color}"/><rect x="${x + 38}" y="${y}" width="18" height="${h}" fill="${color}"/></g><circle cx="${x + 28}" cy="${y + 28}" r="17" fill="#ffffff" fill-opacity=".96"/>${text(x + 28, y + 34, number, { size: 15, weight: 800, fill: color, anchor: 'middle' })}${text(x + 74, y + 29, title, { size: 17, weight: 800 })}${lines(x + 74, y + 53, detail, { size: 12.5, fill: '#42506a', leading: 18 })}`;
};

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="210mm" height="297mm" viewBox="0 0 794 1123" role="img" aria-labelledby="title description">
<title id="title">Super FURU AI 4-koma System Workflow Map / 全工程フローチャート</title><desc id="description">A4 portrait workflow map covering API connection, STEP1 through STEP4, image generation, QA, content-policy repair, history, and saving. / API接続、STEP1からSTEP4、画像生成、品質検査、コンテンツポリシー修正、履歴保存までを示すA4縦のフローチャート。</desc>
<defs><linearGradient id="header" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#172b58"/><stop offset="1" stop-color="#5e4a91"/></linearGradient><linearGradient id="footer" x1="0" x2="1"><stop stop-color="#ecf5ff"/><stop offset="1" stop-color="#f7efff"/></linearGradient><filter id="shadow" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#16223d" flood-opacity=".14"/></filter><marker id="arrow-navy" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#52617a"/></marker><marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#bf4c5c"/></marker><style>text { font-family: Inter, "Noto Sans JP", "Yu Gothic UI", sans-serif; }</style></defs>
<rect width="794" height="1123" fill="#f8fafc"/><rect x="28" y="24" width="738" height="92" rx="22" fill="url(#header)"/>
${text(58, 62, 'SUPER FURU AI 4-KOMA SYSTEM', { size: 13, weight: 800, fill: '#c8dcff' })}${text(58, 87, 'Workflow Map / 全工程フローチャート', { size: 22, weight: 800, fill: '#ffffff' })}${text(738, 63, `v${appVersion}`, { size: 13, weight: 700, fill: '#d9d1ff', anchor: 'end' })}${text(397, 105, 'Input → Plan → Generate → Review → Save / 入力 → 設計 → 生成 → 検査 → 保存', { size: 9.5, fill: '#ffffff', anchor: 'middle' })}
<g><rect x="45" y="136" width="704" height="38" rx="12" fill="#edf1f8"/><circle cx="68" cy="155" r="8" fill="#2475b9"/>${text(84, 159, 'Thinking / 思考・設計', { size: 10, weight: 700, fill: '#25446a' })}<circle cx="230" cy="155" r="8" fill="#8653b8"/>${text(246, 159, 'Generate & QA / 生成・検査', { size: 10, weight: 700, fill: '#4f3a6d' })}<circle cx="432" cy="155" r="8" fill="#219679"/>${text(448, 159, 'Keep & Export / 保持・出力', { size: 10, weight: 700, fill: '#245d50' })}<circle cx="615" cy="155" r="8" fill="#bf4c5c"/>${text(631, 159, 'Branch / 修正', { size: 10, weight: 700, fill: '#82333f' })}</g>
${card({ x: 70, y: 194, w: 654, h: 63, color: '#2475b9', number: '0', title: 'API Connection & Verification / API接続と検証', detail: ['Choose a provider and confirm connection / 利用プロバイダーを選択し接続を確認'], chips: ['Gemini / OpenAI', 'Device-only key / キーは端末内のみ'] })}${arrow(397, 258, 397, 278)}
${card({ x: 70, y: 279, w: 654, h: 75, color: '#2475b9', number: '1', title: 'STEP1 Analyze Inputs / 素材を解析', detail: ['Character sheets + optional background/style JSON → cast, relations, setting', 'キャラシート・任意背景/Style JSON → 人物・関係・舞台を抽出'] })}${arrow(397, 355, 397, 375)}
${card({ x: 70, y: 376, w: 654, h: 95, color: '#2475b9', number: '2', title: 'STEP2 Story Routine / 4コマ設計', detail: ['News or free input → facts → tone/ending → four-panel script', 'ニュースまたは自由入力 → 事実整理 → トーン/オチ → 4コマ台本', 'Enhance, edit, or restore the script when needed / 必要なら台本を強化・編集・復元'] })}<rect x="530" y="397" width="173" height="49" rx="12" fill="#e7f3ff" stroke="#78a8d7"/>${text(616, 417, 'Full Auto / フルオート', { size: 11, weight: 800, fill: '#1f5f9c', anchor: 'middle' })}${text(616, 435, 'STEP2 → STEP3 → STEP4', { size: 10.5, fill: '#385779', anchor: 'middle' })}${arrow(397, 472, 397, 492)}
${card({ x: 70, y: 493, w: 654, h: 84, color: '#2475b9', number: '3', title: 'STEP3 Assemble Prompt / 描写を組み立てる', detail: ['Color/mono + cast, script, camera, dialogue → image prompt', 'カラー/モノクロ、人物、台本、画角、セリフを統合し画像プロンプトを作成'] })}${arrow(397, 578, 397, 598)}
${card({ x: 70, y: 599, w: 654, h: 83, color: '#8653b8', number: '4', title: 'STEP4 Generate / 画像生成', detail: ['API generation with references + selected model / 参照画像・選択モデルでアプリ内API生成', 'Ordinary errors: guidance, retry, Web route / 通常エラー:案内・再試行・Web版'] })}<rect x="500" y="605" width="202" height="34" rx="10" fill="#faf2e9" stroke="#cd8a46"/>${text(601, 620, 'Web: outside app / Web版: アプリ外で生成', { size: 9, weight: 800, fill: '#895824', anchor: 'middle' })}${text(601, 633, 'No in-app QA/history / アプリ内QA・履歴対象外', { size: 8.5, fill: '#895824', anchor: 'middle' })}${arrow(397, 683, 397, 703)}
${card({ x: 70, y: 704, w: 654, h: 75, color: '#8653b8', number: '5', title: 'Image QA Review Output / 画像QAで出力を検査', detail: ['Check people, hands, props, text, composition, gaze, light, depth', '人物・手・小道具・文字・構図・視線・照明・奥行きを確認し結果を分岐'] })}${arrow(230, 780, 230, 800, '#bf4c5c')}${arrow(564, 780, 564, 800, '#bf4c5c')}
<g filter="url(#shadow)"><rect x="70" y="801" width="310" height="107" rx="18" fill="#fff8f6" stroke="#bf4c5c" stroke-width="2.5"/></g><circle cx="101" cy="831" r="18" fill="#bf4c5c"/>${text(101, 837, 'Q', { size: 14, weight: 800, fill: '#fff', anchor: 'middle' })}${text(130, 826, 'Quality Issue / 品質課題', { size: 13, weight: 800, fill: '#7d2635' })}${lines(92, 852, ['Fix only the defects / 問題点だけを修正するプロンプトを作成', 'Regenerate → QA again / 条件付きで再生成 → 再QA'], { size: 9.5, fill: '#7d5260', leading: 19 })}<path d="M 70 854 H 45 V 742 H 67" fill="none" stroke="#bf4c5c" stroke-width="2.5" marker-end="url(#arrow-red)"/>
<g filter="url(#shadow)"><rect x="414" y="801" width="310" height="107" rx="18" fill="#fff8f6" stroke="#bf4c5c" stroke-width="2.5"/></g><circle cx="445" cy="831" r="18" fill="#bf4c5c"/>${text(445, 837, 'P', { size: 14, weight: 800, fill: '#fff', anchor: 'middle' })}${text(474, 826, 'Policy Error / ポリシーエラー', { size: 13, weight: 800, fill: '#7d2635' })}${lines(436, 852, ['Text API revises, then regenerates / テキストAPIで自動修正して再生成', 'Up to 5; then manual/Web / 最大5回。尽きたら手動対応/Web版へ'], { size: 9, fill: '#7d5260', leading: 19 })}<path d="M 724 854 H 749 V 641 H 727" fill="none" stroke="#bf4c5c" stroke-width="2.5" marker-end="url(#arrow-red)"/>
${arrow(397, 780, 397, 929, '#219679')}${card({ x: 70, y: 930, w: 654, h: 78, color: '#219679', number: '6', title: 'Generation History & Selection / 生成履歴と選択', detail: ['Keep up to 10 QA-passed images; compare, select, reuse / QA通過画像を最大10件保持し比較・選択・再利用'] })}${arrow(397, 1009, 397, 1029, '#219679')}
<g filter="url(#shadow)"><rect x="70" y="1030" width="654" height="62" rx="18" fill="url(#footer)" stroke="#219679" stroke-width="2.5"/></g><circle cx="101" cy="1061" r="18" fill="#219679"/>${text(101, 1067, '✓', { size: 18, weight: 800, fill: '#fff', anchor: 'middle' })}${text(130, 1056, 'Save & Export / 保存・出力', { size: 16, weight: 800, fill: '#1f6655' })}${text(130, 1077, 'Download image / save prompt; full auto can stop or continue. / 画像を保存、プロンプトを保存。フルオートは停止または連続生成。', { size: 9.5, fill: '#416b61' })}${text(397, 1110, 'Source: scripts/generate_workflow_diagram.mjs  |  npm run docs:workflow-diagram / 図の正本', { size: 9, fill: '#66738a', anchor: 'middle' })}
</svg>`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${svg}\n`, 'utf8');
console.log(`Generated ${outputPath}`);
