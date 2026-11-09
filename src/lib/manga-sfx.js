// Plan lettering in the scenario; image generation must not invent dialogue.
export const SCENARIO_SFX_CONTRACT = `【擬音・描き文字の設計】
- 動き・衝撃・物音を読みやすくする場面では、日本語の短い擬音を積極的に選ぶ。アクション選択の有無や画風にかかわらず、足音・着地・接触・道具の音など、その場面に実在する音源に合わせる。見せ場は力強く、日常の小さな音は控えめに。全コマへの追加や個数ノルマは設けない。
- 描く音は 演出: 接触点の横の余白に描き文字「ダッ」を配置 のように、正確な文字と音源・位置を明示する。台詞行や話者名として書かない。顔・手足の接触・台詞・吹き出しの尾を隠さず、カメラと画風を保つ。
- 「擬音なし」「無音」「静寂」「文字なし」の明示指定を最優先し、静かな間は残す。セリフなしは発話なしを意味し、場面に合う描き文字とは区別する。ドキュメンタリーでは事実にない音や出来事を追加しない。`;

export const MANGA_SFX_LETTERING_LOCK = 'SFX LETTERING: 擬音原文を音源横へ。never speech balloons or tails; preserve Camera/画風/顔/接触/台詞/尾/白溝。無音指定優先、捏造なし。';

export const hasScriptedSfx = source => /(?:描き文字|擬音|効果音|SFX)[^\n「」]{0,60}「[^「」]+」|「[^「」]+」[^\n「」]{0,20}(?:描き文字|擬音|効果音)/i.test(String(source))
  // Luna may abbreviate the planned lettering as a short katakana mark at a
  // concrete motion/sound source. Restrict this to an explicit staging line.
  || /^\s*演出\s*[:：][^\n]*(?:進行方向|動線|足元|シューズ|靴|接触|衝撃|息|音源)[^\n「」]{0,40}「[ァ-ヺー！？!?ッ…・]{1,12}」/m.test(String(source));

export function applyScriptedSfxPolicy(prompt, source) {
  if (!hasScriptedSfx(source)) return prompt;
  // This exact reminder is already covered by SCENE LETTERING plus the
  // verbatim Dialogue/metadata contract. Spend only its duplicate space on SFX.
  if (prompt.includes('SCENE LETTERING:') && prompt.includes('Only Dialogue')) {
    prompt = prompt.replace('- Scripted surface text exact; unscripted never becomes bubble/narration/metadata.\n', '');
  }
  return prompt
    .replace('- Explicit scripted handwriting/signage/label/print/screen/board stays exact. Unscripted in-scene lettering is freely allowed on physical surfaces, but it never becomes a speech bubble, narration, prompt label or metadata.', '- 物上の指定文字は原文通り。その他の場所に合う自然な文字も可。台詞/ナレーション/プロンプトラベル/メタデータへ変換しない。')
    .replace('Draw ONLY the specified title, speech-bubble dialogue, and watermarks. Do NOT draw random labels, SFX, captions, or extra text.', 'Draw specified title, dialogue, watermarks, scripted SFX and scene text; no invented labels or speech.')
    .replace('(Action ambience words, SFX names, mood words, aura names, and emotion labels are NOT visible lettering: 2.8)', '(Unscripted ambience, mood/aura names and emotion labels are NOT visible lettering: 2.8)')
    .replace('Quoted ambience, SFX names, mood words, aura names, emotion labels, and narration terms in Visual Action are NOT visible text.', 'Unscripted ambience, mood/aura names, emotion labels and narration are NOT visible text; explicit SFX are lettering.')
    .replaceAll('unless this action explicitly says handwriting, signage, board text, label text, or screen text', 'unless explicitly scripted as SFX/drawn lettering or physical scene text')
    + '\n' + MANGA_SFX_LETTERING_LOCK;
}
