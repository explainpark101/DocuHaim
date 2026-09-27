import { forwardRef } from 'react';

const TEXTAREA_CLASS =
  'box-border h-full min-h-0 w-full resize-none border-0 bg-transparent px-2.5 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-odp-fgStrong dark:placeholder:text-gray-500';

export type ChatComposerPlainTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  fillParent?: boolean;
  minHeight?: number;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
};

/**
 * Native textarea used for mobile, lightweight mode, and editor-chunk loading.
 */
const ChatComposerPlainTextarea = forwardRef<
  HTMLTextAreaElement,
  ChatComposerPlainTextareaProps
>(function ChatComposerPlainTextarea(
  {
    value,
    onChange,
    fillParent = false,
    minHeight = 40,
    placeholder = '메시지 입력…',
    className = '',
    autoFocus = false,
  },
  ref,
) {
  return (
    <textarea
      ref={ref}
      data-chat-composer-textarea=""
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className={`${TEXTAREA_CLASS} ${className}`.trim()}
      style={
        fillParent
          ? { height: '100%' }
          : { height: '100%', minHeight }
      }
      aria-label="메시지 입력"
    />
  );
});

export default ChatComposerPlainTextarea;
