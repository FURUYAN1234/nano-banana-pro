import {loadDefaultJapaneseParser} from 'budoux';

const parser=loadDefaultJapaneseParser();
const graphemes=text=>[...new Intl.Segmenter('ja',{granularity:'grapheme'}).segment(text)].map(x=>x.segment);
const prohibitedStart=/^[、。！？!?）」』】〕〉》ーぁぃぅぇぉっゃゅょァィゥェォッャュョ]/u;
const prohibitedEnd=/[「『（【〔〈《]$/u;
const suffix=/^(?:[\p{Script=Hiragana}]|から|まで|より|でも|ごと|って|たい|です|ます|ない|なかった|られる|れる|せる|させる|だって|んで)$/u;

// Partition complete Japanese phrases, never arbitrary equal glyph counts.
// BudouX runs locally; no text is sent to an additional API.
export function japaneseColumnLayouts(text,{maxColumns=12}={}) {
  if(typeof text!=='string'||/[\r\n]/u.test(text)||!/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(text))return [];
  const glyphs=graphemes(text);if(!glyphs.length||glyphs.length>120)return [];
  const boundaries=new Set([0]);let utf16=0;
  for(const glyph of glyphs){utf16+=glyph.length;boundaries.add(utf16);}
  const preferred=new Set();let phraseEnd=0;
  for(const phrase of parser.parse(text)){phraseEnd+=phrase.length;preferred.add(phraseEnd);}
  const phrases=[];let offset=0;
  for(const {segment:piece} of new Intl.Segmenter('ja',{granularity:'word'}).segment(text)){
    if(phrases.length&&(!boundaries.has(offset)||prohibitedStart.test(piece)||prohibitedEnd.test(phrases.at(-1))||suffix.test(piece)))phrases[phrases.length-1]+=piece;
    else phrases.push(piece);
    offset+=piece.length;
  }
  if(phrases.join('')!==text)return [];
  const lengths=phrases.map(x=>graphemes(x).length),prefix=[0],ends=[0];
  for(const length of lengths)prefix.push(prefix.at(-1)+length);
  for(const phrase of phrases)ends.push(ends.at(-1)+phrase.length);
  const layouts=[];
  for(let count=1;count<=Math.min(maxColumns,phrases.length);count++){
    const dp=Array.from({length:count+1},()=>Array(phrases.length+1).fill(null));dp[0][0]={cost:0,columns:[]};
    for(let used=1;used<=count;used++)for(let end=used;end<=phrases.length;end++)for(let start=used-1;start<end;start++){
      const prior=dp[used-1][start];if(!prior)continue;
      const column=phrases.slice(start,end).join(''),length=prefix[end]-prefix[start];
      const cost=prior.cost+(length-glyphs.length/count)**2+(end<phrases.length&&!preferred.has(ends[end])?1:0);
      if(!dp[used][end]||cost<dp[used][end].cost)dp[used][end]={cost,columns:[...prior.columns,column]};
    }
    const result=dp[count][phrases.length];if(result)layouts.push(result.columns);
  }
  return layouts;
}

export function verticalColumnPositions(columns,rect,fontSize){
  const pitch=fontSize*1.18,rowPitch=fontSize*1.05;
  const rows=Math.max(...columns.map(text=>graphemes(text).length));
  const top=rect.y+rect.height/2-(rows-1)*rowPitch/2;
  const right=rect.x+rect.width/2+(columns.length-1)*pitch/2;
  return columns.map((_,index)=>({x:right-index*pitch,top,rowPitch}));
}
