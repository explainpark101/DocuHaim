import type { Modifier } from '@dnd-kit/core';

/** Keep sortable workspace tabs on a single horizontal row (no vertical drag shift). */
export const restrictToHorizontalAxis: Modifier = ({ transform }) => ({
  ...transform,
  y: 0,
});
