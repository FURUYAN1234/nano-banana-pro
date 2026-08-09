# Season-Aware Outfit Selection Implementation Plan

> **Execution:** Use superpowers:executing-plans for normal task-by-task implementation. Use superpowers:subagent-driven-development only when the user or applicable project instructions explicitly request per-task delegation and the tasks are genuinely independent. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make news-mode outfit selection follow the target date's season while preserving explicit outfit, event, profession, location, weather, and indoor-environment priorities, then prove the unchanged normal workflow with a real in-app-browser API image.

**Architecture:** Add one pure `seasonal-outfit` policy module that derives a Japan-default season context, builds prompt guidance, and rejects only obvious unexcused outfit conflicts. Feed that policy into the existing STEP2 prompt/retry pipeline, reuse the existing `Outfit:` → `lockedOutfit` → STEP3/STEP4 continuity path, and show a read-only season hint beside the news date without adding controls.

**Tech Stack:** React 19, Vite 7, JavaScript ES modules, Node `node:test`, existing scenario retry pipeline, in-app browser, configured OpenAI text/image routes.

## Global Constraints

- Apply date-derived season context only in news mode; manual mode uses explicit topic/event/weather cues but not `targetDate`.
- Season ranges are spring March-May, summer June-August, autumn September-November, and winter December-February.
- Priority is explicit custom outfit, explicit event outfit, profession/safety/location/weather/indoor conditions, target-date season, then ordinary AI auto-selection.
- Do not add a `Season:` line to scenario text and do not alter the existing `Outfit:` continuity path.
- Do not add dependencies, hardcode a character/news/person count, inspect an API key value, commit, push, deploy, release, or back up.
- Required final browser surface is the in-app browser; local tests cannot replace the real API image acceptance run.
- OpenAI model availability is not being changed; preserve the configured scenario and `gpt-image-2` routes.

---

## File Map

- Create `src/lib/seasonal-outfit.js`: pure date-to-season mapping, prompt guidance, obvious-conflict validation, and retry instruction.
- Create `tests/seasonal-outfit.test.mjs`: boundary, priority, exception, prompt, provider, and UI contract tests.
- Modify `src/lib/prompts.js`: inject news season guidance and manual explicit-season/event guidance into Outfit Auto-Select.
- Modify `src/lib/scenario-provider.js`: compute one season context, add the policy to the shared quality gate, provide a concrete retry reason, and keep the same three-attempt envelope.
- Modify `src/components/Step2Panel.jsx`: show a read-only season hint under the news target date.
- Modify `HANDOFF.md`: record current local status and exact automatic/API evidence after verification.

### Task 1: Pure seasonal outfit policy

**Files:**
- Create: `src/lib/seasonal-outfit.js`
- Create: `tests/seasonal-outfit.test.mjs`

**Interfaces:**
- Produces: `getSeasonContext({ targetDate, inputMode }) -> null | { key, label, sourceDate, climateHint }`
- Produces: `buildSeasonalOutfitInstruction({ seasonContext, inputMode, manualTopic, customOutfit }) -> string`
- Produces: `assertSeasonalOutfit({ outfit, seasonContext, contextText, customOutfit }) -> true` or throws a concrete `Error`
- Produces: `SEASONAL_OUTFIT_RETRY_INSTRUCTION: string`

- [ ] **Step 1: Write failing policy tests**

Create `tests/seasonal-outfit.test.mjs` with direct imports and assertions for boundaries, invalid input, news/manual scope, explicit override, summer/winter conflicts, and cold/warm exceptions:

