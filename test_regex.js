const text = `[1コマ目: 起]
[EMOTION: CHIBI_GAG]
[Camera: 俯瞰 — 工房の天井の梁から見下ろす極限の俯瞰。床に散らばった活字が銀河の星屑のように見え、アカリの頭頂部と巨大な木製印刷機が画面を圧迫する。]
アカリが印刷機に大きなパンを挟んでレバーを引こうとしている（リアクション: リン→隅っこで震えながら羊皮紙に手書き中）。
アカリ「これで一気に100枚のトーストが焼けるよっ！」
ヒカリ「それ、聖書を刷るための最新機械なんだけど……。」`;

const validCharacters = ['アカリ', 'ヒカリ', 'リン', 'サエコ', 'ミク'];

const extractActionOnly = (block) => {
  const actionLines = block.split('\n').filter(line => {
    const match = line.match(/^(.*?)(?:[:：]|「)/);
    let isDialogue = false;
    if (match && match[1].trim()) {
      let tempSpeaker = match[1].replace(/^(SFX|効果音|BGM|Action)/i, '').trim();
      tempSpeaker = tempSpeaker.replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
      const hasSentenceParticles = /[がをにでへはもとからまでより]/.test(tempSpeaker) && tempSpeaker.length > 5;
      const isTooLong = tempSpeaker.length > 12;
      const isMetaTag = /^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(tempSpeaker);
      
      if (hasSentenceParticles || isTooLong || isMetaTag) {
        // Not a dialogue speaker
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
  return actionStr;
};

console.log("Extracted Action:");
console.log(extractActionOnly(text));
