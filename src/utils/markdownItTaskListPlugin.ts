import type { MarkdownIt as MarkdownItInstance, StateCore, Token } from 'markdown-it';

type TaskListOptions = {
  enabled?: boolean;
  label?: boolean;
  labelAfter?: boolean;
};

function attrSet(token: Token, name: string, value: string): void {
  const index = token.attrIndex(name);
  const pair: [string, string] = [name, value];
  if (index < 0) {
    token.attrPush(pair);
    return;
  }
  token.attrs = token.attrs ?? [];
  token.attrs[index] = pair;
}

function isInline(token: Token | undefined): boolean {
  return token?.type === 'inline';
}

function isParagraphOpen(token: Token | undefined): boolean {
  return token?.type === 'paragraph_open';
}

function isListItemOpen(token: Token | undefined): boolean {
  return token?.type === 'list_item_open';
}

function isTaskItemContent(content: string): boolean {
  return (
    content.indexOf('[ ] ') === 0 ||
    content.indexOf('[x] ') === 0 ||
    content.indexOf('[X] ') === 0
  );
}

function isTaskItem(tokens: Token[], index: number): boolean {
  return (
    isInline(tokens[index]) &&
    isParagraphOpen(tokens[index - 1]) &&
    isListItemOpen(tokens[index - 2]) &&
    isTaskItemContent(tokens[index]?.content ?? '')
  );
}

function parentListTokenIndex(tokens: Token[], index: number): number {
  const targetLevel = (tokens[index]?.level ?? 0) - 1;
  for (let i = index - 1; i >= 0; i -= 1) {
    if (tokens[i]?.level === targetLevel) return i;
  }
  return -1;
}

function openLabelToken(TokenCtor: typeof Token): Token {
  const token = new TokenCtor('html_inline', '', 0);
  token.content = '<label>';
  return token;
}

function closeLabelToken(TokenCtor: typeof Token): Token {
  const token = new TokenCtor('html_inline', '', 0);
  token.content = '</label>';
  return token;
}

function labeledCheckboxToken(
  content: string,
  id: string,
  TokenCtor: typeof Token,
): Token {
  const token = new TokenCtor('html_inline', '', 0);
  token.content = `<label class="task-list-item-label" for="${id}">${content}</label>`;
  token.attrs = [['for', id]];
  return token;
}

function checkboxToken(
  inlineToken: Token,
  TokenCtor: typeof Token,
  options: TaskListOptions,
): Token {
  const token = new TokenCtor('html_inline', '', 0);
  const disabledAttr = options.enabled ? ' ' : ' disabled="" ';
  if (inlineToken.content.indexOf('[ ] ') === 0) {
    token.content = `<input class="task-list-item-checkbox"${disabledAttr}type="checkbox">`;
  } else {
    token.content = `<input class="task-list-item-checkbox" checked=""${disabledAttr}type="checkbox">`;
  }
  return token;
}

function decorateTaskItem(
  inlineToken: Token,
  state: StateCore,
  options: TaskListOptions,
): void {
  inlineToken.children = inlineToken.children ?? [];
  inlineToken.children.unshift(checkboxToken(inlineToken, state.Token, options));
  inlineToken.children[1]!.content = inlineToken.children[1]!.content.slice(3);
  inlineToken.content = inlineToken.content.slice(3);

  if (options.label) {
    if (options.labelAfter) {
      inlineToken.children.pop();
      const id = `task-item-${Math.ceil(Math.random() * (1e4 * 1e3) - 1e3)}`;
      inlineToken.children[0]!.content =
        `${inlineToken.children[0]!.content.slice(0, -1)} id="${id}">`;
      inlineToken.children.push(
        labeledCheckboxToken(inlineToken.content, id, state.Token),
      );
    } else {
      inlineToken.children.unshift(openLabelToken(state.Token));
      inlineToken.children.push(closeLabelToken(state.Token));
    }
  }
}

/**
 * GitHub-style task lists (`- [ ]` / `- [x]`), matching md-editor-rt preview HTML.
 */
export function markdownItTaskListPlugin(
  md: MarkdownItInstance,
  options: TaskListOptions = {},
): void {
  md.core.ruler.after('inline', 'github-task-lists', (state: StateCore) => {
    const tokens = state.tokens;
    for (let i = 2; i < tokens.length; i += 1) {
      if (!isTaskItem(tokens, i)) continue;
      decorateTaskItem(tokens[i]!, state, options);
      attrSet(
        tokens[i - 2]!,
        'class',
        `task-list-item${options.enabled ? ' enabled' : ''}`,
      );
      attrSet(
        tokens[parentListTokenIndex(tokens, i - 2)]!,
        'class',
        'contains-task-list',
      );
    }
  });
}
