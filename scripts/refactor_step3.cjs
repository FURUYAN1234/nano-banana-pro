#!/usr/bin/env node
// refactor_step3.cjs - Extract dynamicCamera, antiCharSheetPrefix, policy prompts
const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'src', 'App.jsx');
const constPath = path.join(__dirname, '..', 'src', 'lib', 'constants.js');
const promptsPath = path.join(__dirname, '..', 'src', 'lib', 'prompts.js');

let appLines = fs.readFileSync(appPath, 'utf8').split('\n');
let constContent = fs.readFileSync(constPath, 'utf8');
let promptsContent = fs.readFileSync(promptsPath, 'utf8');

const origCount = appLines.length;
console.log(`App.jsx lines before: ${origCount}`);

// ===== 1. dynamicCamera (L1246-L1277 -> 0-indexed 1245-1276) =====
// Verify
const dcStart = appLines.findIndex(l => l.includes('const dynamicCamera = `'));
if (dcStart === -1) { console.error('ERROR: dynamicCamera not found'); process.exit(1); }
// Find the closing backtick+semicolon
let dcEnd = -1;
for (let i = dcStart + 1; i < dcStart + 50; i++) {
  if (appLines[i].trimEnd().endsWith('`;')) {
    dcEnd = i;
    break;
  }
}
if (dcEnd === -1) { console.error('ERROR: dynamicCamera end not found'); process.exit(1); }
console.log(`dynamicCamera: L${dcStart+1}-L${dcEnd+1} (${dcEnd-dcStart+1} lines)`);

// Extract and clean indent
const dcBlock = appLines.slice(dcStart, dcEnd + 1).map(l => l.replace(/^      /, '').replace(/^            /, ''));
// Make first line: "const dynamicCamera" -> "export const DYNAMIC_CAMERA_PROTOCOL"
dcBlock[0] = dcBlock[0].replace('const dynamicCamera = `', 'export const DYNAMIC_CAMERA_PROTOCOL = `');

// Append to constants.js
constContent += '\n// --- [v4.0] Dynamic Camera Protocol (App.jsx -> externalized) ---\n' + dcBlock.join('\n') + '\n';

// Replace in App.jsx with reference
appLines.splice(dcStart, dcEnd - dcStart + 1, '      const dynamicCamera = DYNAMIC_CAMERA_PROTOCOL;');
console.log(`Replaced dynamicCamera with reference (removed ${dcEnd-dcStart} lines)`);

// ===== 2. antiCharSheetPrefix =====
const acsStart = appLines.findIndex(l => l.includes('const antiCharSheetPrefix = `'));
if (acsStart === -1) { console.error('ERROR: antiCharSheetPrefix not found'); process.exit(1); }
let acsEnd = -1;
for (let i = acsStart + 1; i < acsStart + 20; i++) {
  if (appLines[i].trimEnd().endsWith('`;')) {
    acsEnd = i;
    break;
  }
}
if (acsEnd === -1) { console.error('ERROR: antiCharSheetPrefix end not found'); process.exit(1); }
console.log(`antiCharSheetPrefix: L${acsStart+1}-L${acsEnd+1} (${acsEnd-acsStart+1} lines)`);

const acsBlock = appLines.slice(acsStart, acsEnd + 1).map(l => l.replace(/^        /, ''));
acsBlock[0] = acsBlock[0].replace('const antiCharSheetPrefix = `', 'export const ANTI_CHARSHEET_PREFIX = `');

constContent += '\n// --- [v3.50] Anti-CharSheet Prefix (App.jsx -> externalized) ---\n' + acsBlock.join('\n') + '\n';

appLines.splice(acsStart, acsEnd - acsStart + 1, '        const antiCharSheetPrefix = ANTI_CHARSHEET_PREFIX;');
console.log(`Replaced antiCharSheetPrefix (removed ${acsEnd-acsStart} lines)`);

// ===== 3. metaPrompt (policy fix) =====
const mpStart = appLines.findIndex(l => l.includes('const metaPrompt = `') && l.includes('コンテンツポリシー'));
if (mpStart === -1) {
  // Try alternate search
  const mpStart2 = appLines.findIndex(l => l.trim().startsWith('const metaPrompt = `'));
  if (mpStart2 === -1) { console.error('ERROR: metaPrompt not found'); process.exit(1); }
}
const actualMpStart = mpStart !== -1 ? mpStart : appLines.findIndex(l => l.trim().startsWith('const metaPrompt = `'));
let mpEnd = -1;
for (let i = actualMpStart + 1; i < actualMpStart + 60; i++) {
  // The metaPrompt ends with a backtick+semicolon
  if (appLines[i].trim() === '- "to"の表現は元と同程度の長さ・ディテールを維持すること。短縮・省略禁止。`;') {
    mpEnd = i;
    break;
  }
  // Alternative: look for the closing backtick on its own line
  if (appLines[i].trimEnd().endsWith('禁止。`;')) {
    mpEnd = i;
    break;
  }
}
if (mpEnd === -1) { console.error('ERROR: metaPrompt end not found, searching further...'); 
  for (let i = actualMpStart + 1; i < actualMpStart + 60; i++) {
    if (appLines[i].trimEnd().endsWith('`;') && i > actualMpStart + 10) {
      mpEnd = i;
      console.log(`  Found possible end at L${i+1}: "${appLines[i].trim().substring(0,60)}"`);
      break;
    }
  }
  if (mpEnd === -1) { process.exit(1); }
}
console.log(`metaPrompt: L${actualMpStart+1}-L${mpEnd+1} (${mpEnd-actualMpStart+1} lines)`);

