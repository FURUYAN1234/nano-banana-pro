# HANDOFF.md

## Current Status
- **Version**: v4.8.2 API preflight fix release prep
- **Latest changes**:
  - v4.8.1 release prep after v4.8.0: ChatGPT image prompts now stay in a web-paste-safe range by compacting repeated global/per-panel control text while preserving title, dialogue, watermarks, visual action detail, art-quality rules, cast limits, and identity/glasses locks. Dialogue labels now explicitly say `Dialogue (verbatim bubbles)` and the text rules forbid paraphrase, synonyms, softening, and added/omitted words.
  - Generic identity parser hardening: `- Character [Name]: ... glasses/no glasses ...` cast lines now feed the Identity Matrix, so glasses locks do not disappear when the cast list is already in cleaned Character-line form.
  - Generic dialogue extraction follow-up: spoken quotes embedded in action narration are extracted alongside explicit dialogue, source order is preserved, and visual text/handwriting/SFX/mood labels stay out of speech-bubble Dialogue.
  - Generic action-quote de-duplication follow-up: fallback extraction now skips unowned narration quotes and short action-quote fragments already covered by explicit dialogue, preventing extra speech bubbles such as partial setup phrases while preserving distinct spoken quotes with an inferred speaker.
  - Generic title punctuation fix: the scenario title line is captured as a full line and terminal punctuation such as `!?` is preserved instead of being stripped by prompt assembly or Step 4 rebuild.
  - Highest-priority anti-hardcoding rule documented: root `AGENTS.md` and `docs/project_standards.md` now explicitly forbid production hardcoding of proper nouns, sample words, character names, sample dialogue, product/place names, trend words, and one-off prompt fragments when fixing bugs.
  - Regression tests added for embedded spoken quote extraction, visual quote exclusion, handwriting text exclusion, title punctuation preservation, and ChatGPT prompt length/critical-content preservation.
  - Production source scan for the user's sample-specific terms returned no matches; sample terms appear only in regression test fixtures.
  - v4.8.2 API key preflight fix: entering an arbitrary string or a shortened/invalid OpenAI-style key no longer unlocks STEP 1. API entry now requires provider format validation plus a live provider preflight (`Gemini /v1beta/models` or `OpenAI /v1/models`) before setting the app's connected state. Failed provider errors are sanitized so API key fragments are not rendered in the UI. The modal now labels typed keys as unverified format guesses until preflight succeeds, saved Gemini keys are re-verified on startup, and the header/control bar/STEP1 receive an empty API-key prop while any API modal is open so stale state cannot look connected.
- **State**: v4.8.1 prompt budget/action-quote fix is released. v4.8.2 API preflight fix is locally implemented and verified, but not yet committed, pushed, deployed, released, locally synced, or backed up. The intermediate backup `antigravity_full_backup_2026-06-24_110219.zip` was created before the v4.8.2 API fix and must not be treated as final.

## Pending Verification Tasks
- [x] Local prompt assembly proof for the failing scenario shape.
- [x] Production source scan for sample-specific hardcoded terms.
- [x] Local checks and build before release prep (`node --test tests\panel-utils-dialogue.test.mjs tests\prompt-title.test.mjs`, `node --check`, `git diff --check`, `npm run lint -- --max-warnings=0`, `npm run build`).
- [x] Local prompt budget regression proof: the latest long ChatGPT sample now emits a 13,841-character prompt and keeps title/dialogue/watermarks/tategaki/glasses locks, `THINGS TO AVOID`, stronger verbatim dialogue locking, and explicit Panel 4 dialogue without promoting unowned action quotes.
- [x] Local checks after prompt budget/action-quote fix: `node --test tests\panel-utils-dialogue.test.mjs tests\prompt-title.test.mjs tests\prompt-budget.test.mjs`, `git diff --check -- . ':!dist'`, `npm run lint -- --max-warnings=0`, `npm run build`, and local HTTP 200 on `http://127.0.0.1:5173/`.
- [x] Final docs validation after this HANDOFF update: `node scripts\pre_deploy_check.js` passed.
- [x] `node scripts\pre_deploy_check.js` before release commit.
- [x] GitHub Pages deploy verification for v4.8.1: live URL returned title `Nano Banana Pro v4.8.1`, asset `assets/index-DLlziH4s.js`, and deployed JS contained `v4.8.1`, `THINGS TO AVOID`, and `Dialogue (verbatim bubbles)`.
- [x] Hugging Face Spaces deploy verification for v4.8.1: live URL returned title `Nano Banana Pro v4.8.1`, asset `assets/index-DLlziH4s.js`, and deployed JS contained `v4.8.1`, `THINGS TO AVOID`, and `Dialogue (verbatim bubbles)`.
- [x] GitHub Release creation (v4.8.1): `https://github.com/FURUYAN1234/nano-banana-pro/releases/tag/v4.8.1`.
- [x] Release ZIP download and `C:\nano-banana-pro-main` local sync: package version `4.8.1`, HTML title `Nano Banana Pro v4.8.1`, no nested duplicate folder.
- [x] v4.8.2 API preflight tests: invalid arbitrary text and shortened OpenAI-looking keys are rejected locally without network access; provider-shaped keys must pass live provider preflight; invalid provider responses are rejected without exposing API key fragments.
- [x] v4.8.2 UI lock regression tests: the API modal must not label unverified keys as a running engine, main UI receives an empty API-key prop while an API modal is open, and saved keys are preflight-verified before restoring connected state.
- [x] v4.8.2 local verification: `node --test tests\api-key-preflight.test.mjs tests\api-key-ui-lock.test.mjs tests\panel-utils-dialogue.test.mjs tests\prompt-title.test.mjs tests\prompt-budget.test.mjs`, `npm run lint -- --max-warnings=0`, `npm run build`, and `git diff --check -- . ':!dist'` passed.
- [x] v4.8.2 browser proof on `http://127.0.0.1:5173/?codexApiPreflightV482Browser=1`: entering a shortened OpenAI-looking dummy key shows `OpenAI形式（未検証）`, never shows `Engine で起動`, fails with the Japanese error `APIキーの形式が正しくありません。...`, keeps the header `未接続`, keeps `main` blurred and pointer-locked, and does not render the raw OpenAI provider error or the typed key fragment.
- [x] Production source scan for the user's sample-specific terms and API key patterns returned no matches.
- [x] `node scripts\pre_deploy_check.js` after this HANDOFF update.
- [ ] Commit/push v4.8.2 API preflight fix.
- [ ] GitHub Pages deploy verification for v4.8.2.
- [ ] Hugging Face Spaces deploy verification for v4.8.2.
- [ ] GitHub Release creation (v4.8.2).
- [ ] Release ZIP download and `C:\nano-banana-pro-main` local sync for v4.8.2.
- [ ] Final visible PS1 full backup verification after all v4.8.2 commits/pushes/deploys/docs are final.

## Next Steps
- Finish the v4.8.2 release flow: pre-deploy check, commit/push, GitHub Pages, Hugging Face, GitHub Release, local ZIP sync, then a fresh visible black-window `scripts\backup_full.ps1 -NoGui` backup.
