# HANDOFF.md

## Current Status
- **Version**: v4.7.6
- **Latest changes**:
  - Added a shared final self-audit block to both ChatGPT and Gemini 4-koma prompt templates.
  - Fixed the Gemini final image prompt so speech-bubble text must be vertical Japanese tategaki, horizontal bubble text is rejected, and bubbles must be tall/narrow enough for vertical columns.
  - Excluded generated verification folders from ESLint so `scratch/` does not break local validation.
  - The copied/internal final prompt now requires all four panels to be checked for Action, camera/composition, placement, cast limit, outfit, background, and Dialogue consistency.
  - The audit requires every listed Speech Bubble to appear in the same panel exactly once, with the tail pointing to the correct speaker.
  - The audit also rejects extra random text, captions, SFX, gutter text, missing/extra/cloned characters, wrong outfits, wrong glasses state, merged panels, dirty gutters, and character-sheet layouts.
- **State**: v4.7.6 Gemini vertical speech-bubble prompt fix is in local verification/release follow-through. Do not run PS1 full backup unless newly requested.

## Pending Verification Tasks
- [x] Local checks and build
- [x] GitHub Pages deploy verification
- [ ] GitHub Release creation (v4.7.6)
- [ ] Hugging Face Spaces deploy verification

## Next Steps
- Finish v4.7.6 deploy/release verification. Do not run PS1 full backup unless newly requested.
