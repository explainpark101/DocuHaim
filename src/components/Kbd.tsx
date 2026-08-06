import type { ReactNode } from 'react';

type KbdProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Keyboard key cap styling for shortcut hints.
 */
export default function Kbd({ children, className = '' }: KbdProps) {
  return (
    <kbd
      className={[
        'inline-flex shrink-0 min-w-7 items-center justify-center whitespace-nowrap rounded-md border border-b-2 border-gray-300 bg-linear-to-b from-white to-gray-100 px-2 py-1 font-mono text-xs font-semibold leading-none text-ink shadow-[0_1px_0_rgba(15,23,42,0.06)] dark:border-odp-borderStrong dark:from-odp-surface dark:to-odp-bgSoft dark:text-odp-fgStrong',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </kbd>
  );
}

type KbdChordProps = {
  keys: ReactNode[];
  className?: string;
};

/** Renders keys joined with + (e.g. Mod + G). Wraps when the row is too narrow. */
export function KbdChord({ keys, className = '' }: KbdChordProps) {
  return (
    <span className={`inline-flex max-w-full flex-wrap items-center gap-x-0.5 gap-y-1 ${className}`}>
      {keys.map((key, i) => (
        <span key={i} className="inline-flex shrink-0 items-center gap-0.5">
          {i > 0 ? (
            <span className="px-0.5 text-xs text-gray-400 dark:text-odp-muted" aria-hidden>
              +
            </span>
          ) : null}
          <Kbd>{key}</Kbd>
        </span>
      ))}
    </span>
  );
}

function isApplePlatform(): boolean {
  if (typeof navigator === 'undefined') return false;
  const platform = navigator.platform || '';
  const ua = navigator.userAgent || '';
  return /Mac|iPhone|iPad|iPod/i.test(platform) || /Mac OS/i.test(ua);
}

export function getModKeyLabel(): string {
  return isApplePlatform() ? '⌘' : 'Ctrl';
}

export function getAltKeyLabel(): string {
  return isApplePlatform() ? '⌥' : 'Alt';
}
