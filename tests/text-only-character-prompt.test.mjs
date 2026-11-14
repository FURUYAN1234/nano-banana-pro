import assert from 'node:assert/strict';
import test from 'node:test';
import {createServer} from 'vite';
import {readFile} from 'node:fs/promises';

const server=await createServer({configFile:false,envFile:false,appType:'custom',logLevel:'silent',server:{middlewareMode:true,watch:null}});
try {
  const {hasCharacterReferenceImages}=await server.ssrLoadModule('/src/lib/reference-assets.js');
  const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const {buildMangaPromptArtifact}=await server.ssrLoadModule('/src/lib/prompt-assembler.js');
  const castList='## 1. ミナ\n外見: 黒髪の短髪、丸眼鏡。\n服装: 紺の仕事着。';
  const scenarioFor=count=>Array.from({length:count},(_,i)=>`[${i+1}コマ目]\n[EMOTION: NORMAL]\n[Camera: 高い位置から斜めに俯瞰]\n状況: ミナが机で道具を確認する。\nミナ「確認${i+1}。」`).join('\n');
  test('no character images is distinguished from background/prop-only references and unknown images',()=>{
    assert.equal(hasCharacterReferenceImages([],[]),false);
    assert.equal(hasCharacterReferenceImages(['bg'],[{image:'bg',items:[{kind:'background'}]}]),false);
    assert.equal(hasCharacterReferenceImages(['prop'],[{image:'prop',items:[{kind:'prop'}]}]),false);
    assert.equal(hasCharacterReferenceImages(['person'],[{image:'person',items:[{kind:'character'}]}]),true);
    assert.equal(hasCharacterReferenceImages(['unanalyzed'],[]),true);
  });
  test('free-layout API/Web source prompt uses text identity with no character references and keeps image identity when present',()=>{
    const source=m.readExperimentalSource({scenario:scenarioFor(6),castList,scenarioMode:'experimental-manga',colorMode:'color'});
    const plan={count:6,layout:'two_columns',reason:'動作を順に読む',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:'ミナが道具を確認する。',dialogueIds:p.dialogueIds,breakout:null}))};
    for(const hasCharacterReferences of [false,true]) {
      const prompt=m.buildExperimentalImagePrompt(plan,source,{colorMode:'color',hasCharacterReferences});
      for(const trait of ['ミナ','黒髪の短髪','丸眼鏡','紺の仕事着'])assert.ok(prompt.includes(trait),trait);
      if(hasCharacterReferences)assert.match(prompt,/以下は参照人物の観察データ/);
      else {assert.match(prompt,/TEXT-ONLY CAST/);assert.doesNotMatch(prompt,/以下は参照人物の観察データ|REFERENCES: identity and asset design/);}
    }
  });
  test('legacy four-panel ChatGPT/Gemini output also accepts text-only identity without requiring character sheets',()=>{
    for(const providerFamily of ['chatgpt','gemini']) {
      const {prompt}=buildMangaPromptArtifact({scenario:scenarioFor(4),castList,colorMode:'color',providerFamily,hasCharacterReferences:false,allowScenarioQualityWarning:true,showWatermarks:false});
      assert.match(prompt,/TEXT-ONLY CAST/);
      assert.ok(prompt.includes('黒髪'));
      assert.doesNotMatch(prompt,/Character sheets supply|Strictly reproduce reference image designs|Use character refs for/);
    }
  });
  test('ordinary STEP3 passes the actual image presence to both legacy provider prompt builders',async()=>{
    const hook=await readFile(new URL('../src/hooks/useMangaWorkflow.js',import.meta.url),'utf8');
    const input=hook.match(/const assembled = await assembleMangaPromptWithRecovery\((\{[\s\S]+?\}), callStep3AI/)[1];
    for(const effectiveProviderFamily of ['chatgpt','gemini'])for(const hasImages of [false,true]) {
      const scope={mosaicCopyrightedCharacters:false,showWatermarks:false,showTitle:true,currentScenario:scenarioFor(4),castList,colorMode:'color',effectiveProviderFamily,
        hasCharacterReferenceImages,imagesRef:{current:hasImages?['character-image']:[]},referenceAssetsRef:{current:[]},buildReferenceAssetContext:()=>'',
        bg360Image:null,bg360Analysis:null,bg360Enabled:false,bg360CroppedPanels:[],activePunchlineType:'Auto',SYSTEM_VERSION:'test',
        PROMPT_PROVIDER_FAMILIES:{CHATGPT:'chatgpt'},formatOpenAIImageEngineName:()=> 'OpenAI',openAIImageQuality:'max',GEMINI_IMAGE_MODEL:'gemini',
        OPENAI_SCENARIO_MODEL_OPTIONS:[],scenarioUsedModelRef:{current:null},promptMaxChars:32000};
      const options=new Function(...Object.keys(scope),'return ('+input+');')(...Object.values(scope));
      assert.equal(options.hasCharacterReferences,hasImages);
      const {prompt}=buildMangaPromptArtifact(options);
      if(!hasImages)assert.match(prompt,/TEXT-ONLY CAST/);
      else assert.doesNotMatch(prompt,/TEXT-ONLY CAST/);
    }
  });
} finally {await server.close();}
