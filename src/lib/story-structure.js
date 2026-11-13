import { getEndingModePolicy } from './ending-mode-policy.js';

/** Shared by generation, review and repair; beats are choices, not a quota. */
export const buildStoryStructureGuidance = ({ punchlineType, scenarioMode = 'four-panel', phase = 'generate' } = {}) => {
  const policy = getEndingModePolicy(punchlineType);
  const surreal = punchlineType === 'Surreal' || punchlineType === 'PsychoHorror';
  const form = scenarioMode === 'experimental-manga'
    ? '4〜8コマでは必要な展開に合わせて圧縮・統合し、選ばれたコマ数を守る。'
    : '4コマでは導入・働きかけ・状況の変化・帰結へ圧縮し、一つのコマに複数の役割を兼ねさせてよい。';
  const genre = policy.documentary
    ? '【事実の境界】報道・資料で確認できる目的、行動、経過と結果を結ぶ。記載のない本人の欲望・迷い・内面・決断・成長を事実として創作しない。未解決の事実を架空の解決で閉じず、確認された現状や残る問いで終えられる。'
    : surreal
      ? '【不条理の境界】シュールでは通常の因果、合理的な動機、葛藤の解決、心理的成長を要求しない。飛躍・反復・無変化を保ち、何が奇妙なのかを前後の絵の食い違い、人物の応答や間で読めるようにする。説明で合理化しない。'
      : policy.endingTone === 'serious'
        ? '【結末の境界】選択されたシリアスの結末を守る。小さな気付き、拒絶、悲劇、未解決の問い、静かな余韻も帰結になる。勝利・和解・成長・教訓やギャグへの反転を一律に足さない。'
        : '【結末の境界】笑いは人物の狙いと実際の結果のずれ、役割や意味の変化など、選択された結末に合わせて作る。成功や失敗の規模を増やすだけの汎用オチへ固定しない。';
  const operation = phase === 'review'
    ? '【監査への反映】既存のsetup_seed・panel3_prediction・panel4_outcomeとpayoff_clarity.evidenceに、該当コマの働きかけ、応答・変化、帰結のつながりを具体的に記す。原因や応答が抜けて誰に何が起きたか理解できない、唐突な別設定で結末を帳消しにする等の実害がある場合だけpayoff_clarity.material_failure=trueとし、correctionに同じ題材・結末を保つ修正を示す。構成項目の欠如、動機の明文化不足、静かな展開だけで不合格にしない。下記の事実・不条理・結末の境界を優先する。'
    : phase === 'repair'
      ? '【修正への反映】監査で示された具体的な断絶だけを、元からある行動・受け手の反応・視覚的手掛かりでつなぐ。成立済みの展開、指定台詞・人物・事実・コマ数・結末を保つ。三幕へ合わせるために新事件や敵を足さず、演技だけの修正では筋を変更しない。'
      : '【生成への反映】構想時に人物が望むこと・思い込み、きっかけ、働きかけとその結果、最後に変わる状況や意味を内部で結ぶ。次のコマが前の行動・反応・発見を受けるよう設計し、説明だけの並列を避ける。脇役は助ける・妨げる・受け止める等、その場面で必要な役割を持つ。設計用語や構想の解説は出力せず、既存の状況・演技・台詞に表す。';
  return `【尺と題材に合わせた物語設計】
${form}
三幕構成の導入・展開・帰結を参考にするが、全項目の消化は目的にしない。転機は人物の選択肢・理解・状況が変わる箇所として必要な時だけ置く。中間点、絶望、死、敵、サブプロットを必須にせず、固定の位置や割合へ当てはめない。
冒頭と最後の物・姿勢・関係の対比は変化や意味を見せる手段として選べるが、同一構図の反復や変化・成長を強制しない。ユーザーが指定した筋、無変化、反復、沈黙、カメラ・画風を優先し、漫画の勢いを削らない。
${operation}
${genre}`;
};
