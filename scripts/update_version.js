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
const currentVersion = packageJson.version; // e.g. "2.04.0-alpha"
console.log(`Current Version: ${currentVersion}`);

// 2. Increment Patch Version strictly by 0.01
// Extract the major.minor part from package.json version
const versionMatch = currentVersion.match(/^(\d+\.\d+)/);
if (!versionMatch) {
    console.error("Invalid version format in package.json");
    process.exit(1);
}

const baseVersionNum = parseFloat(versionMatch[1]);
// Increment by 0.01 and fix to 2 decimal places to avoid floating point errors
const newBaseVersionStr = (baseVersionNum + 0.01).toFixed(2);

// the package.json needs proper semver, so we append .0-alpha
const newPackageVersion = `${newBaseVersionStr}.0-alpha`;
// App.jsx and index.html use the display format
const displayVersion = `v${newBaseVersionStr} Alpha`;

console.log(`New Package Version: ${newPackageVersion}`);
console.log(`New Display Version: ${displayVersion}`);

// 3. Update package.json
packageJson.version = newPackageVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log(`Updated package.json to ${newPackageVersion}`);

// 4. Update src/App.jsx
let appJsx = fs.readFileSync(appJsxPath, 'utf8');
const appJsxRegex = /const SYSTEM_VERSION = "v.*?";/;
const newAppJsxLine = `const SYSTEM_VERSION = "${displayVersion}";`;
if (appJsxRegex.test(appJsx)) {
    appJsx = appJsx.replace(appJsxRegex, newAppJsxLine);
    fs.writeFileSync(appJsxPath, appJsx);
    console.log(`Updated src/App.jsx to ${displayVersion}`);
} else {
    console.error("Could not find SYSTEM_VERSION in App.jsx");
    process.exit(1);
}

// 5. Update index.html
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const indexHtmlRegex = /<title>Nano Banana Pro v.*?<\/title>/;
const newIndexHtmlLine = `<title>Nano Banana Pro ${displayVersion}</title>`;
if (indexHtmlRegex.test(indexHtml)) {
    indexHtml = indexHtml.replace(indexHtmlRegex, newIndexHtmlLine);
    fs.writeFileSync(indexHtmlPath, indexHtml);
    console.log(`Updated index.html to ${displayVersion}`);
} else {
    console.error("Could not find <title> with version in index.html");
    process.exit(1);
}

console.log("Version bump complete.");
