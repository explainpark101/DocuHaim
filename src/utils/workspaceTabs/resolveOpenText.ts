import { isFileTabDirty, type FileWorkspaceTab } from '@/utils/workspaceTabs/index';

function lastModToTs(value: unknown): number {
  if (value instanceof Date) return value.getTime();
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value) {
    const t = new Date(value).getTime();
    return Number.isFinite(t) ? t : 0;
  }
  return 0;
}

export type ResolveOpenTextResult = {
  contentToUse: string;
  /** Baseline for dirty compare (stored as currentFile.content). */
  baselineContent: string;
  deletedDraft: boolean;
};

/**
 * Resolve server/disk text against an open dirty tab and/or IndexedDB draft.
 */
export async function resolveOpenTextContent(params: {
  serverText: string;
  serverLastModTs: number;
  existingTab: FileWorkspaceTab | null | undefined;
  draft: { content: string; originalLastModified: number } | null | undefined;
  confirmMessage: string;
  deleteDraft: () => Promise<void>;
}): Promise<ResolveOpenTextResult> {
  const { serverText, serverLastModTs, existingTab, draft, confirmMessage, deleteDraft } = params;

  if (existingTab && isFileTabDirty(existingTab)) {
    const tabLm = lastModToTs(existingTab.currentFile.lastModified);
    if (serverLastModTs > tabLm) {
      const useServer = window.confirm(confirmMessage);
      if (useServer) {
        await deleteDraft();
        return { contentToUse: serverText, baselineContent: serverText, deletedDraft: true };
      }
      return {
        contentToUse: existingTab.editorContent,
        baselineContent: existingTab.baselineContent,
        deletedDraft: false,
      };
    }
    return {
      contentToUse: existingTab.editorContent,
      baselineContent: existingTab.baselineContent,
      deletedDraft: false,
    };
  }

  if (draft) {
    if (serverLastModTs > draft.originalLastModified) {
      const useServer = window.confirm(confirmMessage);
      if (useServer) {
        await deleteDraft();
        return { contentToUse: serverText, baselineContent: serverText, deletedDraft: true };
      }
      return {
        contentToUse: draft.content,
        baselineContent: draft.content,
        deletedDraft: false,
      };
    }
    return {
      contentToUse: draft.content,
      baselineContent: draft.content,
      deletedDraft: false,
    };
  }

  return { contentToUse: serverText, baselineContent: serverText, deletedDraft: false };
}
