/**
 * Regression: canonical taxonomy paths resolve after Phase 0 stub removal.
 */
import { describe, expect, it } from 'vitest';

describe('refactor canonical module paths', () => {
  it('loads shared modals from components/shared/modals', async () => {
    const confirm = await import('@/components/shared/modals/ConfirmModal');
    const modal = await import('@/components/shared/modals/Modal');
    expect(typeof confirm.ConfirmModal).toBe('function');
    expect(typeof modal.default).toBe('function');
  });

  it('loads shell UI from components/shell', async () => {
    const sidebar = await import('@/components/shell/Sidebar');
    const editorPane = await import('@/components/shell/EditorPane');
    expect(typeof sidebar.default).toBe('function');
    expect(typeof editorPane.default).toBe('function');
  });

  it('loads vault utils from utils/vault', async () => {
    const s3Tree = await import('@/utils/vault/s3Tree');
    const session = await import('@/utils/vault/sessionWorkspace');
    expect(typeof s3Tree.buildS3Tree).toBe('function');
    expect(typeof session.SESSION_STORAGE_TYPE).toBe('string');
  });

  it('loads shared platform utils from utils/shared', async () => {
    const desktop = await import('@/utils/shared/isDesktopApp');
    const haptic = await import('@/utils/shared/hapticFeedback');
    expect(typeof desktop.isDesktopApp).toBe('function');
    expect(typeof haptic.vibrateLongPressAction).toBe('function');
  });

  it('loads editor and llm modules from taxonomy folders', async () => {
    const md = await import('@/components/editor/MarkdownEditor');
    const llm = await import('@/components/llm/LlmAssistModal');
    expect(typeof md.default).toBe('function');
    expect(typeof llm.default).toBe('function');
  });
});
