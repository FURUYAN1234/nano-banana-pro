# Single-Image Quality Synchronization Implementation Plan

> **Execution:** Run the focused tasks sequentially in this workspace. Each behavior change follows a RED-GREEN test cycle. No commit, push, deploy, release, or backup is authorized.

**Goal:** Make the ChatGPT Web single-image copy prompt consume the same generic image-quality contract as both provider-specific four-panel prompts.

**Architecture:** Put the cross-format quality requirements in one focused module. The existing four-panel builders and the single-image prompt builder will import that module, so generic quality upgrades have one source of truth. A regression test will require every output path to expose the shared contract.

**Tech Stack:** React 19, Vite SSR test loader, Node test runner.

## Global Constraints

- Preserve format-specific requirements: four-panel dialogue/layout stays out of the single-image prompt.
- Carry only quality rules that are safe and meaningful for both formats.
- Keep the existing copy button and API workflow unchanged.
- Do not publish this local change.

---

### Task 1: Shared quality contract and single-image prompt builder

**Files:**
- Create: `src/lib/shared-image-quality.js`
- Create: `src/lib/single-image-prompt.js`
- Test: `tests/single-image-prompt-sync.test.mjs`

- [x] Write a failing test that imports both builders and asserts the rich-setting, lighting coherence, anatomy, clothing-fold, and anti-invented-cast requirements occur in every output.
- [x] Run the test and confirm it fails because the shared modules do not exist.
- [x] Create the shared contract and make the single-image builder append it to the existing emotional-cinema instructions.
- [x] Run the focused test and confirm it passes.

### Task 2: Wire all prompt outputs to the shared contract

**Files:**
- Modify: `src/lib/prompts.js`
- Modify: `src/components/ControlBar.jsx`
- Test: `tests/single-image-prompt-sync.test.mjs`

- [x] Extend the failing test so ChatGPT and Gemini four-panel outputs, plus the copied one-image output, contain the same shared contract marker.
- [x] Run the test and confirm it fails before the wiring change.
- [x] Import the shared contract into both four-panel prompt templates and replace the ControlBar inline copy template with the single-image builder.
- [x] Run the focused test and confirm it passes.

### Task 3: Verify the local implementation

**Files:**
- Verify: `tests/single-image-prompt-sync.test.mjs`
- Verify: existing prompt contract tests
- Modify: `docs/project_standards.md`

- [x] Run the full Node test suite, ESLint, production build, and `git diff --check`.
- [x] Make the project-standard completion gate require both a real four-panel API image and a real one-image copy-prompt generation whenever generic image quality changes.
- [ ] Perform both real image-generation checks with current user-configured credentials before reporting this task complete.
- [ ] Review the output paths and report each acceptance item as satisfied, unmet, or unverified.
