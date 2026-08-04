import { Link } from 'react-router';
import { MessageCircle } from 'lucide-react';
import { chatMessageUrl } from '@/utils/chatWithMyself';

/**
 * Build a React Router location for a chat message deep-link.
 * Path is basename-relative (`/chat`); Router applies Vite `BASE_URL`.
 * @param {{ id?: string, href?: string } | null | undefined} meta
 */
export function chatSavedNoteLinkTo(meta) {
  const raw = String(meta?.href || chatMessageUrl(meta?.id) || '/chat');
  try {
    const url = new URL(raw, 'https://s3haim.local');
    const path = url.pathname || '/chat';
    // Strip accidental BASE_URL prefix if stored absolute-to-site.
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '';
    const pathname =
      base && path.startsWith(`${base}/`)
        ? path.slice(base.length) || '/chat'
        : path.startsWith('/')
          ? path
          : `/${path}`;
    const hash = (url.hash || '').replace(/^#/, '');
    return hash ? { pathname, hash } : pathname;
  } catch {
    const hashMatch = raw.match(/#(.+)$/);
    if (hashMatch) {
      return { pathname: '/chat', hash: hashMatch[1] };
    }
    return '/chat';
  }
}

/**
 * Modern header card for notes created via "노트로 추가".
 * Navigates in-app like React Router `<Link>` (respects basename).
 */
export default function ChatSavedNoteCard({ meta, className = '' }) {
  if (!meta) return null;
  const to = chatSavedNoteLinkTo(meta);

  return (
    <Link
      to={to}
      className={`group mx-3 mt-3 mb-1 flex shrink-0 items-center gap-3 rounded-xl border border-gray-200/90 bg-linear-to-r from-slate-50 via-white to-sky-50/90 px-3.5 py-3 text-left shadow-sm outline-none transition hover:border-sky-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-odp-borderSoft dark:from-odp-bgSoft dark:via-odp-surface dark:to-sky-950/25 dark:hover:border-sky-600/60 ${className}`}
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-200">
        <MessageCircle size={18} strokeWidth={2} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold tracking-tight text-gray-900 dark:text-odp-fgStrong">
          채팅에서 저장된 노트
        </span>
        <span className="mt-0.5 block truncate text-[11px] text-gray-500 dark:text-odp-muted">
          탭하여 원본 채팅으로 이동
        </span>
      </span>
      <span
        className="shrink-0 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-sky-600 dark:text-gray-500 dark:group-hover:text-sky-300"
        aria-hidden
      >
        →
      </span>
    </Link>
  );
}
