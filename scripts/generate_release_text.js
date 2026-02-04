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
console.log(`v${version} Alpha - Manner & Stability Update / 作法と安定性の向上`);
console.log("");

console.log("👇 [Body]");
console.log(`## 🚀 Changes in v${version} Alpha /変更点`);
console.log("");
console.log(`### 🎨 Manga Composition Logic / 漫画構図ロジックの改善`);
console.log(`- **Zone Slotting Protocol (ゾーン配置プロトコル)**:`);
console.log(`  - **Right Zone (右)**: First Speaker / 最初の話者`);
console.log(`  - **Center Zone (中央)**: Second Speaker / 2番目の話者`);
console.log(`  - **Left Zone (左)**: Listener / 聞き手`);
console.log(`- **Fix**: Resolves the "Swapped Speech Bubble" issue by aligning visual position with Japanese reading order.`);
console.log(`  - (吹き出しと話者の位置が逆転する問題を解消。右から左への視線誘導に合わせました)`);
console.log(`- **Multi-Character Handling**: Replaced "Crowd Control" with equal-presence slotting for 3+ characters.`);
console.log(`  - (3人以上の際、シルエット化をやめ、立ち位置指定による同格配置に変更しました)`);
console.log("");
console.log(`### ⚙️ Automation & Fixes / 自動化と修正`);
console.log(`- **Auto-Deployment**: Verified pipeline execution.`);
console.log(`  - (デプロイパイプラインの動作検証完了)`);
console.log("\n=============================================================\n");
