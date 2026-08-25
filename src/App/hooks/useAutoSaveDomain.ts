import { useEffect, useMemo, useRef, useState } from 'react';
import { createAutoSaveSyncHandlers } from '@/App/providers/createAutoSaveSyncHandlers';
import { registerAutoSaveTimestampSetter, registerAutoSaveSyncTimestampSetter } from '@/App/hooks/autoSaveBridge';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useVault } from '@/App/hooks/useVault';
import { useWorkspaceTabsCtx } from '@/App/hooks/useWorkspaceTabsCtx';
import { useRecordingSync } from '@/App/context/RecordingSyncContext';
import { SESSION_STORAGE_TYPE } from '@/utils/sessionWorkspace';
import type { AutoSaveValue } from '@/App/context/AutoSaveContext';

/**
 * Owns §7–8 auto-save / sync state and effects.
 * Reads file/vault/tabs from parent domain providers.
 */
export function useAutoSaveDomain(): AutoSaveValue {
  const file = useFileSession();
  const vault = useVault();
  const tabs = useWorkspaceTabsCtx();
  const { isRecording, captureSync } = useRecordingSync();

  const [lastInputAt, setLastInputAt] = useState<number | null>(null);
  const [lastAutoSaveAt, setLastAutoSaveAt] = useState<number | null>(null);
  const [lastAutoSyncAt, setLastAutoSyncAt] = useState<number | null>(null);
  const ownedPrevRef = useRef('');
  const prevEditorContentRef = file.prevEditorContentRef ?? ownedPrevRef;

  useEffect(() => registerAutoSaveTimestampSetter(setLastAutoSaveAt), []);
  useEffect(() => registerAutoSaveSyncTimestampSetter(setLastAutoSyncAt), []);

  const { handleEditorChange, runAutoSaveEffect, runAutoSyncEffect } = createAutoSaveSyncHandlers({
    saveFile: file.saveFile,
    setLastAutoSaveAt,
    setLastAutoSyncAt,
    setCurrentFile: file.setCurrentFile,
    setEditorContent: file.setEditorContent,
    editorContentRef: file.editorContentRef,
    prevEditorContentRef,
    workspaceTabsRef: tabs.workspaceTabsRef,
    setWorkspaceTabs: tabs.setState,
    setLastInputAt,
    getBackendForType: vault.getBackendForType,
    isRecording,
    captureSync,
    currentFile: file.currentFile,
  });

  useEffect(
    () =>
      runAutoSaveEffect({
        currentFile: file.currentFile,
        editorContent: file.editorContent,
        lastInputAt,
      }),
    // recreate when inputs change — handlers close over latest deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lastInputAt, file.currentFile, file.editorContent],
  );

  useEffect(
    () =>
      runAutoSyncEffect({
        currentFile: file.currentFile,
        editorContent: file.editorContent,
        lastInputAt,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [file.currentFile, file.editorContent, lastInputAt],
  );

  useEffect(() => {
    file.editorContentRef.current = file.editorContent;
  }, [file.editorContent, file.editorContentRef]);

  useEffect(() => {
    if (file.currentFile?.id) prevEditorContentRef.current = file.editorContent;
  }, [file.currentFile?.id, file.editorContent, prevEditorContentRef]);

  const autoSaveIndicatorClass = useMemo(() => {
    const currentFile = file.currentFile;
    const editorContent = file.editorContent;
    const isEditableStorage =
      currentFile?.type === 's3'
      || currentFile?.type === 'local'
      || currentFile?.type === 'webdav'
      || currentFile?.type === SESSION_STORAGE_TYPE;
    const hasUnsavedChanges =
      isEditableStorage && currentFile && currentFile.content !== editorContent;
    const hasAutoSaved = isEditableStorage && !!lastAutoSaveAt;
    if (!isEditableStorage) return 'bg-gray-300';
    if (hasUnsavedChanges) return 'bg-yellow-400 animate-pulse';
    if (hasAutoSaved) return 'bg-green-500';
    return 'bg-gray-400';
  }, [file.currentFile, file.editorContent, lastAutoSaveAt]);

  return {
    handleEditorChange,
    lastInputAt,
    lastAutoSaveAt,
    lastAutoSyncAt,
    autoSaveIndicatorClass,
  };
}
