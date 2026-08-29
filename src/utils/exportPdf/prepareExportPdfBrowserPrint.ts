type StyleSnapshot = {
  el: HTMLElement;
  style: string | null;
};

const PREP_CLASS = 'export-pdf-printing';
const PREP_SELECTORS =
  '.export-pdf-layout, .export-pdf-page, .export-pdf-preview-scroll, .export-pdf-zoom-clip, .export-pdf-cover-stack';

let prepDepth = 0;
let snapshots: StyleSnapshot[] = [];

function applyPrep(): void {
  if (prepDepth === 0) {
    snapshots = [];
    document.documentElement.classList.add(PREP_CLASS);
    for (const el of document.querySelectorAll<HTMLElement>(PREP_SELECTORS)) {
      snapshots.push({ el, style: el.getAttribute('style') });
      el.style.removeProperty('height');
      el.style.removeProperty('max-height');
      el.style.removeProperty('min-height');
      el.style.removeProperty('zoom');
      el.style.removeProperty('overflow');
    }
  }
  prepDepth += 1;
}

function releasePrep(): void {
  if (prepDepth <= 0) return;
  prepDepth -= 1;
  if (prepDepth > 0) return;

  document.documentElement.classList.remove(PREP_CLASS);
  for (const { el, style } of snapshots) {
    if (!el.isConnected) continue;
    if (style == null) el.removeAttribute('style');
    else el.setAttribute('style', style);
  }
  snapshots = [];
}

/**
 * Strip preview-only zoom/clip inline styles before the browser print layout pass.
 * Returns a restore function (idempotent).
 */
export function prepareExportPdfBrowserPrint(): () => void {
  applyPrep();
  let released = false;
  return () => {
    if (released) return;
    released = true;
    releasePrep();
  };
}

/** Register global beforeprint/afterprint prep while Export PDF is mounted. */
export function mountExportPdfBrowserPrintPrep(): () => void {
  let restore: (() => void) | null = null;
  let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

  const clearFallback = () => {
    if (fallbackTimer != null) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
  };

  const onBeforePrint = () => {
    clearFallback();
    restore?.();
    restore = prepareExportPdfBrowserPrint();
    fallbackTimer = setTimeout(() => {
      restore?.();
      restore = null;
    }, 5000);
  };

  const onAfterPrint = () => {
    clearFallback();
    restore?.();
    restore = null;
  };

  window.addEventListener('beforeprint', onBeforePrint);
  window.addEventListener('afterprint', onAfterPrint);
  return () => {
    clearFallback();
    restore?.();
    restore = null;
    window.removeEventListener('beforeprint', onBeforePrint);
    window.removeEventListener('afterprint', onAfterPrint);
    releasePrep();
    document.documentElement.classList.remove(PREP_CLASS);
  };
}
