import type { HTMLAttributes, ReactNode } from 'react';

type WorkspaceTabHostProps = {
  /** Ordered panels matching open tabs (or a fixed set keyed by tab id). */
  children: ReactNode;
};

/**
 * Keep-alive stack: inactive panels should be `hidden` + `inert` from the parent.
 * This host is a flex column that fills the workspace content area.
 */
export default function WorkspaceTabHost({ children }: WorkspaceTabHostProps) {
  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white dark:bg-odp-bgSofter">
      {children}
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );
}

type WorkspaceKeepAlivePanelProps = {
  active: boolean;
  children: ReactNode;
  /** Optional class for the panel root. */
  className?: string;
};

export function WorkspaceKeepAlivePanel({
  active,
  children,
  className = '',
}: WorkspaceKeepAlivePanelProps) {
  const inactiveProps = !active ? ({ inert: true } as HTMLAttributes<HTMLDivElement>) : {};
  return (
    <div
      className={`absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden ${
        active ? '' : 'pointer-events-none'
      } ${className}`}
      hidden={!active}
      aria-hidden={!active}
      {...inactiveProps}
    >
      {children}
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );
}
