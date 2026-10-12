import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
try {
  const m = await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const styles = ['NORMAL', 'WATERCOLOR', 'POP_ART', 'GEKIGA'];
  const castList = '## ユウ\n[WEIGHTS]: (black hair:1.4)\n## ナギ\n[WEIGHTS]: (blonde hair:1.4)';
  const makeInput = side => ({
    enabled: true, castList, colorMode: 'color',
    scenario: '## タイトル: 手をつなぐ順番\nLocation: 明るい作業室\n' + styles.map((style, i) =>
      `[${i + 1}コマ目]\n[Camera: ${i % 2 ? '床から強く見上げる広角' : '頭上から強く見下ろす俯瞰'}]\n[EMOTION: ${style}]\n`
      + `状況: ユウとナギが箱を運ぶ。事実${i + 1}: ユウは${side}側の取っ手を持ち、ナギは反対側で支える。\n`
      + `ユウ「${i + 1}番目は、こちらから！」\nナギ「はい、動作${i + 1}を続けます。」`).join('\n'),
  });
  const input = makeInput('右');
  const source = m.readExperimentalSource(input);
  const makePlan = (count, layout, src = source) => ({
    count, layout, reason: '箱の受け渡しに必要な動作と反応を展開する', pageIntent: '両者の力の連携を見せる',
    panels: src.panels.flatMap((p, index) => {
      const anchor = { sourcePanel: index + 1, kind: 'anchor', camera: p.camera,
        action: `ユウとナギが箱を運ぶ。実動作${index + 1}: 右手で取っ手を引き、左手で底を支える。`,
        dialogueIds: [...p.dialogueIds], visualEffects: [], breakout: null };
      const insert = { ...anchor, kind: 'insert', camera: '手元を床側から強く見上げる接写',
        action: `連携${index + 1}: ユウとナギの手が箱の傾きに合わせて動く。`, dialogueIds: [] };
      if (index >= count - 4) return [anchor];
      return index === 3 ? [insert, anchor] : [anchor, insert];
    }),
  });
  const occurrences = (text, fragment) => text.split(fragment).length - 1;
  const frames = prompt => [...prompt.matchAll(/\[PAGE FRAME P(\d+) \| ([^\]\n]+)\]\n([\s\S]*?)\n\[END PAGE FRAME P\1\]/g)]
    .map(match => ({ number: Number(match[1]), position: match[2], body: match[3], start: match.index, end: match.index + match[0].length }));
  const position = rect => `${rect.w === 1 ? 'FULL WIDTH' : rect.x === 0 ? 'LEFT' : 'RIGHT'}, top=${Math.round(rect.y * 100)}%, bottom=${Math.round((rect.y + rect.h) * 100)}% of comic area`;

  for (const count of [5, 6, 7, 8]) for (const { id: layout } of m.experimentalLayoutOptions(count)) {
    test(`experimental ${count}/${layout} binds each physical frame to its exact camera, style, action and ordered speech`, () => {
      const plan = makePlan(count, layout);
      const validated = m.validateExperimentalPlan(plan, source);
      const prompt = m.buildExperimentalImagePrompt(plan, source, input);
      const blocks = frames(prompt);
      assert.equal(blocks.length, count, 'each requested frame needs one independent spatial block');
      assert.deepEqual(blocks.map(block => block.number), Array.from({ length: count }, (_, i) => i + 1));
      const rects = m.experimentalLayout(count, layout);
      blocks.forEach((block, index) => {
        const panel = plan.panels[index];
        assert.equal(block.position, position(rects[index]) + (index === count - 1 ? ' | FINAL ENDING' : ''));
        assert.equal(occurrences(prompt, `[PAGE FRAME P${index + 1} | `), 1);
        assert.equal(occurrences(prompt, `[END PAGE FRAME P${index + 1}]`), 1);
        assert.ok(block.body.includes(`Inside this frame — Camera: ${panel.camera}; Style: ${source.panels[panel.sourcePanel - 1].style}; Action: ${panel.action}`));
        const expected = panel.dialogueIds.length ? panel.dialogueIds.map(id =>
          JSON.stringify(validated.expectedDialogue.find(line => line.id === id))).join('; ') : 'SILENT';
        assert.ok(block.body.includes(`Dialogue: ${expected}`), 'approved speech belongs inside its own physical frame');
        for (const line of validated.expectedDialogue) {
          assert.equal(block.body.includes(JSON.stringify(line)), panel.dialogueIds.includes(line.id), 'speech must not leak into another frame');
        }
      });
      for (const beat of source.panels) {
        const marker = `Source beat ${beat.id} (facts only, not a panel layout):`;
        const firstIndex = plan.panels.findIndex(panel => panel.sourcePanel === beat.id);
        const precedingEnd = firstIndex ? blocks[firstIndex - 1].end : 0;
        const factPosition = prompt.indexOf(marker);
        assert.equal(occurrences(prompt, marker), 1, 'each source beat is preserved once');
        assert.ok(factPosition >= precedingEnd && factPosition < blocks[firstIndex].start,
          'source facts must immediately precede their first physical frame, including an insert before the ending anchor');
        const preceding = prompt.slice(precedingEnd, blocks[firstIndex].start);
        assert.ok(preceding.includes(`事実${beat.id}: ユウは右側の取っ手を持ち、ナギは反対側で支える。`));
        assert.equal(occurrences(preceding, 'Source beat '), 1, 'unrelated source beats cannot collect before this frame');
      }
    });
  }

  test('left/right scene wording cannot change the compiled page slots', () => {
    const rightPlan = makePlan(7, 'tall_right_middle');
    const leftInput = makeInput('左');
    const leftSource = m.readExperimentalSource(leftInput);
    const leftPlan = makePlan(7, 'tall_right_middle', leftSource);
    leftPlan.panels.forEach(panel => { panel.action = panel.action.replace('右手', '左手').replace('左手で底', '右手で底'); });
    const rightPrompt = m.buildExperimentalImagePrompt(rightPlan, source, input);
    const leftPrompt = m.buildExperimentalImagePrompt(leftPlan, leftSource, leftInput);
    const right = frames(rightPrompt), left = frames(leftPrompt);
    assert.equal(right.length, 7); assert.equal(left.length, 7);
    assert.deepEqual(left.map(({ number, position: slot }) => [number, slot]), right.map(({ number, position: slot }) => [number, slot]));
    assert.ok(leftPrompt.includes('ユウは左側の取っ手を持ち'));
    assert.ok(rightPrompt.includes('ユウは右側の取っ手を持ち'));
  });

  test('approved added speech and purposeful silence remain valid inside spanning layouts', () => {
    const plan = makePlan(6, 'tall_right_top');
    plan.addedDialogue = [{ id: 'add:1', sourcePanel: 1, speaker: 'ナギ', text: 'この傾きなら、支えられる！', purpose: '受け渡しに応じる演技を具体化する' }];
    plan.panels[1].dialogueIds = ['add:1'];
    const validated = m.validateExperimentalPlan(plan, source);
    assert.equal(validated.count, 6);
    const blocks = frames(m.buildExperimentalImagePrompt(plan, source, input));
    assert.equal(blocks.length, 6);
    assert.equal(blocks[0].position, 'RIGHT, top=0%, bottom=52% of comic area');
    assert.ok(blocks[1].body.includes(JSON.stringify(validated.expectedDialogue.find(line => line.id === 'add:1'))));
    assert.ok(blocks[3].body.includes('Dialogue: SILENT'));
    assert.ok(blocks.at(-1).position.endsWith(' | FINAL ENDING'));
  });

  test('spatial compilation still rejects original dialogue reversal before emitting a prompt', () => {
    const plan = makePlan(5, 'hero_bottom');
    assert.doesNotThrow(() => m.validateExperimentalPlan(plan, source));
    plan.panels[0].dialogueIds.reverse();
    assert.throws(() => m.validateExperimentalPlan(plan, source), /元の台詞の順番/);
    assert.throws(() => m.buildExperimentalImagePrompt(plan, source, input), /元の台詞の順番/);
  });
} finally {
  await server.close();
}
