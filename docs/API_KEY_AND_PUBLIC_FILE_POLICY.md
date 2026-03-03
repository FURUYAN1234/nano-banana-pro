# API Key & Public Repository Security Policy

## 🚨 ABSOLUTE STRICT RULES (絶対厳守ルール) 🚨

This repository is **PUBLIC** and visible to the world. A single mistake can lead to massive security breaches, financial loss, and critical project failure.

**Any AI assistant or developer working on this project MUST strictly obey the following rules. There are NO exceptions.**

### 1. 🚫 NO API KEYS IN CODE (APIキーのハードコード絶対禁止)

* **NEVER** write API keys, tokens, or credentials (e.g., `AIzaSy...`, passwords, secrets) directly into ANY file (source code, test scripts, HTML, config files).
* **ALWAYS** use environment variables (e.g., `import.meta.env.VITE_API_KEY`, `process.env.API_KEY`).
* **NEVER** commit `.env`, `.env.local`, or any file containing actual secret values.
* **NEVER** create temporary test scripts (e.g., `test.js`, `check.mjs`) that contain hardcoded keys, even merely "for a quick test."

### 2. 🚫 NO SENSITIVE OR EXTRANEOUS FILES IN PUBLIC REPO (余計なファイルの公開絶対禁止)

Before committing or pushing ANY code, verify that you are NOT including:

* Local Git history dumps (e.g., `reflog.txt`, `log dumps`).
* Temporary workspace files or IDE configs (e.g., `.vscode/`, `.idea/`, `.DS_Store`).
* Generated media or large blob data that belongs in a database or cloud storage (e.g., `.mp4`, `.wav`, large `.json` dumps).
* Documents or instructions specifically intended for *other* private projects (e.g., cross-project contamination).
* Compiled backup files left in the root directory (e.g., `gh_index.js_backup`).
* Arbitrary test scripts (e.g., `test_nano_banana_2.mjs`).

### 3. ✅ VERIFICATION BEFORE PUSH (コミット前確認)

Always run `git status` and carefully review the list of staged files (`git diff --staged`) before executing a commit. If you see a file you did not explicitly intend to modify or add as part of the core project feature, **DO NOT COMMIT IT.**

*Failure to comply with these rules constitutes a critical violation of project operating procedures.*
