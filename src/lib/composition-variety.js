const EXPLICIT_AZIMUTH_RE = /(?:左(?:側|斜め|前|後ろ)?|右(?:側|斜め|前|後ろ)?|斜め(?:前|後ろ)?|肩越し|背後|背越し|後方|横顔|側面|正面|over[ -]the[ -]shoulder|\bOTS\b|three-quarter|3\/4|front-left|front-right|front[ -]on|frontal|rear(?:ward)?|side(?:ways)?|profile)/i;
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
             - **【物語に合わせた水平方位・ポーズの設計】**:
               * カメラの高低差・傾き・強い遠近感と画角の大胆な変化を積極的に使う。会話場面でも机周りの中景や肩越しに固定しない。
               * 各[Camera:]タグには、ショット種類・高さ・傾きだけでなく、被写体に対する水平方位（左前斜め／右前斜め／背後寄り3/4／肩越し等）を物理的に明記せよ。
               * カメラ名の変更だけを変化として数えない。肩越し・三分割・ボケは高さを指定しない。アオリ／俯瞰、上下左右の撮影位置、寄り引き、レンズの遠近感を別々に設計し、会話や静かな場面をアイレベルへ一律に揃えない。ズームインは被写体が占める範囲、ズームアウトは人物の小ささと周囲の広がり、望遠効果は遠い撮影位置と長い焦点距離による背景の相対的な大きさ・距離の圧縮で示す。ボケだけを望遠効果としない。
               * 画角を目に見える構図へ翻訳する。俯瞰なら頭頂と机の天面と床の奥行き、床近くの煽りなら物語上の見せ場に合う手・顔・重要な小道具・環境の奥行きから上へ伸びる身体、傾きなら斜めに走る床・机・身体の軸を具体的にCameraへ書く。足だけを手前へ大きく突き出す構図を既定にしない。走る・踏み込む・蹴るなど脚の動き自体が見せ場のときだけ、支持脚と重心が読める足の短縮遠近法を使う。強度語だけで済ませない。
               * 新規構成では文字を読むコマと身体演技を見せるコマの役割を考え、毎コマで画面の全文・全員の顔・全身を同時に見せる必要を作らない。アオリは対象の顔より低い撮影位置と見える下面、望遠は異なる距離の既存の人物・環境の比較を確保する。ちびキャラや低い姿勢でも投影をアイレベルへ戻さない。既存台本では台詞・出来事・明示された可読文字や動作を削除せず、その条件で成立する見せ方を選ぶ。
               * 物に印字された文字と吹き出し・字幕を区別する。印字は物の面と同じ透視投影に従い、吹き出し・字幕の可読性はカメラの高さや向きを拘束しない。文字を読むコマでも正面・アイレベルを既定にせず、指定文言と物の使用方向を保てる斜め・俯瞰などの位置を選ぶ。
               * 水平方位やショットの種類数にノルマを設けず、見せ場と静かな間に合う位置を選ぶ。未指定部分には左右・前後・高低・寄り引きの変化を使い、指定された正面・アイレベル・反復構図は保持する。
               * 主役の肩・腰・顔の向きは視線と動作に合わせる。動きの見せ場には自然なひねりと前後差を使い、静止や左右対称が指定された場面へ角度やひねりを追加しない。
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
- 強弱の理由は既存のCameraや状況へ反映し、画像に設計ラベルや説明文を追加しない。内容に応じた高さの4コマ枠、人物、出来事、指定Camera/Action、画風の指定を守る。`;

// 4コマ専用。API/Web双方で同じ短い契約を保持し、圧縮による欠落を防ぐ。
export const MANGA_READING_RHYTHM_LOCK = 'PAGE READING RHYTHM (direction only; never print): choose one primary focal target per panel from the scripted face/action/prop. Build a story-motivated peak and a contrasting quiet beat; no fixed peak panel, no uniform density. Vary subject scale, negative space and background/VFX density; silence can be the peak. ABSTRACT BEAT: explicitly scripted background omission may use blank or graphic fields between detailed setting shots; keep story props/contacts/spatial relationships. Deform only as allowed by panel style and script; never override reference-style or normal-proportion locks. INTERACTION: focal action includes its receiver; keep reaction gaze/face/hands readable, keep required reactors sharp. INDIVIDUAL ACTING: distinguish gaze targets, weight, hands and response phase; preserve scripted synchronized actions and bold camera/body axes. DEPTH OF FIELD: in physical-setting shots retain setting/depth and recognizable environmental shapes/light masses. Distant backgrounds may blur according to focal distance; focal faces/hands/story props stay sharp, equal-depth objects share focus. Quiet beats reduce background contrast/detail, not spatial context; no default blank backdrop unless explicitly scripted. Keep required cast once; supporting cast smaller/lower contrast when Camera/Action permits, not equal portraits. Preserve required gaze, gestures, contacts and identifiable features. Do not fill every gap with invented props or fantasies. Draw balloon bodies before actors or art: reserve them from each Dialogue BUBBLE SLOTS map, independent of body and speaker positions. Treat the coordinates as hard constraints; x=0 is the viewer/page left edge and x=100 the viewer/page right edge. For Japanese right-to-left reading, the first scripted line must be physically nearest the panel right border even when its speaker stands on the left; the second line must be physically left of it. For two bubbles B1 is far right (about 67%) and B2 far left (about 33%). B1 is rightmost, B2 is strictly left of B1, and every later body is strictly left of its predecessor. Freeze balloon bodies at those slots before drawing characters; never move a body toward its speaker. Only afterward route each mapped tail across the panel to its speaker, even when the tail must be long. TAIL GEOMETRY: root on the lower half near lower-center, on its speaker-facing side; take the shortest unobstructed route; never cross, overlap, or pass over any head, face, hair, or dialogue text; the tip touches the mapped mouth/head. Never let tail convenience, character order, or vertical staggering reverse x order; never swap text, tails, speakers, or characters. Size to text and keep faces/hands/props clear using separate clear tail routes. Preserve all dialogue, cast, actions, explicit camera/quiet/repeated framing, style and content-driven four-panel heights. Rhythm never overrides explicit direction.';
export const MANGA_READING_RHYTHM_LOCK_COMPACT = 'PAGE READING RHYTHM: one primary focal target/panel; peak/quiet beat, negative space/density. ABSTRACT BEAT: scripted BG omission; props stay. INTERACTION: reaction readable; supporting cast smaller/lower contrast. ACTING: gaze/weight/hands vary. DEPTH OF FIELD: real shots retain setting/depth; far blur; no default blank backdrop. DRAW BODIES BEFORE ART: right-to-left SLOTS; x=0 left,100 right; route tails to speakers. Freeze bodies. B1 rightmost regardless of speaker; later bubbles strictly left. TAIL GEOMETRY: root on lower half near lower-center, speaker-facing; shortest unobstructed route; never cross/overlap/pass over head/face/hair/text; tip touches mapped mouth/head.';

export const SCENARIO_GESTURE_VARIETY_RULES = `
             - **【物語に合わせた身体演技・ジェスチャー】**:
               * キャラクター参照画像に写るポーズは顔・髪・衣装・体格の同一性資料であり、性格を示す定番動作ではない。参照ポーズを各コマのActionや決めポーズとして反復するな。
               * **ACTING IDENTITY**: キャラクター情報に明示された前傾・姿勢の保ち方・身振りの振幅や頻度・視線の使い方・物を確認する癖などの演技傾向は、各人物を見分ける一貫した偏りとして反映する。ただし同じポーズを全コマで反復しない。物語のAction、動作段階、相手、接触対象に応じて同じ傾向を別の動きとして表す。参照画像のポーズだけから演技傾向を推測しない。
               * 身体演技の種類数にノルマを設けない。物を扱う、移動・重心移動、相手との受け渡し、環境へ働きかける、抑制した反応、動作後の余韻などを、物語の因果に合わせて選ぶ。
               * 指し示し、突き出し、支持面への打撃を一つの系統として回数制限しない。対象・目的・身体の軸・動作の大きさを変えて、全身の誇張や強い短縮遠近法も積極的に使う。
               * 静かな間と大きなリアクション、寄りと引き、通常絵と指定された劇画・ちびキャラ・集中線の落差でコマの緩急を作る。明示された無反応や静けさは保ち、全コマを大騒ぎにも静止画にも揃えない。
               * 各Actionでは動作の直前・最中・直後のどの瞬間か、支持脚または着座面、重心、左右の手の役割、接触対象を具体化する。顔、重要な手、小道具が重ならない読みやすいシルエットを作る。
               * 1人に同時表示する手の役割は、左手1つ・右手1つの最大2つに限定する。各役割の左右を明記し、両手が埋まっている人物へ眼鏡調整・指差し・拭く・持つ等の第三の手動作を追加しない。前の動作から次へ移る場合は、最終瞬間に見える左右2役だけを書き、完了済みの手動作を同時に残さない。
               * 全コマの寄りが明示されていない限り、動きの頂点では少なくとも1コマ、主役の頭から足先までが入る画角を確保し、腰のひねり・膝・支持脚・踏み出しやのけぞりで演じる。机や吹き出しで毎回下半身を隠さない。別のコマの寄りや静かな間と画面内の人物の大きさ・重心の動きをはっきり変える。
               * ユーザーが明示した動作は必ず保持する。人物の同一性、台詞、小道具の所有・向きと手足の接続・本数を保ち、同じ出来事を大胆に演じる。`;

export const MANGA_COMPOSITION_VARIETY_LOCK = `MANGA CAMERA / POSE VARIETY LOCK:
- Preserve scripted Camera/Action, props, limbs and eye-lines, including quiet and repeated shots, frontal views and symmetry. There is no numeric variety quota.
- Eye-line is gaze, not camera height. Execute elevation, azimuth, crop and lens depth separately; chibi, large foreground, OTS or bokeh alone do not establish a different camera angle.
- Where direction is unspecified, use story-motivated changes in azimuth, height, tilt, scale and depth; retain bold perspective and readable body acting at the story's peak. When strong perspective serves that beat, choose one story-relevant focal form (hand, face, key prop, or environmental depth); do not default to a foot thrust. Use a foreshortened foot only when the scripted action makes the leg itself the story-relevant focal form.
- COMPOSITION STAGING fills an unspecified azimuth only. Turn the torso and stagger hands in depth/height when the Action permits; preserve exact hand roles, support and contacts.
- VFX follows the chosen camera and never forces a different pose or framing.`;

export const MANGA_COMPOSITION_VARIETY_LOCK_COMPACT = 'MANGA CAMERA / POSE VARIETY LOCK: Camera wins. Eye-line is gaze, not camera height. Use story-relevant focal form; not default foot thrust. Stagger hands in depth.';

// 4コマの追加演出だけを従属させ、台本・人物・媒体の制約は短縮時も保持する。
export const MANGA_PROMPT_PRIORITY = 'PROMPT PRIORITY: protect cast/count/identity/glasses, wardrobe, exact script, Camera geometry, layout/style/medium. CAMERA FIRST: project actors/props from fixed Camera; never relocate for legibility or chibi. No screen-left/right mirroring. Simplify only unspecified background texture and decorative VFX. Never print.';

export const MANGA_GESTURE_VARIETY_LOCK = `BODY ACTING / GESTURE VARIETY LOCK:
- A reference-sheet pose is identity evidence, not a recurring action or personality signature. Reproduce identity and clothing, but derive acting from the current story beat.
- ACTING IDENTITY LOCK: Preserve explicit cast-profile acting tendencies as character-specific biases in lean, posture, gesture amplitude/frequency, gaze behavior and prop-check habits. Express each bias through the scripted action and action phase; never freeze it into the same repeated pose, infer it from a reference-sheet pose, or override camera, anatomy, contact or story action.
- Across the four panels, use story-motivated acting contrast: full-body exaggeration, recoil, leaps, reaching and impact may alternate with a deliberate quiet beat. Do not impose a numeric cap on pointing, thrusting or surface impact; vary purpose, body axis and amplitude.
- Preserve every explicitly scripted pointing, reaching, presenting, or surface impact action. Enrich its silhouette and amplitude without changing the event, contact target or prop ownership. Do not default every scene to folded arms, chin-resting or seated explanations.
- Preserve exact hand pose/contact/gaze from Action; no stock-pose substitution. Style, camera aids and default conversational eye-lines never override the scripted performance.
- For each lead action, resolve the action phase, weight-bearing support, center of gravity, left/right hand roles, and contact target. Keep the face, important hands, and story prop readable in a clean asymmetrical silhouette.
- Prefer story-specific alternatives when compatible with Action: handling or exchanging a prop, stepping or turning with weight shift, changing distance to a scene partner, interacting with the environment, a restrained reaction, or the follow-through after an action.`;

export const MANGA_GESTURE_VARIETY_LOCK_COMPACT = 'BODY ACTING / GESTURE VARIETY LOCK: reference-sheet pose is identity evidence, not a recurring action. ACTING IDENTITY: vary explicit lean/posture/gesture/gaze/prop-check by Action. Preserve explicitly scripted pointing/surface impact, exact hand pose/contact/gaze, no stock-pose substitution; action phase/support/contact.';

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
  const close = /close[ -]?up|deep emotion close|zoom[ -]?in|ズームイン|アップ|寄りの|寄る|接写/i.test(text);
  const full = /full[ -]body|graceful full shot|head.to.(?:toe|feet)|全身|頭から(?:両)?(?:足先|つま先|靴)|足元から上半身/i.test(text);
  const floor = /(?:floor|ground)[ -]level|(?:床|地面)(?:すれすれ|近く|付近|から)|低い(?:撮影)?位置/i.test(text);
  const horizontal = /水平(?:に|の|を保)|horizontal|level aim/i.test(text);
  if (close) cues.push('tight crop on focal subject');
  else if (full) cues.push('head-to-feet inside panel with headroom and floor beyond BOTH shoes; hips/knees/feet unobscured');
  else if (/zoom[ -]?out|ズームアウト|引き|全景|遠景|epic wide|wide shot|long shot/i.test(text)) cues.push('smaller subject; more setting');
  if (/overhead|high[ -]angle|innocent high|俯瞰|真上|斜め上|上から|見下ろ[すし]/i.test(text)) cues.push('look down: head/shoulder tops, shortened torsos, upper prop faces; keep projection even with omitted BG');
  else if (!horizontal && /low[ -]angle|dominant low|ローアングル|アオリ|煽[りる]|下から|見上げ/i.test(text)) cues.push('look up: lower face/prop undersides, horizon below face, upward convergence; preserve the scripted proportions; not eye-level');
  else if (floor) cues.push(`floor-level camera below faces even when crouched/chibi; ${horizontal ? 'keep horizontal aim and a low horizon' : 'project nearby prop undersides from below'}; do not reset to subject eye-level`);
  if (/の(?:左|右)?(?:後方|後ろ|背中側)|rear[ -]view|from (?:the )?(?:(?:left|right)[ -])?rear/i.test(text)) cues.push('show back planes of the scripted subject; preserve crop/distance, no forced close OTS');
  if (/telephoto|long[ -]lens|望遠/i.test(text)) cues.push('distant camera + long focal length: compressed depth, background relatively larger/closer; overlapping depth planes at similar scale, weak convergence of receding edges; not blur alone');
  else if (/wide[ -]angle|fisheye|広角|魚眼|hyper perspective/i.test(text)) cues.push('near/far scale contrast; keep focal subject');
  if (/dutch|tilt|cinematic slant|傾き|傾斜/i.test(text)) cues.push('tilt scene axes, not only faces');
  return cues.length ? `SHOT EXECUTION: ${cues.join('; ')}.` : '';
};

export const getPanelCompositionAssist = (panelText, panelNumber, { compact = false } = {}) => {
  const camera = String(panelText || '').match(/\[Camera:\s*([^\]]+)\]/i)?.[1] || '';
  if (EXPLICIT_AZIMUTH_RE.test(camera)) {
    return compact
      ? 'PRESERVE EXPLICIT AZIMUTH; keep scripted body orientation and symmetry.'
      : 'PRESERVE EXPLICIT AZIMUTH: keep the scenario\'s named horizontal direction, body orientation and symmetry; do not add a conflicting turn.';
  }

  const index = Math.max(0, (Number(panelNumber) || 1) - 1) % PANEL_AZIMUTH_SLOTS.length;
  return compact ? COMPACT_PANEL_AZIMUTH_SLOTS[index] : PANEL_AZIMUTH_SLOTS[index];
};
