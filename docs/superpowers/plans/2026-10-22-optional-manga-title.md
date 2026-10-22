# Optional manga title implementation plan

**Goal:** Default-ON title checkbox; OFF removes the printed title and its reserved band while retaining A4 portrait, outer margins, gutters, story text and title metadata.

**Architecture:** Extend the existing render-options contract and workflow preference. Compile the same selection into ordinary/provider and native-page prompts, review/repair, normalization, copy/export and stale-context checks. Keep ON and legacy prompts compatible.

**Boundary:** User subsequently authorized v7.1.7 deployment, actual note/Facebook publication, X draft only, then standalone full backup. Preserve the API result tab; no additional paid generation. Use official release and backup launchers unchanged.

- [x] Add and observe failing `tests/title-visibility.test.mjs` cases for default/legacy ON, OFF contracts and both providers/colors, native 5/8 panels, QA, A4 layout, stale settings and checkbox behavior.
- [x] Extend `src/lib/render-options.js`, `prompts.js`, `prompt-assembler.js`, `experimental-manga.js`, `image-quality-qa.js` and `manga-page-layout.js`; no discarded title space, no title restoration by repair. Preserve dialogue and in-scene text that happen to mention the title.
- [x] Wire `showTitle` through `useMangaWorkflow.js`, `App.jsx`, STEP3 and STEP4; default/reset ON, lock while busy, invalidate STEP3 only, retain history/scenario and per-mode contexts.
- [x] Update README in English/Japanese, run focused new/existing suites and lint/build, inspect real narrow in-app browser checkbox and keyboard interaction.
- [x] Check API readiness without values, run normal UI with title OFF and inspect the saved A4 image, frames, margins and reclaimed top space. Retain any unrelated generation warnings. Record evidence and outstanding limits here/HANDOFF.
- [x] Save the user's future per-implementation model-recommendation preference in an authorized memory extension note.

**Verification:** `node --test tests/title-visibility.test.mjs`, then related render-options/title/page-layout/native/workflow tests; `npm.cmd run lint -- --max-warnings=0`, `npm.cmd run build`. Before completion, match acceptance to actual source/test/UI/API artifacts. Paid retries require current authorization; an uncertain or minor visual variation alone is not a retry reason.


Local evidence: 14 focused title checks, 516 related checks, zero-warning lint and current build/security passed. One normal OpenAI UI run used GPT-6 Luna and GPT Image 2.5 Sunburst/max, generated and automatically saved title-free 2240×3168 A4 with five panels, outer frames/margins and credits retained. The title stays in metadata. No Gemini live image run or blanket artistic-quality claim. Evidence: output/title-option-20261022.
