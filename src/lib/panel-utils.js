import { cameraLensMap } from './constants';

// --- Panel Utility Functions (App.jsx assemblePrompt -> externalized) ---
// assemblePrompt 内で定義されていたパネル解析・プロンプト組立ユーティリティ群

export const buildIdentityMatrix = (castListText) => {
  const characters = [];
  let currentChar = null;

  castListText.split('\n').forEach(line => {
    const cleanLine = line.replace(/\*\*/g, '').trim();

    // キャラ名ヘッダー検出
    if (cleanLine.startsWith('## ')) {
      if (currentChar) characters.push(currentChar);
      const name = cleanLine.replace(/^##\s*(?:\d+\.\s*)?/, '').trim();
      currentChar = {
        name,
        shortName: name.split(/[（(]/)[0].trim(),
        hairColor: '',
        hairStyle: '',
        glasses: 'unknown',
        features: []
      };
    }

    if (!currentChar) return;

    // [v2.31] 髪情報の抽出 - 特徴的スタイル優先ロジック
    if (cleanLine.includes('髪') || cleanLine.toLowerCase().includes('hair')) {
      const weightsMatch = cleanLine.match(/\[WEIGHTS?\]:\s*(.*)/i);
      const tagsSource = weightsMatch ? weightsMatch[1].replace(/\|/g, '') : cleanLine;
      const colorMatch = tagsSource.match(/(red|orange|blonde|yellow|brown|black|silver|white|blue|pink|green|purple|ginger)\s+hair(?!\s*(?:tip|end|gradient|streak|highlight|accent))/i);
      if (colorMatch && !currentChar.hairColor) currentChar.hairColor = colorMatch[1];
      // [v2.31] 特徴的スタイル（twintails, hime cut等）を汎用長さ記述（long hair等）より優先
      // これにより Identity Matrix で「リン: long hair」ではなく「リン: twintails」と出力される
      const distinctiveMatch = tagsSource.match(/(internal\s*round\s*bob|chin-length\s*bob|straight\s*bob|twintails?|twin\s*tails?|ponytail|hime\s*cut|bun|braid|pixie|buzz)/i);
      const genericMatch = tagsSource.match(/(bob|very\s*long\s*hair|waist-length\s*hair|long[\s-]?hair|medium[\s-]?hair|short[\s-]?hair)/i);
      if (!currentChar.hairStyle) {
        if (distinctiveMatch) {
          currentChar.hairStyle = distinctiveMatch[1];
        } else if (genericMatch) {
          currentChar.hairStyle = genericMatch[1];
        }
      }
    }

    // [v2.30] 眼鏡情報の抽出 - 全面改修
    const lowerLine = cleanLine.toLowerCase();
    const hasWeightedNoGlasses = /\(no[\s_-]*glasses/i.test(lowerLine);
    const hasWeightedGlasses = /\([^)]*glasses[\s:]/i.test(lowerLine) && !hasWeightedNoGlasses;
    const glassesLocked = currentChar.glasses === 'LOCKED_NO' || currentChar.glasses === 'LOCKED_YES';
    if (!glassesLocked) {
      if (hasWeightedNoGlasses) {
        currentChar.glasses = 'LOCKED_NO';
      } else if (hasWeightedGlasses) {
        currentChar.glasses = 'LOCKED_YES';
      }
    }
    const glassesNowLocked = currentChar.glasses === 'LOCKED_NO' || currentChar.glasses === 'LOCKED_YES';
    if (!glassesNowLocked && (cleanLine.includes('眼鏡') || cleanLine.includes('メガネ') || lowerLine.includes('eyewear'))) {
      if (lowerLine.includes('bare eyes') || /(?:なし|無し|None|N\/A)/i.test(cleanLine)) {
        currentChar.glasses = 'NO';
      } else if (/(?:あり|有り|有|着用)/i.test(cleanLine) || /(?:under-rim|round|square|oval|rimless|half-rim)/i.test(lowerLine)) {
        currentChar.glasses = 'YES';
      }
    }

  });
  if (currentChar) characters.push(currentChar);

  // [v2.30] デバッグ: 眼鏡判定結果をコンソールに出力
  console.log('[IDENTITY MATRIX] Glasses detection results:');
  characters.forEach(c => {
    console.log(`  ${c.shortName}: glasses=${c.glasses}, hair=${c.hairColor} ${c.hairStyle}`);
  });

  if (characters.length === 0) return '';

  let matrix = `\n【IDENTITY MATRIX - ABSOLUTE LOCK (v2.25)】\n`;
  matrix += `Before drawing EACH panel, cross-check EVERY character against this matrix. ANY violation = CRITICAL FAILURE.\n`;

  characters.forEach(c => {
    const traits = [];
    if (c.hairColor) traits.push(`${c.hairColor} hair`);
    if (c.hairStyle) traits.push(c.hairStyle);
    if (c.glasses === 'YES' || c.glasses === 'LOCKED_YES') traits.push('MUST HAVE glasses (do NOT remove)');
    else if (c.glasses === 'NO' || c.glasses === 'LOCKED_NO') traits.push('MUST NOT have glasses (bare eyes)');
    else traits.push('check reference image for glasses status');

    matrix += `- [${c.shortName}]: ${traits.join(', ') || 'see reference image'}\n`;
  });

  matrix += `CROSS-CHECK: After completing each panel, verify every character's hair color and glasses status matches the matrix above. If ANY mismatch, redraw that character.\n`;
  matrix += `Reading order: RIGHT-TO-LEFT (Japanese manga). The first speaker is on the RIGHT. Speech bubbles flow right-to-left.
SPEECH BUBBLE PLACEMENT RULE (CRITICAL): Each character's speech bubble MUST be drawn directly above or beside THAT character's head. The RIGHT-side character's bubble MUST be on the RIGHT side of the panel. The LEFT-side character's bubble MUST be on the LEFT side. NEVER draw a character's speech bubble on the opposite side of where the character is standing.\n`;

  return matrix;
};

export const getCharTraitsFromMatrix = (charName, castList) => {
  const matrix = buildIdentityMatrix(castList);
  const line = matrix.split('\n').find(l => l.includes(`[${charName}]`));
  if (line) {
    const traits = line.split(':').slice(1).join(':').trim();
    return traits;
  }
  return '';
};

export const getCameraForPanel = (panelText, shuffledCameras, cameraState) => {
  // [Camera: XXX] の抽出を試みる
  const cameraMatch = panelText.match(/\[Camera:\s*(.*?)\]/i);
  if (cameraMatch && cameraMatch[1]) {
     const specificCamera = cameraMatch[1].trim();
     // [v2.60] AIのカメラ名をマッピング辞書で具体的なレンズ歪みタグに変換
     let matchedLens = '';
     for (const [keyword, lensTag] of Object.entries(cameraLensMap)) {
       if (specificCamera.includes(keyword)) {
         matchedLens = lensTag;
         break;
       }
     }
     // マッピングが見つかった場合はレンズ歪みタグ + 汎用歪みを結合
     if (matchedLens) {
       return `${matchedLens}, (EXTREME hyper-dynamic composition:2.6), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)`;
     }
     // マッピングなし → 汎用歪みプロンプトのみ
     return `(Extreme intense dynamic camera angle: 2.8), (EXTREME hyper-dynamic composition:2.6), (SEVERE dutch angle or extreme perspective distortion:2.7), (MASSIVE spherical or telephoto depth separation:2.5), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)`;
  }
  // AIがカメラタグを出力しなかった場合のフォールバック（重複なしランダム）
  const fallbackCamera = shuffledCameras[cameraState.index % shuffledCameras.length];
  cameraState.index++;
  return fallbackCamera;
};

export const stripWeightTags = (text) => {
  return text
    .replace(/\(([^()]+?):\d+\.?\d*\)/g, '$1')  // (tag:2.7) → tag
    .replace(/,\s*,+/g, ',')                      // 連続カンマ除去
    .replace(/,\s*$/g, '')                         // 末尾カンマ除去
    .replace(/^\s*,\s*/g, '')                      // 先頭カンマ除去
    .trim();
};

export const getCameraForChatGPT = (panelText, cameraState) => {
  const cameraMatch = panelText.match(/\[Camera:\s*(.*?)\]/i);
  if (cameraMatch && cameraMatch[1]) {
    // シナリオのカメラ説明（日本語の具体的な演出指示）をそのまま使う
    return cameraMatch[1].trim();
  }
  // フォールバック: ランダムカメラの自然言語版
  const fallbackCameras = [
    'Extreme bird\'s-eye view from directly above',
    'Worm\'s-eye view from ground level looking up',
    'Dutch angle with 30-45 degree tilt',
    'Telephoto close-up with background compression',
    'Wide-angle shot with exaggerated perspective'
  ];
  return fallbackCameras[cameraState.index % fallbackCameras.length];
};

export const extractDialogueOnly = (fullPanelText, castList) => {
  const lines = fullPanelText.split('\n');

  // Extract valid characters from castList to prevent action instructions being misidentified as speakers
  const validCharacters = [];
  castList.split('\n').forEach(cLine => {
    const m = cLine.replace(/\*\*/g, '').trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);
    if (m) {
      const fullName = m[1].trim();
      validCharacters.push(fullName);
      const jpName = fullName.split(/[\(]/)[0].trim();
      if (jpName && jpName !== fullName) validCharacters.push(jpName);
      const romajiMatch = fullName.match(/[\(]\s*(.*?)\s*[\)]/);
      if (romajiMatch) validCharacters.push(romajiMatch[1].trim());
    }
  });

  const formattedBubbles = [];
  let bubbleCount = 1;

  lines.forEach(line => {
    // Check if line indicates dialogue
    const match = line.match(/^(.*?)(?:[:：]|「)/);
    let isDialogue = false;
    let clean = line;

    if (match && match[1].trim()) {
      let tempSpeaker = match[1].replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
      // ベースとなる話者名（カッコ内のト書きを無視）
      let tempSpeakerBase = tempSpeaker.replace(/[（(].*?[）)]/g, '').trim();

      // [v2.31] 話者名バリデーション強化: ト書き誤検出防止
      // 「サエコが、売店のカウンターに」のような文章が話者名として誤検出されるのを防ぐ
      const hasSentenceParticles = /[がをにでへはもとからまでより]/.test(tempSpeakerBase) && tempSpeakerBase.length > 5;
      const isTooLong = tempSpeakerBase.length > 20; // 複数人「アカリ・ヒカリ・ミク・リン」を許容するため長めに変更
      const isMetaTag = /^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定|物理描写|SFX|効果音|BGM|ナレーション|テロップ)$/i.test(tempSpeakerBase);
      // [v2.45] 効果音パターン検出: 同じ文字(長音含む)の繰り返しは効果音（シーーーン、ゴゴゴ等）
      const isSoundEffect = /^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(tempSpeakerBase);
      // [v2.45] リアクション指示混入検出: 「（リアクション」等が話者名に含まれていたら除外
      const hasReactionTag = /[（(]\s*リアクション/i.test(match[1]);

      if (hasSentenceParticles || isTooLong || isMetaTag || isSoundEffect || hasReactionTag) {
        // 文章構造・メタタグ・効果音・リアクション指示を含む → 話者名ではない
      } else if (validCharacters.some(c => {
        const nameOnly = c.split(/[（(]/)[0].trim();
        return tempSpeakerBase === c || tempSpeakerBase === nameOnly || nameOnly === tempSpeakerBase || tempSpeakerBase.includes(nameOnly);
      }) || tempSpeakerBase.includes("全員") || tempSpeakerBase === "Speaker" || match[0].trim().endsWith(':') || match[0].trim().endsWith('：')) {
        isDialogue = true;
      }
    } else if (line.trim().startsWith('「')) {
      // [v2.29] 根本修正: 行全体が「...」で完結するセリフ形式のみを判定。
      // 「没収」と書かれた袋を...のようなト書き中の引用語を誤検出しない。
      const trimmedLine = line.trim();
      const isFullQuoteLine = /^「[^」]+」[？！。、!?\s]*$/.test(trimmedLine);
      if (isFullQuoteLine) {
        isDialogue = true;
      }
    }

    if (isDialogue) {
      // Remove Speaker Name and Colon
      clean = clean.replace(/^.*?(?:[:：]|「)\s*/, '');
      // トリムを行ってからカッコを除去（末尾のスペースで除去漏れが発生するのを防ぐため）
      clean = clean.trim();
      // Remove surrounding Japanese quotes to prevent hallucination in images
      clean = clean.replace(/^「+/, '').replace(/」+$/, '');
      // [v2.04] Remove parenthetical stage directions (e.g. (ため息) or （笑顔）) to prevent them from rendering as printed text in balloons
      clean = clean.replace(/（.*?）|\(.*?\)/g, '');
      clean = clean.trim();

      if (clean) {
        formattedBubbles.push(`(Speech Bubble ${bubbleCount}: "${clean}")`);
        bubbleCount++;
      }
    }
  });

  // [v2.22] フォールバック: キャラ名マッチに失敗しても、カギ括弧「」で囲まれたテキストがあればセリフとして抽出
  // [v2.29] ト書き誤検出防止: カギ括弧内のテキストがト書き（状況説明）でないかをチェック
  if (formattedBubbles.length === 0) {
    const bracketDialogues = fullPanelText.match(/「([^」]+)」/g);
    if (bracketDialogues && bracketDialogues.length > 0) {
      bracketDialogues.forEach(bd => {
        let dialogueText = bd.replace(/^「/, '').replace(/」$/, '').trim();
        dialogueText = dialogueText.replace(/（.*?）|\(.*?\)/g, '').trim();
        // [v2.29] ト書き判定: キャラ名2名以上+動作動詞を含む長文はト書きとみなしスキップ
        const charNamesInText = validCharacters.filter(c => {
          const nameOnly = c.split(/[\(（]/)[0].trim();
          return nameOnly && dialogueText.includes(nameOnly);
        });
        const hasActionVerbs = /(?:走|逃|叫|倒|飛|投|握|振|開|閉|持|回|守|追|暴|掴|奪|叩|殴|蹴|泣|笑|怒|驚|震|立|座|歩|見|向|指|差|押|引|掲|置|取|抱|抜|落|転|上|下|入|出|乗|降|着|脱|食|飲|読|書|聞|話|歌|踊|遊|寝|起|止|始|続|終|帰|来|行|待|送|届|届|渡|受|返|払|買|売|借|貸|集|散|並|重|包|巻|結|解|切|折|曲|伸|縮|揺|動|止|消|現|隠|探|見つ)/.test(dialogueText);
        const isLikelyNarration = (charNamesInText.length >= 2 && hasActionVerbs && dialogueText.length > 15);
        if (dialogueText && !isLikelyNarration) {
          formattedBubbles.push(`(Speech Bubble ${bubbleCount}: "${dialogueText}")`);
          bubbleCount++;
        }
      });
    }
  }

  // [v2.22] 「吹き出し描くな」指示を廃止。セリフが無い場合でも描画を阻害しない
  if (formattedBubbles.length === 0) {
    return "(Characters interact without dialogue in this panel)";
  }
  return formattedBubbles.join(', ');
};

export const extractActionOnly = (fullPanelText, castList, placementRule = "") => {
  const lines = fullPanelText.split('\n');

  const validCharacters = [];
  castList.split('\n').forEach(cLine => {
    const m = cLine.replace(/\*\*/g, '').trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);
    if (m) {
      const fullName = m[1].trim();
      validCharacters.push(fullName);
      const jpName = fullName.split(/[\(]/)[0].trim();
      if (jpName && jpName !== fullName) validCharacters.push(jpName);
      const romajiMatch = fullName.match(/[\(]\s*(.*?)\s*[\)]/);
      if (romajiMatch) validCharacters.push(romajiMatch[1].trim());
    }
  });

  const actionLines = lines.filter(line => {
    const match = line.match(/^(.*?)(?:[:：]|「)/);
    let isDialogue = false;
    if (match && match[1].trim()) {
      let tempSpeaker = match[1].replace(/^(SFX|効果音|BGM|Action)/i, '').trim();
      tempSpeaker = tempSpeaker.replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
      const hasSentenceParticles = /[がをにでへはもとからまでより]/.test(tempSpeaker) && tempSpeaker.length > 5;
      const isTooLong = tempSpeaker.length > 12;
      const isMetaTag = /^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(tempSpeaker);
      // [v2.45] 効果音パターン検出
      const isSoundEffect = /^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(tempSpeaker.replace(/[（(].*$/, '').trim());
      const hasReactionTag = /[（(]\s*リアクション/i.test(match[1]);
      
      if (hasSentenceParticles || isTooLong || isMetaTag || isSoundEffect || hasReactionTag) {
        // Not a dialogue speaker (meta tag, sound effect, or reaction directive)
      } else if (validCharacters.some(c => tempSpeaker.includes(c) || c.includes(tempSpeaker)) || tempSpeaker === "全員" || tempSpeaker === "Speaker" || match[0].trim().endsWith(':') || match[0].trim().endsWith('：')) {
        isDialogue = true;
      }
    } else if (line.trim().startsWith('「')) {
      const trimmedLine = line.trim();
      const isFullQuoteLine = /^「[^」]+」[？！。、!?\s]*$/.test(trimmedLine);
      if (isFullQuoteLine) {
        isDialogue = true;
      }
    }
    const isHeader = line.match(/^\[\d+コマ目/);
    const isEmpty = line.trim() === '';
    return !isDialogue && !isHeader && !isEmpty;
  });

  let actionStr = actionLines.join(' ').trim();
  
  // [v2.30] Sanitize action string to remove common trailing onomatopoeia/gag SFX that causes unwanted speech bubbles
  actionStr = actionStr.replace(/[ 　]*(ズコー|ガーン|チーン|ドッ|バシッ|ドカーン|バーン)[。、！？!?\s]*$/g, '');
  
  // [v3.39] ト書き・リアクション指示のカッコを外し、テキストとしての描画を防ぐ
  actionStr = actionStr.replace(/[（(](?:Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)[:：]?\s*(.*?)[)）]/gi, '$1');

  actionStr = actionStr || "Characters interacting dynamically based on dialogue.";

  // [v2.02] Duplication Removal: If character is already forced in placement, gently remove them from the explicit action subject if possible to prevent cloning hallucination
  if (placementRule) {
    validCharacters.forEach(c => {
      // Extract just the name part before any parenthesis if it exists (e.g. "アカリ (Akari)" -> "アカリ")
      const nameOnly = c.split('(')[0].trim();
      if (placementRule.includes(nameOnly)) {
        // Optional: We can replace exact matches of the name with pronouns or just strip it if it causes too much duplication, 
        // but a safer route for the prompt is to just let the action be, BUT we modify the overall layout rules instead below.
        // For now, we just pass the actionStr, but AI cloning is mostly solved by the rule additions we make to the main prompt.
      }
    });
  }

  return actionStr;
};

export const injectOutfitReminder = (actionText, activeOutfit) => {
  if (!activeOutfit) return actionText;
  return `(All characters are wearing ${activeOutfit}) ${actionText}`;
};

export const extractPlacementRule = (fullPanelText, castList) => {
  const lines = fullPanelText.split('\n');
  // [v2.28] EMOTIONタグ行・状況行をフィルタリングしてスピーカー抽出の汚染を防止
  const dialogLines = lines.filter(line => {
    const trimmed = line.trim();
    // EMOTIONタグ行を除外
    if (/^\[EMOTION:/i.test(trimmed)) return false;
    // 状況説明行を除外
    if (/^状況[：:]/i.test(trimmed)) return false;
    return trimmed.includes('：') || trimmed.includes(':') || trimmed.includes('「');
  });
  // [v2.31] キャラ名バリデーション用リスト
  const validCharsForPlacement = [];
  castList.split('\n').forEach(cLine => {
    const m = cLine.replace(/\*\*/g, '').trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);
    if (m) {
      const fullName = m[1].trim();
      validCharsForPlacement.push(fullName);
      const jpName = fullName.split(/[（(]/)[0].trim();
      if (jpName && jpName !== fullName) validCharsForPlacement.push(jpName);
    }
  });

  const speakers = [];
  dialogLines.forEach(line => {
    const match = line.match(/^(.*?)(?:[:：]|「)/);
    if (match && match[1].trim()) {
      let speaker = match[1].replace(/^(SFX|効果音|BGM|Action|状況|EMOTION|\(.*?\)|\[.*?\])/gi, '').replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
      // [v2.31] ト書き誤検出防止: 助詞を含む長文は話者名ではない
      const hasSentenceParticles = /[がをにでへはもとからまでより]/.test(speaker) && speaker.length > 5;
      const isTooLong = speaker.length > 12;
      const isMetaTag = /^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(speaker);
      // [v2.45] 効果音パターン検出
      const isSoundEffect = /^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(speaker.replace(/[（(].*$/, '').trim());
      const hasReactionTag = /[（(]\s*リアクション/i.test(match[1]);
      if (hasSentenceParticles || isTooLong || isMetaTag || isSoundEffect || hasReactionTag) return;
      // EMOTIONやスタイルタグ残骸をフィルタ
      if (speaker && !speakers.includes(speaker) && !/^(EMOTION|NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)$/i.test(speaker)) {
        // [v2.31] キャラ名バリデーション: 登録キャラ名と一致する場合、またはコロンで明示的に話者として指定されている場合は認定
        if (validCharsForPlacement.some(c => {
          const nameOnly = c.split(/[（(]/)[0].trim();
          return speaker === c || speaker === nameOnly || nameOnly === speaker;
        }) || match[0].trim().endsWith(':') || match[0].trim().endsWith('：')) {
          speakers.push(speaker);
        }
      }
    }
  });
  if (speakers.length >= 3) {
    // [v2.33] 3-Zone Slotting: 3人以上の掛け合いパネル対応
    const traits0 = getCharTraitsFromMatrix(speakers[0], castList);
    const traits1 = getCharTraitsFromMatrix(speakers[1], castList);
    const traits2 = getCharTraitsFromMatrix(speakers[2], castList);
    return `CRITICAL PLACEMENT & IDENTITY (3-ZONE SLOTTING):
- RIGHT ZONE: [${speakers[0]}] (${traits0 || 'see reference'}) — First speaker
- CENTER ZONE: [${speakers[1]}] (${traits1 || 'see reference'}) — Second speaker
- LEFT ZONE: [${speakers[2]}] (${traits2 || 'see reference'}) — Third speaker / Reactor
VERIFY: Confirm hair color + glasses status for ALL three characters match the Identity Matrix.
CHARACTER BODY POSITION LOCK (3-ZONE - DO NOT MIRROR):
- [${speakers[0]}] MUST be on the RIGHT third of the panel.
- [${speakers[1]}] MUST be in the CENTER of the panel.
- [${speakers[2]}] MUST be on the LEFT third of the panel.
- Maintain breathing room between zones to prevent overcrowding and attribute fusion.
SPEECH BUBBLE FLOW (RIGHT-TO-LEFT):
- [${speakers[0]}]'s bubble on the RIGHT, [${speakers[1]}]'s in CENTER, [${speakers[2]}]'s on LEFT.
- Each bubble MUST point to its speaker. Flow: Right → Center → Left.`;
  } else if (speakers.length >= 2) {
    const traits0 = getCharTraitsFromMatrix(speakers[0], castList);
    const traits1 = getCharTraitsFromMatrix(speakers[1], castList);
    // [v2.27] 人物+吹き出し位置固定ルール（左右入れ替わり全パターン対策）
    // 髪色等の視覚的特徴で位置をアンカリングし、AIの左右鏡像化を防ぐ
    return `CRITICAL PLACEMENT & IDENTITY:
- RIGHT side: [${speakers[0]}] (${traits0 || 'see reference'})
- LEFT side: [${speakers[1]}] (${traits1 || 'see reference'})
VERIFY: Confirm hair color + glasses status for both characters match the Identity Matrix before finalizing.
CHARACTER BODY POSITION LOCK (CRITICAL - DO NOT MIRROR):
- The character with ${traits0 || speakers[0] + "'s features"} MUST be physically standing/sitting on the RIGHT half of the panel.
- The character with ${traits1 || speakers[1] + "'s features"} MUST be physically standing/sitting on the LEFT half of the panel.
- Do NOT swap, mirror, or reverse their positions under any circumstances.
SPEECH BUBBLE POSITION LOCK:
- [${speakers[0]}]'s speech bubble MUST appear on the RIGHT side, directly above/beside [${speakers[0]}]'s head.
- [${speakers[1]}]'s speech bubble MUST appear on the LEFT side, directly above/beside [${speakers[1]}]'s head.
- Each bubble MUST point to its speaker. Do NOT swap bubble positions.`;
  } else if (speakers.length === 1) {
    const traits0 = getCharTraitsFromMatrix(speakers[0], castList);
    return `CRITICAL PLACEMENT & IDENTITY: [${speakers[0]}] (${traits0 || 'see reference'}) is the main focus of this panel.`;
  }
  return `CRITICAL PLACEMENT: Follow the natural dialogue flow.`;
};

export const extractCastLimitRule = (fullPanelText, castList) => {
  const lines = fullPanelText.split('\n');

  // Find valid cast names and create a lookup for full character objects
  const validCharacters = [];
  const charLookup = {};
  castList.split('\n').forEach(cLine => {
    const m = cLine.replace(/\*\*/g, '').trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);
    if (m) {
      const fullCharName = m[1].trim();
      const nameOnly = fullCharName.split('(')[0].trim().split('（')[0].trim();
      if (nameOnly) {
        validCharacters.push(nameOnly);
        charLookup[nameOnly] = { name: nameOnly, full: fullCharName };
      }
    }
  });

  // Extract speakers from dialogue lines
  const speakers = [];
  lines.forEach(line => {
    const match = line.match(/^(.*?)(?:[:：]|「)/);
    if (match && match[1].trim()) {
      let speaker = match[1].replace(/^(SFX|効果音|BGM|Action|状況|\(.*?\))/gi, '').replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
      if (speaker && !speakers.includes(speaker) && validCharacters.includes(speaker)) {
        speakers.push(speaker);
      }
    }
  });

  // [v2.30] Visual Action テキストからも登場キャラ名を検出
  const allPanelCharacters = [...speakers];
  const fullText = fullPanelText;
  validCharacters.forEach(charName => {
    if (!allPanelCharacters.includes(charName) && fullText.includes(charName)) {
      allPanelCharacters.push(charName);
    }
  });

  // [v2.31] 吹き出し数カウント: セリフ行（「」付き）の数を数えて
  // ソロショット判定の矛盾を防ぐ
  let dialogueLineCount = 0;
  lines.forEach(line => {
    const trimmed = line.trim();
    // 「」で囲まれたセリフ、または「話者：セリフ」形式をカウント
    if (trimmed.includes('「') && trimmed.includes('」')) {
      dialogueLineCount++;
    } else if (/^[^（(【\[]*?[:：]\s*「/.test(trimmed)) {
      dialogueLineCount++;
    }
  });

  // [v2.33] 3人掛け合い対応: スピーカー最大3名をメインアクターとして登録
  const panelActors = speakers.slice(0, 3).map(s => `[${s}]`);

  // [v2.69] 背景キャスト統合: SOLO SHOTとMANDATORY BACKGROUND CASTの矛盾を解消
  // 背景キャストがいる場合は先にallPanelCharactersへ統合し、SOLO SHOTを出さない
  const otherCast = validCharacters.filter(c => !allPanelCharacters.includes(c));
  if (otherCast.length > 0) {
    // 背景キャストが存在 → 全員をallPanelCharactersに統合（SOLO SHOTは発行しない）
    otherCast.forEach(c => {
      if (!allPanelCharacters.includes(c)) allPanelCharacters.push(c);
    });
  }

  const allCharBrackets = allPanelCharacters.map(c => `[${c}]`);

  if (panelActors.length > 0) {
    let cloneWarning = `ANTI-CLONE REMINDER: ${allCharBrackets.join(', ')} — each appears EXACTLY ONCE. If a character is mentioned in both the placement rule AND the visual action, they are the SAME person — do NOT draw a second copy.`;
    // [v2.69] ソロショット判定の改善:
    // 本当にキャスト全体で1人（背景キャスト統合後でも1人）の場合のみSOLO SHOTを出す
    // 背景キャストがいた場合はallPanelCharactersに既に統合済みなのでlength > 1になる
    if (allPanelCharacters.length === 1 && dialogueLineCount <= 1) {
      cloneWarning += `\nSOLO SHOT (SINGLE CHARACTER SCENE): Since only ${allCharBrackets[0]} is listed, THIS IS A SOLO SHOT. Do NOT draw ANY other person. Do NOT draw a second copy of ${allCharBrackets[0]}. Leave the surrounding space empty rather than adding people.`;
    } else if (allPanelCharacters.length === 1 && dialogueLineCount >= 2) {
      // 検出キャラ1人だが吹き出し2つ → 独白として扱う（ソロショットにはしない）
      cloneWarning += `\nNOTE: Multiple speech bubbles in this panel are ALL spoken by ${allCharBrackets[0]} (monologue/soliloquy). Draw only ${allCharBrackets[0]} — do NOT add a second character just because there are multiple bubbles.`;
    }
    // [v2.42] クローン防止: 空間（前景・後景）で縛る
    const foreground = panelActors.join(' and ');
    const bgActors = allCharBrackets.filter(b => !panelActors.includes(b));
    const background = bgActors.length > 0 ? bgActors.join(', ') : 'NO ONE ELSE';
    
    const spatialConstraint = `\nFOREGROUND MUST CONTAIN ONLY: ${foreground}.\nBACKGROUND MUST CONTAIN ONLY: ${background}.\nABSOLUTELY NO OTHER HUMANS ALLOWED. Do not draw any character in the background if they are already in the foreground. Total EXACTLY ${allPanelCharacters.length} distinct individuals.`;

    return `CRITICAL CAST PLACEMENT: Ensure ${foreground} are the main focus.\n${cloneWarning}${spatialConstraint}`;
  } else {
    return `CRITICAL CAST PLACEMENT: Follow the panel's action naturally. NEVER draw the exact same character twice.`;
  }
};
