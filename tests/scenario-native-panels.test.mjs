import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
let server, validation, provider, prompts, enhancement, staging, documentary, payoff, setFixtureResponse;
const mode = { scenarioMode: 'experimental-manga' };
const panels = (count) => Array.from({ length: count }, (_, i) => `[${i + 1}コマ目: 展開]
[EMOTION: NORMAL]
[Camera: 左上から俯瞰の中景]
状況: Aが札を動かす。
A「${i + 1}枚目です。」`).join('\n');
const args = { categories: [], castList: 'A', randomCategory: '札', inputMode: 'manual', manualTopic: '会館で札を揃える。', newsContext: '', targetDate: '2026-10-13', customLocation: '', customOutfit: '私服', punchlineType: 'Surreal', onProgress: () => {} };
before(async () => {
 server = await createServer({ appType: 'custom', logLevel: 'silent', plugins: [{ name: 'native-scenario-fixture', enforce: 'pre', resolveId(id, importer) { if (id === 'virtual:native-scenario-fixture' || (id === './ai-provider' && importer?.endsWith('/scenario-provider.js'))) return '\0native-scenario-fixture'; }, load(id) { if (id === '\0native-scenario-fixture') return 'let respond; export const setFixtureResponse = fn => { respond = fn; }; export const callAI = (...args) => respond(...args);'; } }], server: { middlewareMode: true } });
 validation = await server.ssrLoadModule('/src/lib/scenario-validation.js');
 provider = await server.ssrLoadModule('/src/lib/scenario-provider.js');
 prompts = await server.ssrLoadModule('/src/lib/prompts.js');
 enhancement = await server.ssrLoadModule('/src/lib/scenario-enhancement.js');
 staging = await server.ssrLoadModule('/src/lib/manual-staging.js');
 documentary = await server.ssrLoadModule('/src/lib/documentary-source-fidelity.js');
 payoff = await server.ssrLoadModule('/src/lib/scenario-payoff-quality.js');
 ({ setFixtureResponse } = await server.ssrLoadModule('virtual:native-scenario-fixture'));
});
after(async () => server?.close());
test('native validation accepts 5 and 8, preserves explicit silence, and normal mode accepts only 4', () => {
 for (const n of [5, 8]) {
  const text = panels(n).replace('A「2枚目です。」', 'セリフなし');
  assert.equal(validation.validateMangaScenario(text, 'A', mode).ok, true);
  assert.equal(validation.getScenarioPanelBlocks(text).length, n);
  assert.equal(validation.validateMangaScenario(text, 'A').ok, false);
 }
 assert.equal(validation.validateMangaScenario(panels(4), 'A').ok, true);
 for (const n of [4, 9]) assert.equal(validation.validateMangaScenario(panels(n), 'A', mode).ok, false);
 for (const text of ['', panels(5).replace('[3コマ目:', '[2コマ目:'), panels(5).replace('[3コマ目:', '[6コマ目:'), panels(5).replace('[3コマ目: 展開]', '')]) assert.equal(validation.validateMangaScenario(text, 'A', mode).ok, false);
});
test('late native panels receive camera, style and dialogue validation', () => {
 const eight = panels(8);
 assert.equal(validation.assertGeneratedScenarioCameraContract(eight, '', mode), true);
 const badCamera = eight.replace('[8コマ目: 展開]\n[EMOTION: NORMAL]\n[Camera: 左上から俯瞰の中景]', '[8コマ目: 展開]\n[EMOTION: NORMAL]\n[Camera: アイレベル]');
 assert.throws(() => validation.assertGeneratedScenarioCameraContract(badCamera, '', mode), { code: 'CAMERA_CONTRACT' });
 assert.equal(validation.assertGeneratedScenarioCameraContract(badCamera, '8コマ目はアイレベルで撮る。', mode), true);
 assert.throws(() => validation.assertGeneratedScenarioStyleContract(eight.replace('[8コマ目: 展開]\n[EMOTION: NORMAL]', '[8コマ目: 展開]\n[EMOTION: PASTEL]'), mode), { code: 'STYLE_CONTRACT' });
 assert.throws(() => provider.assertMangaScenarioDialogueContract(eight.replace('A「8枚目です。」', ''), 'A', mode));
});
test('native prompt selects complete 5–8 panels without rewriting user material or four-panel ending instructions', () => {
 const topic = '古い4コマ漫画を8コマ目の机に置く。';
 for (const punchlineType of ['Surreal', 'SeriousAuto', 'EmotionalClosure', 'Resolve', 'Documentary', 'SeriousDocumentary', 'RunningGag', 'CanceledEnding', 'Dream']) {
  const prompt = prompts.getScenarioPrompt({ ...args, ...mode, manualTopic: topic, punchlineType });
  assert.match(prompt, /5[〜～–-]8コマ/);
  assert.match(prompt, /最終コマ/);
  assert.match(prompt, /最初から5〜8コマの完成した1ページ/);
  assert.match(prompt, /無言数のノルマや全面禁止は設けない/);
  assert.ok(prompt.includes(topic));
  const withoutTopic = prompt.replaceAll(topic, 'USER_SOURCE');
  assert.doesNotMatch(withoutTopic, /4コマ目|全4コマ|4コマの|4コマ漫画|1〜3コマ目/, punchlineType);
 }
 assert.match(prompts.getScenarioPrompt(args), /\[4コマ目: 結\]/);
});
test('four-panel mode ignores only total-count requests across generation, review and repair without rewriting source facts', () => {
 const topic = '全6コマで作って。1コマ目はNORMAL、2コマ目はPOP_ART、3コマ目はWATERCOLOR、4コマ目はGEKIGA。2コマ目は床からのアオリ。Aが「この古い漫画は5コマだった」と話し、8枚の札を動かす。';
 const original = panels(4);
 const review = reviewFor(4);
 const outputs = [
  prompts.getScenarioPrompt({ ...args, manualTopic: topic }),
  payoff.buildScenarioPayoffReviewPrompt({ scenario: original, userTopic: topic }),
  payoff.buildScenarioPayoffRepairPrompt({ scenario: original, userTopic: topic, review })
 ];
 for (const prompt of outputs) {
  assert.ok(prompt.includes(topic), 'raw story, quotations, numbers and panel styles remain verbatim');
  assert.match(prompt, /自由入力[^\n]*総コマ数[^\n]*無視/);
  assert.match(prompt, /1〜4コマ[^\n]*画風[^\n]*カメラ[^\n]*演技[^\n]*台詞[^\n]*保持/);
  assert.match(prompt, /コマ数指定[^\n]*不一致[^\n]*しない/);
 }
});
test('native count selection keeps explicit 5–8 count requests and chooses a count only when unspecified', () => {
 for (const topic of ['全5コマで札を揃える。', '8コマで札を揃える。', '札を揃える。']) {
  const prompt = prompts.getScenarioPrompt({ ...args, ...mode, manualTopic: topic });
  assert.ok(prompt.includes(topic));
  assert.match(prompt, /5〜8[^\n]*総コマ数[^\n]*指定[^\n]*従/);
  assert.match(prompt, /未指定[^\n]*内容[^\n]*選/);
  assert.doesNotMatch(prompt, /自由入力[^\n]*総コマ数[^\n]*無視/);
 }
});
test('native followup editing sees all panels and rejects late deletion', () => {
 const original = panels(8), candidate = original.replace('A「8枚目です。」', 'A「揃いました。」');
 assert.equal(enhancement.validateScenarioEnhancement({ originalScenario: original, candidateScenario: candidate, selectedCategories: ['dialogue'], ...mode }).ok, true);
 const result = enhancement.validateScenarioEnhancement({ originalScenario: original, candidateScenario: candidate.replace('[8コマ目: 展開]', '[7コマ目: 展開]'), selectedCategories: ['dialogue'], ...mode });
 assert.ok(result.issueCodes.includes('panel_structure_changed'));
 const prompt = enhancement.buildScenarioEnhancementPrompt({ scenario: original, selectedCategories: ['gag'], ...mode });
 assert.match(prompt, /8コマ/);
 assert.doesNotMatch(prompt.replace(original, ''), /4コマ目|全4コマ|4コマ構造/);
});
test('manual staging isolates panel 8 and documentary reminders cover the real penultimate panel', () => {
 const staged = staging.applyManualStagingLocks(panels(8), '8コマ目はAが札を見る。');
 const actual = validation.getScenarioPanelBlocks(staged);
 assert.ok(actual.slice(0, 7).every(panel => !panel.text.includes('USER STAGING LOCK')));
 assert.match(actual[7].text, /USER STAGING LOCK/);
 const facts = Array.from({ length: 7 }, (_, i) => `${i + 1}日発表。`).join('');
 const annotated = documentary.attachDocumentarySourceFacts(panels(8), facts, mode);
 assert.match(validation.getScenarioPanelBlocks(annotated)[6].text, /SOURCE FACT/);
 assert.doesNotMatch(validation.getScenarioPanelBlocks(annotated)[7].text, /SOURCE FACT/);
});
test('provider retries wrong native counts then fails closed before payoff review', async () => {
 let calls = 0;
 setFixtureResponse(async () => { calls++; return { text: `Topic: 札
Location: 会館
Outfit: 私服
Scenario:
${panels(4)}`, model: 'fixture' }; });
 await assert.rejects(() => provider.generateScenario({ ...args, ...mode }), error => error.code === 'PANEL_STRUCTURE_CONTRACT');
 assert.equal(calls, 3);
});
test('provider parser preserves native text and JSON response forms', () => {
 for (const count of [5, 8]) {
  for (const text of [`Topic: 札
Scenario:
${panels(count)}`, JSON.stringify({ topic: '札', scenario: panels(count) })]) {
   const parsed = provider.parseScenarioResponse({ text }, { ...args, ...mode });
   assert.equal(validation.validateMangaScenario(parsed.scenario, 'A', mode).ok, true);
  }
 }
});

