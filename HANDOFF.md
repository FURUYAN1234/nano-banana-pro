# HANDOFF.md

## Current Status
- **Version**: v4.8.1 released; final backup pending
- **Latest changes**:
  - v4.8.1 release prep after v4.8.0: ChatGPT image prompts now stay in a web-paste-safe range by compacting repeated global/per-panel control text while preserving title, dialogue, watermarks, visual action detail, art-quality rules, cast limits, and identity/glasses locks. Dialogue labels now explicitly say `Dialogue (verbatim bubbles)` and the text rules forbid paraphrase, synonyms, softening, and added/omitted words.
  - Generic identity parser hardening: `- Character [Name]: ... glasses/no glasses ...` cast lines now feed the Identity Matrix, so glasses locks do not disappear when the cast list is already in cleaned Character-line form.
  - Generic dialogue extraction follow-up: spoken quotes embedded in action narration are extracted alongside explicit dialogue, source order is preserved, and visual text/handwriting/SFX/mood labels stay out of speech-bubble Dialogue.
  - Generic action-quote de-duplication follow-up: fallback extraction now skips unowned narration quotes and short action-quote fragments already covered by explicit dialogue, preventing extra speech bubbles such as partial setup phrases while preserving distinct spoken quotes with an inferred speaker.
  - Generic title punctuation fix: the scenario title line is captured as a full line and terminal punctuation such as `!?` is preserved instead of being stripped by prompt assembly or Step 4 rebuild.
  - Highest-priority anti-hardcoding rule documented: root `AGENTS.md` and `docs/project_standards.md` now explicitly forbid production hardcoding of proper nouns, sample words, character names, sample dialogue, product/place names, trend words, and one-off prompt fragments when fixing bugs.
  - Regression tests added for embedded spoken quote extraction, visual quote exclusion, handwriting text exclusion, title punctuation preservation, and ChatGPT prompt length/critical-content preservation.
  - Production source scan for the user's sample-specific terms returned no matches; sample terms appear only in regression test fixtures.
- **State**: v4.8.1 prompt budget/action-quote fix is committed, pushed, deployed, released, and synced locally. Main commit `ded6132700fce643e7a94901d3e91835d16f33e4` was pushed to `origin/main`; GitHub Pages `origin/gh-pages` is `72c4420dc7975b4cdbcc74b26f50bb173897561c`; Hugging Face Spaces repo is `95638249024962a1fa37b5e35b79f1fb71a5d85d`; GitHub Release is `https://github.com/FURUYAN1234/nano-banana-pro/releases/tag/v4.8.1`; the release ZIP was synced to `C:\nano-banana-pro-main`. Final visible PS1 full backup is still pending for v4.8.1.

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
- [ ] Full PS1 backup verification after all commits/pushes/deploys/docs are final.

## Next Steps
- Commit/push this final handoff update, then run and verify the visible black-window `scripts\backup_full.ps1` full backup.
