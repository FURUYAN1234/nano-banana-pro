export const HAND_PROP_KINEMATICS_LOCK = 'HAND / PROP KINEMATICS LOCK: For each panel, solve Action as a constraint graph. Before projection assign every actor two shoulder-connected anatomical LEFT and RIGHT arms/hands; side is subject-relative, not viewer-left/viewer-right, and never swaps. Enforce one simultaneous role/contact per hand. For sequence show the final described state; released objects remain physically supported. If Action overbooks more than two hand roles, explicit LEFT/RIGHT and latest final-state roles win: an earlier or unsided hand gesture is completed or omitted from the visible instant. Never add a third hand to preserve every verb. Keep one owning actor per prop/contact unless explicit transfer/share; never cross ownership between characters/bodies. Two-sided props may have a display/readable front and a separate working rear. When Action is opening/adjusting/deploying a rear mechanism, expose that rear to its operator; when Action presents/displays the prop, expose its front to the recipient. Palm, thumb, finger, wrist, forearm must match side, contact, prop facing, camera. Strong foreshortening is allowed; near lens show enough wrist/forearm connection to read ownership, without flattening the pose. Final: two connected arms/hands per actor; no extra, missing, merged, detached, mirrored, backward, invented hand/gesture.';

export const HAND_PROP_KINEMATICS_LOCK_COMPACT = 'HAND / PROP KINEMATICS LOCK: anatomical LEFT and RIGHT are subject-relative, not viewer-left/viewer-right. Enforce one simultaneous role/contact per hand; one owning actor per prop; never cross ownership between characters. Show final described state; overbooked: final explicit sides only; never third hand. Released objects remain physically supported. Palm, thumb, finger, wrist fit contact/camera. Two connected arms/hands only; no extra, merged, mirrored or malformed limbs.';

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
