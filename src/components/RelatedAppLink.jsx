import React from 'react';
import { ExternalLink } from 'lucide-react';

const RELATED_APPS = {
  character: {
    url: 'https://furuyan1234.github.io/character-sheet-maker/',
    name: 'キャラクターメーカー',
    description: '人物の見た目をシートにします。保存した画像をSTEP1へ読み込み、漫画の人物に使えます。',
  },
  story: {
    url: 'https://furuyan1234.github.io/story-maker/',
    name: 'Story Maker',
    description: '物語から漫画シナリオを作ります。台本をSTEP2「生成されたシナリオ」へ、STEP1用の人物設定があればSTEP1へ貼り付けます。',
  },
};

export default function RelatedAppLink({ app }) {
  const { url, name, description } = RELATED_APPS[app];
  return (
    <a className="related-app-link" href={url} target="_blank" rel="noopener noreferrer">
      <span className="related-app-link-name">
        {name}
        <span className="related-app-link-external">別タブ <ExternalLink size={13} aria-hidden="true" /></span>
      </span>
      <span className="related-app-link-description">{description}</span>
    </a>
  );
}
