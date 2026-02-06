
import re
import os

target_file = r"c:/Users/sx717/Antigravity/nano-banana-pro/src/App.jsx"

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Remove spaces around hyphens where surrounded by alphanumerics or brackets (Tailwind classes)
# Matches: "p - 8", "flex - col", "min - h - [300px]", "slide -in", "border - white"
# Does NOT match: "// ---", "Wait - " (if space before is space)
# But wait, "p - 8": "p" is alphanum. " " is space. "-" is hyphen. " " is space. "8" is alphanum.
# Regex: (?<=[a-zA-Z0-9\[\]])\s+-\s+(?=[a-zA-Z0-9\[\]])
# Also handle cases like "slide -in" (space before hyphen, no space after?) No, usually it's " - ".
# Let's target " - " specifically first.

# Fix common patterns found in the file
# 1. " - " -> "-" between word/number chars
content = re.sub(r'(?<=[a-zA-Z0-9\[\]\%\.])\s+-\s+(?=[a-zA-Z0-9\[\]\%\.])', '-', content)

# 2. " / " -> "/" for opacity modifiers like "white / 10"
content = re.sub(r'(?<=[a-zA-Z0-9])\s+/\s+(?=[0-9])', '/', content)

# 3. Special fix for "-in" animations if they appear as " -in" or " - in"
# "animate -in fade -in" -> "animate-in fade-in"
content = re.sub(r'animate\s+-\s+in', 'animate-in', content)
content = re.sub(r'fade\s+-\s+in', 'fade-in', content)
content = re.sub(r'slide\s+-\s+in', 'slide-in', content)
content = re.sub(r'zoom\s+-\s+in', 'zoom-in', content)

# 4. Fix "slide -in -from - top - 2" mess
# This might need iterative fix or broader regex.
# The general regex #1 should handle "top - 2" -> "top-2" and "from - top" -> "from-top".
# But "side -in" might be split.

# Let's maintain the general regex #1 as primary.
# Also fix " :: " -> "::" usage in style block ".custom - scrollbar :: -webkit ..."
content = re.sub(r'\s+::\s+', '::', content)
# And "-webkit" might be " -webkit"
content = re.sub(r'\s+-webkit', '-webkit', content)

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Fixed syntax in {target_file}")
