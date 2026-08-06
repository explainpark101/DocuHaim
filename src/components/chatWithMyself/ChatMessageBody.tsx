import ChatLinkedText from '@/components/chatWithMyself/ChatLinkedText';
import ChatMessageMarkdown from '@/components/chatWithMyself/ChatMessageMarkdown';
import { isChatMessageMarkdown } from '@/utils/chatWithMyself';

type ChatMessageBodyProps = {
  /** Full message object or a plain `{ markdown?, id? }` flag carrier. */
  message?: { id?: string; markdown?: unknown } | null;
  text?: string | null;
  /** Explicit override; when omitted, derived from `message`. */
  markdown?: boolean;
  className?: string;
  collapsed?: boolean;
  theme?: 'light' | 'dark' | null;
  getPresignedUrl?: ((path: string) => Promise<string | null>) | undefined;
  noteExists?: ((path: string) => boolean) | undefined;
  onOpenViewPath?: ((path: string) => void) | undefined;
};

/**
 * Chat bubble / preview body: plain ChatLinkedText or markdown MdPreview.
 */
export default function ChatMessageBody({
  message = null,
  text,
  markdown,
  className = '',
  collapsed = false,
  theme = null,
  getPresignedUrl,
  noteExists,
  onOpenViewPath,
}: ChatMessageBodyProps) {
  const useMarkdown =
    markdown !== undefined ? Boolean(markdown) : isChatMessageMarkdown(message);
  const body = text ?? '';

  if (useMarkdown) {
    return (
      <ChatMessageMarkdown
        text={body}
        messageId={message?.id || 'msg'}
        className={className}
        collapsed={collapsed}
        theme={theme}
        getPresignedUrl={getPresignedUrl}
        noteExists={noteExists}
        onOpenViewPath={onOpenViewPath}
      />
    );
  }

  return (
    <ChatLinkedText
      text={body}
      className={className}
      collapsed={collapsed}
      getPresignedUrl={getPresignedUrl}
      noteExists={noteExists}
      onOpenViewPath={onOpenViewPath}
    />
  );
}
