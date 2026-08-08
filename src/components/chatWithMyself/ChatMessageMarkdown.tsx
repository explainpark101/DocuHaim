import { useMemo, useRef } from 'react';
import { MdPreview, config } from 'md-editor-rt';
import KO_KR from '@vavt/cm-extension/dist/locale/ko-KR';
import ChatLinkedText from '@/components/chatWithMyself/ChatLinkedText';
import {
  chatAttachmentsToMarkdown,
  extractChatBodyAttachments,
} from '@/utils/chatWithMyself';
import { useDocumentTheme } from '@/hooks/useDocumentTheme';
import { useWikiImageHydration } from '@/hooks/useWikiImageHydration';
import { MD_EDITOR_CODE_THEME } from '@/utils/mdEditorCodeTheme';
import '@/styles/md-editor-rt/preview.css';
import '@/styles/md-editor-rt/code-one-dark.css';

config({
  editorConfig: {
    languageUserDefined: {
      'ko-KR': KO_KR,
    },
  },
});

type ChatMessageMarkdownProps = {
  text?: string | null;
  messageId?: string;
  className?: string;
  collapsed?: boolean;
  theme?: 'light' | 'dark' | null;
  getPresignedUrl?: ((path: string) => Promise<string | null>) | undefined;
  noteExists?: ((path: string) => boolean) | undefined;
  onOpenViewPath?: ((path: string) => void) | undefined;
};

/**
 * Markdown-rendered chat bubble body (MdPreview + chat attachment cards).
 */
export default function ChatMessageMarkdown({
  text,
  messageId = 'msg',
  className = '',
  collapsed = false,
  theme = null,
  getPresignedUrl,
  noteExists,
  onOpenViewPath,
}: ChatMessageMarkdownProps) {
  const appTheme = useDocumentTheme();
  const resolvedTheme = theme || appTheme;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { text: mdText, attachments } = useMemo(
    () => extractChatBodyAttachments(text || ''),
    [text],
  );
  const attachmentMarkdown = useMemo(
    () =>
      chatAttachmentsToMarkdown(
        attachments.map((a) => ({
          kind: a.kind,
          path: a.path,
          name: a.name,
          ...(a.size != null ? { size: a.size } : {}),
          ...(a.background != null ? { background: a.background } : {}),
        })),
      ),
    [attachments],
  );
  const previewId = `chat-msg-md-${messageId}`;

  useWikiImageHydration(rootRef, mdText, getPresignedUrl, null);

  if (collapsed) {
    return (
      <ChatLinkedText
        text={text || ''}
        collapsed
        className={className}
        getPresignedUrl={getPresignedUrl}
        noteExists={noteExists}
        onOpenViewPath={onOpenViewPath}
      />
    );
  }

  const hasMd = Boolean(mdText.trim());
  const hasAttachments = Boolean(attachmentMarkdown);

  if (!hasMd && !hasAttachments) {
    return <div className={className} />;
  }

  return (
    <div
      ref={rootRef}
      className={`chat-message-markdown min-w-0 max-w-full ${className}`}
    >
      {hasMd ? (
        <div className="chat-message-markdown__preview md-editor-preview-wrapper [&_.md-editor]:bg-transparent! [&_.md-editor-preview]:bg-transparent! [&_.md-editor-preview]:p-0! [&_.md-editor-preview]:text-[inherit]! [&_.md-editor-preview-wrapper]:p-0! [&_p]:my-1 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_ul]:my-1 [&_ol]:my-1 [&_pre]:my-1 [&_blockquote]:my-1">
          <MdPreview
            id={previewId}
            value={mdText}
            theme={resolvedTheme}
            language="ko-KR"
            codeTheme={MD_EDITOR_CODE_THEME}
            codeFoldable={false}
            showCodeRowNumber={false}
          />
        </div>
      ) : null}
      {hasAttachments ? (
        <div className={hasMd ? 'mt-1.5' : undefined}>
          <ChatLinkedText
            text={attachmentMarkdown}
            getPresignedUrl={getPresignedUrl}
            noteExists={noteExists}
            onOpenViewPath={onOpenViewPath}
          />
        </div>
      ) : null}
    </div>
  );
}
