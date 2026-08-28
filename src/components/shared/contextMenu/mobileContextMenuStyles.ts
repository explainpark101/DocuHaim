/** Full-screen overlay for mobile context menus (above Modal z-100000). */
export const MOBILE_CONTEXT_MENU_OVERLAY_CLASS =
  'fixed inset-0 z-100010 bg-black/50';

/** Full-screen panel for mobile context menus. */
export const MOBILE_CONTEXT_MENU_PANEL_CLASS =
  'fixed inset-0 z-100010 flex flex-col bg-white outline-none dark:bg-odp-bgSoft';

/**
 * Desktop portaled context menu — above sidebar sticky section headers (z-9999)
 * and sticky tree folder rows (zIndex ~1000 - level).
 */
export const DESKTOP_CONTEXT_MENU_Z_CLASS = 'z-100010';

export const MOBILE_CONTEXT_MENU_ITEM_CLASS =
  'flex w-full items-center gap-2 px-3 py-3 text-left text-sm text-gray-700 outline-none hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-40 dark:text-odp-fg dark:hover:bg-odp-focusBg';

export const MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS =
  'flex w-full items-center gap-2 px-3 py-3 text-left text-sm text-red-600 outline-none hover:bg-red-50 disabled:pointer-events-none disabled:opacity-40 dark:text-red-400 dark:hover:bg-red-950/40';

export const MOBILE_CONTEXT_MENU_DISMISS_GUARD_MS = 450;
export const MOBILE_CONTEXT_MENU_POINTER_BLOCK_MS = 500;
