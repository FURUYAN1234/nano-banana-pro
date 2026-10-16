import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';
import { restoreReviewedShotExecution } from './helpers/prompt-policy-normalization.mjs';

let server;
let buildMangaPrompt;
let getScenarioPrompt;
let getPanelCompositionAssist;
let getPanelShotExecution;
let sharePanelShotExecution;
const applicableShotClauses = (prompt, panelNumber) => {
  const shared = [...prompt.matchAll(/^SHOT (P\d+(?:\/P\d+)*) ONLY: (.+)$/gm)]
    .filter(([, panels]) => panels.split('/').includes(`P${panelNumber}`)).map(([, , cue]) => cue);
  const panel = prompt.split(new RegExp(`^## Panel ${panelNumber}\\s*$`, 'm'))[1]?.split(/^## Panel \d+\s*$/m)[0] || '';
  return [...shared, panel.match(/^SHOT EXECUTION:.*$/m)?.[0] || ''].join('\n');
};

test('rear camera projection permits natural back planes without an explicit back-view instruction', () => {
  for (const compact of [false, true]) {
    for (const camera of ['作業室の左後方から俯瞰する引き', '装置の右後ろから見上げる中景', 'from the rear of the hall, high-angle']) {
      const cue = getPanelShotExecution(camera, { compact });
      assert.doesNotMatch(cue, /背面指定の人物だけ|only.*explicit.*back/i);
      assert.match(cue, /人物の指定向きを保持.*正面\/側面\/背面.*Camera\/Actionの位置関係/);
      assert.match(cue, /場所\/道具の向きで全員を回さない/);
      assert.match(cue, /距離\/切取り保持、肩越し接写を強制しない/);
    }
  }
});

test('rear camera anchors do not force every actor to turn away from scripted gaze', () => {
  for (const camera of [
    '展示室の左後方から俯瞰。人物は中央の展示品を囲んで見る。',
    '装置の右後ろから見上げる。作業者は装置に向く。',
    'from the rear of the hall, high-angle; actors face the central object',
  ]) {
    assert.match(getPanelShotExecution(camera), /後方.*基準対象/);
    assert.match(getPanelShotExecution(camera), /人物の指定向きを保持/);
    assert.match(getPanelShotExecution(camera), /場所\/道具.*全員を回さない/);
    assert.match(getPanelShotExecution(camera, { compact: true }), /後方.*基準対象.*Camera\/Actionの位置関係から投影/);
  }
  for (const camera of ['人物の左後方、後頭部と背中を見せる広角の引き', 'rear-view close-up of the actor']) {
    const cue = getPanelShotExecution(camera);
    assert.match(cue, /人物の指定向きを保持.*背面/);
    assert.match(cue, /距離\/切取り保持/);
    assert.match(cue, /肩越し接写を強制しない/);
  }
});
let classifyCameraElevation;
let isFisheyeCamera;
let isPullbackShot;
let MANGA_COMPOSITION_VARIETY_LOCK;
let MANGA_COMPOSITION_VARIETY_LOCK_COMPACT;
let MANGA_GESTURE_VARIETY_LOCK;
let cinematicCompositionMap;
test('scene-target face alignment is conditional on unspecified face direction and never overrides authored acting',()=>{
  for(const compact of [false,true]) for(const camera of ['俯瞰・広角','アオリ・望遠']) {
    const shot=getPanelShotExecution(camera,{compact});
    assert.match(shot,/注視先明示かつ顔向き未指定/);
    assert.match(shot,/対象に応じた自然な頭向きを補う/);
    assert.match(shot,/明示の横目\/目だけの移動\/顔上げ\/背面を優先、顔\/対象の遮蔽保持/);
    assert.match(shot,/首傾げ・表情保持/);
    assert.doesNotMatch(shot,/全員.*下向|必ず下向|水平器|気泡/);
  }
});
test('high and low shots establish scene gaze before independent camera projection and medium', () => {
  for (const compact of [false, true]) for (const camera of ['俯瞰・広角', 'アオリ・望遠']) {
    const execution = getPanelShotExecution(camera, { compact });
    assert.match(execution, /^SHOT EXECUTION: 人物\/注視先を配置→指定の体\/首\/顔向き・首傾げ・表情保持、注視先明示かつ顔向き未指定なら対象に応じた自然な頭向きを補う（明示の横目\/目だけの移動\/顔上げ\/背面を優先、顔\/対象の遮蔽保持）、可視瞳を指定先へ（対象未指定\/閉眼\/明示の読者目線保持）→独立Cameraで立体投影→画風; /);
    assert.doesNotMatch(execution, /ACTOR PROJECTION FIRST|描法\/質感前に立体投影/);
  }
  assert.equal(getPanelShotExecution('eye-level horizontal'), '');
});
let cameraAngles;
let openAIColorGekigaStyle;

test('repeated prompt compaction preserves each low shot projection and quiet scripted pitch', () => {
  const cameras = [
    '左前の低い位置から見上げる中景',
    '右前の低めの位置から穏やかに見上げる固定の中景。弱い仰角を保つ。',
    '正面の低い位置から見上げる寄り',
    '左横の低い位置から見上げる引きの全身',
  ];
  let cameraIndex = 0;
  const scenario = FOUR_PANEL_SCENARIO
    .replace(/\[EMOTION: [^\]]+\]/g, '[EMOTION: GEKIGA]')
    .replace(/\[Camera: [^\]]+\]/g, () => `[Camera: ${cameras[cameraIndex++]}]`)
    .replace('SpeakerB stands and presses a document onto the table with both hands.',
      'SpeakerB remains motionless with both hands resting on the document, listening quietly.');
  const actions = [...scenario.matchAll(/^Action: (.+)$/gm)].map(match => match[1]);

  for (const promptMaxChars of [24000, 32000]) {
    const prompt = buildMangaPrompt({ scenario, castList: CAST_LIST, providerFamily: 'chatgpt',
      colorMode: 'color', punchlineType: 'Auto', cinematicTechniques: false, promptMaxChars });
    assert.ok(prompt.length > 15000, 'the fixture must exercise repeated soft-target compaction');
    assert.ok(prompt.length <= promptMaxChars);
    const panels = prompt.split(/^## Panel \d+\s*$/m).slice(1);
    assert.equal(panels.length, 4);
    for (const [index, panel] of panels.entries()) {
      assert.equal(panel.match(/^Camera: (.+)$/m)?.[1], cameras[index]);
      assert.ok(panel.match(/^Action \(visual only\):(.+)$/m)?.[1].endsWith(actions[index]));
      assert.equal(panel.match(/^Style: (.+)$/m)?.[1], openAIColorGekigaStyle);
      const shot = panel.match(/^SHOT EXECUTION:.*$/m)?.[0] || '';
      assert.match(applicableShotClauses(prompt, index + 1), /人物\/注視先を配置→.*首傾げ・表情保持.*可視瞳を指定先へ.*独立Cameraで立体投影→画風/,
        'repeated compaction must retain scene gaze before independent projection and style');
      assert.match(shot, /(?:Face\/body\/setting|facial planes, body and setting) share projection/i,
        `panel ${index + 1}, ${promptMaxChars}: preserve local face/body/setting projection`);
      assert.match(shot, /(?:no|not) frontal faces? on (?:a )?tilted (?:BG|background)/i);
      assert.match(shot, /(?:keep|preserve) scripted height\/pitch\/proportions/i);
      assert.doesNotMatch(shot, /floor-level|extreme|steep|\d+\s*(?:degrees|°)/i);
    }
  }
});

