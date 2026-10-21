import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const generatorPath = new URL('../scripts/generate_workflow_diagram.mjs', import.meta.url);
const diagramPath = new URL('../public/diagrams/nano-banana-pro-workflow-a4.svg', import.meta.url);
const reasoningDiagramPath = new URL('../public/diagrams/nano-banana-pro-reasoning-a4.svg', import.meta.url);

test('generates an A4 portrait workflow diagram covering the full manga pipeline', () => {
  const result = spawnSync(process.execPath, [fileURLToPath(generatorPath)], { encoding: 'utf8' });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.equal(existsSync(diagramPath), true);

  const svg = readFileSync(diagramPath, 'utf8');
  assert.match(svg, /width="210mm"/);
  assert.match(svg, /height="297mm"/);
  for (const label of [
    'Workflow Map',
    'API接続',
    'API Connection',
    'STEP1',
    'STEP2',
    'STEP3',
    'STEP4',
    '画像QA',
    'コンテンツポリシー',
    '手動で1回',
    '生成履歴',
    '保存',
    'Save &amp; Export',
  ]) {
    assert.match(svg, new RegExp(label));
  }
});

test('generates an A4 portrait bilingual reasoning routine from the workflow source anchors', () => {
  const svg = readFileSync(reasoningDiagramPath, 'utf8');
  assert.match(svg, /width="210mm"/);
  assert.match(svg, /height="297mm"/);
  for (const label of [
    'Reasoning Routine',
    '思考ルーチン',
    'ユーザー提供',
    'personality',
    '話し方',
    '360°背景',
    '参照ポーズを性格と誤認しない',
    'Scenario Contract Pass',
    '最大3回',
    'API Policy Error',
    '手動で1回',
    '既存の成功画像や履歴を消さない',
    'Review Once, Keep',
  ]) {
    assert.match(svg, new RegExp(label));
  }
});

test('README embeds the generated diagram instead of a copied diagram', () => {
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
  assert.match(readme, /nano-banana-pro-workflow-a4\.svg/);
  assert.match(readme, /nano-banana-pro-reasoning-a4\.svg/);
  assert.match(readme, /ワークフローまたは思考ルールを大きく変更した際/);
});

test('diagrams describe current dialogue, wardrobe and warning-retention contracts', () => {
  const workflow = readFileSync(diagramPath, 'utf8');
  const reasoning = readFileSync(reasoningDiagramPath, 'utf8');
  for (const text of ['全自動は内容から4〜8コマ、手動は指定モード', 'Geminiは4コマ固定', '必要最小4〜8コマ', '通常は縦4コマ、実験は台本に合う配置', '台詞・話者・衣装を保持', '全モード共通、修正は最大1回', '警告付き', '元画像・修正画像を各モード最大10件保持']) {
    assert.ok((workflow + reasoning).includes(text), `Missing current contract: ${text}`);
  }
  assert.doesNotMatch(workflow, /QA-passed images|QA通過画像/);
});

test('workflow image correction has no reinspection loop and policy errors branch from generation', () => {
  const svg = readFileSync(diagramPath, 'utf8');
  assert.match(svg, /OFF: skip; ON: inspect once/);
  assert.doesNotMatch(svg, /M 70 854 H 45 V 742 H 67|M 724 854 H 749 V 641 H 727|修正最大3回|最大5回/);
  assert.match(svg, /M 724 658 H 749 V 854 H 727/);
  assert.match(svg, /M 230 909 V 929/);
});
