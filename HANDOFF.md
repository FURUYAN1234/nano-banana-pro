# HANDOFF.md

## Current Status
- **Version**: v4.7.9
- **Latest changes**:
  - Generic dialogue extraction fix: Action-side visual quotes, signage/prop text, SFX, mood words, and narration no longer become speech-bubble Dialogue.
  - Short same-line speaker labels are accepted generically, so third-party speakers such as staff, passersby, or mobs can keep their intended speech bubble without scenario-specific hardcoding.
  - Cast-limit contradiction fix: if the only speech speaker is outside the reference cast but Action uses broad group cues such as `全員`, `みんな`, `一同`, `everyone`, or `all characters`, main/reference characters are not incorrectly emitted as `Do NOT draw`.
  - Prompt text policy update: small context-appropriate prop/background text is allowed as decoration, but unrelated/dominant text must not replace or upstage dialogue, titles, watermarks, punchlines, or explicitly requested scene text.
  - Verified on the user's failing `Gemini不満とAI移行` scenario shape before release prep: Panel 4 Dialogue stays `(Speech Bubble 1 [モブおじさん]: "全部、推進派が悪いんだよな。")`, the visual flag text stays in Action, and the broad group cast rule replaces contradictory no-show constraints.
- **State**: v4.7.9 release flow in progress: local prompt hardening is verified; deploy/release/backup verification is pending.

## Pending Verification Tasks
- [x] Local prompt assembly proof for the failing scenario shape.
- [x] Local checks and build before release prep (`node --check`, `git diff --check`, `npm run lint -- --max-warnings=0`, `npm run build`, `node scripts\pre_deploy_check.js`).
- [ ] GitHub Pages deploy verification.
- [ ] Hugging Face Spaces deploy verification.
- [ ] GitHub Release creation (v4.7.9).
- [ ] Full PS1 backup verification.

## Next Steps
- Finish v4.7.9 commit, tag, GitHub Pages deploy, Hugging Face Spaces deploy, GitHub Release, live checks, then run and verify the visible PS1 full backup.
