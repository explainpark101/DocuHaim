declare module 'pagedjs' {
  export type PagedFlow = {
    total?: number;
    pages?: unknown[];
    performance?: number;
    size?: unknown;
  };

  export class Previewer {
    constructor(options?: Record<string, unknown>);
    preview(
      content?: HTMLElement | DocumentFragment | string | null,
      stylesheets?: Array<string | Record<string, string>> | null,
      renderTo?: HTMLElement | null,
    ): Promise<PagedFlow>;
  }

  export class Handler {
    constructor(chunker: unknown, polisher: unknown, caller: unknown);
  }

  export function registerHandlers(...handlers: unknown[]): void;
}
