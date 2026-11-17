import React from 'react';
import { MANGA_SKILL_DOWNLOAD } from '../lib/mcp/distribution.js';
export default function MangaSkillDownloadLink() {
  return <a href={MANGA_SKILL_DOWNLOAD} className="manga-skill-download-link" title="1ページ〜長編のシナリオをAIと相談するためのスキルです。通常の手動制作には必須ではありません。">
    漫画シナリオ制作スキルを取得
  </a>;
}
