const FIT_ATTR = 'data-print-table-fit';

function clearTableFit(table: HTMLTableElement): void {
  table.style.transform = '';
  table.style.transformOrigin = '';
  table.style.marginRight = '';
  table.style.marginBottom = '';
  table.style.maxWidth = '';
  table.removeAttribute(FIT_ATTR);
}

/**
 * Shrink tables wider than the print content box so they stay on-page.
 * Uses transform + negative margins so layout height/width match the scaled size.
 */
export function fitPrintTablesInRoot(root: HTMLElement, maxWidth: number): void {
  if (maxWidth < 1) return;

  const tables = [...root.querySelectorAll<HTMLTableElement>('table')];
  for (const table of tables) {
    clearTableFit(table);
    table.style.maxWidth = 'none';

    const naturalWidth = table.scrollWidth;
    const naturalHeight = table.offsetHeight;
    if (naturalWidth <= maxWidth + 1) {
      table.style.maxWidth = `${maxWidth}px`;
      table.setAttribute(FIT_ATTR, '1');
      continue;
    }

    const scale = Math.max(0.05, Math.min(1, maxWidth / naturalWidth));
    table.style.maxWidth = 'none';
    table.style.transformOrigin = 'top left';
    table.style.transform = `scale(${scale})`;
    table.style.marginRight = `${-Math.round(naturalWidth * (1 - scale))}px`;
    table.style.marginBottom = `${-Math.round(naturalHeight * (1 - scale))}px`;
    table.setAttribute(FIT_ATTR, String(Number(scale.toFixed(4))));
  }
}

export function clearPrintTableFitInRoot(root: HTMLElement): void {
  for (const table of root.querySelectorAll<HTMLTableElement>('table')) {
    clearTableFit(table);
  }
}
