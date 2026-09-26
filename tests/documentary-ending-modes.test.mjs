import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let getEndingModePolicy;
let isDocumentaryEnding;
let DOCUMENTARY_ENDING_OPTIONS;
let validatePromptEndingModeConsistency;
let assertPromptEndingModeConsistency;
let getPunchlineLabel;
let getScenarioPrompt;
let buildMangaPrompt;
let buildComedyReviewRequest;
let assertDocumentarySourceFidelity;
let validateDocumentarySourceFidelity;
let selectDocumentarySourceText;
let attachDocumentarySourceFacts;
let normalizeDocumentaryScenarioTimeline;

const step2Url = new URL('../src/components/Step2Panel.jsx', import.meta.url);
const workflowUrl = new URL('../src/hooks/useMangaWorkflow.js', import.meta.url);
const scenarioProviderUrl = new URL('../src/lib/scenario-provider.js', import.meta.url);

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({
    getEndingModePolicy,
    isDocumentaryEnding,
    DOCUMENTARY_ENDING_OPTIONS,
    validatePromptEndingModeConsistency,
    assertPromptEndingModeConsistency
  } = await server.ssrLoadModule('/src/lib/ending-mode-policy.js'));
  ({ getPunchlineLabel } = await server.ssrLoadModule('/src/lib/constants.js'));
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  ({ buildComedyReviewRequest } = await server.ssrLoadModule('/src/lib/comedy-review.js'));
  ({
    assertDocumentarySourceFidelity,
    validateDocumentarySourceFidelity,
    selectDocumentarySourceText,
    attachDocumentarySourceFacts,
    normalizeDocumentaryScenarioTimeline
  } = await server.ssrLoadModule('/src/lib/documentary-source-fidelity.js'));
});

after(async () => {
  await server?.close();
});

const buildScenarioRequest = (punchlineType) => getScenarioPrompt({
  randomCategory: 'user supplied material',
  targetDate: '2026-09-13',
  inputMode: 'manual',
  manualTopic: 'A committee discusses a documented local event and its consequences.',
  newsContext: '',
  searchTopicKeywords: '',
  bg360Image: null,
  bg360Analysis: null,
  bg360Enabled: false,
  customLocation: '',
  customOutfit: '',
  locationPlan: {
    mode: 'adaptive',
    anchorName: '',
    guidance: 'Choose the location established by the supplied material.'
  },
  ragReactions: '',
  punchlineType,
  comedyTone: 'HighTension',
  styleJson: {
    style_name: 'External style override',
    reproduction_prompt: 'Render every panel as a watercolor picture book.',
    anti_patterns: 'Do not retain the reference line style.'
  }
});

const CAST_LIST = `## SpeakerA
- adult character, short black hair, no glasses
## SpeakerB
- adult character, shoulder-length hair, round glasses`;

const SCENARIO = `Topic: Recorded decision
Logline: Two people examine a recorded decision and its consequences.
Location: meeting room
Outfit: office casual
Punchline: source faithful

[1コマ目: 起]
[EMOTION: CHIBI_GAG]
[Camera: medium shot]
Action: SpeakerA places the official record on the table.
SpeakerA「記録を確認します。」

[2コマ目: 承]
[EMOTION: WATERCOLOR]
[Camera: close up]
Action: SpeakerB reads the documented result.
SpeakerB「結果は変わりません。」

[3コマ目: 転]
[EMOTION: GEKIGA]
[Camera: over the shoulder]
Action: SpeakerA points to the consequence written in the record.
SpeakerA「影響が残ります。」

[4コマ目: 結]
[EMOTION: IMPACT]
[Camera: wide shot]
Action: SpeakerB closes the record and looks seriously at SpeakerA.
SpeakerB「次を決めましょう。」`;

const buildFinalPrompt = ({ punchlineType, providerFamily = 'chatgpt', colorMode = 'color', scenario = SCENARIO }) => buildMangaPrompt({
  scenario,
  castList: CAST_LIST,
  colorMode,
  providerFamily,
  punchlineType,
  systemVersion: 'test',
  cinematicTechniques: false
});

