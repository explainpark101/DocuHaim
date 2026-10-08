import { useEffect, useRef, useState } from 'react';
import NoteContentConflictModal from '@/components/shared/modals/NoteContentConflictModal';
import {
  registerNoteContentConflictHandler,
  type NoteContentConflictChoice,
  type NoteContentConflictPayload,
} from '@/utils/noteContentConflict';

type Props = {
  theme?: 'light' | 'dark';
};

/**
 * Registers the global note-content conflict prompt used by open/restore/refresh.
 */
export default function NoteContentConflictHost({ theme = 'light' }: Props) {
  const [payload, setPayload] = useState<NoteContentConflictPayload | null>(null);
  const resolverRef = useRef<((choice: NoteContentConflictChoice) => void) | null>(
    null,
  );

  useEffect(() => {
    registerNoteContentConflictHandler(
      (next) =>
        new Promise<NoteContentConflictChoice>((resolve) => {
          resolverRef.current = resolve;
          setPayload(next);
        }),
    );
    return () => {
      registerNoteContentConflictHandler(null);
      const pending = resolverRef.current;
      resolverRef.current = null;
      pending?.('local');
      setPayload(null);
    };
  }, []);

  const settle = (choice: NoteContentConflictChoice) => {
    const resolve = resolverRef.current;
    resolverRef.current = null;
    setPayload(null);
    resolve?.(choice);
  };

  return (
    <NoteContentConflictModal
      isOpen={Boolean(payload)}
      fileName={payload?.fileName || ''}
      filePath={payload?.filePath || ''}
      localText={payload?.localText ?? ''}
      serverText={payload?.serverText ?? ''}
      {...(payload?.localLabel ? { localLabel: payload.localLabel } : {})}
      {...(payload?.serverLabel ? { serverLabel: payload.serverLabel } : {})}
      {...(payload?.message ? { message: payload.message } : {})}
      theme={theme}
      onResolve={settle}
    />
  );
}
