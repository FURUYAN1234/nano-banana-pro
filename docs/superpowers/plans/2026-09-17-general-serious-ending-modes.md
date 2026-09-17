# General Serious Ending Modes Implementation Plan

> **Execution:** Use superpowers:executing-plans for normal task-by-task implementation. Use superpowers:subagent-driven-development only when the user or applicable project instructions explicitly request per-task delegation and the tasks are genuinely independent. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Add general serious ending patterns and content-sensitive automatic routing without weakening existing gag, documentary, camera, acting, or image-quality behavior.

**Architecture:** Keep the existing single ending selector and make `ending-mode-policy.js` the canonical registry. A local serious-topic policy resolves `Auto` before the provider request, and scenario generation returns the actual resolved ending type; downstream enhancement, review, and image-prompt assembly consume that resolved type while the UI selection remains unchanged.

**Tech Stack:** React 19, Vite 7, JavaScript ES modules, Node built-in test runner.

## Global Constraints

- Reuse the existing provider call; do not add a separate paid classification request.
- Keep all existing gag and documentary values backward compatible.
- General serious modes allow the selected art style but forbid forced gag/chibi treatment.
- Run one user-authorized real API image only after local gates pass; do not inspect API-key values.
- Do not commit, push, deploy, publish, release, or back up in this task.

---

### Task 1: Canonical ending registry and grouped selector

**Files:**
- Modify: `src/lib/ending-mode-policy.js`
- Modify: `src/lib/constants.js`
- Modify: `src/components/Step2Panel.jsx`
- Create: `tests/general-serious-ending-modes.test.mjs`

**Interfaces:**
- Produces: `SERIOUS_ENDING_OPTIONS`, `GAG_ENDING_OPTIONS`, `isSeriousEnding(type)`, and policies whose `endingTone` is `auto`, `serious`, or `gag`.
- Consumes: existing `getEndingModePolicy(type)` and `DOCUMENTARY_ENDING_OPTIONS` callers.

- [x] **Step 1: Write the failing policy and UI tests**

```js
assert.equal(getEndingModePolicy('SeriousAuto').endingTone, 'serious');
assert.equal(getEndingModePolicy('QuietAftermath').documentary, false);
assert.deepEqual(SERIOUS_ENDING_OPTIONS.map(({ value }) => value), [
  'SeriousAuto', 'QuietAftermath', 'Resolve', 'Warning',
  'OpenQuestion', 'EmotionalClosure', 'TragicClosure'
]);
assert.match(step2Source, /<optgroup label="シリアス">/);
```

- [x] **Step 2: Run the focused test and confirm RED**

Run: `node --test tests/general-serious-ending-modes.test.mjs`

Expected: FAIL because the serious registry and grouped options do not exist.

- [x] **Step 3: Add the policies and grouped selector**

Define the seven general serious values in `ENDING_MODE_POLICIES`, export option arrays, map labels in `constants.js`, and render existing values in four `optgroup` sections without changing their saved values.

- [x] **Step 4: Run the focused test and confirm GREEN**

Run: `node --test tests/general-serious-ending-modes.test.mjs tests/step2-ending-menu-ui.test.mjs tests/documentary-ending-modes.test.mjs`

Expected: all tests pass.

### Task 2: Content-sensitive Auto and serious scenario structure

**Files:**
- Modify: `src/lib/prompts.js`
- Modify: `src/lib/scenario-provider.js`
- Modify: `src/lib/scenario-validation.js` or the existing scenario validation module that owns retry codes
- Test: `tests/general-serious-ending-modes.test.mjs`
- Test: `tests/manga-reading-rhythm.test.mjs`

**Interfaces:**
- Produces: a deterministic topic-treatment classification and `resolvedEndingType`.
- Consumes: `getEndingModePolicy(type)` and the existing `requestSafeScenario` retry loop.

- [x] **Step 1: Add failing prompt and resolver tests**

```js
assert.equal(classifyTopicTreatment('大規模災害で多数の犠牲者が出た').tone, 'serious');
assert.equal(resolveAutoEndingType('大規模災害で多数の犠牲者が出た'), 'SeriousAuto');
assert.doesNotMatch(buildScenarioRequest('QuietAftermath'), /ギャグ強度の方針/);
assert.match(buildScenarioRequest('QuietAftermath'), /静かな余韻/);
```

- [x] **Step 2: Run focused tests and confirm RED**

Run: `node --test tests/general-serious-ending-modes.test.mjs tests/manga-reading-rhythm.test.mjs`

Expected: FAIL because `Auto` is still randomized before the model and general serious prompts do not exist.

- [x] **Step 3: Make `Auto` neutral and add exclusive story blocks**

Resolve `Auto` before `getScenarioPrompt`, add the three-level treatment gate, add the six serious structures, and retain the existing gag block unchanged. `SeriousAuto` selects only from the six serious types.

- [x] **Step 4: Parse and validate the resolved ending**

Return the provider input's actual ending as `resolvedEndingType`. Use a narrow local classifier for explicit fatality, disaster, victimization, abuse, war, severe illness, loss, and mourning signals; do not add another paid classification request.

- [x] **Step 5: Run focused tests and confirm GREEN**

Run: `node --test tests/general-serious-ending-modes.test.mjs tests/manga-reading-rhythm.test.mjs tests/documentary-ending-modes.test.mjs`

Expected: all tests pass and existing gag/documentary assertions remain green.

### Task 3: Carry the resolved ending through enhancement and image prompting

