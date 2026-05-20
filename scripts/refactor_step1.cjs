#!/usr/bin/env node
// refactor_step1.js - Replace inline STEP2 scenario prompt with getScenarioPrompt() call
// Also add getScenarioPrompt to the import from prompts.js

const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'src', 'App.jsx');
const content = fs.readFileSync(appPath, 'utf8');
const lines = content.split('\n');

console.log(`Total lines before: ${lines.length}`);

// Step A: Update import line
// Find: import { getCharacterAnalysisPrompt, getScenarioEnhancePrompt } from './lib/prompts';
// Replace with: import { getCharacterAnalysisPrompt, getScenarioEnhancePrompt, getScenarioPrompt } from './lib/prompts';
const importIdx = lines.findIndex(l => l.includes("getCharacterAnalysisPrompt, getScenarioEnhancePrompt") && l.includes("from './lib/prompts'"));
if (importIdx === -1) {
  console.error("ERROR: Could not find prompts import line");
  process.exit(1);
}
console.log(`Found prompts import at line ${importIdx + 1}: ${lines[importIdx].trim().substring(0, 80)}`);
lines[importIdx] = lines[importIdx].replace(
  "getCharacterAnalysisPrompt, getScenarioEnhancePrompt",
  "getCharacterAnalysisPrompt, getScenarioEnhancePrompt, getScenarioPrompt"
);

// Step B: Replace lines 807-1105 (0-indexed: 806-1104)
// Find the start line: "      const scenarioPrompt = `"
// Find the end line: "        `;"
const startLine = 806; // 0-indexed (line 807)
const endLine = 1104;  // 0-indexed (line 1105)

// Verify the start
if (!lines[startLine].trim().startsWith("const scenarioPrompt = `")) {
  console.error(`ERROR: Line ${startLine + 1} does not start with expected content.`);
  console.error(`Actual: "${lines[startLine].trim().substring(0, 50)}"`);
  process.exit(1);
}
console.log(`Start line ${startLine + 1}: "${lines[startLine].trim().substring(0, 50)}"`);

// Verify the end (should end with backtick-semicolon)
if (!lines[endLine].trim().match(/^`\s*;/)) {
  console.error(`ERROR: Line ${endLine + 1} does not end with expected "\`;"`);
  console.error(`Actual: "${lines[endLine].trim().substring(0, 50)}"`);
  process.exit(1);
}
console.log(`End line ${endLine + 1}: "${lines[endLine].trim().substring(0, 50)}"`);

// Build the replacement block
const replacement = [
  '      // STEP2 scenario prompt (template externalized to prompts.js)',
  '      const scenarioPrompt = getScenarioPrompt({',
  '        randomCategory,',
  '        targetDate,',
  '        inputMode,',
  '        manualTopic,',
  '        newsContext,',
  '        searchTopicKeywords,',
  '        bg360Image,',
  '        bg360Analysis,',
  '        bg360Enabled,',
  '        customLocation,',
  '        forcedLocation,',
  '        customOutfit,',
  '        ragLocationDetails,',
  '        ragReactions,',
  '        punchlineType',
  '      });',
];

// Splice: remove lines startLine..endLine (inclusive), insert replacement
const removedCount = endLine - startLine + 1;
lines.splice(startLine, removedCount, ...replacement);

console.log(`Removed ${removedCount} lines, inserted ${replacement.length} lines`);
console.log(`Total lines after: ${lines.length}`);
console.log(`Net reduction: ${removedCount - replacement.length} lines`);

// Write back
fs.writeFileSync(appPath, lines.join('\n'), 'utf8');
console.log('SUCCESS: App.jsx updated');
