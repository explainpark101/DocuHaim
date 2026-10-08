import {
  askNoteContentConflict,
  type NoteContentConflictChoice,
} from '@/utils/noteContentConflict';
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

export type ResolveOpenTextAskConflict = (params: {
  fileName: string;
  filePath: string;
  localText: string;
  serverText: string;
  localLabel?: string;
  serverLabel?: string;
  message?: string;
}) => Promise<NoteContentConflictChoice>;

/**
 * Resolve server/disk text against an open dirty tab and/or IndexedDB last-viewed draft.
 * When local and server bodies differ, ask which version to keep (git-diff modal).
 */
export async function resolveOpenTextContent(params: {
  serverText: string;
  serverLastModTs: number;
  existingTab: FileWorkspaceTab | null | undefined;
  draft: { content: string; originalLastModified: number } | null | undefined;
  fileName: string;
  filePath: string;
  localLabel?: string;
  serverLabel?: string;
  deleteDraft: () => Promise<void>;
  askConflict?: ResolveOpenTextAskConflict;
}): Promise<ResolveOpenTextResult> {
  const {
    serverText,
    serverLastModTs,
    existingTab,
    draft,
    fileName,
    filePath,
    localLabel = '마지막에 본 내용',
    serverLabel = '서버/디스크 내용',
    deleteDraft,
    askConflict = askNoteContentConflict,
  } = params;

  const existingViewer =
    typeof existingTab?.currentFile?.viewer === 'string'
      ? existingTab.currentFile.viewer
      : null;

  // Loading shells must not win (may hold poisoned bodies from another file).
  // Prefer dirty in-memory tab, else last-viewed draft.
  let localContent: string | null = null;
  let localLastMod = 0;
  let fromDirtyTab = false;

  if (existingTab && existingViewer !== 'loading' && isFileTabDirty(existingTab)) {
    localContent = existingTab.editorContent;
    localLastMod = lastModToTs(existingTab.currentFile.lastModified);
    fromDirtyTab = true;
  } else if (draft && typeof draft.content === 'string') {
    localContent = draft.content;
    localLastMod = draft.originalLastModified ?? 0;
  }

  if (localContent == null) {
    return { contentToUse: serverText, baselineContent: serverText, deletedDraft: false };
  }

  if (localContent === serverText) {
    await deleteDraft();
    return { contentToUse: serverText, baselineContent: serverText, deletedDraft: true };
  }

  const serverNewer = serverLastModTs > localLastMod;
  const message = serverNewer
    ? '서버/디스크가 더 최신입니다. 어떤 버전을 사용할지 선택하세요.'
    : '마지막으로 본 내용과 서버/디스크 버전이 다릅니다. 어떤 버전을 사용할지 선택하세요.';

  const choice = await askConflict({
    fileName,
    filePath,
    localText: localContent,
    serverText,
    localLabel,
    serverLabel,
    message,
  });

  if (choice === 'server') {
    await deleteDraft();
    return { contentToUse: serverText, baselineContent: serverText, deletedDraft: true };
  }

  // Keep last-viewed / dirty local. Baseline = server so the tab stays dirty until saved.
  if (fromDirtyTab && existingTab) {
    return {
      contentToUse: localContent,
      baselineContent: serverText,
      deletedDraft: false,
    };
  }

  return {
    contentToUse: localContent,
    baselineContent: serverText,
    deletedDraft: false,
  };
}