test('defines two documentary endings while preserving the existing saved value', async () => {
  const serious = getEndingModePolicy('SeriousDocumentary');
  const gag = getEndingModePolicy('Documentary');

  assert.equal(serious.documentary, true);
  assert.equal(serious.endingTone, 'serious');
  assert.equal(serious.preserveReferenceStyle, true);
  assert.equal(gag.documentary, true);
  assert.equal(gag.endingTone, 'gag');
  assert.equal(gag.preserveReferenceStyle, false);
  assert.equal(isDocumentaryEnding('SeriousDocumentary'), true);
  assert.equal(isDocumentaryEnding('Documentary'), true);
  assert.equal(isDocumentaryEnding('Auto'), false);
  assert.equal(getPunchlineLabel('SeriousDocumentary'), 'シリアス・ドキュメンタリー（原文忠実＋オチだけシリアス漫画化・絵柄変更無し）');
  assert.equal(getPunchlineLabel('Documentary'), 'ギャグ・ドキュメンタリー（原文忠実＋オチだけギャグ漫画化）');
  assert.deepEqual(DOCUMENTARY_ENDING_OPTIONS.map(({ value }) => value), ['SeriousDocumentary', 'Documentary']);

  const step2Source = await readFile(step2Url, 'utf8');
  assert.match(step2Source, /DOCUMENTARY_ENDING_OPTIONS\.filter/);
  assert.doesNotMatch(step2Source, /<option value="Documentary">/);
});

test('serious documentary keeps source fidelity and removes comedy or art-style switching instructions', () => {
  const prompt = buildScenarioRequest('SeriousDocumentary');

  assert.match(prompt, /強制モード: シリアス・ドキュメンタリー/);
  assert.match(prompt, /1〜3コマ目.*原文.*忠実/s);
  assert.match(prompt, /4コマ目だけ.*シリアス/s);
  assert.match(prompt, /全4コマ.*キャラクターシート.*同じ絵柄/s);
  assert.match(prompt, /表情・視線・身体演技・カメラ・構図・照明・間/);
  assert.match(prompt, /日付.*時刻.*数量.*変更前後.*省略.*禁止/s);
  assert.doesNotMatch(prompt, /笑いの構造設計|ギャグ強度の方針|強制コメディトーン指定|絵柄の急変/);
  assert.doesNotMatch(prompt, /Render every panel as a watercolor picture book/);
  assert.doesNotMatch(prompt, /4コマの中で少なくとも2種類以上のタグ/);
});

test('documentary source fidelity preserves dates, quantities, and equivalent Japanese clock times', () => {
  const source = '10月から閉館時刻を午後8時から午後6時へ変更し、利用者は2時間早まると話した。';
  const alteredScenario = '今日から閉館時刻を18時へ変更し、利用者は2時間早まると話した。';
  const altered = validateDocumentarySourceFidelity({
    sourceText: source,
    scenarioText: alteredScenario
  });

  assert.equal(altered.ok, false);
  assert.deepEqual(altered.missingAnchors, ['10月', '20時']);
  assert.throws(
    () => assertDocumentarySourceFidelity({ sourceText: source, scenarioText: alteredScenario }),
    /10月.*20時/
  );

  const faithful = validateDocumentarySourceFidelity({
    sourceText: source,
    scenarioText: '10月から閉館時刻を20時から18時へ変更し、利用者は2時間早まると話した。'
  });
  assert.equal(faithful.ok, true);
  assert.deepEqual(faithful.missingAnchors, []);

  const fullSource = '市立図書館は、人員不足と運営費の増加により、10月から平日の閉館時刻を午後8時から午後6時へ変更すると発表した。仕事帰りに利用していた市民からは、2時間早まると通えないという声が出ている。図書館側は休日開館と電子書籍の拡充を進める一方、地域の学習場所をどう守るかが課題になっている。';
  const causeDrift = validateDocumentarySourceFidelity({
    sourceText: fullSource,
    scenarioText: '10月から平日は20時から18時へ変更。人手も予算も足りない。仕事帰りの市民は2時間早まると困る。休日は開け、電子書籍も使える。地域の学びの場を守りたい。'
  });
  assert.equal(causeDrift.ok, false);
  assert.equal(causeDrift.missingAnchors.length, 0);
  assert.ok(causeDrift.missingSourceTerms.includes('人員不足'));
  assert.ok(causeDrift.missingSourceTerms.includes('運営費'));
  assert.ok(causeDrift.missingSourceTerms.includes('拡充'));
  assert.ok(causeDrift.lexicalCoverage < causeDrift.requiredLexicalCoverage);

  const omittedAnnouncedMeasure = validateDocumentarySourceFidelity({
    sourceText: fullSource,
    scenarioText: '市立図書館は、人員不足と運営費の増加により、10月から平日の閉館時刻を20時から18時へ変更すると発表した。仕事帰りに利用していた市民からは、2時間早まると通えないという声が出ている。図書館側は電子書籍の拡充を進め、地域の学習場所をどう守るかが課題になっている。'
  });
  assert.equal(omittedAnnouncedMeasure.ok, false);
  assert.ok(omittedAnnouncedMeasure.missingRequiredSourceTerms.includes('休日開館'));
});

