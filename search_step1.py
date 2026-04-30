import io

with open('git_history_app.txt', 'r', encoding='utf-16le', errors='ignore') as f:
    lines = f.readlines()

out = []
commit_date = ""
for l in lines:
    if l.startswith('Date:'):
        commit_date = l.strip()
    if 'STEP1' in l and ('戻る' in l or 'やり直す' in l or 'button' in l):
        out.append(f"{commit_date}: {l.strip()}")

with open('step1_history.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