test('scene-first shot cues preserve authored side glances, raised targets, head tilt and invisible eyes', () => {
  const cameras = ['左前の高い位置から見下ろす中景', '右前の低所から見上げる広角', '背中側の高所から俯瞰する引き', '左上から手元だけを見下ろす接写'];
  const actions = [
    'SpeakerA keeps the torso forward, neck and face tilted left, smiling softly while only the eyes glance right toward SpeakerB.',
    'SpeakerB leans backward and looks up at the hanging lamp, with raised eyebrows and an open mouth.',
    'SpeakerA is seen only from behind: the rear head and relaxed shoulders remain visible, while the face and eyes stay hidden.',
    'Only SpeakerB\'s hands holding the cup appear in this crop; the head and eyes remain outside the frame.',
  ];
  let c=0,a=0;
  const scenario=FOUR_PANEL_SCENARIO.replace(/\[Camera: [^\]]+\]/g,()=>`[Camera: ${cameras[c++]}]`)
    .replace(/^Action: .+$/gm,()=>`Action: ${actions[a++]}`);
  for (const providerFamily of ['chatgpt','gemini']) {
    const prompt=buildMangaPrompt({scenario,castList:CAST_LIST,providerFamily,colorMode:'color',promptMaxChars:32000});
    const panels=prompt.split(/^## Panel \d+\s*$/m).slice(1);
    for (const [i,panel] of panels.entries()) {
      const actualCamera=panel.match(/^Camera: (.+)$/m)?.[1];
      assert.ok([cameras[i],`${cameras[i]}; (NEVER draw text of camera names:3.0).`].includes(actualCamera));
      assert.ok(panel.includes(actions[i]));
      const shot=applicableShotClauses(prompt,i+1);
      assert.match(shot,/指定の体\/首\/顔向き・首傾げ・表情保持、注視先明示かつ顔向き未指定.*可視瞳を指定先へ/);
      assert.doesNotMatch(shot,/全員.*正対|必ず下向|顔を対象へ回す/);
    }
  }
  for (const action of ['SpeakerA closes both eyes and smiles quietly.', 'SpeakerA rests without a stated gaze target.', 'SpeakerA explicitly looks at the reader and addresses the camera.',
    'SpeakerA looks at the instrument on the desk without a stated face direction.',
    'SpeakerA keeps the face raised while only the eyes look down toward the instrument.']) {
    const variant=scenario.replace(actions[0],action);
    const prompt=buildMangaPrompt({scenario:variant,castList:CAST_LIST,providerFamily:'chatgpt',colorMode:'color',promptMaxChars:32000});
    assert.ok(prompt.includes(action));
    assert.match(prompt,/対象未指定\/閉眼\/明示の読者目線保持/);
    assert.match(prompt,/注視先明示かつ顔向き未指定/);
    assert.match(prompt,/目だけの移動\/顔上げ/);
  }
});

test('sharing preserves complete multiline page contracts before the first generated panel', () => {
  const header = 'MOSAIC PROTECTED CAST: ["Actor A"]\nNever automatically mosaic registered cast.\n\nNormal four-panel page contract.\nKeep all dialogue and boundaries.\n';
  const panels = [1, 2].map(number => `## Panel ${number}\nCamera: 俯瞰\n${getPanelShotExecution('俯瞰')}\nAction: 台詞も対象も保持。`).join('\n');
  const shared = sharePanelShotExecution(header + panels);
  assert.ok(shared.startsWith(header), 'shared clauses must not split a preceding multi-line contract');
  assert.match(shared.slice(header.length), /^SHOT P1\/P2 ONLY:/);
  assert.equal(sharePanelShotExecution(shared), shared);
});

test('shared shot clauses apply only to their original panels and never rewrite authored content',()=>{
  const cameras=['俯瞰・広角','低い位置から水平に撮る中景','アオリ・望遠','中景、目線指定なし'];
  const header='Normal four-panel page header.';
  const prompt=header+'\n'+cameras.map((camera,i)=>`## Panel ${i+1}\nCamera: ${camera}\n${getPanelShotExecution(camera)}\nAction: 原文の首傾げ/表情は保持する。`).join('\n');
  const shared=sharePanelShotExecution(prompt);
  assert.equal(shared.split('\n')[0],header,'sharing must preserve the page header as the first line');
  assert.match(shared,/^SHOT P1\/P3 ONLY: 人物\/注視先を配置→/m);
  assert.doesNotMatch(shared,/^SHOT P[^\n]*(?:P2|P4)[^\n]*ONLY:/m);
  for(const [i,camera] of cameras.entries()) {
    assert.ok(shared.includes(`## Panel ${i+1}\nCamera: ${camera}\n`));
    const panel=shared.split(`## Panel ${i+1}\n`)[1].split('## Panel ')[0];
    assert.ok(panel.includes('Action: 原文の首傾げ/表情は保持する。'));
    if(i===1||i===3) assert.doesNotMatch(panel,/人物\/注視先を配置/);
  }
  const prose='Action: SHOT EXECUTION: user-authored clause; preserve it.\nSHOT EXECUTION: user-authored standalone line.';
  assert.equal(sharePanelShotExecution(prose),prose);
  assert.equal(sharePanelShotExecution(shared),shared,'sharing is idempotent');
});

test('soft-target sharing retains exact shot scope below the API ceiling', () => {
  const cameras = ['左前の高所から見下ろす広角', '低い位置から水平に撮る中景', '右前の低所から見上げる望遠', '中景、目線指定なし'];
  let index = 0;
  const scenario = FOUR_PANEL_SCENARIO.replace(/\[Camera: [^\]]+\]/g, () => `[Camera: ${cameras[index++]}]`);
  const prompt = buildMangaPrompt({ scenario, castList: CAST_LIST, providerFamily: 'chatgpt',
    colorMode: 'color', cinematicTechniques: false, promptMaxChars: 32000 });
  assert.ok(prompt.length > 15000 && prompt.length < 32000, 'exercise soft sharing without a hard-cap failure');
  assert.match(prompt, /^SHOT P1\/P3 ONLY: 人物\/注視先を配置→/m);
  for (const n of [1, 3]) assert.match(applicableShotClauses(prompt, n), /注視先明示かつ顔向き未指定/);
  for (const n of [2, 4]) assert.doesNotMatch(applicableShotClauses(prompt, n), /注視先明示かつ顔向き未指定/);
  for (const camera of cameras) assert.ok(prompt.includes(`Camera: ${camera}`));
  for (const [, action] of scenario.matchAll(/^Action: (.+)$/gm)) assert.ok(prompt.includes(action));
  assert.equal((prompt.match(/人物\/注視先を配置→/g) || []).length, 1);
});

