export const COPYRIGHT_MOSAIC_INSTRUCTION = '版権キャラクターにおおきなモザイクをかける';

export const buildCopyrightMosaicInstruction = (enabled = true) => enabled
  ? `${COPYRIGHT_MOSAIC_INSTRUCTION}。既存作品の人物描写だけを特大モザイクで覆う。顔幅が横4〜6個ほどの不透明な正方形ブロックになる大きさ。ドット絵化ではなく、目・口・顔の細部を判読できなくする粗い遮蔽を、人物全体と印刷物内の人物にも適用。外見の再現より優先。名前・役割・行動は保持。同名だけのオリジナル人物や背景・台詞・タイトルは隠さず、この指示を作中に印字しない。`
  : '';

export const buildRenderOptionsContract = ({ mosaicCopyrightedCharacters = true, showWatermarks = true } = {}) => [
  `[RENDER OPTIONS: copyrighted_mosaic=${mosaicCopyrightedCharacters ? 'on' : 'off'}; watermarks=${showWatermarks ? 'on' : 'off'}]`,
  buildCopyrightMosaicInstruction(mosaicCopyrightedCharacters),
  showWatermarks ? '' : 'FOOTER: leave the bottom margin blank. Do not draw either footer watermark, credit, signature or attribution URL. Preserve the title, dialogue and scripted in-scene lettering.',
].filter(Boolean).join('\n');

// Read the contract attached to this image's prompt, not a later UI selection.
// Legacy prompts had mandatory credits and no automatic copyrighted mosaic.
export const readRenderOptions = (prompt = '') => {
  const match = String(prompt).match(/^\[RENDER OPTIONS: copyrighted_mosaic=(on|off); watermarks=(on|off)\]$/m);
  return { mosaicCopyrightedCharacters: match?.[1] === 'on', showWatermarks: match ? match[2] === 'on' : true };
};

export const assertRenderOptions = (prompt, options) => {
  if (!String(prompt).includes(buildRenderOptionsContract(options))) {
    throw new Error('モザイク／ウオーターマークの設定が指示文と一致しません。STEP3で再構築してください。');
  }
  return prompt;
};

export const buildRenderOptionsQa = (prompt = '') => {
  const options = readRenderOptions(prompt);
  return [
    options.mosaicCopyrightedCharacters ? 'MOSAIC CHECK: inspect copyrighted character depictions, including printed artwork. Large opaque square blocks must obscure facial details. Pixel-art styling or tiny pixels leaving eyes and mouth legible are insufficient; report clearly visible missing/insufficient masking as action_fidelity with panel and pixel evidence. Intentional mosaic on copyrighted characters is not a defect. Do not restore or invent their concealed face, clothing or anatomy. Inspect visible story actions and unaffected characters normally; hidden details remain unverified and are not repair targets. Mosaic on unrelated original characters or required text is not authorized.' : '',
    options.showWatermarks
      ? 'WATERMARK EDGE CHECK: inspect the complete left and right footer text from pixels, including the first/last glyphs and their top/bottom strokes. Record cropped or missing required watermark text as panel_layout, and unreadable text as unverified. A clipped URL or credit is not an acceptable decorative-text fallback. Do not infer missing glyphs from the supplied prompt.'
      : 'FOOTER CHECK: no footer watermarks are requested. Their absence is correct, not missing required text or a layout defect. Do not add credits during repair. Inspect the title, dialogue and scripted in-scene text normally.',
  ].filter(Boolean).join('\n');
};
