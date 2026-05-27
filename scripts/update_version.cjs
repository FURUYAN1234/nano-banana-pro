#!/usr/bin/env node

/**
 * Antigravity 2.0 Version & ChangeLog Auto-Updater
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

// 1.5. バージョン進行規則の強制バリデーション (パッチが9の次はマイナー繰り上げ)
const packageJsonPath = path.join(__dirname, '../package.json');
if (fs.existsSync(packageJsonPath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const currentVer = pkg.version;
    const currentParts = currentVer.split('-')[0].split('.').map(Number);
    const newParts = newVersion.split('-')[0].split('.').map(Number);

    if (currentParts[2] === 9) {
      const expectedMinor = currentParts[1] + 1;
      if (newParts[1] !== expectedMinor || newParts[2] !== 0) {
        console.error(`\n❌ Error: Invalid version progression!`);
        console.error(`   Current version is v${currentVer}.`);
        console.error(`   According to project rules, when the patch version is '9',`);
        console.error(`   the next version must increment the minor version and reset patch to '0'.`);
        console.error(`   (Expected next version: ${currentParts[0]}.${expectedMinor}.0, got: ${newVersion})`);
        console.error(`   Version progression to ${newVersion} is STRICTLY FORBIDDEN.\n`);
        process.exit(1);
      }
    }
  } catch (err) {
    console.warn('⚠️ Warning: Failed to parse package.json for version check:', err.message);
  }
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
const entryJa = `- **[Fix & UX]** ${cleanJa} / ${cleanEn}`;
const entryEn = `- **[Fix & UX]** ${cleanJa} / ${cleanEn}`; // 同期表記

const targetFiles = {
  packageJson: path.join(__dirname, '../package.json'),
  constantsJs: path.join(__dirname, '../src/lib/constants.js'),
  indexHtml: path.join(__dirname, '../index.html'),
  readmeMd: path.join(__dirname, '../README.md'),
  hfReadmeMd: 'C:\\Users\\sx717\\Antigravity\\hf-nano-banana-pro\\README.md'
};

// 全ファイルの存在確認
for (const [key, filePath] of Object.entries(targetFiles)) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: File not found: ${filePath}`);
    process.exit(1);
  }
}

try {
  // 1. package.json の更新
  console.log(`[1/5] Updating package.json...`);
  const pkgContent = fs.readFileSync(targetFiles.packageJson, 'utf8');
  const updatedPkg = pkgContent.replace(/"version":\s*"[^"]+"/, `"version": "${newVersion}"`);
  fs.writeFileSync(targetFiles.packageJson, updatedPkg, 'utf8');
  console.log(`      -> version: "${newVersion}"`);

  // 2. src/lib/constants.js の更新
  console.log(`[2/5] Updating constants.js...`);
  const constContent = fs.readFileSync(targetFiles.constantsJs, 'utf8');
  const updatedConst = constContent.replace(
    /export const SYSTEM_VERSION = "[^"]+";/,
    `export const SYSTEM_VERSION = "v${newVersion}";`
  );
  fs.writeFileSync(targetFiles.constantsJs, updatedConst, 'utf8');
  console.log(`      -> SYSTEM_VERSION = "v${newVersion}"`);

  // 3. index.html の更新
  console.log(`[3/5] Updating index.html...`);
  const htmlContent = fs.readFileSync(targetFiles.indexHtml, 'utf8');
  const updatedHtml = htmlContent.replace(
    /<title>Nano Banana Pro v[^<]+<\/title>/,
    `<title>Nano Banana Pro v${newVersion}</title>`
  );
  fs.writeFileSync(targetFiles.indexHtml, updatedHtml, 'utf8');
  console.log(`      -> <title>Nano Banana Pro v${newVersion}</title>`);

  // 4. README.md の更新
  console.log(`[4/5] Updating README.md...`);
  let readmeContent = fs.readFileSync(targetFiles.readmeMd, 'utf8');
  
  // 冒頭のタイトルバージョン表記の置換
  readmeContent = readmeContent.replace(
    /# Nano Banana Pro 🍌✨ \(v[^)]+\)/,
    `# Nano Banana Pro 🍌✨ (v${newVersion})`
  );

  // ChangeLogへのエントリ挿入
  const changelogHeader = '## 📋 ChangeLog';
  const changelogInsertPos = readmeContent.indexOf(changelogHeader);
  if (changelogInsertPos === -1) {
    throw new Error('Could not find "## 📋 ChangeLog" in README.md');
  }

  const insertIndex = changelogInsertPos + changelogHeader.length;
  const newChangelogEntry = `\n\n### v${newVersion} (${today})\n${entryJa}`;
  
  readmeContent = readmeContent.slice(0, insertIndex) + newChangelogEntry + readmeContent.slice(insertIndex);
  fs.writeFileSync(targetFiles.readmeMd, readmeContent, 'utf8');
  console.log(`      -> Added changelog entry for v${newVersion}`);

  // 5. Hugging Face README.md の更新
  console.log(`[5/5] Updating Hugging Face README.md...`);
  let hfReadmeContent = fs.readFileSync(targetFiles.hfReadmeMd, 'utf8');

  // 冒頭のタイトルバージョン表記の置換
  hfReadmeContent = hfReadmeContent.replace(
    /# Nano Banana Pro 🍌✨ \(v[^)]+\)/,
    `# Nano Banana Pro 🍌✨ (v${newVersion})`
  );

  // Latest Updatesへのエントリ挿入
  const hfHeader = '## 🚀 Latest Updates';
  const hfInsertPos = hfReadmeContent.indexOf(hfHeader);
  if (hfInsertPos === -1) {
    throw new Error('Could not find "## 🚀 Latest Updates" in hf README.md');
  }

  const hfInsertIndex = hfInsertPos + hfHeader.length;
  const newHfEntry = `\n\n### v${newVersion} (${today})\n${entryEn}`;

  hfReadmeContent = hfReadmeContent.slice(0, hfInsertIndex) + newHfEntry + hfReadmeContent.slice(hfInsertIndex);
  fs.writeFileSync(targetFiles.hfReadmeMd, hfReadmeContent, 'utf8');
  console.log(`      -> Added latest updates entry to HF README.md`);

  console.log(`\n✅ Success: All files successfully synchronized and updated!`);

} catch (err) {
  console.error(`❌ Error during update process:`, err.message);
  process.exit(1);
}
