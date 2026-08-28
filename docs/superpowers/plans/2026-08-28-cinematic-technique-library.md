# Cinematic Technique Library Implementation Plan

> **Execution:** Use superpowers:executing-plans for normal task-by-task implementation. Use superpowers:subagent-driven-development only when the user or applicable project instructions explicitly request per-task delegation and the tasks are genuinely independent. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fail-closed cinematic-technique library that conditionally enriches four-panel and single-image prompts without increasing final prompt length, then verify both paths with fresh real API images.

**Architecture:** A new pure `cinematic-techniques.js` module owns the immutable registry, deterministic eligibility scoring, page limits, and fixed-size prompt-slot formatting. Four-panel assembly keeps every existing panel camera intact and replaces one redundant generic cinematography line with a panel-mapped technique line only when that line fits and the completed candidate prompt is no longer than the baseline. The single-image copy prompt replaces its existing camera guidance with a shorter generic safety router because the future user instruction is not locally available at copy time.

**Tech Stack:** React 19, Vite 7, JavaScript ES modules, Node test runner, ESLint, local in-app browser, configured Gemini/OpenAI image APIs.

**Approved:** The user approved this plan for implementation on 2026-08-28.

## Global Constraints

- No version bump, commit, push, release, deploy, backup, package installation, or API-key persistence.
- Four-panel pages use no more than two enhanced panels, one technique per panel, with no repeated technique.
- Single-image prompts permit no more than one context-appropriate technique.
- Script, cast, dialogue, visible text, identity, anatomy, hands, props, eye-line, and explicit camera instructions always override an optional technique.
- Unknown, ambiguous, conflicting, ineligible, or over-budget enhancements return the exact baseline prompt.
- The complete technique catalog is never appended to generated image prompts.
- The existing ChatGPT Web-copy soft budget remains 15,000 characters.
- Real API completion requires one fresh four-panel image and one fresh single-image image using the exact copy-button prompt; credentials are handled only through the app UI and their values are never read.

---

### Task 1: Pure Cinematic-Technique Registry and Selector

**Files:**
- Create: `src/lib/cinematic-techniques.js`
- Create: `tests/cinematic-techniques.test.mjs`

**Interfaces:**
- Consumes: panel strings already extracted by `buildMangaPrompt` and optional page location text.
- Produces: `CINEMATIC_TECHNIQUES`, `selectPageCinematicTechniques(panels, context)`, `formatCinematicTechniqueSlot(assignments, maxLength)`, and `replaceCinematicSlotWithinBudget(baseline, slot, replacement)`.

- [ ] **Step 1: Write failing registry and selector tests**

```js
assert.deepEqual(
  selectPageCinematicTechniques([
    'Location: 古い駅舎\nAction: 開いた木製扉の奥で二人が話す。',
    'Action: 鏡に本人の表情が映る。',
    'Action: 普通の白い部屋で会話する。',
    'Camera: ドローン俯瞰\nAction: 街全体を見渡す。'
  ], { location: '古い駅舎' }).map(({ id, panelNumber }) => [id, panelNumber]),
  [['frame_within_frame', 1], ['atmospheric_perspective', 4]]
);
assert.equal(selectPageCinematicTechniques(['Action: 普通の会話。']).length, 0);
assert.ok(formatCinematicTechniqueSlot(assignments, 58).length <= 58);
assert.equal(replaceCinematicSlotWithinBudget('ABC SLOT XYZ', 'SLOT', 'TOO-LONG-REPLACEMENT'), 'ABC SLOT XYZ');
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/cinematic-techniques.test.mjs`  
Expected: FAIL because `src/lib/cinematic-techniques.js` does not exist.

- [ ] **Step 3: Implement the immutable registry and deterministic selector**

