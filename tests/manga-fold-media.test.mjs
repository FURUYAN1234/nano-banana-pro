import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';
import { restoreReviewedFoldRendering } from './helpers/prompt-policy-normalization.mjs';

const styles = ['NORMAL', 'POP_ART', 'WATERCOLOR', 'GEKIGA'];
const camera = '左上35度から見下ろす中景。';
const action = 'ユウが袖を折り、箱を持ち上げる。';
const speech = 'この折り目を見て。';
const scenario = '## タイトル: 布の折り目\nLocation: 作業室\nOutfit: casual\n' + styles.map((style, i) =>
  `[${i + 1}コマ目]\n[Camera: ${camera}]\n[EMOTION: ${style}]\n状況: ${action}\nユウ「${speech}」`
).join('\n');
const options = { scenario, castList: '## ユウ\n短髪、眼鏡。', cinematicTechniques: false, promptMaxChars: 32000 };
const foldLines = prompt => prompt.split('\n').filter(line => /^(?:- (?:Add clothing-fold|Model clothing folds|CLOTHING FOLD SHADOW ASSIST:|FOLD SHADOWS:|FOLD PRIORITY:|Keep reference fold\/shadow)|PANEL-BY-PANEL CLOTHING FOLD PRIORITY:|FOLD PRIORITY:)/.test(line));
const assertSource = prompt => {
  const panels = prompt.split(/^## Panel \d+\s*$/m).slice(1);
  assert.equal(panels.length, 4);
  for (const panel of panels) {
    assert.ok(panel.includes(camera), 'authored Camera is unchanged');
    assert.ok(panel.includes(action), 'authored Action is unchanged');
    assert.ok(panel.includes(speech), 'verbatim dialogue is unchanged');
  }
};

const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
try {
  const { buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js');
  test('ordinary color pages apply fold shadows in each medium, with hard cel edges limited to NORMAL', () => {
    for (const providerFamily of ['chatgpt', 'gemini']) {
      const prompt = buildMangaPrompt({ ...options, providerFamily, colorMode: 'color', punchlineType: 'Auto' });
      assertSource(prompt);
      assert.match(prompt, /No cel-fill or watercolor filter over anime; pigment shapes build faces and folds/);
      const folds = foldLines(prompt);
      assert.ok(folds.length >= 2);
      for (const line of folds) assert.match(line, /panel medium|NORMAL\/unmarked only/, line);
      assert.ok(folds.some(line => /overlap\/pinch.*NORMAL\/unmarked only.*no geometric patterns/.test(line)), 'normal clothing still receives deliberate localized fold construction');
    }
  });

  test('reference-style lock wins over newly imposed fold shadows in both colors and compaction routes', () => {
    for (const providerFamily of ['chatgpt', 'gemini']) for (const colorMode of ['color', 'monochrome']) {
      const prompt = buildMangaPrompt({ ...options, providerFamily, colorMode, punchlineType: 'SeriousDocumentary' });
      assertSource(prompt);
      const folds = foldLines(prompt);
      assert.ok(folds.length >= 2);
      for (const line of folds) {
        assert.match(line, /reference.*fold.*shadow/i, line);
        assert.doesNotMatch(line, /triangular|wedge|2-4|hard cel|cel-shaded/, 'reference drawings must not acquire a new fold shader');
      }
      assert.doesNotMatch(prompt, /PANEL STYLE LOCK: WATERCOLOR;/);
      if (colorMode === 'monochrome') assert.match(prompt, /MONOCHROME.*(?:TWO|THREE)-/);
    }
  });

  test('ordinary monochrome fold behavior and its white-paper safeguards remain available', () => {
    for (const providerFamily of ['chatgpt', 'gemini']) {
      const prompt = buildMangaPrompt({ ...options, providerFamily, colorMode: 'monochrome', punchlineType: 'Auto' });
      assertSource(prompt);
      assert.match(prompt, /MONOCHROME.*(?:TWO|THREE)-/);
      assert.match(prompt, /white (?:lit fabric|paper)|白紙/);
      const folds = foldLines(prompt);
      assert.ok(folds.some(line => /triangular|hatched wedge/.test(line)));
      assert.ok(folds.some(line => /no geometric patterns|never random geometric patterns/.test(line)));
      assert.doesNotMatch(folds.join('\n'), /transparent pigment|watercolor|NORMAL\/unmarked only/);
    }
  });

  test('fold baseline normalization rejects unknown changes and never rewrites source fields', () => {
    for (const providerFamily of ['chatgpt', 'gemini']) for (const punchlineType of ['Auto', 'SeriousDocumentary']) {
      const prompt = buildMangaPrompt({ ...options, providerFamily, colorMode: 'color', punchlineType });
      const normalized = restoreReviewedFoldRendering(prompt);
      if (providerFamily === 'chatgpt' && punchlineType === 'Auto') {
        assert.equal(normalized, prompt);
        continue;
      }
      assert.notEqual(normalized, prompt);
      for (const line of foldLines(prompt)) {
        assert.notEqual(restoreReviewedFoldRendering(prompt.replace(line, line + ' UNAUTHORIZED')), normalized);
        for (const field of ['Camera', 'Action', 'Dialogue']) {
          const authored = `${field}: ${line}`;
          assert.ok(restoreReviewedFoldRendering(prompt + '\n' + authored).endsWith(authored));
        }
        assert.equal(restoreReviewedFoldRendering(line), line, 'unscoped user text is not compiler output');
      }
      assertSource(normalized);
    }
  });
} finally { await server.close(); }
