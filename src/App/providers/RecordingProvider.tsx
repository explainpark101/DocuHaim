import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useRecording } from '@/hooks/useRecording';
import {
  RecordingSyncContext,
  type RecordingSyncValue,
} from '@/App/context/RecordingSyncContext';

export type RecordingOwnedApi = RecordingSyncValue & {
  audioLevel: number;
  startRecording: (...args: any[]) => any;
  stopRecording: (...args: any[]) => any;
  recordingPipelineStatus: string;
  setRecordingPipelineStatus: (s: string | ((prev: string) => string)) => void;
  recordingQueueStats: { pending: number; uploading: number; failed: number };
  setRecordingQueueStats: (
    s:
      | { pending: number; uploading: number; failed: number }
      | ((prev: { pending: number; uploading: number; failed: number }) => {
          pending: number;
          uploading: number;
          failed: number;
        }),
  ) => void;
  recordingsList: any[];
  setRecordingsList: (list: any[] | ((prev: any[]) => any[])) => void;
  selectedRecordingKey: string | null;
  setSelectedRecordingKey: (
    key: string | null | ((prev: string | null) => string | null),
  ) => void;
  recordingAudioUrl: string;
  setRecordingAudioUrl: (url: string | ((prev: string) => string)) => void;
  recordingSyncData: any[];
  setRecordingSyncData: (data: any[] | ((prev: any[]) => any[])) => void;
  /** Injected from AppLogic (orchestration) via RecordingToggleBridge. */
  handleToggleRecording?: (...args: any[]) => any;
};

const RecordingOwnedContext = createContext<RecordingOwnedApi | null>(null);

export function useRecordingOwned(): RecordingOwnedApi {
  const ctx = useContext(RecordingOwnedContext);
  if (!ctx) throw new Error('useRecordingOwned must be used within RecordingProvider');
  return ctx;
}

/** Owns useRecording + recording panel state; also publishes RecordingSyncContext for AutoSave. */
export function RecordingProvider({ children }: { children: ReactNode }) {
  const {
    isRecording,
    audioLevel,
    startRecording,
    stopRecording,
    captureSync,
  } = useRecording();

  const [recordingPipelineStatus, setRecordingPipelineStatus] = useState('');
  const [recordingQueueStats, setRecordingQueueStats] = useState({
    pending: 0,
    uploading: 0,
    failed: 0,
  });
  const [recordingsList, setRecordingsList] = useState<any[]>([]);
  const [selectedRecordingKey, setSelectedRecordingKey] = useState<string | null>(null);
  const [recordingAudioUrl, setRecordingAudioUrl] = useState('');
  const [recordingSyncData, setRecordingSyncData] = useState<any[]>([]);

  const value = useMemo(
    () => ({
      isRecording,
      audioLevel,
      startRecording,
      stopRecording,
      captureSync,
      recordingPipelineStatus,
      setRecordingPipelineStatus,
      recordingQueueStats,
      setRecordingQueueStats,
      recordingsList,
      setRecordingsList,
      selectedRecordingKey,
      setSelectedRecordingKey,
      recordingAudioUrl,
      setRecordingAudioUrl,
      recordingSyncData,
      setRecordingSyncData,
    }),
    [
      isRecording,
      audioLevel,
      startRecording,
      stopRecording,
      captureSync,
      recordingPipelineStatus,
      recordingQueueStats,
      recordingsList,
      selectedRecordingKey,
      recordingAudioUrl,
      recordingSyncData,
    ],
  );

  const syncValue = useMemo(
    () => ({ isRecording, captureSync }),
    [isRecording, captureSync],
  );

  return (
    <RecordingOwnedContext.Provider value={value}>
      <RecordingSyncContext.Provider value={syncValue}>
        {children}
      </RecordingSyncContext.Provider>
    </RecordingOwnedContext.Provider>
  );
}

/**
 * Nested under AppLogic: merges orchestration `handleToggleRecording` onto
 * RecordingOwned without moving RecordingProvider below orchestration.
 */
export function RecordingToggleBridge({
  handleToggleRecording,
  children,
}: {
  handleToggleRecording: (...args: any[]) => any;
  children: ReactNode;
}) {
  const parent = useRecordingOwned();
  const value = useMemo(
    () => ({ ...parent, handleToggleRecording }),
    [parent, handleToggleRecording],
  );
  return (
    <RecordingOwnedContext.Provider value={value}>{children}</RecordingOwnedContext.Provider>
  );
}
