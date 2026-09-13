# Documentary Ending Modes Implementation Plan

> **Execution:** Use superpowers:executing-plans for normal task-by-task implementation. Use superpowers:subagent-driven-development only when the user or applicable project instructions explicitly request per-task delegation and the tasks are genuinely independent. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add serious and gag documentary endings with shared source fidelity and an all-panel reference-sheet art-style lock for serious mode.

**Architecture:** Add one ending-mode policy module, then consume it from the STEP2 selector, scenario prompt, image prompt assembly, and bounded prompt review. Preserve `Documentary` for saved-data compatibility and add `SeriousDocumentary`.

**Tech Stack:** React 19, JavaScript ES modules, Vite SSR loading, Node test runner.

## Global Constraints

- Production code stays generic; no sample names, dialogue, article text, or fixed cast size.
- API and Web-copy routes share the same final prompt.
- No version bump, commit, deploy, note edit, or backup. Run the one user-requested real API verification only after implementation and local/browser gates pass.

---

### Task 1: Policy and selector

**Files:** Create `src/lib/ending-mode-policy.js`; modify `src/lib/constants.js`, `src/components/Step2Panel.jsx`; test `tests/documentary-ending-modes.test.mjs`.

**Interfaces:** Produce `getEndingModePolicy(type)`, `isDocumentaryEnding(type)`, `DOCUMENTARY_ENDING_OPTIONS`.

- [x] Write assertions for serious/gag policies and selector order.
- [x] Run `node --test tests/documentary-ending-modes.test.mjs`; expect RED.
- [x] Implement the policy and render the options from it.
- [x] Rerun the focused test; expect GREEN.

### Task 2: Scenario contracts

**Files:** Modify `src/lib/prompts.js`; test `tests/documentary-ending-modes.test.mjs`.

**Interfaces:** Consume `getEndingModePolicy(punchlineType)` and produce mode-specific scenario directions.

- [x] Assert serious source fidelity, serious-only ending, fixed reference style, and absence of comedy/style-switch instructions.
- [x] Assert gag-documentary source fidelity and fourth-panel-only gag behavior.
- [x] Replace the serious path's comedy sections and output requirements with a serious documentary block; keep all other modes unchanged.
- [x] Run the focused test; expect GREEN.

### Task 3: Final image style lock

**Files:** Modify `src/lib/panel-utils.js`, `src/lib/prompt-assembler.js`, `src/lib/prompts.js`; test `tests/documentary-ending-modes.test.mjs`.

**Interfaces:** Add `buildEmotionBlock(panelText, colorMode, { preserveReferenceStyle })` and pass the policy to both provider builders.

- [x] Assert both providers emit `REFERENCE-SHEET ART-STYLE LOCK` without `PANEL STYLE LOCK`, proportion overrides, or gag overlays.
- [x] Assert monochrome changes only the color medium while retaining reference drawing style.
- [x] Implement the all-panel lock and suppress style-difference QA for serious mode.
- [x] Run the focused test; expect GREEN.

### Task 4: Review, sanitizer, docs, and gates

**Files:** Modify `src/lib/comedy-review.js`, `src/hooks/useMangaWorkflow.js`, `README.md`; test `tests/documentary-ending-modes.test.mjs`.

**Interfaces:** Pass `reviewTone: 'serious' | 'gag'`; keep the existing eligible-line patch validator unchanged.

- [x] Assert serious review wording and both documentary values use shared routing.
- [x] Generalize review copy and mode-aware progress text without widening patch authority.
- [x] Document both options and the monochrome interaction.
- [x] Run focused/related tests, `node --test tests/*.test.mjs`, `npm.cmd run lint -- --max-warnings=0`, `npm.cmd run build`, and `git diff --check`.

### Task 5: FourPanel v5.9.9 distribution and generic standard-H3 prompt

**Files:** Modify `src/components/Step4Panel.jsx`, `src/lib/minimax-h3-prompt.js`, `public/workflows`, `.gitattributes`, `public/.gitattributes`, `README.md`; stage the supplied ZIP under ignored `.release-assets`; test `tests/comfyui-workflow-download.test.mjs`.

- [x] Inspect ZIP contents, metadata, hashes, secret-shaped patterns, and bundled `verify_package.py` result.
- [x] Add RED assertions for exact JSON/ZIP hashes, three bundled nodes, separate dependencies, generic clipboard rules, and standard-workflow limitations.
- [x] Preserve and connect the exact v5.9.9 workflow/ZIP bytes to the existing separate download buttons.
- [x] Rebuild the clipboard prompt generically and align its Ref2VA structure with the official MiniMax H3 Skill.
- [x] Explain which packaged-workflow capabilities the standard graph cannot automate.
- [x] Run the two focused suites; expect GREEN.

### Task 6: Browser and real API verification

- [ ] Verify the STEP2 option order, STEP4 generic copy button, copied text, standard-workflow limitation copy, and local workflow JSON download in the in-app browser.
- [ ] Use value-safe current app readiness; run one real API verification through the requested in-app surface without reading or exposing the API key.
- [ ] Inspect the resulting scenario/final prompt/image and report satisfied, unmet, and unverified outcomes separately.
