# HANDOFF.md

## Current Status
- **Version**: v4.7.4
- **Latest changes**:
  - Added generic cast-heading parsing so non-character note/metadata sections are not treated as characters.
  - Normalized provisional heading labels such as "temporary name" prefixes out of generated cast names.
  - Preserved person-like compound speaker labels by mapping them back to the matching cast entry through generic descriptor tokens.
  - Excluded panel headers from dialogue extraction so `[1コマ目: 起]` cannot become a speech bubble.
- **State**: v4.7.4 local fix in progress. User explicitly stopped PS1 full backup; do not run backup unless newly requested.

## Pending Verification Tasks
- [ ] Local checks and build
- [ ] GitHub Pages deploy verification if user approves redeploy
- [ ] GitHub Release creation (v4.7.4) if redeployed
- [ ] Hugging Face Spaces deploy verification if redeployed

## Next Steps
- Finish local checks. If redeploying, commit, deploy GitHub Pages and HF Spaces, create/push tag, create GitHub Release, and update `PLAN.md`. Do not run PS1 full backup.
