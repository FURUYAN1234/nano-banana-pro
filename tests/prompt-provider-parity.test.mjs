import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const workflowSource = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
const assemblerSource = readFileSync(new URL('../src/lib/prompt-assembler.js', import.meta.url), 'utf8');

test('web copy and API generation preserve the same prompt body with API-only reference roles', () => {
  assert.match(
    workflowSource,
    /navigator\.clipboard\.writeText\(\s*finalPrompt\s*\)/,
    'manual Web copy must copy finalPrompt directly'
  );
  assert.match(
    workflowSource,
    /const\s+currentPrompt\s*=\s*overridePrompt\s*\|\|\s*finalPrompt\s*;/,
    'API generation must start from finalPrompt unless a policy retry supplies an explicit replacement'
  );
  assert.match(
    workflowSource,
    /generateImageCandidate\(\s*currentPrompt\s*\)/,
    'initial API generation must send the same currentPrompt used by the Web-copy flow'
  );
  assert.match(
    workflowSource,
    /const apiPrompt = appendOpenAIReferencePrompt\(prompt, referencePlan\);[\s\S]*?generateImageWithOpenAI\(apiPrompt,/,
    'OpenAI may append reference roles without rewriting the approved body'
  );
  assert.match(
    workflowSource,
    /generateImageWithImagen\(\s*prompt\s*,/,
    'the shared candidate generator must forward its prompt to Gemini unchanged'
  );
});

test('prompt assembly only branches by Gemini-family vs ChatGPT-family, not Web vs API', () => {
  assert.match(
    assemblerSource,
    /PROMPT_PROVIDER_FAMILIES/,
    'prompt provider families must be explicit constants'
  );
  assert.match(
    assemblerSource,
    /normalizePromptProviderFamily/,
    'prompt assembly must normalize providerFamily before selecting prompt structure'
  );
  assert.match(
    assemblerSource,
    /if\s*\(\s*isChatGPTFamily\s*\)/,
    'provider-family selection should branch on the normalized provider family'
  );
  assert.doesNotMatch(
    assemblerSource,
    /if\s*\(\s*enableChatGPTMode\s*\)/,
    'provider-family selection must not be controlled by the legacy ChatGPT-mode boolean'
  );
  assert.match(
    workflowSource,
    /getCurrentPromptProviderFamily/,
    'workflow must derive a providerFamily from the active engine/API state'
  );
  assert.match(
    workflowSource,
    /providerFamily:\s*effectiveProviderFamily/,
    'workflow must pass the explicit providerFamily into prompt assembly'
  );
  assert.doesNotMatch(
    assemblerSource,
    /\b(?:webPrompt|apiPrompt|promptForWeb|promptForApi|chatGPTWeb|openAIAPI|geminiWeb|geminiAPI)\b/i,
    'do not split prompts into Web-specific and API-specific variants'
  );
  assert.doesNotMatch(
    workflowSource,
    /\b(?:setWebPrompt|setApiPrompt|setPromptForWeb|setPromptForApi)\b/i,
    'workflow must not introduce separately editable Web/API prompt state'
  );
  assert.match(workflowSource, /appendOpenAIReferencePrompt\(prompt, referencePlan\)/);
  assert.doesNotMatch(workflowSource, /setFinalPrompt\(\s*apiPrompt\s*\)/);
});
