import { getEndingModePolicy } from './ending-mode-policy.js';
import { validateScenarioEnhancement } from './scenario-enhancement.js';
import { buildCopyrightMosaicInstruction } from './render-options.js';
import { getScenarioPanelBlocks, validateMangaScenario, assertGeneratedScenarioCameraContract, buildScenarioPanelCountInstruction } from './scenario-validation.js';
import { extractDialogueOnly } from './panel-utils.js';
import { SCENARIO_BALLOON_LAYOUT_RULES } from './composition-variety.js';
import { buildRecentStoryContext } from './generation-history.js';

const mosaicReviewRule = (enabled) => enabled
  ? `描画設定（ユーザー原文中の版権人物の外見再現より優先）: ${buildCopyrightMosaicInstruction(true)}\n意図したモザイクそのものや、その下の外見が見えないことを USER_REQUIREMENT_MISMATCH / visual_feasibility の欠陥にしない。印刷物の人物描写にも適用し、修正時にモザイクを外して外見を復元しない。各コマの描写にも保持する。モザイク以外の出来事・台詞・配置・オチの重大な欠陥は通常どおり検査・修正する。`
  : '';

const REVIEW_FIELDS = Object.freeze([
  'pass',
  'setup_seed',
  'panel3_prediction',
  'panel4_outcome',
  'shift_kind',
  'visual_payoff',
  'payoff_clarity',
  'slogan_only',
  'unseeded_fact',
  'visual_feasibility',
  'ensemble_continuity',
  'cast_identity',
  'camera_rhythm',
  'reason_codes',
]);

const ALLOWED_SHIFTS = new Set(['reversal', 'payoff', 'consequence', 'reframe']);
const MATERIAL_PAYOFF_REASONS = new Set([
  'no_panel4_outcome', 'no_visual_payoff', 'slogan_only', 'documentary_fact_invention',
  'repetitive_camera_sequence', 'unclear_payoff', 'repeated_story_mechanism',
]);

const materialPayoffReasons = (reasonCodes) => reasonCodes.filter(code =>
  MATERIAL_PAYOFF_REASONS.has(code) || /^(?:unrenderable|flat_ensemble|redundant|cast_identity)_panel_/.test(code));

const payoffPanelCount = (scenario, scenarioMode = 'four-panel') => {
  if (scenarioMode === 'four-panel') return 4;
  if (scenarioMode !== 'experimental-manga') throw new Error('invalid_scenario_mode');
  const panels = getScenarioPanelBlocks(scenario).filter(panel => panel.found);
  if (panels.length < 5 || panels.length > 8 || panels.some((panel, index) => panel.num !== index + 1)) throw new Error('invalid_native_panel_count: 5–8 consecutive panels required');
  return panels.length;
};

const isStagingOnlyRepair = (reasonCodes) => {
  const material = materialPayoffReasons(reasonCodes);
  return material.length > 0 && material.every(code => code === 'repetitive_camera_sequence' || /^(?:unrenderable|flat_ensemble|cast_identity)_panel_[1-8]$/.test(code));
};

const usesBalloonPatch = (scenario, reasonCodes) => isStagingOnlyRepair(reasonCodes)
  && reasonCodes.some(code => code.startsWith('BALLOON_'))
  && reasonCodes.every(code => code.startsWith('BALLOON_') || /^unrenderable_panel_[1-8]$/.test(code))
  && getScenarioPanelBlocks(scenario).every(panel => panel.found && /^BalloonLayout\s*[:：]/m.test(panel.text));

