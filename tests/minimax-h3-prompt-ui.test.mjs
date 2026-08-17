import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const readmeSource = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const minimaxPromptSource = step4PanelSource.match(/const MINIMAX_H3_COMFYUI_PROMPT = `([\s\S]*?)`;/)?.[1] ?? '';

test('MiniMax H3 helper copies the four-panel Reference-to-Video prompt', () => {
  assert.match(step4PanelSource, /MINIMAX_H3_COMFYUI_PROMPT/);
  assert.match(step4PanelSource, /MiniMax H3.*ComfyUI用プロンプトをコピー/);
  assert.match(step4PanelSource, /navigator\.clipboard\.writeText\(MINIMAX_H3_COMFYUI_PROMPT\)/);
  assert.match(step4PanelSource, /Reference-to-Video \(R2V \/ Ref2VA\)/);
  assert.match(step4PanelSource, /subject_definitions:/);
  assert.match(step4PanelSource, /non_diegetic_music:/);
});

test('MiniMax H3 copied prompt makes enabled BGM continuous and mandatory', () => {
  assert.match(step4PanelSource, /BGM enforcement rules:/);
  assert.match(step4PanelSource, /mandatory continuous audience-only audio layer/);
  assert.match(step4PanelSource, /begin at 00:00\.000, continue through the final frame/);
  assert.match(step4PanelSource, /begin with the exact word “MANDATORY:”/);
  assert.match(step4PanelSource, /Write “N\/A” in non_diegetic_music only when the user explicitly disables BGM/);
});

test('MiniMax H3 copied prompt translates timed direction into H3 shot notation', () => {
  assert.match(step4PanelSource, /Temporal direction rewrite rules:/);
  assert.match(step4PanelSource, /Translate every requested timed cut, camera move, or transition into explicit shot timing/);
  assert.match(step4PanelSource, /start, midpoint, and end state/);
  assert.match(step4PanelSource, /every shot must include one modest but clearly visible physically coherent camera trajectory/);
});

test('MiniMax H3 copied prompt preserves only genuine cross-cut dialogue with scenetrans', () => {
  assert.match(step4PanelSource, /<scenetrans>/);
  assert.match(step4PanelSource, /Only when one spoken line genuinely continues across a planned shot boundary/);
  assert.match(step4PanelSource, /Do not split ordinary separate speech balloons into a fake cross-cut line/);
});

test('MiniMax H3 copied prompt provides kana-only dialogue for every Japanese spoken line', () => {
  assert.match(step4PanelSource, /Japanese dialogue reading rules:/);
  assert.match(step4PanelSource, /All Japanese dialogue supplied to MiniMax H3 must be kana-only/);
  assert.match(step4PanelSource, /Do not put the original kanji transcript inside <d> tags/);
  assert.match(step4PanelSource, /no kanji and no romaji/);
  assert.match(step4PanelSource, /spoken pronunciation must follow the kana-only dialogue/);
  assert.match(step4PanelSource, /Never guess, change, omit, or merge a reading/);
});

test('MiniMax H3 copied prompt selects compatible animation principles without overacting', () => {
  assert.match(step4PanelSource, /Animation performance rules:/);
  assert.match(step4PanelSource, /Select only one to three compatible principles/);
  assert.match(step4PanelSource, /anticipation, slow-in\/slow-out, arcs, follow-through, secondary action, staging/);
  assert.match(step4PanelSource, /Do not add cartoon exaggeration, squash-and-stretch, or extra motion/);
});

test('MiniMax H3 helper explains the copy-to-ComfyUI reference workflow', () => {
  assert.match(step4PanelSource, /このボタンで指示文をコピー、同時に生成済みの4コマ漫画をチャットに添付し、送信/);
  assert.match(step4PanelSource, /出力されたプロンプトをコピー/);
  assert.match(step4PanelSource, /ComfyUIでMiniMax H3 Reference-to-Videoを選択/);
  assert.match(step4PanelSource, /Reference Image/);
  assert.match(step4PanelSource, /画角と秒数を確認の上、先ほど出力された英語プロンプトをPrompt欄に貼り付けて実行/);
});

test('MiniMax H3 helper displays its default video specification next to the copy button', () => {
  assert.match(step4PanelSource, /デフォルト仕様：15秒・16:9・BGMあり・日本語音声・標準の躍動演出。/);
  assert.match(step4PanelSource, /個別指定があればそちらを優先/);
});

