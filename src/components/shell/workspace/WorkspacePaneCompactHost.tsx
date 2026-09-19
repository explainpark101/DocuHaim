import { useRef, type HTMLAttributes, type ReactNode } from 'react';
import { useElementNarrowLayout } from '@/hooks/useElementNarrowLayout';

type WorkspacePaneCompactHostProps = {
  /** Window/shell mobile flag (sidebar chrome, split disable, …). */
  shellIsMobile: boolean;
  children: (contentIsMobileLayout: boolean) => ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

/**
 * Measures the pane leaf box and reports compact layout when it is as narrow
 * as the mobile viewport breakpoint (or the shell is already mobile).
 */
export default function WorkspacePaneCompactHost({
  shellIsMobile,
  className,
  children,
  ...rest
}: WorkspacePaneCompactHostProps) {
  const ref = useRef<HTMLDivElement>(null);
  const paneNarrow = useElementNarrowLayout(ref);
  const contentIsMobileLayout = shellIsMobile || paneNarrow;

  return (
    <div ref={ref} className={className} {...rest}>
      {children(contentIsMobileLayout)}
    </div>
  );
}
