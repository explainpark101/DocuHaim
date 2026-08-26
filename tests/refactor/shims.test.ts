/**
 * Regression: after App.jsx cluster split + taxonomy moves, legacy import paths
 * must keep resolving via re-export shims.
 */
import { describe, expect, it } from 'vitest';

describe('refactor re-export shims', () => {
  it('re-exports shared modals from legacy components/modals paths', async () => {
    const confirm = await import('@/components/modals/ConfirmModal');
    const modal = await import('@/components/modals/Modal');
    expect(typeof confirm.ConfirmModal).toBe('function');
    expect(typeof modal.default).toBe('function');
  });

  it('re-exports shell UI from legacy component paths', async () => {
    const sidebar = await import('@/components/Sidebar');
    const editorPane = await import('@/components/EditorPane');
    expect(typeof sidebar.default).toBe('function');
    expect(typeof editorPane.default).toBe('function');
  });

  it('re-exports vault utils from legacy utils root paths', async () => {
    const s3Tree = await import('@/utils/s3Tree');
    const session = await import('@/utils/sessionWorkspace');
    expect(typeof s3Tree.buildS3Tree).toBe('function');
    expect(typeof session.SESSION_STORAGE_TYPE).toBe('string');
  });

  it('re-exports shared platform utils from legacy utils root paths', async () => {
    const desktop = await import('@/utils/isDesktopApp');
    const haptic = await import('@/utils/hapticFeedback');
    expect(typeof desktop.isDesktopApp).toBe('function');
    expect(typeof haptic.vibrateLongPressAction).toBe('function');
  });

  it('re-exports editor and llm entry modules from legacy paths', async () => {
    const md = await import('@/components/MarkdownEditor');
    const llm = await import('@/components/LlmAssistModal');
    expect(typeof md.default).toBe('function');
    expect(typeof llm.default).toBe('function');
  });
});
