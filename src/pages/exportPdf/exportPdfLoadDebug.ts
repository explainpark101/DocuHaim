const PREFIX = '[ExportPDF:load]';

/** Detailed load-pipeline tracing for Export PDF (console.debug). */
export function exportPdfLoadDebug(
  phase: string,
  detail?: Record<string, unknown>,
): void {
  if (detail != null) {
    console.debug(PREFIX, phase, detail);
    return;
  }
  console.debug(PREFIX, phase);
}

export function exportPdfLoadDebugElapsed(
  phase: string,
  startedAt: number,
  detail?: Record<string, unknown>,
): void {
  exportPdfLoadDebug(phase, {
    ...detail,
    elapsedMs: Math.round(Date.now() - startedAt),
  });
}
