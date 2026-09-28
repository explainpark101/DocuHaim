import { TaskList } from '@tiptap/extension-list';
import { parseIndentedBlocks } from '@tiptap/core';
import {
  parseTaskCheckboxMarker,
  type TaskCheckboxStatus,
} from '@/utils/taskCheckboxStatus';

const TASK_LINE_START = /^\s*[-+*]\s+\[([ xX~])\]\s+/;
const TASK_ITEM_PATTERN = /^(\s*)([-+*])\s+\[([ xX~])\]\s+(.*)$/;

type TaskItemExtract = {
  indentLevel: number;
  mainContent: string;
  checked: boolean;
  status: TaskCheckboxStatus;
};

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
            extractItemData: (match: RegExpMatchArray): TaskItemExtract => {
              const status = parseTaskCheckboxMarker(match[3]);
              return {
                indentLevel: match[1]?.length ?? 0,
                mainContent: match[4] ?? '',
                checked: status === 'done',
                status,
              };
            },
            createToken: (data: TaskItemExtract, nestedTokens: unknown) => ({
              type: 'taskItem',
              raw: '',
              mainContent: data.mainContent,
              indentLevel: data.indentLevel,
              checked: data.checked,
              status: data.status,
              text: data.mainContent,
              tokens: lexer.inlineTokens(data.mainContent),
              nestedTokens,
            }),
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
          extractItemData: (match: RegExpMatchArray): TaskItemExtract => {
            const status = parseTaskCheckboxMarker(match[3]);
            return {
              indentLevel: match[1]?.length ?? 0,
              mainContent: match[4] ?? '',
              checked: status === 'done',
              status,
            };
          },
          createToken: (data: TaskItemExtract, nestedTokens: unknown) => ({
            type: 'taskItem',
            raw: '',
            mainContent: data.mainContent,
            indentLevel: data.indentLevel,
            checked: data.checked,
            status: data.status,
            text: data.mainContent,
            tokens: lexer.inlineTokens(data.mainContent),
            nestedTokens,
          }),
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
