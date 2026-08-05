import {
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DynamicIcon, iconNames, type IconName } from 'lucide-react/dynamic';
import { Search, Smile, Shapes } from 'lucide-react';
import { Dialog, Popover, Tabs } from 'radix-ui';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import type { ChatReaction } from '@/utils/chatWithMyself/reactions';
import { ensureChatDefaultFrequentEmojis } from '@/utils/chatWithMyself/emojiFrequent';
import {
  chatDialogContentClass,
  chatDialogOverlayClass,
  chatFieldInputClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';

ensureChatDefaultFrequentEmojis();

const PICKER_CONTENT_ATTR = 'data-chat-reaction-picker';
const PICKER_TRIGGER_ATTR = 'data-chat-reaction-trigger';

type TabId = 'emoji' | 'lucide';

type ChatReactionPickerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (reaction: ChatReaction) => void;
  /** Prefer Popover anchored to trigger; Dialog for mobile sheet-style. */
  mode?: 'popover' | 'dialog';
  /** Required when mode is popover — wraps the trigger. */
  children?: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  /** Accessible dialog title (dialog mode). */
  title?: string;
  /** Close after a pick. Set false to select several reactions (search). */
  closeOnSelect?: boolean;
};

/** Close when pointer lands outside this picker instance (capture phase). */
function useCloseOnOutsidePointer(
  open: boolean,
  pickerId: string,
  onOpenChange: (open: boolean) => void,
) {
  useEffect(() => {
    if (!open) return undefined;

    const isInside = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      const content = document.querySelector(
        `[${PICKER_CONTENT_ATTR}="${pickerId}"]`,
      );
      const trigger = document.querySelector(
        `[${PICKER_TRIGGER_ATTR}="${pickerId}"]`,
      );
      return Boolean(
        content?.contains(target) || trigger?.contains(target),
      );
    };

    const onPointerDown = (event: PointerEvent) => {
      if (isInside(event.target)) return;
      onOpenChange(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false);
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, [open, pickerId, onOpenChange]);
}

const POPULAR_LUCIDE = [
  'heart',
  'thumbs-up',
  'thumbs-down',
  'smile',
  'laugh',
  'frown',
  'meh',
  'angry',
  'star',
  'sparkles',
  'flame',
  'zap',
  'check',
  'x',
  'plus',
  'bookmark',
  'pin',
  'flag',
  'bell',
  'eye',
  'message-circle',
  'party-popper',
  'gift',
  'coffee',
  'pizza',
  'music',
  'camera',
  'image',
  'file-text',
  'link',
  'lightbulb',
  'rocket',
  'trophy',
  'award',
  'circle-check',
  'circle-alert',
  'info',
  'help-circle',
  'brain',
  'bug',
] as const satisfies readonly IconName[];

const LUCIDE_NAME_SET = new Set<string>(iconNames);
const VALID_POPULAR = POPULAR_LUCIDE.filter((n) => LUCIDE_NAME_SET.has(n));

const MAX_LUCIDE_RESULTS = 96;

function useEmojiMartTheme(): 'light' | 'dark' {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light',
  );
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      setTheme(root.classList.contains('dark') ? 'dark' : 'light');
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return theme;
}

function LucideIconGrid({
  names,
  onPick,
}: {
  names: IconName[];
  onPick: (name: IconName) => void;
}) {
  if (names.length === 0) {
    return (
      <p className="px-3 py-8 text-center text-sm text-gray-500">
        검색 결과가 없습니다
      </p>
    );
  }
  return (
    <div className="grid grid-cols-8 gap-0.5 p-2 sm:grid-cols-9">
      {names.map((name) => (
        <button
          key={name}
          type="button"
          title={name}
          aria-label={name}
          className="inline-flex aspect-square items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg"
          onClick={() => onPick(name)}
        >
          <DynamicIcon name={name} size={18} />
        </button>
      ))}
    </div>
  );
}

