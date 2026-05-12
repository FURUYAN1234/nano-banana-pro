---
name: nano-banana-protocol
description: Applies Nano Banana Pro's ultra-compressed 'Clean Cel-Look Protocol' and 'Comedy Structure Engineering' for high-quality, 4-panel manga generation and prompting.
---

# Nano Banana Protocol

This skill provides the exact prompt engineering techniques used in Nano Banana Pro to achieve stable, high-quality anime-style image generation and robust comedy scenario structuring. It is designed to overcome "Generic AI Face", visual noise, and boring narratives.

## 1. Clean Cel-Look Protocol (Image Generation)
When generating images (especially via DALL-E 3 or gpt-image-2), append these ultra-compressed constraints to avoid the "Generic AI Face", camouflage effects, and noise:
- **Mandatory Highlights:** "catchlight in eyes, anime hair shine band (angel ring)"
- **Separation & Silhouette:** "Clear silhouettes, distinct physical separation, 3px thick black ink outline for foreground characters, 1px for background"
- **Color & Lighting:** "Rich 2-tone cel-shading with shadow layers (base + darker shadow tone), vivid base colors, warm pink-brown skin shadows (NOT grey), intentional negative space, 2-3px white compositing glow around character, radial backlighting"
- **Anti-Noise (Safe Rendering):** "smooth cel shading, clean color surfaces, low texture density. NO film grain, NO ultra-detailed, NO sparkling particles (use soft glow instead)."

## 2. Standing Pose Enhancement (Postural Fixes)
To prevent unnatural leg generation and posture issues in full-body shots (Introduced in v3.25-alpha):
- "contrapposto weight-shift" (コントラポストによる体重移動による自然な立ち姿)
- "keeping toes aligned together" (足先を揃えることで足元の破綻を防止)

## 3. Comedy Structure Engineering (Scenario Generation)
When generating scenarios or comic scripts, enforce this structural methodology to ensure comedic rhythm:
1. **Setup (フリ):** Establish the normal situation or premise.
2. **Deviation/Gap (ボケ):** Introduce absurdity, exaggeration, or tension.
3. **Punchline (ツッコミ/オチ):** Deliver the comedic release using one of 6 patterns (Explosion, Surreal Silence, Social Death, Self-Contained, Reversal, Repetition Escalation).
4. **Visual Gag Mapping:** Map narrative gaps to visual exaggerations (e.g., CHIBI_GAG, GEKIGA, BLANK) to maximize the comedic impact visually.

## Usage
Apply these rules whenever the user asks to generate manga scenarios, design characters, or write image generation prompts for anime/cel-style art.
