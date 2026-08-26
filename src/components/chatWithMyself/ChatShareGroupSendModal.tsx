import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, FileIcon, Send, X } from 'lucide-react';
import Button from '@/components/Button';
import Modal from '@/components/shared/modals/Modal';
import ChatSelect from '@/components/chatWithMyself/ui/ChatSelect';
import {
  ADD_GROUP_VALUE,
  SELF_GROUP,
  formatChatAttachmentSize,
  sortGroupsKo,
} from '@/utils/chatWithMyself';

const PREVIEW_MAX = 280;

function truncatePreview(body: any) {
  const text = String(body || '').trim();
  if (!text) return '';
  if (text.length <= PREVIEW_MAX) return text;
  return `${text.slice(0, PREVIEW_MAX)}…`;
}

/**
 * Pick a group and send a share-target payload immediately.
 */
export default function ChatShareGroupSendModal({
  isOpen,
  body = '',
  files = [],
  groups = [],
  onAddGroup,
  onSend,
  onClose,
  getPresignedUrl
}: any) {
  const [selectedGroup, setSelectedGroup] = useState(SELF_GROUP);
  const [inlineAddOpen, setInlineAddOpen] = useState(false);
  const [inlineGroupName, setInlineGroupName] = useState('');
  const [addingGroup, setAddingGroup] = useState(false);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const inlineGroupInputRef = useRef(null);
  const preview = truncatePreview(body);
  const fileList = useMemo(
    () => (Array.isArray(files) ? files.filter(Boolean) : []),
    [files],
  );
  const hasContent = Boolean(preview) || fileList.length > 0;
  const sortedGroups = useMemo(() => sortGroupsKo(groups), [groups]);

  const groupOptions = useMemo(
    () => [
      { value: SELF_GROUP, label: SELF_GROUP },
      ...sortedGroups.map((g: any) => ({
        value: g.id,
        label: g.name,
        iconPath: g.iconPath
      })),
      { value: ADD_GROUP_VALUE, label: '직접추가' },
    ],
    [sortedGroups],
  );

  const groupSelectValue = inlineAddOpen
    ? ADD_GROUP_VALUE
    : selectedGroup || SELF_GROUP;

  useEffect(() => {
    if (!isOpen) return;
    busyRef.current = false;
    setBusy(false);
    setSelectedGroup(SELF_GROUP);
    setInlineAddOpen(false);
    setInlineGroupName('');
  }, [isOpen, body, fileList.length]);

  useEffect(() => {
    if (!inlineAddOpen) return undefined;
    const id = window.requestAnimationFrame(() => {
      // @ts-expect-error TS(2339) FIXME: Property 'focus' does not exist on type 'never'.
      inlineGroupInputRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [inlineAddOpen]);

  const handleGroupChange = (next: any) => {
    if (next === ADD_GROUP_VALUE) {
      setInlineAddOpen(true);
      setInlineGroupName('');
      return;
    }
    setInlineAddOpen(false);
    setInlineGroupName('');
    setSelectedGroup(next);
  };

  const closeInlineAdd = () => {
    setInlineAddOpen(false);
    setInlineGroupName('');
  };

  const commitInlineGroup = async () => {
    const trimmed = inlineGroupName.trim();
    if (!trimmed || addingGroup) return;
    setAddingGroup(true);
    try {
      const next = await onAddGroup?.(trimmed);
      const created = Array.isArray(next)
        ? next.find((g) => g.name === trimmed) || next[next.length - 1]
        : null;
      setSelectedGroup(created?.id || trimmed);
      closeInlineAdd();
    } catch {
      /* keep input */
    } finally {
      setAddingGroup(false);
    }
  };

  const handleSend = async () => {
    if (busyRef.current || !hasContent) return;
    busyRef.current = true;
    setBusy(true);
    try {
      await onSend?.(body, selectedGroup || SELF_GROUP, fileList);
      onClose?.();
    } catch {
      busyRef.current = false;
      setBusy(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={busy ? undefined : onClose}
      onConfirm={busy || !hasContent ? undefined : () => void handleSend()}
    >      <div className="p-6">
        // @ts-expect-error TS(2339): Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
        <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
          그룹에 보내기
        // @ts-expect-error TS(2339): Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
        </h2>
        // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
          보낼 그룹을 선택한 뒤 전송하세요.
        // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
        </p>
        {preview ? (
          <pre className="mb-3 max-h-40 overflow-auto whitespace-pre-wrap wrap-break-word rounded-md border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg">
            {preview}
          // @ts-expect-error TS(2339): Property 'pre' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'pre' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'pre' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'pre' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
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
                  // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                  <span className="min-w-0 flex-1 truncate">{name}</span>
                  {sizeLabel ? (
                    <span className="shrink-0 text-gray-500 dark:text-odp-muted">
                      {sizeLabel}
                    // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                    </span>
                  ) : null}
                // @ts-expect-error TS(2339): Property 'li' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'li' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'li' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'li' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
                </li>
              );
            })}
          // @ts-expect-error TS(2339): Property 'ul' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'ul' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'ul' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'ul' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          </ul>
        ) : null}
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="mb-4 space-y-1">
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          <span className="text-[11px] font-medium text-gray-600 dark:text-odp-muted">
            그룹
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          </span>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="flex items-center gap-1.5">
            <ChatSelect
              ariaLabel="그룹 선택"
              value={groupSelectValue}
              onValueChange={handleGroupChange}
              options={groupOptions}
              showGroupAvatars
              getPresignedUrl={getPresignedUrl}
              triggerClassName="w-full"
              className="min-w-0 flex-1"
            />
            {inlineAddOpen ? (
              <>
                // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
                <input
                  ref={inlineGroupInputRef}
                  type="text"
                  value={inlineGroupName}
                  onChange={(e: any) => setInlineGroupName(e.target.value)}
                  onKeyDown={(e: any) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      void commitInlineGroup();
                    } else if (e.key === 'Escape') {
                      e.preventDefault();
                      closeInlineAdd();
                    }
                  }}
                  placeholder="그룹명"
                  disabled={addingGroup || busy}
                  className="w-[7.5rem] shrink-0 rounded-md border border-gray-300 bg-transparent px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-40 dark:border-odp-borderStrong dark:text-odp-fgStrong"
                  aria-label="그룹 직접 추가"
                />
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                <button
                  type="button"
                  title="그룹 추가"
                  aria-label="그룹 추가"
                  disabled={addingGroup || busy || !inlineGroupName.trim()}
                  onMouseDown={(e: any) => e.preventDefault()}
                  onClick={() => void commitInlineGroup()}
                  className="inline-flex shrink-0 items-center justify-center rounded p-1 text-blue-600 hover:bg-blue-50 disabled:opacity-40 dark:text-blue-300 dark:hover:bg-blue-900/30"
                >
                  <Check size={16} />
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                </button>
              </>
            ) : null}
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => void handleSend()}
            disabled={busy || !hasContent}
            className="w-full"
          >
            <Send size={16} aria-hidden />
            보내기
          </Button>
          <Button
            type="button"
            variant="tertiary"
            size="md"
            onClick={onClose}
            disabled={busy}
            className="w-full"
          >
            <X size={16} aria-hidden />
            취소
          </Button>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
    </Modal>
  );
}
