import { isEncMdPath } from '@/utils/encMd';
import {
  getDraftKey,
  getMemoDraft,
  saveMemoDraft,
  type MemoDraft,
} from '@/utils/memoDraftsDb';
import { SESSION_STORAGE_TYPE } from '@/utils/sessionWorkspace';
import { isFileTab } from '@/utils/workspaceTabs/helpers';
import {
  isEditableViewer,
  type FileWorkspaceTab,
  type WorkspaceTab,
} from '@/utils/workspaceTabs/types';

function lastModToTs(value: unknown): number {
  if (value instanceof Date) return value.getTime();
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value) {
    const t = new Date(value).getTime();
    return Number.isFinite(t) ? t : 0;
  }
  return 0;
}

export function canPersistLastViewedNote(params: {
  storageType: string;
  path: string;
  fileName?: string;
  viewer?: string | null;
}): boolean {
  const { storageType, path, fileName, viewer } = params;
  if (!storageType || !path) return false;
  if (storageType === SESSION_STORAGE_TYPE) return false;
  if (isEncMdPath(path) || (fileName && isEncMdPath(fileName))) return false;
  if (viewer === 'loading') return false;
  if (viewer != null && viewer !== '' && !isEditableViewer(viewer)) return false;
  return true;
}

export async function persistLastViewedNoteContent(params: {
  storageType: string;
  path: string;
  content: string;
  originalLastModified?: number;
  fileName?: string;
  viewer?: string | null;
}): Promise<void> {
  if (!canPersistLastViewedNote(params)) return;
  await saveMemoDraft({
    key: getDraftKey(params.storageType, params.path),
    content: typeof params.content === 'string' ? params.content : '',
    originalLastModified: params.originalLastModified ?? 0,
  });
}

export async function persistFileTabLastViewed(tab: FileWorkspaceTab): Promise<void> {
  const viewer =
    typeof tab.currentFile?.viewer === 'string' ? tab.currentFile.viewer : 'markdown';
  await persistLastViewedNoteContent({
    storageType: tab.storageType,
    path: tab.path,
    content: tab.editorContent ?? '',
    originalLastModified: lastModToTs(tab.currentFile?.lastModified),
    fileName: String(tab.currentFile?.name || tab.editedFileName || ''),
    viewer,
  });
}

/** Persist last-viewed bodies for all editable file tabs (split panes included). */
export async function persistOpenFileTabsLastViewed(
  tabs: WorkspaceTab[],
): Promise<void> {
  const jobs: Promise<void>[] = [];
  for (const tab of tabs) {
    if (!isFileTab(tab)) continue;
    jobs.push(persistFileTabLastViewed(tab));
  }
  await Promise.all(jobs);
}

export async function loadLastViewedNoteDraft(
  storageType: string,
  path: string,
): Promise<MemoDraft | null> {
  if (!storageType || !path) return null;
  if (isEncMdPath(path)) return null;
  return getMemoDraft(getDraftKey(storageType, path));
}

const debounceTimers = new Map<string, ReturnType<typeof setTimeout>>();

/** Debounced last-viewed persist (typing / inactive pane edits). */
export function schedulePersistLastViewedNoteContent(
  params: {
    storageType: string;
    path: string;
    content: string;
    originalLastModified?: number;
    fileName?: string;
    viewer?: string | null;
  },
  delayMs = 400,
): void {
  if (!canPersistLastViewedNote(params)) return;
  const key = getDraftKey(params.storageType, params.path);
  const prev = debounceTimers.get(key);
  if (prev) clearTimeout(prev);
  debounceTimers.set(
    key,
    setTimeout(() => {
      debounceTimers.delete(key);
      void persistLastViewedNoteContent(params);
    }, delayMs),
  );
}

export function flushScheduledLastViewedNotePersists(): void {
  for (const [key, timer] of debounceTimers) {
    clearTimeout(timer);
    debounceTimers.delete(key);
  }
}
