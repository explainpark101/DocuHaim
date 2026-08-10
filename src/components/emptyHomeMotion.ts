import type { Variants } from 'motion/react';

/** Shared empty-home cascade: brand → hint → menus dropping in. */
export const EMPTY_HOME_EASE = [0.22, 1, 0.36, 1] as const;

export const emptyHomeContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.06,
    },
  },
};

export const emptyHomeItemVariants: Variants = {
  hidden: { opacity: 0, y: -28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: EMPTY_HOME_EASE,
    },
  },
};

/** Nested stagger for SessionOpenPanel / fallback menu rows. */
export const emptyHomeMenuContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
