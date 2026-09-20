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
    '最大5回',
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
    '最大5回',
    '成功画像は保持',
    'Review, Compare, Keep',
  ]) {
    assert.match(svg, new RegExp(label));
  }
});

test('README embeds the generated diagram instead of a copied diagram', () => {
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
  assert.match(readme, /nano-banana-pro-workflow-a4\.png/);
  assert.match(readme, /nano-banana-pro-reasoning-a4\.svg/);
  assert.match(readme, /ワークフローまたは思考ルールを大きく変更した際/);
});
