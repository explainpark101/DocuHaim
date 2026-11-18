import { findFileTab, type WorkspaceTabsState } from '@/utils/workspaceTabs';
import {
  isLlmAssistReferenceableFileName,
  truncateLlmAssistFileReferenceText,
} from '@/utils/llm/llmAssistChatReferences';

export type LlmAssistFileTextSource = {
  storageType: string;
  path: string;
  name?: string;
};

type ReadBackend = {
  readText?: (path: string) => Promise<{ text?: string } | string | null | undefined>;
};

/**
 * Prefer open tab editor buffer, then vault backend.readText.
 */
export async function resolveLlmAssistFileReferenceText({
  source,
  tabsState,
  getBackendForType,
}: {
  source: LlmAssistFileTextSource;
  tabsState?: WorkspaceTabsState | null;
  getBackendForType?: ((storageType: string) => ReadBackend | null | undefined) | null;
}): Promise<{ text: string; fileName: string } | null> {
  const storageType = String(source.storageType || '').trim();
  const path = String(source.path || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .trim();
  if (!storageType || !path) return null;

  const fileName =
    String(source.name || '').trim() ||
    path.split('/').filter(Boolean).pop() ||
    path;
  if (!isLlmAssistReferenceableFileName(fileName)) return null;

  if (tabsState) {
    try {
      const tab = findFileTab(tabsState, storageType, path);
      if (tab && typeof tab.editorContent === 'string') {
        const { text } = truncateLlmAssistFileReferenceText(tab.editorContent);
        if (text.trim()) return { text, fileName };
      }
    } catch {
      // fall through to backend
    }
  }

  const backend = getBackendForType?.(storageType) ?? null;
  if (!backend?.readText) return null;
  try {
    const result = await backend.readText(path);
    const raw =
      typeof result === 'string'
        ? result
        : result && typeof result === 'object' && typeof result.text === 'string'
          ? result.text
          : '';
    const { text } = truncateLlmAssistFileReferenceText(raw);
    if (!text.trim()) return null;
    return { text, fileName };
  } catch {
    return null;
  }
}
