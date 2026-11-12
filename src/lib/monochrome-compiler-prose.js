// アプリ所有の白黒規則だけを同じ条件の日本語へ変換する。台本/Actionには適用しない。
const MONOCHROME_COMPILER_TRANSLATIONS = [
  [
    "Physical shots retain recognizable setting anchors and depth; scripted abstract beats may omit scenery, never story evidence. Simplify nonessential detail; keep focal actions and required reactions readable.",
    "物理場面は場所を識別できる手掛かりと奥行きを保つ。脚本の抽象場面は背景を省略できるが、物語の証拠は省略不可。不要な細部を整理し、主動作と必要な反応を読めるようにする。"
  ],
  [
    "Establish one primary focal subject or action per image/panel and at most one supporting focal cue. Make the primary subject the first read through scale, placement, light and contrast. Give its silhouette, acting face, important hand and story prop the strongest contour within its panel recipe: clear style-specific strokes with the boldest contact/overlap accents on that focal path. Render secondary figures and background detail with a clear step down to lighter, thinner, lower-contrast lines or controlled depth-of-field. Omit nonessential micro-detail instead of making every object equally sharp.",
    "各画像/コマの主焦点は人物か動作一つ、補助焦点は最大一つ。大きさ・配置・光・対比で主焦点を最初に読ませる。輪郭・演技する顔・重要な手・物語の道具へ、指定媒体の最も明瞭な線と、主焦点の接触/重なり部分の強いアクセントを置く。脇役と背景は一段細く軽く低対比の線か、制御した被写界深度で弱める。全物体を等しく鮮明にせず、不要な微細描写を省く。"
  ],
  [
    "FOCAL READABILITY: Focal ink follows the panel recipe; NORMAL=pressure-taper. Camera scale/height/side/head turn fixed; visible features only. 後姿=後頭/肩/重心、指定横顔優先。輪郭/接触を強く、顔/手の細線を分離し一律太線/潰れ禁止。反応/道具/文字を鮮明に。白黒面・輪郭光・線間の白。融合時は背景線を減らす/明るい形の背後に局所黒/媒体の墨を強める。場所/奥行/光/同一性/トーン/視線/斜線構図/余白を保持、発光禁止。 FOCUS PLAN: scene-led speaker/reaction partner/main action sharp; optional near/far soft/thin/pale; equal depth=same focus. Required text/contact/reactions readable; explicit deep focus/abstract style wins. Keep setting shapes.",
    "FOCAL READABILITY: 墨線は各媒体に従い、NORMALは筆圧による先細り。Cameraの距離/高さ/側面/顔向きを固定し、見える部位だけを描く。後姿は後頭/肩/重心、指定横顔を優先。輪郭/接触を強め、顔/手の細線を白い隙間で分離。一律太線/潰れ禁止。反応/道具/文字を鮮明に。白黒面・輪郭の白抜き・線間の白で分離し、融合時は背景線を減らす/明るい形の背後へ局所黒/媒体の墨を強める。場所/奥行/光/同一性/トーン/視線/斜線構図/余白を保持、発光禁止。FOCUS PLAN: 場面に即す話者/反応相手/主動作は鮮明に、任意の前後景は柔らかく細く淡く。同じ奥行きは同じ焦点。必要な文字/接触/反応と場所の形を保ち、明示の深い焦点/抽象画風を優先。"
  ],
  [
    "Keep light direction coherent through bounded ink shadows and white light planes; simplify distant line density while keeping environmental shapes and focal subjects readable.",
    "限定した墨の影と紙白の明部で光の方向を統一。遠景の線密度を減らしても環境の形と主対象を読めるように保つ。"
  ],
  [
    "BODY VOLUME: connected form shadows turn with limbs/torso; hair/jaw/clothing cast shadows. Follow light direction; no fixed shadow quota. Shade=bounded screen/black; lit=canonical base, no wash. FACE INK: tapered eyes/nose/mouth; white gaps, no feature merging or disappearing hairlines. Bold silhouettes/fine face lines; keep expression.",
    "BODY VOLUME: 連続した形の陰影は手足/胴の回転に沿わせ、髪/顎/衣服の落ち影を描く。光の方向に従い、固定の影面積を課さない。影は限定した網点/黒、明部は既定ベースで塗り膜なし。FACE INK: 目/鼻/口は先細る墨線と白い隙間で分離し、顔部品の融合/髪際の消失を防ぐ。強いシルエットと細い顔線で表情を保持。"
  ],
  [
    "Add clothing-fold shadows only where fabric overlaps, pinches, or intersects: use clean, localized cel-shaded shadow planes, never random geometric patterns or texture noise.",
    "服の折り影は布の重なり/つまみ/交差に限り、明瞭な局所セル影面で描く。無関係な幾何模様やノイズを加えない。"
  ],
  [
    "Keep surfaces clean: intentional regular black-on-white screentone and hatching are allowed, never random noise, moire or floating dust. Keep lit light skin, bubbles and gutters pure white. Scripted abstract beats may omit scenery, never story evidence.",
    "面を清潔に保つ。意図した規則的な白黒網点/カケアミは許容し、ランダムノイズ/モアレ/浮遊塵は禁止。明るい肌の明部・吹出内・溝は紙白。脚本の抽象場面では背景省略可、物語の証拠は省略不可。"
  ],
  [
    "MONOCHROME THREE-TONE MANUSCRIPT: #000000/#FFFFFF + screentone; drawing materials, not a pixel limit; no grayscale/color.",
    "MONOCHROME THREE-TONE MANUSCRIPT: #000000/#FFFFFFと網点による画材指定。画素値の制限ではない。グレー塗り/カラー禁止。"
  ],
  [
    "BLACK INK PLATE: redraw; refs=identity, not palette.",
    "BLACK INK PLATE: 墨で描き直す。参照は同一性資料で、配色の指定ではない。"
  ],
  [
    "WHITE PAPER RESERVE: unassigned lit planes=white; no face/panel/BG veil. Assigned bases and motivated shadows may be broad.",
    "WHITE PAPER RESERVE: 未割当の明部は白。顔/コマ/背景の全体膜は禁止。割当ベースと光に基づく影は広くてもよい。"
  ],
  [
    "SKIN PAPER BASE: lit light skin=#FFFFFF, identical to balloon interiors. No base wash/texture. Form and cast shadows use bounded screen/black shapes.",
    "SKIN PAPER BASE: 白肌明部=#FFFFFF、吹出内と同じ紙白。下塗り/質感膜なし。形の陰影と落ち影は限定した網点/黒の面。"
  ],
  [
    "SCREENTONE: consistent bases; bounded shadows; no grey wash/gradient/tint/moire; 全体膜禁止。",
    "SCREENTONE: ベース統一、影の範囲を限定。グレー塗り/グラデ/色味/モアレ/全体膜は禁止。"
  ],
  [
    "SCREEN MASK: bounded; unassigned=white; no dots/grain. Never convert brightness to dots; area alone is not a defect.",
    "SCREEN MASK: 範囲を限定。未割当は白、網点/粒子なし。明度から網点へ変換しない。面積だけでは欠陥としない。"
  ],
  [
    "TONE PLACEMENT: lit light skin/light materials=paper white; middle shadows=screentone; deepest shadows=solid black. Never substitute flat-gray paint for screentone.",
    "TONE PLACEMENT: 白肌/明るい素材の明部は紙白、中間影は網点、最暗部は黒ベタ。網点を平坦な灰色塗りへ置換しない。"
  ],
  [
    "PAPER: unassigned areas match balloon white; no scan haze/fibers. 画風=墨の構築、全体質感膜禁止。",
    "PAPER: 未割当領域は吹出内と同じ白。走査の霞/紙繊維なし。画風は墨の構築、全体質感膜は禁止。"
  ],
  [
    "INK LIGHT SOURCE: white cutouts+black contours; no glow/screen veil. 光源・遠近・演出保持。",
    "INK LIGHT SOURCE: 白抜きと黒輪郭で光源を描き、発光/網点膜なし。光源/遠近/演出を保持。"
  ],
  [
    "NEUTRAL INK: R=G=B; no tint in ink/screen/light/reflections.",
    "NEUTRAL INK: R=G=B。墨/網点/光/反射を着色しない。"
  ],
  [
    "DEPTH-OF-FIELD DEFOCUS: fewer far lines/wider white gaps; 遠近・ぼけで網点を足さない。",
    "DEPTH-OF-FIELD DEFOCUS: 遠景の線を減らし白い隙間を広げる。遠近/ぼけで網点を足さない。"
  ],
  [
    "G-PEN INK DIRECTION: NORMAL default; panel recipe wins. BLACK-HAIR INK LOCK: darkest hair=solid black; white shine, no screen.",
    "G-PEN INK DIRECTION: NORMALの既定で、各媒体を優先。BLACK-HAIR INK LOCK: 最暗髪は黒ベタと白い光沢、網点なし。"
  ],
  [
    "INK LIGHT / ACTING: full-body action amplitude; directional solid-black cast shadows, white rim cutouts; keep depth/beats.",
    "INK LIGHT / ACTING: 全身動作の振幅、方向のある黒い落ち影、縁の白抜き。奥行きと物語の拍を保持。"
  ]
];
export const translateMonochromeCompilerRules = value => MONOCHROME_COMPILER_TRANSLATIONS.reduce((text,[original,translated])=>text.replaceAll(original,translated),value);
