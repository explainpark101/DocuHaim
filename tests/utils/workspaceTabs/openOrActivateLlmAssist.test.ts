import { describe, expect, it } from 'vitest';
import {
  countLeaves,
  emptyWorkspaceTabsState,
  findLeafContainingTab,
  isPaneSplit,
  LLM_ASSIST_TAB_ID,
  openOrActivateLlmAssist,
  openOrReplaceFileTab,
} from '@/utils/workspaceTabs';
import { createLlmAssistTab, isLlmAssistTab, tabDisplayTitle } from '@/utils/workspaceTabs/helpers';

describe('openOrActivateLlmAssist', () => {
  it('creates llm-assist tab and splits to workspace right edge', () => {
    let state = emptyWorkspaceTabsState();
    state = openOrReplaceFileTab(
      state,
      {
        storageType: 's3',
        path: 'note.md',
        currentFile: { name: 'note.md', content: 'hi', viewer: 'markdown', type: 's3', id: 'note.md' },
        editorContent: 'hi',
        editedFileName: 'note.md',
      },
      1,
    );

    const next = openOrActivateLlmAssist(state, 2);
    expect(next.tabs.some(isLlmAssistTab)).toBe(true);
    expect(next.activeId).toBe(LLM_ASSIST_TAB_ID);
    expect(countLeaves(next.layout)).toBe(2);
    expect(isPaneSplit(next.layout)).toBe(true);
    if (isPaneSplit(next.layout)) {
      expect(next.layout.direction).toBe('horizontal');
      const llmLeaf = findLeafContainingTab(next.layout, LLM_ASSIST_TAB_ID);
      expect(llmLeaf).toBeTruthy();
      // Right edge: LLM leaf is the second child of the root horizontal split.
      expect(next.layout.children[1]?.type).toBe('leaf');
      if (next.layout.children[1]?.type === 'leaf') {
        expect(next.layout.children[1].tabIds).toContain(LLM_ASSIST_TAB_ID);
      }
    }
  });

  it('reactivates existing llm-assist tab without creating another split', () => {
    let state = emptyWorkspaceTabsState();
    state = openOrReplaceFileTab(
      state,
      {
        storageType: 's3',
        path: 'a.md',
        currentFile: { name: 'a.md', content: '', viewer: 'markdown', type: 's3', id: 'a.md' },
        editorContent: '',
        editedFileName: 'a.md',
      },
      1,
    );
    state = openOrActivateLlmAssist(state, 2);
    const leavesAfterFirst = countLeaves(state.layout);
    const layoutAfterFirst = state.layout;

    // Activate a file tab, then reopen LLM assist.
    const fileId = state.tabs.find((t) => t.kind === 'file')?.id;
    expect(fileId).toBeTruthy();
    const reopened = openOrActivateLlmAssist(
      {
        ...state,
        activeId: fileId!,
      },
      3,
    );
    expect(reopened.activeId).toBe(LLM_ASSIST_TAB_ID);
    expect(countLeaves(reopened.layout)).toBe(leavesAfterFirst);
    expect(reopened.tabs.filter((t) => t.kind === 'llm-assist')).toHaveLength(1);
    // Same split tree identity when only activating.
    expect(reopened.layout).toEqual(layoutAfterFirst);
  });

  it('labels the singleton tab AI 도우미', () => {
    expect(tabDisplayTitle(createLlmAssistTab())).toBe('AI 도우미');
  });
});
