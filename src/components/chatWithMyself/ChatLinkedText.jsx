import { useMemo } from 'react';
import { splitTextWithUrls } from '@/utils/chatWithMyself';
import ChatWikiImage from '@/components/chatWithMyself/ChatWikiImage';
import ChatFileCard from '@/components/chatWithMyself/ChatFileCard';

const linkClass =
  'break-all wrap-anywhere underline underline-offset-2 text-blue-700 hover:text-blue-900 dark:text-sky-300 dark:hover:text-sky-200';

/**
 * Render chat plain text with auto-linked http(s) URLs, wiki images, and file cards.
 */
export default function ChatLinkedText({ text, className = '', getPresignedUrl }) {
  const parts = useMemo(() => splitTextWithUrls(text), [text]);

  return (
    <div className={`min-w-0 max-w-full ${className}`}>
      {parts.map((part, i) => {
        if (part.type === 'link') {
          return (
            <a
              key={`l-${i}`}
              href={part.value}
              target="_blank"
              rel="noopener noreferrer"
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
