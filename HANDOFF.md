# HANDOFF.md

## Current Status
- **Version**: v4.7.5
- **Latest changes**:
  - Added a shared final self-audit block to both ChatGPT and Gemini 4-koma prompt templates.
  - The copied/internal final prompt now requires all four panels to be checked for Action, camera/composition, placement, cast limit, outfit, background, and Dialogue consistency.
  - The audit requires every listed Speech Bubble to appear in the same panel exactly once, with the tail pointing to the correct speaker.
  - The audit also rejects extra random text, captions, SFX, gutter text, missing/extra/cloned characters, wrong outfits, wrong glasses state, merged panels, dirty gutters, and character-sheet layouts.
- **State**: v4.7.5 prompt upgrade verified locally; deploy/release follow-through in progress. Do not run PS1 full backup unless newly requested.

## Pending Verification Tasks
- [x] Local checks and build
- [ ] GitHub Pages deploy verification
- [ ] GitHub Release creation (v4.7.5)
- [ ] Hugging Face Spaces deploy verification

## Next Steps
- Commit, deploy GitHub Pages and HF Spaces, create/push tag, create GitHub Release, update `PLAN.md`, and do not run PS1 full backup.
