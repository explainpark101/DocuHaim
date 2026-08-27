import { Download } from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  LLAMA_CPP_SETTINGS_PATH,
  requestLlamaCppRedownloadFocus,
  shouldSuggestLlamaCppRedownload,
} from '@/utils/llm/llamaCppLoadErrorHelp';

type LlamaCppLoadFailureHintProps = {
  error: string;
  modelId?: string;
  suggestRedownload?: boolean;
  className?: string;
};

export default function LlamaCppLoadFailureHint({
  error,
  modelId = '',
  suggestRedownload = true,
  className = '',
}: LlamaCppLoadFailureHintProps) {
  const navigate = useNavigate();
  const trimmedModelId = modelId.trim();
  const showRedownload = suggestRedownload && shouldSuggestLlamaCppRedownload(error);

  const handleOpenRedownload = () => {
    requestLlamaCppRedownloadFocus(trimmedModelId || undefined);
    navigate(LLAMA_CPP_SETTINGS_PATH);
  };

  return (
    <div className={className}>
      <p className="text-[11px] text-red-600 dark:text-red-400">{error}</p>
      {showRedownload ? (
        <div className="mt-1.5 rounded border border-amber-200 bg-amber-50/80 p-2 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-[11px] leading-relaxed text-amber-900 dark:text-amber-100">
            모델 파일이 없거나 손상되었을 수 있습니다. 설정에서 모델을{' '}
            <strong className="font-semibold">다시 다운로드</strong>한 뒤 로드를 실행해 보세요.
            {trimmedModelId ? (
              <>
                <br />
                <span className="text-amber-800/90 dark:text-amber-200/90">
                  모델: {trimmedModelId}
                </span>
              </>
            ) : null}
          </p>
          <button
            type="button"
            onClick={handleOpenRedownload}
            className="mt-1.5 inline-flex items-center gap-1 rounded border border-amber-300 bg-white px-2 py-1 text-[11px] font-medium text-amber-900 hover:bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100 dark:hover:bg-amber-950/70"
          >
            <Download size={12} aria-hidden />
            설정에서 모델 다시 다운로드
          </button>
        </div>
      ) : null}
    </div>
  );
}
