# HANDOFF.md

## Current Status
- **Version**: v4.8.0
- **Latest changes**:
  - Generic dialogue extraction follow-up: spoken quotes embedded in action narration are extracted alongside explicit dialogue, source order is preserved, and visual text/handwriting/SFX/mood labels stay out of speech-bubble Dialogue.
  - Generic title punctuation fix: the scenario title line is captured as a full line and terminal punctuation such as `!?` is preserved instead of being stripped by prompt assembly or Step 4 rebuild.
  - Highest-priority anti-hardcoding rule documented: root `AGENTS.md` and `docs/project_standards.md` now explicitly forbid production hardcoding of proper nouns, sample words, character names, sample dialogue, product/place names, trend words, and one-off prompt fragments when fixing bugs.
  - Regression tests added for embedded spoken quote extraction, visual quote exclusion, handwriting text exclusion, and title punctuation preservation.
  - Production source scan for the user's sample-specific terms returned no matches; sample terms appear only in regression test fixtures.
- **State**: v4.8.0 release flow in progress: local checks are being refreshed; deploy/release/live verification and final visible PS1 full backup are pending.

## Pending Verification Tasks
- [x] Local prompt assembly proof for the failing scenario shape.
- [x] Production source scan for sample-specific hardcoded terms.
- [x] Local checks and build before release prep (`node --test tests\panel-utils-dialogue.test.mjs tests\prompt-title.test.mjs`, `node --check`, `git diff --check`, `npm run lint -- --max-warnings=0`, `npm run build`).
- [ ] `node scripts\pre_deploy_check.js` after this HANDOFF update.
- [ ] GitHub Pages deploy verification.
- [ ] Hugging Face Spaces deploy verification.
- [ ] GitHub Release creation (v4.8.0).
- [ ] Full PS1 backup verification.

## Next Steps
- Finish v4.8.0 pre-deploy check, commit, push, tag, GitHub Pages deploy, Hugging Face Spaces deploy, GitHub Release, release ZIP/local folder sync, live checks, then run and verify the visible PS1 full backup.
