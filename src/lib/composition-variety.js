const EXPLICIT_AZIMUTH_RE = /(?:左(?:側|斜め|前|後ろ)?|右(?:側|斜め|前|後ろ)?|斜め(?:前|後ろ)?|肩越し|背後|背越し|後方|横顔|側面|over[ -]the[ -]shoulder|\bOTS\b|three-quarter|3\/4|front-left|front-right|rear(?:ward)?|side(?:ways)?|profile)/i;
const PANEL_AZIMUTH_SLOTS = [
  'LEFT-FRONT OBLIQUE: place the camera 35-55 degrees to the subject\'s left-front; turn shoulders and hips away from a square-on lens-facing pose.',
  'RIGHT-FRONT OBLIQUE: place the camera 35-55 degrees to the subject\'s right-front; put the nearer shoulder and hand visibly larger than the farther side.',
  'REAR THREE-QUARTER: place the camera behind one shoulder or 30-50 degrees toward the subject\'s rear; keep the face readable through a natural turn toward the scene partner or key action.',
  'DIAGONAL LEFT-FRONT: place the camera 30-50 degrees to the subject\'s left-front and combine it with the scripted tilt/elevation; keep the body axis diagonal rather than bilaterally centered.'
];

const COMPACT_PANEL_AZIMUTH_SLOTS = [
  'LEFT-FRONT OBLIQUE 35-55 degrees; unequal shoulder depth.',
  'RIGHT-FRONT OBLIQUE 35-55 degrees; near hand larger.',
  'REAR THREE-QUARTER 30-50 degrees; readable turned face and layered depth.',
  'DIAGONAL LEFT-FRONT 30-50 degrees; combine the scripted tilt/elevation with an asymmetric body axis.'
];

export const SCENARIO_COMPOSITION_VARIETY_RULES = `
             - **【水平方位・ポーズ多様化（通常生成で常時必須）】**:
               * カメラの高低差・傾き・強い遠近感と画角の大胆な変化を積極的に使う。会話場面でも机周りの中景や肩越しに固定しない。
               * 各[Camera:]タグには、ショット種類・高さ・傾きだけでなく、被写体に対する水平方位（左前斜め／右前斜め／背後寄り3/4／肩越し等）を物理的に明記せよ。
               * 画角を目に見える構図へ翻訳する。俯瞰なら頭頂と机の天面と床の奥行き、床近くの煽りなら手前の大きな足・手・家具から上へ伸びる身体、傾きなら斜めに走る床・机・身体の軸を具体的にCameraへ書く。強度語だけで済ませない。
               * 4コマ中、真正面は最大1コマ。最低3種類の被写体基準の水平方位を使い、隣接コマで同じ左右方向を繰り返すな。ローアングル・俯瞰・ズームの違いだけを構図差として数えてはならない。
               * 明示指定がない通常生成ではアイレベルを原則禁止し、俯瞰、ローアングル、肩越し、斜め上下など物語に合う高さを選ぶ。ユーザーが明示したアイレベルや、正確な水平視点が物語上必要な場合は保持する。
               * 主役の肩・腰・顔を毎回カメラへ正対させるな。肩・腰・顔の向きに自然な差をつけ、身体を30〜60度ひねり、左右非対称で読みやすいシルエットを作れ。
               * 両手を使う動作では、Actionの内容と手の本数を保ったまま、左右の手に前後差・高さ差・役割差をつける。両手を同じ高さでレンズ側へ広げる左右対称ポーズを既定値にするな。
               * 明示されたユーザー構図や物語上必須の視線・Actionは上書きしない。構図多様化は同じ出来事を別の物理カメラ位置と身体軸で見せるために使う。`;

// STEP2の発想と演出編集に共通。確定済みActionを画像組立時に改変する規則ではない。
export const SCENARIO_PROP_CAUSALITY_RULES = `【題材と小道具の因果】
- 小道具は登場人物がその場で何をするために必要なのかで選び、形・機能・材質・所有者を保つ。元資料の事実とユーザーが明示した小道具・形状・反復演出を最優先で保持する。
- 数値や増減を説明するだけの紙・図表を既定の主役にしない。出来事固有の設備、実物、操作と、それを受ける人物の行動を視覚証拠にする。必要な数値や文言は改変せず、原文にない出来事を事実として描かない。
- 「増える・足りない・広がる」を、同じ物の長さや枚数を増やすだけの展開へ機械的に変換しない。巻物・蛇腹・連続用紙を汎用の解決装置にせず、題材・実際の素材・明示指定が必要とする場合に使う。紙を一律に禁止したり、同じ代用品へ一律に置換したりしない。
- 既存シナリオの強化では既存の事件・展開を置き換えない。新たな小道具や伸長・継ぎ足しの仕掛けを、演技・背景・効果の強化だけを理由に追加しない。明示された操作や形状は保持し、選択カテゴリ内の見せ方を改善する。
- 小道具の単調さを避けるために絵をおとなしくしない。指定された大胆なカメラ、強い遠近感、全身演技、人物同士の働きかけと反応、見せ場と静かな間の落差を保つ。`;