test('the single MiniMax H3 helper includes publication graphics without a second copy button', () => {
  assert.doesNotMatch(step4PanelSource, /MINIMAX_H3_PUBLICATION_PROMPT/);
  assert.doesNotMatch(step4PanelSource, /isMiniMaxPublicationPromptCopied/);
  assert.doesNotMatch(step4PanelSource, /作品公開用プロンプトをコピー/);
  assert.match(step4PanelSource, /navigator\.clipboard\.writeText\(MINIMAX_H3_COMFYUI_PROMPT\)/);
  assert.match(step4PanelSource, /Publication graphics override/);
  assert.match(step4PanelSource, /opening title card/);
  assert.match(step4PanelSource, /fade out completely/);
  assert.match(step4PanelSource, /only readable textual elements in the entire video are the opening title and the ending credit/);
  assert.doesNotMatch(minimaxPromptSource, /https:\/\/note\.com\/happy_duck780/);
  assert.doesNotMatch(minimaxPromptSource, /ネームから～/);
  assert.match(step4PanelSource, /Do not invent a title/);
  assert.match(step4PanelSource, /Do not treat any text outside manga panels as a video source/);
  assert.match(step4PanelSource, /Perform OCR only to identify the four-panel manga title from the attached image/);
  assert.match(step4PanelSource, /If OCR cannot read the title reliably/);
  assert.doesNotMatch(step4PanelSource, /buildMiniMaxH3PublicationPrompt/);
  assert.match(step4PanelSource, /contrast against its local background/);
  assert.doesNotMatch(step4PanelSource, /existing Nano Banana watermark/);
  assert.doesNotMatch(step4PanelSource, /Nano Bananaウォーターマーク/);
});

test('MiniMax H3 output keeps the credit literal and preserves Japanese right-to-left panel order', () => {
  assert.match(step4PanelSource, /Do not emit the ending credit as a literal URL in the authoring response/);
  assert.match(step4PanelSource, /Literal prefix \(exact, including the ASCII space before the colon\)/);
  assert.match(step4PanelSource, /URL character tokens \(concatenate with no spaces\): h t t p s : \/ \/ n o t e \. c o m \/ h a p p y _ d u c k 7 8 0/);
  assert.match(step4PanelSource, /Render the visible ending credit by concatenating that prefix and those URL character tokens/);
  assert.match(step4PanelSource, /no spaces, line breaks, brackets, backslashes, markup, or added characters/);
  assert.match(step4PanelSource, /The character-token instruction itself is the complete credit specification/);
  assert.match(step4PanelSource, /right to left within each row/);
  assert.match(step4PanelSource, /Never reduce this to “top-to-bottom” only/);
});

test('MiniMax H3 prompt keeps readable text to timed production graphics and removes manga balloons', () => {
  assert.match(step4PanelSource, /only readable textual elements in the final video are the opening title and ending credit/);
  assert.match(step4PanelSource, /No title pixels may remain at or after 00:01\.600/);
  assert.match(step4PanelSource, /Do not show the ending credit before 00:13\.200/);
  assert.match(step4PanelSource, /remove every original speech-balloon shape, border, tail, and white interior/);
  assert.match(step4PanelSource, /background-only visual texture that cannot be read as actual words/);
});

test('MiniMax H3 prompt sends kana-only dialogue to the speech engine', () => {
  assert.match(step4PanelSource, /All Japanese dialogue supplied to MiniMax H3 must be kana-only/);
  assert.match(step4PanelSource, /Do not put the original kanji transcript inside <d> tags/);
});

test('README documents the MiniMax H3 Reference-to-Video workflow separately from the in-app image pipeline', () => {
  assert.match(readmeSource, /MiniMax H3.*ComfyUI.*Reference-to-Video/);
  assert.match(readmeSource, /生成済みの4コマ漫画をダウンロード/);
  assert.match(readmeSource, /指示文をコピーし、同時に画像対応チャットへ4コマ漫画を添付して送信/);
  assert.match(readmeSource, /出力された英語のMiniMax H3プロンプトをコピー/);
  assert.match(readmeSource, /Reference Image/);
  assert.match(readmeSource, /画角と秒数を確認してから、英語プロンプトを `Prompt` に貼り付けて実行/);
  assert.match(readmeSource, /アプリ内で動画を生成・送信しません/);
});

test('README documents the MiniMax H3 timing and cross-cut dialogue safeguards', () => {
  assert.match(readmeSource, /秒単位のカット・カメラ移動を開始・中間・終了の状態まで英語プロンプトへ展開/);
  assert.match(readmeSource, /実際にカットをまたぐ同一台詞だけを `scenetrans` で分割/);
  assert.match(readmeSource, /H3へ渡す台詞そのものを確認済みのひらがな・カタカナだけで記述/);
  assert.match(readmeSource, /タイトルは00:00\.000から00:01\.600だけで完全にフェードアウト/);
  assert.match(readmeSource, /終端表示は00:13\.200から00:15\.000だけ/);
});

test('README documents the unified MiniMax H3 helper and its limited graphics', () => {
  assert.match(readmeSource, /MiniMax H3・ComfyUI用プロンプトをコピー/);
  assert.doesNotMatch(readmeSource, /別の「MiniMax H3・作品公開用プロンプトをコピー」/);
  assert.match(readmeSource, /冒頭のタイトルロゴ/);
  assert.match(readmeSource, /ネームから全自動の自律式統合AI漫画システム :https:\/\/note\.com\/happy_duck780/);
  assert.doesNotMatch(readmeSource, /ネームから～/);
  assert.match(readmeSource, /添付した4コマ画像からOCRでタイトルだけを取得/);
  assert.match(readmeSource, /枠外文字を物語素材として使いません/);
  assert.doesNotMatch(readmeSource, /既存のNano Bananaウォーターマーク/);
});
