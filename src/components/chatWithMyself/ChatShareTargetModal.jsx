import Modal from '@/components/modals/Modal';

const PREVIEW_MAX = 280;

function truncatePreview(body) {
  const text = String(body || '').trim();
  if (!text) return '';
  if (text.length <= PREVIEW_MAX) return text;
  return `${text.slice(0, PREVIEW_MAX)}…`;
}

/**
 * Choose how to handle an incoming Web Share Target payload.
 */
export default function ChatShareTargetModal({
  isOpen,
  body = '',
  onSendAsSelf,
  onComposeWithGroup,
  onClose,
}) {
  const preview = truncatePreview(body);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
          공유 내용 보내기
        </h2>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
          공유받은 내용을 어떻게 보낼지 선택하세요.
        </p>
        {preview ? (
          <pre className="mb-4 max-h-40 overflow-auto whitespace-pre-wrap wrap-break-word rounded-md border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg">
            {preview}
          </pre>
        ) : null}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100 hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onComposeWithGroup}
            className="rounded px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100 hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
          >
            그룹 설정해서 보내기
          </button>
          <button
            type="button"
            onClick={onSendAsSelf}
            className="rounded px-4 py-2 text-sm font-medium text-white transition bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            나로 즉시 보내기
          </button>
        </div>
      </div>
    </Modal>
  );
}
