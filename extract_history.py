import subprocess
import re

log = subprocess.check_output(['git', 'log', '-p', '--date=short', 'src/App.jsx'], encoding='utf-8', errors='ignore')

commits = log.split('\ncommit ')
out = []

for c in commits:
    if not c.strip(): continue
    lines = c.split('\n')
    commit_hash = lines[0].split()[0] if not c.startswith('commit ') else lines[0].replace('commit ', '').split()[0]
    date = ""
    author = ""
    msg = ""
    
    for l in lines:
        if l.startswith('Date:'):
            date = l
        elif l.startswith('Author:'):
            author = l
        elif l.startswith('    '):
            if not msg: msg = l.strip()
    
    # We want to find changes related to:
    # 1. Full auto button ("onClick={handleFullAutoToggle}" or "isFullAutoMode" or "STEP2")
    # 2. Reset button ("onClick={resetAll}" or "onClick={partialReset}" or "入力をリセット" or "やり直す" or "初期化")
    # 3. API Badge ("<Key" or "API認証済" or "API Key")
    
    relevant_additions = []
    relevant_removals = []
    
    for l in lines:
        if l.startswith('+') and not l.startswith('+++'):
            if re.search(r'(handleFullAutoToggle|isFullAutoMode|resetAll|partialReset|API認証|Key size=|フルオート|全自動|STEP2|初期化|やり直す|リセット|もう一度生成)', l):
                relevant_additions.append(l)
        elif l.startswith('-') and not l.startswith('---'):
            if re.search(r'(handleFullAutoToggle|isFullAutoMode|resetAll|partialReset|API認証|Key size=|フルオート|全自動|STEP2|初期化|やり直す|リセット|もう一度生成)', l):
                relevant_removals.append(l)
                
    if relevant_additions or relevant_removals:
        out.append(f"Commit: {commit_hash[:7]} | {date.strip()} | {msg}")
        if relevant_removals:
            out.append("  REMOVED:")
            for r in relevant_removals:
                out.append("    " + r.strip())
        if relevant_additions:
            out.append("  ADDED:")
            for a in relevant_additions:
                out.append("    " + a.strip())
        out.append("-" * 40)

with open('history_report.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
print("Done writing to history_report.txt")
