const FIT_ATTR = 'data-print-mermaid-fit';

function clearMermaidFit(host: HTMLElement): void {
  host.style.transform = '';
  host.style.transformOrigin = '';
  host.style.marginRight = '';
  host.style.marginBottom = '';
  host.style.maxWidth = '';
  host.style.width = '';
  host.removeAttribute(FIT_ATTR);
}

/** Scale oversized Mermaid hosts into the print max box (transform + negative margins). */
export function applyPrintMermaidFit(
  root: HTMLElement,
  maxW: number,
  maxH: number,
): void {
  if (maxW < 1 || maxH < 1) return;

  const hosts = [
    ...root.querySelectorAll<HTMLElement>('.md-editor-mermaid[data-processed]'),
  ];
  for (const host of hosts) {
    clearMermaidFit(host);
    const svg = host.querySelector('svg');
    const naturalWidth = Math.max(
      host.scrollWidth,
      host.offsetWidth,
      svg?.getBoundingClientRect().width ?? 0,
    );
    const naturalHeight = Math.max(
      host.scrollHeight,
      host.offsetHeight,
      svg?.getBoundingClientRect().height ?? 0,
    );
    if (naturalWidth < 1 || naturalHeight < 1) continue;

    const scale = Math.min(maxW / naturalWidth, maxH / naturalHeight, 1);
    if (scale >= 0.999) {
      host.setAttribute(FIT_ATTR, '1');
      continue;
    }

    host.style.transformOrigin = 'top left';
    host.style.transform = `scale(${scale})`;
    host.style.marginRight = `${-Math.round(naturalWidth * (1 - scale))}px`;
    host.style.marginBottom = `${-Math.round(naturalHeight * (1 - scale))}px`;
    host.setAttribute(FIT_ATTR, String(Number(scale.toFixed(4))));
  }
}
