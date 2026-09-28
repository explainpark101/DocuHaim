import { TaskList } from '@tiptap/extension-list';
import { parseIndentedBlocks } from '@tiptap/core';
import {
  taskItemAttrsFromMarker,
  type TaskCheckboxKind,
  type TaskCheckboxStatus,
} from '@/utils/taskCheckboxStatus';

const TASK_LINE_START = /^\s*[-+*]\s+\[([ xX~])\]\s+/;
const TASK_ITEM_PATTERN = /^(\s*)([-+*])\s+\[([ xX~])\]\s+(.*)$/;

type TaskItemExtract = {
  indentLevel: number;
  mainContent: string;
  checked: boolean;
  status: TaskCheckboxStatus;
  kind: TaskCheckboxKind;
};

function extractFromMatch(match: RegExpMatchArray): TaskItemExtract {
  const attrs = taskItemAttrsFromMarker(match[3]);
  return {
    indentLevel: match[1]?.length ?? 0,
    mainContent: match[4] ?? '',
    checked: attrs.checked,
    status: attrs.status,
    kind: attrs.kind,
  };
}

function createTaskItemToken(
  data: TaskItemExtract,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lexer: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nestedTokens?: any[],
) {
  return {
    type: 'taskItem',
    raw: '',
    mainContent: data.mainContent,
    indentLevel: data.indentLevel,
    checked: data.checked,
    status: data.status,
    kind: data.kind,
    text: data.mainContent,
    tokens: lexer.inlineTokens(data.mainContent),
    nestedTokens,
  };
}

/**
 * Task list tokenizer that recognizes `[ ]` / `[~]` / `[x]`.
 */
export const HaimTaskList = TaskList.extend({
  markdownTokenizer: {
    name: 'taskList',
    level: 'block',
    start(src: string) {
      const index = src.match(TASK_LINE_START)?.index;
      return index !== undefined ? index : -1;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tokenize(src: string, _tokens: any, lexer: any) {
      const parseTaskListContent = (content: string) => {
        const nestedResult = parseIndentedBlocks(
          content,
          {
            itemPattern: TASK_ITEM_PATTERN,
            extractItemData: extractFromMatch,
            createToken: (data: TaskItemExtract, nestedTokens?: any[]) =>
              createTaskItemToken(data, lexer, nestedTokens),
            customNestedParser: parseTaskListContent,
          },
          lexer,
        );
        if (nestedResult) {
          const taskListToken = {
            type: 'taskList',
            raw: nestedResult.raw,
            items: nestedResult.items,
          };
          const remainder = content.slice(nestedResult.raw.length);
          if (remainder.trim()) {
            return [taskListToken, ...lexer.blockTokens(remainder)];
          }
          return [taskListToken];
        }
        return lexer.blockTokens(content);
      };

      const result = parseIndentedBlocks(
        src,
        {
          itemPattern: TASK_ITEM_PATTERN,
          extractItemData: extractFromMatch,
          createToken: (data: TaskItemExtract, nestedTokens?: any[]) =>
            createTaskItemToken(data, lexer, nestedTokens),
          customNestedParser: parseTaskListContent,
        },
        lexer,
      );
      if (!result) return undefined;
      return {
        type: 'taskList',
        raw: result.raw,
        items: result.items,
      };
    },
  },
});

export default HaimTaskList;
