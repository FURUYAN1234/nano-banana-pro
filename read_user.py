import json

path = r'C:\Users\sx717\.gemini\antigravity\brain\76a0e97c-d0b5-44c8-a0df-b4e624b93464\.system_generated\logs\overview.txt'
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if '"source":"USER"' in line:
            data = json.loads(line)
            content = data.get('content', '')
            print('USER:', content.replace('\n', ' ')[:500])
