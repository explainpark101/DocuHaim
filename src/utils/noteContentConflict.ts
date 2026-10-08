export type NoteContentConflictChoice = 'local' | 'server';

export type NoteContentConflictPayload = {
  fileName: string;
  filePath: string;
  localText: string;
  serverText: string;
  localLabel?: string;
  serverLabel?: string;
  /** Optional hint shown above the diff */
  message?: string;
};

export type NoteContentConflictHandler = (
  payload: NoteContentConflictPayload,
) => Promise<NoteContentConflictChoice>;

let handler: NoteContentConflictHandler | null = null;
let queue: Promise<unknown> = Promise.resolve();

export function registerNoteContentConflictHandler(
  next: NoteContentConflictHandler | null,
): void {
  handler = next;
}

/**
 * Ask which note body to keep (local last-viewed vs server/disk).
 * Concurrent calls are serialized so one modal is shown at a time (per-note).
 */
export function askNoteContentConflict(
  payload: NoteContentConflictPayload,
): Promise<NoteContentConflictChoice> {
  const run = async (): Promise<NoteContentConflictChoice> => {
    if (handler) return handler(payload);
    const useServer = window.confirm(
      payload.message ||
        `"${payload.fileName || payload.filePath}" 내용이 서버/디스크와 다릅니다. 서버 버전으로 교체할까요?`,
    );
    return useServer ? 'server' : 'local';
  };
  const next = queue.then(run, run);
  queue = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
}
