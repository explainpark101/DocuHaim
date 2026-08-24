import { debugExportPdf } from '@/utils/printExportDebug';

/** Blockers keeping staging from print layout (for debug). */
export function describePrintStagingBlockers(stagingRoot: HTMLElement): string[] {
  const blockers: string[] = [];
  const preview = stagingRoot.querySelector('.md-editor-preview');
  if (!preview) blockers.push('no .md-editor-preview');

  for (const img of stagingRoot.querySelectorAll('img')) {
    if (!img.complete) blockers.push(`img loading: ${img.getAttribute('src')?.slice(0, 60) ?? '(no src)'}`);
  }

  let mermaidIndex = 0;
  for (const block of stagingRoot.querySelectorAll('.md-editor-mermaid')) {
    if (block.querySelector('svg')) {
      mermaidIndex += 1;
      continue;
    }
    if (block.getAttribute('data-processed') === 'true') {
      mermaidIndex += 1;
      continue;
    }
    blockers.push(`mermaid #${mermaidIndex} pending (no svg)`);
    mermaidIndex += 1;
  }

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
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => resolve(true));
        });
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
