import React from 'react';
import { MANGA_SKILL_DOWNLOAD } from '../lib/mcp/distribution.js';
export default function MangaSkillDownloadLink() {
  return <a href={MANGA_SKILL_DOWNLOAD} className="manga-skill-download-link" title="AIから複数ページを作る方へ。単ページ制作には不要です。">
    複数ページ用スキルを取得
  </a>;
}