```js
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  assertSeasonalOutfit,
  buildSeasonalOutfitInstruction,
  getSeasonContext
} from '../src/lib/seasonal-outfit.js';

test('maps Japanese calendar boundary months without timezone drift', () => {
  assert.equal(getSeasonContext({ targetDate: '2026-03-01', inputMode: 'news' }).label, '春');
  assert.equal(getSeasonContext({ targetDate: '2026-06-01', inputMode: 'news' }).label, '夏');
  assert.equal(getSeasonContext({ targetDate: '2026-09-01', inputMode: 'news' }).label, '秋');
  assert.equal(getSeasonContext({ targetDate: '2026-12-01', inputMode: 'news' }).label, '冬');
  assert.equal(getSeasonContext({ targetDate: '2026-02-28', inputMode: 'news' }).label, '冬');
});

test('returns no date season for invalid dates or manual mode', () => {
  assert.equal(getSeasonContext({ targetDate: '', inputMode: 'news' }), null);
  assert.equal(getSeasonContext({ targetDate: '2026-02-30', inputMode: 'news' }), null);
  assert.equal(getSeasonContext({ targetDate: '2026-08-09', inputMode: 'manual' }), null);
});

test('builds date-season guidance for news and explicit cue guidance for manual input', () => {
  const summer = getSeasonContext({ targetDate: '2026-08-09', inputMode: 'news' });
  assert.match(buildSeasonalOutfitInstruction({ seasonContext: summer, inputMode: 'news' }), /対象日付.*2026-08-09/);
  assert.match(buildSeasonalOutfitInstruction({ seasonContext: summer, inputMode: 'news' }), /夏/);
  assert.match(buildSeasonalOutfitInstruction({ inputMode: 'manual', manualTopic: '駅前の夏祭り' }), /夏祭り/);
  assert.match(buildSeasonalOutfitInstruction({ customOutfit: '全員ダウンジャケット' }), /最優先/);
});

test('rejects obvious summer winterwear and winter summerwear with concrete reasons', () => {
  const summer = getSeasonContext({ targetDate: '2026-08-09', inputMode: 'news' });
  const winter = getSeasonContext({ targetDate: '2026-12-09', inputMode: 'news' });
  assert.throws(
    () => assertSeasonalOutfit({ outfit: '厚手のダウンジャケットとマフラー', seasonContext: summer, contextText: '屋外の夏祭り' }),
    /夏（8月）なのに防寒着/
  );
  assert.throws(
    () => assertSeasonalOutfit({ outfit: '薄手の半袖と水着', seasonContext: winter, contextText: '冬の屋外広場' }),
    /冬（12月）なのに夏向けの薄着/
  );
});

test('allows environmental exceptions and explicit outfit overrides', () => {
  const summer = getSeasonContext({ targetDate: '2026-08-09', inputMode: 'news' });
  assert.equal(assertSeasonalOutfit({ outfit: '防寒着', seasonContext: summer, contextText: '屋内スケート場' }), true);
  assert.equal(assertSeasonalOutfit({ outfit: 'ダウンジャケット', seasonContext: summer, contextText: '夏祭り', customOutfit: 'ダウンジャケット' }), true);
});

test('rejects empty and ambiguous automatic outfit values', () => {
  assert.throws(() => assertSeasonalOutfit({ outfit: '' }), /Outfitが空/);
  assert.throws(() => assertSeasonalOutfit({ outfit: 'キャラシート準拠' }), /具体的な衣装カテゴリー/);
});
```

- [ ] **Step 2: Run the policy test and confirm RED**

Run: `node --test tests/seasonal-outfit.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `src/lib/seasonal-outfit.js`.

- [ ] **Step 3: Implement the pure policy module**

Create `src/lib/seasonal-outfit.js`:

```js
const SEASONS = Object.freeze({
  spring: Object.freeze({ key: 'spring', label: '春', climateHint: '寒暖差を考慮した軽い羽織りまたは春向けの服装' }),
  summer: Object.freeze({ key: 'summer', label: '夏', climateHint: '高温多湿を考慮した通気性のよい夏向けの服装' }),
  autumn: Object.freeze({ key: 'autumn', label: '秋', climateHint: '残暑または冷え込みを考慮した秋向けの服装' }),
  winter: Object.freeze({ key: 'winter', label: '冬', climateHint: '低温を考慮した防寒性のある冬向けの服装' })
});

const AMBIGUOUS_OUTFIT_RE = /^(?:なし|未指定|デフォルト|キャラシート準拠|おまかせ|none|default)$/i;
const SUMMER_CONFLICT_RE = /(?:ダウン(?:ジャケット)?|厚手(?:の)?コート|マフラー|防寒着|heavy\s+coat|winter\s+clothes)/i;
const WINTER_CONFLICT_RE = /(?:水着|薄手(?:の)?半袖|ノースリーブ|タンクトップ|swimwear|swimsuit)/i;
const COLD_EXCEPTION_RE = /(?:雪山|雪上|降雪|吹雪|スキー|スケート|冷凍|冷蔵|氷点下|寒冷|屋内氷|南半球|winter|snow|freezer|ice\s+rink)/i;
const WARM_EXCEPTION_RE = /(?:屋内プール|温水プール|サウナ|熱帯|南半球|ビーチ|海水浴|summer|tropical|heated\s+pool|sauna)/i;

const getSeasonKey = (month) => {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
};

