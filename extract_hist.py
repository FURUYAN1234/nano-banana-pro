import re
import io

with open('git_history_app.txt', 'r', encoding='utf-16le') as f:
    content = f.read()

commits = content.split('\ncommit ')
out = []
for c in commits:
    # Just grab all instances of isFullAutoMode, API, Zap, etc.
    if 'isFullAutoMode' in c or 'API認証' in c or 'Zap size' in c or 'フルオート' in c or '全自動' in c:
        m = re.search(r'^Date:\s+(.*)$', c, re.M)
        date = m.group(1) if m else '?'
        out.append(f'--- Commit: {c[:40].replace(chr(10), " ")} Date: {date}')
        lines = c.split('\n')
        for l in lines:
            if l.startswith('+') or l.startswith('-'):
                if 'API認証' in l or 'isFullAutoMode' in l or 'フルオート' in l or 'Zap size' in l or '全自動' in l or '生成' in l:
                    out.append(l[:150])

with open('history_summary.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
