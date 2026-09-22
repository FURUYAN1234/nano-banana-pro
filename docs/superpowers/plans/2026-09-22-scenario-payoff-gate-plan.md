# Scenario Payoff Gate Implementation Plan

> **Execution:** Use superpowers:executing-plans for normal task-by-task implementation. Use superpowers:subagent-driven-development only when the user or applicable project instructions explicitly request per-task delegation and the tasks are genuinely independent. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a mode-aware narrative payoff gate that repairs the complete four-panel scenario once only when the original ending lacks a seeded, visual payoff, and preserve exact A4 dimensions in the Web copy prompt.

**Architecture:** A focused `scenario-payoff-quality.js` owns review parsing, mode-aware acceptance, repair prompting, and bounded orchestration. `scenario-provider.js` supplies the existing AI route and validation callbacks. Existing page-format constants remain the single source for API and Web dimensions.

**Tech Stack:** React/Vite, JavaScript ES modules, Node test runner, existing `callAI` scenario route.

## Global Constraints

- Preserve all existing safety, documentary fidelity, wardrobe, visual-evidence, final-panel staging, and dialogue gates.
- Never add sample-specific production strings or a new dependency.
- Use at most one repair generation; accept it only after structural validation and a passing second review.
- Preserve the original candidate on reviewer/repair failure.
- Keep `public/diagrams/workflow-preview.png` out of the release candidate.

---

### Task 1: Payoff review contract

**Files:**
- Create: `src/lib/scenario-payoff-quality.js`
- Create: `tests/scenario-payoff-quality.test.mjs`

**Interfaces:**
- Produces: `buildScenarioPayoffReviewPrompt(options)`, `parseScenarioPayoffReview(text)`, `evaluateScenarioPayoffReview(review, options)`.

- [ ] **Step 1: Write failing tests** for a slogan-only gag, a seeded visual reversal, a serious consequence, invalid JSON, and a false-positive `pass: true` that conflicts with `slogan_only: true`.
- [ ] **Step 2: Run** `node --test --test-concurrency=1 tests/scenario-payoff-quality.test.mjs` and confirm missing exports fail.
- [ ] **Step 3: Implement** strict fenced/unfenced JSON parsing and mode-aware mechanical acceptance without sample-specific proper nouns.
- [ ] **Step 4: Rerun** the focused test and confirm all cases pass.

### Task 2: One-repair orchestration

**Files:**
- Modify: `src/lib/scenario-payoff-quality.js`
- Modify: `tests/scenario-payoff-quality.test.mjs`

**Interfaces:**
- Produces: `runScenarioPayoffGate({ scenario, punchlineType, requestReview, requestRepair, validateRepair, onProgress })` returning `{ scenario, status, review, warning }`.

- [ ] **Step 1: Write failing tests** proving pass-through on first review, exactly one repair on failure, repaired acceptance only after the second review, and original retention on repair/validation/review failure.
- [ ] **Step 2: Run the focused test** and confirm orchestration failures are caused by the missing function.
- [ ] **Step 3: Implement** the minimum bounded flow and full-four-panel repair prompt.
- [ ] **Step 4: Rerun** the focused test and confirm request counts and retained candidates.

### Task 3: STEP2 integration

**Files:**
- Modify: `src/lib/scenario-provider.js`
- Modify: `tests/scenario-retry-diagnostics.test.mjs`

**Interfaces:**
- Consumes: `runScenarioPayoffGate`.
- Produces: STEP2 progress messages for review, one repair, acceptance, or original retention.

- [ ] **Step 1: Add a failing source/integration regression** requiring the payoff gate after the existing safe candidate and requiring Web Search off for review/repair calls.
- [ ] **Step 2: Run the focused provider tests** and confirm RED.
- [ ] **Step 3: Wire the gate** to `callAI`, pass the current scenario model and cast context, validate repaired candidates with `validateScenarioForRetry`, and return repaired scenario/model only after approval.
- [ ] **Step 4: Run payoff/provider/final-panel focused suites** and confirm GREEN.

### Task 4: Exact Web A4 dimension retention

**Files:**
- Modify: `src/lib/prompts.js`
- Modify: `src/lib/prompt-assembler.js`
- Modify: existing A4 prompt regression tests.

**Interfaces:**
- Consumes: `MANGA_MANUSCRIPT_STANDARD`, `MANGA_MANUSCRIPT_LARGE`, and selected output-size state.
- Produces: compact Web prompt text containing `70:99` and the selected exact pixel dimensions.

- [ ] **Step 1: Add a failing regression** reproducing the current compact output that keeps `A4 210:297` but drops exact pixels.
- [ ] **Step 2: Run the focused A4 tests** and confirm RED.
- [ ] **Step 3: Change the shared page envelope and compactor** so exact selected dimensions survive without claiming Web-provider enforcement.
- [ ] **Step 4: Rerun focused prompt and length-budget tests** and confirm GREEN.

### Task 5: Version, documentation, and delivery gates

**Files:**
- Modify: `package.json`, `package-lock.json`, `src/App.jsx`, `index.html`, `README.md`, `HANDOFF.md`, `docs/scenario_spec.md`
- Create: `docs/releases/v6.4.8.md`

**Interfaces:**
- Produces: synchronized v6.4.8 candidate and bilingual release notes.

- [ ] **Step 1: Bump every required version surface to `6.4.8`** and document the mode-aware payoff gate, one-repair limit, fallback behavior, and Web/API ratio distinction.
- [ ] **Step 2: Run focused tests, full Node tests, zero-warning lint, production build, `git diff --check`, security checks, and official preflight.**
- [ ] **Step 3: Run the exact live STEP2/API scenario in the in-app browser, inspect narrative payoff and image dimensions, and stop deployment if the result is not materially better.**
- [ ] **Step 4: If live evidence is good, commit and run the official release transaction for v6.4.8.**
- [ ] **Step 5: Update the authorized existing FourPanel note and verify the public readback.**
- [ ] **Step 6: Run the authorized official visible black-window full backup and require `FULL_BACKUP_VERIFIED apps=7`.**
