export const bindingStyles = ['NORMAL', 'POP_ART', 'WATERCOLOR', 'GEKIGA', 'SKETCH', 'CHIBI_GAG'];

export function bindingFixture(count, native = false, colorMode = 'color') {
  const names = ['ユウ', 'ナギ', 'ソラ', 'トワ', 'レイ'].slice(0, count);
  const castList = names.map(name => `## ${name}\n短髪、左頬に小さなほくろ。`).join('\n');
  const styles = native ? bindingStyles : bindingStyles.slice(0, 4);
  const camera = '左上35度から見下ろす中景。脚本の切取りを保つ。';
  const action = `${names.join('と')}が箱を支える。眉を上げ、口を閉じて穏やかに笑う。`;
  const scenario = '## タイトル: 箱の手順\nLocation: 作業室\nOutfit: 作業着\n' + styles.map((style, i) =>
    `[${i + 1}コマ目]\n[EMOTION: ${style}]\n[Camera: ${camera}]\n状況: ${action}\n${i === styles.length - 1 ? 'セリフなし' : `${names[0]}「このまま運ぼう。」`}`
  ).join('\n');
  return { names, camera, action, scenario, castList, colorMode };
}

export function bindingNativePlan(native, fixture) {
  const source = native.readExperimentalSource(fixture);
  const plan = { count: source.panels.length, layout: 'two_columns', reason: '作業の手順', panels: source.panels.map(panel => ({
    sourcePanel: panel.id, kind: 'anchor', camera: panel.camera, action: fixture.action,
    dialogueIds: panel.dialogueIds, breakout: null,
  })) };
  return { source, plan };
}
