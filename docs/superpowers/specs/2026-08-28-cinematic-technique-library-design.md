# Cinematic Technique Library Design

**Date:** 2026-08-28  
**Status:** Approved for implementation  
**Scope:** Nano Banana Pro four-panel and single-image prompt assembly, local tests, and real local API image verification. No version bump, commit, push, release, deploy, or backup.

## Goal

Pre-install a library of cinematic still-image techniques, select only techniques that fit the existing scene intent, and improve depth or visual richness without weakening script fidelity, character identity, anatomy, dialogue, text, or the existing prompt-length budget.

## Architecture

Create one pure local module that owns technique metadata, eligibility rules, deterministic scoring, page-level limits, and compact provider-neutral prompt fragments. The module receives only already-available scenario and camera information; it does not add a model call and does not send the complete technique catalog to a model.

Prompt assembly first builds the existing baseline camera text. An eligible technique may replace a designated generic cinematography phrase with a technique fragment of no greater length. The assembler compares the completed enhanced prompt with the completed baseline prompt and discards all enhancement when the enhanced prompt is longer. Unselected techniques contribute zero characters to generated prompts.

## Technique Inventory

The library contains the following capabilities:

| Technique | Default risk | Minimum eligibility |
|---|---:|---|
| Frame within frame | low | A physical frame such as a window, doorway, arch, shelf, curtain, fence, or foreground shoulder exists in the scene |
| Foreground occlusion depth | low | A readable foreground object or non-speaking shoulder can cover only a panel edge without covering faces, hands, story props, bubbles, or required text |
| Gobo or patterned shadow | low | A motivated source such as blinds, window lattice, foliage, fence, or stage lighting exists |
| Atmospheric perspective | low | A wide, aerial, exterior, corridor, city, landscape, or otherwise deep setting exists |
| Story-bearing reflection | high | A mirror, window, glass wall, polished surface, puddle, or water surface is explicitly present |
| Split-diopter dual plane | medium | Exactly two story-critical depth planes are already described and both must remain readable |
| Shutter-drag motion separation | medium | Directional movement exists and the face, eyes, hands, and required text can remain sharp |
| Prism or localized refraction | high | Prism, crystal, glass, water, neon glass, or a supported dreamlike optical surface is explicitly present |
| Tilt-shift miniature view | medium | The camera is aerial, drone, bird's-eye, or high overhead and small-scale scene readability is appropriate |

Temporal-only techniques such as rack focus, whip pan, or dolly zoom are not injected into still images. MiniMax H3 keeps its existing separate motion and dialogue-first camera contract.

## Selection Contract

- Selection is deterministic and based on existing panel action, location, emotion, camera, and depth cues.
- User-written or scenario-explicit camera instructions always win.
- A four-panel page uses at most two enhanced panels, at most one technique per panel, and no repeated technique.
- A single image uses at most one technique.
- Low-risk techniques may be selected automatically when their physical cue exists.
- Medium-risk techniques require all eligibility rules and no readability conflict.
- High-risk techniques require an explicit physical reflection or refraction surface; the selector never invents one merely for decoration.
- Ties resolve by compatibility score, then lower risk, then panel order. There is no random selection.
- If no safe candidate exists, output is byte-for-byte equivalent to the current baseline path.

## Quality Guardrails

The following priorities override every cinematic technique:

1. Exact story, action, cast, dialogue, title, watermark, and required visible text.
2. Character identity, count, anatomy, limb ownership, hand and prop readability.
3. Speaker eye-line, bubble ownership, and face readability.
4. Existing explicit camera, composition, and setting continuity.
5. Optional cinematic technique.

Techniques may affect only camera-space layering, physically motivated lighting or shadows, background atmosphere, or edge-localized optics. They must never:

- invent, clone, merge, reflect as an additional person, or change the cast;
- cover, duplicate, refract, blur, or mirror faces, hands, speech bubbles, titles, watermarks, or story-critical props;
- replace the physical setting with abstract VFX;
- add grain, glitter, floating dust, arbitrary flare, random readable text, or texture noise;
- rotate a document, screen, sign, or functional surface toward the viewer;
- override a close-up, hand-detail, direct-address, or other explicit camera requirement.

## Prompt-Budget Contract

- Preserve the existing ChatGPT Web-copy soft budget of 15,000 characters.
- Do not append technique instructions to panel prompts.
- Replace only a designated existing generic cinematography slot.
- Every technique fragment must be no longer than the baseline text it replaces.
- Build both baseline and candidate final prompts with identical content inputs.
- Accept the candidate only when `candidate.length <= baseline.length`; otherwise return the exact baseline prompt.
- Unused techniques and the technique catalog add zero characters to four-panel API, Gemini, ChatGPT Web-copy, and single-image prompts.

## Files and Interfaces

- Create `src/lib/cinematic-techniques.js` for the immutable registry and pure selection/application helpers.
- Modify `src/lib/prompt-assembler.js` to select at page level, reserve no more than two panel applications, and enforce the final baseline-length comparison.
- Modify `src/lib/single-image-prompt.js` only through the same shared helper and a single fixed-size cinematography slot.
- Modify the provider-specific prompt builders only where needed to expose the existing generic slot; do not duplicate eligibility or quality rules.
- Add focused tests in `tests/cinematic-techniques.test.mjs` and extend `tests/prompt-budget.test.mjs` and relevant prompt synchronization tests.
- Update `README.md` with the automatic, conditional, fail-closed behavior and its limits. Do not change the version or ChangeLog for this local-only work.

## Failure Handling

Any unknown technique, malformed panel, ambiguous cue, explicit-camera conflict, readability conflict, per-page limit violation, provider mismatch, or prompt-length increase fails closed to the existing baseline prompt. Failure does not block image generation and does not expose internal technique IDs in user-visible prompt text.

## Verification and Acceptance

### Automated

- RED then GREEN focused selector tests for every technique, risk tier, conflict, page limit, deterministic tie, and baseline fallback.
- Exact no-op equality when no technique is eligible.
- Exact `candidate.length <= baseline.length` checks for ChatGPT four-panel, Gemini four-panel, ChatGPT Web-copy, and single-image paths.
- Existing dialogue, camera, composition, script-lock, anatomy, provider-routing, and prompt-budget tests remain green.
- Full Node test suite, zero-warning ESLint, production build, pre-deploy check, and `git diff --check` pass.

### Real local API images

1. Generate one fresh four-panel API image whose scenario naturally qualifies for at least one low-risk technique. Inspect the assembled prompt to confirm the selected physical technique and absence of catalog leakage, then inspect the output for story/cast/dialogue/anatomy preservation and visible depth improvement.
2. Generate one fresh single-image result through the API-capable route using the exact copy-button prompt. Confirm one eligible technique, no prompt-budget regression, no cast or anatomy regression, and visible depth or lighting improvement.
3. Use the local in-app browser on port 5173. Credentials, if needed, are entered manually in the UI; no key value is read, printed, logged, serialized, or written to files.

An automated pass without both fresh API images is not completion evidence. A generated image with a visible regression is a failed verification and must not be described as a quality improvement.
