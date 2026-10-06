import { describe, expect, it, vi } from 'vitest';
import { routePaneEditorChange } from '@/utils/workspaceTabs/routePaneEditorChange';

describe('routePaneEditorChange', () => {
  it('sends live edits to the active tab', () => {
    const onActiveChange = vi.fn();
    const onInactiveChange = vi.fn();
    routePaneEditorChange({
      paneTabId: 'tab-a',
      activeTabId: 'tab-a',
      value: 'from-a',
      onActiveChange,
      onInactiveChange,
    });
    expect(onActiveChange).toHaveBeenCalledWith('from-a');
    expect(onInactiveChange).not.toHaveBeenCalled();
  });

  it('does not stomp the new first leaf when a dismissed pane flushes', () => {
    const onActiveChange = vi.fn();
    const onInactiveChange = vi.fn();
    routePaneEditorChange({
      paneTabId: 'tab-b',
      activeTabId: 'tab-a',
      value: 'from-b',
      onActiveChange,
      onInactiveChange,
    });
    expect(onActiveChange).not.toHaveBeenCalled();
    expect(onInactiveChange).toHaveBeenCalledWith('tab-b', 'from-b');
  });
});
