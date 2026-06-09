import { cameraLensMap, cinematicCompositionMap, EMOTION_STYLES } from './constants';

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
    else if (c.glasses === 'NO' || c.glasses === 'LOCKED_NO') traits.push('MUST NOT have glasses (bare eyes, no frames — do NOT add glasses to this character)');
    else traits.push('check reference image for glasses status');

    matrix += `- [${c.shortName}]: ${traits.join(', ') || 'see reference image'}\n`;
  });

  matrix += `CROSS-CHECK: After completing each panel, verify every character's hair color and glasses status matches the matrix above. If ANY mismatch, redraw that character.\n`;
  matrix += `Reading order: RIGHT-TO-LEFT (Japanese manga). The first speaker is on the RIGHT. Speech bubbles flow right-to-left.
SPEECH BUBBLE PLACEMENT RULE (CRITICAL): Each character's speech bubble MUST be drawn directly above or beside THAT character's head. The RIGHT-side character's bubble MUST be on the RIGHT side of the panel. The LEFT-side character's bubble MUST be on the LEFT side. NEVER draw a character's speech bubble on the opposite side of where the character is standing.\n`;

  return matrix;
};

/**
 * [v4.1.7] Determine if a speaker name refers to a person (either registered cast or third-party/mob)
 * @param {string} name - The name to test
 * @param {Array<string>} validCharacters - List of registered cast names
 * @returns {boolean} True if it looks like a person
 */
