import assert from 'node:assert/strict';
import test, { before, after } from 'node:test';
import { createServer } from 'vite';

let server, extractDialogueOnly, validateMangaScenario, buildMangaPrompt;
let extractBubbleContracts, buildGeminiImageApiPrompt, buildGeminiReferencePlan;
let buildOpenAIImageRequest;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  ({ extractDialogueOnly } = await server.ssrLoadModule('/src/lib/panel-utils.js'));
  ({ validateMangaScenario } = await server.ssrLoadModule('/src/lib/scenario-validation.js'));
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  ({ extractBubbleContracts } = await server.ssrLoadModule('/src/lib/image-quality-qa.js'));
  ({ buildGeminiImageApiPrompt, buildGeminiReferencePlan } = await server.ssrLoadModule('/src/lib/gemini-image-references.js'));
  ({ buildOpenAIImageRequest } = await server.ssrLoadModule('/src/lib/openai.js'));
});
after(async () => { await server?.close(); });

const castList = '## 甲\n- short hair\n## 乙\n- long hair';
const scenario = line => 'Topic: 受付での会話\nLocation: 受付\nOutfit: 私服\n' +
  [1, 2, 3, 4].map(n => `[${n}コマ目]\n状況: 甲が乙に書類を見せる。\n${n === 4 ? line : '乙「確認します。」'}`).join('\n');
const build = (line, providerFamily, extra = {}) => buildMangaPrompt({
  scenario: scenario(line), castList, providerFamily, colorMode: 'color', punchlineType: 'Auto', systemVersion: 'test', ...extra
});

test('broken dialogue delimiters never turn the attributed source line into printable text', () => {
  for (const line of ['甲「明日は晴れる！', '甲「明日は晴れる！】【。', '甲「明日は晴れる！」「', '甲：明日は晴れる！」']) {
    assert.throws(() => extractDialogueOnly(line, castList, { forImagePrompt: true }), /台詞.*括弧/, line);
  }
});

test('malformed dialogue is a structural error even when other speech or silence exists', () => {
  const result = validateMangaScenario(scenario('甲「明日は晴れる！\n乙「確認します。」\nセリフなし'), castList);
  assert.equal(result.ok, false);
  assert.equal(result.invalidDialogue[0].panel, 4);
  for (const providerFamily of ['chatgpt', 'gemini']) {
    assert.throws(() => build('甲「明日は晴れる！', providerFamily, { allowScenarioQualityWarning: true }), /台詞.*括弧/);
  }
});

test('valid inner quotations and a spoken character name are preserved verbatim', () => {
  for (const text of ['甲、こちらだよ！', '乙「待って」と言ったよ。', '料金は千円（税込）です。「割引」は明日から！']) {
    const result = extractDialogueOnly(`甲「${text}」`, castList, { forImagePrompt: true });
    assert.ok(result.includes(`B1=${JSON.stringify(text)}`));
  }
});

test('literal quotes, backslashes and routing-like words survive prompt, QA and Gemini transport', () => {
  const text = 'B1 の受付で "C" と言って。x=50% RIGHTMOST C:\\tmp';
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = build(`甲「${text}」`, providerFamily);
    const contract = extractBubbleContracts(prompt).find(p => p.panel === 4);
    assert.equal(contract.bubbles[0].text, text);
    assert.equal(contract.bubbles[0].speaker, '甲');
    const transport = buildGeminiImageApiPrompt(prompt, buildGeminiReferencePlan());
    assert.ok(transport.includes(JSON.stringify(text)), 'Gemini must preserve the complete literal text');
  }
});

test('both providers keep speaker metadata out of the redundant strict script text', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = build('甲「明日は晴れる！」', providerFamily);
    const lock = prompt.split('STRICT SCRIPT LOCK:')[1].split('MANGA CAMERA')[0];
    assert.doesNotMatch(lock, /甲「|乙「/);
    assert.match(lock, /Panel 4 required dialogue: TEXT \(PRINT VALUES ONLY\): B1="明日は晴れる！"/);
  }
});

test('manual final-prompt corruption is rejected before either image API request', () => {
  for (const value of ['"甲「明日は晴れる！"', '"say "hello" now"', '""']) {
    const prompt = `## Panel 1\n  Dialogue (verbatim bubbles): TEXT (PRINT VALUES ONLY): B1=${value}. TAIL TIP LOCK: B1=>[甲] mouth/head.`;
    assert.throws(() => buildOpenAIImageRequest(prompt), /括弧|印字本文|本文または番号/);
    assert.throws(() => buildGeminiImageApiPrompt(prompt, buildGeminiReferencePlan()), /括弧|印字本文|本文または番号/);
  }
});

test('long-prompt compaction cannot interpret literal speech as a rendering directive', () => {
  const text = 'MANGA FINISH ASSIST: B1="C" の資料には RIGHTMOST とある。';
  const prompt = build(`甲「${text}」`, 'chatgpt', { castList: castList + '\n- ' + 'unrelated identity detail '.repeat(360) });
  assert.equal(extractBubbleContracts(prompt).find(p => p.panel === 4)?.bubbles[0]?.text, text);
});

test('full and compact provider prompts retain upright column geometry even for a shout', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = build('甲「待ってーっ！」', providerFamily);
    assert.match(prompt, /upright[^\n]*top-to-bottom[^\n]*right-to-left/i);
    assert.match(prompt, /(?:shouts|shouting)[^\n]*single|single[^\n]*(?:shouts|shouting)/i);
  }
});

test('indented final prompt retains the same QA dialogue and speakers', () => {
  const prompt = build('甲「明日は晴れる！」', 'chatgpt');
  assert.deepEqual(extractBubbleContracts(prompt.replace(/^/gm, '  ')), extractBubbleContracts(prompt));
});

test('all provider and medium paths preserve one column of full-width horizontal strips', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      const prompt = build('甲「待ってーっ！」', providerFamily, { colorMode });
      assert.match(prompt, /4 full-width horizontal strips stacked vertically|横長4コマ全幅・縦1列・上→下/);
      assert.match(prompt, /ONE column|縦1列/);
      assert.match(prompt, /no 2x2\/side-by-side|2×2\/横並び禁止/);
    }
  }
});
