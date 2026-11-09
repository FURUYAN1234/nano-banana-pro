import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
  const {getScenarioPrompt}=await server.ssrLoadModule('/src/lib/prompts.js');
  const {extractDialogueOnly,extractActionOnly}=await server.ssrLoadModule('/src/lib/panel-utils.js');
  const {buildMangaPrompt}=await server.ssrLoadModule('/src/lib/prompt-assembler.js');
  const native=await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const {hasScriptedSfx}=await server.ssrLoadModule('/src/lib/manga-sfx.js');
  const castList='## ユウ\n- adult woman, short black hair';
  const panel=i=>`[${i}コマ目]\n[EMOTION: NORMAL]\n[Camera: 高い位置から斜めに俯瞰]\n状況: ユウが床を踏んで立ち止まる。\n演出: 足元の余白に描き文字「ダッ」を配置する。\nユウ「止まれ！」`;
  test('all ending families plan motivated SFX while honoring silence and factual events',()=>{
    for(const punchlineType of ['SeriousAction','GagAction','QuietAftermath','Explosion','SeriousDocumentary']) {
      const prompt=getScenarioPrompt({castList,punchlineType,inputMode:'manual',manualTopic:'床を蹴って駆け出し、最後は擬音なしで静かに止まる。',newsContext:'',searchTopicKeywords:'',customLocation:'',customOutfit:'',ragReactions:'',comedyTone:'HighTension',styleJson:null});
      assert.match(prompt,/擬音・描き文字の設計/);
      assert.match(prompt,/動き・衝撃・物音/);
      assert.match(prompt,/擬音なし.*最優先/);
      assert.match(prompt,/事実にない音や出来事を追加しない/);
    }
  });
  test('explicit SFX survive extraction without becoming dialogue or a speaker',()=>{
    const dialogue=extractDialogueOnly(panel(1),castList,{forImagePrompt:true,compactMetadata:true,separateMetadata:true});
    assert.match(dialogue,/止まれ！/);
    assert.doesNotMatch(dialogue,/ダッ|演出/);
    assert.match(extractActionOnly(panel(1),castList),/描き文字「ダッ」/);
  });
  test('generated staging shorthand authorizes drawn sound marks without treating speech as SFX',()=>{
    for(const line of ['演出: 札の進行方向に「ヒュッ」、二人のシューズが切り返す床に「キュッ」。','演出: 走る二人の足元に「ダッ」「ダッ」。','演出: 息の抜けに小さく「ゼエ」。']) assert.equal(hasScriptedSfx(line),true);
    for(const line of ['アカリ「ダッ！」','演出: 札に「休憩」を表示。','状況: 静かに止まる。']) assert.equal(hasScriptedSfx(line),false);
  });
  test('normal and native image paths retain explicit SFX and forbid speech/tail conversion',()=>{
    for(const colorMode of ['color','monochrome']) for(const providerFamily of ['chatgpt','gemini']) {
      const scenario='## タイトル: 足音\n'+Array.from({length:4},(_,i)=>panel(i+1)).join('\n');
      const normal=buildMangaPrompt({scenario,castList,colorMode,providerFamily,punchlineType:'SeriousAction'});
      assert.match(normal,/SFX LETTERING:/);
      assert.match(normal,/描き文字「ダッ」/);
      assert.doesNotMatch(normal,/Draw ONLY the specified title, speech-bubble dialogue, and watermarks/);
      assert.doesNotMatch(normal,/unless this action explicitly says handwriting/);
      const input={scenario:'## タイトル: 足音\n'+Array.from({length:6},(_,i)=>panel(i+1)).join('\n'),castList,colorMode};
      const source=native.readExperimentalSource(input);
      const plan={count:6,layout:'two_columns',reason:'足音を順に追う',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:'ユウが止まる。',dialogueIds:p.dialogueIds,breakout:null}))};
      const prompt=native.buildExperimentalImagePrompt(plan,source,{...input,providerFamily,promptMaxChars:1});
      assert.match(prompt,/SFX LETTERING:/);
      assert.match(prompt,/描き文字「ダッ」/);
      assert.match(prompt,/never speech balloons or tails/);
      assert.match(prompt,/preserve Camera/);
    }
  });
} finally {await server.close();}
