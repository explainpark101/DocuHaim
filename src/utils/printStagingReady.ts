/** True when staging preview is laid out enough for one-shot print packing. */
export function isPrintStagingReady(stagingRoot: HTMLElement): boolean {
  const preview = stagingRoot.querySelector('.md-editor-preview');
  if (!preview) return false;

  for (const img of stagingRoot.querySelectorAll('img')) {
    if (!img.complete) return false;
  }

  for (const block of stagingRoot.querySelectorAll('.md-editor-mermaid')) {
    if (block.querySelector('svg')) continue;
    if (block.getAttribute('data-processed') === 'true') continue;
    return false;
  }

  return true;
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
      if (isPrintStagingReady(stagingRoot)) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => resolve(true));
        });
        return;
      }
      if (attempt >= maxAttempts) {
        resolve(isPrintStagingReady(stagingRoot));
        return;
      }
      window.requestAnimationFrame(tick);
    };

    tick();
  });
}
