import { useMemo } from 'react';
import { splitTextWithUrls } from '@/utils/chatWithMyself';
import ChatWikiImage from '@/components/chatWithMyself/ChatWikiImage';
import ChatFileCard from '@/components/chatWithMyself/ChatFileCard';
import { useOpenLinksInNewWindow } from '@/components/chatWithMyself/ChatUiPrefsContext';

const linkClass =
  'break-all wrap-anywhere underline underline-offset-2 text-blue-700 hover:text-blue-900 dark:text-sky-300 dark:hover:text-sky-200';

/**
 * First non-empty text line when collapsed (skip images/files and blank lines).
 * @param {ReturnType<typeof splitTextWithUrls>} parts
 */
function collapsedFirstLine(parts) {
  let hasMedia = false;
  let text = '';
  for (const part of parts) {
    if (part.type === 'wiki' || part.type === 'file') {
      hasMedia = true;
      continue;
    }
    text += part.value || '';
  }
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  let firstLine = '';
  let firstIdx = -1;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trimEnd();
    if (line.trim()) {
      firstLine = line;
      firstIdx = i;
      break;
    }
  }
  const hasMoreAfter =
    firstIdx >= 0 &&
    lines.slice(firstIdx + 1).some((line) => line.trim().length > 0);
  const hasMore = hasMedia || hasMoreAfter || (firstIdx < 0 && text.length > 0);
  return { firstLine, hasMore };
}

/**
 * Render chat plain text with auto-linked http(s) URLs, wiki images, and file cards.
 */
export default function ChatLinkedText({
  text,
  className = '',
  getPresignedUrl,
  collapsed = false,
}) {
  const openInNewWindow = useOpenLinksInNewWindow();
  const parts = useMemo(() => splitTextWithUrls(text), [text]);

  if (collapsed) {
    const { firstLine, hasMore } = collapsedFirstLine(parts);
    const display =
      firstLine && hasMore
        ? `${firstLine}…`
        : firstLine || (hasMore ? '…' : '');
    return (
      <div
        className={`min-w-0 max-w-full truncate whitespace-nowrap ${className}`}
        title={firstLine || undefined}
      >
        {display}
      </div>
    );
  }

  return (
    <div className={`min-w-0 max-w-full ${className}`}>
      {parts.map((part, i) => {
        if (part.type === 'link') {
          return (
            <a
              key={`l-${i}`}
              href={part.value}
              {...(openInNewWindow
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className={linkClass}
              onClick={(e) => e.stopPropagation()}
            >
              {part.value}
            </a>
          );
        }
        if (part.type === 'wiki') {
          return (
            <ChatWikiImage
              key={`w-${i}-${part.value}`}
              path={part.value}
              getPresignedUrl={getPresignedUrl}
            />
          );
        }
        if (part.type === 'file') {
          return (
            <ChatFileCard
              key={`f-${i}-${part.path}`}
              path={part.path}
              name={part.name}
              size={part.size}
              getPresignedUrl={getPresignedUrl}
            />
          );
        }
        return <span key={`t-${i}`}>{part.value}</span>;
      })}
    </div>
  );
}
