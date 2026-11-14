import assert from 'node:assert/strict';
import test, { before, after } from 'node:test';
import { createServer } from 'vite';

let server, buildMangaPromptArtifact, validatePromptEndingModeConsistency, buildComedyReviewRequest;
before(async () => {
  server = await createServer({ configFile: false, envFile: false, appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, watch: null } });
  ({ buildMangaPromptArtifact } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  ({ validatePromptEndingModeConsistency } = await server.ssrLoadModule('/src/lib/ending-mode-policy.js'));
  ({ buildComedyReviewRequest } = await server.ssrLoadModule('/src/lib/comedy-review.js'));
});
after(async () => { await server?.close(); });

const castList = '## 1. ミナ\n外見: 黒い短髪、丸眼鏡。\n服装: 紺の作業着。';
const scenario = ['NORMAL', 'WATERCOLOR', 'GEKIGA', 'CHIBI_GAG'].map((style, i) =>
  `[${i + 1}コマ目]\n[EMOTION: ${style}]\n[Camera: 高い位置から斜めに俯瞰]\n状況: ミナが机で記録を確認する。\nミナ「記録${i + 1}を確認します。」`).join('\n');
const base = { scenario, castList, punchlineType: 'SeriousDocumentary', hasCharacterReferences: false,
  allowScenarioQualityWarning: true, showWatermarks: false, cinematicTechniques: false };

for (const providerFamily of ['chatgpt', 'gemini']) for (const colorMode of ['color', 'monochrome']) {
  test(`${providerFamily}/${colorMode}: text-only documentary preserves one style without a nonexistent sheet`, () => {
    const { prompt } = buildMangaPromptArtifact({ ...base, providerFamily, colorMode });
    assert.match(prompt, /TEXT-ONLY ART-STYLE LOCK \(ABSOLUTE[^\n]*ALL FOUR PANELS\)/);
    assert.match(prompt, /SERIOUS DOCUMENTARY INTENT:/);
    assert.match(prompt, /TEXT-ONLY PANEL ACTING ONLY:/);
    assert.doesNotMatch(prompt, /REFERENCE-SHEET (?:ART-STYLE|STYLE QA|PANEL ACTING|WARDROBE|OUTFIT)|attached character sheets|character sheet's linework|reference-sheet linework/i);
    assert.doesNotMatch(prompt, /^\s*(?:MONOCHROME )?(?:PANEL STYLE LOCK|ART-STYLE DIFFERENCE QA LOCK):/m);
    if (providerFamily === 'chatgpt') assert.match(prompt, /^FOLD PRIORITY: Keep the established fold\/shadow treatment/m, 'compaction keeps the text-derived style source');
    for (const fact of ['ミナ', '丸眼鏡', '紺の作業着', '記録1を確認します。', '記録4を確認します。']) assert.ok(prompt.includes(fact), fact);
    const validate = value => validatePromptEndingModeConsistency({ prompt: value, punchlineType: 'SeriousDocumentary', hasCharacterReferences: false });
    assert.deepEqual(validate(prompt), { ok: true, issues: [] });
    assert.ok(validate(prompt.replace(/TEXT-ONLY ART-STYLE LOCK \(ABSOLUTE[^\n]*ALL FOUR PANELS\)/g, '')).issues.includes('missing-text-only-style-lock'));
    assert.ok(validate(prompt + '\nPANEL STYLE LOCK: WATERCOLOR').issues.includes('panel-style-switch'));
    assert.ok(validate(prompt + '\nART-STYLE DIFFERENCE QA LOCK: use different styles').issues.includes('style-difference-qa'));
    assert.ok(validate(prompt + '\nCOMEDY INTENT: add a joke').issues.includes('comedy-intent'));
    assert.equal(validatePromptEndingModeConsistency({ prompt, punchlineType: 'SeriousDocumentary' }).ok, false, 'image-present default still requires the reference style lock');
  });
}

test('image-present documentary keeps the existing reference-style contract and default', () => {
  for (const hasCharacterReferences of [undefined, true]) {
    const { prompt } = buildMangaPromptArtifact({ ...base, hasCharacterReferences, providerFamily: 'chatgpt', colorMode: 'color' });
    assert.match(prompt, /REFERENCE-SHEET ART-STYLE LOCK/);
    assert.match(prompt, /attached character sheets/);
    assert.equal(validatePromptEndingModeConsistency({ prompt, punchlineType: 'SeriousDocumentary' }).ok, true);
  }
});

test('text-only documentary review protects style consistency without requesting a sheet', () => {
  const request = buildComedyReviewRequest({ prompt: 'TEXT-ONLY CAST', scenario, castList,
    reviewTone: 'serious', preserveReferenceStyle: true, hasCharacterReferences: false });
  assert.match(request, /all four panels/);
  assert.match(request, /linework, coloring method, shading design, facial construction or body proportions/);
  assert.match(request, /written character descriptions/);
  assert.doesNotMatch(request, /character-reference art style|reference-sheet style/);
});

test('ordinary text-only stories retain their selected per-panel media', () => {
  const { prompt } = buildMangaPromptArtifact({ ...base, punchlineType: 'Auto', providerFamily: 'chatgpt', colorMode: 'color' });
  assert.match(prompt, /PANEL STYLE LOCK: WATERCOLOR/);
  assert.match(prompt, /PANEL STYLE LOCK: GEKIGA/);
  assert.doesNotMatch(prompt, /TEXT-ONLY ART-STYLE LOCK/);
});
