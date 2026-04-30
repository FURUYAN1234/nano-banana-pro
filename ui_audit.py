import subprocess
import re

log_output = subprocess.check_output(['git', 'log', '-40', '-p', 'src/App.jsx']).decode('utf-8', errors='ignore')
commits = log_output.split('\ncommit ')

with open('ui_audit.txt', 'w', encoding='utf-8') as f:
    for i, c in enumerate(commits):
        lines = c.split('\n')
        date_line = next((l for l in lines if l.startswith('Date:')), '')
        
        # We only care if it touches buttons, API, STEP1
        f.write(f"\n======================\nCommit {i}: {date_line}\n")
        
        in_button = False
        button_lines = []
        for l in lines:
            if '<button' in l:
                in_button = True
                button_lines = [l.strip()]
            elif in_button:
                button_lines.append(l.strip())
                if '</button>' in l:
                    in_button = False
                    btn_text = ' '.join(button_lines)
                    if 'onClick' in btn_text and ('reset' in btn_text.lower() or 'STEP1' in btn_text or 'オート' in btn_text or '自動' in btn_text):
                        f.write(f"BUTTON CHANGE: {btn_text}\n")
            
            if l.startswith('+') or l.startswith('-'):
                if 'API認証' in l or 'STEP1' in l or '初期化' in l:
                    f.write(f"DIFF: {l.strip()}\n")