test('style normalization inverts only exact generated head cues and preserves changed or authored clauses', () => {
  const shot = getPanelShotExecution('俯瞰');
  const authored = shot.split('; ')[0];
  const original = `Normal header.\n## Panel 1\nCamera: 俯瞰\n${shot}\nAction: ${authored}`;
  const normalized = restoreReviewedShotExecution(original);
  assert.match(normalized, /SHOT EXECUTION: 人物\/注視先を配置→指定の体\/首\/顔向き・首傾げ・表情保持、可視の瞳/);
  assert.ok(normalized.includes(`Action: ${authored}`), 'authored matching prose cannot be normalized away');
  const changed = original.replace('顔/対象の遮蔽保持', '顔/対象の遮蔽を無視');
  assert.match(restoreReviewedShotExecution(changed), /顔\/対象の遮蔽を無視/);
  const unknown = `SHOT P1/P3 ONLY: unrelated new rule.\n${original}`;
  assert.ok(restoreReviewedShotExecution(unknown).startsWith('SHOT P1/P3 ONLY: unrelated new rule.\n'));
  const rearShot = getPanelShotExecution('部屋の左後方から俯瞰');
  const rear = `## Panel 1\nCamera: 部屋の左後方から俯瞰\n${rearShot}\nAction: ${rearShot}`;
  const normalizedRear = restoreReviewedShotExecution(rear);
  assert.match(normalizedRear,/SHOT EXECUTION:.*背面指定の人物だけ背面/);
  assert.ok(normalizedRear.includes(`Action: ${rearShot}`));
  const changedRear = rear.replace('人物の指定向きを保持し', '人物の指定向きを破棄し');
  assert.match(restoreReviewedShotExecution(changedRear),/SHOT EXECUTION:.*人物の指定向きを破棄し/);
});

test('supporting actors retain physical scale and depth in both provider budgets', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const promptMaxChars of [24000, 32000]) {
      const prompt = buildMangaPrompt({ scenario: FOUR_PANEL_SCENARIO, castList: CAST_LIST, providerFamily, colorMode: 'color', promptMaxChars });
      assert.match(prompt, /supporting cast: lower visual emphasis, never miniature bodies|脇役縮小禁止/i);
      assert.match(prompt, /scale follows depth, occlusion and ground plane|遠近・遮蔽・接地に整合/i);
      assert.match(prompt, /preserve scripted size differences and chibi|指定体格差・ちび保持/i);
      assert.doesNotMatch(prompt, /supporting cast smaller\/lower contrast|support smaller\/lower-contrast/i);
    }
  }
});

test('unspecified staging never assigns a rear view or a head turn just to expose a face', () => {
  for (const compact of [false, true]) {
    const rear = getPanelCompositionAssist('[Camera: 俯瞰]', 3, { compact });
    assert.match(rear, /SCENE-DRIVEN AZIMUTH/);
    assert.doesNotMatch(rear, /REAR THREE-QUARTER/);
    assert.doesNotMatch(rear, /readable turned face|keep the face readable/);
    assert.match(rear, /scripted head turn/);
    const explicit = getPanelCompositionAssist('[Camera: 正面、顔のアップ]', 3, { compact });
    assert.match(explicit, /PRESERVE EXPLICIT AZIMUTH/);
    assert.doesNotMatch(explicit, /REAR THREE-QUARTER/);
  }
});

test('a long full-body shot keeps distance as well as body extent', () => {
  for (const camera of ['引きの全身、斜め俯瞰', 'high-angle long shot, full body']) {
    const result = getPanelShotExecution(camera);
    assert.match(result, /wide framing/);
    assert.match(result, /body extent.*continuous setting/);
    assert.doesNotMatch(result, /half the panel height/);
    assert.match(result, /head-to-feet/);
  }
  for (const camera of ['広角の顔のアップ', 'wide-angle close-up', '全身寄り']) {
    assert.doesNotMatch(getPanelShotExecution(camera), /half the panel height|wide framing/);
  }
});

test('both provider prompts keep shot scale ahead of facial readability after compaction', () => {
  const scenario = FOUR_PANEL_SCENARIO.replace('[Camera: Over The Shoulder]', '[Camera: 引きの全身、斜め俯瞰]');
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({ scenario, castList: CAST_LIST, providerFamily, colorMode: 'color' });
    assert.match(prompt, /body extent.*continuous setting|body extent\/setting show distance/);
    assert.match(prompt, providerFamily === 'chatgpt'
      ? /keep shot scale\/elevation\/camera side\/head turn/i
      : /readability never changes shot scale/i);
    assert.match(prompt, /explicit scale.*wins/i);
    assert.equal((prompt.match(/wide framing/g) || []).length, 1);
    assert.match(prompt, /Please check this revision/);
  }
});

test('looking up keeps the low camera relative to deformed actors and projects the face too', () => {
  for (const camera of ['低い位置から見上げる中景', 'low-angle medium shot', '床近くから見上げる引き']) {
    const shot = getPanelShotExecution(camera);
    assert.match(shot, /camera below faces including crouched\/chibi/);
    assert.match(shot, /facial planes.*body.*setting.*projection/);
    assert.match(shot, /not frontal faces on a tilted background/);
    assert.doesNotMatch(shot, /head-to-feet|BOTH shoes|half the panel height/);
  }
  const horizontal = getPanelShotExecution('低い位置から水平に撮る中景');
  assert.match(horizontal, /horizontal aim/);
  assert.doesNotMatch(horizontal, /look up|chin\/jaw undersides/);
  assert.doesNotMatch(getPanelShotExecution('目の高さ、正面、顔のアップ'), /below faces|look up/);
});

test('initial scenario and both image paths reserve room for body acting without fixed actor scale', () => {
  const direction = buildNormalScenarioPrompt();
  assert.match(direction, /身体が入る範囲/);
  assert.match(direction, /仰角.*顔.*身体.*背景/);
  assert.doesNotMatch(direction, /コマ高の半分/);
  const directed = FOUR_PANEL_SCENARIO.replace('[Camera: ローアングル]', '[Camera: 膝の高さから見上げる引き、人物の頭から膝まで、手前の人物を大きく]');
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({ scenario: directed, castList: CAST_LIST, providerFamily, colorMode: 'color' });
    assert.match(prompt, /手前の人物を大きく/);
    assert.match(prompt, /body action.*panel height/);
    assert.match(prompt, providerFamily === 'chatgpt'
      ? /keep shot scale\/elevation\/camera side\/head turn/
      : /readability never changes shot scale or elevation/);
    assert.doesNotMatch(prompt, /half the panel height/);
    assert.match(prompt, /The deadline moved forward/);
  }
});

test('explicit floor-level upward shots retain floor height instead of the generic low-angle branch', () => {
  for (const camera of ['床近く、斜めに見上げるワイドショット', 'ground-level low-angle close-up']) {
    const result = getPanelShotExecution(camera);
    assert.match(result, /floor-level camera below faces/);
    assert.match(result, /prop undersides/);
    assert.doesNotMatch(result, /head-to-feet/);
  }
  assert.doesNotMatch(getPanelShotExecution('胸の高さから見上げる顔のアップ'), /floor-level/);
  assert.match(getPanelShotExecution('床近くから水平に撮る'), /horizontal aim/);
});

test('camera height prose receives the same projection cues as named high and low angles', () => {
  for (const camera of ['肩越しにやや高く撮る中景', '右後方の高めから撮影', '左後方から高めに撮る広角', '高めに撮影する中景', '顔より高い位置から撮る', '目の高さより高い位置から撮る', '少し上からの中景']) {
    assert.equal(classifyCameraElevation(camera), 'high', camera);
    assert.match(getPanelShotExecution(camera), /look down.*head\/shoulder tops/, camera);
  }
  for (const camera of ['左前の低めから撮る中景', '右前から低めに撮る望遠接写', '低めに撮影する中景', '斜め前から低く撮影する', '目線より低い位置からの広角', '目の高さより低い位置から撮る', '机上すれすれから撮る']) {
    assert.equal(classifyCameraElevation(camera), 'low', camera);
    assert.match(getPanelShotExecution(camera), /below faces.*look up/, camera);
  }
});