export const isLikelyPerson = (name, validCharacters = []) => {
  const cleanName = name.replace(/[（(].*?[）)]/g, '').trim();
  if (!cleanName) return false;

  if (cleanName === '全員' || cleanName === 'みんな') return true;

  // Check registered cast list
  const isCast = validCharacters.some(c => {
    const nameOnly = c.split(/[（(]/)[0].trim();
    return cleanName === c || cleanName === nameOnly || nameOnly === cleanName || cleanName.includes(nameOnly) || (cleanName.length >= 2 && c.includes(cleanName));
  });
  if (isCast) return true;

  // Person-indicative keywords (Japanese terms for suffix/roles, and 'mob'/'speaker')
  // [v4.5.12] 観察者A や スタッフ1 のようなサフィックス付きにも対応、役割語を追加
  const personKeywords = /(?:氏|モブ|客|観客|観察者|参加者|司会|ナレーター|アナウンサー|男性|女性|男|女|スタッフ|社長|主催者|委員長|先生|選手|声|人|キャラ)(?:[A-ZＡ-Ｚ0-9０-９\s]*)$/;
  return personKeywords.test(cleanName) || cleanName.toLowerCase().includes('mob') || cleanName.toLowerCase().includes('speaker');
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

     // [v4.5.6] シネマティック構図のチェック（歪みを加えず、美しさを強調）
     for (const [keyword, lensTag] of Object.entries(cinematicCompositionMap)) {
       if (specificCamera.toLowerCase().includes(keyword.toLowerCase())) {
         return `${lensTag}, (masterpiece, best quality, highly detailed, professional photography:1.2), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)`;
       }
     }

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
    const cleanLine = cLine.replace(/\*\*/g, '').trim();
    // Pattern 1: ## 1. アカリ
    let m = cleanLine.match(/^##\s*(?:\d+\.\s*)?(.*)/);
    // Pattern 2: - Character [アカリ]:
    if (!m) {
      const m2 = cleanLine.match(/^-?\s*Character\s*\[(.*?)\]/i);
      if (m2) m = m2;
    }
    if (m) {
      const fullName = m[1].split(':')[0].trim(); // Remove trailing colon if any
      validCharacters.push(fullName);
      const jpName = fullName.split(/[\(（]/)[0].trim();
      if (jpName && jpName !== fullName) validCharacters.push(jpName);
      
      // [v4.5.10] 姓名やスペース・中黒で区切られた部分名（例: 「と■の よ■ゆき子」の「よ■ゆき子」）もキャストとして登録する
      const parts = jpName.split(/[\s・]/);
      if (parts.length > 1) {
        parts.forEach(p => {
          if (p.trim() && !validCharacters.includes(p.trim())) {
            validCharacters.push(p.trim());
          }
        });
      }

      const romajiMatch = fullName.match(/[\(（]\s*(.*?)\s*[\)）]/);
      if (romajiMatch) validCharacters.push(romajiMatch[1].trim());
    }
  });

  const formattedBubbles = [];
  let bubbleCount = 1;

  lines.forEach(line => {
    // [v4.6.5-fix] SE（効果音演出指示）行をスキップ: （SE: ...）や (SE: ...) の形式に加え、
    // 「音響効果：」「SE：」「効果音：」等のコロン形式も除外
    const trimmedForSE = line.trim();
    if (/^[（(]\s*SE\s*[:：]/i.test(trimmedForSE)) return;
    if (/^(?:音響効果|音響|音声|SE|効果音|SFX|BGM)\s*[:：]/i.test(trimmedForSE)) return;

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
      // [v4.6.4] キャスト名完全一致バイパス: 助詞を含むキャスト名（例: と■のよ■ゆき子）を正しく認識
      // シナリオ内ではスペースが省略されることが多いため、スペース除去比較も行う
      const normalizedSpeaker = tempSpeakerBase.replace(/[\s・]/g, '');
      const isExactCastMatch = validCharacters.some(c => {
        const nameOnly = c.split(/[（(]/)[0].trim();
        const normalizedName = nameOnly.replace(/[\s・]/g, '');
        return nameOnly && (tempSpeakerBase === nameOnly || tempSpeakerBase === c || normalizedSpeaker === normalizedName);
      });
      const hasSentenceParticles = !isExactCastMatch && /(?:が|を|に|で|へ|は|も|と|から|まで|より)/.test(tempSpeakerBase) && tempSpeakerBase.length > 5;
      const endsWithParticle = !isExactCastMatch && /(?:が|を|に|で|へ|は|も|と|から|まで|より)$/.test(tempSpeakerBase);
      const isTooLong = tempSpeakerBase.length > 20; // 複数人「アカリ・ヒカリ・ミク・リン」を許容するため長めに変更
      // [v4.6.3] 照明・SE・演出など舞台指示用語をメタタグとして除外
      const isMetaTag = /^(Camera|Location|Outfit|EMOTION|状況(?:演出)?|Action|リアクション|Reaction|設定|物理描写|SFX|SE|効果音|音響効果|音響|音声|BGM|ナレーション|テロップ|聴覚|触覚|嗅覚|体内感覚|視覚|照明|光|演出|空間|構図|背景|Background|カメラワーク|CameraWork|Camera\s*Work)$/i.test(tempSpeakerBase);
      // [v2.45] 効果音パターン検出: 同じ文字(長音含む)の繰り返しは効果音（シーーーン、ゴゴゴ等）
      const isSoundEffect = /^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(tempSpeakerBase);
      // [v2.45] リアクション指示混入検出: 「（リアクション」等が話者名に含まれていたら除外
      const hasReactionTag = /[（(]\s*リアクション/i.test(match[1]);

      if (hasSentenceParticles || endsWithParticle || isTooLong || isMetaTag || isSoundEffect || hasReactionTag) {
        // 文章構造・メタタグ・効果音・リアクション指示を含む → 話者名ではない
      } else if (isLikelyPerson(tempSpeakerBase, validCharacters) || tempSpeakerBase.includes("全員") || tempSpeakerBase === "Speaker" || match[0].trim().endsWith(':') || match[0].trim().endsWith('：')) {
        isDialogue = true;
      }
    } else if (line.trim().startsWith('「')) {
      // [v2.29] 根本修正: 行全体が「...」で完結するセリフ形式のみを判定。
      // 「没収」と書かれた袋を...のようなト書き中の引用語を誤検出しない。
      const trimmedLine = line.trim();
      // [v4.5.13] 「セリフ」（話者）の形式をサポートするため末尾のカッコを許容
      const isFullQuoteLine = /^「[^」]+」[？！。、!?\s]*([（\(][^\)）]+[\)）])?$/.test(trimmedLine);
      if (isFullQuoteLine) {
        // [v4.2.0] ト書き（動作指示）や極端に短い名詞の誤検出防止
        const quoteContent = trimmedLine.match(/^「([^」]+)」/)?.[1] || '';
        const isStageDirection = /(?:ポーズ|表情|リアクション|アクション|身振り|手振り|仕草|動作|姿勢|佇まい|構え|目線|視線|沈黙|間|無言|独白|ジェスチャー|モーション|立ち姿|座り|しぐさ|ため息|溜息|息|うなずき|頷き|首振り|指差し|腕組み|ガッツポーズ|ドヤ顔|苦笑い|苦笑|微笑|爆笑|号泣|絶叫|フリーズ|硬直|脱力|崩れ落ち|土下座|敬礼|拍手|握手|ハイタッチ|決めポーズ|威圧|威嚇|震え|よろめき|のけぞり|ずっこけ|ツッコミ|突っ込み)/.test(quoteContent);
        const isTooShortForDialogue = quoteContent.length <= 4 && !/[がをにでへはもとからよねわ！？!?…。、]/.test(quoteContent);
        if (!isStageDirection && !isTooShortForDialogue) {
          isDialogue = true;
        }
      }
    }

    // [v4.6.3] コロン形式ト書き判定: 「キャラ名：描写テキスト」で「」を含まない長文はト書き（演出指示）
    // 例: 「ミク：両腕ダルんと投げ出し、口を大きく開けて超あくび」はセリフではなくポーズ描写
    if (isDialogue && match && (match[0].trim().endsWith(':') || match[0].trim().endsWith('：'))) {
      const restOfLine = line.substring(match.index + match[0].length);
      const hasNoQuotes = !/[「」]/.test(restOfLine);
      if (hasNoQuotes && restOfLine.trim().length > 15) {
        isDialogue = false;
      }
    }

    if (isDialogue) {
      // [v4.5.13] 「セリフ」（キャラ）の形式の場合、前処理で正確に中身だけを抽出
      const quoteMatch = clean.trim().match(/^「([^」]+)」/);
      if (quoteMatch && clean.trim().startsWith('「')) {
        clean = quoteMatch[1];
      } else {
        // Remove Speaker Name and Colon
        clean = clean.replace(/^.*?(?:[:：]|「)\s*/, '');
        // トリムを行ってからカッコを除去（末尾のスペースで除去漏れが発生するのを防ぐため）
        clean = clean.trim();
        // Remove surrounding Japanese quotes to prevent hallucination in images
        clean = clean.replace(/^「+/, '').replace(/」+$/, '');
      }
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
  // [v4.1.6 Fix] カギ括弧の直前にキャスト名が存在する場合のみセリフとしてパースし、ロゴ名や第三者のボイス（齊藤氏等）の誤抽出を防止
  if (formattedBubbles.length === 0) {
    const regex = /「([^」]+)」/g;
    let match;
    let lastIndex = 0;
    while ((match = regex.exec(fullPanelText)) !== null) {
      let dialogueText = match[1].trim();
      dialogueText = dialogueText.replace(/（.*?）|\(.*?\)/g, '').trim();
      
      // カギ括弧の直前のテキスト（前のカギ括弧の末尾から、現在のカギ括弧の先頭まで）を取得
      const prevText = fullPanelText.substring(lastIndex, match.index);
      // [v4.6.5] lastIndex は「セリフとして処理された場合」のみ更新する（後述）。
      // 非セリフ（形状描写「へ」の字、記号、SFX等）でスキップした場合は lastIndex を進めず、
      // 話者コンテキスト（キャラ名を含むprevText）を次のマッチに引き継ぐ。

      // prevText の中に、有効なキャラクター名（キャストまたはモブなどの人物）が含まれているか確認
      const hasValidSpeakerInPrevText = isLikelyPerson(prevText, validCharacters) || validCharacters.some(c => {
        const nameOnly = c.split(/[（(]/)[0].trim();
        return nameOnly && prevText.includes(nameOnly);
      }) || prevText.includes("全員") || prevText.includes("みんな");

      if (!hasValidSpeakerInPrevText) {
        // 直前にキャスト名や人物名がない場合は、セリフではなく引用や他人の発言としてスキップ
        continue;
      }

      // [v4.1.9] 形状・記号・修飾表現の除外チェック
      // 1. 長さが極めて短い、英数字・記号のみの文字列（例：Ω、∩、Aなど）は除外
      const isPureSymbol = /^[A-Za-z0-9Ω∩αβγδεζηθικλμνξοπρστυφχψω\s\-\+\*\/\\＝\?？!！]{1,3}$/.test(dialogueText);

      // [v4.6.5-fix2] 擬音語・擬態語の除外（バンッ！、ガチャン！、ガリッ！等）
      // ン・リ・ル等の一般的なSFX語尾を許容するため suffix に追加
      const isSfx = /^(バン|ドン|ガン|ドカ|バキ|ドス|ガサ|ゴト|チリン|ピンポン|カチ|パチ|ドーン|バァーン|ドォーン|バーン|ドドド|ゴゴゴ|ザザザ|ピー|ピピッ|ガチャ|ギー|ガリ|バタ|ガタ|ビリ|メリ|パリ|ドサ|ズド|ゴロ|キー|ギシ|ビシ|ガシャ|ミシ|カタ|コト|パタ|ジャリ|ズシ|グシャ|ベキ|メキ)[ッーン!！\s]*$/u.test(dialogueText);
      const postText = fullPanelText.substring(regex.lastIndex, regex.lastIndex + 40);
      // [v4.6.5-fix2] 「〜と...音が」「〜と...鳴」等のSE文脈も検出
      const isSfxByPostText = /^(という音|という爆音|という銃声|という足音|と[^\n「」]{0,20}(?:音が|音を|音で|異音|金属音|爆音|轟音|衝撃音))/.test(postText);

      // 2. 直前のテキストの末尾が形状や表記指示、比喩表現などを示すものである場合は除外
      const isNotDialogueIndicator = /(?:型|字|感|と書かれた|と書く|と書き|と書いた|という|のような|風の|的な|コード|キー|マーク|記号|ラベル|吹き出し|セリフ|ポーズ)$/.test(prevText.trim());
      const preQuoteContext = prevText.slice(-40);
      // [v4.6.5-fix2] SE関連メタタグ（音響効果、効果音等）が直前にある場合も除外
      const isVisualTextByContext =
        /(?:空中|宙|空間|画面|紙|原稿|黒板|ホワイトボード|看板|札|プレート|ノート|ページ|壁|床|文字|単語|タイトル|見出し|ラベル|テロップ|字幕|サイン|SFX|擬音|音響効果|効果音|SE|BGM|音響|音声)[^「」]{0,12}$/.test(preQuoteContext) ||
        /^(?:と)?[^。！？\n]{0,16}(?:書|描|指書|なぞ|浮か|表示|投影|刻|印字|残像|光|輝|出現|出る|現れる|走る|切り裂く)/.test(postText);

      // [v4.5.11] 3. カギ括弧の直後が助詞（が、を、に、で、へ、も、から、より）などで名詞的に使われている場合は除外
      // ※「の」は「〜の吹き出し」などの場合があるため、「と」は「〜と叫ぶ」などの場合があるため含めない。
      const isUsedAsNoun = /^[がをにでへもからより]/.test(postText.trim());

      // [v4.6.5] 4. 形状描写の除外: 「へ」の字、「Ω」型、「ω」型 等の1〜2文字カギ括弧は
      // 口の形や図形を表す描写であり、セリフではない。直後に「の字」「型」「の形」等が続く場合は除外。
      const isShapeDescription = dialogueText.length <= 2 && /^(?:の字|型|の形|の口|にゆが|に曲|に歪|に変形|に開|に大|のよう|みたい)/.test(postText.trim());

      if (isPureSymbol || isSfx || isSfxByPostText || isNotDialogueIndicator || isVisualTextByContext || isUsedAsNoun || isShapeDescription) {
        // [v4.6.5] 非セリフ — lastIndexを進めず、話者コンテキストを次のマッチに引き継ぐ
        continue;
      }

      // [v2.29] ト書き判定: キャラ名2名以上+動作動詞を含む長文はト書きとみなしスキップ
      const charNamesInText = validCharacters.filter(c => {
        const nameOnly = c.split(/[\(（]/)[0].trim();
        return nameOnly && dialogueText.includes(nameOnly);
      });
      const hasActionVerbs = /(?:走|逃|叫|倒|飛|投|握|振|開|閉|持|回|守|追|暴|掴|奪|叩|殴|蹴|泣|笑|怒|驚|震|立|座|歩|見|向|指|差|押|引|掲|置|取|抱|抜|落|転|上|下|入|出|乗|降|着|脱|食|飲|読|書|聞|話|歌|踊|遊|寝|起|止|始|続|終|帰|来|行|待|送|届|届|渡|受|返|払|買|売|借|貸|集|散|並|重|包|巻|結|解|切|折|曲|伸|縮|揺|動|止|消|現|隠|探|見つ)/.test(dialogueText);
      const isLikelyNarration = (charNamesInText.length >= 2 && hasActionVerbs && dialogueText.length > 15);
      // [v4.6.5] セリフとして処理された場合のみ lastIndex を更新
      lastIndex = regex.lastIndex;
      if (dialogueText && !isLikelyNarration) {
        formattedBubbles.push(`(Speech Bubble ${bubbleCount}: "${dialogueText}")`);
        bubbleCount++;
      }
    }
  }

  // [v2.22] 「吹き出し描くな」指示を廃止。セリフが無い場合でも描画を阻害しない
  if (formattedBubbles.length === 0) {
    return "(Characters interact without dialogue in this panel)";
  }
  return formattedBubbles.join(', ');
};

export const cleanseActionGagSymbols = (actionText) => {
  if (!actionText) return actionText;
  
  const gagSymbols = {
    'POPPING VEIN': 'a cartoon popping vein symbol (symbolic representation only, do NOT draw the letters "POPPING VEIN" or any text)',
    'POPPING VEINS': 'cartoon popping vein symbols (symbolic representation only, do NOT draw the letters "POPPING VEINS" or any text)',
    'LARGE SWEAT DROP': 'a cartoon sweat drop symbol on the head (symbolic representation only, do NOT draw the letters "LARGE SWEAT DROP" or any text)',
    'LARGE SWEAT DROPS': 'cartoon sweat drop symbols (symbolic representation only, do NOT draw the letters "LARGE SWEAT DROPS" or any text)',
    'SWEAT DROP': 'a cartoon sweat drop symbol (symbolic representation only, do NOT draw the letters "SWEAT DROP" or any text)',
    'SWEAT DROPS': 'cartoon sweat drop symbols (symbolic representation only, do NOT draw the letters "SWEAT DROPS" or any text)',
    'ANGER MARK': 'a cartoon anger mark (symbolic representation only, do NOT draw the letters "ANGER MARK" or any text)',
    'ANGER MARKS': 'cartoon anger marks (symbolic representation order, do NOT draw the letters "ANGER MARKS" or any text)',
    'SHOCK LINES': 'cartoon shock lines (symbolic representation only, do NOT draw the letters "SHOCK LINES" or any text)',
    'SPEED LINES': 'dynamic speed lines (symbolic representation only, do NOT draw the letters "SPEED LINES" or any text)'
  };
  
  let cleansed = actionText;
  for (const [key, replacement] of Object.entries(gagSymbols)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    cleansed = cleansed.replace(regex, replacement);
  }
  return cleansed;
};

const WRITTEN_TEXT_CONTEXT_RE = /(?:\bwritten\b|\bhandwriting\b|air-writing|finger-writing|\bsignage\b|\bsign\b|\blabel\b|board text|screen text|printed text|text on|letters on|\u6587\u5b57|\u624b\u66f8\u304d|\u7a7a\u4e2d\u306b|\u66f8\u304b\u308c|\u66f8\u304f|\u66f8\u304d|\u66f8\u3044\u305f|\u770b\u677f|\u63b2\u793a|\u8cbc\u308a\u7d19|\u9ed2\u677f|\u30db\u30ef\u30a4\u30c8\u30dc\u30fc\u30c9|\u30ce\u30fc\u30c8\u306b|\u7d19\u306b|\u30b9\u30de\u30db\u753b\u9762|\u753b\u9762\u306b|\u8868\u793a|\u5370\u5b57|\u523b\u5370|\u30e9\u30d9\u30eb|\u6a19\u8b58)/i;
const SOUND_CONTEXT_RE = /(?:sound|sfx|onomatopoeia|audio|hum|buzz|\u97f3|\u64ec\u97f3|\u52b9\u679c\u97f3|BGM|\u9cf4|\u30d6\u30fc\u30f3|\u30ce\u30a4\u30ba)/i;
// [v4.6.3] MOOD_CONTEXT_RE から頻出語（表情・反応・状態・感情）を除外。
// これらはセリフ周辺のト書きに頻繁に出現し、セリフのカギ括弧まで誤って置換してしまう原因となっていた。
const MOOD_CONTEXT_RE = /(?:aura|mood|emotion|focus|silence|atmosphere|\u30aa\u30fc\u30e9|\u96f0\u56f2\u6c17|\u6c17\u914d|\u6c88\u9ed9|\u7a7a\u6c17|\u611f\u3058|\u30e0\u30fc\u30c9|\u96c6\u4e2d|\u6ca1\u5165|\u30d5\u30a9\u30fc\u30ab\u30b9|\u7dca\u5f35|\u4f59\u97fb)/i;
const SPOKEN_TEXT_CONTEXT_RE = /(?:dialogue|speech|says|said|shouts|whispers|\u8a00|\u7b54|\u53eb|\u547c|\u545f|\u3064\u3076\u3084|\u8a71|\u554f|\u7591\u554f|\u7d76\u53eb|\u30bb\u30ea\u30d5)/i;
const ACTION_QUOTED_TEXT_RE = /[\u300c\u300e"\u201c\u201d]([^\u300c\u300d\u300e\u300f"\u201c\u201d]{1,80})[\u300d\u300f"\u201c\u201d]/g;

const protectNonDialogueTextHints = (actionText) => {
  if (!actionText) return actionText;

  return actionText.replace(ACTION_QUOTED_TEXT_RE, (match, _content, offset, fullText) => {
    // [v4.6.2] 1〜2文字の引用（「へ」「O」など）は表情・記号として保護
    if (_content.length <= 2) {
      return match;
    }

    // [v4.6.5-fix2] セリフ判定: カギ括弧の直前にキャラ名パターン（片仮名/漢字/ひらがな + 任意の句読点）がある場合、
    // これはセリフである可能性が極めて高い。extractActionOnly が除去し損ねたセリフを
    // ここで破壊すると extractDialogueOnly のフォールバックも失敗し、セリフが完全消失する。
    const immediateLeft = fullText.slice(Math.max(0, offset - 12), offset).trimEnd();
    // 直前が「キャラ名」パターン（CJK文字 + 任意の句読点・空白）で終わっている場合はスキップ
    // [v4.6.5-fix2] 句読点（、。）やカッコ閉じ（）の直後でもCJK文字がその前にあればセリフと判定
    const isLikelyDialogue = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u25A0-\u25FF■][、。！？!?）)」』\s]*$/.test(immediateLeft);
    if (isLikelyDialogue) {
      return match;
    }

    // [v4.6.5-fix2] 文脈ウィンドウを56→30文字に縮小。
    // 隣接するセリフの語彙（「オーラ」「鳴らし」等）を誤って文脈として拾い、
    // MOOD_CONTEXT_RE / SOUND_CONTEXT_RE が誤マッチする問題を防止。
    const leftContext = fullText.slice(Math.max(0, offset - 30), offset);
    const rightContext = fullText.slice(offset + match.length, Math.min(fullText.length, offset + match.length + 30));
    const context = `${leftContext} ${rightContext}`;

    if (SOUND_CONTEXT_RE.test(context)) {
      return 'a non-text ambient sound effect (show through environment, vibration, cold air, or reactions only; no visible letters)';
    }

    if (MOOD_CONTEXT_RE.test(context)) {
      return 'a non-text mood or aura concept (show through poses, focus, lighting, and composition only; no visible letters)';
    }

    if (WRITTEN_TEXT_CONTEXT_RE.test(context)) {
      return match;
    }

    if (SPOKEN_TEXT_CONTEXT_RE.test(context)) {
      return 'the listed dialogue content (do not render this quoted text outside speech bubbles)';
    }

    return 'a quoted concept only (do not render these letters unless explicit visible writing is requested)';
  });
};

export const extractActionOnly = (fullPanelText, castList, placementRule = "") => {
  const lines = fullPanelText.split('\n');

  const validCharacters = [];
  castList.split('\n').forEach(cLine => {
    const m = cLine.replace(/\*\*/g, '').trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);
    if (m) {
      const fullName = m[1].trim();
      validCharacters.push(fullName);
      const jpName = fullName.split(/[\(（]/)[0].trim();
      if (jpName && jpName !== fullName) validCharacters.push(jpName);
      const romajiMatch = fullName.match(/[\(（]\s*(.*?)\s*[\)）]/);
      if (romajiMatch) validCharacters.push(romajiMatch[1].trim());
    }
  });

  const actionLines = lines.filter(line => {
    const match = line.match(/^(.*?)(?:[:：]|「)/);
    let isDialogue = false;
    if (match && match[1].trim()) {
      let tempSpeaker = match[1].replace(/^(SFX|効果音|BGM|Action)/i, '').trim();
      tempSpeaker = tempSpeaker.replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
      // [v4.6.4] キャスト名完全一致バイパス: 助詞を含むキャスト名（例: と■のよ■ゆき子）を正しく認識
      const normalizedSpeakerA = tempSpeaker.replace(/[\s・]/g, '');
      const isExactCastMatch = validCharacters.some(c => {
        const nameOnly = c.split(/[（(]/)[0].trim();
        const normalizedName = nameOnly.replace(/[\s・]/g, '');
        return nameOnly && (tempSpeaker === nameOnly || tempSpeaker === c || normalizedSpeakerA === normalizedName);
      });
      const hasSentenceParticles = !isExactCastMatch && /[がをにでへはもとからまでより]/.test(tempSpeaker) && tempSpeaker.length > 5;
      // [v4.6.3] extractDialogueOnly と閾値を統一（12→20）。不一致だとセリフがAction側に残り、protectNonDialogueTextHintsで破壊される
      const isTooLong = tempSpeaker.length > 20;
      // [v4.6.3] 照明・SE・演出など舞台指示用語をメタタグとして除外
      const isMetaTag = /^(Camera|Location|Outfit|EMOTION|状況(?:演出)?|Action|リアクション|Reaction|設定|聴覚|触覚|嗅覚|体内感覚|視覚|照明|光|演出|空間|構図|物理描写|SFX|SE|効果音|音響効果|音響|音声|BGM|ナレーション|テロップ|背景|Background|カメラワーク|CameraWork|Camera\s*Work)$/i.test(tempSpeaker);
      // [v2.45] 効果音パターン検出
      const isSoundEffect = /^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(tempSpeaker.replace(/[（(].*$/, '').trim());
      const hasReactionTag = /[（(]\s*リアクション/i.test(match[1]);
      
      if (hasSentenceParticles || isTooLong || isMetaTag || isSoundEffect || hasReactionTag) {
        // Not a dialogue speaker (meta tag, sound effect, or reaction directive)
      } else if (isLikelyPerson(tempSpeaker, validCharacters) || tempSpeaker === "全員" || tempSpeaker === "Speaker" || match[0].trim().endsWith(':') || match[0].trim().endsWith('：')) {
        isDialogue = true;
      }
    } else if (line.trim().startsWith('「')) {
      const trimmedLine = line.trim();
      const isFullQuoteLine = /^「[^」]+」[？！。、!?\s]*$/.test(trimmedLine);
      if (isFullQuoteLine) {
        // [v4.2.0] ト書き（動作指示）や極端に短い名詞の誤検出防止
        const quoteContent = trimmedLine.match(/^「([^」]+)」/)?.[1] || '';
        const isStageDirection = /(?:ポーズ|表情|リアクション|アクション|身振り|手振り|仕草|動作|姿勢|佇まい|構え|目線|視線|沈黙|間|無言|独白|ジェスチャー|モーション|立ち姿|座り|しぐさ|ため息|溜息|息|うなずき|頷き|首振り|指差し|腕組み|ガッツポーズ|ドヤ顔|苦笑い|苦笑|微笑|爆笑|号泣|絶叫|フリーズ|硬直|脱力|崩れ落ち|土下座|敬礼|拍手|握手|ハイタッチ|決めポーズ|威圧|威嚇|震え|よろめき|のけぞり|ずっこけ|ツッコミ|突っ込み)/.test(quoteContent);
        const isTooShortForDialogue = quoteContent.length <= 4 && !/[がをにでへはもとからよねわ！？!?…。、]/.test(quoteContent);
        if (!isStageDirection && !isTooShortForDialogue) {
          isDialogue = true;
        }
      }
    }

    // [v4.6.3] コロン形式ト書き判定: extractDialogueOnly と同期
    if (isDialogue && match && (match[0].trim().endsWith(':') || match[0].trim().endsWith('：'))) {
      const restOfLine = line.substring(match.index + match[0].length);
      const hasNoQuotes = !/[「」]/.test(restOfLine);
      if (hasNoQuotes && restOfLine.trim().length > 15) {
        isDialogue = false;
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
  actionStr = actionStr.replace(/[（(](?:Camera|Location|Outfit|EMOTION|状況(?:演出)?|Action|リアクション|Reaction|設定|背景|Background|カメラワーク|CameraWork|Camera\s*Work)[:：]?\s*(.*?)[)）]/gi, '$1');

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

  return protectNonDialogueTextHints(cleanseActionGagSymbols(actionStr));
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
    if (/^\[EMOTION:/i.test(trimmed)) return false;
    if (/^状況(?:演出)?[：:]/i.test(trimmed)) return false;
    return trimmed.includes('：') || trimmed.includes(':') || trimmed.includes('「');
  });

  // キャラ名バリデーション用リストと名寄せマップ
  const validCharsForPlacement = [];
  const charLookup = {};
  castList.split('\n').forEach(cLine => {
    const m = cLine.replace(/\*\*/g, '').trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);
    if (m) {
      const fullName = m[1].trim();
      const nameOnly = fullName.split(/[（(]/)[0].trim();
      if (nameOnly) {
        if (!validCharsForPlacement.includes(nameOnly)) {
          validCharsForPlacement.push(nameOnly);
        }
        charLookup[nameOnly] = nameOnly;
        
        // ローマ字名対応
        const romajiMatch = fullName.match(/[\(（]\s*(.*?)\s*[\)）]/);
        if (romajiMatch) {
          const romaji = romajiMatch[1].trim();
          if (!validCharsForPlacement.includes(romaji)) {
            validCharsForPlacement.push(romaji);
          }
          charLookup[romaji] = nameOnly;
        }
      }
    }
  });

  const speakers = [];
  dialogLines.forEach(line => {
    const match = line.match(/^(.*?)(?:[:：]|「)/);
    if (match && match[1].trim()) {
      let speaker = match[1].replace(/^(SFX|効果音|BGM|Action|状況(?:演出)?|EMOTION|[\(（].*?[\)）]|\[.*?\])/gi, '').replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
      // [v4.6.4] キャスト名完全一致バイパス: 助詞を含むキャスト名（例: と■のよ■ゆき子）を正しく認識
      const normalizedSpeakerP = speaker.replace(/[\s・]/g, '');
      const isExactCastMatchP = validCharsForPlacement.some(c => {
        const normalizedName = c.replace(/[\s・]/g, '');
        return c === speaker || normalizedSpeakerP === normalizedName;
      });
      const hasSentenceParticles = !isExactCastMatchP && /[がをにでへはもとからまでより]/.test(speaker) && speaker.length > 5;
      const isTooLong = speaker.length > 12;
      // [v4.6.3] 照明・SE・演出など舞台指示用語をメタタグとして除外
      const isMetaTag = /^(Camera|Location|Outfit|EMOTION|状況(?:演出)?|Action|リアクション|Reaction|設定|聴覚|触覚|嗅覚|体内感覚|視覚|照明|光|演出|空間|構図|物理描写|SFX|SE|効果音|音響効果|音響|音声|BGM|ナレーション|テロップ|背景|Background|カメラワーク|CameraWork|Camera\s*Work)$/i.test(speaker);
      const isSoundEffect = /^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(speaker.replace(/[（(].*$/, '').trim());
      const hasReactionTag = /[（(]\s*リアクション/i.test(match[1]);
      const isDummySpeaker = /^(全員|みんな|Speaker)$/i.test(speaker);
      if (hasSentenceParticles || isTooLong || isMetaTag || isSoundEffect || hasReactionTag || isDummySpeaker) return;
      // [v4.6.3] コロン形式ト書き判定: extractDialogueOnly と同期
      if (match[0].trim().endsWith(':') || match[0].trim().endsWith('：')) {
        const restOfLine = line.substring(match.index + match[0].length);
        if (!/[「」]/.test(restOfLine) && restOfLine.trim().length > 15) return;
      }
      if (speaker && !/^(EMOTION|NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)$/i.test(speaker)) {
        // キャラ名判定と名寄せ
        const matchedChar = validCharsForPlacement.find(c => speaker === c || speaker.includes(c) || c.includes(speaker));
        if (matchedChar || isLikelyPerson(speaker, validCharsForPlacement) || match[0].trim().endsWith(':') || match[0].trim().endsWith('：')) {
          const canonicalName = matchedChar ? charLookup[matchedChar] : speaker;
          if (!speakers.includes(canonicalName)) {
            speakers.push(canonicalName);
          }
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
  // 日本語名とローマ字名両方に対応できるようにする
  const validCharacters = [];
  const charLookup = {};
  castList.split('\n').forEach(cLine => {
    const m = cLine.replace(/\*\*/g, '').trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);
    if (m) {
      const fullCharName = m[1].trim();
      const nameOnly = fullCharName.split('(')[0].trim().split('（')[0].trim();
      if (nameOnly) {
        if (!validCharacters.includes(nameOnly)) {
          validCharacters.push(nameOnly);
        }
        charLookup[nameOnly] = { name: nameOnly, full: fullCharName };
        
        // ローマ字名も名寄せ登録
        const romajiMatch = fullCharName.match(/[\(（]\s*(.*?)\s*[\)）]/);
        if (romajiMatch) {
          const romaji = romajiMatch[1].trim();
          if (!validCharacters.includes(romaji)) {
            validCharacters.push(romaji);
          }
          charLookup[romaji] = { name: nameOnly, full: fullCharName };
        }
      }
    }
  });

  // Extract speakers from dialogue lines
  const speakers = [];
  lines.forEach(line => {
    const match = line.match(/^(.*?)(?:[:：]|「)/);
    if (match && match[1].trim()) {
      let speaker = match[1].replace(/^(SFX|効果音|BGM|Action|状況(?:演出)?|[\(（].*?[\)）])/gi, '').replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
      if (speaker) {
        if (speaker === "全員" || speaker === "Speaker") return;
        const matchedChar = validCharacters.find(c => speaker === c || speaker.includes(c) || c.includes(speaker));
        if (matchedChar) {
          const canonicalName = charLookup[matchedChar].name;
          if (!speakers.includes(canonicalName)) {
            speakers.push(canonicalName);
          }
        } else if (isLikelyPerson(speaker, validCharacters)) {
          if (!speakers.includes(speaker)) {
            speakers.push(speaker);
          }
        }
      }
    }
  });

  // [v3.95] セリフ行以外のテキストを抽出して登場人物を検出する (セリフ内言及によるキャラ誤認バグの完全排除)
  const actionAndMetaLines = [];
  lines.forEach(line => {
    const match = line.match(/^(.*?)(?:[:：]|「)/);
    let isDialogue = false;
    if (match && match[1].trim()) {
      let tempSpeaker = match[1].replace(/^(SFX|効果音|BGM|Action)/i, '').trim();
      tempSpeaker = tempSpeaker.replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
      // [v4.6.4] キャスト名完全一致バイパス: 助詞を含むキャスト名（例: と■のよ■ゆき子）を正しく認識
      const normalizedSpeakerC = tempSpeaker.replace(/[\s・]/g, '');
      const isExactCastMatchC = validCharacters.some(c => {
        const nameOnly = c.split(/[（(]/)[0].trim();
        const normalizedName = nameOnly.replace(/[\s・]/g, '');
        return nameOnly && (tempSpeaker === nameOnly || tempSpeaker === c || normalizedSpeakerC === normalizedName);
      });
      const hasSentenceParticles = !isExactCastMatchC && /[がをにでへはもとからまでより]/.test(tempSpeaker) && tempSpeaker.length > 5;
      const isTooLong = tempSpeaker.length > 12;
      const isMetaTag = /^(Camera|Location|Outfit|EMOTION|状況(?:演出)?|Action|リアクション|Reaction|設定|聴覚|触覚|嗅覚|体内感覚|視覚|物理描写|SFX|効果音|BGM|ナレーション|テロップ|背景|Background|カメラワーク|CameraWork|Camera\s*Work)$/i.test(tempSpeaker);
      const isSoundEffect = /^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(tempSpeaker.replace(/[（(].*$/, '').trim());
      const hasReactionTag = /[（(]\s*リアクション/i.test(match[1]);
      
      if (hasSentenceParticles || isTooLong || isMetaTag || isSoundEffect || hasReactionTag) {
        // メタタグ等
      } else if (isLikelyPerson(tempSpeaker, validCharacters) || tempSpeaker === "全員" || tempSpeaker === "Speaker" || match[0].trim().endsWith(':') || match[0].trim().endsWith('：')) {
        isDialogue = true;
      }
    } else if (line.trim().startsWith('%NOTHING%')) { // dummy check to avoid duplicate tag
      // noop
    } else if (line.trim().startsWith('「')) {
      const trimmedLine = line.trim();
      const isFullQuoteLine = /^「[^」]+」[？！。、!?\s]*$/.test(trimmedLine);
      if (isFullQuoteLine) {
        // [v4.2.0] ト書き（動作指示）や極端に短い名詞の誤検出防止
        const quoteContent = trimmedLine.match(/^「([^」]+)」/)?.[1] || '';
        const isStageDirection = /(?:ポーズ|表情|リアクション|アクション|身振り|手振り|仕草|動作|姿勢|佇まい|構え|目線|視線|沈黙|間|無言|独白|ジェスチャー|モーション|立ち姿|座り|しぐさ|ため息|溜息|息|うなずき|頷き|首振り|指差し|腕組み|ガッツポーズ|ドヤ顔|苦笑い|苦笑|微笑|爆笑|号泣|絶叫|フリーズ|硬直|脱力|崩れ落ち|土下座|敬礼|拍手|握手|ハイタッチ|決めポーズ|威圧|威嚇|震え|よろめき|のけぞり|ずっこけ|ツッコミ|突っ込み)/.test(quoteContent);
        const isTooShortForDialogue = quoteContent.length <= 4 && !/[がをにでへはもとからよねわ！？!?…。、]/.test(quoteContent);
        if (!isStageDirection && !isTooShortForDialogue) {
          isDialogue = true;
        }
      }
    }
    if (!isDialogue) {
      actionAndMetaLines.push(line);
    }
  });
  const actionAndMetaText = actionAndMetaLines.join('\n');

  // Visual Action テキストからも登場キャラ名を検出
  const allPanelCharacters = [...speakers];
  validCharacters.forEach(charName => {
    const canonicalName = charLookup[charName].name;
    if (!allPanelCharacters.includes(canonicalName) && actionAndMetaText.includes(charName)) {
      allPanelCharacters.push(canonicalName);
    }
  });

  // 吹き出し数カウント: セリフ行（「」付き）の数を数えてソロショット判定の矛盾を防ぐ
  let dialogueLineCount = 0;
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.includes('「') && trimmed.includes('」')) {
      dialogueLineCount++;
    } else if (/^[^（(【\[]*?[:：]\s*「/.test(trimmed)) {
      dialogueLineCount++;
    }
  });

  // スピーカー最大3名をメインアクターとして登録
  const panelActors = speakers.slice(0, 3).map(s => `[${s}]`);

  // [v2.69] 背景キャスト統合ロジックを完全廃止 (No-Show 除外指示への置換)
  // このコマに一切登場しないキャラ（No-Show）を特定
  const canonicalValidCharacters = [...new Set(Object.values(charLookup).map(obj => obj.name))];
  const noShowCharacters = canonicalValidCharacters.filter(c => !allPanelCharacters.includes(c));

  const allCharBrackets = allPanelCharacters.map(c => `[${c}]`);

  if (panelActors.length > 0) {
    let cloneWarning = `ANTI-CLONE REMINDER: ${allCharBrackets.join(', ')} — each appears EXACTLY ONCE. If a character is mentioned in both the placement rule AND the visual action, they are the SAME person — do NOT draw a second copy.`;
    
    if (allPanelCharacters.length === 1 && dialogueLineCount <= 1) {
      cloneWarning += `\nSOLO SHOT (SINGLE CHARACTER SCENE): Since only ${allCharBrackets[0]} is listed, THIS IS A SOLO SHOT. Do NOT draw ANY other person. Do NOT draw a second copy of ${allCharBrackets[0]}. Leave the surrounding space empty rather than adding people.`;
    } else if (allPanelCharacters.length === 1 && dialogueLineCount >= 2) {
      cloneWarning += `\nNOTE: Multiple speech bubbles in this panel are ALL spoken by ${allCharBrackets[0]} (monologue/soliloquy). Draw only ${allCharBrackets[0]} — do NOT add a second character just because there are multiple bubbles.`;
    }
    
    // クローン防止: 空間（前景・後景）で縛る
    const foreground = panelActors.join(' and ');
    const bgActors = allCharBrackets.filter(b => !panelActors.includes(b));
    const background = bgActors.length > 0 ? bgActors.join(', ') : 'NO ONE ELSE';
    
    // 登場しないキャラへの強力な除外指示（Negative Constraints）を生成
    let negativeConstraint = "";
    if (noShowCharacters.length > 0) {
      const noShowNames = noShowCharacters.map(c => `[${c}]`).join(', ');
      negativeConstraint = `\nDo NOT draw ${noShowNames} in this panel. They are completely absent from this scene.`;
    }

    // [v4.2.1] モブキャラ検出ロジック：本文にモブが含まれる場合はABS制限を緩和する
    const hasMob = /(モブ|スタッフ|観客|群衆|兵士|客|人々|クラスメイト|生徒たち|全員|みんな|ファンたち|ファン|通行人)/.test(fullPanelText);

    let spatialConstraint;
    if (hasMob) {
      spatialConstraint = `\nFOREGROUND MUST CONTAIN ONLY: ${foreground}.\nBACKGROUND MUST CONTAIN ONLY: ${background} and background characters (mob).\n${negativeConstraint}\nAllow additional background characters (mobs) as required by the action. Do not draw any main character in the background if they are already in the foreground.`;
    } else {
      spatialConstraint = `\nFOREGROUND MUST CONTAIN ONLY: ${foreground}.\nBACKGROUND MUST CONTAIN ONLY: ${background}.${negativeConstraint}\nABSOLUTELY NO OTHER HUMANS ALLOWED. Do not draw any character in the background if they are already in the foreground. Total EXACTLY ${allPanelCharacters.length} distinct individuals.`;
    }

    return `CRITICAL CAST PLACEMENT: Ensure ${foreground} are the main focus.\n${cloneWarning}${spatialConstraint}`;
  } else {
    // 登場キャラクターが検出されなかった場合でも、キャスト全体から除外指示を出すことは可能
    let negativeConstraint = "";
    if (canonicalValidCharacters.length > 0) {
      const allNames = canonicalValidCharacters.map(c => `[${c}]`).join(', ');
      negativeConstraint = `\nDo NOT draw ${allNames} unless explicitly required.`;
    }
    return `CRITICAL CAST PLACEMENT: Follow the panel's action naturally. NEVER draw the exact same character twice.${negativeConstraint}`;
  }
};

// --- Emotion Style Functions (Phase 3-C: App.jsx assemblePrompt -> externalized) ---

// [v2.25] パネルテキストからEMOTIONタグを抽出
export const extractEmotionStyle = (panelText) => {
  const match = panelText.match(/\[EMOTION:\s*(NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)\s*\]/i); // [v2.95] 画風パレット拡張
  if (match) {
    const key = match[1].toUpperCase();
    if (EMOTION_STYLES[key]) return key;
  }
  return 'NORMAL';
};

// [v2.31] パネルの感情スタイル指示を構築（マルチキャラ対応）
export const buildEmotionBlock = (panelText) => {
  const emo = extractEmotionStyle(panelText);
  if (emo === 'NORMAL') return '';
  const s = EMOTION_STYLES[emo];

  // [v2.31] IMPACT等のソロ演出スタイルがマルチキャラパネルで使われた場合、
  // 「顔アップで60-80%」指示がANTI-FLOATING-EYE RULEと矛盾するのを防ぐ
  // [v3.83] 五感ラベル・メタタグがスピーカーとして誤カウントされるのを防止
  const META_TAG_FILTER = /^(Camera|Location|Outfit|EMOTION|状況(?:演出)?|Action|リアクション|Reaction|設定|聴覚|触覚|嗅覚|体内感覚|視覚|物理描写|SFX|効果音|BGM|ナレーション|テロップ|背景|Background|カメラワーク|CameraWork|Camera\s*Work)$/i;
  const speakersInPanel = [];
  panelText.split('\n').forEach(line => {
    // EMOTIONタグ行を除外
    if (/^\[EMOTION:/i.test(line.trim())) return;
    const m = line.match(/^(.*?)(?:[:：]|「)/);
    if (m && m[1].trim()) {
      const sp = m[1].replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
      if (sp && !speakersInPanel.includes(sp) && !META_TAG_FILTER.test(sp)) speakersInPanel.push(sp);
    }
  });
  const isMultiChar = speakersInPanel.length >= 2;

  // マルチキャラ用フォールバックが定義されている場合はそちらを使用
  if (isMultiChar && s.styleMulti) {
    let block = `\n(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${s.styleMulti}`;
    if (s.proportionsMulti) block += `\nPROPORTION OVERRIDE: ${s.proportionsMulti}`;
    if (s.vfxMulti) block += `\nVFX: ${s.vfxMulti}`;
    return block;
  }

  let block = `\n(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${s.style}`;
  if (s.proportions) block += `\nPROPORTION OVERRIDE: ${s.proportions}`;
  if (s.vfx) block += `\nVFX: ${s.vfx}`;
  return block;
};

// --- Clean Cast List (Phase 3-C: castList parsing -> externalized) ---
// [v2.30] キャストリストからWEIGHTSタグを抽出してクリーンなデータに整形
export const cleanCastList = (castList, activeOutfit) => {
  let cleanCastData = "";
  let currentCharacter = "";
  let isParsingOutfit = false;
  const castLines = castList.split('\n');
  for (let i = 0; i < castLines.length; i++) {
    const line = castLines[i].replace(/\*\*/g, '').trim();
    if (line.startsWith('## ')) {
      currentCharacter = line.replace(/^##\s*(?:\d+\.\s*)?/, '').trim();
      cleanCastData += `\n- Character [${currentCharacter}]: `;
      isParsingOutfit = false;
    }
    if (!currentCharacter) continue;
    
    const isCategoryHeader = line.includes('**基本') || line.includes('**髪') || line.includes('**顔') || line.includes('**服装') || line.includes('**性格');
    if (isCategoryHeader) {
      isParsingOutfit = line.includes('服装') || line.includes('Outfit');
    }

    if (activeOutfit && (isParsingOutfit || line.includes('服装') || line.includes('Outfit'))) continue;
    
    const weightsMatch = line.match(/\[WEIGHTS?\]:\s*(.*)/i);
    if (weightsMatch) {
      let tags = weightsMatch[1].replace(/\|/g, '').trim();
      if (tags && tags !== "()" && tags !== "-") {
        cleanCastData += tags + ", ";
      }
      continue;
    }
    const weightedTags = line.match(/\([a-zA-Z\s_-]+:\d+\.?\d*\)/g);
    if (weightedTags && weightedTags.length >= 2) {
      cleanCastData += weightedTags.join(', ') + ", ";
    }
  }
  if (!cleanCastData.trim()) {
    cleanCastData = castList.trim(); // fallback
  }
  return cleanCastData.trim();
};
