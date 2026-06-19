# HANDOFF.md

## Current Status
- **Version**: v4.7.2
- **Latest changes**:
  - Added an A4 PNG download path that keeps the original image intact and fits it into a white `1024x1448` canvas without cropping.
  - Kept the original download path available as `元画像をダウンロード`.
  - Strengthened the A4 repair prompt so the top title is explicitly redrawn and missing/cropped/moved/rewritten titles are treated as failures.
  - Improved quote classification so visual labels, signs, amount displays, and screen text stay out of speech bubbles while spoken quote forms remain Dialogue.
- **State**: v4.7.2 release/deploy in progress. Backup is not requested.

## Pending Verification Tasks
- [ ] GitHub Pages deploy verification
- [ ] GitHub Release creation (v4.7.2)

## Next Steps
- Finish local checks, commit, deploy GitHub Pages, create/push tag, create GitHub Release, and update `PLAN.md`.