test('camera elevation classification does not turn subject height into a camera angle', () => {
  for (const camera of ['中景。主人公は背が高い', '肩越し。顔を高く上げる', '正面。低めの椅子に座る', '中景。頭が高い位置に見える', 'ワイド。低い位置の手を見せる']) {
    assert.equal(classifyCameraElevation(camera), 'unspecified', camera);
    assert.doesNotMatch(getPanelShotExecution(camera), /look down|look up|below faces/, camera);
  }
  for (const camera of ['低い机の高さでアイレベルの中景', '床近く、座った人物の目の高さから撮る', 'eye-level shot from a low platform']) {
    assert.equal(classifyCameraElevation(camera), 'eye', camera);
    assert.doesNotMatch(getPanelShotExecution(camera), /look down|look up|below faces/, camera);
  }
  assert.equal(classifyCameraElevation('俯瞰、アイレベル禁止'), 'high');
  assert.equal(classifyCameraElevation('low angle, not eye-level'), 'low');
});

test('relative lateral camera height remains distinct from an actor looking up or down', () => {
  for (const camera of ['右側面から低めの斜め寄り', '机の高さより低い左前からの中景']) {
    assert.equal(classifyCameraElevation(camera), 'low', camera);
    assert.match(getPanelShotExecution(camera), /low camera below faces.*look up/, camera);
  }
  for (const camera of ['中景。主人公が相手を見下ろす', '中景、相手は天井を見上げる']) {
    assert.equal(classifyCameraElevation(camera), 'unspecified', camera);
    assert.doesNotMatch(getPanelShotExecution(camera), /look down|look up/, camera);
  }
  assert.equal(classifyCameraElevation('カメラが人物を見下ろす'), 'high');
  assert.equal(classifyCameraElevation('俯瞰。人物が相手を見下ろす'), 'high');
  assert.equal(classifyCameraElevation('低い位置から人物が相手を見下ろす様子を撮る'), 'low');
});

test('camera-relative English placement and positive pitch angles retain their elevation', () => {
  for (const camera of ['camera above the actors', 'camera positioned above eye level', '俯角30度の中景', '俯角: 0.5°']) {
    assert.equal(classifyCameraElevation(camera), 'high', camera);
    assert.match(getPanelShotExecution(camera), /look down/, camera);
  }
  for (const camera of ['camera below the faces', 'camera placed below eye-level', '仰角25度の中景', '仰角: 0.5°']) {
    assert.equal(classifyCameraElevation(camera), 'low', camera);
    assert.match(getPanelShotExecution(camera), /look up/, camera);
  }
  for (const camera of ['her head is above the camera', 'hands below eye level', '仰角0度', '俯角0°', '仰角-20度']) {
    assert.equal(classifyCameraElevation(camera), 'unspecified', camera);
  }
});

test('final camera contracts prevent flattening faces and bodies with specified elevation', () => {
  for (const lock of [MANGA_COMPOSITION_VARIETY_LOCK, MANGA_COMPOSITION_VARIETY_LOCK_COMPACT]) {
    assert.match(lock, /never flatten.*(?:high\/low|elevation)/i);
    assert.match(lock, /face.*bod.*setting.*projection/i);
  }
});

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
  ({
    getPanelCompositionAssist,
    getPanelShotExecution,
    sharePanelShotExecution,
    classifyCameraElevation,
    isFisheyeCamera,
    isPullbackShot,
    MANGA_COMPOSITION_VARIETY_LOCK,
    MANGA_COMPOSITION_VARIETY_LOCK_COMPACT,
    MANGA_GESTURE_VARIETY_LOCK,
  } = await server.ssrLoadModule('/src/lib/composition-variety.js'));
  ({ cinematicCompositionMap, cameraAngles } = await server.ssrLoadModule('/src/lib/constants.js'));
  ({ OPENAI_COLOR_GEKIGA_STYLE: openAIColorGekigaStyle } = await server.ssrLoadModule('/src/lib/panel-utils.js'));
});

after(async () => {
  await server?.close();
});

const CAST_LIST = `
## SpeakerA
- short dark hair, no glasses
## SpeakerB
- long light hair, glasses
`;

const FOUR_PANEL_SCENARIO = `
## Title: Deadline Meeting
Location: editorial room
Outfit: office casual

[1コマ目: 起]
[EMOTION: NORMAL]
[Camera: Over The Shoulder]
Action: SpeakerA shows a marked-up page to SpeakerB.
SpeakerA「Please check this revision.」

[2コマ目: 承]
[EMOTION: IMPACT]
[Camera: ローアングル]
Action: SpeakerB stands and presses a document onto the table with both hands.
SpeakerB「The deadline moved forward.」

[3コマ目: 転]
[EMOTION: NORMAL]
[Camera: 俯瞰]
Action: SpeakerA compares two pages while SpeakerB points at the schedule.
SpeakerA「We need another plan.」

[4コマ目: 結]
[EMOTION: CHIBI_GAG]
[Camera: ダッチアングル]
Action: SpeakerB drops into a chair while SpeakerA gathers the pages.
SpeakerB「Then we start now.」
`;

const buildFinalPrompt = (providerFamily) => buildMangaPrompt({
  scenario: FOUR_PANEL_SCENARIO,
  castList: CAST_LIST,
  colorMode: 'color',
  providerFamily,
  punchlineType: 'Auto',
  systemVersion: 'v5.2.7-test'
});

const buildNormalScenarioPrompt = (options = {}) => getScenarioPrompt({
  randomCategory: 'workplace',
  targetDate: '2026-08-10',
  inputMode: 'manual',
  manualTopic: 'An editorial team discovers that the deadline moved forward.',
  newsContext: '',
  searchTopicKeywords: '',
  bg360Image: null,
  bg360Analysis: null,
  bg360Enabled: false,
  customLocation: '',
  customOutfit: '',
  ragReactions: '',
  punchlineType: 'Auto',
  comedyTone: 'standard',
  styleJson: null,
  ...options
});

test('STEP2 plans a page of motivated contrasting shots across independent camera axes', () => {
  const prompt = buildNormalScenarioPrompt();
  assert.match(prompt, /4コマ全体.*比較/);
  assert.match(prompt, /アオリ.*反復.*見せ場/);
  assert.match(prompt, /魚眼.*(?:禁止|使わない)/);
  assert.doesNotMatch(prompt, /選択肢:[^\n]*フィッシュアイ/);
  assert.match(prompt, /ダッチ.*ロール|ロール.*ダッチ/);
  assert.match(prompt, /各コマ.*役割.*Camera/);
  assert.match(prompt, /寄り・中景・引き/);
  assert.match(prompt, /全員の足先.*必須にしない/);
  assert.match(prompt, /寄りだけ.*意図/);
});

test('a pullback reveals setting and distances without imposing feet or confusing a wide lens with framing', () => {
  const wide = getPanelShotExecution('目の高さから引きの全景、人物を小さく配置');
  assert.match(wide, /continuous setting.*actor distances/);
  assert.match(wide, /wide framing/);
  assert.match(wide, /not a bust portrait/);
  assert.doesNotMatch(wide, /BOTH shoes|head-to-feet|look up/);
  assert.doesNotMatch(getPanelShotExecution('wide-angle close-up on a face'), /continuous setting/);
  assert.match(getPanelShotExecution('左前斜め上方から少し引いた広角'), /receding actors smaller/);
});

