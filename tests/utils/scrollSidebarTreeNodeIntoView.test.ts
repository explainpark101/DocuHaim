import { afterEach, describe, expect, it, vi } from 'vitest';
import { scrollSidebarTreeNodeIntoView } from '@/utils/scrollSidebarTreeNodeIntoView';

describe('scrollSidebarTreeNodeIntoView', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('scrolls the matching tree row into view', async () => {
    const scrollIntoView = vi.fn();
    const row = {
      scrollIntoView,
    };
    const root = {
      querySelector: (sel: string) =>
        sel.includes('data-tree-path') ? row : null,
    };
    vi.stubGlobal('document', {
      querySelector: (sel: string) =>
        sel.includes('data-sidebar-tree-scroll') ? root : null,
    });
    vi.stubGlobal('CSS', { escape: (s: string) => s });
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });

    scrollSidebarTreeNodeIntoView('idb', 'folder/a.md', {
      attempts: 2,
      behavior: 'instant',
    });

    expect(scrollIntoView).toHaveBeenCalledWith({
      block: 'nearest',
      behavior: 'instant',
    });
  });

  it('no-ops when path is empty', () => {
    const querySelector = vi.fn();
    vi.stubGlobal('document', { querySelector });
    scrollSidebarTreeNodeIntoView('idb', '');
    expect(querySelector).not.toHaveBeenCalled();
  });
});
