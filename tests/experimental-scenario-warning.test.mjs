import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
try {
  const manga = await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const { validateMangaScenario } = await server.ssrLoadModule('/src/lib/scenario-validation.js');
  const scenario = Array.from({ length: 6 }, (_, i) =>
    `[${i + 1}コマ目]\n[Camera: ${i % 2 ? '床から見上げるアオリ' : '高所から見下ろす俯瞰'}]\n[EMOTION: NORMAL]\n状況: 人物Aが札${i + 1}を裏返し、人物Bが手元を確かめる。\n${i === 3 ? '' : `人物A「${i + 1}枚目を確認します。」`}`
  ).join('\n');
  const input = { enabled: true, scenario, castList: '人物A\n人物B', colorMode: 'color', providerFamily: 'chatgpt', allowScenarioQualityWarning: true };

  test('native STEP3 preserves a missing-dialogue warning without inventing speech or discarding the panel', async () => {
    const validation = validateMangaScenario(scenario, input.castList, { scenarioMode: 'experimental-manga' });
    assert.equal(validation.ok, false);
    assert.deepEqual(validation.panelsMissingDialogue, [4]);
    let requests = 0;
    const prepared = await manga.prepareExperimentalManga(input, async prompt => {
      requests++;
      const source = manga.readExperimentalSource(input);
      assert.ok(prompt.includes('札4'), 'the original action reaches the layout request');
      return JSON.stringify({ count: 6, layout: 'two_columns', reason: '札と手元を各コマに収める', pageIntent: '札を確かめる過程',
        panels: source.panels.map(p => ({ sourcePanel: p.id, kind: 'anchor', camera: p.camera,
          action: `人物Aが札${p.id}を裏返し、人物Bが手元を確かめる。`, dialogueIds: p.dialogueIds, visualEffects: [], breakout: null })) });
    });
    assert.equal(requests, 1);
    assert.equal(prepared.source.scenario, scenario);
    assert.equal(prepared.plan.count, 6);
    assert.deepEqual(prepared.source.panels[3].dialogueIds, []);
    assert.equal(prepared.source.dialogue.length, 5);
    for (const line of ['1枚目を確認します。', '2枚目を確認します。', '3枚目を確認します。', '5枚目を確認します。', '6枚目を確認します。', '札4']) {
      assert.ok(prepared.prompt.includes(line), line);
    }
    const changed = structuredClone(prepared.plan);
    changed.panels[3].dialogueIds = [0];
    assert.throws(() => manga.validateExperimentalPlan(changed, prepared.source), /台詞/);
  });

  test('native warning permission keeps malformed speech and panel structure blocking before API submission', async () => {
    const cases = [
      [scenario.replace('人物A「1枚目を確認します。」', '人物A「1枚目を確認します。'), 'DIALOGUE_SYNTAX'],
      [scenario.replace('[6コマ目]', '[5コマ目]'), 'PANEL_STRUCTURE_CONTRACT'],
      [scenario.split('[5コマ目]')[0], 'PANEL_STRUCTURE_CONTRACT'],
    ];
    for (const [badScenario, code] of cases) {
      let requests = 0;
      await assert.rejects(manga.prepareExperimentalManga({ ...input, scenario: badScenario }, async () => { requests++; }), error => error.code === code);
      assert.equal(requests, 0);
    }
    assert.throws(() => manga.readExperimentalSource({ ...input, scenario: scenario.replace('高所から見下ろす俯瞰', 'アイレベル') }), /アイレベル/);
  });

  test('strict callers still reject missing speech while explicitly silent panels remain valid', () => {
    assert.throws(() => manga.readExperimentalSource({ ...input, allowScenarioQualityWarning: false }), /4/);
    const explicit = scenario.replace('状況: 人物Aが札4を裏返し、人物Bが手元を確かめる。', '状況: 人物Aが札4を裏返し、人物Bが手元を確かめる。\nセリフなし');
    const source = manga.readExperimentalSource({ ...input, scenario: explicit, allowScenarioQualityWarning: false });
    assert.deepEqual(source.panels[3].dialogueIds, []);
    assert.equal(source.scenario, explicit);
  });
} finally {
  await server.close();
}