test('Japanese Dutch and fisheye specify observable separate projection cues', () => {
  assert.match(getPanelShotExecution('目の高さで右側面、望遠、ダッチアングル'), /ロール:/);
  assert.match(getPanelShotExecution('目の高さで右側面、望遠、ダッチアングル'), /compressed depth/);
  assert.doesNotMatch(getPanelShotExecution('目の高さで右側面、望遠、ダッチアングル'), /look up|look down/);
  assert.match(getPanelShotExecution('真上から魚眼レンズで見下ろす全景'), /curved.*edges/);
  assert.doesNotMatch(getPanelShotExecution('真上から広角で見下ろす全景'), /curved.*edges/);
});

test('measured camera height is not floor-level and mixed crops stay subject-specific', () => {
  const shot = getPanelShotExecution('ローアングル。床から80センチ、仰角18度。手前の人物は腰まで、奥の動物は全身。');
  assert.match(shot, /low camera/);
  assert.doesNotMatch(shot, /floor-level camera/);
  assert.match(shot, /全身指定の被写体のみ/);
  assert.match(shot, /他の指定クロップは保持/);
  assert.match(getPanelShotExecution('床すれすれから見上げる全身'), /floor-level camera/);
  assert.match(getPanelShotExecution('床から見上げる全身'), /floor-level camera/);
});

test('automatic camera fallbacks keep wide-angle options without fisheye', () => {
  assert.ok(cameraAngles.some(camera => /wide.angle/i.test(camera)));
  for (const camera of cameraAngles) assert.doesNotMatch(camera, /fish[ -]?eye|魚眼|フィッシュアイ|barrel distortion|spherical.*distortion/i);
});

test('negative fisheye instructions do not add fisheye projection to ordinary wide angles', () => {
  for (const camera of ['俯瞰の広角、魚眼禁止', 'アオリの広角、魚眼なし', '俯瞰、フィッシュアイではなく広角', '俯瞰の広角、魚眼は使用しない', '俯瞰の超広角、魚眼は使用しない', 'high-angle wide-angle shot, no fisheye', 'low-angle wide-angle shot without fish-eye distortion', 'high-angle wide-angle shot, do not use fisheye']) {
    const execution = getPanelShotExecution(camera);
    assert.match(execution, /near\/far scale contrast/, camera);
    assert.doesNotMatch(execution, /fisheye:|curved outer edges|radial warp/, camera);
  }
});

for (const [camera, elevation] of [
  ['低い位置から見上げる。魚眼・アイレベルは使わない。', 'low'],
  ['高い位置から見下ろす。魚眼と広角は使わない。', 'high'],
  ['低い位置から見上げる。魚眼、広角、アイレベルは使わない。', 'low'],
  ['低い位置から見上げる。魚眼・広角禁止。', 'low'],
  ['低い位置から見上げる。広角、アイレベル、魚眼を使わない。', 'low'],
]) {
  test(`enumerated camera prohibitions preserve the affirmative elevation: ${camera}`, () => {
    const shot = getPanelShotExecution(camera);
    assert.deepEqual({
      fisheye: isFisheyeCamera(camera),
      elevation: classifyCameraElevation(camera),
      fisheyeProjection: /fisheye:|curved outer edges|radial warp/.test(shot),
      wideProjection: /near\/far scale contrast/.test(shot),
      elevationProjection: (elevation === 'low' ? /low camera below faces.*look up/ : /look down.*head\/shoulder tops/).test(shot),
    }, { fisheye: false, elevation, fisheyeProjection: false, wideProjection: false, elevationProjection: true });
  });
}

test('enumerated camera prohibitions do not remove an affirmative wide lens outside the list', () => {
  const camera = '低い位置から見上げる広角。魚眼・アイレベルは使わない。';
  const shot = getPanelShotExecution(camera);
  assert.equal(isFisheyeCamera(camera), false);
  assert.equal(classifyCameraElevation(camera), 'low');
  assert.match(shot, /low camera below faces.*look up/);
  assert.match(shot, /near\/far scale contrast/);
  assert.doesNotMatch(shot, /fisheye:|curved outer edges|radial warp/);
});

for (const camera of ['low-angle wide-angle, no fisheye or eye-level', 'low-angle wide-angle without eye-level or fisheye']) {
  test(`English camera prohibition lists retain affirmative elevation and lens: ${camera}`, () => {
    assert.equal(isFisheyeCamera(camera), false);
    assert.equal(classifyCameraElevation(camera), 'low');
    assert.match(getPanelShotExecution(camera), /low camera below faces.*near\/far scale contrast/);
    assert.doesNotMatch(getPanelShotExecution(camera), /fisheye:|radial warp/);
  });
}

test('direct pullback classification agrees with execution for prohibited and affirmative framing', () => {
  for (const camera of ['全景禁止。', 'ズームアウトは使わない。', '全景・遠景は禁止。']) {
    assert.equal(isPullbackShot(camera), false, camera);
    assert.doesNotMatch(getPanelShotExecution(camera), /wide framing/, camera);
  }
  for (const camera of ['全景。魚眼・アイレベルは使わない。', '全身の引き。接写禁止。']) {
    assert.equal(isPullbackShot(camera), true, camera);
    assert.match(getPanelShotExecution(camera), /wide framing/, camera);
  }
  assert.equal(isPullbackShot('広角の顔のアップ。'), false);
});

test('single camera prohibitions leave later affirmative elevation lens and framing cues', () => {
  assert.equal(classifyCameraElevation('俯瞰禁止。アオリ。'), 'low');
  assert.equal(classifyCameraElevation('アオリ禁止。俯瞰。'), 'high');
  assert.doesNotMatch(getPanelShotExecution('望遠禁止。広角。'), /compressed depth/);
  assert.match(getPanelShotExecution('望遠禁止。広角。'), /near\/far scale contrast/);
  assert.doesNotMatch(getPanelShotExecution('ダッチ禁止。顔のアップ。'), /ロール:/);
  assert.match(getPanelShotExecution('全身禁止。顔のアップ。'), /tight crop/);
  assert.doesNotMatch(getPanelShotExecution('全身禁止。顔のアップ。'), /head-to-feet/);
});

test('prohibited full-body additions cannot override a close crop, while affirmative full-body subjects remain', () => {
  const cameras = [
    '台の右上方から15度見下ろす接写。直前の中景からズームインし、ヒカリの目元、自然につながる右手、水平器の中央を同じ近景に収める。画角外の全身を追加しない。',
    '俯瞰の接写。全身を描かない。',
    '手元のアップ。全身は描写しない。',
    '望遠の接写。全身や全景を追加しない。',
  ];
  for (const compact of [false, true]) {
    for (const camera of cameras) {
      const execution = getPanelShotExecution(camera, { compact });
      assert.match(execution, /tight crop|主対象を寄りで切取/, camera);
      assert.doesNotMatch(execution, /head-to-feet|BOTH shoes|両靴|wide framing|引き:/, camera);
    }
    for (const camera of ['全身の引き。背景人物を追加しない。', '手前の全身を追加しない。奥の人物の全身を描く。', '接写を描かない。人物の全身を収める。']) {
      assert.match(getPanelShotExecution(camera, { compact }), /head-to-feet|両靴/, camera);
    }
  }
});

