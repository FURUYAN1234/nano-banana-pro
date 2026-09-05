export const SCENARIO_FACIAL_ACTING_CONTRACT = `【顔の演技設計（顔が読める人物だけ）】
- 各コマの主な話者・リアクション役は、抽象的な感情名やタグの羅列で済ませず、眉、まぶたと目の開き、視線の相手、口の形、頭と胴体の傾きから場面に効く3項目以上を自然な一文で「状況」または「リアクション」に書く。
- 5項目を毎回同じ強さで盛らず、話の瞬間と人物の役割から選ぶ。無表情や静かな間も、わずかな目線・口元・姿勢の差として具体化する。
- 顔が小さい、隠れる、背を向ける構図では見えない顔情報を捏造しない。表情のために寄り・クローズアップやカメラ目線を強制せず、指定Camera、Action、対人視線、手と小道具を優先する。`;

export const MANGA_FACIAL_ACTING_LOCK = `FACIAL ACTING LOCK:
- Render the scenario's facial acting as physical cues: brow shape, eyelid/opening, gaze target, mouth shape, and head/torso angle. Use only the cues supported by that story beat; avoid repeated default expressions or tag soup.
- Do not force a close-up, front-facing pose, or camera gaze to show emotion. Preserve the scripted Camera, Action, conversational eye-line, hands, and props; omit facial detail that the shot cannot reveal.
- Emotion names, facial-direction labels, and acting notes are drawing metadata, not visible text; never print them.`;
