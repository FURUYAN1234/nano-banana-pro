import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
try {
  const p = await server.ssrLoadModule('/src/lib/panel-utils.js');
  const n = await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const q = await server.ssrLoadModule('/src/lib/image-quality-qa.js');
  const { buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js');
  const { resolvePageWorkflow } = await server.ssrLoadModule('/src/lib/page-workflow.js');
  const cast = '## 甲\n## 乙\n## 丙';
  const names = rule => [...(rule.match(/(?:CAST COUNT:|ANTI-CLONE REMINDER:)[^\n]*/)?.[0] || '').matchAll(/\[([^\]]+)\]/g)].map(match => match[1]).sort();
  const gaze = '[Camera: 高所から甲と乙を見下ろす。二人の視線を画面外の丙へ向かわせる。]\n状況: 甲と乙が笑う。\n甲「いいね。」';
  const voice = '[Camera: 高所から乙を見下ろす]\n状況: 乙が窓際に立つ。甲は画面外にいる。\n甲「いいね。」';

  test('offscreen targets are excluded by the shared full/compact physical roster', () => {
    for (const compact of [false, true]) for (const outside of ['画面外', '画角外', 'フレーム外']) {
      const rule = p.extractCastLimitRule(gaze.replaceAll('画面外', outside), cast, { compact });
      assert.deepEqual(names(rule), ['乙', '甲']);
      assert.match(rule, /(?:do NOT draw|Do NOT draw) \[丙\]/);
    }
  });
  test('ordinary gaze, quoted offscreen words, rear/small/partial bodies and negation remain allowed', () => {
    const cases = [
      '[Camera: 高所から三人を見下ろす]\n状況: 甲と乙が丙を見る。',
      '[Camera: 甲の後ろ姿。乙は遠景に小さく見える]\n状況: 丙の顔は画面外だが手は画面内に見える。',
      '状況: 甲と乙が立つ。丙は画面外にいるが、丙の手だけが画面内に見える。',
      '状況: 甲は画面外の看板を見る。乙は画面外に出ない。丙が横に立つ。',
      '状況: 甲と乙と丙が笑う。\n甲「画面外の丙へ、という言葉の意味を考えた。」',
    ];
    for (const text of cases) assert.deepEqual(names(p.extractCastLimitRule(text, cast, { compact: true })), ['丙', '乙', '甲'], text);
  });
  test('offscreen voice keeps exact speech but requires no physical speaker or visible mouth', () => {
    assert.deepEqual(names(p.extractCastLimitRule(voice, cast, { compact: true })), ['乙']);
    for (const compactMetadata of [false, true]) {
      const text = p.extractDialogueOnly(voice, cast, { forImagePrompt: true, compactMetadata });
      assert.match(text, /B1="いいね。"/);
      assert.match(text, /OFFSCREEN VOICE: B1=>\[甲\] frame_edge/);
      assert.doesNotMatch(text, /B1=>\[甲\] mouth\/head/);
      const prompt = `## Panel 1\nDialogue: ${text}`;
      assert.equal(q.extractBubbleContracts(prompt)[0].bubbles[0].offscreen, true);
    }
    const normal = voice.replace('甲は画面外にいる。', '甲は画面内にいる。');
    assert.doesNotMatch(p.extractDialogueOnly(normal, cast, { forImagePrompt: true }), /OFFSCREEN VOICE/);
  });
  test('authored edge routes remain literal; visible-mouth endpoints cannot reveal an offscreen speaker', () => {
    for (const anchor of ['甲の方向の右の画面縁', '甲の口元']) {
      const source = `BalloonLayout: ${JSON.stringify([{speaker:'甲',x:0.8,anchor,route:'右上から甲の口元へ短く結ぶ'}])}\n${voice}`;
      const text = p.extractDialogueOnly(source, cast, { forImagePrompt:true, compactMetadata:true });
      assert.match(text, /OFFSCREEN VOICE: B1=>\[甲\] frame_edge/);
      assert.doesNotMatch(text, /甲の口元/);
      if (anchor.includes('画面縁')) assert.ok(text.includes(anchor));
    }
  });
  test('native compilation and expected QA roster share the corrected source contract', async () => {
    const scenario = Array.from({length:5}, (_, index) => `[${index+1}コマ目]\n[EMOTION: NORMAL]\n${index === 0 ? gaze : '[Camera: 高所から乙を俯瞰]\n状況: 乙が本を読む。\nセリフなし'}`).join('\n');
    const input = {enabled:true,scenario,castList:cast,colorMode:'color'};
    const source = n.readExperimentalSource(input);
    const plan = {count:5,layout:'two_columns',reason:'場面を順番に読む',panels:source.panels.map(panel => ({sourcePanel:panel.id,kind:'anchor',camera:panel.camera,action:panel.action,dialogueIds:panel.dialogueIds,breakout:null}))};
    // Planner fixture retains authored Camera/Action; no generation is involved.
    plan.panels.forEach((panel, index) => { panel.action = index === 0 ? '甲と乙が笑い、画面外の丙へ視線を向ける。' : '乙が本を読む。'; });
    const prepared = await n.prepareExperimentalManga(input, async () => JSON.stringify(plan));
    assert.deepEqual(n.validateExperimentalPlan(plan,source).expectedCast[0].names.sort(), ['乙','甲']);
    const frame = prepared.prompt.split('[PAGE FRAME P1 |')[1].split('[END PAGE FRAME P1]')[0];
    assert.deepEqual(names(frame), ['乙','甲']);
    assert.ok(frame.includes(source.panels[0].camera));
    assert.ok(frame.includes(plan.panels[0].action));
    assert.match(frame, /B1="いいね。"/);
    const legacyPrompt = prepared.prompt.replace('CAST COUNT: [甲], [乙] each EXACTLY ONCE', 'CAST COUNT: [甲], [乙], [丙] each EXACTLY ONCE');
    assert.notEqual(legacyPrompt, prepared.prompt);
    assert.throws(() => resolvePageWorkflow({experimentalEnabled:true,prepared:{...prepared,prompt:legacyPrompt},prompt:legacyPrompt,input}), /STEP3/);
    assert.notEqual(prepared.colorLayoutContext.revision, 38, 'old prepared layout revision cannot be reused');
  });
  test('ordinary providers retain offscreen speech and exclude its body in complete and compact prompts', () => {
    const scenario = Array.from({length:4}, (_,index) => `[${index+1}コマ目]\n[EMOTION: NORMAL]\n${index===0?voice:gaze}`).join('\n');
    for (const providerFamily of ['chatgpt','gemini']) for (const promptMaxChars of [24000,32000]) {
      const prompt = buildMangaPrompt({scenario,castList:cast,colorMode:'color',providerFamily,promptMaxChars,showWatermarks:false,punchlineType:'Auto'});
      const frame = prompt.split('## Panel 1\n')[1].split('## Panel 2\n')[0];
      assert.deepEqual(names(frame), ['乙']);
      assert.match(frame, /OFFSCREEN VOICE: B1=>\[甲\] frame_edge/);
      assert.match(frame, /B1="いいね。"/);
      assert.doesNotMatch(frame, /(?:tail must reach|tails reach) \[甲\] mouth\/head|\[甲\] PRIMARY|\[甲\] BACK-THREE-QUARTER/);
    }
  });
  test('QA permits only source-authorized frame-edge tails, preserving wrong-person and evidence gates', () => {
    const prompt = `## Panel 1\nDialogue: ${p.extractDialogueOnly(voice,cast,{forImagePrompt:true})}`;
    assert.match(q.buildImageQualityQaPrompt({finalPrompt:prompt}), /OFFSCREEN VOICE EXCEPTION/);
    const bubble = {bubble:'B1',text:'いいね。',expected_speaker:'甲',observed_tail_target:'甲',
      tail_endpoint_evidence:'Tail reaches the right frame edge toward the scripted offscreen voice.',
      endpoint_relation:'points_to_frame_edge', tail_tip:{x:0.99,y:0.3},speaker_anchor:{x:1,y:0.3,part:'frame_edge'},
      root_relation:'lower_speaker_facing',path_relation:'clear',tail_path_evidence:'The short route crosses only empty space.',center_x:0.9};
    const inspect = (body, finalPrompt=prompt) => q.parseImageQualityQaResponse(JSON.stringify({pass:true,issues:[],spatial_checks:[{
      panel:1,bubble_speaker:{status:'ok',evidence:'The tail points outside the frame.',bubbles:[body]},
    }]}),{finalPrompt}).issues.filter(issue => issue.subject==='B1'||issue.type==='bubble_speaker');
    assert.deepEqual(inspect(bubble), []);
    assert.ok(inspect({...bubble,observed_tail_target:'乙',endpoint_relation:'wrong_character'}).some(issue => issue.type==='bubble_speaker'));
    assert.ok(inspect({...bubble,speaker_anchor:{x:0.5,y:0.5,part:'frame_edge'}}).some(issue => issue.type==='unverified'));
    assert.ok(inspect(bubble,prompt.replace(/^OFFSCREEN VOICE:.*$/m,'')).some(issue => issue.type==='unverified'));
  });
} finally { await server.close(); }
