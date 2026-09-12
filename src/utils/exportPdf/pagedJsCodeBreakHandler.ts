/**
 * paged.js Handler: fix break tokens when fenced code overflows a page.
 *
 * Registers on Chunker.hooks.onBreakToken (same hooks Layout uses), so it
 * applies to the live Previewer path — unlike patching a separate layout.js import.
 */

import { Handler } from 'pagedjs';
import {
  resolveCodeBreakTokenReplacement,
  type BreakTokenInput,
  type OverflowLike,
} from '@/utils/exportPdf/pagedJsBreakTokenPatch';

type HandlerCtor = new (
  chunker: unknown,
  polisher: unknown,
  caller: unknown,
) => Handler;

/**
 * Factory so we register a class that extends the runtime Handler from the
 * same pagedjs module graph as Previewer.
 */
export function createExportPdfCodeBreakHandler(
  HandlerBase: HandlerCtor,
): HandlerCtor {
  return class ExportPdfCodeBreakHandler extends HandlerBase {
    /**
     * Hook contract: return undefined to keep the engine token; return a
     * token object to replace it (see layout.js findBreakToken).
     */
    onBreakToken(
      breakToken: BreakTokenInput,
      overflow: OverflowLike | null | undefined,
      _rendered?: ParentNode | null,
    ) {
      const source = this.chunker?.source ?? null;
      return resolveCodeBreakTokenReplacement(breakToken, overflow, source);
    }
  };
}