const reviewFor = (count) => ({
 pass: true,
 cast_identity: Array.from({ length: count }, (_, index) => ({ panel: index + 1, status: 'consistent', reference_evidence: 'Aは黒い短髪で眼鏡なし。Bは長髪で眼鏡あり。', scenario_evidence: 'Aの外見・話者の記述は基準と一致し、Bの特徴は付いていない。', change_basis: '', correction: '' })),
 payoff_clarity: { material_failure: false, evidence: '札の順序を直し、入口への案内がつながる。', correction: '' },
 setup_seed: '順番の違う札を揃える。', panel3_prediction: '残る札の向きが分かる。',
 panel4_outcome: '最後の札が揃い、入口への案内が通る。', shift_kind: 'payoff', visual_payoff: true,
 slogan_only: false, unseeded_fact: false, reason_codes: [],
 visual_feasibility: Array.from({ length: count }, (_, index) => ({ panel: index + 1, feasible: true, evidence: '札を持つ片手と読む人物が同じ画面で明瞭に見える。', correction: '' })),
 ensemble_continuity: Array.from({ length: count }, (_, index) => ({ panel: index + 1, material_break: false, evidence: 'Aが前の札に続けて次の札を配置する。', correction: '' })),
 panel_development: Array.from({ length: count }, (_, index) => ({ panel: index + 1, material_padding: false, evidence: '札の順序と案内される方向が次の配置で変わる。', correction: '' })),
 camera_rhythm: { shots: Array.from({ length: count }, (_, index) => ({ panel: index + 1, signature: `view ${index + 1}`, purpose: '配置順に応じて手元と案内先を見せる。' })), repeated_panels: [], material_repeat: false, intentional_repeat: false, evidence: '順次変わる札の状態を読める。', correction: '' }
});

