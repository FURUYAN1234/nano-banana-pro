import test from 'node:test';
import assert from 'node:assert/strict';
import { buildOpenAIReferencePlan, appendOpenAIReferencePrompt, getOpenAIPromptBodyBudget, stripImageReferenceManifest } from '../src/lib/openai-image-references.js';
import { buildGeminiReferencePlan, appendGeminiReferencePrompt, buildGeminiImageApiPrompt } from '../src/lib/gemini-image-references.js';

const image = 'data:image/png;base64,YQ==';
const source = 'Camera: ローアングル\nDialogue: 「細い線も台詞は保持。」\n';
for (const [provider, build, append] of [
  ['OpenAI', buildOpenAIReferencePlan, appendOpenAIReferencePrompt],
  ['Gemini', buildGeminiReferencePlan, appendGeminiReferencePrompt],
]) {
  test(`${provider}: normal monochrome generation includes style-scoped ink economy without rewriting the script`, () => {
    const plan = build({ characterImages: [image], colorMode: 'monochrome' });
    const prompt = append(source, plan);
    assert.ok(prompt.startsWith(source));
    assert.match(prompt, /INK ECONOMY — READABILITY REFINEMENT:/);
    assert.match(prompt, /In NORMAL panels, reduce redundant individual hair strands, incidental fabric wrinkles and background micro-texture/);
    assert.match(prompt, /retain the intentional fine directional\/crosshatching and carved facial planes of GEKIGA/);
    assert.match(prompt, /Never erase necessary facial strokes, flatten shadows, whiten canonically dark skin/);
    assert.equal((prompt.match(/INK ECONOMY — READABILITY REFINEMENT:/g) || []).length, 1);
    assert.equal(plan.counts.character, 1);
  });
  test(`${provider}: color generation does not inherit monochrome detail reduction`, () => {
    const plan = build({ characterImages: [image], colorMode: 'color' });
    assert.doesNotMatch(append(source, plan), /INK ECONOMY — READABILITY REFINEMENT:/);
  });
}

test('OpenAI reserves the entire new guidance before accepting a full-budget body', () => {
  const plan = buildOpenAIReferencePlan({ characterImages: [image], colorMode: 'monochrome' });
  assert.match(plan.rolePrompt, /INK ECONOMY — READABILITY REFINEMENT:/);
  const body = 'a'.repeat(getOpenAIPromptBodyBudget(plan));
  assert.equal(appendOpenAIReferencePrompt(body, plan).length, 32000);
  assert.throws(() => appendOpenAIReferencePrompt(body + 'a', plan), /上限|32,000/);
});

test('OpenAI targeted repairs retain their scope instead of applying a new page-wide rendering treatment', () => {
  const plan = buildOpenAIReferencePlan({ originalCandidate: {base64Img: 'YQ=='}, colorMode: 'monochrome' });
  assert.doesNotMatch(plan.rolePrompt, /INK ECONOMY — READABILITY REFINEMENT:/);
  assert.equal(plan.counts.original, 1);
});

test('a targeted repair replaces normal reference directions without retaining the global ink-economy treatment', () => {
  for (const build of [buildOpenAIReferencePlan, buildGeminiReferencePlan]) {
    const normal = appendGeminiReferencePrompt(source, build({ characterImages: [image], colorMode: 'monochrome' }));
    const repairBody = stripImageReferenceManifest(normal);
    assert.ok(repairBody.startsWith(source));
    assert.doesNotMatch(repairBody, /INK ECONOMY — READABILITY REFINEMENT:/);
    const plan = buildGeminiReferencePlan({ characterImages: [image], colorMode: 'monochrome', includeInkEconomy: false });
    assert.doesNotMatch(buildGeminiImageApiPrompt(repairBody, plan), /INK ECONOMY — READABILITY REFINEMENT:/);
  }
});