export const SCENARIO_READING_RHYTHM_RULES = `【視線誘導と密度の緩急】
- 4コマ全体を読んで、物語上の見せ場と、それを引き立てる静かな間を選ぶ。何コマ目を最大にするか固定せず、全コマを最大音量にも同じ密度にも揃えない。明示された静けさ・反復構図・演出は優先する。
- 各コマの注視対象を、既存の表情・手の動き・重要な小道具などから1つ定め、「状況」に具体化する。在場と画面内の主張を分け、必要な脇役は小さく／低コントラスト／背面など、指定動作・視線・人物の同一性を保てる見せ方にする。全員を同じ大きさの顔で並べない。見せ場は小さな発見や沈黙でもよい。
- 描き込むコマ・選択的に省くコマ・背景を大胆に省略する抽象コマを、物語に合わせてCamera／状況へ明記する。抽象コマでは既に伝えた場所の描き直しより感情と動作を優先し、白地や平坦な面を使ってよい。物語に必要な小道具・接触・位置関係は残す。デフォルメは許可された画風とコマだけで顔・身体のシルエットを大胆に変え、参照画風固定や明示された通常頭身を守る。
- 注視対象には人物同士の働きかけと受け止めも含む。相手の視線・顔・手の反応が必要なら、脇役という理由で小さくぼかさない。人物ごとに視線の対象、重心、左右の手、反応の段階を描き分け、明示された一斉動作は保つ。カメラの高低差だけでなく引きと寄り、身体軸と前後差を大胆に使う。
- 吹き出しは右上から左下へ元の発言順に読めるよう、主な注視対象と干渉しない余白へ配置する。文字量に応じた大きさと高さの差を作り、全コマで同じ頭上の横一列に揃えない。話者と尾の対応、台詞の全文・数・順を保持する。
- 隣接コマの人物の大きさ、余白、背景の描き込み、光と効果の密度に意味のある落差を作る。静かなコマでも場所と奥行き、環境の形・明暗のまとまりを保つ。被写界深度に応じて焦点から離れた背景はぼかしてよい。主役・手元・重要な小道具は明瞭にし、同じ距離の物には整合するピントを与える。背景の白抜きを既定にせず、残す空間と省く細部、ピントの位置をCamera・状況へ具体化する。妄想や小物で全ての隙間を埋めず、密度調整のために台詞を削らない。
- 強弱の理由は既存のCameraや状況へ反映し、画像に設計ラベルや説明文を追加しない。4コマの等分枠、人物、出来事、指定Camera/Action、画風の指定を守る。`;

// 4コマ専用。API/Web双方で同じ短い契約を保持し、圧縮による欠落を防ぐ。
export const MANGA_READING_RHYTHM_LOCK = 'PAGE READING RHYTHM (direction only; never print): choose one primary focal target per panel from the scripted face/action/prop. Build a story-motivated peak and a contrasting quiet beat; no fixed peak panel, no uniform density. Vary subject scale, negative space and background/VFX density; silence can be the peak. ABSTRACT BEAT: explicitly scripted background omission may use blank or graphic fields between detailed setting shots; keep story props/contacts/spatial relationships. Deform only as allowed by panel style and script; never override reference-style or normal-proportion locks. INTERACTION: focal action includes its receiver; keep reaction gaze/face/hands readable, keep required reactors sharp. INDIVIDUAL ACTING: distinguish gaze targets, weight, hands and response phase; preserve scripted synchronized actions and bold camera/body axes. DEPTH OF FIELD: in physical-setting shots retain setting/depth and recognizable environmental shapes/light masses. Distant backgrounds may blur according to focal distance; focal faces/hands/story props stay sharp, equal-depth objects share focus. Quiet beats reduce background contrast/detail, not spatial context; no default blank backdrop unless explicitly scripted. Keep required cast once; supporting cast smaller/lower contrast when Camera/Action permits, not equal portraits. Preserve required gaze, gestures, contacts and identifiable features. Do not fill every gap with invented props or fantasies. Route bubbles upper-right to lower-left in exact dialogue order, stagger heights and size to text, tails to assigned speakers; clear faces/hands/props, no crossing tails. Preserve all dialogue, cast, actions, explicit camera/quiet/repeated framing, style and equal four-panel layout. Rhythm never overrides explicit direction.';
export const MANGA_READING_RHYTHM_LOCK_COMPACT = 'PAGE READING RHYTHM: one primary focal target/panel; peak/quiet beat, negative space/density. ABSTRACT BEAT: scripted BG omission; props stay. INTERACTION: reaction readable; supporting cast smaller/lower contrast if unneeded. ACTING: gaze/weight/hands vary. DEPTH OF FIELD: real shots retain setting/depth; far blur; no default blank backdrop. Bubbles: text-fit, right-to-left, speaker tails. Script/style/layout win; never print.';

