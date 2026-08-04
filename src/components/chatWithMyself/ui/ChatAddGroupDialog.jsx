import { useEffect, useRef, useState } from 'react';
import { Dialog, Form } from 'radix-ui';
import {
  chatDialogContentClass,
  chatDialogOverlayClass,
  chatFieldInputClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';

/**
 * Add-group dialog (Radix Dialog + Form).
 */
export default function ChatAddGroupDialog({
  open,
  onOpenChange,
  onConfirm,
  title = '그룹 추가',
}) {
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) setName('');
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      onOpenChange?.(false);
      return;
    }
    try {
      await onConfirm?.(trimmed);
      onOpenChange?.(false);
    } catch {
      /* keep open on failure */
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={chatDialogOverlayClass} />
        <Dialog.Content
          className={chatDialogContentClass}
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
        >
          <Dialog.Title className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
            {title}
          </Dialog.Title>
          <Form.Root className="mt-3 space-y-3" onSubmit={handleSubmit}>
            <Form.Field name="groupName" className="space-y-1">
              <Form.Label className="text-[11px] text-gray-500">그룹명</Form.Label>
              <Form.Control asChild>
                <input
                  ref={inputRef}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="그룹명"
                  className={chatFieldInputClass}
                />
              </Form.Control>
              <Form.Message match="valueMissing" className="text-[11px] text-red-500">
                그룹명을 입력하세요
              </Form.Message>
            </Form.Field>
            <div className="flex justify-end gap-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-md px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-odp-focusBg"
                >
                  취소
                </button>
              </Dialog.Close>
              <Form.Submit asChild>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-3 py-1.5 text-xs text-white hover:bg-blue-700"
                >
                  추가
                </button>
              </Form.Submit>
            </div>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
