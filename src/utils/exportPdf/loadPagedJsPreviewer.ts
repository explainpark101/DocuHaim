/**
 * Load paged.js Previewer and register the code-block break-token Handler.
 */

import { createExportPdfCodeBreakHandler } from '@/utils/exportPdf/pagedJsCodeBreakHandler';

type PagedPreviewerCtor = new () => {
  preview: (
    content?: HTMLElement | DocumentFragment | string | null,
    stylesheets?: Array<string | Record<string, string>> | null,
    renderTo?: HTMLElement | null,
  ) => Promise<{ total?: number }>;
  polisher?: { destroy?: () => void };
};

let handlerRegistered = false;

export async function loadPagedJsPreviewer(): Promise<PagedPreviewerCtor> {
  const mod = await import('pagedjs');
  if (!handlerRegistered) {
    const ExportPdfCodeBreakHandler = createExportPdfCodeBreakHandler(mod.Handler);
    mod.registerHandlers(ExportPdfCodeBreakHandler);
    handlerRegistered = true;
  }
  return mod.Previewer as PagedPreviewerCtor;
}
