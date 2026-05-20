#!/usr/bin/env node
// refactor_step2.cjs - Extract EMOTION_STYLES, cameraAngles, cameraLensMap to constants.js
const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'src', 'App.jsx');
const constPath = path.join(__dirname, '..', 'src', 'lib', 'constants.js');

let appContent = fs.readFileSync(appPath, 'utf8');
let appLines = appContent.split('\n');
let constContent = fs.readFileSync(constPath, 'utf8');

console.log(`App.jsx lines before: ${appLines.length}`);

// ===== Verify all boundaries first =====
// EMOTION_STYLES: L1095(comment) to L1221(};) -> 0-indexed 1094-1220
const esStart = 1094;
const esEnd = 1220;
if (!appLines[esStart].includes('[v2.25]') && !appLines[esStart + 1].includes('const EMOTION_STYLES')) {
  console.error(`ERROR EMOTION_STYLES: L${esStart+1} = "${appLines[esStart].trim().substring(0,60)}"`);
  process.exit(1);
}
if (!appLines[esEnd].trim().startsWith('};')) {
  console.error(`ERROR EMOTION_STYLES end: L${esEnd+1} = "${appLines[esEnd].trim().substring(0,60)}"`);
  process.exit(1);
}
console.log(`OK: EMOTION_STYLES L${esStart+1}-L${esEnd+1} (${esEnd-esStart+1} lines)`);

// cameraAngles: L1432(comment) to L1444(];) -> 0-indexed 1431-1443
const caStart = 1431;
const caEnd = 1443;
if (!appLines[caStart].includes('HYPER-DYNAMIC') && !appLines[caStart+1].includes('const cameraAngles')) {
  console.error(`ERROR cameraAngles: L${caStart+1} = "${appLines[caStart].trim().substring(0,60)}"`);
  process.exit(1);
}
console.log(`OK: cameraAngles L${caStart+1}-L${caEnd+1} (${caEnd-caStart+1} lines)`);

// cameraLensMap: L1459(comment) to L1473(};) -> 0-indexed 1458-1472
const clStart = 1458;
const clEnd = 1472;
if (!appLines[clStart].includes('cameraLensMap') && !appLines[clStart].includes('[v2.60]')) {
  // Try the actual const line
  if (!appLines[clStart+1]?.includes('const cameraLensMap')) {
    console.error(`ERROR cameraLensMap: L${clStart+1} = "${appLines[clStart].trim().substring(0,60)}"`);
    process.exit(1);
  }
}
console.log(`OK: cameraLensMap L${clStart+1}-L${clEnd+1} (${clEnd-clStart+1} lines)`);

// ===== Extract blocks (with indent cleanup) =====
const extractBlock = (lines, start, end) => {
  return lines.slice(start, end + 1).map(l => l.replace(/^      /, ''));
};

const emotionBlock = extractBlock(appLines, esStart, esEnd);
// Make first const line exportable
const esConstIdx = emotionBlock.findIndex(l => l.trim().startsWith('const EMOTION_STYLES'));
if (esConstIdx >= 0) {
  emotionBlock[esConstIdx] = emotionBlock[esConstIdx].replace('const EMOTION_STYLES', 'export const EMOTION_STYLES');
}

const cameraAnglesBlock = extractBlock(appLines, caStart, caEnd);
const caConstIdx = cameraAnglesBlock.findIndex(l => l.trim().startsWith('const cameraAngles'));
if (caConstIdx >= 0) {
  cameraAnglesBlock[caConstIdx] = cameraAnglesBlock[caConstIdx].replace('const cameraAngles', 'export const cameraAngles');
}

const cameraLensBlock = extractBlock(appLines, clStart, clEnd);
const clConstIdx = cameraLensBlock.findIndex(l => l.trim().startsWith('const cameraLensMap'));
if (clConstIdx >= 0) {
  cameraLensBlock[clConstIdx] = cameraLensBlock[clConstIdx].replace('const cameraLensMap', 'export const cameraLensMap');
}

// ===== Append to constants.js =====
const additions = [
  '',
  ...emotionBlock,
  '',
  ...cameraAnglesBlock,
  '',
  ...cameraLensBlock,
  '',
];
constContent = constContent.trimEnd() + '\n' + additions.join('\n');
fs.writeFileSync(constPath, constContent, 'utf8');
console.log(`constants.js updated`);

// ===== Remove from App.jsx (bottom-to-top) =====
// Remove cameraLensMap first (highest line numbers)
appLines.splice(clStart, clEnd - clStart + 1, '      // cameraLensMap -> constants.js に外部化済み');
console.log(`Replaced cameraLensMap: removed ${clEnd-clStart+1} lines, inserted 1`);

// Remove cameraAngles (after cameraLensMap removal, these indices are still valid since they're before it)
appLines.splice(caStart, caEnd - caStart + 1, '      // cameraAngles -> constants.js に外部化済み');
console.log(`Replaced cameraAngles: removed ${caEnd-caStart+1} lines, inserted 1`);

// Remove EMOTION_STYLES (still at original position since it's before both)
appLines.splice(esStart, esEnd - esStart + 1, '      // EMOTION_STYLES -> constants.js に外部化済み');
console.log(`Replaced EMOTION_STYLES: removed ${esEnd-esStart+1} lines, inserted 1`);

// ===== Update App.jsx import =====
const importIdx = appLines.findIndex(l => l.includes("SYSTEM_VERSION") && l.includes("from './lib/constants'"));
if (importIdx === -1) {
  console.error("ERROR: Could not find constants import line");
  process.exit(1);
}
if (!appLines[importIdx].includes('EMOTION_STYLES')) {
  appLines[importIdx] = appLines[importIdx].replace(
    "getModelBadgeInfo",
    "getModelBadgeInfo, EMOTION_STYLES, cameraAngles, cameraLensMap"
  );
  console.log(`Updated import on line ${importIdx + 1}`);
}

const finalLineCount = appLines.length;
console.log(`App.jsx lines after: ${finalLineCount}`);
console.log(`Net reduction: ${appContent.split('\n').length - finalLineCount} lines`);

fs.writeFileSync(appPath, appLines.join('\n'), 'utf8');
console.log('SUCCESS');