export const getSeasonContext = ({ targetDate = '', inputMode = 'news' } = {}) => {
  if (inputMode !== 'news') return null;
  const match = String(targetDate).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year
    || parsed.getUTCMonth() + 1 !== month
    || parsed.getUTCDate() !== day
  ) return null;
  const definition = SEASONS[getSeasonKey(month)];
  return { ...definition, sourceDate: targetDate, month };
};

export const buildSeasonalOutfitInstruction = ({
  seasonContext = null,
  inputMode = 'news',
  manualTopic = '',
  customOutfit = ''
} = {}) => {
  if (String(customOutfit).trim()) {
    return `ユーザー指定服装「${String(customOutfit).trim()}」を最優先し、季節目安で変更してはならない。`;
  }
  if (inputMode === 'manual') {
    return `手動トピック「${String(manualTopic).trim()}」に季節、天候、催事、職業、安全装備、屋内環境が明示されている場合、それを衣装選定の必須条件として扱う。対象日付から季節を推測してはならない。`;
  }
  if (!seasonContext) return '';
  return `対象日付 ${seasonContext.sourceDate} の日本の季節目安は「${seasonContext.label}」。基本は${seasonContext.climateHint}を選ぶ。ただし、イベント固有衣装、職業・安全装備、場所、実際の天候、屋内環境、海外の現地季節が明確なら、それらを季節目安より優先する。理由のない季節外れの服装は禁止する。`;
};

export const assertSeasonalOutfit = ({
  outfit = '',
  seasonContext = null,
  contextText = '',
  customOutfit = ''
} = {}) => {
  if (String(customOutfit).trim()) return true;
  const normalizedOutfit = String(outfit).trim();
  if (!normalizedOutfit) throw new Error('Outfitが空です。具体的な衣装カテゴリーを出力してください。');
  if (AMBIGUOUS_OUTFIT_RE.test(normalizedOutfit)) {
    throw new Error('Outfitに具体的な衣装カテゴリーがありません。');
  }
  const context = `${contextText}\n${normalizedOutfit}`;
  if (seasonContext?.key === 'summer' && SUMMER_CONFLICT_RE.test(normalizedOutfit) && !COLD_EXCEPTION_RE.test(context)) {
    throw new Error(`夏（${seasonContext.month}月）なのに防寒着が選ばれました。寒冷な場所・天候・屋内環境の根拠が必要です。`);
  }
  if (seasonContext?.key === 'winter' && WINTER_CONFLICT_RE.test(normalizedOutfit) && !WARM_EXCEPTION_RE.test(context)) {
    throw new Error(`冬（${seasonContext.month}月）なのに夏向けの薄着が選ばれました。温暖な場所・屋内環境の根拠が必要です。`);
  }
  return true;
};

export const SEASONAL_OUTFIT_RETRY_INSTRUCTION = `SEASONAL OUTFIT RETRY:
Rewrite the complete scenario and correct the Outfit field. Respect this priority: explicit user outfit; event-specific clothing; profession/safety/location/weather/indoor environment; target-date season; ordinary auto-selection. Output one concrete broad outfit category and do not use default, character-sheet-compliant, or unspecified wording.`;
```

- [ ] **Step 4: Run the policy test and confirm GREEN**

Run: `node --test tests/seasonal-outfit.test.mjs`

Expected: all policy tests PASS.

### Task 2: STEP2 prompt and shared quality validation

**Files:**
- Modify: `src/lib/prompts.js:177`
- Modify: `src/lib/prompts.js:288`
- Modify: `src/lib/scenario-provider.js:1`
- Modify: `src/lib/scenario-provider.js:36`
- Modify: `src/lib/scenario-provider.js:54`
- Modify: `src/lib/scenario-provider.js:284`
- Test: `tests/seasonal-outfit.test.mjs`
- Test: `tests/scenario-retry-diagnostics.test.mjs`

**Interfaces:**
- Consumes: `getSeasonContext`, `buildSeasonalOutfitInstruction`, `assertSeasonalOutfit`, `SEASONAL_OUTFIT_RETRY_INSTRUCTION` from Task 1.
- Produces: a `SEASONAL_OUTFIT` scenario-quality code and prompt text that includes the correct scope and priority.

- [ ] **Step 1: Add failing prompt/provider integration tests**

Append tests that load `prompts.js` through Vite, inspect `scenario-provider.js`, and assert the required contracts:

```js
import { readFile } from 'node:fs/promises';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let getScenarioPrompt;