```js
export const CINEMATIC_TECHNIQUES = Object.freeze([
  { id: 'frame_within_frame', risk: 1, cue: /窓|扉|ドア|門|アーチ|棚|カーテン|フェンス|肩越し|window|door|arch|shelf|curtain|fence|shoulder/i, compact: 'frame-edge depth' },
  { id: 'foreground_occlusion', risk: 1, cue: /前景|手前|肩越し|覗|foreground|over.the.shoulder|peek/i, compact: 'edge foreground' },
  { id: 'gobo_shadow', risk: 1, cue: /ブラインド|格子|木漏れ日|葉.*影|フェンス.*影|舞台照明|blind|lattice|foliage shadow|gobo/i, compact: 'patterned light' },
  { id: 'atmospheric_perspective', risk: 1, cue: /遠景|街全体|都市|山|海|地平線|廊下|ドローン|俯瞰|wide|city|mountain|horizon|corridor|drone|aerial/i, compact: 'aerial depth haze' },
  { id: 'story_reflection', risk: 3, cue: /鏡|窓ガラス|ガラス壁|水面|水たまり|磨かれた床|mirror|window glass|puddle|water surface|polished floor/i, compact: 'same-cast reflection' },
  { id: 'split_diopter', risk: 2, cue: /前景.*(?:遠景|奥)|手前.*(?:遠く|奥)|near.*far|foreground.*background/i, compact: 'near-far focus' },
  { id: 'shutter_drag', risk: 2, cue: /走|疾走|追跡|電車|車|群衆|雨.*流|panning|tracking|running|train|traffic|crowd/i, compact: 'sharp face motion trails' },
  { id: 'prism_refraction', risk: 3, cue: /プリズム|水晶|結晶|ガラス越し|水越し|prism|crystal|through glass|through water/i, compact: 'edge glass refraction' },
  { id: 'tilt_shift', risk: 2, cue: /ドローン俯瞰|鳥瞰|バードアイ|真上.*街|aerial|drone|bird.?s.eye/i, compact: 'miniature aerial depth' }
]);
```

Implement scoring so explicit physical cues score above generic depth cues, lower risk wins ties, panel order is stable, duplicate technique IDs are rejected, and only the first two safe assignments survive. Reject close-up/hand-detail/text-critical conflicts before scoring.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `node --test tests/cinematic-techniques.test.mjs`  
Expected: PASS for registry completeness, nine techniques, deterministic order, two-panel cap, no duplicates, conflict rejection, compact slot formatting, and budget fallback.

### Task 2: Four-Panel Budget-Neutral Prompt Integration

**Files:**
- Modify: `src/lib/prompt-assembler.js:267-430`
- Modify: `tests/cinematic-techniques.test.mjs`
- Modify: `tests/prompt-budget.test.mjs`

**Interfaces:**
- Consumes: Task 1 selectors and slot utilities.
- Produces: the existing `buildMangaPrompt(params)` signature with automatic enhancement and a test-only-compatible `cinematicTechniques` option defaulting to `true` so baseline and candidate outputs can be compared without changing production callers.

- [ ] **Step 1: Add failing four-panel integration assertions**

```js
const baseline = buildMangaPrompt({ ...fixture, cinematicTechniques: false });
const enhanced = buildMangaPrompt({ ...fixture, cinematicTechniques: true });
assert.ok(enhanced.length <= baseline.length);
assert.match(enhanced, /CINE:.*P1.*frame-edge depth/i);
assert.match(enhanced, /Camera: .*Epic Wide/);
assert.doesNotMatch(enhanced, /frame_within_frame|CINEMATIC_TECHNIQUES/);
assert.equal(buildMangaPrompt({ ...noCueFixture, cinematicTechniques: true }), buildMangaPrompt({ ...noCueFixture, cinematicTechniques: false }));
```

- [ ] **Step 2: Run focused tests and verify RED**

Run: `node --test tests/cinematic-techniques.test.mjs tests/prompt-budget.test.mjs`  
Expected: FAIL because `buildMangaPrompt` does not yet create or fit the technique slot.