test('documentary source fidelity validates extracted URL article text instead of prompt wrapper text', () => {
  assert.equal(selectDocumentarySourceText({
    inputMode: 'manual',
    manualTopic: 'https://example.com/article',
    extractedArticleText: '本文に書かれた一次情報'
  }), '本文に書かれた一次情報');

  assert.equal(selectDocumentarySourceText({
    inputMode: 'manual',
    manualTopic: 'ユーザーが直接入力した本文',
    extractedArticleText: ''
  }), 'ユーザーが直接入力した本文');

  assert.equal(selectDocumentarySourceText({
    inputMode: 'news',
    manualTopic: '検証対象外の手動入力',
    extractedArticleText: ''
  }), '');
});

test('documentary source facts are deterministically assigned to panels 1-3 and kept as non-visible prompt locks', () => {
  const source = '市の施設は4月に受付時間を変更した。利用者には事前通知を行った。代替窓口も増設した。';
  const scenario = attachDocumentarySourceFacts(SCENARIO, source);

  assert.match(scenario, /\[1コマ目[^\]]*\][\s\S]*SOURCE FACT[^\n]*市の施設は4月に受付時間を変更した。/);
  assert.match(scenario, /\[2コマ目[^\]]*\][\s\S]*SOURCE FACT[^\n]*利用者には事前通知を行った。/);
  assert.match(scenario, /\[3コマ目[^\]]*\][\s\S]*SOURCE FACT[^\n]*代替窓口も増設した。/);
  assert.equal(attachDocumentarySourceFacts(scenario, source), scenario);

  const prompt = buildFinalPrompt({ punchlineType: 'SeriousDocumentary', scenario });
  assert.match(prompt, /DOCUMENTARY SOURCE FACT LOCK/);
  assert.match(prompt, /Panel 1[^\n]*市の施設は4月に受付時間を変更した。/);
  assert.match(prompt, /Panel 2[^\n]*利用者には事前通知を行った。/);
  assert.match(prompt, /Panel 3[^\n]*代替窓口も増設した。/);
  assert.match(prompt, /internal planning facts.*never print/i);
  assert.doesNotMatch(prompt, /Action \(visual only\):[^\n]*SOURCE FACT/i);
  assert.doesNotMatch(prompt, /Dialogue \(verbatim bubbles\):[^\n]*SOURCE FACT/i);
});

test('documentary prompt locks omit inline bibliography labels and titles', () => {
  const scenario = SCENARIO.replace(
    '[3コマ目: 転]',
    '[3コマ目: 転]\n[SOURCE FACT - INTERNAL, DO NOT PRINT]: 景品はトイレットペーパー。 出典・参考: - 『昭和商店街聞き取り調査』 - 『福引景品記録』'
  );
  const prompt = buildFinalPrompt({ punchlineType: 'Documentary', scenario });

  assert.match(prompt, /Panel 3 source fact: 景品はトイレットペーパー。/);
  assert.doesNotMatch(prompt, /出典・参考|昭和商店街聞き取り調査|福引景品記録/);
});

