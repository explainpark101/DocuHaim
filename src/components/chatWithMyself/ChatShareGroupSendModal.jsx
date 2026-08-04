import { useEffect, useMemo, useRef, useState } from 'react';
import { Send, X } from 'lucide-react';
import Button from '@/components/Button';
import Modal from '@/components/modals/Modal';
import ChatSelect from '@/components/chatWithMyself/ui/ChatSelect';
import ChatAddGroupDialog from '@/components/chatWithMyself/ui/ChatAddGroupDialog';
import {
  ADD_GROUP_VALUE,
  SELF_GROUP,
  sortGroupsKo,
} from '@/utils/chatWithMyself';

const PREVIEW_MAX = 280;

function truncatePreview(body) {
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
  groups = [],
  onAddGroup,
  onSend,
  onClose,
}) {
  const [selectedGroup, setSelectedGroup] = useState(SELF_GROUP);
  const [addOpen, setAddOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const preview = truncatePreview(body);
  const sortedGroups = useMemo(() => sortGroupsKo(groups), [groups]);

  const groupOptions = useMemo(
    () => [
      { value: SELF_GROUP, label: SELF_GROUP },
      ...sortedGroups.map((g) => ({ value: g, label: g })),
      { value: ADD_GROUP_VALUE, label: '직접추가' },
    ],
    [sortedGroups],
  );

  useEffect(() => {
    if (!isOpen) return;
    busyRef.current = false;
    setBusy(false);
    setSelectedGroup(SELF_GROUP);
  }, [isOpen, body]);

  const handleGroupChange = (next) => {
    if (next === ADD_GROUP_VALUE) {
      setAddOpen(true);
      return;
    }
    setSelectedGroup(next);
  };

  const confirmAddGroup = async (name) => {
    await onAddGroup?.(name);
    setSelectedGroup(name);
  };

  const handleSend = async () => {
    if (busyRef.current || !body.trim()) return;
    busyRef.current = true;
    setBusy(true);
    try {
      await onSend?.(body, selectedGroup || SELF_GROUP);
      onClose?.();
    } catch {
      busyRef.current = false;
      setBusy(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Modal isOpen={isOpen} onClose={busy ? undefined : onClose}>
        <div className="p-6">
          <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
            그룹에 보내기
          </h2>
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            보낼 그룹을 선택한 뒤 전송하세요.
          </p>
          {preview ? (
            <pre className="mb-4 max-h-40 overflow-auto whitespace-pre-wrap wrap-break-word rounded-md border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg">
              {preview}
            </pre>
          ) : null}
          <label className="mb-4 block space-y-1">
            <span className="text-[11px] font-medium text-gray-600 dark:text-odp-muted">
              그룹
            </span>
            <ChatSelect
              ariaLabel="그룹 선택"
              value={selectedGroup || SELF_GROUP}
              onValueChange={handleGroupChange}
              options={groupOptions}
              showGroupAvatars
              triggerClassName="w-full"
              className="w-full"
            />
          </label>
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => void handleSend()}
              disabled={busy || !body.trim()}
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
          </div>
        </div>
      </Modal>
      <ChatAddGroupDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onConfirm={confirmAddGroup}
        title="그룹 직접 추가"
      />
    </>
  );
}
