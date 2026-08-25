import { createContext, useContext } from 'react';

/** Recording bits AutoSave needs without owning the full recording stack. */
export type RecordingSyncValue = {
  isRecording: boolean;
  captureSync: (...args: any[]) => any;
};

export const RecordingSyncContext = createContext<RecordingSyncValue | null>(null);

export function useRecordingSync(): RecordingSyncValue {
  const ctx = useContext(RecordingSyncContext);
  if (!ctx) {
    return { isRecording: false, captureSync: () => {} };
  }
  return ctx;
}