export const SCENARIO_GESTURE_VARIETY_RULES = `
             - **【身体演技・ジェスチャー多様化（通常生成で常時必須）】**:
               * キャラクター参照画像に写るポーズは顔・髪・衣装・体格の同一性資料であり、性格を示す定番動作ではない。参照ポーズを各コマのActionや決めポーズとして反復するな。
               * 4コマ全体で最低3種類の身体演技を使う。物を扱う、移動・重心移動、相手との受け渡し、環境へ働きかける、抑制した反応、動作後の余韻などを、物語の因果に合わせて選ぶ。
               * 指し示し、突き出し、支持面への打撃を一つの系統として回数制限しない。対象・目的・身体の軸・動作の大きさを変えて、全身の誇張や強い短縮遠近法も積極的に使う。
               * 静かな間と大きなリアクション、寄りと引き、通常絵と指定された劇画・ちびキャラ・集中線の落差でコマの緩急を作る。明示された無反応や静けさは保ち、全コマを大騒ぎにも静止画にも揃えない。
               * 各Actionでは動作の直前・最中・直後のどの瞬間か、支持脚または着座面、重心、左右の手の役割、接触対象を具体化する。顔、重要な手、小道具が重ならない読みやすいシルエットを作る。
               * 全コマの寄りが明示されていない限り、動きの頂点では少なくとも1コマ、主役の頭から足先までが入る画角を確保し、腰のひねり・膝・支持脚・踏み出しやのけぞりで演じる。机や吹き出しで毎回下半身を隠さない。別のコマの寄りや静かな間と画面内の人物の大きさ・重心の動きをはっきり変える。
               * ユーザーが明示した動作は必ず保持する。人物の同一性、台詞、小道具の所有・向きと手足の接続・本数を保ち、同じ出来事を大胆に演じる。`;

export const MANGA_COMPOSITION_VARIETY_LOCK = `MANGA CAMERA / POSE VARIETY LOCK:
- Across the four panels, use at least three distinct subject-relative azimuths. Differences in elevation, zoom, lens, or crop alone do not count as different azimuths.
- NO default eye-level shot. Unless an eye-level view is explicitly scripted or physically required by the story, use a motivated high, low, overhead, ground-level, or vertically oblique camera position.
- Use no more than one flat front-on panel. Unless direct address is explicitly scripted, do not square the main subject's face, shoulders, hips, and both hands toward the lens at the same time.
- Preserve every scripted Camera shot type, elevation, tilt, Action, prop, limb count, and eye-line. When the Camera lacks a horizontal azimuth, add the panel's COMPOSITION STAGING direction instead of replacing the scripted shot.
- Build asymmetrical silhouettes with a 30-60 degree torso turn, unequal shoulder depth, and clear near/mid/far layers. Alternate left-front, right-front, rear three-quarter, and over-the-shoulder depth across the page.
- For any two-handed action, keep exactly the scripted two hands but stagger the hands in depth and/or height. Give the two hands distinct physical roles when the Action permits; never default to both palms spread equally toward the viewer.
- Radial speed lines, centered impact VFX, or a screen-filling expression must follow the chosen oblique perspective and must not force bilateral front-facing symmetry.`;

export const MANGA_COMPOSITION_VARIETY_LOCK_COMPACT = 'MANGA CAMERA / POSE VARIETY LOCK: >=3 azimuths; NO default eye-level shot unless explicitly scripted or story-required; max 1 flat front-on panel; preserve camera/action/props/limbs; turn torso; stagger hands in depth/height; VFX follows angle.';

