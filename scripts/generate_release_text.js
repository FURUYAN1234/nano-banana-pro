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
console.log("\n[Release Title]");
console.log(`v${version} Alpha - Update`);
console.log("\n[Describe this release (Markdown)]");
console.log(`## 🚀 Changes in v${version} Alpha`);
console.log("");
console.log(`- **Auto-Deployment**: Successfully deployed via Turbo Workflow.`);
console.log(`- **Version Bump**: Synced to v${version}.`);
console.log(`- **Compliance**: Legal constraints checked.`);
console.log("=============================================================\n");
