declare module 'pagedjs' {
  export type PagedJsFlow = {
    total: number;
    pages: unknown[];
    performance: number;
    size?: unknown;
  };

  export class Previewer {
    constructor(options?: Record<string, unknown>);
    /** Pass a live HTMLElement (not innerHTML). Often the same node for content and renderTo. */
    preview(
      content: HTMLElement,
      stylesheets?: unknown[],
      renderTo?: HTMLElement,
    ): Promise<PagedJsFlow>;
  }
}