test('English camera prohibitions are bounded to named terms and preserve later affirmative clauses', () => {
  const cases = [
    ['high-angle, no Dutch tilt', 'high', /ロール:/],
    ['no high-angle or Dutch tilt; low-angle telephoto', 'low', /look down|ロール:/],
    ['without fisheye, eye-level or Dutch tilt, high-angle telephoto', 'high', /fisheye:|ロール:/],
    ['avoid low-angle and wide-angle; high-angle close-up', 'high', /look up|near\/far scale contrast/],
    ['no telephoto; low-angle wide-angle', 'low', /compressed depth/],
    ['non-eye-level, high-angle; non-Dutch tilt', 'high', /ロール:/],
    ['ダッチアングルなし。俯瞰・望遠', 'high', /ロール:/],
  ];
  for (const [camera, elevation, absent] of cases) {
    assert.equal(classifyCameraElevation(camera), elevation, camera);
    assert.doesNotMatch(getPanelShotExecution(camera), absent, camera);
  }
  assert.match(getPanelShotExecution(cases[2][0]), /look down.*compressed depth/);
  assert.match(getPanelShotExecution('no fisheye or eye-level, Dutch angle, low-angle'), /look up.*ロール:/);
  assert.match(getPanelShotExecution('俯瞰禁止。アオリ、ダッチアングル。'), /look up.*ロール:/);
});

test('actor head tilt is not a camera roll while explicit scene tilt remains effective', () => {
  for (const camera of ['medium shot; her head tilts to the left', 'close-up, head tilt', '高所からの中景。人物の顔の傾きを見せる', '中景、首の傾き']) {
    assert.doesNotMatch(getPanelShotExecution(camera), /ロール:/, camera);
  }
  for (const camera of ['medium shot, camera tilt', 'tilted scene axes', 'Dutch tilt; her head tilts to the left', 'ダッチアングル、人物の顔の傾きを保つ']) {
    assert.match(getPanelShotExecution(camera), /ロール:/, camera);
  }
});

test('horizontal frame or prop edges do not change the pitch of a low camera', () => {
  for (const camera of ['低い位置から20度見上げる。水平のコマ枠は保つ', 'low-angle; horizontal panel borders', 'low-angle, horizontal table edges', '床近くから見上げる。紙を水平に保つ']) {
    assert.match(getPanelShotExecution(camera), /look up.*facial planes/, camera);
    assert.doesNotMatch(getPanelShotExecution(camera), /keep horizontal aim/, camera);
  }
  for (const camera of ['低い位置から水平に撮る', 'low-angle camera, horizontal aim', '低い位置でカメラは水平を保つ']) {
    assert.match(getPanelShotExecution(camera), /keep horizontal aim/, camera);
    assert.doesNotMatch(getPanelShotExecution(camera), /look up/, camera);
  }
});

test('locative camera height accepts camera placement but not actors or objects placed high or low', () => {
  for (const camera of ['低い位置で水平に撮る', '低めの位置で、カメラを構える', '低い撮影位置で撮影']) {
    assert.equal(classifyCameraElevation(camera), 'low', camera);
  }
  for (const camera of ['高い位置で撮る', '高めの位置でカメラを構える', '高い撮影位置で捉える']) {
    assert.equal(classifyCameraElevation(camera), 'high', camera);
  }
  for (const camera of ['中景。人物が低い位置で箱を持つ', '中景。高い位置で手を振る人物', '低い位置の棚の上で箱が水平', '高い位置で看板を固定する']) {
    assert.equal(classifyCameraElevation(camera), 'unspecified', camera);
  }
  assert.equal(classifyCameraElevation('低い位置でカメラを構え、座った人のアイレベル'), 'eye');
});

test('near-profile orientation does not turn a medium shot into a close crop', () => {
  for (const camera of ['望遠で圧縮した中景。二人とも横顔寄り。', '望遠の中景。二人とも横顔寄りに配置する', '中景、人物は後ろ姿寄り', '右側面寄りからの中景']) {
    assert.doesNotMatch(getPanelShotExecution(camera), /tight crop/, camera);
    assert.doesNotMatch(getPanelShotExecution(camera, { compact: true }), /寄りで切取/, camera);
  }
  for (const camera of ['横顔に寄る接写', '横顔寄りに配置し、目元をズームイン', '人物への寄りのショット']) {
    assert.match(getPanelShotExecution(camera), /tight crop/, camera);
  }
});

test('compact shot execution retains observable geometry without inventing a stronger shot', () => {
  const shot = camera => getPanelShotExecution(camera, { compact: true });
  assert.equal(shot('中景。人物が相手を見下ろす'), '');
  assert.match(shot('やや高めから撮る中景'), /頭\/肩の上面.*胴の短縮/);
  assert.match(shot('やや高めから撮る中景'), /指定角を弱めず強めない/);
  assert.match(shot('低い位置から水平に撮る中景'), /水平.*低い地平線/);
  assert.doesNotMatch(shot('低い位置から水平に撮る中景'), /見上げ|顎.*下面/);
  assert.match(shot('右後方からの広角接写'), /主対象を寄りで切取.*背面.*距離\/切取り保持/);
  assert.doesNotMatch(shot('右後方からの広角接写'), /全身|両靴|俯瞰:|アオリ:/);
  assert.match(shot('俯瞰、望遠、ダッチアングル'), /遠い撮影位置.*長焦点.*奥行圧縮/);
  assert.match(shot('俯瞰、望遠、ダッチアングル'), /場面の鉛直\/水平.*光軸回り/);
  assert.doesNotMatch(shot('俯瞰、望遠、ダッチアングルなし'), /ロール:|光軸回り/);
  for (const camera of ['俯瞰、望遠、ダッチアングル', '床近くから水平に撮る', '右後方の全身引き']) {
    assert.equal(getPanelShotExecution(camera), getPanelShotExecution(camera, { compact: false }));
  }
});

test('affirmative fisheye and eye-level directives retain their existing interpretation', () => {
  const fisheye = '低い位置から見上げる魚眼。';
  assert.equal(isFisheyeCamera(fisheye), true);
  assert.equal(classifyCameraElevation(fisheye), 'low');
  assert.match(getPanelShotExecution(fisheye), /low camera below faces.*fisheye: curved outer edges, radial warp/);
  const eyeLevel = 'アイレベルの正面。';
  assert.equal(isFisheyeCamera(eyeLevel), false);
  assert.equal(classifyCameraElevation(eyeLevel), 'eye');
  assert.doesNotMatch(getPanelShotExecution(eyeLevel), /look up|look down|fisheye:/);
});

test('STEP2 designs continuous relational staging instead of directing every listener toward one speaker', () => {
  const prompt = buildNormalScenarioPrompt();
  assert.match(prompt, /前のコマ.*次のコマ|直前の動作.*次のコマ/u);
  assert.match(prompt, /前景.*中景.*後景|奥行き.*位置関係/u);
  assert.match(prompt, /働きかけ.*受け手.*反応|相手の行動.*次の動作/u);
  assert.match(prompt, /異なる.*視線.*反応|視線.*演技.*描き分け/u);
  assert.doesNotMatch(prompt, /無言のリアクション役も現在の話者を見る/u);
});

