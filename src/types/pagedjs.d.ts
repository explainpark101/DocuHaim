declare module 'pagedjs' {
  export type PagedJsFlow = {
    total: number;
    pages: unknown[];
    performance: number;
    size?: unknown;
  };

  export class Previewer {
    constructor(options?: Record<string, unknown>);
    preview(
      content?: HTMLElement | DocumentFragment,
      stylesheets?: unknown[],
      renderTo?: HTMLElement,
    ): Promise<PagedJsFlow>;
  }
}
