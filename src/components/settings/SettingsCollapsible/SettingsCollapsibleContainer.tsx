import {
  useCallback,
  useMemo,
  useState,
  type FormEventHandler,
  type ReactNode,
} from 'react';
import { SettingsCollapsibleProvider } from '@/components/settings/SettingsCollapsible/context';

type ContainerElement = 'div' | 'section' | 'form';

type SettingsCollapsibleContainerProps = {
  as?: ContainerElement;
  children: ReactNode;
  contentKey?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  id?: string;
  tabIndex?: number;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  'aria-labelledby'?: string;
};

export default function SettingsCollapsibleContainer({
  as = 'div',
  children,
  id,
  contentKey: contentKeyProp,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  className = '',
  tabIndex,
  onSubmit,
  'aria-labelledby': ariaLabelledBy,
}: SettingsCollapsibleContainerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean | ((prev: boolean) => boolean)) => {
      const resolved = typeof next === 'function' ? next(open) : next;
      if (!isControlled) {
        setUncontrolledOpen(resolved);
      }
      onOpenChange?.(resolved);
    },
    [isControlled, onOpenChange, open],
  );

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  const contentKey = contentKeyProp ?? (typeof id === 'string' ? id : 'settings-collapse');

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      toggle,
      contentKey,
    }),
    [contentKey, open, setOpen, toggle],
  );

  const sharedProps = {
    ...(id ? { id } : {}),
    ...(tabIndex !== undefined ? { tabIndex } : {}),
    ...(ariaLabelledBy ? { 'aria-labelledby': ariaLabelledBy } : {}),
    className,
  };

  return (
    <SettingsCollapsibleProvider value={contextValue}>
      {as === 'form' ? (
        <form {...sharedProps} onSubmit={onSubmit}>
          {children}
        </form>
      ) : as === 'section' ? (
        <section {...sharedProps}>{children}</section>
      ) : (
        <div {...sharedProps}>{children}</div>
      )}
    </SettingsCollapsibleProvider>
  );
}
