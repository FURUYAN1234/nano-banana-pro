import test from 'node:test';
import assert from 'node:assert/strict';
import {classifyCameraElevation,isFisheyeCamera,getPanelShotExecution} from '../src/lib/composition-variety.js';
import {assertGeneratedScenarioCameraContract} from '../src/lib/scenario-validation.js';
const actual='床すれすれの高さから、立っている人物の膝より低い位置で約18度見上げる、左前斜めの超広角ロングショット。直線投影を保ち、魚眼や樽型歪みは使わない。手前の折りたたみ枠と白布の端を大きく迫らせ、そこから五人の準備動作を対角線に沿って奥へつなぐ。人物の顎やプロジェクターの下面、アーチ入口の内側が下から見え、テラス床の線と入口の縦線が奥へ伸びる。';
const scenario=camera=>Array.from({length:4},(_,i)=>`[${i+1}コマ目]\n[Camera: ${i===0?camera:'右上から見下ろす広角'}]\n[EMOTION: NORMAL]\n状況: 五人が準備する。`).join('\n');
test('actual low18 degree rectilinear superwide Camera passes without weakening elevation or authored camera',()=>{
 assert.equal(classifyCameraElevation(actual),'low');assert.equal(isFisheyeCamera(actual),false);
 assert.equal(assertGeneratedScenarioCameraContract(scenario(actual)),true);
 assert.match(getPanelShotExecution(actual),/look up: chin/);
 assert.ok(scenario(actual).includes(actual));
});
test('Japanese and English shared negation covers barrel distortion without treating it as affirmative fisheye',()=>{
 for(const clause of ['魚眼や樽型歪みは使わない','魚眼と樽型の歪みを使わない','フィッシュアイや樽型ひずみは使用しない','no fisheye or barrel distortion','without fisheye and barrel distortion','avoid barrel distortion and fisheye']){
  const camera='strong low-angle view. '+clause;
  assert.equal(isFisheyeCamera(camera),false,clause);assert.doesNotThrow(()=>assertGeneratedScenarioCameraContract(scenario(camera)));
 }
});
test('affirmative fisheye remains invalid when only barrel distortion is rejected',()=>{
 for(const camera of ['低いアオリ。魚眼を使い、樽型歪みは使わない。','low-angle fisheye, no barrel distortion','強い俯瞰。樽型歪みは使わず、魚眼を使う。']){
  assert.equal(isFisheyeCamera(camera),true,camera);
  assert.throws(()=>assertGeneratedScenarioCameraContract(scenario(camera)),error=>{
   assert.equal(error.code,'CAMERA_CONTRACT');assert.match(error.message,/肯定の魚眼指定/);assert.doesNotMatch(error.message,/撮影位置・投影を確認できません/);return true;
  });
 }
});
test('missing elevation and unrequested eye-level still fail with their actual reason',()=>{
 for(const[camera,reason]of [['左前斜めの超広角。魚眼や樽型歪みは使わない。',/撮影位置・投影を確認できません/],['アイレベル。魚眼や樽型歪みは使わない。',/本人の明示指定がないアイレベル/]]){
  assert.throws(()=>assertGeneratedScenarioCameraContract(scenario(camera)),error=>{assert.equal(error.code,'CAMERA_CONTRACT');assert.match(error.message,reason);assert.doesNotMatch(error.message,/肯定の魚眼指定/);return true;});
 }
 assert.doesNotThrow(()=>assertGeneratedScenarioCameraContract(scenario('アイレベル。魚眼や樽型歪みは使わない。'),'1コマ目はアイレベルで撮る。'));
});
