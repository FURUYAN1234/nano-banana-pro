import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// File Paths
const packageJsonPath = path.join(projectRoot, 'package.json');
const constantsPath = path.join(projectRoot, 'src', 'lib', 'constants.js');
const indexHtmlPath = path.join(projectRoot, 'index.html');

// 1. Read package.json to get current version
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = packageJson.version; // e.g. "3.73-alpha"
console.log(`Current Version: ${currentVersion}`);

// 2. Increment Patch Version strictly by 0.01
const versionMatch = currentVersion.match(/^(\d+\.\d+)/);
if (!versionMatch) {
    console.error("Invalid version format in package.json");
    process.exit(1);
}

const baseVersionNum = parseFloat(versionMatch[1]);
// Increment by 0.01 and fix to 2 decimal places to avoid floating point errors
const newBaseVersionStr = (baseVersionNum + 0.01).toFixed(2);

// the package.json and constants.js use the strict vX.Y-alpha format
const newPackageVersion = `${newBaseVersionStr}-alpha`;
const displayVersion = `v${newBaseVersionStr}-alpha`;

console.log(`New Package Version: ${newPackageVersion}`);
console.log(`New Display Version: ${displayVersion}`);

// 3. Update package.json
packageJson.version = newPackageVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log(`Updated package.json to ${newPackageVersion}`);

// 4. Update src/lib/constants.js
let constantsJs = fs.readFileSync(constantsPath, 'utf8');
const constantsRegex = /export const SYSTEM_VERSION = "v.*?";/;
const newConstantsLine = `export const SYSTEM_VERSION = "${displayVersion}";`;
if (constantsRegex.test(constantsJs)) {
    constantsJs = constantsJs.replace(constantsRegex, newConstantsLine);
    fs.writeFileSync(constantsPath, constantsJs);
    console.log(`Updated src/lib/constants.js to ${displayVersion}`);
} else {
    console.error("Could not find SYSTEM_VERSION in constants.js");
    process.exit(1);
}

// 5. Update index.html
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const indexHtmlRegex = /<title>Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System v.*?<\/title>/;
const newIndexHtmlLine = `<title>Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System ${displayVersion}</title>`;
if (indexHtmlRegex.test(indexHtml)) {
    indexHtml = indexHtml.replace(indexHtmlRegex, newIndexHtmlLine);
    fs.writeFileSync(indexHtmlPath, indexHtml);
    console.log(`Updated index.html to ${displayVersion}`);
} else {
    console.error("Could not find <title> with version in index.html");
    process.exit(1);
}

console.log("Version bump complete.");
