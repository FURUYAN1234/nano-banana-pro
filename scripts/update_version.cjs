#!/usr/bin/env node

/**
 * Antigravity IDE Version & ChangeLog Auto-Updater
 * Usage: node scripts/update_version.cjs <new_version> <changes_ja> <changes_en>
 * Example: node scripts/update_version.cjs 4.0.3 "ローカルRAGの進行状況表示を追加" "Added progress feedback for local RAG"
 */

const fs = require('fs');
const path = require('path');

// 1. 引数チェック
const [,, newVersion, changesJa, changesEn] = process.argv;

if (!newVersion || !changesJa || !changesEn) {
  console.error('❌ Error: Missing arguments.');
  console.log('Usage: node scripts/update_version.cjs <new_version> <changes_ja> <changes_en>');
  process.exit(1);
}

// バージョンのフォーマットチェック (e.g. 4.0.3)
if (!/^\d+\.\d+\.\d+(-\w+)?$/.test(newVersion)) {
  console.error('❌ Error: Invalid version format. Must be x.y.z or x.y.z-alpha');
  process.exit(1);
}

console.log(`\n========================================`);
console.log(`  Updating Environment to v${newVersion}`);
console.log(`========================================`);

const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// Markdownの太字表示崩れを防止するためのスペース補正関数
function sanitizeMarkdownBold(text) {
  if (!text) return text;
  // ** の外側（前後）に半角スペースを挿入し、内側は密着させる（例: "これは**太字**です" -> "これは **太字** です"）
  let t = text.replace(/\*\*([^*]+)\*\*/g, ' **$1** ');
  t = t.replace(/[ ]+/g, ' ');
  t = t.replace(/^- \*\*/g, '- **');
  return t.trim();
}

// 修正内容の整形（太字スペース補正を適用）
const cleanJa = sanitizeMarkdownBold(changesJa);
const cleanEn = sanitizeMarkdownBold(changesEn);

// 追加するChangeLogエントリの生成 (太字の内側に余計なスペースを入れない)
const entry = `- **[Fix & UX]** ${cleanEn} / ${cleanJa}`;

const targetFiles = {
  packageJson: path.join(__dirname, '../package.json'),
  packageLock: path.join(__dirname, '../package-lock.json'),
  constantsJs: path.join(__dirname, '../src/lib/constants.js'),
  indexHtml: path.join(__dirname, '../index.html'),
  readmeMd: path.join(__dirname, '../README.md')
};

function parseVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)(?:-\w+)?$/.exec(version);
  if (!match) {
    throw new Error(`Invalid version format: ${version}`);
  }
  return match.slice(1, 4).map(Number);
}

function getExpectedNextVersion(currentVersion) {
  const [major, minor, patch] = parseVersion(currentVersion);

  // Repair a previously published invalid two-digit component by carrying it.
  if (minor > 9) return `${major + 1}.0.0`;
  if (patch > 9) return `${major}.${minor + 1}.0`;
  if (patch === 9) return minor === 9 ? `${major + 1}.0.0` : `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

// 全ファイルの存在確認
for (const [key, filePath] of Object.entries(targetFiles)) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: File not found: ${filePath}`);
    process.exit(1);
  }
}

const currentVersion = JSON.parse(fs.readFileSync(targetFiles.packageJson, 'utf8')).version;
const [, nextMinor, nextPatch] = parseVersion(newVersion);
if (nextMinor > 9 || nextPatch > 9) {
  console.error('❌ Error: Minor and patch components must be single digits (0-9).');
  process.exit(1);
}

const expectedVersion = getExpectedNextVersion(currentVersion);
if (newVersion !== expectedVersion) {
  console.error(`❌ Error: Version must advance from v${currentVersion} to v${expectedVersion} under the release numbering rule.`);
  process.exit(1);
}

