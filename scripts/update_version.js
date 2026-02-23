import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// File Paths
const packageJsonPath = path.join(projectRoot, 'package.json');
const appJsxPath = path.join(projectRoot, 'src', 'App.jsx');
const indexHtmlPath = path.join(projectRoot, 'index.html');

// 1. Read package.json to get current version
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = packageJson.version;
console.log(`Current Version: ${currentVersion}`);

// 2. Increment Patch Version (x.y.z -> x.y.z+1)
const parts = currentVersion.split('.').map(Number);
parts[2] += 1;
const newVersion = parts.join('.');
console.log(`New Version: ${newVersion}`);

// 3. Update package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log(`Updated package.json to ${newVersion}`);

// 4. Update src/App.jsx
let appJsx = fs.readFileSync(appJsxPath, 'utf8');
const appJsxRegex = /const SYSTEM_VERSION = "v.*?";/;
const newAppJsxLine = `const SYSTEM_VERSION = "v${newVersion} Alpha";`;
if (appJsxRegex.test(appJsx)) {
    appJsx = appJsx.replace(appJsxRegex, newAppJsxLine);
    fs.writeFileSync(appJsxPath, appJsx);
    console.log(`Updated src/App.jsx to ${newVersion}`);
} else {
    console.error("Could not find SYSTEM_VERSION in App.jsx");
    process.exit(1);
}

// 5. Update index.html
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const indexHtmlRegex = /<title>Nano Banana Pro v.*?<\/title>/;
const newIndexHtmlLine = `<title>Nano Banana Pro v${newVersion} Alpha</title>`;
if (indexHtmlRegex.test(indexHtml)) {
    indexHtml = indexHtml.replace(indexHtmlRegex, newIndexHtmlLine);
    fs.writeFileSync(indexHtmlPath, indexHtml);
    console.log(`Updated index.html to ${newVersion}`);
} else {
    console.error("Could not find <title> with version in index.html");
    process.exit(1);
}

console.log("Version bump complete.");
