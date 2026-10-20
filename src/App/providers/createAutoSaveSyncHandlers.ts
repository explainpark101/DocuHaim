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

  /**
   * One pending auto-save for this editor session.
   * Dual view emits the same edit from both panes; those echoes must not
   * each arm a new timer (especially a 0ms afterDelay follow-up).
   */
  const schedule = deps.scheduleRef?.current ?? {
    timer: null as ReturnType<typeof setTimeout> | null,
    saving: false,
    armedContent: null as string | null,
    armedKey: null as string | null,
    fileId: null as string | null,
  };
  let liveFile = deps.currentFile;
  let liveInputAt: number | null = null;

  function clearScheduledSave() {
    if (schedule.timer != null) {
      clearTimeout(schedule.timer);
      schedule.timer = null;
    }
  }

  function readLiveFile() {
    return deps.latestFileRef?.current ?? liveFile;
  }

  function readLiveContent(): string {
    return typeof editorContentRef?.current === 'string' ? editorContentRef.current : '';
  }

  async function fireScheduledSave() {
    schedule.timer = null;
    if (schedule.saving) return;
    const latest = readPolicy();
    if (!isTimedAutoSaveMode(latest.mode)) return;
    const fileNow = readLiveFile();
    const contentNow = readLiveContent();
    if (!fileNow || fileNow.content === contentNow) {
      dirtySince.current = null;
      schedule.armedContent = null;
      schedule.armedKey = null;
      return;
    }
    if (!isVaultPathStorageType(fileNow.type)) return;
    if (isEncMdPath(fileNow.id) || isEncMdPath(fileNow.name)) return;
    schedule.saving = true;
    dirtySince.current = null;
    try {
      await saveFile(null, { lastInputAt: liveInputAt });
      setLastAutoSaveAt(Date.now());
    } catch (_e) {
      // saveFile handles alerts
    } finally {
      schedule.saving = false;
      const after = readPolicy();
      const fileAfter = readLiveFile();
      const contentAfter = readLiveContent();
      if (
        fileAfter &&
        fileAfter.content !== contentAfter &&
        isTimedAutoSaveMode(after.mode) &&
        isVaultPathStorageType(fileAfter.type) &&
        !isEncMdPath(fileAfter.id) &&
        !isEncMdPath(fileAfter.name)
      ) {
        // Still dirty after the save (typing continued). Start a full new
        // window instead of saving again on the next dual-view echo.
        dirtySince.current = Date.now();
        const delay = autoSaveDelayToMs(after);
        schedule.armedKey = `${after.mode}:${delay}:${String(fileAfter.id ?? '')}`;
        schedule.armedContent = contentAfter;
        schedule.timer = setTimeout(() => {
          void fireScheduledSave();
        }, delay);
      } else {
        schedule.armedContent = null;
        schedule.armedKey = null;
      }
    }
  }

  function handleEditorChange(value: string) {
    // Dual-view sync echoes the markdown already stored. A second emit must
    // not bump the auto-save clock or schedule another save.
    if (value === editorContentRef.current) return;
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

    liveFile = currentFile;
    liveInputAt = lastInputAt;
    if (editorContentRef) editorContentRef.current = editorContent;

    const policy = readPolicy();
    const fileId = String(currentFile.id ?? '');
    if (schedule.fileId !== fileId) {
      clearScheduledSave();
      dirtySince.current = null;
      schedule.armedContent = null;
      schedule.armedKey = null;
      schedule.fileId = fileId;
    }

    if (!isTimedAutoSaveMode(policy.mode)) {
      clearScheduledSave();
      dirtySince.current = null;
      schedule.armedContent = null;
      schedule.armedKey = null;
      return undefined;
    }
    if (currentFile.content === editorContent) {
      clearScheduledSave();
      dirtySince.current = null;
      schedule.armedContent = null;
      schedule.armedKey = null;
      return undefined;
    }
    if (schedule.saving) return undefined;

    const delayMs = autoSaveDelayToMs(policy);
    const armedKey = `${policy.mode}:${delayMs}:${fileId}`;

    if (policy.mode === 'afterDelay') {
      // One deadline per dirty stretch. Later keystrokes and the other
      // pane's echo keep that deadline; they must not each save immediately.
      if (schedule.timer != null && schedule.armedKey === armedKey) return undefined;
      clearScheduledSave();
      if (dirtySince.current == null) dirtySince.current = Date.now();
      const wait = Math.max(0, delayMs - (Date.now() - dirtySince.current));
      schedule.armedKey = armedKey;
      schedule.armedContent = editorContent;
      schedule.timer = setTimeout(() => {
        void fireScheduledSave();
      }, wait);
      return undefined;
    }

    if (
      schedule.timer != null &&
      schedule.armedContent === editorContent &&
      schedule.armedKey === armedKey
    ) {
      return undefined;
    }
    clearScheduledSave();
    dirtySince.current = null;
    schedule.armedKey = armedKey;
    schedule.armedContent = editorContent;
    schedule.timer = setTimeout(() => {
      void fireScheduledSave();
    }, delayMs);
    // Do not clear this timer in effect cleanup. Dual-view echoes re-run the
    // effect; cleanup would drop the deadline and the next 0ms arm would save
    // on every keystroke. Unmount clears `scheduleRef` separately.
    return undefined;
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
