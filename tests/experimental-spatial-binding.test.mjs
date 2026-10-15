import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
try {
  const m = await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const {resolvePageWorkflow} = await server.ssrLoadModule('/src/lib/page-workflow.js');
  const {appendOpenAIWebReferencePrompt,appendOpenAIReferencePrompt,buildOpenAIReferencePlan}=await server.ssrLoadModule('/src/lib/openai-image-references.js');
  const styles = ['NORMAL', 'WATERCOLOR', 'POP_ART', 'GEKIGA'];
  const castList = '## ユウ\n[WEIGHTS]: (black hair:1.4)\n## ナギ\n[WEIGHTS]: (blonde hair:1.4)';
  const makeInput = (side, count = 7) => ({
    enabled: true, castList, colorMode: 'color',
    scenario: '## タイトル: 手をつなぐ順番\nLocation: 明るい作業室\n' + Array.from({length:count}, (_, i) => {
      const style=styles[i%styles.length];
      return (
      `[${i + 1}コマ目]\n[Camera: ${i % 2 ? '床から強く見上げる広角' : '頭上から強く見下ろす俯瞰'}]\n[EMOTION: ${style}]\n`
      + `状況: ユウとナギが箱を運ぶ。事実${i + 1}: ユウは${side}側の取っ手を持ち、ナギは反対側で支える。\n`
      + `ユウ「${i + 1}番目は、こちらから！」\nナギ「はい、動作${i + 1}を続けます。」`);
    }).join('\n'),
  });
  const input = makeInput('右');
  const source = m.readExperimentalSource(input);
  const makePlan = (count, layout, src = source) => ({
    count, layout, reason: '箱の受け渡しに必要な動作と反応を展開する', pageIntent: '両者の力の連携を見せる',
    panels: src.panels.map((p, index) => ({ sourcePanel: index + 1, kind: 'anchor', camera: p.camera,
        action: `ユウとナギが箱を運ぶ。実動作${index + 1}: 右手で取っ手を引き、左手で底を支える。`,
        dialogueIds: [...p.dialogueIds], visualEffects: [], breakout: null })),
  });
  const occurrences = (text, fragment) => text.split(fragment).length - 1;
  test('narrative wardrobe survives native full/compact Web and API exports without flattening camera acting or media', () => {
    const cameras=['右後方の高所から俯瞰する広角','左側の床近くから強く見上げる広角','真上から手元を見下ろす接写','右前方の高所から望遠で奥行きを圧縮','左後方の低い位置から25度のダッチアングル','右上空から遠く見下ろす超広角'];
    const actions=['ユウは青い整備士の衣装で腕を伸ばし、歯を食いしばってレバーを引く。ナギは赤い飛行士の衣装で身を乗り出す。','ユウは片足で踏ん張り、ナギは勢いよく跳び上がって笑う。','ユウの袖と手だけが見え、つまんだ留め具を外す。','ナギは眉を寄せ、口を半開きにして振り返る。','ユウは驚いて体を反らし、ナギは片手を伸ばして支える。','二人は肩を震わせて笑う。'];
    const input={enabled:true,castList,colorMode:'color',scenario:'Outfit: 全員別々のコスプレ\nLocation: 空中の整備場\n'+actions.map((action,i)=>`[${i+1}コマ目]\n[Camera: ${cameras[i]}]\n[EMOTION: ${styles[i%styles.length]}]\n状況: ${action}\nセリフなし`).join('\n')};
    const src=m.readExperimentalSource(input),before=structuredClone(src),plan=makePlan(6,'hero_bottom',src);
    plan.panels.forEach((panel,i)=>{panel.action=actions[i];});
    const full=m.buildExperimentalImagePrompt(plan,src,input);
    const compact=m.buildExperimentalImagePrompt(plan,src,{...input,promptMaxChars:full.length-1});
    const refs=buildOpenAIReferencePlan({characterImages:['data:image/png;base64,dGVzdA==']});
    for(const body of [full,compact]) for(const prompt of [appendOpenAIWebReferencePrompt(body,refs),appendOpenAIReferencePrompt(body,refs)]) {
      assert.equal(occurrences(prompt,'WARDROBE COMPONENT LOCK:'),1,'native pages need the shared continuity contract');
      assert.match(prompt,/状況\/Action.*衣装/);
      assert.match(prompt,/後続コマ.*省略.*未指定/);
      assert.match(prompt,/コマ限定.*着替え/);
      assert.match(prompt,/演技・動き・表情.*画風/);
      assert.match(prompt,/明示された参照服との重ね着や衣装の受け渡しは保持/);
      for(const [i,frame] of frames(prompt).entries()) {
        assert.ok(frame.body.includes(`Camera: ${cameras[i]}`));
        assert.ok(frame.body.includes(`Action: ${actions[i]}`));
        assert.ok(frame.body.includes(`Style: ${styles[i%styles.length]}`));
      }
      assert.match(prompt,/FRAME MEDIUM P2 — WATERCOLOR/);
      assert.match(prompt,/FRAME MEDIUM P4 — GEKIGA/);
    }
    assert.deepEqual(src,before,'continuity cannot rewrite the accepted scenario');
  });
  const frames = prompt => [...prompt.matchAll(/\[PAGE FRAME P(\d+) \| ([^\]\n]+)\]\n([\s\S]*?)\n\[END PAGE FRAME P\1\]/g)]
    .map(match => ({ number: Number(match[1]), position: match[2], body: match[3], start: match.index, end: match.index + match[0].length }));
  const position = rect => `${rect.w === 1 ? 'FULL WIDTH' : rect.x === 0 ? 'LEFT' : 'RIGHT'}, top=${Math.round(rect.y * 100)}%, bottom=${Math.round((rect.y + rect.h) * 100)}% of comic area`;

  test('native full and compact prompts preserve each scripted head direction without requiring explicit back-view permission', () => {
    const actions = [
      'ユウは手前、ナギは奥に立ち、二人とも中央の模型を見る。',
      'ユウは顔と胸を前に向けたまま、目だけで横のナギを見る。',
      'ナギの後頭部と肩だけが見え、顔と目は隠れる。',
      'ユウは顔を上げて吊り下げた時計を見つめ、首を少し傾ける。',
      'ナギは目を閉じ、笑顔で休む。注視先は指定しない。',
    ];
    const cameras = actions.map(() => '作業室の左後方、高い位置から俯瞰する広角の中景');
    const input = {enabled:true,castList,colorMode:'color',scenario:actions.map((action,i)=>
      `[${i+1}コマ目]\n[Camera: ${cameras[i]}]\n[EMOTION: NORMAL]\n状況: ${action}\nセリフなし`).join('\n')};
    const source = m.readExperimentalSource(input);
    const plan = makePlan(5,'hero_top',source);
    plan.panels.forEach((panel,i)=>{panel.action=actions[i];});
    const full = m.buildExperimentalImagePrompt(plan,source,input);
    const compactInput = {...input,promptMaxChars:full.length-1};
    const compact = m.buildExperimentalImagePrompt(plan,source,compactInput);
    assert.ok(compact.length < full.length);
    for (const prompt of [full,compact]) {
      assert.doesNotMatch(prompt,/背面指定の人物だけ/);
      assert.match(prompt,/人物の指定向きを保持.*正面\/側面\/背面.*Camera\/Actionの位置関係/);
      for (const [index,frame] of frames(prompt).entries()) {
        assert.ok(frame.body.includes(`Camera: ${cameras[index]}`));
        assert.ok(frame.body.includes(`Action: ${actions[index]}`));
      }
    }
    const old = compact.replaceAll('人物の指定向きを保持し、見える正面/側面/背面はCamera/Actionの位置関係から投影', '背面指定の人物だけ背面を描く');
    const prepared = {source,plan,prompt:compact};
    assert.equal(resolvePageWorkflow({experimentalEnabled:true,prepared,prompt:compact,input:compactInput}).count,5);
    assert.throws(()=>resolvePageWorkflow({experimentalEnabled:true,prepared:{...prepared,prompt:old},prompt:old,input:compactInput}),/STEP3/);
  });

  for (const count of [5, 6, 7, 8]) for (const { id: layout } of m.experimentalLayoutOptions(count)) {
    test(`experimental ${count}/${layout} binds each physical frame to its exact camera, style, action and ordered speech`, () => {
      const input=makeInput('右',count),source=m.readExperimentalSource(input);
      const plan = makePlan(count, layout, source);
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
        assert.ok(block.body.includes(`Camera: ${panel.camera}; Style: ${source.panels[panel.sourcePanel - 1].style}; Action: ${panel.action}`));
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
          'source facts must immediately precede their one corresponding physical frame');
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

  test('original speech and purposeful silence remain valid inside spanning layouts', () => {
    const input=makeInput('右',6);
    input.scenario=input.scenario.replace('ユウ「4番目は、こちらから！」\nナギ「はい、動作4を続けます。」','セリフなし');
    const source=m.readExperimentalSource(input);
    const plan = makePlan(6, 'tall_right_top',source);
    const validated = m.validateExperimentalPlan(plan, source);
    assert.equal(validated.count, 6);
    const blocks = frames(m.buildExperimentalImagePrompt(plan, source, input));
    assert.equal(blocks.length, 6);
    assert.equal(blocks[0].position, 'RIGHT, top=0%, bottom=52% of comic area');
    assert.ok(blocks[1].body.includes(JSON.stringify(validated.expectedDialogue.find(line => line.id === source.panels[1].dialogueIds[0]))));
    assert.ok(blocks[3].body.includes('Dialogue: SILENT'));
    assert.ok(blocks.at(-1).position.endsWith(' | FINAL ENDING'));
  });

  test('spatial compilation still rejects original dialogue reversal before emitting a prompt', () => {
    const input=makeInput('右',5),source=m.readExperimentalSource(input);
    const plan = makePlan(5, 'hero_bottom',source);
    assert.doesNotThrow(() => m.validateExperimentalPlan(plan, source));
    plan.panels[0].dialogueIds.reverse();
    assert.throws(() => m.validateExperimentalPlan(plan, source), /元のコマの台詞・順番/);
    assert.throws(() => m.buildExperimentalImagePrompt(plan, source, input), /元のコマの台詞・順番/);
  });
} finally {
  await server.close();
}
