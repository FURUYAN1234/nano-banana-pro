const fs = require('fs');
let c = fs.readFileSync('docs/project_standards.md', 'utf8');
c = c.replace('## 6. リリース手順詳細', '- ❌ **本番デプロイ前の最終確認**: 本番環境（Production）へのデプロイやマージを行う直前だけは、現在の自動実行設定に関わらず、必ず私の最終確認を求めてください。\n\n## 6. リリース手順詳細');
fs.writeFileSync('docs/project_standards.md', c);