test('native generation and subsequent edit cross the real provider orchestration with the chosen count and model', async () => {
 for (const count of [5, 8]) {
  const calls = [];
  setFixtureResponse(async (prompt, images, system, progress, options) => {
   calls.push({ prompt, options });
   return { text: prompt.includes('構成監査')
    ? JSON.stringify(reviewFor(count))
    : `Topic: 札\nLocation: 会館\nOutfit: 私服\nScenario:\n${panels(count)}`, model: 'fixture' };
  });
  const result = await provider.generateScenario({ ...args, ...mode, scenarioModelId: 'gpt-6-luna' });
  assert.equal(result.scenario, panels(count));
  assert.equal(result.validationWarning, null);
  assert.equal(calls.length, 2, 'one generation and one successful review');
  assert.match(calls[0].prompt, /5[〜～–-]8コマ/);
  assert.doesNotMatch(calls[0].prompt, /4コマ/);
  for (const call of calls) assert.equal(call.options.scenarioModelId, 'gpt-6-luna');
  setFixtureResponse(async () => ({ text: result.scenario.replace(`A「${count}枚目です。」`, 'A「揃いました。」'), model: 'fixture' }));
  const edited = await provider.enhanceScenarioText({ scenario: result.scenario, selectedCategories: ['dialogue'], ...mode, scenarioModelId: 'gpt-6-luna', castList: 'A' });
  assert.equal(edited.validation.ok, true);
  assert.equal(validation.getScenarioPanelBlocks(edited.text).length, count);
 }
});

