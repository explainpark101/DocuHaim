/**
 * note-with-recording 아키텍처 기반 녹음 훅
 * Web Audio API + MediaRecorder 활용
 * - MediaStream: 마이크 접근
 * - AudioContext + AnalyserNode: 실시간 입력 레벨 추출
 * - MediaRecorder: 오디오 청크 수집 → IndexedDB 저장
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import { saveRecording } from '@/utils/recording/recordingDb';

const FFT_SIZE = 256;
const SMOOTHING = 0.8;
const LEVEL_POLL_INTERVAL_MS = 50;

type RecordingSyncEntry = {
  time: number;
  line: number;
  text: string;
  insert?: boolean;
};

type StopRecordingParams = {
  noteKey?: string;
  markdown?: string;
};

type RecordingResult = {
  id: number | null;
  noteKey: string;
  audioBlob: Blob;
  markdown: string;
  syncData: RecordingSyncEntry[];
};

type CaptureSyncOptions = {
  insert?: boolean;
};

interface WindowWithWebkitAudio extends Window {
  webkitAudioContext?: typeof AudioContext;
}

/**
 * level 0~1을 회색→빨간색 hex로 변환
 */
export function levelToColor(level: number) {
  if (level <= 0) return '#9ca3af';
  if (level >= 1) return '#ef4444';
  if (level < 0.5) {
    const t = level * 2;
    return interpolateHex('#9ca3af', '#f59e0b', t);
  }
  const t = (level - 0.5) * 2;
  return interpolateHex('#f59e0b', '#ef4444', t);
}

function interpolateHex(a: string, b: string, t: number) {
  const ar = parseInt(a.slice(1, 3), 16);
  const ag = parseInt(a.slice(3, 5), 16);
  const ab = parseInt(a.slice(5, 7), 16);
  const br = parseInt(b.slice(1, 3), 16);
  const bg = parseInt(b.slice(3, 5), 16);
  const bb = parseInt(b.slice(5, 7), 16);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bl.toString(16).padStart(2, '0')}`;
}

export function useRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const pollIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordingStartTimeRef = useRef(0);
  const syncDataRef = useRef<RecordingSyncEntry[]>([]);

  const cleanup = useCallback(() => {
    if (pollIdRef.current != null) {
      clearInterval(pollIdRef.current);
      pollIdRef.current = null;
    }
    setAudioLevel(0);
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    mediaRecorderRef.current = null;
    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch (_) {}
      sourceRef.current = null;
    }
    analyserRef.current = null;
    if (audioContextRef.current?.state !== 'closed') {
      void audioContextRef.current?.close();
    }
    audioContextRef.current = null;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const stopRecording = useCallback(async (params?: StopRecordingParams): Promise<RecordingResult | null> => {
    const { noteKey = '', markdown = '' } = params ?? {};
    if (!isRecording && !mediaRecorderRef.current) {
      return null;
    }

    if (pollIdRef.current != null) {
      clearInterval(pollIdRef.current);
      pollIdRef.current = null;
    }
    setAudioLevel(0);

    const mr = mediaRecorderRef.current;
    mediaRecorderRef.current = null;

    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch (_) {}
      sourceRef.current = null;
    }
    analyserRef.current = null;
    if (audioContextRef.current?.state !== 'closed') {
      void audioContextRef.current?.close();
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    if (!mr || mr.state !== 'recording') {
      chunksRef.current = [];
      syncDataRef.current = [];
      setIsRecording(false);
      return null;
    }

    const stopPromise = new Promise<void>((resolve) => {
      mr.onstop = () => resolve();
    });
    mr.stop();
    await stopPromise;

    const chunks = chunksRef.current;
    chunksRef.current = [];
    const syncData = [...syncDataRef.current];
    syncDataRef.current = [];

    if (chunks.length === 0) {
      setIsRecording(false);
      return null;
    }

    const mimeType = mr.mimeType || 'audio/webm';
    const audioBlob = new Blob(chunks, { type: mimeType });

    let recordId: number | null = null;
    if (noteKey) {
      recordId = await saveRecording({
        noteKey,
        audioBlob,
        markdown,
        syncData,
      });
    }

    setIsRecording(false);

    return {
      id: recordId,
      noteKey,
      audioBlob,
      markdown,
      syncData,
    };
  }, [isRecording]);

  const startRecording = useCallback(async () => {
    setError(null);
    syncDataRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const win = window as WindowWithWebkitAudio;
      const AudioCtx = window.AudioContext ?? win.webkitAudioContext;
      if (!AudioCtx) {
        throw new Error('AudioContext not supported');
      }
      const audioContext = new AudioCtx();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = FFT_SIZE;
      analyser.smoothingTimeConstant = SMOOTHING;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      sourceRef.current = source;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      chunksRef.current = [];
      recordingStartTimeRef.current = Date.now();

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mediaRecorder.start(100);
      mediaRecorderRef.current = mediaRecorder;

      pollIdRef.current = setInterval(() => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        const sum = dataArray.reduce((a, b) => a + b, 0);
        const avg = sum / dataArray.length;
        const normalized = Math.min(1, avg / 128);
        setAudioLevel(normalized);
      }, LEVEL_POLL_INTERVAL_MS);

      setIsRecording(true);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : '마이크 접근 실패';
      setError(message);
      cleanup();
      setIsRecording(false);
    }
  }, [cleanup]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      void stopRecording();
    } else {
      void startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  const getRecordingElapsed = useCallback(() => {
    if (!recordingStartTimeRef.current) return 0;
    return (Date.now() - recordingStartTimeRef.current) / 1000;
  }, []);

  const captureSync = useCallback((line: number, text: string, options: CaptureSyncOptions = {}) => {
    if (!isRecording) return;
    const time = (Date.now() - recordingStartTimeRef.current) / 1000;
    syncDataRef.current.push({ time, line, text, insert: options.insert ?? false });
  }, [isRecording]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      cleanup();
    };
  }, [cleanup]);

  return {
    isRecording,
    audioLevel,
    error,
    startRecording,
    stopRecording,
    toggleRecording,
    getRecordingElapsed,
    captureSync,
  };
}
