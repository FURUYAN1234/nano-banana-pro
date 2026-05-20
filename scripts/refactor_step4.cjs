#!/usr/bin/env node
// refactor_step4.cjs - Extract panel utility functions to panel-utils.js
// Functions: buildIdentityMatrix, getCharTraitsFromMatrix, extractDialogueOnly,
//            extractActionOnly, injectOutfitReminder, extractPlacementRule, extractCastLimitRule
const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'src', 'App.jsx');
const panelUtilsPath = path.join(__dirname, '..', 'src', 'lib', 'panel-utils.js');

let appLines = fs.readFileSync(appPath, 'utf8').split('\n');
const origCount = appLines.length;
console.log(`App.jsx lines before: ${origCount}`);

// Define function ranges (1-indexed converted to 0-indexed internally)
// Must be listed in REVERSE order of line number for safe splicing
const functions = [
  { name: 'extractCastLimitRule', start: 1622, end: 1712, needsCastList: true },
  { name: 'extractPlacementRule', start: 1532, end: 1621, needsCastList: true, needsGetCharTraits: true },
  { name: 'injectOutfitReminder', start: 1527, end: 1531, needsCastList: false },
  { name: 'extractActionOnly', start: 1454, end: 1525, needsCastList: true },
  { name: 'extractDialogueOnly', start: 1347, end: 1453, needsCastList: true },
  { name: 'stripWeightTags', start: 1319, end: 1327, needsCastList: false },
  { name: 'getCameraForChatGPT', start: 1329, end: 1345, needsCastList: false },  
  { name: 'getCameraForPanel', start: 1291, end: 1316, needsCastList: false },
  { name: 'getCharTraitsFromMatrix', start: 1235, end: 1244, needsCastList: true },
  { name: 'buildIdentityMatrix', start: 1139, end: 1233, needsCastList: false },
];

// Verify all boundaries before making any changes
for (const fn of functions) {
  const startIdx = fn.start - 1; // Convert to 0-indexed
  const line = appLines[startIdx]?.trim() || '';
  if (!line.includes(`const ${fn.name}`) && !line.includes(`function ${fn.name}`)) {
    console.error(`ERROR: L${fn.start} expected '${fn.name}', got: "${line.substring(0, 80)}"`);
    
    // Try to find it nearby
    for (let delta = -3; delta <= 3; delta++) {
      const checkIdx = startIdx + delta;
      if (checkIdx >= 0 && appLines[checkIdx]?.includes(`const ${fn.name}`)) {
        console.log(`  -> Found at L${checkIdx + 1} instead (delta=${delta})`);
        fn.start = checkIdx + 1;
        break;
      }
    }
    const newLine = appLines[fn.start - 1]?.trim() || '';
    if (!newLine.includes(`const ${fn.name}`)) {
      console.error(`  FATAL: Could not locate ${fn.name}`);
      process.exit(1);
    }
  }
}
console.log('All function boundaries verified.');

// Sort by start line DESCENDING for safe bottom-up splicing
functions.sort((a, b) => b.start - a.start);

// Extract blocks and build panel-utils.js
const extractedBlocks = [];
for (const fn of functions) {
  const startIdx = fn.start - 1;
  const endIdx = fn.end - 1;
  const block = appLines.slice(startIdx, endIdx + 1);
  
  // Clean indentation (remove 6 leading spaces from function body in assemblePrompt)
  const cleaned = block.map(l => l.replace(/^      /, ''));
  
  // Make exportable: "const name =" -> "export const name ="
  const firstLineIdx = cleaned.findIndex(l => l.trim().startsWith(`const ${fn.name}`));
  if (firstLineIdx >= 0) {
    cleaned[firstLineIdx] = cleaned[firstLineIdx].replace(`const ${fn.name}`, `export const ${fn.name}`);
  }
  
  extractedBlocks.unshift({ name: fn.name, lines: cleaned, needsCastList: fn.needsCastList });
  
  // Remove from App.jsx - just splice and add a comment
  appLines.splice(startIdx, endIdx - startIdx + 1);
  console.log(`Removed ${fn.name}: L${fn.start}-L${fn.end} (${endIdx - startIdx + 1} lines)`);
}

// Build panel-utils.js
const panelUtilsLines = [
  "import { cameraLensMap } from './constants';",
  "",
  "// --- Panel Utility Functions (App.jsx assemblePrompt -> externalized) ---",
  "// assemblePrompt 内で定義されていたパネル解析・プロンプト組立ユーティリティ群",
  "",
];

for (const block of extractedBlocks) {
  panelUtilsLines.push(...block.lines);
  panelUtilsLines.push('');
}

fs.writeFileSync(panelUtilsPath, panelUtilsLines.join('\n'), 'utf8');
console.log(`Created panel-utils.js (${panelUtilsLines.length} lines)`);

// Add import to App.jsx
const importInsertIdx = appLines.findIndex(l => l.includes("from './lib/prompts'"));
if (importInsertIdx >= 0) {
  const importLine = `import { buildIdentityMatrix, getCharTraitsFromMatrix, extractDialogueOnly, extractActionOnly, injectOutfitReminder, extractPlacementRule, extractCastLimitRule, getCameraForPanel, getCameraForChatGPT, stripWeightTags } from './lib/panel-utils';`;
  appLines.splice(importInsertIdx + 1, 0, importLine);
  console.log(`Added panel-utils import after line ${importInsertIdx + 1}`);
}

fs.writeFileSync(appPath, appLines.join('\n'), 'utf8');

const finalCount = appLines.length;
console.log(`\nApp.jsx lines after: ${finalCount}`);
console.log(`Net reduction: ${origCount - finalCount} lines`);
console.log('SUCCESS');
