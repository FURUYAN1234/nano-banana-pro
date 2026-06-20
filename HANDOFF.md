# HANDOFF.md

## Current Status
- **Version**: v4.7.3
- **Latest changes**:
  - Added generic character-analysis rules so non-name/non-person OCR is not treated as a character name.
  - When character names are absent, STEP1 now asks the model to split visible people into separate role-based provisional character sections.
  - Preserved role speakers such as `男子` and `ギャル` through dialogue extraction, placement, and cast-limit rules.
  - Prevented role-label dialogue from being collapsed into a longer OCR title substring, which caused missing speech bubbles and solo/monologue constraints.
- **State**: v4.7.3 release/deploy plus PS1 full backup requested by the user; local implementation is complete and verification is in progress.

## Pending Verification Tasks
- [ ] Local checks and build
- [ ] GitHub Pages deploy verification
- [ ] GitHub Release creation (v4.7.3)
- [ ] Hugging Face Spaces deploy verification
- [ ] PS1 full backup and ZIP content verification

## Next Steps
- Finish local checks, commit, deploy GitHub Pages and HF Spaces, create/push tag, create GitHub Release, run PS1 full backup, verify ZIP contents, and update `PLAN.md`.