// Field edits preserve all other source bytes, including dialogue, metadata and panel order.
export const applyScenarioStagingPatch = (scenario, response, castList = '', { scenarioMode = 'four-panel' } = {}) => {
  const fail = message => { throw new Error(`invalid_staging_patch: ${message}`); };
  let edits;
  try { edits = JSON.parse(extractText(response).replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')); }
  catch { return fail('JSON array required'); }
  const source = String(scenario);
  let panelCount;
  try { panelCount = payoffPanelCount(source, scenarioMode); } catch (error) { return fail(error.message); }
  if (!Array.isArray(edits) || !edits.length || edits.length > panelCount * 3) return fail(`1–${panelCount * 3} field edits required`);
  const panels = getScenarioPanelBlocks(source);
  if (panels.length !== panelCount || panels.some(panel => !panel.found)) return fail('expected panels required');
  const seen = new Set();
  const replacements = [];
  for (const edit of edits) {
    if (!edit || Object.keys(edit).some(key => !['panel', 'field', 'value'].includes(key))
      || !Number.isInteger(edit.panel) || edit.panel < 1 || edit.panel > panelCount
      || !['Camera', 'BalloonLayout', '状況'].includes(edit.field)) return fail('unsupported edit');
    const key = `${edit.panel}:${edit.field}`;
    if (seen.has(key)) return fail('duplicate edit');
    seen.add(key);
    const panel = panels[edit.panel - 1];
    const pattern = edit.field === 'Camera' ? /^\[Camera\s*[:：][^\r\n]*\]$/gm
      : edit.field === 'BalloonLayout' ? /^BalloonLayout\s*[:：][^\r\n]*$/gm : /^状況\s*[:：][^\r\n]*$/gm;
    const matches = [...panel.text.matchAll(pattern)];
    if (matches.length !== 1) return fail('one existing field line required');
    let value = edit.value;
    if (edit.field === 'BalloonLayout') {
      if (!Array.isArray(value) || value.some(item => !item
        || Object.keys(item).some(key => !['speaker', 'x', 'anchor', 'route'].includes(key))
        || ['speaker', 'anchor', 'route'].some(key => typeof item[key] !== 'string' || !item[key].trim() || /[\r\n]/.test(item[key])))) return fail('invalid balloon layout');
      value = JSON.stringify(value);
    } else if (typeof value !== 'string' || !value.trim() || /[\r\n]|\[\s*\d+\s*コマ目/.test(value)
      || (edit.field === 'Camera' && /\]/.test(value))) return fail('single field value required');
    const replacement = edit.field === 'Camera' ? `[Camera: ${value}]` : `${edit.field}: ${value}`;
    const start = source.indexOf(panel.text) + matches[0].index;
    replacements.push({ start, end: start + matches[0][0].length, replacement });
  }
  let candidate = source;
  for (const edit of replacements.sort((a, b) => b.start - a.start)) {
    candidate = candidate.slice(0, edit.start) + edit.replacement + candidate.slice(edit.end);
  }
  try {
    for (const panel of getScenarioPanelBlocks(candidate)) extractDialogueOnly(panel.text, castList, { forImagePrompt: true });
    if (scenarioMode === 'experimental-manga' && !validateMangaScenario(candidate, castList, { scenarioMode }).ok) return fail('invalid native scenario');
  } catch (error) { return fail(error.message); }
  return candidate;
};

const PAYOFF_REASON_LABELS = {
  no_setup_seed: '1〜2コマ目にオチの種がない',
  no_panel3_prediction: '結末直前までに読者の予測が作れない',
  no_panel4_outcome: '最終コマの帰結が見えない',
  no_visual_payoff: '絵で伝わるオチがない',
  slogan_only: '最終コマが標語・説明だけになっている',
  no_payoff_shift: '予測から帰結への変化がない',
  unclear_payoff: '何が変わったのか読者に伝わらない',
  documentary_fact_invention: '原文にない事実が追加された',
  cast_identity_unverified: '人物設定と台本の外見・話者対応を確認できない',
};

export const formatPayoffReviewReasons = (evaluation, review) =>
  (evaluation?.reasonCodes || []).map(code => {
    if (code === 'repetitive_camera_sequence') {
      const camera = review.camera_rhythm;
      return `${camera.repeated_panels.join('・')}コマのカメラが反復して見せ場の差を失っています（${camera.evidence}）`;
    }
    const redundantPanel = /^redundant_panel_(\d+)$/.exec(code);
    if (redundantPanel) {
      const evidence = review?.panel_development?.find(item => item.panel === Number(redundantPanel[1]))?.evidence;
      return `${redundantPanel[1]}コマ目が必要な動作・情報・間を加えていません${evidence ? `（${evidence}）` : ''}`;
    }
    const identityPanel = /^cast_identity_panel_(\d+)$/.exec(code);
    if (identityPanel) {
      const item = review?.cast_identity?.find(entry => entry.panel === Number(identityPanel[1]));
      return `${identityPanel[1]}コマ目の外見・話者対応が人物設定と矛盾しています（${item?.reference_evidence || ''} / ${item?.scenario_evidence || ''}）`;
    }
    const stagingPanel = /^flat_ensemble_panel_(\d+)$/.exec(code);
    if (stagingPanel) {
      const evidence = review?.ensemble_continuity?.find(item => item.panel === Number(stagingPanel[1]))?.evidence;
      return `${stagingPanel[1]}コマ目の人物演技・連続性が弱い${evidence ? `（${evidence}）` : ''}`;
    }
    const panel = /^unrenderable_panel_(\d+)$/.exec(code);
    if (!panel) return PAYOFF_REASON_LABELS[code] || code;
    const evidence = review?.visual_feasibility?.find(item => item.panel === Number(panel[1]))?.evidence;
    return `${panel[1]}コマ目の配置・判読が難しい${evidence ? `（${evidence}）` : ''}`;
  }).join(' / ');

const extractText = (value) => String(value?.text ?? value ?? '').trim();

export const buildScenarioPayoffReviewPrompt = ({ scenario, punchlineType, userTopic, recentScenarios = [], mosaicCopyrightedCharacters = true, scenarioMode = 'four-panel' } = {}) => {
  const panelCount = payoffPanelCount(scenario, scenarioMode);
  const experimental = scenarioMode === 'experimental-manga';
  const policy = getEndingModePolicy(punchlineType);
  const surrealMode = punchlineType === 'Surreal';
  const toneRule = surrealMode
    ? '静寂型（シュール）では、通常の因果関係や辻褄を要求しない。物・設備・舞台の大破壊、因果の飛躍、支離滅裂、不条理、突然の無意味な変化を、真顔・沈黙・奇妙な間で視覚的な笑いにできていれば有効とする。後付け説明で合理化しない。'
    : policy.endingTone === 'serious'
    ? 'シリアスでは笑いの反転を強制せず、積み上げた選択の consequence / reframe / payoff を有効とする。'
    : `ギャグでは、1〜2コマ目の種と${panelCount - 1}コマ目までの読者予測を、${panelCount}コマ目の reversal / payoff / reframe / consequence で一段ずらす。予測と同じ出来事でも、規模・意味・対象・行為者が意外に増幅され、画面で分かるなら有効な payoff / consequence とする。反転だけを要求しない。`;
  const factRule = policy.documentary
    ? `ドキュメンタリーでは、元シナリオにない新しい事実・数値・時系列を${panelCount}コマ目へ追加してはならない。追加されていれば unseeded_fact=true。`
    : `新しい事実だけで結末を成立させず、1〜${panelCount - 1}コマ目に種があるかを判定する。`;

  return `あなたは${panelCount}コマ漫画の構成監査担当です。次のシナリオを、選択された結末モードに合わせて厳格に監査してください。

ENDING MODE: ${punchlineType || 'Auto'}
FINAL PANEL: ${panelCount}
${buildScenarioPanelCountInstruction(scenarioMode)}
${experimental ? '互換JSON名 panel3_prediction は最終直前までの予測、panel4_outcome は実際の最終コマの帰結を意味する。番号3・4へ固定しない。panel_development は全コマを確認し、新しい動作・応答・発見・意味のある沈黙や間の必要性を evidence に記す。同じ出来事・情報の再掲やカメラだけの変更で、削除しても時機・感情・理解を何も失わない明確な水増しだけ material_padding=true とし、同じ題材・結末を保つ correction を添える。無言という理由だけで失格にせず、台詞や沈黙の数のノルマを設けない。' : ''}
${toneRule}
${factRule}
${buildRecentStoryContext(recentScenarios)}
${recentScenarios.length ? '追加JSONフィールド recent_repetition: {"status":"distinct|same_mechanism|intentional_repeat|uncertain","matched_index":null,"evidence":"過去と今回の具体的な種・行為・帰結の比較","correction":""}。matched_indexはRECENT配列の0始まり。型・題材・絵柄が同じだけならdistinct。名詞だけ変えた同じ仕掛けと帰結の再利用が明確で、新作の展開を失わせる場合だけsame_mechanismとして該当indexと指定結末を保つcorrectionを記す。明示された再現・続編・意図した反復はintentional_repeat。推測はuncertain。' : ''}
${mosaicReviewRule(mosaicCopyrightedCharacters)}
${userTopic ? `
USER REQUIREMENTS (監査の基準となるユーザー原文):
${String(userTopic).trim()}
- 明示された人物・台詞・出来事・オチを監査側の好みで失格にしない。指定された終幕の語句を「原文にない追加事実」と扱わない。指定内で絵として伝わるかを判定する。表情・姿勢・視線による認識のズレも視覚的帰結になり、物の破壊や別の事件は必須ではない。
` : ''}

判定条件:
- 初回画像の構図を守る。既に別コマで読める印字の再掲、全員の細かな表情、補助的な手元を毎コマ拡大する義務はない。ユーザーが明示した再掲可読条件は守るが、AIが追加した反復可読要求だけで引き・アオリ・身体演技を寄りへ変えない。${experimental ? '変形ページのコマの高さ・幅は内容に応じて配分し、全幅の帯を前提にしない。' : '横長4コマの高さは内容に応じて可変であり、等高の帯を前提にしない。'}
- visual_feasibilityにはmaterial_lossを併記する。feasible=falseでも、そのコマでユーザー必須情報・初めて読む重要文字・物語に必要な動作・台詞と話者の対応を失うときだけmaterial_loss=true。evidenceに失われる内容と必要な理由を書く。既出文字の小ささや補助細部だけならmaterial_loss=falseとし、修正案を出さない。修正は主動作と距離・上下角を保つ余白、コマ高、前後配置、情報配分から検討する。
- setup_seed: 1〜2コマ目に置かれた、${panelCount}コマ目へ効く具体的な種。
- panel3_prediction: ${panelCount - 1}コマ目までに読者が自然に予測する次の展開。
- panel4_outcome: ${panelCount}コマ目で実際に起きる、目で確認できる帰結。
- shift_kind: reversal / payoff / consequence / reframe / none のいずれか。
- visual_payoff: セリフの説明や標語ではなく、人物の行動・表情・小道具・空間変化で帰結が見えるか。
- payoff_clarity: ${panelCount}コマ目で誰に何が起き、何が変わったのかを、前のコマの具体的な手掛かりと最後の行動・反応から読者が読み取れるか。突然の別場面や設定の後出しで前の出来事を帳消しにし、落差・帰結が読めない明確な場合だけmaterial_failure=trueとする。evidenceに失われた手掛かりと台本上の根拠、correctionに同じ題材・指定結末を保つ具体的な回収方法を書く。眠る、夢、ループ、メタ、沈黙という型だけで失格にしない。明示された夢オチを別の型へ変えず、シュールでは因果説明を強制せず目に見える食い違いを評価する。好み・小さな違和感・不確かな推測はfalse。
- slogan_only: ${panelCount}コマ目がまとめ、教訓、標語、解説だけで終わるなら true。
- unseeded_fact: ${panelCount}コマ目だけに新しい事実を持ち込み成立させているなら true。
- visual_feasibility: BalloonLayoutがある場合は台詞順・話者・xの右→左と、anchor/routeがCamera・状況の人物配置に一致し、非話者の顔を横切らない余白で尾を結べるか確認する。明確な矛盾のみfeasible=falseとして同じ事件と演技を保つ配置修正へ。配置が未確定なだけで同じ高さの横並びへ戻さない。${panelCount}コマそれぞれについて、指定Cameraから見た人物・身体・手・対象物の位置を頭の中で一枚に配置する。${experimental ? '各コマは縦A4の変形ページ内に右から左・上から下の読順で配置し、内容に応じて幅と高さを配分する。一列の帯へ固定しない。' : '各コマは縦A4ページに全幅1列で上から4コマ配置し、高さは内容に応じて配分できる。等高の細い帯を前提にしない。'}物理的に手が届き、物語上重要な動作・接触・文字・位置関係がその画角と人物の大きさで読める場合だけ feasible=true。遠景で複数の小さな手元を同時に判読させる等、具体的に成立しない場合は false。人数・勢い・誇張・シュールさだけで false にしてはならない。面白さ、キャラクターの生きた演技、オチを最優先し、具体的な衝突や読めない対象を evidence に示す。false なら、題材・オチ・ユーザーの明示指定を保ち、カメラ・前後関係・小道具の見せ方や補助動作のコマ配分で直す correction を書く。
- ensemble_continuity: 同じ監査呼び出しで${panelCount}コマの人物配置と演技を確認する。継続場面の最後に明示された人物・物の相対関係を、接写・遮蔽・画面外を挟んでも参照する。物の側・端と画面左右を区別する。複数人が見えるコマでは、前後・左右・距離、顔と身体の向き、誰の働きかけが誰の反応や次の動作へつながるかを、シナリオの具体的な人物名と動作から判定する。人物の移動・物の回転・場面転換に台本の根拠があれば関係を更新し、変更自体は欠陥にしない。同じ場面の隣接・前後・向かい・席位置や物の側・端との関係を、移動・回転・場面転換の根拠なく変え、動作や人物関係が破綻する重大な入れ替えは material_break=true。俯瞰・アオリ・切り返し・アップ・望遠の奥行圧縮・寄り引き・遮蔽による画面左右・重なりの変化だけ、または台本で自然につながる移動なら false。配置が分散していても、同じ顔・視線・反応を複製して働きかけと受け手の違いが消え、物語上の相互作用が読めない明確な場合は material_break=true。横並び、口の開閉だけ、軽微な差や好みでは失格にしない。誰かの動作や感情が相手へ伝わる自然さを判定し、人物数・反応の種類・奥行き段数のノルマは設けない。明示された整列、共同作業、一斉注視、意図的な静止や沈黙、単独人物、画面外の人物には機械的に違うポーズや位置を要求せず false。関係が未指定・曖昧なだけなら material_break=false とし、evidence に根拠不足を書く。evidence には参照したコマ番号と台本上の人物・物・動作・相対関係の根拠、true なら correction に同じ出来事を保つ具体的な演技・配置の修正を書く。
- camera_rhythm: ${panelCount}コマ全体を比較し、shotsへ各Cameraの実際の投影signature（上下・左右前後、仰俯角、寄り引き、レンズ遠近／魚眼、ロール、人物配置）と物語上のpurposeを書く。隣接だけでなく離れたコマも比較する。肩越し・Hyper Perspective・Slant等の名称が違っても、同じアオリ・距離・遠近が続き発見／反応／見せ場の差を明確に消すなら material_repeat=true。repeated_panelsに該当コマ、evidenceに重なる投影と失われた役割、correctionに同じ事件・台詞・演技・読順を保つ具体的なカメラ変更を書く。同じ高さだけ、好み、軽微な差では false。ユーザー指定の同型ショットや意味のある反復演出はintentional_repeat=trueとして保持し、その根拠を書く。種類の数合わせや、既に生成AIが書いたCameraをユーザー固定指定とみなして見逃すことは禁止。 寄り・中景・引きも比較し、広角レンズだけで引きとみなさない。寄り続きで事件に必要な空間や人物間距離が読めない場合はその根拠と引きにするコマを示す。意図した寄りだけのページや、空間が既に読める場合は維持する。
- cast_identity: 認識済み人物設定（system context）を基準に、全コマの状況・Camera・台詞の話者・BalloonLayoutのspeaker/anchor/routeが同じ人物を指すか照合する。名前ごとの髪・眼鏡・肌などの設定と台本記述を reference_evidence / scenario_evidence に別々に具体的に示す。複数人は各人を照合し、台本の誤記を基準設定として追認しない。別人の特徴を付ける、外見で示す口元と話者名が異なる等の明白な取り違えだけ status=mismatch とし、人物名・台詞を変えず状況/Camera/尾を直す correction を書く。一致は consistent。ユーザー指定や物語の動作で明示された変装・髪型変更・着替え・小物の着脱は intentional_change とし、その根拠を change_basis に示す。画風・表情・視点・照明の違いだけを不一致にせず、不要な外見描写も足さない。外見が未記載なら名前と話者/尾の対応を調べる。基準不足や曖昧さは uncertain とし、推測で不一致にしない。全状態で両evidenceを記し、照合不能ならその理由を書く。JSON例をそのまま写さず、実際の認識設定と台本からstatusと根拠を埋める。change_basis/correction は該当しなければ空文字列。
- pass: 上記を総合し、最後まで読ませる${panelCount}コマとして成立するときだけ true。
- 静寂型（シュール）では setup_seed と panel3_prediction は空でもよく、shift_kind=none と unseeded_fact=true だけで失格にしない。目で分かる不条理な出来事または大破壊と、その狂気を殺さない真顔・沈黙・間があれば pass=true にできる。
- ${panelCount - 1}コマ目から因果的に続くこと自体を失格理由にしない。予測の単なる反復ではなく、規模・意味・対象・行為者のどれかが一段ずれていれば合格可能。
- pass=true のとき reason_codes は必ず空配列にする。問題が1つでも残るときだけ pass=false として具体的なコードを入れる。

以下のJSONのみを返してください。reason_codes は問題コードの配列です。
全項目を検査し、成立している項目のevidenceは台本上の根拠を短い1文で示す。問題がある項目だけ具体的な欠落・理由・correctionを詳述し、同じ台本の長い言い換えを繰り返さない。
{
  "pass": true,
  "setup_seed": "",
  "panel3_prediction": "",
  "panel4_outcome": "",
  "shift_kind": "reversal",
  "visual_payoff": true,
  "payoff_clarity": {"material_failure":false,"evidence":"specific setup cue and visible final action explain what changes, or readable absurd contrast","correction":""},
  "slogan_only": false,
  "unseeded_fact": false,
  "visual_feasibility": ${JSON.stringify(Array.from({length:panelCount},(_,i)=>({panel:i+1,feasible:true,evidence:'camera, actor, and focal hand/prop relation at readable scale',correction:''})))},
  "ensemble_continuity": ${JSON.stringify(Array.from({length:panelCount},(_,i)=>({panel:i+1,material_break:false,evidence:'specific cast positions, actions and reactions or why stillness is intentional',correction:''})))},
  "cast_identity": ${JSON.stringify(Array.from({length:panelCount},(_,i)=>({panel:i+1,status:'<consistent|intentional_change|mismatch|uncertain>',reference_evidence:'<人物名と認識設定の具体的な特徴>',scenario_evidence:'<人物名に対応する台本の外見・話者・尾の照合根拠>',change_basis:'<明示変更の根拠。該当なしは空文字列>',correction:'<不一致の修正。該当なしは空文字列>'})))},
  "camera_rhythm": {"shots":${JSON.stringify(Array.from({length:panelCount},(_,i)=>({panel:i+1,signature:'physical camera geometry',purpose:'story role'})))},"repeated_panels":[],"material_repeat":false,"intentional_repeat":false,"evidence":"cross-panel comparison grounded in Camera and story actions","correction":""},
${experimental ? `  "panel_development": ${JSON.stringify(Array.from({length:panelCount},(_,i)=>({panel:i+1,material_padding:false,evidence:'distinct action, information or purposeful timing lost if omitted',correction:''})))},\n` : ''}
${recentScenarios.length ? '  "recent_repetition": {"status":"distinct","matched_index":null,"evidence":"specific comparison with prior setup, action and outcome","correction":""},\n' : ''}  "reason_codes": []
}

SCENARIO:
${String(scenario || '').trim()}`;
};

const hasCastIdentityEvidence = (items, panelCount) => Array.isArray(items) && items.length === panelCount
  && items.every((item, index) => item?.panel === index + 1
    && ['consistent', 'intentional_change', 'mismatch', 'uncertain'].includes(item.status)
    && typeof item.reference_evidence === 'string' && item.reference_evidence.trim()
    && typeof item.scenario_evidence === 'string' && item.scenario_evidence.trim()
    && typeof item.change_basis === 'string'
    && (item.status !== 'intentional_change' || item.change_basis.trim())
    && typeof item.correction === 'string'
    && (item.status !== 'mismatch' || item.correction.trim()));

const hasCameraRhythmEvidence = (camera, panelCount = 4) => {
  const nonempty = value => typeof value === 'string' && value.trim().length > 0;
  return Boolean(camera
    && Array.isArray(camera.shots) && camera.shots.length === panelCount
    && camera.shots.every((shot, index) => shot?.panel === index + 1 && nonempty(shot.signature) && nonempty(shot.purpose))
    && Array.isArray(camera.repeated_panels)
    && camera.repeated_panels.every(panel => Number.isInteger(panel) && panel >= 1 && panel <= panelCount)
    && new Set(camera.repeated_panels).size === camera.repeated_panels.length
    && typeof camera.material_repeat === 'boolean' && typeof camera.intentional_repeat === 'boolean'
    && nonempty(camera.evidence) && typeof camera.correction === 'string'
    && (!camera.material_repeat || camera.intentional_repeat
      || (camera.repeated_panels.length >= 2 && nonempty(camera.correction))));
};

export const parseScenarioPayoffReview = (text, { scenarioMode = 'four-panel', panelCount = 4 } = {}) => {
  if (scenarioMode === 'four-panel' ? panelCount !== 4 : scenarioMode !== 'experimental-manga' || !Number.isInteger(panelCount) || panelCount < 5 || panelCount > 8) throw new Error('incomplete_payoff_review: invalid panel count');
  const source = extractText(text).replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  const jsonText = source.match(/\{[\s\S]*\}/)?.[0];
  if (!jsonText) throw new Error('incomplete_payoff_review: JSON object not found');

  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch (error) {
    throw new Error(`incomplete_payoff_review: ${error.message}`);
  }

  if (!parsed || REVIEW_FIELDS.some((field) => !Object.hasOwn(parsed, field))) {
    throw new Error('incomplete_payoff_review: required fields are missing');
  }
  if (
    typeof parsed.pass !== 'boolean'
    || typeof parsed.setup_seed !== 'string'
    || typeof parsed.panel3_prediction !== 'string'
    || typeof parsed.panel4_outcome !== 'string'
    || typeof parsed.shift_kind !== 'string'
    || typeof parsed.visual_payoff !== 'boolean'
    || !parsed.payoff_clarity
    || typeof parsed.payoff_clarity.material_failure !== 'boolean'
    || typeof parsed.payoff_clarity.evidence !== 'string' || !parsed.payoff_clarity.evidence.trim()
    || typeof parsed.payoff_clarity.correction !== 'string'
    || (parsed.payoff_clarity.material_failure && !parsed.payoff_clarity.correction.trim())
    || typeof parsed.slogan_only !== 'boolean'
    || typeof parsed.unseeded_fact !== 'boolean'
    || !Array.isArray(parsed.visual_feasibility)
    || parsed.visual_feasibility.length !== panelCount
    || parsed.visual_feasibility.some((item, index) => item?.panel !== index + 1
      || typeof item.feasible !== 'boolean'
      || (!item.feasible && typeof item.material_loss !== 'boolean')
      || typeof item.evidence !== 'string' || !item.evidence.trim()
      || typeof item.correction !== 'string'
      || (!item.feasible && item.material_loss && !item.correction.trim()))
    || !Array.isArray(parsed.ensemble_continuity)
    || parsed.ensemble_continuity.length !== panelCount
    || parsed.ensemble_continuity.some((item, index) => item?.panel !== index + 1
      || typeof item.material_break !== 'boolean'
      || typeof item.evidence !== 'string' || !item.evidence.trim()
      || typeof item.correction !== 'string'
      || (item.material_break && !item.correction.trim()))
    || !hasCastIdentityEvidence(parsed.cast_identity, panelCount)
    || !hasCameraRhythmEvidence(parsed.camera_rhythm, panelCount)
    || (scenarioMode === 'experimental-manga' && (!Array.isArray(parsed.panel_development) || parsed.panel_development.length !== panelCount
      || parsed.panel_development.some((item,index)=>item?.panel!==index+1 || typeof item.material_padding!=='boolean'
        || typeof item.evidence!=='string' || !item.evidence.trim() || typeof item.correction!=='string'
        || (item.material_padding && !item.correction.trim()))))
    || !Array.isArray(parsed.reason_codes)
  ) {
    throw new Error('incomplete_payoff_review: invalid field types');
  }
  return parsed;
};

export const evaluateScenarioPayoffReview = (review, { punchlineType, recentScenarios = [], scenarioMode = 'four-panel', panelCount = 4 } = {}) => {
  const policy = getEndingModePolicy(punchlineType);
  const surrealMode = punchlineType === 'Surreal';
  const reasons = surrealMode
    ? new Set()
    : new Set((review?.reason_codes || []).filter(Boolean).map(String)
      // Panel evidence is authoritative, not an unsupported model-generated code.
      .filter(code => !code.startsWith('flat_ensemble_panel_') && !code.startsWith('unrenderable_panel_')
        && code !== 'repetitive_camera_sequence' && code !== 'unclear_payoff'
        && code !== 'repeated_story_mechanism' && code !== 'recent_comparison_unverified' && !code.startsWith('redundant_panel_')
        && !code.startsWith('cast_identity_panel_') && code !== 'cast_identity_unverified'));

  if (!hasCastIdentityEvidence(review?.cast_identity, panelCount)) reasons.add('cast_identity_unverified');
  else for (const item of review.cast_identity) {
    if (item.status === 'mismatch') reasons.add(`cast_identity_panel_${item.panel}`);
    if (item.status === 'uncertain') reasons.add('cast_identity_unverified');
  }

  if (recentScenarios.length) {
    const comparison = review?.recent_repetition;
    if (!comparison?.evidence?.trim() || !['distinct', 'same_mechanism', 'intentional_repeat'].includes(comparison.status)) {
      reasons.add('recent_comparison_unverified');
    } else if (comparison.status === 'same_mechanism') {
      if (Number.isInteger(comparison.matched_index) && comparison.matched_index >= 0
        && comparison.matched_index < recentScenarios.length && comparison.correction?.trim()) reasons.add('repeated_story_mechanism');
      else reasons.add('recent_comparison_unverified');
    }
  }

  if (!surrealMode && !String(review?.setup_seed || '').trim()) reasons.add('no_setup_seed');
  if (!surrealMode && !String(review?.panel3_prediction || '').trim()) reasons.add('no_panel3_prediction');
  if (!String(review?.panel4_outcome || '').trim()) reasons.add('no_panel4_outcome');
  if (!review?.visual_payoff) reasons.add('no_visual_payoff');
  if (review?.slogan_only) reasons.add('slogan_only');
  if (review?.payoff_clarity?.material_failure === true
    && review.payoff_clarity.evidence?.trim() && review.payoff_clarity.correction?.trim()) reasons.add('unclear_payoff');
  if (!surrealMode && !ALLOWED_SHIFTS.has(review?.shift_kind)) reasons.add('no_payoff_shift');
  if (!surrealMode && review?.unseeded_fact) reasons.add('unseeded_fact');
  if (policy.documentary && review?.unseeded_fact) reasons.add('documentary_fact_invention');
  for (const item of review?.visual_feasibility || []) {
    if (item?.feasible === false) reasons.add(item.material_loss === true
      ? `unrenderable_panel_${item.panel}` : `visual_detail_panel_${item.panel}`);
  }
  for (const item of review?.ensemble_continuity || []) {
    if (item?.material_break === true) reasons.add(`flat_ensemble_panel_${item.panel}`);
  }
  if (scenarioMode === 'experimental-manga') for (const item of review?.panel_development || []) {
    if (Number.isInteger(item.panel) && item.panel >= 1 && item.panel <= panelCount
      && item.material_padding === true && item.evidence?.trim() && item.correction?.trim()) reasons.add(`redundant_panel_${item.panel}`);
  }
  const camera = review?.camera_rhythm;
  if (hasCameraRhythmEvidence(camera, panelCount) && camera.material_repeat && !camera.intentional_repeat) reasons.add('repetitive_camera_sequence');
  if (!surrealMode && !review?.pass && reasons.size === 0) reasons.add('reviewer_rejected');

  return { ok: (surrealMode || review?.pass === true) && reasons.size === 0, reasonCodes: [...reasons] };
};

export const buildScenarioPayoffRepairPrompt = ({ scenario, punchlineType, review, userTopic, recentScenarios = [], mosaicCopyrightedCharacters = true, scenarioMode = 'four-panel' } = {}) => {
  const panelCount = payoffPanelCount(scenario, scenarioMode);
  const experimental = scenarioMode === 'experimental-manga';
  const surrealMode = punchlineType === 'Surreal';
  const reasonCodes = evaluateScenarioPayoffReview(review, { punchlineType, recentScenarios, scenarioMode, panelCount }).reasonCodes;
  const stagingOnly = isStagingOnlyRepair(reasonCodes);
  const identityRepair = reasonCodes.some(code => code.startsWith('cast_identity_panel_'));
  const repairReview = { ...review, reason_codes: reasonCodes,
    visual_feasibility: review?.visual_feasibility?.map(item => item.material_loss === false
      ? { ...item, correction: '' } : item) };
  if (usesBalloonPatch(scenario, reasonCodes)) return `STAGING PATCH JSON
監査で指摘された吹き出しの矛盾だけを修正する。台本全文は再出力しない。
ENDING MODE: ${punchlineType || 'Auto'}
${buildScenarioPanelCountInstruction(scenarioMode)}
監査結果: ${JSON.stringify(repairReview)}
${mosaicReviewRule(mosaicCopyrightedCharacters)}
${SCENARIO_BALLOON_LAYOUT_RULES}
出来事、台詞の話者・文言・順序、タイトル、衣装、物の所有と接触を保持する。ユーザーが指定した配置・カメラ・動作を優先し、未指定の余白・前後・高さで尾の交差を解消する。既存のCameraや状況が成立するならBalloonLayoutだけを変更する。xだけの数値合わせではなく、話者位置とanchor/routeを一緒に確認する。
出力はJSON配列のみ。各要素は {"panel":1,"field":"BalloonLayout","value":[]} の形式。panelは1〜${panelCount}、fieldは既存のCamera・BalloonLayout・状況だけ。BalloonLayoutのvalueは台詞順の配列、Cameraと状況は改行なしの文字列。必要な変更だけ出力し、同じフィールドを重複させない。成立している演技やカメラを横並び・正面へ戻さない。
${userTopic ? `USER REQUIREMENTS:\n${String(userTopic).trim()}` : ''}
ORIGINAL SCENARIO:
${String(scenario || '').trim()}`;
  return `あなたは${panelCount}コマ漫画の構成編集者です。${stagingOnly
    ? `監査で指摘された${identityRepair ? '外見・話者対応と' : ''}演技・配置・カメラだけを修正し、連続性に必要なコマだけの調整にとどめてください。題材・出来事・オチ、各コマの台詞の話者・文言・順序は変更禁止です。`
    : `監査結果を踏まえ、${panelCount}コマ目だけを差し替えるのではなく、1〜${panelCount}コマ目全体を書き直してください。`}

ENDING MODE: ${punchlineType || 'Auto'}
${buildScenarioPanelCountInstruction(scenarioMode)}
監査結果: ${JSON.stringify(repairReview, null, 2)}
${buildRecentStoryContext(recentScenarios)}
${mosaicReviewRule(mosaicCopyrightedCharacters)}

必須条件:
${identityRepair ? '- cast_identityの基準設定と台本の根拠を照合し、指摘された外見・話者対応の取り違えだけを状況・Camera・BalloonLayoutで修正する。人物名と各台詞の話者・文言・順序は保持する。誤記に合う別人へ話者を変更しない。明示された変装・髪型変更・着脱、画風差は維持し、曖昧な特徴を創作しない。' : ''}
- visual_feasibilityはmaterial_loss=trueの具体的な欠落だけを直す。既出印字の再掲可読性や補助細部だけのために、引き・アオリ・身体演技を顔中心へ変更しない。必要な情報を初めて読むコマと、身体演技を見せるコマを分け、内容に応じたコマ高と前後配置で解決する。ユーザーが明示した可読文字・カメラ・動作は保持する。
${stagingOnly ? '- 成立しているフリ・予測・帰結はそのまま保持する。新しい種や別のオチを追加しない。' : surrealMode
    ? '- 静寂型（シュール）では論理的な種、自然な予測、因果の回収を追加しない。物・設備・舞台の大破壊、因果の飛躍、支離滅裂、不条理を、真顔・沈黙・奇妙な間で目に見える笑いへ強める。辻褄合わせや後付け説明で合理化しない。'
    : `- 1〜2コマ目に具体的な種を置き、${panelCount - 1}コマ目までに読者の予測を形成し、${panelCount}コマ目ではその予測を一段ずらす帰結を人物の行動・表情・小道具・空間変化で見せる。
- ${panelCount - 1}コマ目で宣言・準備した行動を${panelCount}コマ目でそのまま実行するだけにしない。1〜2コマ目に置いた別の種を再利用し、規模・意味・対象・行為者の少なくとも1つを意外に変える。`}
- 選択された ENDING MODE を守る。シリアスでは安いギャグ反転を強制せず、選択の結果・再解釈・余韻を成立させる。
- 元シナリオの題材、人物、場所、事実、数値、時系列、明示された衣装とセリフ書式を保存する。ドキュメンタリーでは事実を発明しない。
- ${experimental ? '各コマを変形ページ内の一枚の静止画として描けるよう、' : '各コマを一枚の横長帯として描けるよう、'}Cameraから重要な顔・手元・対象物が見える位置へ人物と小道具を配置する。手は本人の肩・腕から自然につながり、対象に届くこと。監査で指摘された過密・遮蔽・距離矛盾を、カメラ・前後関係・小道具の見せ方や補助動作のコマ配分で解消する。題材の核、オチの迫力、人物の生きた演技、シュールな飛躍を弱めない。ユーザーが明示したカメラ・動作は保持する。
- 連続動作と小道具の持ち主を保ち、場面内の隣接・向かい・席位置や物の側・端は、最後に明示された人物・物の相対関係を接写・遮蔽・画面外の後も引き継ぐ。人物の移動・物の回転・場面転換に台本の根拠がある時は更新し、未指定・曖昧な関係を補って修正しない。正面から背面へ回るカメラの投影による画面左右の反転を人物の移動や入れ替えとして扱わない。働きかける人物と受け手の反応を前後関係・視線・身体の向き・重心で描き分ける。監査で指摘された横並びと同一反応を、元の出来事・台詞・意図的な静止や一斉動作を保ちながら直す。全員に余計な動作を増やさない。
- カメラ反復の指摘は、各コマの役割に合わせて撮影位置・仰俯角・距離・レンズ・ロール・配置を組み直す。全${panelCount}コマの見える投影を比較し、名称だけの変更、固定の角度巡回、全コマのアオリ化を避ける。ユーザーの固定指定、意味のある反復、連続した人物関係と読みやすい吹き出しの順・尾を保持し、画質・演技・光・勢いを弱めない。
- ${panelCount}コマ目を標語、教訓、解説だけで終わらせない。
- ${panelCount}コマ目で誰に何が起き、何が変わったのかを、前の手掛かりと最後の行動・受け手の反応で見せる。唐突な別場面や設定の後出しで出来事を帳消しにする逃げを避ける。夢・ループ・メタなどの明示指定は保ち、その型に必要な種と見て分かる落差を補う。シュールは因果説明で弱めず、視覚的な食い違いを明瞭にする。成立している睡眠・沈黙・余韻は変更しない。
- 出力は${stagingOnly ? '元のタイトル・メタデータ行を保持し、' : ''} [1コマ目: 起] から [${panelCount}コマ目: 結] までのシナリオ本文だけにする。
${userTopic ? `- 次のユーザー原文にある人物・台詞・出来事・カメラ・オチなどの明示条件を最優先で保持する。画像化の調整で削除・反転しない。\nUSER REQUIREMENTS:\n${String(userTopic).trim()}` : ''}

ORIGINAL SCENARIO:
${String(scenario || '').trim()}`;
};

const retained = (scenario, warning, review = null, renderabilityWarning = false) => ({
  scenario,
  status: 'retained',
  review,
  warning,
  renderabilityWarning,
});

export const runScenarioPayoffGate = async ({
  scenario,
  punchlineType,
  userTopic,
  recentScenarios = [],
  mosaicCopyrightedCharacters = true,
  scenarioMode = 'four-panel',
  castList = '',
  requestReview,
  requestRepair,
  validateRepair = () => true,
  onProgress = () => {},
} = {}) => {
  const original = String(scenario || '').trim();
  let firstReview;
  let firstEvaluation;

  try {
    const panelCount = payoffPanelCount(original, scenarioMode);
    if (scenarioMode === 'experimental-manga' && !validateMangaScenario(original, castList, { scenarioMode }).ok) throw new Error('invalid_native_scenario');
    if (scenarioMode === 'experimental-manga') assertGeneratedScenarioCameraContract(original, userTopic, { scenarioMode });
    onProgress(`${panelCount}コマのフリ・予測・帰結、配置・演技とカメラの反復を監査しています...`);
    firstReview = parseScenarioPayoffReview(await requestReview(buildScenarioPayoffReviewPrompt({
      scenario: original,
      punchlineType,
      recentScenarios,
      userTopic,
      mosaicCopyrightedCharacters,
      scenarioMode,
    })), { scenarioMode, panelCount });
    firstEvaluation = evaluateScenarioPayoffReview(firstReview, { punchlineType, recentScenarios, scenarioMode, panelCount });
  } catch (error) {
    onProgress(`構成・画像化の検査結果: 判定できませんでした。理由: ${error.message}。元シナリオを保持します。`);
    return retained(original, `構成・画像化監査を完了できなかったため、元シナリオを保持しました（${error.message}）。`, null, true);
  }

  if (firstEvaluation.ok) {
    onProgress(`${payoffPanelCount(original, scenarioMode)}コマの構成と画像化可能な配置が成立しています。`);
    return { scenario: original, status: 'passed', review: firstReview, warning: null };
  }
  const firstMaterialReasons = materialPayoffReasons(firstEvaluation.reasonCodes);
  if (!firstMaterialReasons.length) {
    onProgress(`構成・画像化の検査結果: ${formatPayoffReviewReasons(firstEvaluation, firstReview)}。重大欠陥ではないため再生成せず保持します。`);
    return retained(original, `構成上の軽微または未確認の指摘（${firstEvaluation.reasonCodes.join(', ')}）は再生成せず、元シナリオを保持しました。`, firstReview);
  }
  onProgress(`構成・画像化の再検査理由: ${formatPayoffReviewReasons(firstEvaluation, firstReview)}。重大な指摘だけを修正します。`);
  const maxRepairs = isStagingOnlyRepair(firstEvaluation.reasonCodes) ? 1 : 3;
  let best = { scenario: original, review: firstReview, evaluation: firstEvaluation };
  let current = best;
  let lastError = '';
  let repairAttempts = 0;
  let rechecks = 0;
  for (let attempt = 1; attempt <= maxRepairs; attempt += 1) {
    let repaired;
    try {
      onProgress(`構成・画像化を改善しています（${attempt}/${maxRepairs}）。`);
      repairAttempts += 1;
      const response = await requestRepair(buildScenarioPayoffRepairPrompt({
        scenario: current.scenario,
        punchlineType,
        review: current.review,
        recentScenarios,
        userTopic,
        mosaicCopyrightedCharacters,
        scenarioMode,
      }));
      repaired = usesBalloonPatch(current.scenario, current.evaluation.reasonCodes)
        ? applyScenarioStagingPatch(current.scenario, response, castList, { scenarioMode })
        : extractText(response).replace(/^Scenario:\s*/i, '').trim();
      if (!repaired) throw new Error('empty repair');
      const validatedRepair = await validateRepair(repaired, { scenarioMode });
      if (validatedRepair === false) throw new Error('invalid repair');
      if (typeof validatedRepair === 'string' && validatedRepair.trim()) repaired = validatedRepair.trim();
      const panelCount = payoffPanelCount(repaired, scenarioMode);
      if (scenarioMode === 'experimental-manga' && !validateMangaScenario(repaired, castList, { scenarioMode }).ok) throw new Error('invalid_native_repair');
      if (scenarioMode === 'experimental-manga') assertGeneratedScenarioCameraContract(repaired, userTopic, { scenarioMode });
      if (repaired.trim() === current.scenario.trim()) {
        lastError = 'unchanged_repair';
        onProgress('修正案に変更がないため、追加の再監査・修正は行わず、既に監査した候補を保持します。');
        break;
      }
      if (isStagingOnlyRepair(current.evaluation.reasonCodes)) {
        const guard = validateScenarioEnhancement({
          originalScenario: current.scenario, candidateScenario: repaired,
          selectedCategories: ['expressions', 'action', 'camera', 'background', 'gag'], punchlineType, scenarioMode,
        });
        const protectedChanges = guard.issueCodes.filter(code => [
          'metadata_changed', 'panel_structure_changed', 'speaker_sequence_changed', 'dialogue_changed_without_selection',
        ].includes(code));
        if (protectedChanges.length) throw new Error(`staging_only_scope_violation: ${protectedChanges.join(', ')}`);
      }
      onProgress(`改善案を再監査しています（${attempt}/${maxRepairs}）。`);
      rechecks += 1;
      const review = parseScenarioPayoffReview(await requestReview(buildScenarioPayoffReviewPrompt({
        scenario: repaired,
        punchlineType,
        recentScenarios,
        userTopic,
        mosaicCopyrightedCharacters,
        scenarioMode,
      })), { scenarioMode, panelCount });
      const evaluation = evaluateScenarioPayoffReview(review, { punchlineType, recentScenarios, scenarioMode, panelCount });
      onProgress(evaluation.ok
        ? `改善案の再検査結果 ${attempt}/${maxRepairs}: 合格。構成と画像化可能な配置を確認しました。`
        : `改善案の再検査結果 ${attempt}/${maxRepairs}: ${formatPayoffReviewReasons(evaluation, review)}。`);
      current = { scenario: repaired, review, evaluation };
      if (evaluation.ok) {
        onProgress('改善案の構成と画像化可能な配置を確認しました。');
        return { scenario: repaired, status: 'repaired', review, warning: null };
      }
      if (!materialPayoffReasons(evaluation.reasonCodes).length) {
        onProgress('重大な構成・画像化の問題は解消しました。軽微な指摘は再生成せず保持します。');
        return { scenario: repaired, status: 'repaired', review, warning: `軽微な構成指摘: ${evaluation.reasonCodes.join(', ')}` };
      }
      const materialCount = materialPayoffReasons(evaluation.reasonCodes).length;
      const bestMaterialCount = materialPayoffReasons(best.evaluation.reasonCodes).length;
      if (materialCount < bestMaterialCount
        || (materialCount === bestMaterialCount && evaluation.reasonCodes.length < best.evaluation.reasonCodes.length)) best = current;
    } catch (error) {
      lastError = error.message;
      current = best;
      onProgress(`改善案は採用せず、最良候補から再試行します（${attempt}/${maxRepairs}）。理由: ${error.message}`);
    }
  }
  const renderabilityWarning = best.evaluation.reasonCodes.some(code => code.startsWith('unrenderable_panel_'));
  const warning = `修正試行${repairAttempts}回・再監査${rechecks}回で、最良の監査済み候補を警告付きで採用します（${best.evaluation.reasonCodes.join(', ')}${lastError ? `; ${lastError}` : ''}）。`;
  onProgress(warning);
  return {
    scenario: best.scenario,
    status: best.scenario === original ? 'retained' : 'best_effort',
    review: best.review,
    warning,
    renderabilityWarning,
  };
};
