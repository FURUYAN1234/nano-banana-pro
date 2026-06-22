# HANDOFF.md

## Current Status
- **Version**: v4.7.5
- **Latest changes**:
  - Added a shared final self-audit block to both ChatGPT and Gemini 4-koma prompt templates.
  - The copied/internal final prompt now requires all four panels to be checked for Action, camera/composition, placement, cast limit, outfit, background, and Dialogue consistency.
  - The audit requires every listed Speech Bubble to appear in the same panel exactly once, with the tail pointing to the correct speaker.
  - The audit also rejects extra random text, captions, SFX, gutter text, missing/extra/cloned characters, wrong outfits, wrong glasses state, merged panels, dirty gutters, and character-sheet layouts.
- **State**: v4.7.5 prompt upgrade released and deployed. Do not run PS1 full backup unless newly requested.

## Pending Verification Tasks
- [x] Local checks and build
- [x] GitHub Pages deploy verification
- [x] GitHub Release creation (v4.7.5)
- [x] Hugging Face Spaces deploy verification

## Next Steps
- No pending release task. Existing untracked `scratch/` remains verification-only. Do not run PS1 full backup unless newly requested.
