import subprocess
import re

try:
    content = subprocess.check_output(['git', 'show', '38f8e21979a923f113b026809bc4630e757298ed^:src/App.jsx']).decode('utf-8', errors='ignore')
except Exception as e:
    content = ""

buttons = re.findall(r'<button[^>]*>(.*?)</button>', content, re.DOTALL)
out = []
for b in buttons:
    # remove tags
    text = re.sub(r'<[^>]+>', '', b).strip()
    text = re.sub(r'\s+', ' ', text)
    if text:
        out.append(text)

with open('old_buttons.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out))