- [ ] **Step 3: Integrate page selection without modifying panel cameras**

Import Task 1 helpers, add `cinematicTechniques = true` to `buildMangaPrompt`, compute assignments from the four extracted panels plus `cleanLocation`, and build the current prompt as `baselinePrompt`. For ChatGPT, replace exactly:

```js
const CHATGPT_CINEMATIC_SLOT = 'CAMERA: vary angles; preserve anatomy and the script lock.';
```

For Gemini, replace exactly:

```js
const GEMINI_CINEMATIC_SLOT = '(Dramatic anime cinematic lighting, high-budget VFX, NO excessive speedlines).';
```

Format a provider-specific line that includes only `P<number> <compact technique>` assignments plus a compact `script/anatomy/text win` safeguard. Do not change any `Camera: ${camera}` panel line. Apply safety filtering and documentary sanitization identically to baseline and candidate, and return the candidate only when its final length is no greater than the baseline; otherwise return the baseline.

- [ ] **Step 4: Verify focused GREEN and the 15,000-character contract**

Run: `node --test tests/cinematic-techniques.test.mjs tests/prompt-budget.test.mjs tests/prompt-composition-variety.test.mjs tests/prompt-conversational-eye-line.test.mjs tests/prompt-script-lock.test.mjs`  
Expected: PASS; enhanced prompts never exceed their paired baseline and the existing Web-copy fixture remains at or below 15,000 characters.

### Task 3: Single-Image Safety Router and Prompt Synchronization

**Files:**
- Modify: `src/lib/cinematic-techniques.js`
- Modify: `src/lib/single-image-prompt.js:1-30`
- Modify: `tests/single-image-prompt-sync.test.mjs`

**Interfaces:**
- Consumes: `buildSingleImageCinematicRouter(maxLength)` from Task 1's module.
- Produces: the existing zero-argument `buildSingleImageEmotionalPrompt()` used by `ControlBar.jsx`, with no caller or UI change.

- [ ] **Step 1: Add failing synchronization and budget assertions**

```js
const prompt = buildSingleImageEmotionalPrompt();
assert.match(prompt, /CINEMATIC DEPTH ROUTER/);
assert.match(prompt, /one optional.*physical scene cue/i);
assert.match(prompt, /otherwise keep the baseline camera/i);
assert.doesNotMatch(prompt, /frame_within_frame|story_reflection|prism_refraction/);
assert.ok(prompt.length <= 6466);
```

