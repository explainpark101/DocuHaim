import { isEncMdPath } from '@/utils/encMd';
import { getActiveFileTab } from '@/utils/workspaceTabs';
import { patchFileTab } from '@/utils/workspaceTabs/appBridge';
import { isVaultPathStorageType } from '@/App/context/VaultContext';
import { schedulePersistLastViewedNoteContent } from '@/utils/lastViewedNoteDraft';
import {
  autoSaveDelayToMs,
  isTimedAutoSaveMode,
  loadAutoSavePolicy,
  type AutoSavePolicy,
} from '@/utils/workspaceTabsSettings';

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
    dirtySinceRef,
    getAutoSavePolicy,
  } = deps;

  const dirtySince: { current: number | null } = dirtySinceRef ?? { current: null };
  const readPolicy: () => AutoSavePolicy =
    typeof getAutoSavePolicy === 'function' ? getAutoSavePolicy : loadAutoSavePolicy;

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
    const autoSaveViewer =
      currentFile.viewer === 'markdown' || currentFile.viewer === 'excalidraw';
    if (!autoSaveViewer) return undefined;
    if (isEncMdPath(currentFile.id) || isEncMdPath(currentFile.name)) return undefined;
    if (!lastInputAt) return undefined;

    const policy = readPolicy();
    if (!isTimedAutoSaveMode(policy.mode)) {
      dirtySince.current = null;
      return undefined;
    }
    if (currentFile.content === editorContent) {
      dirtySince.current = null;
      return undefined;
    }

    const delayMs = autoSaveDelayToMs(policy);
    let wait = delayMs;
    if (policy.mode === 'afterDelay') {
      if (dirtySince.current == null) dirtySince.current = Date.now();
      wait = Math.max(0, delayMs - (Date.now() - dirtySince.current));
    } else {
      dirtySince.current = null;
    }

    let fired = false;
    const timeout = setTimeout(async () => {
      fired = true;
      dirtySince.current = null;
      const latest = readPolicy();
      if (!isTimedAutoSaveMode(latest.mode)) return;
      if (currentFile.content === editorContent) return;
      if (!currentFile || !isVaultPathStorageType(currentFile.type)) return;
      if (isEncMdPath(currentFile.id) || isEncMdPath(currentFile.name)) return;
      try {
        await saveFile(null, { lastInputAt });
        setLastAutoSaveAt(Date.now());
      } catch (_e) {
        // saveFile handles alerts
      }
    }, wait);

    return () => {
      if (!fired) clearTimeout(timeout);
    };
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
