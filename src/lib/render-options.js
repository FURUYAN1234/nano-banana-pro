export const COPYRIGHT_MOSAIC_INSTRUCTION = '版権キャラクターにおおきなモザイクをかける';

// 参照資料の役割と、台本で実際に描く遮蔽対象を同一視しない。
export const COPYRIGHT_MOSAIC_TARGET_SCOPE = 'MOSAIC TARGET SCOPE: Sheets/names/labels/style/likeness never prove copyright. copyrighted_mosaic=on: mask only existing-work figures explicitly depicted in Action (including prints); exclude name-only mentions, unrelated originals and text. Preserve explicit cast masks only on named subject/region.';

export const buildCopyrightMosaicInstruction = (enabled = true) => enabled
  ? `${COPYRIGHT_MOSAIC_INSTRUCTION}。特大モザイク（顔幅に4〜6個の不透明な正方形）で対象人物全体と印刷人物の目・口・顔の細部を判読できなくする。ドット絵化ではなく遮蔽。外見より遮蔽を優先し、名前・役割・行動を保持。指示は印字しない。\n${COPYRIGHT_MOSAIC_TARGET_SCOPE}`
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
    options.mosaicCopyrightedCharacters ? `${COPYRIGHT_MOSAIC_TARGET_SCOPE}\nMOSAIC CHECK: inspect only authorized target depictions in the generated candidate, including printed artwork; reference sheets are comparison evidence, never output areas to mask. Large opaque square blocks must obscure facial details. Pixel-art styling or tiny pixels leaving eyes and mouth legible are insufficient; report clearly visible missing/insufficient masking as action_fidelity with panel and pixel evidence. Intentional mosaic on copyrighted characters is not a defect. Do not restore or invent their concealed face, clothing or anatomy. Inspect visible story actions and unaffected characters normally; hidden details remain unverified and are not repair targets. Mosaic on unrelated original characters or required text is not authorized. A reference's likeness alone is insufficient evidence to demand added masking or a paid repair.` : '',
    options.showWatermarks
      ? 'WATERMARK EDGE CHECK: inspect the complete left and right footer text from pixels, including the first/last glyphs and their top/bottom strokes. Record cropped or missing required watermark text as panel_layout, and unreadable text as unverified. A clipped URL or credit is not an acceptable decorative-text fallback. Do not infer missing glyphs from the supplied prompt.'
      : 'FOOTER CHECK: no footer watermarks are requested. Their absence is correct, not missing required text or a layout defect. Do not add credits during repair. Inspect the title, dialogue and scripted in-scene text normally.',
  ].filter(Boolean).join('\n');
};
