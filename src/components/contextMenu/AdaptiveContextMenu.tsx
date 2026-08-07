import { createContext, useContext, type ReactNode } from 'react';
import { ContextMenu } from 'radix-ui';
import MobileContextMenuModal, {
  useMobileContextMenuClose,
} from '@/components/contextMenu/MobileContextMenuModal';
import {
  MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS,
  MOBILE_CONTEXT_MENU_ITEM_CLASS,
} from '@/components/contextMenu/mobileContextMenuStyles';
import { useMobileContextMenuMode } from '@/hooks/useMobileContextMenuMode';

type MenuSurface = 'desktop' | 'mobile';

const AdaptiveMenuSurfaceContext = createContext<MenuSurface>('desktop');

export function AdaptiveMenuSurfaceProvider({
  surface,
  children,
}: {
  surface: MenuSurface;
  children: ReactNode;
}) {
  return (
    <AdaptiveMenuSurfaceContext.Provider value={surface}>
      {children}
    </AdaptiveMenuSurfaceContext.Provider>
  );
}

export function useAdaptiveMenuSurface(): MenuSurface {
  return useContext(AdaptiveMenuSurfaceContext);
}

type AdaptiveContextMenuProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: ReactNode;
  subtitle?: ReactNode;
  trigger: ReactNode;
  contentClassName?: string;
  children: ReactNode;
  isMobileLayout?: boolean;
};

/**
 * Desktop: Radix ContextMenu at pointer. Mobile portrait: full-screen modal with header.
 */
export function AdaptiveContextMenu({
  open,
  onOpenChange,
  title,
  subtitle,
  trigger,
  contentClassName,
  children,
  isMobileLayout = false,
}: AdaptiveContextMenuProps) {
  const mobile = useMobileContextMenuMode(isMobileLayout);

  if (mobile) {
    return (
      <>
        {trigger}
        <MobileContextMenuModal
          open={Boolean(open)}
          onOpenChange={(next) => onOpenChange?.(next)}
          title={title}
          {...(subtitle !== undefined ? { subtitle } : {})}
        >
          <AdaptiveMenuSurfaceProvider surface="mobile">
            {children}
          </AdaptiveMenuSurfaceProvider>
        </MobileContextMenuModal>
      </>
    );
  }

  return (
    <ContextMenu.Root
      {...(open !== undefined ? { open } : {})}
      {...(onOpenChange ? { onOpenChange } : {})}
    >
      <ContextMenu.Trigger asChild>{trigger}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className={contentClassName}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <AdaptiveMenuSurfaceProvider surface="desktop">
            {children}
          </AdaptiveMenuSurfaceProvider>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

type AdaptiveMenuItemProps = {
  className?: string;
  danger?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  onPointerDown?: (event: React.PointerEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};

export function AdaptiveMenuItem({
  className,
  danger = false,
  disabled = false,
  onSelect,
  onPointerDown,
  children,
}: AdaptiveMenuItemProps) {
  const surface = useAdaptiveMenuSurface();
  const closeMenu = useMobileContextMenuClose();
  const resolvedClass =
    className
    ?? (danger ? MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS : MOBILE_CONTEXT_MENU_ITEM_CLASS);

  if (surface === 'mobile') {
    return (
      <button
        type="button"
        className={resolvedClass}
        disabled={disabled}
        onPointerDown={onPointerDown}
        onClick={() => {
          if (disabled) return;
          onSelect?.();
          closeMenu?.();
        }}
      >
        {children}
      </button>
    );
  }

  const Item = danger ? ContextMenu.Item : ContextMenu.Item;
  return (
    <Item
      className={resolvedClass}
      disabled={disabled}
      onPointerDown={onPointerDown}
      onSelect={onSelect}
    >
      {children}
    </Item>
  );
}

export function AdaptiveMenuSeparator() {
  const surface = useAdaptiveMenuSurface();
  if (surface === 'mobile') {
    return <div className="my-1 h-px bg-gray-200 dark:bg-odp-borderStrong" role="separator" />;
  }
  return (
    <ContextMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-odp-borderStrong" />
  );
}
