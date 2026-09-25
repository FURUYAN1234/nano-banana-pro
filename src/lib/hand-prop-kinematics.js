export const HAND_PROP_KINEMATICS_LOCK = 'HAND / PROP KINEMATICS LOCK: For each panel, solve Action as a constraint graph. Before projection assign every actor two shoulder-connected anatomical LEFT and RIGHT arms/hands; side is subject-relative, not viewer-left/viewer-right, and never swaps. Enforce one simultaneous role/contact per hand. For sequence show the final described state; released objects remain physically supported. If Action overbooks more than two hand roles, explicit LEFT/RIGHT and latest final-state roles win: an earlier or unsided hand gesture is completed or omitted from the visible instant. Never add a third hand to preserve every verb. Keep one owning actor per prop/contact unless explicit transfer/share; never cross ownership between characters/bodies. Two-sided props may have a display/readable front and a separate working rear. When Action is opening/adjusting/deploying a rear mechanism, expose that rear to its operator; when Action presents/displays the prop, expose its front to the recipient. Trace shoulder -> elbow -> wrist -> hand before drawing contact. Align the palm/dorsum plane, thumb side, finger curl and wrist to the actual contact target—the person, prop or support surface being touched; never reversed/mirrored at contact. Palm, thumb, finger, wrist, forearm must match side, contact, prop facing, camera. Strong foreshortening may enlarge the near hand but must compress, never lengthen, upper-arm and forearm segments; keep shoulder-elbow-wrist proportions plausible and connected. Final: two connected arms/hands per actor; no extra, missing, merged, detached, mirrored, backward, invented hand/gesture.';

export const HAND_PROP_KINEMATICS_LOCK_COMPACT = 'HAND / PROP KINEMATICS LOCK: anatomical LEFT and RIGHT subject-relative, not viewer-left/viewer-right. One simultaneous role/contact per hand; one owning actor per prop; never cross ownership between characters. Final described state; overbooked: final explicit sides only, never third hand. Trace shoulder>elbow>wrist>hand; palm/dorsum with thumb, finger and wrist aligned to actual contact target, never reversed/mirrored. Foreshortening enlarges near hand but compresses, never lengthens, upper/forearm; shoulder-elbow-wrist proportions plausible. Released objects remain physically supported.';

const UNSIDED_HAND_GESTURE_RE = /(?:指先|指で|片手|手で|腕で|指差|指し示|眼鏡.{0,12}(?:直|押さ|触))/u;

export const getPanelHandRoleResolution = (panelText = '') => {
  const action = String(panelText || '').match(/(?:状況|Action)\s*[:：]\s*([^\n]+)/i)?.[1] || String(panelText || '');
  const leftIndex = action.search(/左(?:手|腕)/u);
  const rightIndex = action.search(/右(?:手|腕)/u);
  if (leftIndex < 0 || rightIndex < 0) return '';

  const firstExplicitSide = Math.min(leftIndex, rightIndex);
  const earlierAction = action.slice(0, firstExplicitSide);
  if (!UNSIDED_HAND_GESTURE_RE.test(earlierAction)) return '';

  return 'HAND ROLE RESOLUTION: This Action overbooks one actor across an earlier unsided gesture plus explicit LEFT and RIGHT roles. Render the final explicit LEFT and RIGHT roles only; the earlier unsided gesture is completed and not visible. Never draw a third hand.';
};
