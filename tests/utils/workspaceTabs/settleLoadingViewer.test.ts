import { describe, expect, it } from 'vitest';
import { flushEditorIntoActiveFileTab } from '@/utils/workspaceTabs/appBridge';
import { createFileTab } from '@/utils/workspaceTabs/helpers';
import { createSingleLeafLayout } from '@/utils/workspaceTabs/paneLayout';
import { viewerAfterLoadingSettle } from '@/utils/workspaceTabs/settleLoadingViewer';
import type { WorkspaceTabsState } from '@/utils/workspaceTabs/types';

describe('viewerAfterLoadingSettle', () => {
  it('keeps markdown when parked body is present', () => {
    expect(
      viewerAfterLoadingSettle({
        path: 'notes/a.md',
        name: 'a.md',
        keptContent: '# parked',
      }),
    ).toBe('markdown');
  });

  it('treats .md paths as markdown even with empty body', () => {
    expect(
      viewerAfterLoadingSettle({ path: 'notes/a.md', name: 'a.md', keptContent: '' }),
    ).toBe('markdown');
    expect(
      viewerAfterLoadingSettle({
        path: 'notes/a.markdown',
        name: 'a.markdown',
        keptContent: '',
      }),
    ).toBe('markdown');
  });

  it('treats extension-less notes as markdown', () => {
    expect(
      viewerAfterLoadingSettle({ path: 'notes/readme', name: 'readme', keptContent: '' }),
    ).toBe('markdown');
  });

  it('marks unknown binaries as unsupported when empty', () => {
    expect(
      viewerAfterLoadingSettle({ path: 'bin/a.png', name: 'a.png', keptContent: '' }),
    ).toBe('unsupported');
  });
});

describe('flushEditorIntoActiveFileTab loading shells', () => {
  it('does not wipe parked loading-shell body with empty mirrors', () => {
    const tab = createFileTab({
      storageType: 'local',
      path: 'a.md',
      currentFile: {
        type: 'local',
        id: 'a.md',
        name: 'a.md',
        viewer: 'loading',
        content: '# parked',
      },
      editorContent: '# parked',
    });
    const leaf = createSingleLeafLayout([tab.id], tab.id);
    const state: WorkspaceTabsState = {
      tabs: [tab],
      activeId: tab.id,
      layout: leaf,
      focusedPaneId: leaf.id,
    };
    const next = flushEditorIntoActiveFileTab(state, {
      editorContent: '',
      currentFile: null,
      editedFileName: '',
    });
    const active = next.tabs[0];
    expect(active && active.kind === 'file' ? active.editorContent : null).toBe('# parked');
    expect(
      active && active.kind === 'file' ? active.currentFile?.viewer : null,
    ).toBe('loading');
  });
});
