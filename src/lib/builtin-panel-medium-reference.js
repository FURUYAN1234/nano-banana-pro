import imageUrl from '../assets/panel-media.png?inline';
import { selectPanelMediumStyles } from './panel-medium-reference.js';

// Static visual vocabulary: generated once, with no extra generation per page.
// Its anonymous subject is excluded from character/material identity by the role manifest.
export function getBuiltinPanelMediumReference(options) {
  const styles = selectPanelMediumStyles(options);
  return styles.length ? { imageUrl, styles } : null;
}