test('four-panel provider retains four individual media and source quantities despite an ignored six-panel request', async () => {
 const styles = ['NORMAL', 'POP_ART', 'WATERCOLOR', 'GEKIGA'];
 const topic = '全6コマで。1:NORMAL、2:POP_ART、3:WATERCOLOR、4:GEKIGA。Aは8枚の札と「5コマの漫画」を持つ。';
 let i = 0;
 const original = panels(4).replaceAll('[EMOTION: NORMAL]', () => `[EMOTION: ${styles[i++]}]`)
  .replace('A「1枚目です。」', 'A「この漫画は5コマ。札は8枚です。」');
 const calls = [];
 setFixtureResponse(async (prompt) => {
  calls.push(prompt);
  return { text: prompt.includes('構成監査') ? JSON.stringify(reviewFor(4))
   : 'Topic: 札\nLocation: 会館\nOutfit: 私服\nScenario:\n' + original, model: 'fixture' };
 });
 const result = await provider.generateScenario({ ...args, manualTopic: topic });
 assert.equal(result.scenario, original);
 assert.equal(result.validationWarning, null);
 assert.equal(calls.length, 2);
 for (const prompt of calls) {
  assert.ok(prompt.includes(topic));
  assert.match(prompt, /自由入力[^\n]*総コマ数[^\n]*無視/);
 }
 assert.deepEqual(validation.getScenarioPanelBlocks(result.scenario).map(panel => panel.text.match(/\[EMOTION: (\w+)\]/)[1]), styles);
});

test('four-panel provider still rejects extra generated panels instead of silently truncating story content', async () => {
 let calls = 0;
 setFixtureResponse(async () => {
  calls++;
  return { text: 'Topic: 札\nLocation: 会館\nOutfit: 私服\nScenario:\n' + panels(6), model: 'fixture' };
 });
 await assert.rejects(() => provider.generateScenario({ ...args, manualTopic: '全6コマで札を揃える。' }), error => error.code === 'PANEL_STRUCTURE_CONTRACT');
 assert.equal(calls, 3, 'existing bounded retry, no accepted extra panels and no payoff call');
});

test('360 camera contract covers every native panel and rejects missing, duplicate or nonnumeric entries', () => {
 const camera = { panels: Array.from({ length: 8 }, (_, index) => ({ panel: index + 1, yaw: index * 45, pitch: 0, fov: 90 })) };
 assert.equal(provider.assertScenarioCameraWork(camera, 8), true);
 for (const bad of [camera.panels.slice(0, 4), [...camera.panels.slice(0, 7), { ...camera.panels[7], panel: 7 }], [...camera.panels.slice(0, 7), { ...camera.panels[7], yaw: 'unknown' }]]) {
  assert.throws(() => provider.assertScenarioCameraWork({ panels: bad }, 8));
 }
});


test('normal provider supplies the same recognized identity context to generation, review, repair and final review', async () => {
 const count = 6;
 const castList = '## A\n髪: 黒い短髪\n顔: 眼鏡なし\n服装: 赤い参考コート\n## B\n髪: 長髪\n顔: 眼鏡あり';
 const original = panels(count).replace('Aが札を動かす。', 'Aが眼鏡越しに札を動かす。');
 const corrected = original.replace('眼鏡越しに', '眼鏡をかけずに');
 const mismatch = reviewFor(count);
 mismatch.cast_identity[0] = { ...mismatch.cast_identity[0], status: 'mismatch',
  scenario_evidence: '1コマ目のAは眼鏡越しと書かれ、基準で眼鏡をかけるのはB。', correction: 'Aの状況を眼鏡なしへ直し、人物名と台詞は保つ。' };
 const calls = [];
 setFixtureResponse(async (prompt, images, system, progress, options) => {
  calls.push({ prompt, system, options });
  const number = calls.length;
  if (number === 1) return { text: 'Topic: 札\nLocation: 会館\nOutfit: 私服\nScenario:\n' + original, model: 'fixture' };
  if (number === 2) return { text: JSON.stringify(mismatch), model: 'fixture' };
  if (number === 3) return { text: corrected, model: 'fixture' };
  return { text: JSON.stringify(reviewFor(count)), model: 'fixture' };
 });
 const result = await provider.generateScenario({ ...args, ...mode, castList, scenarioModelId: 'gpt-6-luna' });
 assert.equal(result.scenario, corrected); assert.equal(result.validationWarning, null);
 assert.equal(calls.length, 4, 'existing generation, audit, one repair and final audit only');
 for (const call of calls) {
  assert.equal(call.system, calls[0].system);
  assert.match(call.system, /黒い短髪/); assert.match(call.system, /眼鏡なし/); assert.match(call.system, /長髪/);
  assert.doesNotMatch(call.system, /赤い参考コート/);
  assert.equal(call.options.scenarioModelId, 'gpt-6-luna');
 }
 assert.match(calls[1].prompt, /cast_identity/); assert.match(calls[3].prompt, /cast_identity/);
 assert.ok(calls[3].prompt.includes(corrected));
});