try {
  // 1. package.json の更新
  console.log(`[1/4] Updating package.json and package-lock.json...`);
  const pkgContent = fs.readFileSync(targetFiles.packageJson, 'utf8');
  const updatedPkg = pkgContent.replace(/"version":\s*"[^"]+"/, `"version": "${newVersion}"`);
  fs.writeFileSync(targetFiles.packageJson, updatedPkg, 'utf8');
  const packageLockContent = fs.readFileSync(targetFiles.packageLock, 'utf8');
  const packageLock = JSON.parse(packageLockContent);
  packageLock.version = newVersion;
  packageLock.packages[''].version = newVersion;
  const updatedPackageLock = JSON.stringify(packageLock, null, 2) + '\n';
  fs.writeFileSync(targetFiles.packageLock, updatedPackageLock, 'utf8');
  console.log(`      -> version: "${newVersion}"`);

  // 2. src/lib/constants.js の更新
  console.log(`[2/4] Updating constants.js...`);
  const constContent = fs.readFileSync(targetFiles.constantsJs, 'utf8');
  const updatedConst = constContent.replace(
    /export const SYSTEM_VERSION = "[^"]+";/,
    `export const SYSTEM_VERSION = "v${newVersion}";`
  );
  fs.writeFileSync(targetFiles.constantsJs, updatedConst, 'utf8');
  console.log(`      -> SYSTEM_VERSION = "v${newVersion}"`);

  // 3. index.html の更新
  console.log(`[3/4] Updating index.html...`);
  const htmlContent = fs.readFileSync(targetFiles.indexHtml, 'utf8');
  const updatedHtml = htmlContent.replace(
    /<title>Nano Banana Pro v[^<]+<\/title>/,
    `<title>Nano Banana Pro v${newVersion}</title>`
  );
  fs.writeFileSync(targetFiles.indexHtml, updatedHtml, 'utf8');
  console.log(`      -> <title>Nano Banana Pro v${newVersion}</title>`);

  // 4. README.md の更新
  console.log(`[4/4] Updating README.md...`);
  let readmeContent = fs.readFileSync(targetFiles.readmeMd, 'utf8');
  
  // 冒頭のタイトルバージョン表記の置換
  readmeContent = readmeContent.replace(
    /# Nano Banana Pro 🍌✨ \(v[^)]+\)/,
    `# Nano Banana Pro 🍌✨ (v${newVersion})`
  );
  const currentSourceVersion = /^> Current source version: \*\*v[^*]+\*\* \/ 現在のソース版: \*\*v[^*]+\*\*$/m;
  if (!currentSourceVersion.test(readmeContent)) {
    throw new Error('Could not find the current source version in README.md');
  }
  readmeContent = readmeContent.replace(currentSourceVersion,
    `> Current source version: **v${newVersion}** / 現在のソース版: **v${newVersion}**`);
  readmeContent = readmeContent
    .replace(/matching v\d+\.\d+\.\d+ FourPanel Release asset/, `matching v${newVersion} FourPanel Release asset`)
    .replace(/v\d+\.\d+\.\d+ FourPanel Releaseアセット/, `v${newVersion} FourPanel Releaseアセット`)
    .replace(/(\/releases\/download\/)v\d+\.\d+\.\d+(\/ComfyUI_H3_[^\s)]+)/g, `$1v${newVersion}$2`);

  // ChangeLogへのエントリ挿入
  const changelogHeading = readmeContent.match(/^## 📋 ChangeLog[^\r\n]*/m);
  if (!changelogHeading) {
    throw new Error('Could not find "## 📋 ChangeLog" in README.md');
  }

  const insertIndex = changelogHeading.index + changelogHeading[0].length;
  const newChangelogEntry = `\n\n### v${newVersion} (${today})\n${entry}`;
  
  readmeContent = readmeContent.slice(0, insertIndex) + newChangelogEntry + readmeContent.slice(insertIndex);
  fs.writeFileSync(targetFiles.readmeMd, readmeContent, 'utf8');
  console.log(`      -> Added changelog entry for v${newVersion}`);

  console.log(`\n✅ Success: All files successfully synchronized and updated!`);

} catch (err) {
  console.error(`❌ Error during update process:`, err.message);
  process.exit(1);
}
