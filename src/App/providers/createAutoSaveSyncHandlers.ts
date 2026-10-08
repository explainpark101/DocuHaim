import { isEncMdPath } from '@/utils/encMd';
import { getActiveFileTab } from '@/utils/workspaceTabs';
import { patchFileTab } from '@/utils/workspaceTabs/appBridge';
import { isVaultPathStorageType } from '@/App/context/VaultContext';
import { schedulePersistLastViewedNoteContent } from '@/utils/lastViewedNoteDraft';

/** §7–8 Auto save / sync + editor change bridge (factory). */
export function createAutoSaveSyncHandlers(deps: Record<string, any>) {
  const {
    saveFile,
    setLastAutoSaveAt,
    setLastAutoSyncAt,
    setEditorContent,
    editorContentRef,
    prevEditorContentRef,
    workspaceTabsRef,
    setWorkspaceTabs,
    setLastInputAt,
    getBackendForType,
    isRecording,
    captureSync,
  } = deps;

  function handleEditorChange(value: string) {
    editorContentRef.current = value;
    if (isRecording && deps.currentFile?.viewer === 'markdown') {
      const prevLines = prevEditorContentRef.current.split('\n');
      const newLines = value.split('\n');
      const lineCountDiff = newLines.length - prevLines.length;
      let line = Math.max(0, newLines.length - 1);
      const maxLen = Math.max(prevLines.length, newLines.length);
      for (let i = 0; i < maxLen; i++) {
        if ((prevLines[i] ?? null) !== (newLines[i] ?? null)) {
          line = i;
          break;
        }
      }
      const text = newLines[line] ?? '';
      const isNewLineInserted = lineCountDiff === 1;
      captureSync(line, text, { insert: isNewLineInserted });
    }
    prevEditorContentRef.current = value;
    setEditorContent(value);
    setLastInputAt(Date.now());
    const active = getActiveFileTab(workspaceTabsRef.current);
    if (active) {
      const next = patchFileTab(workspaceTabsRef.current, active.id, {
        editorContent: value,
      });
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      const lm = deps.currentFile?.lastModified;
      const ts =
        lm instanceof Date
          ? lm.getTime()
          : typeof lm === 'number'
            ? lm
            : 0;
      schedulePersistLastViewedNoteContent({
        storageType: active.storageType,
        path: active.path,
        content: value,
        originalLastModified: ts,
        fileName: String(active.currentFile?.name || active.editedFileName || ''),
        viewer: active.currentFile?.viewer || 'markdown',
      });
    }
  }

  function runAutoSaveEffect({
    currentFile,
    editorContent,
    lastInputAt,
  }: {
    currentFile: any;
    editorContent: string;
    lastInputAt: number | null;
  }) {
    if (!currentFile || !isVaultPathStorageType(currentFile.type)) return undefined;
    if (currentFile.viewer !== 'markdown') return undefined;
    if (isEncMdPath(currentFile.id) || isEncMdPath(currentFile.name)) return undefined;
    if (!lastInputAt) return undefined;

    const now = Date.now();
    const timeout = setTimeout(async () => {
      if (currentFile.content === editorContent) return;
      if (!currentFile || !isVaultPathStorageType(currentFile.type)) return;
      if (isEncMdPath(currentFile.id) || isEncMdPath(currentFile.name)) return;
      try {
        await saveFile(null, { lastInputAt });
        setLastAutoSaveAt(now);
      } catch (_e) {
        // saveFile handles alerts
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }

  function runAutoSyncEffect({
    currentFile,
    editorContent,
    lastInputAt,
  }: {
    currentFile: any;
    editorContent: string;
    lastInputAt: number | null;
  }) {
    if (!currentFile || (currentFile.type !== 's3' && currentFile.type !== 'webdav')) return undefined;
    if (currentFile.viewer !== 'markdown') return undefined;
    if (isEncMdPath(currentFile.id) || isEncMdPath(currentFile.name)) return undefined;

    const interval = setInterval(async () => {
      if (!lastInputAt) return;
      const idleMs = Date.now() - lastInputAt;
      if (idleMs < 30000) return;
      if (currentFile.content !== editorContent) return;
      if (isEncMdPath(currentFile.id) || isEncMdPath(currentFile.name)) return;

      const backend = getBackendForType(currentFile.type);
      if (!backend) return;

      try {
        const { text } = await backend.readText(currentFile.id);
        // Never silently clobber the open note when remote differs — user picks via refresh.
        if (text !== editorContent) return;
        setLastAutoSyncAt(Date.now());
      } catch (err) {
        console.error('Auto sync read error:', err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }

  return {
    handleEditorChange,
    runAutoSaveEffect,
    runAutoSyncEffect,
  };
}
