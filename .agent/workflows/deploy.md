---
description: Auto-Increment Version and Deploy (Turbo Mode)
---

// turbo-all

1. Run `node scripts/update_version.js` in `c:/Users/sx717/Antigravity/nano-banana-pro`
2. Run `git add .` in `c:/Users/sx717/Antigravity/nano-banana-pro`
3. Run `git commit -m "Bump version and Deploy"` in `c:/Users/sx717/Antigravity/nano-banana-pro`
4. Run `git push origin main` in `c:/Users/sx717/Antigravity/nano-banana-pro`
5. Run `git tag v$(node -p "require('./package.json').version")-alpha` in `c:/Users/sx717/Antigravity/nano-banana-pro`
6. Run `git push origin --tags` in `c:/Users/sx717/Antigravity/nano-banana-pro`
7. Run `npm run deploy` in `c:/Users/sx717/Antigravity/nano-banana-pro`
8. Run `git log -n 1 origin/gh-pages` in `c:/Users/sx717/Antigravity/nano-banana-pro` to verify.
9. Run `node scripts/generate_release_text.js` in `c:/Users/sx717/Antigravity/nano-banana-pro`
