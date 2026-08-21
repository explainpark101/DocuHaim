type CoreState = {
    src: string;
    tokens: Token[];
    inlineMode?: boolean;
};

type Token = {
    type: string;
    tag: string;
    nesting: number;
    content: string;
    children?: Token[] | null;
    markup?: string;
    meta?: { label?: string; subId?: number };
};

type InlineState = {
    src: string;
    pos: number;
    posMax: number;
    push: (type: string, tag: string, nesting: number) => Token;
  };
  

type MarkdownItLike = {
    enable: (list: string | string[], ignoreInvalid?: boolean) => string[];
    block: {
      ruler: {
        at: (
          ruleName: string,
          rule: (
            startLine: number,
            endLine: number,
            silent: boolean,
          ) => boolean,
        ) => void;
      };
    };
    inline: {
      ruler: {
        before: (
          ruleName: string,
          ruleId: string,
          rule: (state: InlineState, silent: boolean) => boolean,
        ) => void;
      };
    };
    core: {
      ruler: {
        before: (ruleName: string, ruleId: string, rule: (state: CoreState) => void) => void;
        after: (ruleName: string, ruleId: string, rule: (state: CoreState) => void) => void;
        push: (ruleId: string, rule: (state: CoreState) => void) => void;
      };
    };
    renderer: {
      rules: Record<
        string,
        | ((
            tokens: Token[],
            idx: number,
            options?: unknown,
          ) => string)
        | undefined
      >;
    };
    renderInline: (src: string, env: unknown) => string;
};

const betterStrong = (
  state: InlineState,
  silent: boolean,
): boolean => {
  const pos = state.pos;
  const src = state.src;

  if (src.charCodeAt(pos) !== 0x2a) {
    return false;
  }

  if (src.charCodeAt(pos + 1) !== 0x2a) {
    return false;
  }

  const end = src.indexOf("**", pos + 2);

  if (end === -1) {
    return false;
  }

  if (silent) {
    return true;
  }

  const tokenOpen = state.push("strong_open", "strong", 1);
  tokenOpen.markup = "**";

  const tokenText = state.push("text", "", 0);
  tokenText.content = src.slice(pos + 2, end);

  const tokenClose = state.push("strong_close", "strong", -1);
  tokenClose.markup = "**";

  state.pos = end + 2;

  return true;
};

const betterMd = (md: MarkdownItLike): void => {
    md.inline.ruler.before(
        "emphasis",
        "better_strong",
        betterStrong,
    );
    
    md.renderer.rules.strong_open = () => "<b>";
    md.renderer.rules.strong_close = () => "</b>";
};

export default betterMd;