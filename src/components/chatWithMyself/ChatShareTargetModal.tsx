import { useEffect, useMemo, useRef, useState } from 'react';
import { FileIcon, FileText, Send, Users, X } from 'lucide-react';
import Button from '@/components/Button';
import Modal from '@/components/shared/modals/Modal';
import { formatChatAttachmentSize } from '@/utils/chatWithMyself';

const PREVIEW_MAX = 280;

type ActionResult = boolean | void;

type ChatShareTargetModalProps = {
  isOpen: boolean;
  body?: string;
  files?: File[];
  canSendAsSelf?: boolean;
  canOpenAsSession?: boolean;
  onSendAsSelf?: () => ActionResult | Promise<ActionResult>;
  onComposeWithGroup?: () => ActionResult | Promise<ActionResult>;
  onOpenAsSession?: () => ActionResult | Promise<ActionResult>;
  onClose?: () => ActionResult | Promise<ActionResult>;
};

function truncatePreview(body: string): string {
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
  files = [],
  canSendAsSelf = true,
  canOpenAsSession = false,
  onSendAsSelf,
  onComposeWithGroup,
  onOpenAsSession,
  onClose,
}: ChatShareTargetModalProps) {
  const preview = truncatePreview(body);
  const fileList = useMemo(
    () => (Array.isArray(files) ? files.filter(Boolean) : []),
    [files],
  );
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    busyRef.current = false;
    setBusy(false);
  }, [isOpen, body, fileList.length]);

  const runOnce = (action?: () => ActionResult | Promise<ActionResult>) => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    void (async () => {
      try {
        const result = await action?.();
        if (result === false) {
          busyRef.current = false;
          setBusy(false);
        }
      } catch {
        busyRef.current = false;
        setBusy(false);
      }
    })();
  };

  const hasContent = Boolean(preview) || fileList.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={busy ? undefined : onClose}>
      <div className="p-6">
        <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
          {canOpenAsSession ? '공유 내용' : '공유 내용 보내기'}
        </h2>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
          {canOpenAsSession
            ? '다운로드 세션으로 열거나 채팅으로 보낼 수 있습니다.'
            : '공유받은 내용을 어떻게 보낼지 선택하세요.'}
        </p>
        {preview ? (
          <pre className="mb-3 max-h-40 overflow-auto whitespace-pre-wrap wrap-break-word rounded-md border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg">
            {preview}
          </pre>
        ) : null}
        {fileList.length > 0 ? (
          <ul className="mb-4 max-h-36 space-y-1.5 overflow-auto rounded-md border border-gray-200 bg-gray-50 p-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft">
            {fileList.map((file, index) => {
              const name = file?.name || `파일 ${index + 1}`;
              const sizeLabel = formatChatAttachmentSize(file?.size || 0);
              return (
                <li
                  key={`${name}-${index}`}
                  className="flex items-center gap-2 text-xs text-gray-700 dark:text-odp-fg"
                >
                  <FileIcon size={14} className="shrink-0 opacity-70" aria-hidden />
                  <span className="min-w-0 flex-1 truncate">{name}</span>
                  {sizeLabel ? (
                    <span className="shrink-0 text-gray-500 dark:text-odp-muted">
                      {sizeLabel}
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : null}
        <div className="flex flex-col gap-2">
          {canOpenAsSession ? (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => runOnce(onOpenAsSession)}
              disabled={busy || !hasContent}
              className="w-full"
            >
              <FileText size={16} aria-hidden />
              다운로드 세션으로 열기
            </Button>
          ) : null}
          <Button
            type="button"
            variant={canOpenAsSession ? 'secondary' : 'primary'}
            size="md"
            onClick={() => runOnce(onSendAsSelf)}
            disabled={busy || !canSendAsSelf || !hasContent}
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
            disabled={busy || !hasContent}
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
