/** Shared class names for Chat with Myself Radix surfaces. */

export const chatSelectTriggerClass =
  'inline-flex max-w-full items-center justify-between gap-1 rounded-md border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-surface px-2 py-1 text-sm text-gray-800 dark:text-odp-fgStrong outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-50';

export const chatSelectContentClass =
  'z-100010 max-h-[min(280px,var(--radix-select-content-available-height))] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft';

export const chatSelectItemClass =
  'relative flex cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-focusBg';

export const chatMenuContentClass =
  'z-[220] min-w-[160px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft';

export const chatMenuItemClass =
  'flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-focusBg';

export const chatMenuDangerItemClass =
  'flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40';

export const chatDialogOverlayClass =
  'fixed inset-0 z-[200] bg-black/40';

export const chatDialogContentClass =
  'fixed left-1/2 top-1/2 z-[201] w-[min(92vw,360px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft';

export const chatSheetContentClass =
  'fixed inset-x-0 bottom-0 z-[201] w-full max-w-md rounded-t-2xl border border-gray-200 bg-white shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft sm:left-1/2 sm:bottom-auto sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl';

export const chatFieldInputClass =
  'w-full rounded-md border border-gray-300 bg-transparent px-2 py-1.5 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:text-odp-fgStrong';
