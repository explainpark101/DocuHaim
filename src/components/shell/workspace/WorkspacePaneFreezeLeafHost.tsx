import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import WorkspacePaneCompactHost from '@/components/shell/workspace/WorkspacePaneCompactHost';
import {
  isWorkspacePaneSurfaceLive,
  WORKSPACE_PANE_HOVER_FREEZE_MS,
  type WorkspacePaneFreezeMode,
} from '@/utils/workspacePaneFreezeSettings';

type WorkspacePaneFreezeLeafHostProps = {
  shellIsMobile: boolean;
  freezeMode: WorkspacePaneFreezeMode;
  /** Orphan full-window view keeps the split tree mounted but hidden — always pause. */
  activeIsOrphan: boolean;
  children: (contentIsMobileLayout: boolean, surfaceLive: boolean) => ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

/**
 * Pane leaf shell that tracks hover + keyboard focus-within to decide
 * whether the editor surface should stay live under the freeze mode.
 * Hover-off is debounced to avoid thrashing when the pointer crosses gutters.
 */
export default function WorkspacePaneFreezeLeafHost({
  shellIsMobile,
  freezeMode,
  activeIsOrphan,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  onFocusCapture,
  onBlurCapture,
  onPointerDownCapture,
  ...rest
}: WorkspacePaneFreezeLeafHostProps) {
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const hoverLeaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hoverLeaveTimerRef.current != null) {
        clearTimeout(hoverLeaveTimerRef.current);
        hoverLeaveTimerRef.current = null;
      }
    };
  }, []);

  const clearHoverLeaveTimer = () => {
    if (hoverLeaveTimerRef.current != null) {
      clearTimeout(hoverLeaveTimerRef.current);
      hoverLeaveTimerRef.current = null;
    }
  };

  const surfaceLive =
    !activeIsOrphan &&
    isWorkspacePaneSurfaceLive(freezeMode, { hovered, focusWithin });

  return (
    <WorkspacePaneCompactHost
      shellIsMobile={shellIsMobile}
      className={className}
      tabIndex={-1}
      onMouseEnter={(e) => {
        clearHoverLeaveTimer();
        setHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        clearHoverLeaveTimer();
        hoverLeaveTimerRef.current = setTimeout(() => {
          hoverLeaveTimerRef.current = null;
          setHovered(false);
        }, WORKSPACE_PANE_HOVER_FREEZE_MS);
        onMouseLeave?.(e);
      }}
      onFocusCapture={(e) => {
        setFocusWithin(true);
        onFocusCapture?.(e);
      }}
      onBlurCapture={(e: FocusEvent<HTMLDivElement>) => {
        const next = e.relatedTarget as Node | null;
        if (!e.currentTarget.contains(next)) {
          setFocusWithin(false);
        }
        onBlurCapture?.(e);
      }}
      onPointerDownCapture={(e) => {
        // Focus-only freeze: inert children (e.g. quiz) cannot receive clicks —
        // move keyboard focus onto the leaf so the surface can unfreeze.
        if (
          freezeMode !== 'off' &&
          !isWorkspacePaneSurfaceLive(freezeMode, { hovered, focusWithin })
        ) {
          e.currentTarget.focus({ preventScroll: true });
        }
        onPointerDownCapture?.(e);
      }}
      {...rest}
    >
      {(contentIsMobileLayout) => children(contentIsMobileLayout, surfaceLive)}
    </WorkspacePaneCompactHost>
  );
}