**Files:**
- Modify: `src/hooks/useMangaWorkflow.js`
- Modify: `src/lib/scenario-enhancement.js`
- Modify: `src/lib/comedy-review.js`
- Modify: `src/lib/prompt-assembler.js`
- Modify: `src/components/GenerationPreview.jsx`
- Modify: `src/components/Step4Panel.jsx`
- Test: `tests/general-serious-ending-modes.test.mjs`
- Test: `tests/scenario-enhancement-ending-mode.test.mjs`
- Test: `tests/documentary-ending-modes.test.mjs`

**Interfaces:**
- Produces: `resolvedPunchlineType` state and `effectivePunchlineType = resolvedPunchlineType || punchlineType`.
- Consumes: `generateScenario(...).resolvedEndingType`.

- [x] **Step 1: Add failing downstream propagation tests**

```js
assert.match(workflowSource, /resolvedPunchlineType/);
assert.match(workflowSource, /resolvedPunchlineType \|\| punchlineType/);
assert.doesNotMatch(buildFinalPrompt({ punchlineType: 'QuietAftermath' }), /COMEDY INTENT|GAG INTENT OVERLAY|CHIBI_GAG/);
assert.match(buildReview({ reviewTone: 'serious' }), /serious tone/i);
```

- [x] **Step 2: Run the focused downstream tests and confirm RED**

Run: `node --test tests/general-serious-ending-modes.test.mjs tests/scenario-enhancement-ending-mode.test.mjs tests/documentary-ending-modes.test.mjs`

Expected: FAIL because downstream code still sees `Auto` as gag.

- [x] **Step 3: Store and invalidate the resolved type**

Add `resolvedPunchlineType` state, set it only from a successful scenario response, use it for enhancement/STEP3/STEP4, and clear it when the ending selector, input mode, or scenario-generation inputs are reset.

- [x] **Step 4: Generalize serious prompt handling**

Use `endingTone === 'serious'` for serious review and enhancement wording. Emit `SERIOUS INTENT` rather than `COMEDY INTENT` in general serious image prompts, suppress gag overlays/chibi transformations, and keep reference-style locks conditional on `preserveReferenceStyle`.

- [x] **Step 5: Run focused tests and confirm GREEN**

Run: `node --test tests/general-serious-ending-modes.test.mjs tests/scenario-enhancement-ending-mode.test.mjs tests/documentary-ending-modes.test.mjs tests/prompt-style-exceptions.test.mjs tests/manga-reading-rhythm.test.mjs`

Expected: all focused tests pass.

### Task 4: Complete local and live acceptance

**Files:**
- Modify if required by observed defects: files already listed above
- Record evidence: `HANDOFF.md`
- Store live artifact: `scratch/general-serious-ending-2026-09-17/`

**Interfaces:**
- Consumes: the completed local implementation and the API setting already entered by the user.
- Produces: local gate results and one visually reviewed API artifact.

- [x] **Step 1: Run the full local gates**

Run: `node --test tests/*.test.mjs`

Run: `npm.cmd run lint`

Run: `npm.cmd run build`

Run: `git diff --check`

Expected: all tests pass, lint has zero warnings/errors, build succeeds with only pre-existing warnings, and diff check is clean.

- [x] **Step 2: Verify the grouped selector in the in-app browser**

Confirm the four groups and all serious choices render, selecting a choice invalidates stale scenario output, and the browser console has no new errors.

- [x] **Step 3: Run one real API image**

Use a generic serious topic that exercises automatic serious routing, retain the current configured provider/model/quality/size and character references, keep automatic repair off to prevent an unapproved second charge, and save the request metadata and returned image under the scratch directory without recording the key.

- [x] **Step 4: Review the artifact on two independent axes**

Feature acceptance: resolved serious pattern, no gag/chibi leakage, coherent four-panel ending, preserved dialogue/cast/props.

Visual regression acceptance: camera and depth variation, acting/expression, background layers/light, focal separation, hands/faces, and legible intended text. Record each as `satisfied`, `unmet`, or `unverified` and do not claim the art is not dull without a baseline comparison.

- [x] **Step 5: Update the handoff record**

Record changed files, exact local commands/results, API artifact path/hash/settings, visual findings, and the external-delivery boundary. Do not add release/note/backup work.

## Completion Evidence

- Local gates: `node --test tests/*.test.mjs` passed 510/510; `npm.cmd run lint` passed; `npm.cmd run build` passed with the pre-existing Browserslist, mixed dynamic/static import, and chunk-size warnings; `git diff --check` passed.
- Browser/UI: the existing selector renders おまかせ, シリアス, ギャグ, and 資料忠実 groups. The connected OpenAI route classified the flood-loss topic as `serious-required`, retained the Auto selection, resolved the actual workflow type to `SeriousAuto`, and generated `Punchline: 決意・再出発`.
- STEP3 prompt: `SERIOUS INTENT` and both high/low-angle camera cues are present. `COMEDY INTENT`, `GAG INTENT OVERLAY`, `CHIBI_GAG`, `chibi too`, and `scripted surreal gags` are absent.
- Live API: one GPT Image 2.5 Sunburst/xhigh image at 1024x1536 completed with one character reference and automatic repair OFF. No repair image or second paid generation ran.
- Actual-pixel review: `satisfied` for serious/no-chibi treatment, overhead/OTS/low-angle/mild-overhead variation, restrained acting, room/window light layering, and foreground/midground/background separation. `unmet` for visibly rendering the requested page title and for a clear head-to-toe panel-3 full shot. `unverified` for fine printed-surface orientation and independent zoom/telephoto behavior, which this scenario did not request.
- Evidence integrity: the app's internal QA reported all camera axes and the title as OK, but the actual rendered pixels above control acceptance. The generated image remains visible in the in-app browser history; the in-app direct-download action did not expose a stable filesystem artifact path, so no image hash is claimed.
- Delivery boundary: local files only; no commit, push, deploy, release, note publication, or backup.
