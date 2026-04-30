import subprocess

log = subprocess.check_output(['git', 'log', '-p', '--date=short', 'src/App.jsx'], encoding='utf-8', errors='ignore')

out = []
current_commit = ""
for l in log.split('\n'):
    if l.startswith('commit '):
        current_commit = l
    elif 'API認証済' in l:
        out.append(current_commit)
        out.append(l)

with open('api_badge_history.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
