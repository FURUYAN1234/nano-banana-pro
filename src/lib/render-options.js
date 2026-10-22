export const COPYRIGHT_MOSAIC_INSTRUCTION = '版権キャラクターにおおきなモザイクをかける';

// 参照資料の役割と、台本で実際に描く遮蔽対象を同一視しない。
export const COPYRIGHT_MOSAIC_TARGET_SCOPE = 'MOSAIC TARGET SCOPE: No targets => NO MOSAIC. Sheets/names/style/likeness never prove copyright. Only existing-work depictions in Action/prints; no name-only mentions, originals or text. Explicit cast subject/region masks only.';

export const buildProtectedCastContract = (names = []) => names.length ? [
  `MOSAIC PROTECTED CAST: ${JSON.stringify([...new Set(names)])}`,
  'Never automatically mosaic these registered characters.',
].join('\n') : '';

export const readProtectedCast = (prompt = '') => {
  const line = String(prompt).match(/^MOSAIC PROTECTED CAST: (.+)$/m)?.[1];
  if (!line) return [];
  try {
    const names = JSON.parse(line);
    return Array.isArray(names) && names.every(name => typeof name === 'string' && name.trim()) ? names : [];
  } catch { return []; }
};

export const buildCopyrightMosaicInstruction = (enabled = true) => enabled
  ? `${COPYRIGHT_MOSAIC_TARGET_SCOPE}\n対象限定で${COPYRIGHT_MOSAIC_INSTRUCTION}。特大モザイク（顔幅4〜6個の不透明正方形）で全身・印刷人物の目・口・顔の細部を判読できなくする。ドット絵化ではなく遮蔽。名前/役割/行動保持。指示非印字。`
  : '';

export const NO_PAGE_TITLE = 'NO PAGE TITLE: Do not print a page title, heading, title box or title band. Reclaim the entire former title area for the story panels, starting below the small outer safety margin. Keep the A4 portrait canvas, all four outer frame sides/corners, white outer margins and internal gutters. Preserve verbatim dialogue and scripted in-scene lettering, even when they mention the title. The scenario title remains metadata only.';

export const buildRenderOptionsContract = ({ mosaicCopyrightedCharacters = true, showWatermarks = true, showTitle = true } = {}) => [
  `[RENDER OPTIONS: copyrighted_mosaic=${mosaicCopyrightedCharacters ? 'on' : 'off'}; watermarks=${showWatermarks ? 'on' : 'off'}${showTitle ? '' : '; title=off'}]`,
  buildCopyrightMosaicInstruction(mosaicCopyrightedCharacters),
  showTitle ? '' : NO_PAGE_TITLE,
  showWatermarks ? '' : `FOOTER: leave the bottom margin blank. Do not draw either footer watermark, credit, signature or attribution URL. Preserve ${showTitle ? 'the title, ' : ''}dialogue and scripted in-scene lettering.`,
].filter(Boolean).join('\n');

// Read the contract attached to this image's prompt, not a later UI selection.
// Legacy prompts had mandatory credits and no automatic copyrighted mosaic.
export const readRenderOptions = (prompt = '') => {
  const match = String(prompt).match(/^\[RENDER OPTIONS: copyrighted_mosaic=(on|off); watermarks=(on|off)(?:; title=(on|off))?\]$/m);
  return { mosaicCopyrightedCharacters: match?.[1] === 'on', showWatermarks: match ? match[2] === 'on' : true, showTitle: match?.[3] !== 'off' };
};

export const assertRenderOptions = (prompt, options) => {
  if (!String(prompt).includes(buildRenderOptionsContract(options))) {
    throw new Error('タイトル／モザイク／ウオーターマークの設定が指示文と一致しません。STEP3で再構築してください。');
  }
  if (options.showTitle === false && /^(?:- )?(?:Top title EXACTLY|Top page:.*text title:|Page title: render|TYPE: title EXTRA-BOLD)/m.test(String(prompt))) {
    throw new Error('タイトルOFFの指示文に題字の描画指定が残っています。STEP3で再構築してください。');
  }
  if (options.mosaicCopyrightedCharacters && options.protectedCast?.length
      && !String(prompt).includes(buildProtectedCastContract(options.protectedCast))) {
    throw new Error('登録キャストのモザイク除外指定が指示文と一致しません。STEP3で再構築してください。');
  }
  return prompt;
};

export const buildRenderOptionsQa = (prompt = '') => {
  const options = readRenderOptions(prompt);
  return [
    options.showTitle ? '' : 'TITLE OFF CHECK: no page title or title band is requested. Its absence is correct. Report an invented page heading or an unused reserved title band as panel_layout only with visible material evidence. Never add or restore a title during repair. Preserve dialogue and required in-scene lettering even when they match the metadata title.',
    options.mosaicCopyrightedCharacters ? buildProtectedCastContract(readProtectedCast(prompt)) : '',
    options.mosaicCopyrightedCharacters ? 'UNAUTHORIZED MOSAIC CHECK: inspect every registered cast face and body for coarse square censorship blocks. Report visible unrequested masking as action_fidelity with panel, subject and localized pixel evidence; do not excuse it as intentional copyright masking. Distinguish natural shadows, physical masks/helmets, sunglasses and depth blur from pixel blocks. An explicit scripted region mask remains allowed.' : '',
    options.mosaicCopyrightedCharacters ? `${COPYRIGHT_MOSAIC_TARGET_SCOPE}\nMOSAIC CHECK: inspect only authorized target depictions in the generated candidate, including printed artwork; reference sheets are comparison evidence, never output areas to mask. Large opaque square blocks must obscure facial details. Pixel-art styling or tiny pixels leaving eyes and mouth legible are insufficient; report clearly visible missing/insufficient masking as action_fidelity with panel and pixel evidence. Intentional mosaic on copyrighted characters is not a defect. Do not restore or invent their concealed face, clothing or anatomy. Inspect visible story actions and unaffected characters normally; hidden details remain unverified and are not repair targets. Mosaic on unrelated original characters or required text is not authorized. A reference's likeness alone is insufficient evidence to demand added masking or a paid repair.` : '',
    options.showWatermarks
      ? 'WATERMARK EDGE CHECK: inspect the complete left and right footer text from pixels, including the first/last glyphs and their top/bottom strokes. Record cropped or missing required watermark text as panel_layout, and unreadable text as unverified. A clipped URL or credit is not an acceptable decorative-text fallback. Do not infer missing glyphs from the supplied prompt.'
      : `FOOTER CHECK: no footer watermarks are requested. Their absence is correct, not missing required text or a layout defect. Do not add credits during repair. Inspect ${options.showTitle ? 'the title, ' : ''}dialogue and scripted in-scene text normally.`,
  ].filter(Boolean).join('\n');
};
