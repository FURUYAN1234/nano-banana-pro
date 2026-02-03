---
description: Auto-Increment Version and Deploy (Turbo Mode)
---

// turbo-all

1. Run `node scripts/update_version.js` in `c:/Users/sx717/Antigravity/nano-banana-pro`
2. Run `git add .` in `c:/Users/sx717/Antigravity/nano-banana-pro`
3. Run `git commit -m "Bump version and Deploy"` in `c:/Users/sx717/Antigravity/nano-banana-pro`
4. Run `git push origin main` in `c:/Users/sx717/Antigravity/nano-banana-pro`
5. Run `npm run deploy` in `c:/Users/sx717/Antigravity/nano-banana-pro`
6. Run `git log -n 1 origin/gh-pages` in `c:/Users/sx717/Antigravity/nano-banana-pro` to verify.
7. Run `node scripts/generate_release_text.js` in `c:/Users/sx717/Antigravity/nano-banana-pro`
