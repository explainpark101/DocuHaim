import { useRef, useState, useEffect } from 'react';
import { IconMic, IconSquare, IconChevronDown } from '@/components/icons';
import Button from '@/components/Button';

/**
 * 녹음 버튼 (녹음 존재 시 드롭다운)
 * - 녹음 없음: 단순 버튼 "녹음"
 * - 녹음 있음: 드롭다운 "새 녹음", "녹음 툴바 보기"
 */
export default function RecordingDropdownButton({
  isRecording = false,
  // @ts-expect-error TS(6133): '_audioLevel' is declared but its value is never r... Remove this comment to see the full error message
  _audioLevel = 0,
  hasRecordings = false,
  recordingPipelineStatus = '',
  onStartRecording,
  onStopRecording,
  onShowToolbar
}: any) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: any) => {
      // @ts-expect-error TS(2339): Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  if (!onStartRecording && !onStopRecording) return null;

  if (isRecording) {
    return (
      <div className="flex items-center gap-2">
        {recordingPipelineStatus && (
          <div className="hidden md:flex flex-col items-end min-w-[100px]">
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="text-xs text-gray-500 dark:text-odp-muted">
              {recordingPipelineStatus}
              {recordingPipelineStatus === '업로드 중' ? '...' : ''}
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            </span>
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            <div
              className={`w-full h-1 bg-gray-200 dark:bg-odp-borderSoft rounded-full overflow-hidden mt-0.5 ${recordingPipelineStatus === '업로드 중' ? 'animate-pulse' : ''}`}
            >
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div
                className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-300"
                style={{ width: recordingPipelineStatus === '업로드 중' ? '100%' : '0%' }}
              />
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            </div>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        )}
        <Button
          type="button"
          variant="danger"
          size="sm"
          onClick={onStopRecording}
          disabled={!!recordingPipelineStatus}
          title="녹음 중지"
        >
          <IconSquare size={14} />
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          <span className="hidden md:inline">{recordingPipelineStatus || '녹음 중지'}</span>
        </Button>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
    );
  }

  if (!hasRecordings) {
    return (
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={onStartRecording}
        disabled={!!recordingPipelineStatus}
        title="녹음 시작"
      >
        <IconMic size={14} />
        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        <span className="hidden md:inline">새 녹음</span>
      </Button>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        disabled={!!recordingPipelineStatus}
        title="녹음"
      >
        <IconMic size={14} />
        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        <span className="hidden md:inline">녹음</span>
        <IconChevronDown size={12} className="ml-0.5" />
      </Button>
      {open && (
        <div
          className="absolute right-0 top-full mt-1 py-1 min-w-[140px] rounded-md shadow-lg border border-gray-200 dark:border-odp-borderSoft bg-white dark:bg-odp-surface z-50"
          role="menu"
        >
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          <button
            type="button"
            className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-bgSoft flex items-center gap-2"
            onClick={() => {
              onStartRecording?.();
              setOpen(false);
            }}
          >
            <IconMic size={14} />
            새 녹음
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          </button>
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          <button
            type="button"
            className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-odp-fgStrong hover:bg-gray-100 dark:hover:bg-odp-bgSoft flex items-center gap-2"
            onClick={() => {
              onShowToolbar?.();
              setOpen(false);
            }}
          >
            녹음 툴바 보기
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          </button>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      )}
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );
}