before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
});

after(async () => server?.close());

const promptArgs = {
  randomCategory: '地域ニュース',
  targetDate: '2026-08-09',
  inputMode: 'news',
  manualTopic: '',
  newsContext: '',
  searchTopicKeywords: '地域ニュース',
  bg360Image: null,
  bg360Analysis: null,
  bg360Enabled: false,
  customLocation: '',
  customOutfit: '',
  locationPlan: { mode: 'adaptive', anchorName: '', guidance: '内容に適した場所を選ぶこと。' },
  ragReactions: '',
  punchlineType: 'Auto',
  comedyTone: 'HighTension',
  styleJson: null
};

test('news prompt uses the target-date season with contextual exceptions', () => {
  const prompt = getScenarioPrompt(promptArgs);
  assert.match(prompt, /対象日付 2026-08-09/);
  assert.match(prompt, /季節目安は「夏」/);
  assert.match(prompt, /イベント固有衣装、職業・安全装備、場所、実際の天候、屋内環境/);
});

test('manual prompt ignores target-date season and protects explicit seasonal event cues', () => {
  const prompt = getScenarioPrompt({ ...promptArgs, inputMode: 'manual', manualTopic: '駅前の夏祭り' });
  assert.match(prompt, /手動トピック「駅前の夏祭り」/);
  assert.match(prompt, /対象日付から季節を推測してはならない/);
  assert.doesNotMatch(prompt, /季節目安は「夏」/);
});

test('custom outfit remains above automatic season selection', () => {
  const prompt = getScenarioPrompt({ ...promptArgs, customOutfit: '全員ダウンジャケット' });
  assert.match(prompt, /ユーザー指定服装「全員ダウンジャケット」を最優先/);
});

test('scenario provider validates and retries seasonal outfit failures with the concrete reason', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');
  assert.match(source, /SEASONAL_OUTFIT/);
  assert.match(source, /assertSeasonalOutfit/);
  assert.match(source, /SEASONAL_OUTFIT_RETRY_INSTRUCTION/);
  assert.match(source, /message/);
});
```

- [ ] **Step 2: Run integration tests and confirm RED**

Run: `node --test tests/seasonal-outfit.test.mjs tests/scenario-retry-diagnostics.test.mjs`

Expected: policy tests remain PASS; prompt/provider integration assertions FAIL because the policy is not wired.

- [ ] **Step 3: Wire prompt guidance**

In `src/lib/prompts.js`, import the policy and compute the instruction near the beginning of `getScenarioPrompt`:

```js
import { buildSeasonalOutfitInstruction, getSeasonContext } from './seasonal-outfit';

const seasonContext = getSeasonContext({ targetDate, inputMode });
const seasonalOutfitInstruction = buildSeasonalOutfitInstruction({
  seasonContext,
  inputMode,
  manualTopic,
  customOutfit
});
```

Add this line inside both the custom Outfit Lock and Outfit Auto-Select branches, before output format instructions:

```js
           - ${seasonalOutfitInstruction}