test('auto prompt uses story content without changing the manual prompt contract',()=>{
 const auto=prompts.getScenarioPrompt({...args,...mode,autoSelectPanelCount:true});
 assert.match(auto,/内容に基づくコマ数の自動選択/);
 assert.match(auto,/4コマで因果と結末/);
 assert.match(auto,/文字数・カテゴリ名・偶然・交互選択で決めない/);
 assert.match(auto,/PanelCountReason:/);
 assert.doesNotMatch(auto,/実験的コマ割りは5〜8コマ|四コマモードは常に全4コマ|N（5〜8）/);
 const manual=prompts.getScenarioPrompt({...args,...mode});
 assert.doesNotMatch(manual,/PanelCountReason:/);
 assert.match(manual,/実験的コマ割りは5〜8コマ/);
});
test('provider selects either mode within the existing generation and review calls',async()=>{
 for (const count of [4,5,6,7,8]) {
  const calls=[], reason='必要な行動と判断がこの順序で過不足なく伝わる';
  setFixtureResponse(async(prompt,_images,_system,_progress,options)=>{
   calls.push({prompt,options});
   return {text:prompt.includes('構成監査')?JSON.stringify(reviewFor(count)):
    'Topic: 札\nLocation: 会館\nOutfit: 私服\nPanelCountReason: '+reason+'\nScenario:\n'+panels(count),model:'fixture'};
  });
  const result=await provider.generateScenario({...args,...mode,autoSelectPanelCount:true,scenarioModelId:'gpt-6-luna'});
  assert.deepEqual(result.panelCountDecision,{scenarioMode:count===4?'four-panel':'experimental-manga',panelCount:count,reason});
  assert.equal(validation.getScenarioPanelBlocks(result.scenario).length,count);
  assert.equal(calls.length,2,'no additional classifier API');
  assert.equal(calls[0].options.scenarioModelId,'gpt-6-luna');
  assert.match(calls[1].prompt,count===4?/四コマモードは常に全4コマ/:/実験的コマ割りは5〜8コマ/);
 }
});
test('parser keeps selection rationale separate from manga dialogue for both response formats',()=>{
 for (const text of ['Topic: 札\nPanelCountReason: 一つの行動と結果\nScenario:\n'+panels(4),
 JSON.stringify({topic:'札',panelCountReason:'一つの行動と結果',scenario:panels(4)})]) {
  const parsed=provider.parseScenarioResponse({text},args);
  assert.equal(parsed.panelCountReason,'一つの行動と結果');
  assert.equal(parsed.scenario,panels(4));
 }
});
test('auto response without a content reason is rejected before downstream review',async()=>{
 let calls=0;
 setFixtureResponse(async()=>{calls++;return {text:'Topic: 札\nLocation: 会館\nOutfit: 私服\nScenario:\n'+panels(4),model:'fixture'};});
 await assert.rejects(()=>provider.generateScenario({...args,autoSelectPanelCount:true}),{code:'AUTO_PANEL_CHOICE'});
 assert.ok(calls<=3);
});

test('blank selection reason cannot consume the following Scenario field',()=>{
 for(const blank of ['', '   ', '\t']) {
  const parsed=provider.parseScenarioResponse({text:'Topic: 札\nPanelCountReason:'+blank+'\nScenario:\n'+panels(4)},args);
  assert.equal(parsed.panelCountReason,'');
  assert.throws(()=>validation.resolveAutoScenarioMode(parsed),{code:'AUTO_PANEL_CHOICE'});
 }
});
