---
description: Auto-Increment Version and Deploy (Turbo Mode)
---

// turbo-all

1. Run `Remove-Item .git-status.txt, diff.txt, eslint_out.txt, git_log_temp.txt, git_status.txt, git-status.txt -Force -ErrorAction SilentlyContinue` in `c:/Users/sx717/Antigravity/nano-banana-pro`
2. Run `node scripts/update_version.js` in `c:/Users/sx717/Antigravity/nano-banana-pro`
3. Run `git add .` in `c:/Users/sx717/Antigravity/nano-banana-pro`
4. Run `git commit -m "Bump version and Deploy"` in `c:/Users/sx717/Antigravity/nano-banana-pro`
5. Run `git push origin main` in `c:/Users/sx717/Antigravity/nano-banana-pro`
6. Run `git tag v$(node -p "require('./package.json').version")` in `c:/Users/sx717/Antigravity/nano-banana-pro`
7. Run `git push origin --tags` in `c:/Users/sx717/Antigravity/nano-banana-pro`
8. Run `npm run deploy` in `c:/Users/sx717/Antigravity/nano-banana-pro`
9. Run `git log -n 1 origin/gh-pages` in `c:/Users/sx717/Antigravity/nano-banana-pro` to verify.
10. Run `gh release create v$(node -p "require('./package.json').version") --title "v$(node -p "require('./package.json').version")" -F release_body.md` in `c:/Users/sx717/Antigravity/nano-banana-pro`
