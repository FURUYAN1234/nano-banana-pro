import subprocess
import re

log_output = subprocess.check_output(['git', 'log', '-30', '-p', 'src/App.jsx']).decode('utf-8', errors='ignore')
commits = log_output.split('\ncommit ')

with open('ui_history_output.txt', 'w', encoding='utf-8') as f:
    for i, c in enumerate(commits):
        lines = c.split('\n')
        date_line = next((l for l in lines if l.startswith('Date:')), '')
        f.write(f"\n--- Commit {i}: {date_line}\n")
        for l in lines:
            if '<button' in l or 'API認証' in l or 'Zap' in l or 'isFullAutoMode' in l or '自動生成' in l or 'フルオート' in l or '初期化' in l or 'STEP' in l:
                if l.startswith('+') or l.startswith('-'):
                    f.write(l.strip() + '\n')