test('STEP2 preserves scene relationships without freezing camera, movement or the visible cast', () => {
  for (const scenarioMode of ['four-panel', 'experimental-manga']) {
    const prompt = buildNormalScenarioPrompt({ scenarioMode });
    assert.match(prompt, /隣接.*前後.*向かい.*席位置/u);
    assert.match(prompt, /移動.*転換.*根拠なく.*入れ替え/u);
    assert.match(prompt, /画面上の左右.*固定しない/u);
    assert.match(prompt, /状況: \(場面内の人物・物の相対関係と変化、そのCamera投影/u);
    assert.match(prompt, /最後に明示された.*人物・物.*関係.*接写.*遮蔽.*画面外/u);
    assert.match(prompt, /物の側・端.*画面左右.*区別/u);
    assert.match(prompt, /人物の移動・物の回転・場面転換.*更新/u);
    assert.match(prompt, /未指定・曖昧.*創作.*固定しない/u);
    for (const camera of ['俯瞰', 'アオリ', '切り返し', 'アップ', '望遠', '奥行圧縮', '寄り引き', '遮蔽']) assert.ok(prompt.includes(camera), camera);
    assert.match(prompt, /自然な移動.*許容/u);
    assert.match(prompt, /必要な人物.*選び.*全員.*横一列.*しない/u);
  }
});

test('panel composition helper preserves explicit azimuth and derives missing side from the scene', () => {
  assert.match(
    getPanelCompositionAssist('[Camera: Over The Shoulder]', 1),
    /PRESERVE EXPLICIT AZIMUTH/i
  );
  assert.match(
    getPanelCompositionAssist('[Camera: ローアングル]', 2),
    /SCENE-DRIVEN AZIMUTH/i
  );
  assert.match(
    getPanelCompositionAssist('[Camera: 俯瞰]', 3),
    /SCENE-DRIVEN AZIMUTH/i
  );
  assert.match(
    getPanelCompositionAssist('[Camera: ダッチアングル]', 4),
    /SCENE-DRIVEN AZIMUTH/i
  );
  assert.match(
    getPanelCompositionAssist(
      '[Camera: ローアングル気味のパース — テーブル越しに人物が立ち上がる勢いと書類の動きが強調される構図。]',
      2
    ),
    /SCENE-DRIVEN AZIMUTH/i
  );
});

test('actor hand directions are not mistaken for a specified camera azimuth', () => {
  assert.match(getPanelCompositionAssist('[Camera: 俯瞰]\n状況: SpeakerAが右手を上げる。', 2), /SCENE-DRIVEN AZIMUTH/);
  assert.match(getPanelCompositionAssist('[Camera: 左前斜めから撮る]\n状況: SpeakerAが右手を上げる。', 2), /PRESERVE EXPLICIT AZIMUTH/);
});

test('diagonal camera instructions project visible near and far planes without overriding a frontal shot', () => {
  const oblique = getPanelShotExecution('書棚の低い位置から斜めに見上げる広角の中景');
  assert.match(oblique, /look up/i);
  assert.match(oblique, /near\/far.*body.*planes/i);
  assert.match(oblique, /receding setting edges\/floor planes/i);
  assert.doesNotMatch(oblique, /shelf/i);
  assert.match(oblique, /not a flat frontal lineup/i);

  const frontal = getPanelShotExecution('正面から斜めに見上げる固定ショット');
  assert.match(frontal, /look up/i);
  assert.doesNotMatch(frontal, /not a flat frontal lineup/i);

  const plain = getPanelShotExecution('低い位置から見上げる中景');
  assert.doesNotMatch(plain, /not a flat frontal lineup/i);
  assert.doesNotMatch(getPanelShotExecution('正面のダッチアングルで斜めに傾ける'), /not a flat frontal lineup/i);
});

test('a low-position ultra-wide camera stays physically below faces without inventing a full-body crop', () => {
  const shot = getPanelShotExecution('低所からの超広角。主役を手前、仲間を奥へ置く。');
  assert.match(shot, /low camera below faces/i);
  assert.match(shot, /prop undersides from below/i);
  assert.match(shot, /near\/far scale contrast/i);
  assert.doesNotMatch(shot, /head-to-feet|both shoes/i);

  const levelShot = getPanelShotExecution('低所から水平に撮る中景');
  assert.match(levelShot, /keep horizontal aim and a low horizon/i);
  assert.doesNotMatch(levelShot, /prop undersides from below/i);
});

test('relative low camera height is preserved without being rewritten to floor level', () => {
  const relative = getPanelShotExecution('左前斜めからの胸より低い位置、中景の広角');
  assert.match(relative, /low camera below faces/);
  assert.doesNotMatch(relative, /floor-level/);
  assert.match(getPanelShotExecution('床すれすれからの広角'), /floor-level camera below faces/);
  assert.doesNotMatch(getPanelShotExecution('正面の目の高さから撮る中景'), /low camera|floor-level|look up/);
});

test('explicit full-body framing outranks a nearby-view phrase without forcing full bodies on closeups', () => {
  for (const camera of [
    '床近くから見上げる全身寄りの構図。頭から足先まで入れる。',
    'full-body shot, camera zooms in to frame head to feet',
  ]) {
    const shot = getPanelShotExecution(camera);
    assert.match(shot, /head-to-feet inside panel/);
    assert.doesNotMatch(shot, /tight crop/);
  }
  const closeup = getPanelShotExecution('低い位置から見上げる顔の寄りの構図');
  assert.match(closeup, /tight crop/);
  assert.doesNotMatch(closeup, /head-to-feet|BOTH shoes/);
});

for (const camera of ['顔～胸の寄り。', '通常レンズの寄り。', '胸上を収める寄り。', '顔の寄り', '胸上を収める寄り、左前から']) {
  test(`Japanese standalone close framing executes a tight crop: ${camera}`, () => {
    const shot = getPanelShotExecution(camera);
    assert.match(shot, /tight crop on focal subject/);
    assert.doesNotMatch(shot, /wide framing|head-to-feet/);
  });
}

for (const lens of ['長焦点', '長い焦点距離']) {
  test(`Japanese long focal length executes telephoto depth: ${lens}`, () => {
    const shot = getPanelShotExecution(`左前の低めから${lens}で撮る中景。`);
    assert.match(shot, /distant camera \+ long focal length: compressed depth/);
    assert.match(shot, /background relatively larger\/closer/);
    assert.doesNotMatch(shot, /tight crop|wide framing|head-to-feet|near\/far scale contrast/);
  });
}

test('Japanese directional placement and physical contact do not imply a close crop', () => {
  for (const camera of ['右寄り', '左側面寄り', '正面寄り', '背後寄り。', '画面上方に寄せた', '二人が肩を寄せ合う中景。', '人物が隣の相手に寄り添う中景。']) {
    assert.doesNotMatch(getPanelShotExecution(camera), /tight crop/, camera);
  }
});

test('explicit full-body extent still outranks standalone Japanese close framing', () => {
  const shot = getPanelShotExecution('全身を頭から足先まで入れる。通常レンズの寄り。');
  assert.match(shot, /head-to-feet inside panel/);
  assert.doesNotMatch(shot, /tight crop/);
});

test('relative Japanese elevations project actor faces and setting together without a lens or crop override', () => {
  const low = getPanelShotExecution('左前の低めの位置から望遠の中景');
  assert.match(low, /low camera below faces/);
  assert.match(low, /chin\/jaw undersides/);
  assert.match(low, /body and setting share.*projection/);
  assert.match(low, /compressed depth/);
  assert.doesNotMatch(low, /floor-level|head-to-feet|near\/far scale contrast/);
  const high = getPanelShotExecution('右後方の高めの位置から広角で撮る');
  assert.match(high, /look down/);
  assert.match(high, /head\/shoulder tops/);
  assert.match(high, /actors and setting share.*projection/);
  const level = getPanelShotExecution('正面アイレベルで静止した対面ショット');
  assert.doesNotMatch(level, /look down|look up|below faces/);
});

test('an unnamed diagonal camera side follows action geometry while named sides stay fixed', () => {
  for (const compact of [false, true]) {
    const assisted = getPanelCompositionAssist('[Camera: 低い位置から斜めに見上げる中景]', 2, { compact });
    assert.match(assisted, /SCENE-DRIVEN AZIMUTH/i);
    assert.match(assisted, /Action.*contact.*gaze/i);
    assert.doesNotMatch(assisted, /near hand larger/i);
    assert.match(getPanelCompositionAssist('[Camera: 斜め上から見下ろす広角]', 3, { compact }), /SCENE-DRIVEN AZIMUTH/i);
    assert.match(getPanelCompositionAssist('[Camera: 左前斜めから見上げる中景]', 2, { compact }), /PRESERVE EXPLICIT AZIMUTH/i);
    assert.match(getPanelCompositionAssist('[Camera: 正面から斜めに見上げる中景]', 2, { compact }), /PRESERVE EXPLICIT AZIMUTH/i);
    assert.match(getPanelCompositionAssist('[Camera: 斜め後ろから見る中景]', 2, { compact }), /PRESERVE EXPLICIT AZIMUTH/i);
  }
  const scenario = FOUR_PANEL_SCENARIO.replace('[Camera: ローアングル]', '[Camera: 低い位置から斜めに見上げる中景]');
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({ scenario, castList: CAST_LIST, providerFamily, colorMode: 'color' });
    const panel2 = prompt.match(/## Panel 2[\s\S]*?(?=## Panel 3)/)?.[0] || '';
    assert.match(panel2, /COMPOSITION STAGING: SCENE-DRIVEN AZIMUTH/i);
  }
});

test('normal STEP2 generation requires non-eye-level design with user overrides and no numeric variety quotas', () => {
  const prompt = buildNormalScenarioPrompt();

  assert.match(prompt, /自動設計.*アイレベル.*禁止/);
  assert.match(prompt, /ユーザー.*明示.*アイレベル/);
  assert.match(prompt, /生成AI.*Camera.*ユーザー指定.*みなさない/);
  assert.match(prompt, /撮影高度.*仰俯角.*見える/);
  assert.doesNotMatch(prompt, /真正面は最大1コマ|最低3種類|固定巡回/);
  assert.match(prompt, /種類数.*ノルマ/);
  assert.match(prompt, /被写体に対する水平方位/);
  assert.match(prompt, /肩・腰・顔/);
  assert.match(prompt, /両手.*前後差/);
  assert.match(prompt, /参照画像.*ポーズ.*同一性資料/);
  assert.match(prompt, /物語の因果/);
  assert.match(prompt, /回数制限しない/);
  assert.match(prompt, /全身の誇張/);
});

test('strong perspective is reserved for a story beat and does not default to a foot thrust', () => {
  const scenarioPrompt = buildNormalScenarioPrompt();

  assert.match(scenarioPrompt, /足だけを手前へ大きく突き出す構図を既定にしない/);
  assert.match(scenarioPrompt, /手・顔・重要な小道具・環境の奥行き/);
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /foot thrust/i);
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /story-relevant focal form/i);

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildFinalPrompt(providerFamily);
    assert.match(prompt, /story-relevant focal form/i);
    assert.match(prompt, /foot thrust/i);
  }
});

