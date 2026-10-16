import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';
import { EMOTION_STYLES, COMPACT_EMOTION_STYLES } from '../src/lib/constants.js';
import { restoreReviewedChibiWardrobe } from './helpers/prompt-policy-normalization.mjs';

const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
try {
  const panel = await server.ssrLoadModule('/src/lib/panel-utils.js');
  const native = await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const { buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js');
  const { buildGeminiImageApiPrompt } = await server.ssrLoadModule('/src/lib/gemini-image-references.js');
  const { appendOpenAIWebReferencePrompt } = await server.ssrLoadModule('/src/lib/openai-image-references.js');
  const { ensureWebPromptTrailingNewline, splitWebPromptForPaste } = await server.ssrLoadModule('/src/lib/web-prompt-chunks.js');
  const styles = ['NORMAL', 'POP_ART', 'WATERCOLOR', 'GEKIGA', 'SKETCH', 'CHIBI_GAG'];
  const transformed = ['POP_ART', 'WATERCOLOR', 'GEKIGA'];
  const castList = '## ユウ\n[WEIGHTS]: (large round eyes:1.3), (dark skin:1.4), (young adult:1.2), (black hair:1.4)\n識別点: 左頬に小さなほくろ。\n## ナギ\n[WEIGHTS]: (long nose:1.2), (blonde hair:1.4), (glasses:1.3)\n識別点: 左右で眉の高さが違う。';
  const count = (text, value) => text.split(value).length - 1;
  const frames = prompt => prompt.split('[PAGE FRAME ').slice(1).map(frame => frame.split('[END PAGE FRAME')[0]);
  const actorInstruction = (style, colorMode) => {
    assert.equal(typeof panel.buildActorMediumInstruction, 'function', 'shared actor-medium instruction must exist at the compilation boundary');
    return panel.buildActorMediumInstruction(style, colorMode);
  };
  const fixture = (selectedStyles, colorMode = 'color') => {
    const scenario = '## タイトル: 二人の手順\n' + selectedStyles.map((style, index) =>
      `[${index + 1}コマ目]\n[EMOTION: ${style}]\n[Camera: ${index % 2 ? '右下から25度見上げる広角。' : '左上から45度見下ろす望遠。'}]\n状況: ユウとナギが箱${index + 1}を支える。\n${index === selectedStyles.length - 1 ? 'セリフなし' : `ユウ「ナギ、手順${index + 1}だよ。」`}`
    ).join('\n');
    const input = { enabled: true, scenarioMode: 'experimental-manga', scenario, castList, colorMode };
    const source = native.readExperimentalSource(input);
    const plan = { count: selectedStyles.length, layout: 'two_columns', reason: '二人の動作を追う', panels: source.panels.map((p, index) => ({
      sourcePanel: p.id, kind: 'anchor', camera: p.camera, action: `ユウの左手とナギの右手で箱${index + 1}を支える。二人は穏やかに笑う。`, dialogueIds: p.dialogueIds, breakout: null,
    })) };
    return { input, source, plan };
  };

  const assertChibiWardrobe = recipe => {
    assert.match(recipe, /適用Outfit優先、未指定は継続\/参照服/);
    assert.match(recipe, /服種\/色\/重ね着.*ちび化で変えず/);
    assert.match(recipe, /明示(?:の)?着替えは反映/);
    assert.match(recipe, /服の描法.*しわ.*画風.*動作/);
    assert.match(recipe, /Camera\/Action.*演技.*視線.*髪\/眼鏡.*透視/);
    assert.match(recipe, /可愛さ目的のズーム禁止/);
  };

  test('chibi wardrobe continuity replaces existing recipes without increasing either size', () => {
    for (const [recipe, limit] of [[EMOTION_STYLES.CHIBI_GAG.style, 397], [COMPACT_EMOTION_STYLES.CHIBI_GAG, 231]]) {
      assertChibiWardrobe(recipe);
      assert.ok(recipe.length <= limit, `${recipe.length} > the previous ${limit} characters`);
      assert.match(recipe, /大(?:きな)?頭.*短い胴.*関節ある手足/);
      assert.match(recipe, /不透明な塗り.*明示された淡色指定は優先/);
    }
    assert.match(EMOTION_STYLES.CHIBI_GAG.proportions, /Explicit user proportions win/);
    for (const providerFamily of ['chatgpt', 'gemini']) {
      const locked = panel.buildEmotionBlock('[EMOTION: CHIBI_GAG]', 'color', { providerFamily, preserveReferenceStyle: true });
      assert.doesNotMatch(locked, /ちび化|服種\/色\/重ね着/);
      assert.match(locked, /no panel-specific art-style or proportion change/);
    }
  });

  test('chibi wardrobe normalization only inverts the reviewed complete style line', () => {
    for (const recipe of [EMOTION_STYLES.CHIBI_GAG.style, COMPACT_EMOTION_STYLES.CHIBI_GAG]) {
      const scope = 'PANEL STYLE LOCK: CHIBI_GAG;\n';
      const line = `Style: ${recipe}`;
      const restored = restoreReviewedChibiWardrobe(scope + line);
      assert.notEqual(restored, scope + line);
      assert.match(restored, /enlarged heads.*shortened torsos and jointed limbs/);
      for (const changed of [line + ' UNAUTHORIZED', line.replace('変えず', '変える'),
        `Camera: ${recipe}`, `Action (visual only): ${recipe}`, `Dialogue: "${recipe}"`]) {
        assert.equal(restoreReviewedChibiWardrobe(scope + changed), scope + changed);
      }
      assert.equal(restoreReviewedChibiWardrobe(line), line, 'an unscoped user style line is not compiler-owned');
      assert.equal(restoreReviewedChibiWardrobe(scope.replace('CHIBI_GAG', 'NORMAL') + line), scope.replace('CHIBI_GAG', 'NORMAL') + line);
      const authored = '\nCamera: 35度\nAction: 4頭身で踊る\nDialogue: "その服で。"';
      assert.equal(restoreReviewedChibiWardrobe(scope + line + authored), restored + authored);
    }
  });

  test('chibi wardrobe recipes retain explicit outfits, reference clothing and authored changes through real prompt assembly', () => {
    const camera = '左上から35度見下ろす広角。軽いダッチ5度。';
    const action = 'ユウは4頭身のちび姿で片膝をつき、ナギへ箱を渡して笑う。ナギは肩越しに振り向く。';
    const speech = 'ナギ、そのまま受け取って。';
    const referenceCast = '## ユウ\n短髪、青いシャツの上に白い上着、眼鏡。\n## ナギ\n長髪、赤いワンピース。';
    const cases = [
      { global: 'Outfit: ユウは黒いベストと黄色いシャツ、ナギは緑のコート。', local: '' },
      { global: '', local: '' },
      { global: 'Outfit: ユウは黒いベストと黄色いシャツ、ナギは緑のコート。', local: 'Outfit: ユウはこのコマでベストを脱いで茶色い上着へ着替える。' },
    ];
    for (const item of cases) {
      const scenarioFor = count => [item.global, ...Array.from({ length: count }, (_, index) =>
        `[${index + 1}コマ目]\n[EMOTION: ${index === count - 1 ? 'CHIBI_GAG' : 'NORMAL'}]\n[Camera: ${camera}]\n${index === count - 1 && item.local ? item.local + '\n' : ''}状況: ${action}\nユウ「${speech}」`
      )].filter(Boolean).join('\n');
      const assertSource = prompt => {
        assert.ok(prompt.includes(camera));
        assert.ok(prompt.includes(action));
        assert.ok(prompt.includes(speech));
        if (item.global) assert.ok(prompt.includes(item.global.slice('Outfit: '.length)));
        else assert.ok(prompt.includes('青いシャツ'), 'reference clothing remains available when no Outfit is authored');
        if (item.local) assert.ok(prompt.includes(item.local.slice('Outfit: '.length)), 'explicit costume change remains executable');
        assertChibiWardrobe(prompt.match(/^(?:Style: |FRAME MEDIUM P\d+ — CHIBI_GAG: ).*服種\/色\/重ね着.*$/m)?.[0] || '');
      };
      for (const providerFamily of ['chatgpt', 'gemini']) {
        const prompt = buildMangaPrompt({ scenario: scenarioFor(4), castList: referenceCast, colorMode: 'color', providerFamily,
          punchlineType: 'Auto', cinematicTechniques: false, promptMaxChars: 32000, showWatermarks: false });
        assertSource(prompt);
        assert.match(prompt, /Explicit user proportions win/);
      }
      const input = { enabled: true, scenario: scenarioFor(5), castList: referenceCast, colorMode: 'color' };
      const source = native.readExperimentalSource(input);
      const plan = { count: 5, layout: 'two_columns', reason: '二人の受け渡し', panels: source.panels.map(p => ({
        sourcePanel: p.id, kind: 'anchor', camera: p.camera, action, dialogueIds: p.dialogueIds, breakout: null,
      })) };
      for (const promptMaxChars of [32000, 1]) {
        const prompt = native.buildExperimentalImagePrompt(plan, source, { ...input, promptMaxChars });
        assertSource(prompt);
        assert.equal(source.scenario, input.scenario);
        assert.ok(frames(prompt).at(-1).includes(COMPACT_EMOTION_STYLES.CHIBI_GAG));
      }
    }
  });

  test('actor-medium construction is explicit only for the three affected media', () => {
    for (const colorMode of ['color', 'monochrome']) {
      for (const style of transformed) {
        const instruction = actorInstruction(style, colorMode);
        assert.match(instruction, /^ACTOR MEDIUM\b/);
        assert.match(instruction, /face|顔/i, 'actor construction must include the face, not only scenery');
        const block = panel.buildEmotionBlock(`[EMOTION: ${style}]`, colorMode);
        assert.ok(block.includes(instruction));
        assert.match(block, new RegExp(`PANEL STYLE LOCK: ${style}[;:]`), 'the construction remains inside its selected panel medium');
      }
      for (const style of ['NORMAL', 'SKETCH', 'CHIBI_GAG', 'UNKNOWN', '']) {
        assert.equal(actorInstruction(style, colorMode), '', `${style || 'empty'} keeps its existing rendering`);
      }
    }
  });

  test('ordinary panel compilation shares actor construction without overriding reference locks or unaffected media', () => {
    for (const colorMode of ['color', 'monochrome']) for (const providerFamily of ['chatgpt', 'gemini']) {
      for (const style of styles) {
        const text = `[EMOTION: ${style}]\n[Camera: 左後ろから45度俯瞰]\n状況: ユウが横顔で静かに笑う。\nユウ「ナギ、こちらだよ。」`;
        const block = panel.buildEmotionBlock(text, colorMode, { providerFamily });
        const instruction = actorInstruction(style, colorMode);
        if (instruction) assert.equal(count(block, instruction), 1);
        else assert.doesNotMatch(block, /ACTOR MEDIUM\b/);
        const locked = panel.buildEmotionBlock(text, colorMode, { providerFamily, preserveReferenceStyle: true });
        assert.match(locked, /REFERENCE-SHEET PANEL ACTING ONLY/);
        assert.doesNotMatch(locked, /ACTOR MEDIUM\b/);
      }
    }
  });

  test('native source identity data precedes the frames and retains legitimate facial traits verbatim', () => {
    const { input, source, plan } = fixture(styles);
    const prompt = native.buildExperimentalImagePrompt(plan, source, input);
    const end = prompt.indexOf('[END REFERENCE CAST DATA]');
    assert.ok(end >= 0, 'reference baseline requires an explicit non-instruction data boundary');
    assert.ok(end < prompt.indexOf('[PAGE FRAME P1 |'), 'global reference drawing descriptions must not override later frame recipes');
    const unchanged = panel.cleanCastList(castList, '');
    assert.equal(count(prompt, unchanged), 1, 'retain every authored reference trait without heuristic deletion');
    assert.ok(prompt.indexOf(unchanged) < end);
    for (const trait of ['large round eyes', 'dark skin', 'young adult', 'long nose', '左頬に小さなほくろ', '左右で眉の高さが違う']) {
      assert.ok(prompt.slice(0, end).includes(trait), trait);
    }
    assert.doesNotMatch(prompt.slice(end + '[END REFERENCE CAST DATA]'.length), /^CAST:/m);
  });

  for (const colorMode of ['color', 'monochrome']) for (const providerFamily of ['chatgpt', 'gemini']) {
    test(`four-panel ${providerFamily} / ${colorMode}: complete compiler and Web/Gemini transfer preserve local actor construction under budget pressure`, () => {
      for (const selectedStyles of [['POP_ART', 'WATERCOLOR', 'GEKIGA', 'NORMAL'], ['NORMAL', 'SKETCH', 'CHIBI_GAG', 'NORMAL']]) {
        const cameras = ['左上から45度見下ろす望遠', '右下から25度見上げる広角', '左後方の肩越しに35度見下ろす', '床近くから30度見上げるダッチアングル'];
        const actions = selectedStyles.map((_, index) => `ユウとナギが箱${index + 1}を支える。ユウは静かに笑い、ナギは箱へ視線を向ける。`);
        const speech = selectedStyles.map((_, index) => `ナギ、手順${index + 1}だよ。`);
        const scenario = '## タイトル: 箱を運ぶ二人\n' + selectedStyles.map((style, index) =>
          `[${index + 1}コマ目]\n[EMOTION: ${style}]\n[Camera: ${cameras[index]}]\n状況: ${actions[index]}\nユウ「${speech[index]}」`
        ).join('\n');
        for (const pressure of [false, true]) {
          // Gemini retains its complete compiler output; ChatGPT exercises the
          // ordinary soft-budget compactor and a larger source-data payload.
          const options = { scenario, castList: castList + (pressure ? '\n資料メモ: ' + '識別用の細部を参照する。'.repeat(180) : ''),
            colorMode, providerFamily, punchlineType: 'Auto', showWatermarks: false, mosaicCopyrightedCharacters: false,
            cinematicTechniques: false, promptMaxChars: 24000 };
          const api = buildMangaPrompt(options);
          if (providerFamily === 'chatgpt') assert.ok(api.length <= options.promptMaxChars);
          if (colorMode === 'color' && providerFamily === 'chatgpt' && pressure) {
            assert.match(api, /^PANEL STYLE LOCK: [^;\n]+;$/m, 'budget pressure exercises the shortened panel instruction form');
          }
          if (colorMode === 'color' && providerFamily === 'gemini') {
            assert.match(api, /^PANEL STYLE LOCK: [^;\n]+; use the selected style recipe below;/m, 'Gemini exercises the complete panel instruction form');
          }
          const web = splitWebPromptForPaste(ensureWebPromptTrailingNewline(appendOpenAIWebReferencePrompt(api, { rolePrompt: '' }))).join('');
          assert.equal(web, api + '\n');
          const gemini = buildGeminiImageApiPrompt(web, { rolePrompt: '' });
          for (const [transport, prompt] of [['API', api], ['Web', web], ['Gemini', gemini]]) {
            const rendered = prompt.split(/^## Panel \d+\s*$/m).slice(1);
            assert.equal(rendered.length, 4);
            for (const [index, frame] of rendered.entries()) {
              const instruction = actorInstruction(selectedStyles[index], colorMode);
              if (instruction) {
                assert.equal(count(frame, instruction), 1, `${transport} ${selectedStyles[index]} construction survives the real compiler`);
                assert.ok(frame.indexOf(instruction) < frame.search(/^Action(?:[: (])/m), 'actor construction stays inside its panel before acting content');
              } else assert.doesNotMatch(frame, /ACTOR MEDIUM\b/);
              for (const other of transformed.filter(style => style !== selectedStyles[index])) {
                assert.ok(!frame.includes(actorInstruction(other, colorMode)), `${transport} cannot leak ${other} into P${index + 1}`);
              }
              assert.ok(frame.includes(cameras[index]));
              assert.ok(frame.includes(actions[index]));
              const pattern = transport === 'Gemini' ? /Inside it, print exactly ("(?:\\.|[^"\\])*") vertically in Japanese\./g : /\bB\d+=("(?:\\.|[^"\\])*")/g;
              // The fourth section can be followed by a global dialogue audit;
              // inspect this panel's own dialogue instruction, not that audit.
              const dialogueLine = frame.split('\n').find(line => transport === 'Gemini'
                ? line.startsWith('Place the first white speech balloon ')
                : /^Dialogue\b/.test(line));
              assert.ok(dialogueLine, `${transport} keeps a panel-local dialogue instruction`);
              assert.deepEqual([...dialogueLine.matchAll(pattern)].map(match => JSON.parse(match[1])), [speech[index]]);
            }
          }
          const locked = buildMangaPrompt({ ...options, punchlineType: 'SeriousDocumentary', promptMaxChars: 32000 });
          assert.doesNotMatch(locked, /ACTOR MEDIUM\b/, 'reference-locked assembly never acquires the new face/style override');
          assert.match(locked, /REFERENCE-SHEET/);
        }
      }
    });
  }

  const cases = ['color', 'monochrome'].flatMap(colorMode => [false, true].map(forceCompact => ({
    name: `six media / ${colorMode} / ${forceCompact ? 'forced compact' : 'default budget'}`,
    selectedStyles: styles, colorMode, forceCompact,
  })));
  cases.push({ name: 'short five-panel full renderer', selectedStyles: ['POP_ART', 'NORMAL', 'NORMAL', 'NORMAL', 'NORMAL'], colorMode: 'color', forceCompact: false, requireFull: true });

  for (const item of cases) test(`${item.name}: native API, Web and Gemini preserve actor media and scene content`, () => {
    const { input, source, plan } = fixture(item.selectedStyles, item.colorMode);
    const api = native.buildExperimentalImagePrompt(plan, source, { ...input, ...(item.forceCompact ? { promptMaxChars: 1 } : {}) });
    if (item.requireFull) assert.match(api, /Inside this frame — Camera:/, 'the small fixture exercises the reachable full renderer');
    if (item.forceCompact) assert.doesNotMatch(api, /Inside this frame — Camera:/);
    const web = native.buildExperimentalWebCopy(api).join('');
    assert.equal(web, api + '\n');
    const gemini = buildGeminiImageApiPrompt(web, { rolePrompt: '' });
    for (const [transport, prompt] of [['API', api], ['Web', web], ['Gemini', gemini]]) {
      const rendered = frames(prompt);
      assert.equal(rendered.length, item.selectedStyles.length);
      for (const [index, frame] of rendered.entries()) {
        const style = item.selectedStyles[index];
        const instruction = actorInstruction(style, item.colorMode);
        if (instruction) assert.equal(count(frame, instruction), 1, `${transport} P${index + 1} receives one local construction instruction`);
        else assert.doesNotMatch(frame, /ACTOR MEDIUM\b/, `${transport} ${style} has no new drawing override`);
        for (const other of transformed.filter(value => value !== style)) {
          assert.ok(!frame.includes(actorInstruction(other, item.colorMode)), `${transport} P${index + 1} cannot inherit ${other}`);
        }
        assert.ok(frame.includes(plan.panels[index].camera), 'camera strength and side remain exact');
        assert.ok(frame.includes(plan.panels[index].action), 'calm acting and hand ownership remain exact');
        if (index === rendered.length - 1) {
          assert.match(frame, /Dialogue: SILENT/);
          assert.doesNotMatch(frame, /TEXT \(PRINT VALUES ONLY\)|Inside it, print exactly/);
        } else {
          const expected = source.panels[index].dialogueIds.map(id => source.dialogue[id].text);
          const pattern = transport === 'Gemini' ? /Inside it, print exactly ("(?:\\.|[^"\\])*") vertically in Japanese\./g : /\bB\d+=("(?:\\.|[^"\\])*")/g;
          assert.deepEqual([...frame.matchAll(pattern)].map(match => JSON.parse(match[1])), expected);
          for (const speech of expected) assert.equal(count(prompt, JSON.stringify(speech)), 1, 'a genuine name inside speech remains printed once');
        }
      }
    }
  });

  test('Japanese style metadata survives native preparation without becoming speech in silent panels', async () => {
    const spoken = ['ナギ、どうぞ。', '飛んでけー！', '来たっ！', 'ぴたりじゃん！'];
    const cameras = styles.map((_, index) => index % 2 ? '右下から25度見上げる広角。' : '左上から45度見下ろす望遠。');
    const actions = styles.map((_, index) => `ユウとナギが紙飛行機の手順${index + 1}を進める。`);
    const spellings = [style => `[画風: ${style}]`, style => `[画風：${style}]`, style => `  [ 画風 ： ${style} ]  `, style => `\t[ 画風 :  ${style} ]\t`];
    for (const styleTag of spellings) {
      const blocks = styles.map((style, index) => `[${index + 1}コマ目]\n${styleTag(style)}\n[Camera: ${cameras[index]}]\n状況: ${actions[index]}\n${index < spoken.length ? `ユウ「${spoken[index]}」` : 'セリフなし'}`);
      const input = { enabled: true, scenarioMode: 'experimental-manga', scenario: '## タイトル: 手渡す一機\n' + blocks.join('\n'), castList, colorMode: 'color' };
      for (const [index, block] of blocks.entries()) {
        assert.equal(panel.extractEmotionStyle(block), styles[index], 'the Japanese structural style label selects its actual medium');
        const entries = panel.extractDialogueOnly(block, castList, { forImagePrompt: true, asEntries: true });
        assert.deepEqual(entries.map(entry => entry.text), index < spoken.length ? [spoken[index]] : []);
        const action = panel.extractActionOnly(block, castList);
        assert.ok(action.includes(actions[index]));
        assert.ok(!action.includes(styleTag(styles[index]).trim()), 'structural style metadata is not a visible action or speaker');
      }
      const source = native.readExperimentalSource(input);
      assert.deepEqual(source.panels.map(p => p.style), styles);
      assert.deepEqual(source.dialogue.map(line => line.text), spoken);
      assert.deepEqual(source.panels.slice(4).map(p => p.dialogueIds), [[], []]);
      const plan = { count: 6, layout: 'two_columns', reason: '紙飛行機の受け渡しを順に追う', panels: source.panels.map((p, index) => ({
        sourcePanel: p.id, kind: 'anchor', camera: p.camera, action: actions[index], dialogueIds: p.dialogueIds,
        visualEffects: index >= 4 ? ['silent_pause'] : [], breakout: null,
      })) };
      let calls = 0;
      const prepared = await native.prepareExperimentalManga(input, async () => { calls++; return JSON.stringify(plan); });
      assert.equal(calls, 1, 'valid style aliases require only the normal plan call, with no repair request');
      assert.equal(prepared.source.scenario, input.scenario, 'normalization must not rewrite authored input');
      assert.deepEqual(prepared.source.dialogue.map(line => line.text), spoken);
      const rendered = frames(prepared.prompt);
      assert.equal(rendered.length, 6);
      for (const [index, frame] of rendered.entries()) {
        assert.match(frame, new RegExp(`FRAME MEDIUM P${index + 1} — ${styles[index]}:`));
        assert.ok(frame.includes(cameras[index]));
        assert.ok(frame.includes(actions[index]));
        const dialogueLine = frame.split('\n').find(line => line.startsWith('Dialogue:'));
        if (index >= 4) assert.equal(dialogueLine, 'Dialogue: SILENT');
        else assert.deepEqual([...dialogueLine.matchAll(/\bB\d+=("(?:\\.|[^"\\])*")/g)].map(match => JSON.parse(match[1])), [spoken[index]]);
      }
      assert.equal((prepared.prompt.match(/\bB\d+=("(?:\\.|[^"\\])*")/g) || []).length, 4, 'only the four authored utterances print');
    }
  });

  test('style metadata normalization preserves line endings and multiline quoted content', () => {
    const quote = 'ユウ「表示は\r\n[画風: POP_ART]\r\nだったよ。」';
    const input = quote + '\r\n  [ 画風 ： WATERCOLOR ]  \r\n状況: 微笑む。';
    const normalized = panel.normalizePanelStyleTags(input);
    assert.equal(normalized, quote + '\r\n[EMOTION: WATERCOLOR]\r\n状況: 微笑む。');
    assert.equal(panel.normalizePanelStyleTags(normalized), normalized);
    assert.equal(panel.extractEmotionStyle(input), 'WATERCOLOR');
    const nested = 'ユウ「表示の「設定」を読んだ。\n[画風: POP_ART]\nと続くよ。」';
    assert.equal(panel.normalizePanelStyleTags(nested), nested);
    assert.equal(panel.extractEmotionStyle(nested), 'NORMAL');
  });

  test('a style-shaped token inside genuine speech remains dialogue, including names and vocatives', () => {
    const literal = '[画風: POP_ART]と書いたよ。ナギ、見て。';
    const fullwidthLiteral = 'ナギ、[ 画風 ： GEKIGA ]という表示もあるね。';
    for (const speech of [literal, fullwidthLiteral]) {
      const speaking = `ユウ「${speech}」\n状況: ユウがナギへ微笑む。`;
      assert.equal(panel.extractEmotionStyle(speaking), 'NORMAL', 'quoted style-looking text is not structural metadata');
      assert.deepEqual(panel.extractDialogueOnly(speaking, castList, { forImagePrompt: true, asEntries: true }).map(entry => entry.text), [speech]);
      // Put real metadata after the quoted token to expose unanchored regexes.
      const selected = speaking + '\n[画風： WATERCOLOR]';
      assert.equal(panel.extractEmotionStyle(selected), 'WATERCOLOR');
      assert.deepEqual(panel.extractDialogueOnly(selected, castList, { forImagePrompt: true, asEntries: true }).map(entry => entry.text), [speech]);
      const action = panel.extractActionOnly(selected, castList);
      assert.ok(action.includes('ユウがナギへ微笑む。'));
      assert.ok(!action.includes('[画風： WATERCOLOR]'));
    }
  });
} finally {
  await server.close();
}
