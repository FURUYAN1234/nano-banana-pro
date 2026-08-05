# STEP1 Reset Implementation Plan

> **Execution:** Use `superpowers:executing-plans` for normal task-by-task implementation. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a reset action that clears character analysis work while preserving the configured API connection.

**Architecture:** Keep reset ownership in `useMangaWorkflow`, alongside the existing STEP2 and full resets. Expose the new handler through `App.jsx` to `SystemHeader`, where it is placed between the existing actions.

**Tech Stack:** React 19, Vite, Node built-in test runner, ESLint.

## Global Constraints

- Preserve the API key, selected engine, and engine-mode flags.
- Clear STEP1 character-sheet images, extracted character settings, analysis log, style JSON, and copy state.
- Clear dependent STEP2-STEP4 outputs so no scenario or image can remain paired with removed characters.
- No commit, push, deployment, release, or backup is authorized.

---

### Task 1: Character-analysis reset workflow

**Files:**
- Modify: `src/hooks/useMangaWorkflow.js`
- Modify: `src/App.jsx`
- Modify: `src/components/SystemHeader.jsx`
- Test: `tests/step1-reset-ui.test.mjs`

**Interfaces:**
- Produces: `step1Reset()` from `useMangaWorkflow`.
- Consumes: `step1Reset` as a `SystemHeader` prop.

- [x] **Step 1: Write the failing test**

Assert that the header renders the three reset labels in order and that the workflow clears STEP1 and downstream state without API-key or engine setters.

- [x] **Step 2: Run test to verify it fails**

Run: `node --test tests/step1-reset-ui.test.mjs`

Expected: FAIL because `step1Reset` and the new button do not exist.

- [x] **Step 3: Write minimal implementation**

Add `step1Reset` in the workflow hook, forward it through `App.jsx`, and render its compact header button between STEP2 reset and full reset.

- [x] **Step 4: Run test to verify it passes**

Run: `node --test tests/step1-reset-ui.test.mjs`

Expected: PASS.

### Task 2: Regression and live API proof

**Files:**
- Test: `tests/step1-reset-ui.test.mjs`

- [x] **Step 1: Run automated regression checks**

Run: `node --test`, `npm.cmd run lint -- --max-warnings=0`, and `npm.cmd run build`.

- [x] **Step 2: Verify UI and live character-analysis API path**

Start the local Vite server. Use only a value-safe connected/disconnected check; never expose the key. With a connected UI, upload a character sheet, wait for a completed character-analysis result, invoke the new reset, and verify the STEP1 image and extracted text are empty while the engine remains connected.