```

Update the `Outfit:` format hint so automatic selection also says:

```js
"場所・状況・季節条件に最も適した具体的な服装カテゴリーを記入せよ。イベント、職業、安全装備、天候、屋内環境は季節目安より優先する。※「キャラシート準拠」「制服」「デフォルト」は禁止"
```

- [ ] **Step 4: Wire shared validation and exact diagnostics**

In `src/lib/scenario-provider.js`, import the Task 1 policy:

```js
import {
  assertSeasonalOutfit,
  getSeasonContext,
  SEASONAL_OUTFIT_RETRY_INSTRUCTION
} from './seasonal-outfit';
```

Add `SEASONAL_OUTFIT: '対象日付と服装の季節整合性'` to `scenarioRetryLabels` and add the retry instruction:

```js
SEASONAL_OUTFIT: SEASONAL_OUTFIT_RETRY_INSTRUCTION
```

Extend `validateScenarioForRetry` to accept `seasonContext`, `contextText`, and `customOutfit`, then add this check after content safety:

```js
['SEASONAL_OUTFIT', () => assertSeasonalOutfit({
  outfit: scenario.outfit,
  seasonContext,
  contextText,
  customOutfit
})],
```

Before `getScenarioPrompt`, compute:

```js
const seasonContext = getSeasonContext({ targetDate, inputMode });
```

Pass validation context from the parsed scenario:

```js
validateScenario: (parsedScenario) => validateScenarioForRetry({
  scenario: parsedScenario,
  punchlineType: activePunchlineType,
  manualTopic: inputMode === 'manual' ? manualTopic : '',
  seasonContext,
  customOutfit,
  contextText: [
    manualTopic,
    newsContext,
    parsedScenario.topic,
    parsedScenario.location,
    parsedScenario.scenario
  ].filter(Boolean).join('\n')
}),
```

Change retry progress to include the concrete validation message:

```js
export const formatScenarioRetryProgress = ({ code, message, nextAttempt, maxAttempts } = {}) => {
  const label = scenarioRetryLabels[code] || 'シナリオ出力';
  const attemptPrefix = nextAttempt && maxAttempts ? `試行 ${nextAttempt}/${maxAttempts}: ` : '';
  const reason = message ? ` 理由: ${message}` : '';
  return `${attemptPrefix}「${label}」の品質検証に通らなかったため、改善条件を追加してシナリオを再生成します...${reason}`;
};
```

- [ ] **Step 5: Run prompt/provider tests and confirm GREEN**

Run: `node --test tests/seasonal-outfit.test.mjs tests/scenario-retry-diagnostics.test.mjs`

Expected: all tests PASS; existing three-attempt assertions remain valid.

### Task 3: Read-only news season hint

**Files:**
- Modify: `src/components/Step2Panel.jsx:1`
- Modify: `src/components/Step2Panel.jsx:127`
- Test: `tests/seasonal-outfit.test.mjs`

**Interfaces:**
- Consumes: `getSeasonContext({ targetDate, inputMode })` from Task 1.
- Produces: a news-only `季節目安: <label>（対象日付から自動）` hint with no new state or control.

- [ ] **Step 1: Add a failing UI source contract test**

Append:

```js
test('STEP2 shows a read-only news season hint without adding a season control', async () => {
  const source = await readFile(new URL('../src/components/Step2Panel.jsx', import.meta.url), 'utf8');
  assert.match(source, /getSeasonContext/);
  assert.match(source, /季節目安:/);
  assert.match(source, /対象日付から自動/);
  assert.doesNotMatch(source, /setSeason|name=["']season["']|<select[^>]*season/i);
});
```

- [ ] **Step 2: Run the test and confirm RED**

Run: `node --test tests/seasonal-outfit.test.mjs`

Expected: the UI source contract FAILS because no hint exists.

- [ ] **Step 3: Implement the read-only hint**

Import the pure policy in `src/components/Step2Panel.jsx`:

```js
import { getSeasonContext } from '../lib/seasonal-outfit';
```

Inside the component body, derive without state:

```js
const seasonContext = getSeasonContext({ targetDate, inputMode });
```

Immediately under the existing date input, render:

```jsx
{seasonContext && (
  <span className="text-[10px] font-mono text-cyan-300 whitespace-nowrap">
    季節目安: {seasonContext.label}（対象日付から自動）
  </span>
)}
```

- [ ] **Step 4: Run the UI/policy tests and confirm GREEN**

Run: `node --test tests/seasonal-outfit.test.mjs`

Expected: all tests PASS.

### Task 4: Full automatic verification

**Files:**
- Verify: all changed source/test files

**Interfaces:**
- Consumes: completed Tasks 1-3.
- Produces: fresh test, lint, production-build, and whitespace evidence.

- [ ] **Step 1: Run the focused seasonal suite**

Run: `node --test tests/seasonal-outfit.test.mjs tests/scenario-retry-diagnostics.test.mjs tests/scenario-location-policy.test.mjs tests/prompt-hand-action-conflict.test.mjs tests/single-image-prompt-sync.test.mjs`

Expected: all focused tests PASS.

- [ ] **Step 2: Run the complete Node suite**

Run: `node --test tests/*.test.mjs`

Expected: all tests PASS with zero failures.

- [ ] **Step 3: Run ESLint**

Run: `npm.cmd run lint`

Expected: exit code 0 with zero errors.

- [ ] **Step 4: Run production build**

Run: `npm.cmd run build`

Expected: Vite exits 0 and produces `dist`.

- [ ] **Step 5: Check patch integrity**

Run: `git diff --check`

Expected: no output and exit code 0.

- [ ] **Step 6: Review the actual diff and unrelated working tree state**

Run: `git status --short` and `git diff -- src/lib/seasonal-outfit.js src/lib/prompts.js src/lib/scenario-provider.js src/components/Step2Panel.jsx tests/seasonal-outfit.test.mjs`

Expected: only intended local feature/spec/plan/coordination files are changed; unrelated user files remain untouched.

### Task 5: In-app-browser real API image acceptance

**Files:**
- Modify after evidence: `HANDOFF.md`
- Preserve evidence under: `scratch/season-aware-outfit-api/`

**Interfaces:**
- Consumes: verified local build and existing configured app API routes.
- Produces: first-pass STEP2 scenario evidence, unchanged STEP3 prompt evidence, one real four-panel API image, and full-resolution visual review.

- [ ] **Step 1: Start the local Vite server using the existing narrow command**

Run from the app root: `npm.cmd run dev -- --host 127.0.0.1`

Expected: Vite reports a local URL and remains running. Do not start Chrome; use the in-app browser.

- [ ] **Step 2: Open the local app in the in-app browser and perform a value-safe readiness check**

Confirm only that the intended provider is selected, the API key is shown as configured/masked, and STEP1/STEP2 actions are enabled. Never inspect or return the key value.

Expected: API-ready state is visible. If the in-app browser controller is unavailable, stop this acceptance path and report it; do not substitute an external browser.

- [ ] **Step 3: Prepare the production-equivalent summer-news run**

Use news mode, set `targetDate` to a summer date, and use a current searchable category/topic that yields a summer-festival or comparable summer outdoor event. Keep `customOutfit` empty so automatic selection is exercised. Use the existing character-sheet state if available; otherwise attach the existing local verification character assets without altering them.

Expected: UI shows `季節目安: 夏（対象日付から自動）`.

- [ ] **Step 4: Run STEP2 once and inspect the first response before any retry**

Expected: the first API response completes, `Outfit:` is concrete and summer/event appropriate, contains no unexcused winterwear, and the progress log contains no seasonal-outfit retry. If first-pass validation fails, preserve the exact response/reason, diagnose and repair the generic prompt/validator boundary, rerun automatic checks, and repeat the same input until the first response is valid.

- [ ] **Step 5: Build STEP3 through the normal untouched workflow**

Do not edit the generated scenario or final prompt. Verify the selected `Outfit:` appears in the final prompt and the existing cross-panel wardrobe continuity lock remains present.

Expected: normal STEP3 completes with four panels and the intended summer outfit contract.

- [ ] **Step 6: Generate one real four-panel image through the configured image API**

Submit the unchanged normal STEP3 result through the existing STEP4 API action and wait for the real final completion signal. A streamed partial or running spinner is not completion.

Expected: `gpt-image-2` or the currently configured supported image route returns a final 4-panel image and renders it in the in-app browser.

- [ ] **Step 7: Save and inspect full-resolution evidence**

Save the returned image under `scratch/season-aware-outfit-api/` and inspect it at full resolution.

Expected: the image visibly matches the summer event, has no winter coat/down jacket/muffler without a cold-setting reason, keeps clothing stable across panels, and has no obvious extra-limb or broken-person failure.

- [ ] **Step 8: Record current evidence in HANDOFF.md**

Add one concise current-status entry containing the exact input/date, first-pass STEP2 result and outfit, configured text/image models observed, automatic check counts, image path, image dimensions/hash, and visual findings. State explicitly that no commit, push, deploy, release, or backup occurred.

- [ ] **Step 9: Stop the local server through the narrow helper when verification is complete**

Run: `C:\Users\sx717\.codex\hooks\stop_antigravity_dev_server.ps1`

Expected: only the Antigravity app verification server is stopped.

### Task 6: Final acceptance audit

**Files:**
- Verify: `docs/superpowers/specs/2026-08-09-season-aware-outfit-design.md`
- Verify: all changed implementation, test, evidence, and `HANDOFF.md` files

**Interfaces:**
- Consumes: all prior evidence.
- Produces: satisfied/unmet/unverified status for every requested outcome.

- [ ] **Step 1: Map evidence to every design completion condition**

Confirm date-derived news season behavior, manual-mode scope, custom/event/environment priority, read-only UI, explicit validation reason, first-pass STEP2, unchanged STEP3, final API image, and full-resolution visual review.

- [ ] **Step 2: Re-run cheap freshness checks after documentation**

Run: `git diff --check` and `git status --short`.

Expected: no whitespace errors and only intended local changes/evidence.

- [ ] **Step 3: Report without expanding delivery authority**

Report each contract item as `satisfied`, `unmet`, or `unverified`, cite fresh command/browser/artifact evidence, and clearly state that changes remain local. Do not commit, push, deploy, release, or back up.

