import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { GripHorizontal, PanelRightOpen, X } from 'lucide-react';
import HaimProseWidthControls from '@/components/settings/HaimProseWidthControls';
import HaimCodeWrapControls from '@/components/settings/HaimCodeWrapControls';
import { useHistoryOverlayBack } from '@/hooks/useHistoryOverlayBack';
import { subscribeSettingsToggles } from '@/utils/advancedSearch/settingsToggles';
import {
  closeHaimProseWidthPanel,
  isHaimProseWidthPanelOpen,
  subscribeHaimProseWidthPanel,
} from '@/utils/haimProseWidthPanel';
import {
  hasStoredHaimProseWidthPanelPosition,
  loadHaimProseWidthPanelPosition,
  resolveDefaultHaimProseWidthPanelPosition,
  saveHaimProseWidthPanelPosition,
} from '@/utils/haimProseWidthPanelPosition';
import {
  HAIM_PROSE_WIDTH_CHANGED_EVENT,
  loadHaimProseWidthSettings,
  type HaimProseWidthSettings,
} from '@/utils/haimProseWidthSettings';
import {
  HAIM_CODE_WRAP_CHANGED_EVENT,
  loadHaimCodeWrapEnabled,
} from '@/utils/haimCodeWrapSettings';

/**
 * Draggable floating panel for live Haim WYSIWYG prose max-width tuning.
 * Mount once at app shell so it stays open after leaving Settings.
 * No corner size handles — header drag moves only.
 */
export default function HaimProseWidthFloatingPanel() {
  const [open, setOpen] = useState(() => isHaimProseWidthPanelOpen());
  const [settings, setSettings] = useState<HaimProseWidthSettings>(() =>
    loadHaimProseWidthSettings(),
  );
  const [codeWrap, setCodeWrap] = useState(() => loadHaimCodeWrapEnabled());
  const [position, setPosition] = useState(() => loadHaimProseWidthPanelPosition());
  const panelRef = useRef<HTMLDivElement | null>(null);
  const anchoredRef = useRef(hasStoredHaimProseWidthPanelPosition());
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startLeftVw: 0,
    startTopVh: 0,
  });

  useEffect(() => subscribeHaimProseWidthPanel(setOpen), []);

  useEffect(() => {
    if (!open) return;
    const syncWidth = () => setSettings(loadHaimProseWidthSettings());
    const syncWrap = () => setCodeWrap(loadHaimCodeWrapEnabled());
    syncWidth();
    syncWrap();
    window.addEventListener(HAIM_PROSE_WIDTH_CHANGED_EVENT, syncWidth);
    window.addEventListener(HAIM_CODE_WRAP_CHANGED_EVENT, syncWrap);
    const unsub = subscribeSettingsToggles((id) => {
      if (id === 'settings-haim-prose-width-clamp') syncWidth();
      if (id === 'settings-haim-code-wrap') syncWrap();
    });
    return () => {
      window.removeEventListener(HAIM_PROSE_WIDTH_CHANGED_EVENT, syncWidth);
      window.removeEventListener(HAIM_CODE_WRAP_CHANGED_EVENT, syncWrap);
      unsub();
    };
  }, [open]);

  // First open (no saved pos): park above status bar, bottom-right.
  useLayoutEffect(() => {
    if (!open || anchoredRef.current) return;
    const el = panelRef.current;
    const w = el?.offsetWidth ?? 360;
    const h = el?.offsetHeight ?? 160;
    setPosition(resolveDefaultHaimProseWidthPanelPosition(w, h));
  }, [open]);

  const handleClose = useCallback(() => {
    closeHaimProseWidthPanel();
  }, []);

  useHistoryOverlayBack(open, handleClose, open, 'haim-prose-width-panel');

  const startPositionDrag = useCallback(
    (e: ReactPointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();

      dragRef.current = {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        startLeftVw: position.leftVw,
        startTopVh: position.topVh,
      };

      const onMove = (ev: PointerEvent) => {
        if (!dragRef.current.active) return;
        const vw = window.innerWidth || 1;
        const vh = window.innerHeight || 1;
        const dxVw = ((ev.clientX - dragRef.current.startX) / vw) * 100;
        const dyVh = ((ev.clientY - dragRef.current.startY) / vh) * 100;
        setPosition({
          leftVw: Math.min(92, Math.max(0, dragRef.current.startLeftVw + dxVw)),
          topVh: Math.min(90, Math.max(0, dragRef.current.startTopVh + dyVh)),
        });
      };

      const onUp = () => {
        if (!dragRef.current.active) return;
        dragRef.current.active = false;
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        anchoredRef.current = true;
        setPosition((prev) => {
          saveHaimProseWidthPanelPosition(prev);
          return prev;
        });
      };

      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
    },
    [position.leftVw, position.topVh],
  );

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={panelRef}
      className="fixed z-10050 w-[min(92vw,360px)] rounded-lg border border-slate-300/80 bg-white/95 shadow-2xl backdrop-blur-md dark:border-odp-borderStrong dark:bg-odp-surface/95"
      style={{ left: `${position.leftVw}vw`, top: `${position.topVh}vh` }}
      role="dialog"
      aria-modal="false"
      aria-label="보기 설정"
    >
      <div
        className="flex cursor-grab items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/90 px-3 py-2 active:cursor-grabbing dark:border-odp-borderSoft dark:bg-odp-bgSoft/80"
        onPointerDown={startPositionDrag}
      >
        <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-800 dark:text-odp-fgStrong">
          <GripHorizontal size={16} className="shrink-0 opacity-50" aria-hidden />
          <PanelRightOpen size={15} className="shrink-0" aria-hidden />
          <span className="truncate">보기 설정</span>
        </div>
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleClose}
          className="rounded p-1 text-slate-600 hover:bg-slate-200/80 dark:text-odp-muted dark:hover:bg-odp-focusBg"
          aria-label="닫기"
        >
          <X size={15} />
        </button>
      </div>
      <div className="space-y-3 p-3">
        <HaimProseWidthControls settings={settings} compact />
        <div className="border-t border-slate-200 pt-3 dark:border-odp-borderSoft">
          <HaimCodeWrapControls enabled={codeWrap} compact />
        </div>
      </div>
    </div>,
    document.body,
  );
}
