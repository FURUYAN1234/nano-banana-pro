# HANDOFF.md

## Current Status
- **Version**: v4.8.1 release prep
- **Latest changes**:
  - v4.8.1 release prep after v4.8.0: ChatGPT image prompts now stay in a web-paste-safe range by compacting repeated global/per-panel control text while preserving title, dialogue, watermarks, visual action detail, art-quality rules, cast limits, and identity/glasses locks. Dialogue labels now explicitly say `Dialogue (verbatim bubbles)` and the text rules forbid paraphrase, synonyms, softening, and added/omitted words.
  - Generic identity parser hardening: `- Character [Name]: ... glasses/no glasses ...` cast lines now feed the Identity Matrix, so glasses locks do not disappear when the cast list is already in cleaned Character-line form.
  - Generic dialogue extraction follow-up: spoken quotes embedded in action narration are extracted alongside explicit dialogue, source order is preserved, and visual text/handwriting/SFX/mood labels stay out of speech-bubble Dialogue.
  - Generic action-quote de-duplication follow-up: fallback extraction now skips unowned narration quotes and short action-quote fragments already covered by explicit dialogue, preventing extra speech bubbles such as partial setup phrases while preserving distinct spoken quotes with an inferred speaker.
  - Generic title punctuation fix: the scenario title line is captured as a full line and terminal punctuation such as `!?` is preserved instead of being stripped by prompt assembly or Step 4 rebuild.
  - Highest-priority anti-hardcoding rule documented: root `AGENTS.md` and `docs/project_standards.md` now explicitly forbid production hardcoding of proper nouns, sample words, character names, sample dialogue, product/place names, trend words, and one-off prompt fragments when fixing bugs.
  - Regression tests added for embedded spoken quote extraction, visual quote exclusion, handwriting text exclusion, title punctuation preservation, and ChatGPT prompt length/critical-content preservation.
  - Production source scan for the user's sample-specific terms returned no matches; sample terms appear only in regression test fixtures.
- **State**: v4.8.0 code release is already deployed and backed up. The v4.8.1 prompt budget/action-quote fix has been locally verified and is now in release prep; GitHub Pages, Hugging Face Spaces, GitHub Release, local ZIP sync, and final visible PS1 backup are still pending for v4.8.1.

## Pending Verification Tasks
- [x] Local prompt assembly proof for the failing scenario shape.
- [x] Production source scan for sample-specific hardcoded terms.
- [x] Local checks and build before release prep (`node --test tests\panel-utils-dialogue.test.mjs tests\prompt-title.test.mjs`, `node --check`, `git diff --check`, `npm run lint -- --max-warnings=0`, `npm run build`).
- [x] Local prompt budget regression proof: the latest long ChatGPT sample now emits a 13,841-character prompt and keeps title/dialogue/watermarks/tategaki/glasses locks, `THINGS TO AVOID`, stronger verbatim dialogue locking, and explicit Panel 4 dialogue without promoting unowned action quotes.
- [x] Local checks after prompt budget/action-quote fix: `node --test tests\panel-utils-dialogue.test.mjs tests\prompt-title.test.mjs tests\prompt-budget.test.mjs`, `git diff --check -- . ':!dist'`, `npm run lint -- --max-warnings=0`, `npm run build`, and local HTTP 200 on `http://127.0.0.1:5173/`.
- [ ] `node scripts\pre_deploy_check.js` after this HANDOFF update.
- [ ] GitHub Pages deploy verification for v4.8.1.
- [ ] Hugging Face Spaces deploy verification for v4.8.1.
- [ ] GitHub Release creation (v4.8.1).
- [ ] Release ZIP download and `C:\nano-banana-pro-main` local sync.
- [ ] Full PS1 backup verification after all commits/pushes/deploys/docs are final.

## Next Steps
- Continue the v4.8.1 normal GitHub Pages / Hugging Face / Release / local ZIP sync / final backup flow.
