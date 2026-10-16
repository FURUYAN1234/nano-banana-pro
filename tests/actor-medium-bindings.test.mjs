import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createServer } from 'vite';
import { bindingFixture, bindingNativePlan, bindingStyles } from './helpers/actor-medium-binding-fixture.mjs';
import { restoreReviewedActorBindings } from './helpers/prompt-policy-normalization.mjs';

const special = bindingStyles.slice(1, 4);
const baseline = JSON.parse(readFileSync(new URL('./fixtures/actor-medium-binding-before.json', import.meta.url), 'utf8'));
const hash = value => createHash('sha256').update(value).digest('hex');
const namesFrom = text => [...(text.match(/(?:CAST COUNT:|ANTI-CLONE REMINDER:)[^\n]*/)?.[0] || '').matchAll(/\[([^\]]+)\]/g)].map(match => match[1]);
const bindingsFrom = text => [...(text.match(/(?:CAST COUNT:|ANTI-CLONE REMINDER:)[^\n]*/)?.[0] || '').matchAll(/\[([^\]]+)\]=(POP_ART|WATERCOLOR|GEKIGA)/g)].map(match => ({ name: match[1], style: match[2] }));

const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
try {
  const panel = await server.ssrLoadModule('/src/lib/panel-utils.js');
  const native = await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const qa = await server.ssrLoadModule('/src/lib/image-quality-qa.js');
  const { buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js');
  const { buildGeminiImageApiPrompt } = await server.ssrLoadModule('/src/lib/gemini-image-references.js');
  const { appendOpenAIWebReferencePrompt } = await server.ssrLoadModule('/src/lib/openai-image-references.js');

  test('resolved visible roster binds every named actor to its assigned color medium', () => {
    for (const style of special) for (const compact of [false, true]) for (let count = 1; count <= 5; count++) {
      const fixture = bindingFixture(count);
      const text = `[EMOTION: ${style}]\n[Camera: ${fixture.camera}]\n状況: ${fixture.action}\nユウ「このまま運ぼう。」`;
      const rule = panel.extractCastLimitRule(text, fixture.castList, { compact, colorMode: 'color' });
      assert.deepEqual(bindingsFrom(rule), namesFrom(rule).map(name => ({ name, style })));
      assert.equal(bindingsFrom(rule).length, count);
      assert.match(rule, /Preserve scripted crops, hidden faces and expressive depth/);
      assert.deepEqual(qa.extractPanelCastContracts(`## Panel 1\n${rule}`)[0].names, namesFrom(rule));
    }
  });

  test('offscreen voices/targets stay absent while silent, rear, partial and guest actors remain bound', () => {
    const cast = '## 甲\n## 乙\n## 丙';
    const cases = [
      { text: '[Camera: 甲と乙を俯瞰、画面外の丙へ視線]\n状況: 甲と乙が笑う。\nセリフなし', names: ['乙', '甲'] },
      { text: '[Camera: 乙を俯瞰]\n状況: 乙が立つ。甲は画面外にいる。\n甲「そのままで。」', names: ['乙'], offscreen: true },
      { text: '[Camera: 甲の肩越し、顔は見せず、遠景の乙を俯瞰]\n状況: 丙の顔は画面外だが手は画面内に見える。', names: ['丙', '乙', '甲'] },
      { text: '状況: 甲と客員が箱を支える。\n客員「そのままで。」', names: ['客員', '甲'] },
      { text: '状況: 全員が箱を支える。\nセリフなし', names: ['丙', '乙', '甲'] },
    ];
    for (const value of cases) {
      const text = '[EMOTION: WATERCOLOR]\n' + value.text;
      const rule = panel.extractCastLimitRule(text, cast, { compact: true, colorMode: 'color', storyText: text });
      assert.deepEqual(bindingsFrom(rule).map(item => item.name).sort(), value.names);
      assert.ok(bindingsFrom(rule).every(item => item.style === 'WATERCOLOR'));
      assert.match(rule, /hidden faces/);
      if (value.offscreen) {
        const dialogue = panel.extractDialogueOnly(text, cast, { forImagePrompt: true });
        assert.match(dialogue, /OFFSCREEN VOICE: B1=>\[甲\] frame_edge/);
        assert.doesNotMatch(dialogue, /B1=>\[甲\] mouth\/head/);
        assert.match(dialogue, /そのままで。/);
      }
    }
  });

  test('ordinary and native generated prompts retain bindings/QA/source through both transports without growth for 1–5 actors', () => {
    for (const kind of ['ordinary', 'native']) for (const providerFamily of ['chatgpt', 'gemini']) for (let count = 1; count <= 5; count++) {
      const fixture = bindingFixture(count, kind === 'native');
      const prompt = kind === 'ordinary'
        ? buildMangaPrompt({ ...fixture, providerFamily, promptMaxChars: 32000, punchlineType: 'Auto', cinematicTechniques: false })
        : (() => { const { plan, source } = bindingNativePlan(native, fixture); return native.buildExperimentalImagePrompt(plan, source, { colorMode: 'color', providerFamily, promptMaxChars: 32000 }); })();
      const key = `${kind}/${providerFamily}/${count}`;
      assert.ok(prompt.length <= baseline[key].chars, `${key}: ${prompt.length} > ${baseline[key].chars}`);
      assert.ok(Buffer.byteLength(prompt) <= baseline[key].bytes, `${key}: UTF-8 grew`);
      assert.equal(hash(restoreReviewedActorBindings(prompt)), baseline[key].sha256, `${key}: only the reviewed binding/duplicate-prose change is permitted`);
      const split = value => kind === 'ordinary'
        ? value.split(/^## Panel \d+\s*$/m).slice(1)
        : value.split(/\[PAGE FRAME P\d+ \|/).slice(1).map(frame => frame.split('[END PAGE FRAME')[0]);
      const transports = [prompt, appendOpenAIWebReferencePrompt(prompt, []), buildGeminiImageApiPrompt(prompt, [])];
      for (const transported of transports) {
        const frames = split(transported);
        assert.equal(frames.length, kind === 'ordinary' ? 4 : 6);
        for (const [index, frame] of frames.entries()) {
          const style = bindingStyles[index];
          assert.ok(frame.includes(fixture.camera), 'Camera remains literal');
          assert.ok(frame.includes(fixture.action), 'Action/expression remains literal');
          assert.deepEqual(bindingsFrom(frame), special.includes(style) ? namesFrom(frame).map(name => ({ name, style })) : []);
          if (index < frames.length - 1) assert.ok(frame.includes('このまま運ぼう。'));
          else assert.doesNotMatch(frame, /B1="/);
        }
      }
      assert.match(prompt, /all|全可視人物|全人物|前景・人物・小物・背景すべて/i);
      assert.match(prompt, /never force turns or close-ups to expose a face|hidden faces|隠れた顔/);
      assert.match(prompt, /scripted.*crop|切取り|cutting|切抜き/i);
    }
  });

  test('unnamed background crowds retain medium coverage without invented named bindings', () => {
    const fixture = bindingFixture(1);
    const scenario = fixture.scenario.replaceAll(fixture.action, 'ユウが箱を持つ。背景には群衆がいる。');
    const prompt = buildMangaPrompt({ ...fixture, scenario, providerFamily: 'chatgpt', promptMaxChars: 32000, punchlineType: 'Auto', cinematicTechniques: false });
    const frames = prompt.split(/^## Panel \d+\s*$/m).slice(1);
    for (let index = 1; index < 4; index++) {
      assert.deepEqual(bindingsFrom(frames[index]), [{ name: 'ユウ', style: bindingStyles[index] }]);
      assert.match(frames[index], /background|背景/);
      assert.match(frames[index], /(?:ALL|全)(?:可視)?人物|faces\/hair\/clothes|顔\/髪\/服\/小物\/背景|全人物を劇画化/);
    }
  });

  test('reference-fixed color stays byte-identical; revised monochrome preserves script and excludes color bindings', () => {
    for (const providerFamily of ['chatgpt', 'gemini']) for (const colorMode of ['color', 'monochrome']) for (const punchlineType of ['Auto', 'SeriousDocumentary']) {
      if (colorMode === 'color' && punchlineType === 'Auto') continue;
      const fixture = bindingFixture(2, false, colorMode);
      const prompt = buildMangaPrompt({ ...fixture, providerFamily, promptMaxChars: 32000, punchlineType, cinematicTechniques: false });
      if (colorMode === 'color') assert.equal(hash(prompt), baseline[`excluded/${providerFamily}/${colorMode}/${punchlineType}`].sha256);
      else {
        assert.match(prompt, /TONE PLACEMENT:.*lit light skin.*paper white/);
        assert.ok(prompt.includes(fixture.camera));
        assert.ok(prompt.includes(fixture.action));
        assert.ok(prompt.includes('このまま運ぼう。'));
      }
      assert.doesNotMatch(prompt, /\]=(?:POP_ART|WATERCOLOR|GEKIGA)/);
    }
    for (const style of ['NORMAL', 'SKETCH', 'CHIBI_GAG']) {
      const fixture = bindingFixture(2);
      const text = `[EMOTION: ${style}]\n状況: ${fixture.action}`;
      assert.equal(panel.extractCastLimitRule(text, fixture.castList, { compact: true, colorMode: 'color' }), panel.extractCastLimitRule(text, fixture.castList, { compact: true }));
    }
  });

  test('binding inverse rejects unknown style/construction changes and preserves authored fields', () => {
    const fixture = bindingFixture(2);
    const prompt = buildMangaPrompt({ ...fixture, providerFamily: 'chatgpt', promptMaxChars: 32000, punchlineType: 'Auto', cinematicTechniques: false });
    const restored = restoreReviewedActorBindings(prompt);
    const actorLine = prompt.split('\n').find(line => line.startsWith('ACTOR MEDIUM:'));
    const rosterLine = prompt.split('\n').find(line => line.startsWith('CAST COUNT:') && line.includes('=POP_ART'));
    assert.ok(actorLine && rosterLine);
    for (const changed of [prompt.replace(actorLine, actorLine + ' UNAUTHORIZED'), prompt.replace(']=POP_ART', ']=GEKIGA'), prompt.replace(rosterLine, rosterLine + ' UNAUTHORIZED')]) {
      assert.notEqual(restoreReviewedActorBindings(changed), restored);
    }
    for (const field of ['Camera', 'Action', 'Dialogue']) {
      const authored = `\n${field}: ${actorLine}\n${field}: ${rosterLine}`;
      assert.ok(restoreReviewedActorBindings(prompt + authored).endsWith(authored));
    }
    assert.equal(restoreReviewedActorBindings(actorLine + '\n' + rosterLine), actorLine + '\n' + rosterLine, 'unscoped strings are not compiler contracts');
  });
} finally { await server.close(); }
