import { useEffect, useRef, useState } from 'react';
import { Send, Users, X } from 'lucide-react';
import Button from '@/components/Button';
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
  canSendAsSelf = true,
  onSendAsSelf,
  onComposeWithGroup,
  onClose,
}) {
  const preview = truncatePreview(body);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    busyRef.current = false;
    setBusy(false);
  }, [isOpen, body]);

  const runOnce = (action) => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    action?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={busy ? undefined : onClose}>
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
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => runOnce(onSendAsSelf)}
            disabled={busy || !canSendAsSelf}
            className="w-full"
          >
            <Send size={16} aria-hidden />
            나에게 바로 보내기
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() => runOnce(onComposeWithGroup)}
            disabled={busy}
            className="w-full"
          >
            <Users size={16} aria-hidden />
            메시지 그룹 설정해서 보내기
          </Button>
          <Button
            type="button"
            variant="tertiary"
            size="md"
            onClick={() => runOnce(onClose)}
            disabled={busy}
            className="w-full"
          >
            <X size={16} aria-hidden />
            취소
          </Button>
        </div>
      </div>
    </Modal>
  );
}
