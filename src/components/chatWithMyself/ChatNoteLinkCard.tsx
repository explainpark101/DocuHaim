import type { MouseEvent } from 'react';
import { FileText } from 'lucide-react';
import { noteViewHref } from '@/utils/chatWithMyself';

type ChatNoteLinkCardProps = {
  path: string;
  name?: string | null;
  onOpen?: ((path: string) => void) | undefined;
};

/**
 * Note share card inside a chat bubble (note → chat).
 * Visual cousin of the md-editor "chat → note" saved card, not a reply strip.
 */
export default function ChatNoteLinkCard({
  path,
  name = null,
  onOpen,
}: ChatNoteLinkCardProps) {
  const displayName =
    String(name || '').trim() ||
    String(path || '')
      .split('/')
      .filter(Boolean)
      .pop() ||
    'note';
  const href = noteViewHref(path);
  const pathHint = String(path || '').replace(/^\/+/, '');

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    if (typeof onOpen === 'function') {
      e.preventDefault();
      onOpen(path);
    }
  };

  return (
    <a
      href={href}
      title={pathHint || undefined}
      onClick={handleClick}
      className="group mt-1.5 flex max-w-full items-center gap-3 rounded-xl border border-emerald-200/90 bg-linear-to-r from-emerald-50/90 via-white to-teal-50/70 px-3 py-2.5 text-left no-underline shadow-sm transition-[border-color,box-shadow] hover:border-emerald-400/80 hover:shadow-md dark:border-emerald-800/50 dark:from-emerald-950/50 dark:via-odp-bgSoft/90 dark:to-teal-950/30 dark:hover:border-emerald-500/50"
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.35)] dark:bg-emerald-900/50 dark:text-emerald-300 dark:shadow-[inset_0_0_0_1px_rgba(16,185,129,0.35)]"
        aria-hidden
      >
        <FileText size={18} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-semibold tracking-tight text-gray-900 dark:text-odp-fgStrong">
          {displayName}
        </span>
        <span className="truncate text-[11px] text-gray-500 dark:text-gray-400">
          탭하여 노트 열기
        </span>
      </span>
      <span
        className="shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-600 dark:text-gray-500 dark:group-hover:text-emerald-400"
        aria-hidden
      >
        →
      </span>
    </a>
  );
}
