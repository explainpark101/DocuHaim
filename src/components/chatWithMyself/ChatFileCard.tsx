import { useEffect, useState } from 'react';
import { Download, FileText, Loader2 } from 'lucide-react';
import { resolveWikiImageUrl } from '@/utils/wikiImageResolver';
import { formatChatAttachmentSize } from '@/utils/chatWithMyself';

/**
 * File attachment card inside a chat message bubble.
 */
export default function ChatFileCard({
  path,
  name,
  size = null,
  getPresignedUrl
}: any) {
  const [url, setUrl] = useState(null);
  const [failed, setFailed] = useState(false);
  const displayName = name || path?.split('/').filter(Boolean).pop() || 'file';
  const sizeLabel = formatChatAttachmentSize(size);

  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    setUrl(null);
    if (!path || !getPresignedUrl) {
      setFailed(true);
      return undefined;
    }
    resolveWikiImageUrl(path, getPresignedUrl)
      .then((u: any) => {
        if (!cancelled) {
          if (u) setUrl(u);
          else setFailed(true);
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [path, getPresignedUrl]);

  if (failed) {
    return (
      <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-black/5 px-2.5 py-2 text-xs text-gray-500 dark:border-odp-borderSoft dark:bg-white/5">
        <FileText size={16} className="shrink-0 opacity-60" />
        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        <span className="min-w-0 truncate">{displayName}</span>
        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        <span className="shrink-0 text-[10px] text-gray-400">로드 실패</span>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
    );
  }

  if (!url) {
    return (
      <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-black/10 bg-black/5 px-2.5 py-2 dark:border-white/10 dark:bg-white/5">
        <Loader2 size={16} className="animate-spin text-gray-400" />
        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        <span className="truncate text-xs text-gray-500">{displayName}</span>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
    );
  }

  return (
    <a
      href={url}
      download={displayName}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e: any) => e.stopPropagation()}
      className="mt-1.5 flex max-w-full items-center gap-2.5 rounded-lg border border-black/10 bg-white/90 px-2.5 py-2 text-left shadow-sm transition hover:border-blue-300 hover:bg-blue-50/80 dark:border-white/12 dark:bg-odp-bgSoft/90 dark:hover:border-blue-500/40 dark:hover:bg-odp-focusBg"
    >
      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
        <FileText size={18} />
      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      </span>
      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      <span className="min-w-0 flex-1">
        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        <span className="block truncate text-sm font-medium text-gray-800 dark:text-odp-fgStrong">
          {displayName}
        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
        </span>
        {sizeLabel ? (
          <span className="block text-[11px] text-gray-500 dark:text-gray-400">
            {sizeLabel}
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          </span>
        ) : null}
      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      </span>
      <Download size={16} className="shrink-0 text-gray-400" aria-hidden />
    // @ts-expect-error TS(2339): Property 'a' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'a' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
    // @ts-expect-error TS(2339): Property 'a' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'a' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
    </a>
  );
}
