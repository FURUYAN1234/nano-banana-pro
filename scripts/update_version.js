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
const currentVersion = packageJson.version; // e.g. "4.01-alpha"
console.log(`Current Version: ${currentVersion}`);

// 2. Parse and increment version strictly using x.y.z format
let major = 4;
let minor = 0;
let patch = 1;

const semverMatch = currentVersion.match(/^(\d+)\.(\d+)\.(\d+)/);
if (semverMatch) {
    major = parseInt(semverMatch[1]);
    minor = parseInt(semverMatch[2]);
    patch = parseInt(semverMatch[3]) + 1; // Increment patch
} else {
    // If version is like "4.01-alpha", we normalize to "4.0.1" (or "4.0.1" since current is 4.01-alpha)
    const legacyMatch = currentVersion.match(/^(\d+)\.(\d+)/);
    if (legacyMatch) {
        major = parseInt(legacyMatch[1]);
        minor = 0;
        patch = 1;
    }
}

const newVersion = `${major}.${minor}.${patch}`;
const displayVersion = `v${newVersion}`;

console.log(`New Version: ${newVersion}`);
console.log(`New Display Version: ${displayVersion}`);

// 3. Update package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log(`Updated package.json to ${newVersion}`);

// 4. Update src/lib/constants.js
let constantsJs = fs.readFileSync(constantsPath, 'utf8');
const constantsRegex = /export const SYSTEM_VERSION = ".*?";/;
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
const indexHtmlRegex = /<title>.*?<\/title>/;
const newIndexHtmlLine = `<title>Nano Banana Pro ${displayVersion}</title>`;
if (indexHtmlRegex.test(indexHtml)) {
    indexHtml = indexHtml.replace(indexHtmlRegex, newIndexHtmlLine);
    fs.writeFileSync(indexHtmlPath, indexHtml);
    console.log(`Updated index.html to ${displayVersion}`);
} else {
    console.error("Could not find <title> in index.html");
    process.exit(1);
}

console.log("Version bump complete.");
