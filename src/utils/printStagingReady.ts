import { debugExportPdf } from '@/utils/printExportDebug';

export type PrintMermaidReadyMode = 'svg' | 'print-img';

/** Blockers for Mermaid hosts under a print root (staging or Paged.js clone). */
export function describePrintMermaidBlockers(
  root: ParentNode,
  mode: PrintMermaidReadyMode = 'svg',
): string[] {
  const blockers: string[] = [];
  let mermaidIndex = 0;

  if (mode === 'svg') {
    for (const block of root.querySelectorAll('.md-editor-mermaid')) {
      if (block.querySelector('svg')) {
        mermaidIndex += 1;
        continue;
      }
      if (block.getAttribute('data-haim-mermaid-error') === '1') {
        mermaidIndex += 1;
        continue;
      }
      blockers.push(`mermaid #${mermaidIndex} pending (no svg)`);
      mermaidIndex += 1;
    }
    return blockers;
  }

  for (const block of root.querySelectorAll('.md-editor-mermaid')) {
    const state = block.getAttribute('data-print-mermaid-canvas-state');
    if (state === 'img' || state === 'error') {
      mermaidIndex += 1;
      continue;
    }
    if (block.querySelector('img[data-print-mermaid-img]')) {
      mermaidIndex += 1;
      continue;
    }
    blockers.push(`mermaid #${mermaidIndex} not print-ready (state=${state ?? 'none'})`);
    mermaidIndex += 1;
  }

  let imgIndex = 0;
  for (const img of root.querySelectorAll('img[data-print-mermaid-img]')) {
    if (!(img instanceof HTMLElement)) continue;
    const box = img.getBoundingClientRect();
    if (box.width >= 1 && box.height >= 1) {
      imgIndex += 1;
      continue;
    }
    blockers.push(`mermaid img #${imgIndex} zero layout box`);
    imgIndex += 1;
  }

  return blockers;
}

/** Let the browser finish SVG/img layout before getBoundingClientRect-heavy work (Paged.js). */
export function waitForBrowserLayoutSettle(delayMs = 50): Promise<void> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.setTimeout(resolve, delayMs);
      });
    });
  });
}

/** Poll until Mermaid is SVG-ready or print-img-ready inside root. */
export function waitForPrintMermaidReady(
  root: HTMLElement,
  mode: PrintMermaidReadyMode = 'svg',
  maxAttempts = 24,
): Promise<boolean> {
  return new Promise((resolve) => {
    let attempt = 0;

    const tick = () => {
      attempt += 1;
      const blockers = describePrintMermaidBlockers(root, mode);
      const ready = blockers.length === 0;
      if (!ready && (attempt === 1 || attempt % 6 === 0 || attempt >= maxAttempts)) {
        debugExportPdf('staging-ready', `mermaid ${mode} attempt ${attempt}/${maxAttempts}`, {
          ready,
          blockers,
        });
      }
      if (ready) {
        void waitForBrowserLayoutSettle().then(() => resolve(true));
        return;
      }
      if (attempt >= maxAttempts) {
        debugExportPdf('staging-ready', `mermaid ${mode} timeout`, { blockers });
        resolve(false);
        return;
      }
      window.requestAnimationFrame(tick);
    };

    tick();
  });
}

/** Blockers keeping staging from print layout (for debug). */
export function describePrintStagingBlockers(stagingRoot: HTMLElement): string[] {
  const blockers: string[] = [];
  const preview = stagingRoot.classList.contains('md-editor-preview')
    ? stagingRoot
    : stagingRoot.querySelector('.md-editor-preview');
  if (!preview) blockers.push('no .md-editor-preview');

  for (const img of stagingRoot.querySelectorAll('img')) {
    if (!img.complete) blockers.push(`img loading: ${img.getAttribute('src')?.slice(0, 60) ?? '(no src)'}`);
  }

  blockers.push(...describePrintMermaidBlockers(stagingRoot, 'svg'));
  return blockers;
}

/** True when staging preview is laid out enough for one-shot print packing. */
export function isPrintStagingReady(stagingRoot: HTMLElement): boolean {
  return describePrintStagingBlockers(stagingRoot).length === 0;
}

/** Wait for images/mermaid, then two animation frames for fit hooks to settle. */
export function waitForPrintStagingReady(
  stagingRoot: HTMLElement,
  maxAttempts = 24,
): Promise<boolean> {
  return new Promise((resolve) => {
    let attempt = 0;

    const tick = () => {
      attempt += 1;
      const ready = isPrintStagingReady(stagingRoot);
      if (!ready && (attempt === 1 || attempt % 6 === 0 || attempt >= maxAttempts)) {
        debugExportPdf('staging-ready', `attempt ${attempt}/${maxAttempts}`, {
          ready,
          blockers: describePrintStagingBlockers(stagingRoot),
          mermaid: [...stagingRoot.querySelectorAll('.md-editor-mermaid')].map((el, i) => ({
            i,
            hasSvg: Boolean(el.querySelector('svg')),
            processed: el.getAttribute('data-processed'),
            error: el.getAttribute('data-haim-mermaid-error'),
          })),
        });
      }
      if (ready) {
        debugExportPdf('staging-ready', 'ready', { attempt });
        void waitForBrowserLayoutSettle().then(() => resolve(true));
        return;
      }
      if (attempt >= maxAttempts) {
        debugExportPdf('staging-ready', 'timeout', {
          blockers: describePrintStagingBlockers(stagingRoot),
        });
        resolve(false);
        return;
      }
      window.requestAnimationFrame(tick);
    };

    tick();
  });
}
