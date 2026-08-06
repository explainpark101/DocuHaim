declare module 'turndown' {
  export type Filter = string | string[] | ((node: HTMLElement) => boolean);

  export type ReplacementFunction = (
    content: string,
    node: HTMLElement,
    options: Record<string, unknown>,
  ) => string;

  export type Rule = {
    filter: Filter;
    replacement: ReplacementFunction;
  };

  export type Options = {
    headingStyle?: 'setext' | 'atx';
    codeBlockStyle?: 'indented' | 'fenced';
    bulletListMarker?: '-' | '+' | '*';
    emDelimiter?: '_' | '*';
    strongDelimiter?: '__' | '**';
    keepReplacement?: ReplacementFunction;
  };

  export default class TurndownService {
    constructor(options?: Options);
    addRule(key: string, rule: Rule): TurndownService;
    keep(filter: Filter): TurndownService;
    remove(filter: Filter): TurndownService;
    turndown(input: string | HTMLElement): string;
  }
}