test('documentary timeline normalization replaces an unsupported relative effective date with the sole source date', () => {
  const source = '市の施設は4月から受付時間を午後8時から午後6時へ変更する。';
  assert.equal(
    normalizeDocumentaryScenarioTimeline('担当者「今日から午後6時閉館です。」', source),
    '担当者「4月から午後6時閉館です。」'
  );
  assert.equal(
    normalizeDocumentaryScenarioTimeline('担当者「来月から変更です。」', '4月と5月に段階的に変更する。'),
    '担当者「来月から変更です。」'
  );
});

test('documentary generation retries when source factual anchors are missing', async () => {
  const providerSource = await readFile(scenarioProviderUrl, 'utf8');

  assert.match(providerSource, /assertDocumentarySourceFidelity/);
  assert.match(providerSource, /DOCUMENTARY_SOURCE_FIDELITY_RETRY_INSTRUCTION/);
  assert.match(providerSource, /isDocumentaryEnding\(punchlineType\)/);
  assert.match(providerSource, /DOCUMENTARY_SOURCE_FIDELITY:/);
  assert.match(providerSource, /fatalValidationCodes:[\s\S]*DOCUMENTARY_SOURCE_FIDELITY/);
  assert.match(providerSource, /retryInstruction: \(\{ code, message \}\)[\s\S]*FAILED CHECK/);
  assert.match(providerSource, /ORIGINAL SOURCE TO PRESERVE/);
  assert.match(providerSource, /attachDocumentarySourceFacts/);
  assert.match(providerSource, /normalizeDocumentaryScenarioTimeline/);
});

test('gag documentary keeps the existing value and allows only the last panel to become a gag', () => {
  const prompt = buildScenarioRequest('Documentary');

  assert.match(prompt, /強制モード: ギャグ・ドキュメンタリー/);
  assert.match(prompt, /1〜3コマ目の厳格ルール/);
  assert.match(prompt, /4コマ目だけ.*ギャグ/s);
  assert.match(prompt, /元ネタの事実を捏造・改変してオチにすることは禁止/);
});

