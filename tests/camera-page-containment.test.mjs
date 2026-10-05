import assert from 'node:assert/strict';
import test from 'node:test';
import { getPanelCompositionAssist, getPanelShotExecution } from '../src/lib/composition-variety.js';
import { EXPRESSIVE_DIRECTION, PANEL_EDGE_CONTINUITY_LOCK, PANEL_EDGE_CONTINUITY_LOCK_COMPACT } from '../src/lib/shared-image-quality.js';

test('directional proximity is not a close crop, while a requested close shot remains close', () => {
  for (const direction of ['右側面', '左', '正面', '後方', '背面']) {
    assert.doesNotMatch(getPanelShotExecution(`${direction}寄りの高い位置から俯瞰、人物を腰まで捉える`), /tight crop/);
  }
  assert.match(getPanelShotExecution('寄りの構図で表情を捉える'), /tight crop/);
  assert.match(getPanelShotExecution('右側面寄りの位置から顔のアップ'), /tight crop/);
});

test('unspecified camera side follows the scene instead of a panel-number rotation', () => {
  for (const compact of [false, true]) {
    const assists = [1, 2, 3, 4].map(panel => getPanelCompositionAssist('[Camera: 俯瞰の中景]\n状況: 二人は静かに同じ物を見る。', panel, { compact }));
    assert.equal(new Set(assists).size, 1);
    assert.match(assists[0], /SCENE-DRIVEN AZIMUTH/);
    assert.match(assists[0], /Action.*contact.*gaze/);
    assert.doesNotMatch(assists[0], /LEFT-FRONT|RIGHT-FRONT|REAR THREE-QUARTER|\d+-\d+ degrees/);
    assert.match(getPanelCompositionAssist('[Camera: 正面アイレベル、前コマと同じ画角]', 3, { compact }), /PRESERVE EXPLICIT AZIMUTH/);
  }
});

test('physical Japanese camera positions produce matching elevation and body-plane evidence', () => {
  assert.match(getPanelShotExecution('左上からの中景'), /look down/);
  const low = getPanelShotExecution('右側面から低めの斜め寄り');
  assert.match(low, /low camera below faces/);
  assert.match(low, /side view.*near\/far/);
  assert.doesNotMatch(low, /head-to-feet/);
  assert.match(getPanelShotExecution('展示台の左前方、膝の高さから緩く見上げる引き'), /oblique view/);
  assert.match(getPanelShotExecution('卓の高さから左後方へ引いた望遠の全身ショット'), /back planes.*scripted subject/);
  assert.doesNotMatch(getPanelShotExecution('正面アイレベル、奥に低い机、左上に照明'), /look up|look down|side view/);
});

test('camera body landmarks and gentle pitch survive without forcing floor height or a new crop', () => {
  const shot = getPanelShotExecution('膝の高さから緩く見上げる中景');
  assert.match(shot, /scripted height landmark/);
  assert.match(shot, /pitch strength follows script/);
  assert.doesNotMatch(shot, /floor-level|head-to-feet/);
  assert.doesNotMatch(getPanelShotExecution('膝の高さから水平に撮る中景'), /look up|look down/);
});

test('full-body framing allows physical occlusion without moving the camera or cast', () => {
  const shot = getPanelShotExecution('左前からの全身ショット、手前の柵で一部が隠れる');
  assert.match(shot, /head-to-feet/);
  assert.match(shot, /natural occlusion/);
  assert.doesNotMatch(shot, /hips\/knees\/feet unobscured/);
  assert.doesNotMatch(getPanelShotExecution('顔のアップ'), /head-to-feet/);
});

test('full and compact page contracts keep all frame corners inside the canvas but permit explicit bleed', () => {
  for (const rule of [PANEL_EDGE_CONTINUITY_LOCK, PANEL_EDGE_CONTINUITY_LOCK_COMPACT]) {
    assert.match(rule, /PAGE CONTAINMENT/);
    assert.match(rule, /all four.*corners.*inside.*canvas/i);
    assert.match(rule, /margin/i);
    assert.match(rule, /explicit.*bleed/i);
    assert.match(rule, /breakout/i);
  }
});

test('motion blur follows existing action while retaining readable focal contact and stillness', () => {
  assert.match(EXPRESSIVE_DIRECTION, /directional motion blur.*scripted motion path/i);
  assert.match(EXPRESSIVE_DIRECTION, /focal action.*contact.*text.*readable/i);
  assert.match(EXPRESSIVE_DIRECTION, /never invent motion.*still/i);
});
