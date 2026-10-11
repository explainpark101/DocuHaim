import { useCallback, useEffect, useRef, useState } from 'react';
import NoteVersionHistoryModal from '@/components/shared/modals/NoteVersionHistoryModal';
import { useVault } from '@/App/hooks/useVault';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useAuth } from '@/contexts/AuthContext';
import {
  createVersionHistoryContext,
  deleteVersions,
  listVersions,
  readVersion,
  restoreVersion,
  type VersionEntry,
  type VersionHistoryVaultBackend,
} from '@/utils/versionHistory';
import {
  closeNoteVersionHistory,
  subscribeNoteVersionHistory,
  type NoteVersionHistoryRequest,
} from '@/utils/versionHistory/openRequest';

/**
 * Hosts NoteVersionHistoryModal from openNoteVersionHistory() requests.
 * Callbacks are stable so the modal does not re-fetch on every editor keystroke.
 */
export default function NoteVersionHistoryHost({
  theme = 'light',
}: {
  theme?: 'light' | 'dark';
}) {
  const [req, setReq] = useState<NoteVersionHistoryRequest | null>(null);
  const vault = useVault() as unknown as {
    getBackendForType: (type: string) => VersionHistoryVaultBackend | null;
    getS3Client: () => unknown;
  };
  const { getBackendForType, getS3Client } = vault;
  const { s3Creds } = useAuth() as { s3Creds?: { bucket?: string } };
  const { currentFile, editorContent, setEditorContent, saveFile } =
    useFileSession() as {
      currentFile: { id?: string; type?: string; content?: string } | null;
      editorContent: string;
      setEditorContent: (v: string) => void;
      saveFile: (
        file?: unknown,
        opts?: { contentOverride?: string },
      ) => Promise<void>;
    };

  const path = req?.path || '';
  const storageType = req?.storageType || 's3';

  const ctxDepsRef = useRef({
    storageType,
    getS3Client,
    getBackendForType,
    bucket: s3Creds?.bucket || '',
    path,
    currentFile,
    setEditorContent,
    saveFile,
  });
  ctxDepsRef.current = {
    storageType,
    getS3Client,
    getBackendForType,
    bucket: s3Creds?.bucket || '',
    path,
    currentFile,
    setEditorContent,
    saveFile,
  };

  useEffect(() => subscribeNoteVersionHistory(setReq), []);

  const makeCtx = useCallback(
    () =>
      createVersionHistoryContext({
        storageMode: ctxDepsRef.current.storageType,
        getS3Client: () => ctxDepsRef.current.getS3Client(),
        bucket: ctxDepsRef.current.bucket,
        getVaultBackend: () =>
          ctxDepsRef.current.getBackendForType(ctxDepsRef.current.storageType),
      }),
    [],
  );

  const onLoadVersions = useCallback(async () => {
    const p = ctxDepsRef.current.path;
    return listVersions(makeCtx(), { kind: 'note', path: p });
  }, [makeCtx]);

  const onReadVersion = useCallback(
    async (entry: VersionEntry) => {
      const p = ctxDepsRef.current.path;
      return readVersion(makeCtx(), { kind: 'note', path: p }, entry.id);
    },
    [makeCtx],
  );

  const onDeleteVersions = useCallback(
    async (entries: VersionEntry[]) => {
      const p = ctxDepsRef.current.path;
      const result = await deleteVersions(
        makeCtx(),
        { kind: 'note', path: p },
        entries.map((e) => e.id),
      );
      if (result.failed.length) {
        throw new Error(
          result.failed.map((f) => f.message).join('; ') || 'Delete failed',
        );
      }
    },
    [makeCtx],
  );

  const onRestore = useCallback(
    async (entry: VersionEntry, versionText: string) => {
      const { path: p, currentFile: file, setEditorContent: setContent, saveFile: save } =
        ctxDepsRef.current;
      await restoreVersion(makeCtx(), { kind: 'note', path: p }, entry.id);
      if (file?.id === p) {
        setContent(versionText);
        await save(null, { contentOverride: versionText });
      }
      closeNoteVersionHistory();
      setReq(null);
    },
    [makeCtx],
  );

  const onClose = useCallback(() => {
    closeNoteVersionHistory();
    setReq(null);
  }, []);

  // Prefer explicit request text, then live editor when the open file matches.
  const currentText =
    req?.currentText ??
    (currentFile?.id === path ? String(editorContent ?? '') : '');

  return (
    <NoteVersionHistoryModal
      isOpen={Boolean(req)}
      filePath={path}
      currentText={String(currentText ?? '')}
      theme={theme}
      onClose={onClose}
      onLoadVersions={onLoadVersions}
      onReadVersion={onReadVersion}
      onDeleteVersions={onDeleteVersions}
      onRestore={onRestore}
    />
  );
}
