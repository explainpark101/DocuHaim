import type { Transition } from 'motion/react';

/** Instant (manual resize handle / reduced motion). */
export const CHAT_COMPOSER_HEIGHT_INSTANT: Transition = { duration: 0 };

/**
 * Shared height spring for the composer dock and editor wrap.
 * Matches chat rail / export-pdf docks — soft settle, no bounce.
 */
export const CHAT_COMPOSER_HEIGHT_SPRING: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 38,
  mass: 0.85,
};
