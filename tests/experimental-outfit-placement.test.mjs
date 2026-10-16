import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
try {
  const native = await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const castList = '## ユウ\n髪: black hair\n衣装: school uniform\n## ナギ\n髪: long hair\n衣装: sailor uniform';
  const styles = ['NORMAL', 'POP_ART', 'WATERCOLOR', 'GEKIGA', 'CHIBI_GAG'];
  const fixture = (context, local = '') => {
    const scenario = context + '\n' + styles.map((style, i) =>
      `[${i + 1}コマ目]\n[Camera: 左上から35度見下ろす中景。]\n[EMOTION: ${style}]\n${i === 2 && local ? local + '\n' : ''}状況: ユウとナギが箱を支える。\n${i === 4 ? 'セリフなし' : `ユウ「ナギ、手順${i + 1}だよ。」`}`
    ).join('\n');
    const source = native.readExperimentalSource({ enabled: true, scenario, castList, colorMode: 'color' });
    const plan = { count: 5, layout: 'two_columns', reason: '受け渡し', panels: source.panels.map(p => ({ sourcePanel: p.id, kind: 'anchor', camera: p.camera, action: 'ユウは箱を両手で持ち、ナギへ渡す。', dialogueIds: p.dialogueIds, breakout: null })) };
    return { source, plan };
  };
  const render = ({ source, plan }, options = {}) => native.buildExperimentalImagePrompt(plan, source, { colorMode: 'color', ...options });
  const prefix = 'SOURCE FACTS (not captions): preserve every condition. Context: ';
  const frames = prompt => prompt.split('[PAGE FRAME ').slice(1).map(frame => frame.split('[END PAGE FRAME')[0]);
  const assertOriginalFields = (prompt, source, plan) => {
    for (const [i, frame] of frames(prompt).entries()) {
      assert.ok(frame.includes(plan.panels[i].camera));
      assert.ok(frame.includes(plan.panels[i].action));
      assert.ok(frame.includes(`Style: ${styles[i]}`));
      for (const id of plan.panels[i].dialogueIds) assert.ok(frame.includes(JSON.stringify(source.dialogue[id].text)));
      if (i === 4) assert.match(frame, /Dialogue: SILENT/);
    }
  };

  test('native global Outfit is moved verbatim outside reference data and before frames, without changing source', () => {
    for (const newline of ['\n', '\r\n']) for (const line of ['Outfit: ユウは紺の上着、ナギは白いコート。', '  [Outfit： ユウは紺の上着、ナギは白いコート。]  ']) {
      const outfitLine = line.trimStart(); // Keep trailing spaces when the line is not last in the trimmed source.
      const other = ['## タイトル: 服の受け渡し', 'Location: 明るい室内', '備考: Outfit: ユウは紺の上着、ナギは白いコート。という説明も保持。'];
      for (const position of [0, 1, 3]) {
        const lines = [...other]; lines.splice(position, 0, outfitLine);
        const fixtureValue = fixture(lines.join(newline));
        const before = structuredClone(fixtureValue);
        const exactLine = fixtureValue.source.context.split(newline).find(value => value.startsWith('Outfit:') || value.startsWith('[Outfit：'));
        for (const providerFamily of ['chatgpt', 'gemini']) for (const promptMaxChars of [32000, 1]) {
          const prompt = render(fixtureValue, { providerFamily, promptMaxChars });
          const castEnd = prompt.indexOf('[END REFERENCE CAST DATA]');
          const firstFrame = prompt.indexOf('[PAGE FRAME P1 |');
          assert.ok(prompt.includes(`[END REFERENCE CAST DATA]\n${exactLine}${newline}`), 'global instruction belongs immediately after reference observations');
          assert.ok(prompt.indexOf(exactLine, castEnd) < firstFrame);
          assert.ok(prompt.includes(prefix + other.join(newline)), 'remaining context must retain its exact bytes and order');
          assert.equal(prompt.split(/\r?\n/).filter(value => value === exactLine).length, 1, 'the complete source Outfit line must not be duplicated');
          assertOriginalFields(prompt, fixtureValue.source, fixtureValue.plan);
          assert.equal(native.buildExperimentalWebCopy(prompt).join(''), prompt + '\n');
        }
        assert.deepEqual(fixtureValue, before, 'rendering must not mutate source/plan used by QA');
      }
    }
  });

  test('reference defaults and panel-only changes never become a global Outfit', () => {
    const local = '[Outfit: ユウはこのコマで上着を脱ぎ、雨具へ着替える。]';
    for (const header of ['', 'Outfit: default', 'Outfit: none', 'Outfit: キャラシート準拠']) {
      const context = ['## タイトル: 明示の着替え', header].filter(Boolean).join('\n');
      const value = fixture(context, local);
      const prompt = render(value);
      assert.ok(prompt.includes(prefix + value.source.context));
      assert.match(prompt, /school uniform/); assert.match(prompt, /sailor uniform/);
      assert.doesNotMatch(prompt.split('[END REFERENCE CAST DATA]')[1].split('[PAGE FRAME P1 |')[0], /Outfit/);
      for (const [i, frame] of frames(prompt).entries()) assert.equal(frame.includes('FRAME OUTFIT:'), i === 2);
      assert.match(frames(prompt)[2], /FRAME OUTFIT: ユウはこのコマで上着を脱ぎ、雨具へ着替える。/);
      assertOriginalFields(prompt, value.source, value.plan);
    }
  });

  test('named partial global scope keeps unassigned reference clothes and local changes retain priority', () => {
    const local = '[Outfit: ユウはこのコマで茶色の上着へ着替える。]';
    for (const global of ['ユウは紺の上着。', 'ユウは紺の上着、ナギは白いコート。', '作業着']) {
      const line = `Outfit: ${global}`;
      const value = fixture('## タイトル: 別の衣装\n' + line, local);
      const prompt = render(value);
      assert.ok(prompt.includes('[END REFERENCE CAST DATA]\n' + line + '\n'));
      if (global === 'ユウは紺の上着。') assert.match(prompt, /sailor uniform/);
      else assert.doesNotMatch(prompt, /school uniform|sailor uniform/);
      assert.match(prompt, /OUTFIT SCOPE:/);
      assert.equal(frames(prompt).filter(frame => frame.includes('FRAME OUTFIT:')).length, 1);
      assertOriginalFields(prompt, value.source, value.plan);
    }
  });

  test('a sole global Outfit line remains effective without a duplicate empty source context', () => {
    const line = 'Outfit: default-inspired jacket';
    const value = fixture(line);
    const prompt = render(value);
    assert.ok(prompt.includes('[END REFERENCE CAST DATA]\n' + line + '\n'));
    assert.equal(prompt.split(line).length - 1, 1);
    assert.ok(!prompt.includes(prefix), 'empty remaining context has no source facts to print');
    assert.equal(value.source.context, line);
  });
} finally { await server.close(); }