function PickerBody({
  onSelect,
  autoFocusSearch,
}: {
  onSelect: (reaction: ChatReaction) => void;
  autoFocusSearch?: boolean;
}) {
  const [tab, setTab] = useState<TabId>('emoji');
  const [lucideQuery, setLucideQuery] = useState('');
  const deferredQuery = useDeferredValue(lucideQuery.trim().toLowerCase());
  const emojiTheme = useEmojiMartTheme();

  useEffect(() => {
    ensureChatDefaultFrequentEmojis();
  }, []);

  const lucideNames = useMemo((): IconName[] => {
    if (!deferredQuery) return [...VALID_POPULAR];
    const q = deferredQuery.replace(/\s+/g, '-').replace(/_/g, '-');
    const raw = deferredQuery.replace(/[-_\s]+/g, '');
    const matches: IconName[] = [];
    for (const name of iconNames) {
      if (name.includes(q) || name.replace(/-/g, '').includes(raw)) {
        matches.push(name);
        if (matches.length >= MAX_LUCIDE_RESULTS) break;
      }
    }
    return matches;
  }, [deferredQuery]);

  return (
    <Tabs.Root
      value={tab}
      onValueChange={(v) => setTab(v === 'lucide' ? 'lucide' : 'emoji')}
      className="flex min-h-0 w-full flex-col"
    >
      <Tabs.List className="flex shrink-0 gap-1 border-b border-gray-200 px-2 pt-2 dark:border-odp-borderSoft">
        <Tabs.Trigger
          value="emoji"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-t-md px-2 py-1.5 text-xs font-medium text-gray-500 outline-none data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 dark:text-gray-400 dark:data-[state=active]:bg-odp-focusBg dark:data-[state=active]:text-odp-fgStrong"
        >
          <Smile size={14} />
          이모지
        </Tabs.Trigger>
        <Tabs.Trigger
          value="lucide"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-t-md px-2 py-1.5 text-xs font-medium text-gray-500 outline-none data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 dark:text-gray-400 dark:data-[state=active]:bg-odp-focusBg dark:data-[state=active]:text-odp-fgStrong"
        >
          <Shapes size={14} />
          아이콘
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="emoji" className="min-h-0 w-full outline-none">
        <div className="emoji-mart-host w-full overflow-hidden [&_em-emoji-picker]:!w-full [&_em-emoji-picker]:!max-w-none [&_em-emoji-picker]:!border-0 [&_em-emoji-picker]:!shadow-none">
          <Picker
            data={data}
            theme={emojiTheme}
            locale="ko"
            previewPosition="none"
            skinTonePosition="search"
            searchPosition="sticky"
            navPosition="bottom"
            dynamicWidth
            emojiSize={22}
            emojiButtonSize={34}
            maxFrequentRows={2}
            autoFocus={Boolean(autoFocusSearch)}
            onEmojiSelect={(emoji) => {
              const native = String(emoji?.native || '').trim();
              if (!native) return;
              onSelect({ kind: 'emoji', value: native });
            }}
          />
        </div>
      </Tabs.Content>

      <Tabs.Content
        value="lucide"
        className="flex min-h-0 flex-col outline-none"
      >
        <div className="shrink-0 border-b border-gray-100 p-2 dark:border-odp-borderSoft">
          <label className="relative block">
            <Search
              size={14}
              className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={lucideQuery}
              onChange={(e) => setLucideQuery(e.target.value)}
              placeholder="아이콘 이름 검색 (예: heart, star)"
              className={`${chatFieldInputClass} pl-7`}
              autoFocus={autoFocusSearch && tab === 'lucide'}
            />
          </label>
        </div>
        <div className="max-h-[280px] overflow-y-auto">
          {!deferredQuery ? (
            <p className="px-3 pt-2 text-[11px] text-gray-400">자주 쓰는 아이콘</p>
          ) : null}
          <LucideIconGrid
            names={lucideNames}
            onPick={(name) => onSelect({ kind: 'lucide', value: name })}
          />
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}

/**
 * Discord-style reaction picker: emoji (searchable via emoji-mart) + Lucide icons.
 */
export default function ChatReactionPicker({
  open,
  onOpenChange,
  onSelect,
  mode = 'popover',
  children,
  side = 'top',
  align = 'center',
  title = '반응 추가',
  closeOnSelect = true,
}: ChatReactionPickerProps) {
  const pickerId = useId();
  useCloseOnOutsidePointer(open, pickerId, onOpenChange);

  const handleSelect = (reaction: ChatReaction) => {
    onSelect(reaction);
    if (closeOnSelect) onOpenChange(false);
  };

  const trigger =
    children != null ? (
      <span {...{ [PICKER_TRIGGER_ATTR]: pickerId }} className="inline-flex">
        {mode === 'dialog' ? (
          <Dialog.Trigger asChild>{children}</Dialog.Trigger>
        ) : (
          <Popover.Trigger asChild>{children}</Popover.Trigger>
        )}
      </span>
    ) : null;

  if (mode === 'dialog') {
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        {trigger}
        <Dialog.Portal>
          <Dialog.Overlay
            className={chatDialogOverlayClass}
            onClick={() => onOpenChange(false)}
          />
          <Dialog.Content
            {...{ [PICKER_CONTENT_ATTR]: pickerId }}
            className={`${chatDialogContentClass} w-[min(92vw,352px)] overflow-hidden p-0`}
            aria-describedby={undefined}
            onPointerDownOutside={() => onOpenChange(false)}
            onInteractOutside={() => onOpenChange(false)}
            onEscapeKeyDown={() => onOpenChange(false)}
          >
            <Dialog.Title className="sr-only">{title}</Dialog.Title>
            <PickerBody onSelect={handleSelect} autoFocusSearch />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  return (
    <Popover.Root modal open={open} onOpenChange={onOpenChange}>
      {trigger}
      <Popover.Portal>
        <Popover.Content
          {...{ [PICKER_CONTENT_ATTR]: pickerId }}
          side={side}
          align={align}
          sideOffset={6}
          collisionPadding={8}
          className="z-[230] w-[min(92vw,352px)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onPointerDownOutside={() => onOpenChange(false)}
          onInteractOutside={() => onOpenChange(false)}
          onEscapeKeyDown={() => onOpenChange(false)}
        >
          <PickerBody onSelect={handleSelect} autoFocusSearch />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
