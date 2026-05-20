import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

log_path = r"C:\Users\sx717\.gemini\antigravity\brain\e7d36f66-7531-4127-a893-e5dfca39a996\.system_generated\logs\transcript.jsonl"

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        step = data.get('step_index', 0)
        if 200 <= step <= 270:
            if "tool_calls" in data and data["tool_calls"]:
                for tc in data["tool_calls"]:
                    if "index.html" in str(tc.get("args", "")):
                        print(f"Step {step}: Tool: {tc['name']}")
                        print(f"Args: {json.dumps(tc['args'], ensure_ascii=False)}")
                        print("-" * 50)
