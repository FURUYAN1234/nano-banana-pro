import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const packageJsonPath = path.join(projectRoot, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

console.log("\n================ [ GitHub Release Template ] ================");
console.log(`Tag version: v${version}-alpha`);
console.log(`Target: main`);
console.log("");

console.log("👇 [Title]");
console.log(`v${version} Alpha - Identity Locking & SFX Fix / キャラ同一性強化とオノマトペ抽出修正`);
console.log("");

console.log("👇 [Body]");
console.log(`## 🚀 Changes in v${version} Alpha /変更点`);
console.log("");
console.log(`### 🎨 Character Consistency Logic / キャラクター同一性の強化`);
console.log(`- **Anti-Cloning Enforcement (クローン防止プロトコルの強化)**:`);
console.log(`  - Characters specified in solo-shots will NEVER duplicate. Explicit SINGLE CHARACTER rules are enforced to prevent AI hallucination.`);
console.log(`  - (1人だけのコマでAIが勝手に話し相手を捏造・増殖させる問題を防ぐため、「SOLO SHOT」ルールを追加しました)`);
console.log(`- **Gag & Emotion Text Filtering (オノマトペやギャグSFXの吹き出し化防止)**:`);
console.log(`  - Visual actions ending in Japanese SFX (e.g., ズコー, ドッ, ガーン) are now cleaned to prevent them from being drawn as ugly text bubbles.`);
console.log(`  - (シチュエーション文の最後に「ズコー」等のオノマトペがある際、AIがそれを文字として巨大な吹き出しに書いてしまう問題を修正しました)`);
console.log("");
console.log(`### ⚙️ Engine Improvements / その他の改善`);
console.log(`- **SKETCH Emotion Removal**: The rough sketch emotion has been fully deprecated across all generation components to maintain high visual quality.`);
console.log(`  - (ラフスケッチ風の画風変更オプションを完全廃止し、パニック時も高クオリティな作画を維持するようにしました)`);
console.log("\n=============================================================\n");
