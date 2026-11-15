import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';
const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
 const {buildMangaPrompt}=await server.ssrLoadModule('/src/lib/prompt-assembler.js');
 const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
 const cameras=['右前上方から見下ろす広角','左側面の低い位置から見上げる望遠','後方斜め上から見下ろす広角','右奥の床近くから見上げる広角'];
 const styles=['NORMAL','GEKIGA','WATERCOLOR','SKETCH'];
 const scenario='## タイトル: 展示の準備\nLocation: 作業室\nOutfit: 葵は青い作業着。\n'+styles.map((style,i)=>`[${i+1}コマ目]\n[Camera: ${cameras[i]}]\n[EMOTION: ${style}]\n状況: 葵が木箱を支え、蓮が箱の名札を確認する。\nセリフなし`).join('\n');
 const castList='## 葵\n外見: 黒髪、眼鏡\n## 蓮\n外見: 茶髪';
 for(const providerFamily of ['chatgpt','gemini'])for(const colorMode of ['color','monochrome'])for(const page of [false,true]) {
  test(`selective hand ink survives ${providerFamily}/${colorMode}/${page?'page':'strip'} without replacing media or camera`,()=>{
   const options={scenario:page?scenario+'\n'+[5,6].map(n=>`[${n}コマ目]\n[Camera: ${cameras[n%4]}]\n[EMOTION: NORMAL]\n状況: 葵と蓮が木箱を運ぶ。\nセリフなし`).join('\n'):scenario,castList,colorMode,providerFamily,punchlineType:'Auto',systemVersion:'test',showWatermarks:false};
   let prompt;
   if(page){const source=m.readExperimentalSource(options);const plan={count:6,layout:'two_columns',reason:'動作の間',panels:source.panels.map((p,i)=>({sourcePanel:i+1,kind:'anchor',camera:p.camera,action:"葵が木箱を支え、蓮が箱の名札を確認する。",dialogueIds:[],breakout:null}))};prompt=m.buildExperimentalImagePrompt(plan,source,options);}
   else prompt=buildMangaPrompt(options);
   assert.match(prompt,/HAND INK:/);
   assert.match(prompt,/筆圧太細\/入り抜き\/自然な微小揺らぎ/);
   assert.match(prompt,/影\/ハッチングのみかすれ/);
   assert.match(prompt,/眼鏡明瞭/);
   assert.match(prompt,/uniform thick outlines|一律太線|一律の墨\/塗り強制なし/);
   assert.match(prompt,/水彩\/鉛筆に墨強制なし/);
   for(const camera of cameras)assert.ok(prompt.includes(camera));
   for(const style of styles)assert.ok(prompt.includes(style));
   if(providerFamily==='chatgpt')assert.ok(prompt.length<=32000);
  });
 }
}finally{await server.close();}