export const MANGA_GESTURE_VARIETY_LOCK = `BODY ACTING / GESTURE VARIETY LOCK:
- A reference-sheet pose is identity evidence, not a recurring action or personality signature. Reproduce identity and clothing, but derive acting from the current story beat.
- Across the four panels, use story-motivated acting contrast: full-body exaggeration, recoil, leaps, reaching and impact may alternate with a deliberate quiet beat. Do not impose a numeric cap on pointing, thrusting or surface impact; vary purpose, body axis and amplitude.
- Preserve every explicitly scripted pointing, reaching, presenting, or surface impact action. Enrich its silhouette and amplitude without changing the event, contact target or prop ownership. Do not default every scene to folded arms, chin-resting or seated explanations.
- Preserve exact hand pose/contact/gaze from Action; no stock-pose substitution. Style, camera aids and default conversational eye-lines never override the scripted performance.
- For each lead action, resolve the action phase, weight-bearing support, center of gravity, left/right hand roles, and contact target. Keep the face, important hands, and story prop readable in a clean asymmetrical silhouette.
- Prefer story-specific alternatives when compatible with Action: handling or exchanging a prop, stepping or turning with weight shift, changing distance to a scene partner, interacting with the environment, a restrained reaction, or the follow-through after an action.`;

export const MANGA_GESTURE_VARIETY_LOCK_COMPACT = 'BODY ACTING / GESTURE VARIETY LOCK: reference-sheet pose is identity evidence, not a recurring action; full-body exaggeration; preserve explicitly scripted pointing/surface impact and exact hand pose/contact/gaze; no stock-pose substitution; action phase/support/contact.';

export const SCENARIO_SHOT_DESIGN_RULES = `【画角と身体動作の一体設計】
- 各コマのCameraとActionを一組として設計する。既存の出来事・セリフ・小道具の持ち主は固定し、同じ瞬間の見せ方と動作の振幅を具体化する。
- 動きの頂点のコマでは、主役の頭から足先まで入る引き、手前へ迫る手足、腰・膝・支持脚を使う大きな重心移動を組み合わせる。大きな口だけで激しさを代用しない。全身動作が机や吹き出しに隠れる配置を避ける。
- 全員の全身を同時に見せる必要はない。動きの主役1人の頭・腰・両膝・両足先をコマ内に収め、頭上と両靴の外側に余白を残す距離までカメラを引く。その主役とカメラの間に机を置かない。机の横の空いた床から撮るなど、下半身を家具が隠さない位置を選ぶ。他の人物は反応と小道具の役割を保って前後に配置する。
- 対照となるコマには寄りまたは静かな引きを置き、隣接コマで人物の大きさ、カメラの高さ、身体の傾き、光と効果の密度を変える。全コマを同じ中景・机越し・大騒ぎにしない。
- 明示された静かな間、無反応、着座、接触対象は保持する。背景の同僚は自然に配置できるが、主役の増殖は不可。
- Cameraには撮影位置と画面に見える証拠を書く。俯瞰なら頭頂・机天面、床からの煽りなら大きな前景と上へ伸びる身体、傾きなら斜めの環境線、全身なら頭から足先と明記する。`;

// Turn a shot label into observable framing cues; never replace explicit crop/angle.
export const getPanelShotExecution = (camera = '') => {
  const text = String(camera);
  const cues = [];
  const close = /close|アップ|寄り|接写/i.test(text);
  if (!close && /full[ -]body|head.to.(?:toe|feet)|全身|頭から(?:足先|つま先|靴)|足元から上半身/i.test(text)) cues.push('head-to-feet inside panel with headroom and floor beyond BOTH shoes; hips/knees/feet unobscured');
  if (/overhead|high[ -]angle|俯瞰|真上|斜め上|上から/i.test(text)) cues.push('look down: head/shoulder tops, shortened torsos, upper prop faces; keep projection even with omitted BG');
  else if (/low[ -]angle|dominant low|floor.level|ground.level|ローアングル|煽り|下から|見上げ/i.test(text)) cues.push('look up from low camera; large near plane, rising body axes');
  if (/dutch|tilt|傾き|傾斜/i.test(text)) cues.push('tilt scene axes, not only faces');
  return cues.length ? `SHOT EXECUTION: ${cues.join('; ')}.` : '';
};

export const getPanelCompositionAssist = (panelText, panelNumber, { compact = false } = {}) => {
  if (EXPLICIT_AZIMUTH_RE.test(String(panelText || ''))) {
    return compact
      ? 'PRESERVE EXPLICIT AZIMUTH; keep a diagonal asymmetric body.'
      : 'PRESERVE EXPLICIT AZIMUTH: keep the scenario\'s named horizontal direction; retain a diagonal body axis and avoid flat bilateral symmetry unless direct address is explicitly scripted.';
  }

  const index = Math.max(0, (Number(panelNumber) || 1) - 1) % PANEL_AZIMUTH_SLOTS.length;
  return compact ? COMPACT_PANEL_AZIMUTH_SLOTS[index] : PANEL_AZIMUTH_SLOTS[index];
};
