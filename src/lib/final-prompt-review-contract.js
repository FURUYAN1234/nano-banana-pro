import { extractBubbleContracts, extractPanelCastContracts } from './image-quality-qa.js';
import { isMonochromePrompt } from './manga-render-mode.js';

// The editable document sent to the API is authoritative. The STEP3 plan
// supplies geometry, never dialogue superseded by a user's final edits.
export function resolveFinalPromptReviewContract(prepared, prompt) {
  const frames = [...prompt.matchAll(/^\[PAGE FRAME P(\d+)\b[^\n]*\]\r?\n([\s\S]*?)^\[END PAGE FRAME P\1\]/gm)];
  if (frames.length !== prepared.plan.count || frames.some((m, i) => Number(m[1]) !== i + 1)) {
    throw new Error('編集後の最終プロンプトからコマ構造を確認できません。画像を保持し、自動品質検査は未確認にします。');
  }
  const shared = [...prompt.matchAll(/^Applies only to ([^:]+): ([^\n]*)/gm)];
  const dialogue = [];
  const source = { ...prepared.source, scenario: prompt,
    context: prompt.slice(0, frames[0].index), colorMode: isMonochromePrompt(prompt) ? 'monochrome' : 'color' };
  const panels = frames.map(([, number, body], i) => {
    const fields = body.match(/(?:Inside this frame — )?Camera: ([^\n]*?); Style: ([^\n]*?); Action: ([^\n]*)/);
    if (!fields) throw new Error(`${number}コマ目の編集後の構図・画風・動作を読み取れません。画像を保持して検査を未確認にします。`);
    const sharedRules = shared.filter(([, ids]) => ids.split(', ').includes(`P${number}`)).map(([, , rule]) => rule).join('\n');
    const contractText = `## Panel ${number}\n${body}\n${sharedRules}`;
    const bubbles = extractBubbleContracts(contractText)[0]?.bubbles || [];
    if (!bubbles.length && !/^Dialogue:\s*SILENT\s*$/m.test(body)) {
      throw new Error(`${number}コマ目の編集後の台詞を読み取れません。編集前の台詞で代用せず、画像を保持して検査を未確認にします。`);
    }
    const dialogueIds = bubbles.map(bubble => {
      const id = dialogue.length;
      dialogue.push({ id, sourcePanel: i + 1, speaker: bubble.speaker, text: bubble.text });
      return id;
    });
    return { ...prepared.plan.panels[i], camera: fields[1], action: fields[3], dialogueIds,
      reviewText: contractText, reviewStyle: fields[2] };
  });
  source.dialogue = dialogue;
  source.panels = panels.map((p, i) => ({ ...prepared.source.panels[i], text: p.reviewText,
    camera: p.camera, style: p.reviewStyle, dialogueIds: p.dialogueIds }));
  const plan = { ...prepared.plan, panels, expectedDialogue: dialogue,
    expectedCast: extractPanelCastContracts(panels.map(p => p.reviewText).join('\n')) };
  return { plan, source, finalPrompt: prompt };
}
