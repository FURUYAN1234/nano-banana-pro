# Manga Composition Variety Implementation Plan

> **Execution:** Use superpowers:executing-plans for normal task-by-task implementation. Use superpowers:subagent-driven-development only when the user or applicable project instructions explicitly request per-task delegation and the tasks are genuinely independent. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 通常の4コマ生成で、真正面・左右対称・両手前出しへの偏りを汎用的に抑える。

**Architecture:** 新しい `composition-variety.js` を構図契約の単一ソースにし、STEP2のシナリオ生成とSTEP3/4の両プロバイダ最終プロンプトから参照する。Cameraタグの既存方位は保持し、方位が未指定のパネルだけ決定論的な斜め視点を補う。

**Tech Stack:** React/Vite、ES modules、Node test runner、OpenAI APIを使うローカルNano Banana Pro。

## Global Constraints

- 通常生成で常時有効。追加トグルは作らない。
- 台詞、Action、キャスト、小道具、背景連続性、既存の明示Camera方位を変更しない。
- ChatGPT/OpenAI系とGemini系の最終プロンプトへ同じ構図契約を通す。
- production codeへ今回の人物名、台詞、題材をハードコードしない。
- デプロイ、リリース、バックアップ、push、commitは行わない。

---

### Task 1: Composition contract and panel staging helper

**Files:**
- Create: `src/lib/composition-variety.js`
- Create: `tests/prompt-composition-variety.test.mjs`

**Interfaces:**
- Produces: `SCENARIO_COMPOSITION_VARIETY_RULES: string`
- Produces: `MANGA_COMPOSITION_VARIETY_LOCK: string`
- Produces: `getPanelCompositionAssist(panelText: string, panelNumber: number): string`

- [ ] **Step 1: Write the failing helper tests**

```js
assert.match(getPanelCompositionAssist('[Camera: ローアングル]', 2), /RIGHT-FRONT OBLIQUE/);
assert.match(getPanelCompositionAssist('[Camera: Over The Shoulder]', 1), /PRESERVE EXPLICIT AZIMUTH/);
assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /no more than one flat front-on/i);
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/prompt-composition-variety.test.mjs`

Expected: FAIL because `src/lib/composition-variety.js` does not exist.

- [ ] **Step 3: Implement the minimal contract module**

```js
const EXPLICIT_AZIMUTH_RE = /(?:左|右|斜め|肩越し|背後|背越し|over[ -]the[ -]shoulder|\bOTS\b|three-quarter|3\/4|front-left|front-right|rear)/i;

export const getPanelCompositionAssist = (panelText, panelNumber) => {
  if (EXPLICIT_AZIMUTH_RE.test(String(panelText || ''))) {
    return 'PRESERVE EXPLICIT AZIMUTH: keep the scenario direction; avoid flat bilateral symmetry.';
  }
  return PANEL_AZIMUTH_SLOTS[(Number(panelNumber) - 1) % PANEL_AZIMUTH_SLOTS.length];
};
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `node --test tests/prompt-composition-variety.test.mjs`

Expected: helper assertions pass; prompt assertions remain RED until Task 2.

### Task 2: Wire normal scenario and both final-prompt families

**Files:**
- Modify: `src/lib/prompts.js`
- Modify: `src/lib/prompt-assembler.js`
- Modify: `tests/prompt-composition-variety.test.mjs`

**Interfaces:**
- Consumes: all three exports from `src/lib/composition-variety.js`.
- Produces: default STEP2 scenario prompt with horizontal camera/pose diversity requirements.
- Produces: ChatGPT/OpenAI and Gemini panel blocks containing `COMPOSITION STAGING`.

- [ ] **Step 1: Add failing prompt-path assertions**

```js
assert.match(getScenarioPrompt(options), /真正面は最大1コマ/);
assert.match(chatGptPrompt, /MANGA CAMERA \/ POSE VARIETY LOCK/);
assert.equal((chatGptPrompt.match(/COMPOSITION STAGING:/g) || []).length, 4);
assert.match(geminiPrompt, /MANGA CAMERA \/ POSE VARIETY LOCK/);
assert.equal((geminiPrompt.match(/COMPOSITION STAGING:/g) || []).length, 4);
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/prompt-composition-variety.test.mjs`

Expected: FAIL because normal scenario and final prompt paths do not contain the new contract.

- [ ] **Step 3: Wire the scenario contract and page lock**

```js
import { SCENARIO_COMPOSITION_VARIETY_RULES } from './composition-variety';
// Include the rules inside the existing Camera Direction Tag section.

import { MANGA_COMPOSITION_VARIETY_LOCK, getPanelCompositionAssist } from './composition-variety';
// Add the page lock to sceneLocks and emit one COMPOSITION STAGING line per panel.
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `node --test tests/prompt-composition-variety.test.mjs`

Expected: all composition-variety assertions pass.

### Task 3: Full verification and real API image proof

**Files:**
- Modify only if needed: `src/lib/composition-variety.js`, `src/lib/prompts.js`, `src/lib/prompt-assembler.js`, `tests/prompt-composition-variety.test.mjs`

**Interfaces:**
- Consumes: updated local app at `http://127.0.0.1:5173/` and the user's in-app OpenAI connection.
- Produces: one current OpenAI scenario, one current generated four-panel image, and visual QA evidence.

- [ ] **Step 1: Run fresh automated verification**

```powershell
node --test
npm run lint -- --max-warnings=0
npm run build
git diff --check -- . ':!dist'
```

- [ ] **Step 2: Reload the connected in-app browser**

Reload `http://127.0.0.1:5173/`, confirm the provider is still OpenAI and API-ready without reading the key value.

- [ ] **Step 3: Generate a normal scenario and inspect STEP3 prompt**

Use normal STEP2 generation, build the STEP3 prompt, and verify it contains the page lock plus four `COMPOSITION STAGING` lines.

- [ ] **Step 4: Generate and inspect the real API image**

Run STEP4 through OpenAI, wait for the actual completion signal, and inspect the generated image for at least three subject-relative camera azimuths, no more than one flat front-on panel, and asymmetrical depth for any two-handed action.

- [ ] **Step 5: Review final diff and status**

Run: `git status --short`, `git diff --stat`, and `git diff --check -- . ':!dist'`.

Expected: only scoped source, test, and planning files are changed; no credential, generated image, build output, version, release, or deployment file is included.