for (const providerFamily of ['chatgpt', 'gemini']) {
  test(`${providerFamily} serious documentary locks every panel to the character-sheet art style`, () => {
    const prompt = buildFinalPrompt({ punchlineType: 'SeriousDocumentary', providerFamily });

    assert.match(prompt, /REFERENCE-SHEET ART-STYLE LOCK/);
    assert.match(prompt, /all four panels/i);
    assert.match(prompt, /linework.*coloring.*shading.*facial construction.*body proportions/s);
    assert.match(prompt, /expression.*acting.*camera.*composition.*lighting/s);
    assert.match(prompt, /Do not reproduce.*sheet layouts.*labels.*sample poses/s);
    if (providerFamily === 'chatgpt') {
      assert.match(prompt, /IGNORE reference clothing.*office casual/s);
      assert.match(prompt, /garment items come from the active outfit override/i);
      assert.doesNotMatch(prompt, /Preserve each named character's garment items/);
    }
    assert.doesNotMatch(prompt, /PANEL STYLE LOCK|PROPORTION OVERRIDE:|GAG INTENT OVERLAY:/);
    assert.doesNotMatch(prompt, /ART-STYLE DIFFERENCE QA LOCK|MONOCHROME STYLE DIFFERENCE QA/);
  });
}

test('serious documentary rejects stale or manually edited prompts that restore gag styles', () => {
  const validPrompt = buildFinalPrompt({ punchlineType: 'SeriousDocumentary' });
  assert.deepEqual(
    validatePromptEndingModeConsistency({ prompt: validPrompt, punchlineType: 'SeriousDocumentary' }),
    { ok: true, issues: [] }
  );

  const stalePrompt = `OUTPUT: Single image. Draw a new four-panel manga page.
- COMEDY INTENT: preserve scripted gag reactions.

## Panel 4
PANEL STYLE LOCK: CHIBI_GAG
PROPORTION OVERRIDE: Use 2-3 head proportions for this panel ONLY.`;
  const result = validatePromptEndingModeConsistency({ prompt: stalePrompt, punchlineType: 'SeriousDocumentary' });

  assert.equal(result.ok, false);
  assert.ok(result.issues.includes('missing-reference-style-lock'));
  assert.ok(result.issues.includes('comedy-intent'));
  assert.ok(result.issues.includes('chibi-style'));
  assert.ok(result.issues.includes('proportion-override'));
  assert.throws(
    () => assertPromptEndingModeConsistency({ prompt: stalePrompt, punchlineType: 'SeriousDocumentary' }),
    /STEP2.*STEP3.*再生成/
  );
});

test('non-serious endings keep their existing prompt styles', () => {
  const gagPrompt = buildFinalPrompt({ punchlineType: 'Documentary' });
  assert.deepEqual(
    validatePromptEndingModeConsistency({ prompt: gagPrompt, punchlineType: 'Documentary' }),
    { ok: true, issues: [] }
  );
});

test('workflow invalidates stale ending output and guards assembly, Web copy, and API generation', async () => {
  const workflowSource = await readFile(workflowUrl, 'utf8');

  assert.match(workflowSource, /const setPunchlineType = \(value\) => {[\s\S]*?setScenario\(""\);[\s\S]*?setFinalPrompt\(""\);[\s\S]*?setGeneratedImage\(null\);/);
  assert.match(workflowSource, /assertPromptEndingModeConsistency\(\{ prompt: reviewed\.prompt, punchlineType: activePunchlineType \}\);[\s\S]*?setFinalPrompt\(reviewed\.prompt\)/);
  assert.match(workflowSource, /const copyPrompt = async \(asTextFile = false, partIndex = null\) => {[\s\S]*?assertPromptEndingModeConsistency\(\{ prompt: finalPrompt, punchlineType: resolvedPunchlineTypeRef\.current \|\| punchlineType \}\);[\s\S]*?await navigator\.clipboard\.writeText\(textToCopy\)/);
  assert.match(workflowSource, /const generateImageOnce = async[\s\S]*?assertPromptEndingModeConsistency\(\{ prompt: currentPrompt, punchlineType: resolvedPunchlineTypeRef\.current \|\| punchlineType \}\);[\s\S]*?setIsGeneratingImage\(true\)/);
  assert.match(workflowSource, /const regenerateImage = async[\s\S]*?generateImageOnce\(skipGuard, overridePrompt/);
});

test('serious monochrome changes only the color medium and preserves reference drawing style', () => {
  const prompt = buildFinalPrompt({ punchlineType: 'SeriousDocumentary', colorMode: 'monochrome' });

  assert.match(prompt, /REFERENCE-SHEET ART-STYLE LOCK/);
  assert.match(prompt, /change only the color medium.*three-tone manga manuscript.*white paper.*solid black.*screentone/i);
  assert.match(prompt, /retain the reference.*linework.*facial construction.*body proportions.*shading design/i);
  assert.match(prompt, /MONOCHROME THREE-TONE MANUSCRIPT LOCK/);
  assert.doesNotMatch(prompt, /MONOCHROME PANEL STYLE LOCK:/);
});

test('both documentary modes use the image-prompt sanitizer', () => {
  const unsafeScenario = SCENARIO.replace('official record', '核兵器の記録');

  for (const punchlineType of ['SeriousDocumentary', 'Documentary']) {
    const prompt = buildFinalPrompt({ punchlineType, scenario: unsafeScenario });
    assert.doesNotMatch(prompt, /核兵器/);
    assert.match(prompt, /禁断の兵器/);
  }
});

test('bounded prompt review uses serious wording without widening patchable lines', async () => {
  const request = buildComedyReviewRequest({
    prompt: buildFinalPrompt({ punchlineType: 'SeriousDocumentary' }),
    scenario: SCENARIO,
    castList: CAST_LIST,
    reviewTone: 'serious'
  });

  assert.match(request, /source-faithful serious four-panel manga/);
  assert.match(request, /preserve the character-reference art style across all four panels/i);
  assert.match(request, /Only patch the numbered eligible lines/);
  assert.doesNotMatch(request, /goal is readable comedy/i);

  const workflowSource = await readFile(workflowUrl, 'utf8');
  assert.match(workflowSource, /getEndingModePolicy\(activePunchlineType\)/);
  assert.match(workflowSource, /isDocumentaryEnding\(activePunchlineType\)/);
});