// For metaPrompt, it uses ${policyErrorMsg.trim()} and ${finalPrompt} 
// -> create getPolicyAnalysisPrompt(policyErrorMsg, finalPrompt) in prompts.js
const mpBlock = appLines.slice(actualMpStart, mpEnd + 1).map(l => l.replace(/^      /, ''));
// Convert to function
const mpFunction = [
  '',
  '// --- ポリシー修正分析プロンプト (App.jsx -> externalized) ---',
  '// Phase 1: 問題箇所の特定と置換テーブルの生成',
  'export const getPolicyAnalysisPrompt = (policyErrorMsg, finalPrompt) => {',
  '  return `あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。',
  '',
];
// Extract the body of the template (skip first line "const metaPrompt = `...")
// and the last line ("...`;")
const mpBodyLines = appLines.slice(actualMpStart + 1, mpEnd);
// Replace ${policyErrorMsg.trim()} and ${finalPrompt} - they're already correct since they're function params now
for (const line of mpBodyLines) {
  mpFunction.push(line.replace(/^      /, ''));
}
// Close template and function
mpFunction.push(mpBlock[mpBlock.length - 1].replace(/^      /, '').replace('`;', '`;'));
mpFunction.push('};');

promptsContent += '\n' + mpFunction.join('\n') + '\n';

// Replace in App.jsx
appLines.splice(actualMpStart, mpEnd - actualMpStart + 1, 
  '      const metaPrompt = getPolicyAnalysisPrompt(policyErrorMsg.trim(), finalPrompt);');
console.log(`Replaced metaPrompt with function call (removed ${mpEnd-actualMpStart} lines)`);

// ===== 4. fallbackPrompt (policy fix fallback) =====
const fbStart = appLines.findIndex(l => l.includes('const fallbackPrompt = `') && l.includes('コンテンツポリシー'));
if (fbStart === -1) {
  console.error('ERROR: fallbackPrompt not found');
  // Non-fatal: skip
} else {
  let fbEnd = -1;
  for (let i = fbStart + 1; i < fbStart + 40; i++) {
    if (appLines[i].trimEnd().endsWith('`;') && i > fbStart + 5) {
      fbEnd = i;
      break;
    }
  }
  if (fbEnd === -1) { console.error('ERROR: fallbackPrompt end not found'); }
  else {
    console.log(`fallbackPrompt: L${fbStart+1}-L${fbEnd+1} (${fbEnd-fbStart+1} lines)`);
    
    const fbFunction = [
      '',
      '// --- ポリシー修正フォールバックプロンプト (App.jsx -> externalized) ---',
      '// 全文再生成方式（JSONパース失敗時の保険）',
      'export const getPolicyFallbackPrompt = (policyErrorMsg, finalPrompt) => {',
    ];
    // Extract body
    const fbBodyLines = appLines.slice(fbStart, fbEnd + 1).map(l => l.replace(/^      /, ''));
    // Replace "const fallbackPrompt = `" with "return `"
    fbBodyLines[0] = '  return `' + fbBodyLines[0].split('`')[1];
    for (const line of fbBodyLines) {
      fbFunction.push(line);
    }
    fbFunction.push('};');
    
    promptsContent += '\n' + fbFunction.join('\n') + '\n';
    
    appLines.splice(fbStart, fbEnd - fbStart + 1,
      '      const fallbackPrompt = getPolicyFallbackPrompt(policyErrorMsg.trim(), finalPrompt);');
    console.log(`Replaced fallbackPrompt (removed ${fbEnd-fbStart} lines)`);
  }
}

// ===== Update imports =====
// Add DYNAMIC_CAMERA_PROTOCOL, ANTI_CHARSHEET_PREFIX to constants import
const constImportIdx = appLines.findIndex(l => l.includes("SYSTEM_VERSION") && l.includes("from './lib/constants'"));
if (constImportIdx >= 0 && !appLines[constImportIdx].includes('DYNAMIC_CAMERA_PROTOCOL')) {
  appLines[constImportIdx] = appLines[constImportIdx].replace(
    "cameraLensMap",
    "cameraLensMap, DYNAMIC_CAMERA_PROTOCOL, ANTI_CHARSHEET_PREFIX"
  );
  console.log(`Updated constants import`);
}

// Add getPolicyAnalysisPrompt, getPolicyFallbackPrompt to prompts import
const promptsImportIdx = appLines.findIndex(l => l.includes("getScenarioPrompt") && l.includes("from './lib/prompts'"));
if (promptsImportIdx >= 0 && !appLines[promptsImportIdx].includes('getPolicyAnalysisPrompt')) {
  appLines[promptsImportIdx] = appLines[promptsImportIdx].replace(
    "getScenarioPrompt",
    "getScenarioPrompt, getPolicyAnalysisPrompt, getPolicyFallbackPrompt"
  );
  console.log(`Updated prompts import`);
}

// Write files
fs.writeFileSync(constPath, constContent, 'utf8');
fs.writeFileSync(promptsPath, promptsContent, 'utf8');
fs.writeFileSync(appPath, appLines.join('\n'), 'utf8');

const finalCount = appLines.length;
console.log(`\nApp.jsx lines after: ${finalCount}`);
console.log(`Net reduction: ${origCount - finalCount} lines`);
console.log('SUCCESS');