The current pre-change builder output was measured through Vite SSR at exactly 6,466 characters; keep that exact value as the regression ceiling.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/single-image-prompt-sync.test.mjs`  
Expected: FAIL because the router does not exist.

- [ ] **Step 3: Replace the current two camera bullets with a shorter router**

```text
CINEMATIC DEPTH ROUTER: When one existing physical scene cue safely supports one optional camera-space, motivated-shadow, atmospheric-depth, or edge-localized optical device, use exactly one. Never invent its physical source or obscure, duplicate, reflect, refract, or blur faces, hands, text, or story props. Otherwise keep the baseline camera. User camera, cast, action, anatomy, and text win.
```

Keep the established emotional acting, lighting, environment, clean-surface, hand, text, and shared-quality safeguards. The router replaces existing text rather than appending to it and remains shorter than the recorded baseline builder output.

- [ ] **Step 4: Run single-image and shared-quality tests**

Run: `node --test tests/single-image-prompt-sync.test.mjs tests/prompt-web-quality-contract.test.mjs tests/prompt-budget.test.mjs`  
Expected: PASS with the existing ControlBar call unchanged and all shared safeguards present.

### Task 4: User Documentation and Full Local Verification

**Files:**
- Modify: `README.md` in the current-processing/quality section only
- Inspect: all changed source, test, spec, plan, and README files

**Interfaces:**
- Consumes: completed production behavior.
- Produces: accurate local documentation and current automated evidence.

- [ ] **Step 1: Update README behavior and limits**

Add a concise description that cinematography techniques are automatically selected only from existing physical scene cues, use at most two panels, never override camera/script/cast/text/anatomy, and fail closed when no safe or budget-neutral replacement exists. State that reflection/refraction require an explicit surface. Do not change the version or ChangeLog.

- [ ] **Step 2: Run the complete deterministic validation set**

Run:

```powershell
node --test tests/*.test.mjs
npm.cmd run lint
npm.cmd run build
node scripts/pre_deploy_check.js
git diff --check
```

Expected: all Node tests pass; ESLint exits 0 with zero warnings; Vite production build exits 0; pre-deploy check exits 0; diff check has no output.

- [ ] **Step 3: Inspect the final diff for scope and secrets**

Run: `git diff -- src/lib/cinematic-techniques.js src/lib/prompt-assembler.js src/lib/single-image-prompt.js tests/cinematic-techniques.test.mjs tests/prompt-budget.test.mjs tests/single-image-prompt-sync.test.mjs README.md docs/superpowers/specs/2026-08-28-cinematic-technique-library-design.md docs/superpowers/plans/2026-08-28-cinematic-technique-library.md`  
Expected: only the approved local feature, tests, and documentation; no key, token, credential, version, release, deployment, or backup change.

### Task 5: Local In-App-Browser and Real API Image Verification

**Files:**
- Create only generated evidence under the existing ignored `scratch/cinematic-techniques-2026-08-28/` directory when the app provides a download/save action.
- Do not modify source unless a witnessed failure requires a generic fix followed by Task 4 re-verification.

**Interfaces:**
- Consumes: local app on port 5173 and the user's already configured UI API state.
- Produces: one fresh four-panel image, one fresh single-image image, inspected prompt-length evidence, and visible quality findings.

- [ ] **Step 1: Start the official local dev server**

Use the established Antigravity dev-server allowlist and `npm.cmd run dev` from the Nano Banana Pro app. Do not broadly kill Node processes; use the narrow approved helper only if a stale app-owned server must be stopped.

- [ ] **Step 2: Inspect value-safe API readiness in the in-app browser**

Open `http://localhost:5173/`, confirm the selected provider, masked/configured status, and enabled generation action without reading the key. If not ready, leave the correct key-entry UI open and request manual entry.

- [ ] **Step 3: Generate and inspect a fresh four-panel API image**

Use a safe scenario containing a physical doorway/window frame and a deep exterior or corridor so a low-risk assignment is naturally eligible. Confirm the assembled prompt includes at most two compact `CINE:` mappings, keeps every original `Camera:` line, leaks no registry IDs, and is no longer than the paired baseline measured by the local builder. Generate through the configured API and inspect all four panels for correct cast count, readable dialogue, preserved story/action, coherent anatomy/hands/props, and visible but non-obstructive depth improvement.

- [ ] **Step 4: Generate and inspect a fresh single-image API result**

Use the exact text copied by `1枚絵 ChatGPT用プロンプト（β）をコピー`, together with a safe single-image request featuring a character inside an existing doorway with window-lattice light. Submit through the API-capable image route. Inspect for exactly one conservative technique, no invented reflector/refractor, clear face/hands/text/props, preserved request, and visible framing or motivated-shadow improvement.

- [ ] **Step 5: Close local verification cleanly and report contract status**

Stop only the app-owned local dev server through the approved helper after evidence is saved. Report each requested item as `satisfied`, `unmet`, or `unverified`. Do not claim completion if either API image is missing, still running, or visibly regressed.

## Plan Self-Review

- Every design requirement maps to Tasks 1-5.
- Production interfaces are defined once and reused; no UI or provider-route change is introduced.
- Prompt-length neutrality is checked both locally per slot and on completed baseline/candidate prompts.
- Both API paths required by `docs/project_standards.md` are explicit completion gates.
- No step authorizes commit, push, release, deploy, backup, package installation, secret inspection, or external upload.
