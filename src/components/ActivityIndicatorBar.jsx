/**
 * 하단바 활동 인디케이터
 * - 파일 업로드, 녹음 처리, 필기 저장, 사진 업로드, 채팅 전송/동기화 등
 * - useActivityIndicator 훅으로 등록된 항목만 렌더링
 * - pin: true 항목은 완료 상태여도 하단바에 유지
 */
import { useActivityIndicator, ActivityTypes } from '@/contexts/ActivityIndicatorContext';
import {
  IconUpload,
  IconMic,
  IconPenLine,
  IconImage,
  IconLoader,
  IconDownload,
  IconMessage,
  IconSearch,
  IconRefresh,
  IconFilePlus,
  IconCheck,
  IconAlert,
  IconCloud,
} from '@/components/icons';

const typeConfig = {
  [ActivityTypes.FILE_UPLOAD]: {
    icon: IconUpload,
    label: '파일 업로드',
  },
  [ActivityTypes.RECORDING]: {
    icon: IconMic,
    label: '녹음 처리',
  },
  [ActivityTypes.NOTE_PROCESSING]: {
    icon: IconPenLine,
    label: '필기 저장',
  },
  [ActivityTypes.PHOTO_UPLOAD]: {
    icon: IconImage,
    label: '사진 업로드',
  },
  [ActivityTypes.DOWNLOAD]: {
    icon: IconDownload,
    label: '다운로드',
  },
  [ActivityTypes.CHAT_SEND]: {
    icon: IconMessage,
    label: '채팅 전송',
  },
  [ActivityTypes.CHAT_LOAD]: {
    icon: IconRefresh,
    label: '채팅 불러오기',
  },
  [ActivityTypes.CHAT_SEARCH]: {
    icon: IconSearch,
    label: '채팅 검색',
  },
  [ActivityTypes.CHAT_SYNC]: {
    icon: IconCloud,
    label: '채팅 동기화',
  },
  [ActivityTypes.CHAT_NOTE]: {
    icon: IconFilePlus,
    label: '노트로 추가',
  },
};

function IndicatorItem({ indicator }) {
  const config = typeConfig[indicator.type] || {
    icon: IconLoader,
    label: indicator.label || '처리 중',
  };
  const Icon = config.icon;
  const displayLabel = indicator.label ?? config.label;
  const isActive = indicator.status === 'pending' || indicator.status === 'processing';
  const isError = indicator.status === 'error';
  const isDone = indicator.status === 'done';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] md:text-[11px] shrink-0 ${
        isError
          ? 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300'
          : isDone
            ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300'
            : 'bg-gray-100 dark:bg-odp-bgSofter text-gray-700 dark:text-odp-fgStrong'
      }`}
      title={indicator.detail || displayLabel}
    >
      {isActive ? (
        <IconLoader size={12} className="animate-spin shrink-0 text-blue-500" />
      ) : isError ? (
        <IconAlert size={12} className="shrink-0 text-red-500" />
      ) : isDone ? (
        <IconCheck size={12} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <Icon size={12} className="shrink-0" />
      )}
      <span className="truncate max-w-[120px] md:max-w-[180px]">{displayLabel}</span>
      {indicator.detail && (
        <span className="hidden md:inline truncate max-w-[120px] text-gray-500 dark:text-odp-muted">
          {indicator.detail}
        </span>
      )}
      {indicator.progress != null && indicator.progress < 100 && (
        <span className="text-gray-500 dark:text-odp-muted shrink-0">{indicator.progress}%</span>
      )}
    </span>
  );
}

export default function ActivityIndicatorBar() {
  const { indicators } = useActivityIndicator();
  const visibleIndicators = indicators.filter(
    (i) =>
      i.pin ||
      i.status === 'pending' ||
      i.status === 'processing' ||
      i.status === 'done' ||
      i.status === 'error',
  );

  if (visibleIndicators.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto min-w-0 shrink-0">
      {visibleIndicators.map((indicator) => (
        <IndicatorItem key={indicator.id} indicator={indicator} />
      ))}
    </div>
  );
}