test('hyper perspective does not encode the stock lens-facing hand pose', () => {
  const hyper = cinematicCompositionMap['Hyper Perspective'];

  assert.doesNotMatch(hyper, /reaching towards viewer|dynamic hand gesture/i);
  assert.match(hyper, /story-action depth axis/i);
  assert.match(hyper, /asymmetrical body axis/i);
});

test('scenario and final prompts vary the full camera signature and bind hands to story targets', () => {
  const scenarioPrompt = buildNormalScenarioPrompt();

  assert.doesNotMatch(scenarioPrompt, /手前に大きく顔があるキャラ.*奥で小さく驚くキャラ/);
  assert.match(scenarioPrompt, /撮影位置・水平方位・距離・レンズ感・被写体配置・奥行きの作り方/);
  assert.match(scenarioPrompt, /手のひら.*レンズ|レンズ.*手のひら/);
  assert.match(scenarioPrompt, /実際の接触対象/);

  assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /CAMERA SIGNATURE/i);
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /elevation.*azimuth.*framing.*lens.*blocking.*depth/i);
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /explicit repeated/i);
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK_COMPACT, /scripted front\/back\/left\/right camera side, crop and lens/i);
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK_COMPACT, /explicit frontal or repeated shots/i);
  assert.match(MANGA_GESTURE_VARIETY_LOCK, /LENS-FACING HAND/i);
  assert.match(MANGA_GESTURE_VARIETY_LOCK, /actual person, prop or surface/i);

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildFinalPrompt(providerFamily);
    assert.match(prompt, /MANGA CAMERA \/ POSE VARIETY LOCK/i);
    assert.match(prompt, /LENS-FACING HAND/i);
    assert.match(prompt, /actual person, prop or surface/i);
  }
});

test('an explicitly scripted lens-facing gesture remains verbatim', () => {
  const scenario = FOUR_PANEL_SCENARIO.replace(
    'Action: SpeakerB stands and presses a document onto the table with both hands.',
    'Action: SpeakerB turns to an in-story camera and opens her right palm directly toward its lens.',
  );

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario,
      castList: CAST_LIST,
      colorMode: 'color',
      providerFamily,
      punchlineType: 'Auto',
      systemVersion: 'v5.2.7-test',
    });
    assert.match(prompt, /opens her right palm directly toward its lens/i);
  }
});

test('both final-prompt families retain the page lock and four panel staging assists', () => {
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /no numeric variety quota/i);
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /quiet.*repeated/i);

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildFinalPrompt(providerFamily);
    assert.match(prompt, /MANGA CAMERA \/ POSE VARIETY LOCK/);
    assert.equal((prompt.match(/COMPOSITION STAGING:/g) || []).length, 4);
    assert.match(prompt, /SCENE-DRIVEN AZIMUTH/);
    assert.match(prompt, /story-relevant focal form/i);
    assert.match(prompt, /BODY ACTING \/ GESTURE VARIETY LOCK/);
    assert.doesNotMatch(prompt, /NO default eye-level shot|>=3 azimuths|max 1.*front-on/i);
    assert.match(prompt, /reference-sheet pose is identity evidence, not a recurring action/i);
    assert.match(prompt, /full-body (?:exaggeration|acting)/);
    assert.match(prompt, /preserve.*explicitly scripted.*pointing.*surface impact/i);
    assert.match(prompt, /action phase.*support.*contact/i);
  }
});

test('explicit frontal composition is not replaced by a diagonal default', () => {
  for (const camera of ['正面の固定ショット', 'front-on fixed shot', 'frontal view']) {
    for (const compact of [false, true]) {
      const assist = getPanelCompositionAssist(`[Camera: ${camera}]`, 1, { compact });
      assert.match(assist, /PRESERVE EXPLICIT AZIMUTH/);
      assert.doesNotMatch(assist, /diagonal|asymmetric|35-55|30-60/i);
    }
  }
});

test('repeated frontal shots keep their staging through both provider and medium paths', () => {
  const scenario = FOUR_PANEL_SCENARIO.replace(/\[Camera:[^\]]+\]/g, '[Camera: 正面の固定ショット]');
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      const prompt = buildMangaPrompt({ scenario, castList: CAST_LIST, providerFamily, colorMode, cinematicTechniques: false });
      const staging = prompt.match(/^COMPOSITION STAGING:.*$/gm) || [];
      assert.equal(staging.length, 4);
      for (const line of staging) {
        assert.match(line, /PRESERVE EXPLICIT AZIMUTH/);
        assert.doesNotMatch(line, /diagonal|asymmetric|35-55|30-60/i);
      }
      assert.equal((prompt.match(/^Camera: 正面の固定ショット/gm) || []).length, 4);
    }
  }
});
