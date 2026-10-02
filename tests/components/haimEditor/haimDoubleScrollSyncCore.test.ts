import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  HAIM_SCROLL_ALIGN_PAD_PX,
  bindScrollEnd,
  detectHaimScrollDir,
  haimAnchorY,
  haimComputeBottomOverscrollTarget,
  haimLerpSpan,
  haimMarkersContentBottom,
  haimMaxScrollTop,
  haimScrollTopForBottomAlign,
  shouldDeferScrollLayoutResync,
  supportsScrollEndEvent,
} from '@/components/haimEditor/haimDoubleScrollSyncCore';

describe('detectHaimScrollDir', () => {
  it('treats equal or greater top as down', () => {
    expect(detectHaimScrollDir(10, 10)).toBe('down');
    expect(detectHaimScrollDir(10, 20)).toBe('down');
  });

  it('treats smaller top as up', () => {
    expect(detectHaimScrollDir(20, 10)).toBe('up');
  });
});

describe('haimAnchorY / haimScrollTopForBottomAlign', () => {
  it('anchors near the bottom pad when scrolling down', () => {
    const scroller = {
      scrollTop: 100,
      clientHeight: 400,
    } as HTMLElement;
    expect(haimAnchorY(scroller, 'down')).toBe(
      100 + 400 - HAIM_SCROLL_ALIGN_PAD_PX,
    );
  });

  it('anchors near the top pad when scrolling up', () => {
    const scroller = {
      scrollTop: 100,
      clientHeight: 400,
    } as HTMLElement;
    expect(haimAnchorY(scroller, 'up')).toBe(100 + HAIM_SCROLL_ALIGN_PAD_PX);
  });

  it('computes bottom-align scrollTop from content bottom', () => {
    const scroller = { clientHeight: 400 } as HTMLElement;
    expect(haimScrollTopForBottomAlign(scroller, 1000)).toBe(
      1000 - (400 - HAIM_SCROLL_ALIGN_PAD_PX),
    );
  });
});

describe('haimMaxScrollTop / haimMarkersContentBottom', () => {
  it('clamps max scroll to non-negative', () => {
    expect(
      haimMaxScrollTop({
        scrollHeight: 100,
        clientHeight: 200,
      } as HTMLElement),
    ).toBe(0);
    expect(
      haimMaxScrollTop({
        scrollHeight: 500,
        clientHeight: 200,
      } as HTMLElement),
    ).toBe(300);
  });

  it('returns last marker bottom or null', () => {
    expect(haimMarkersContentBottom([])).toBeNull();
    expect(
      haimMarkersContentBottom([
        { top: 10, height: 20 },
        { top: 100, height: 40 },
      ]),
    ).toBe(140);
  });
});

describe('haimComputeBottomOverscrollTarget', () => {
  it('returns null when driver is not past content end', () => {
    expect(haimComputeBottomOverscrollTarget(50, 100, 200, 80, 180)).toBeNull();
  });

  it('maps driver padding progress onto follower padding', () => {
    // driver: end=100, max=200 → mid padding at 150 → progress 0.5
    // follower: end=80, max=180 → target 80 + 0.5*100 = 130
    expect(haimComputeBottomOverscrollTarget(150, 100, 200, 80, 180)).toBe(130);
  });

  it('clamps to followerMax when follower has no padding range', () => {
    expect(haimComputeBottomOverscrollTarget(150, 100, 200, 180, 180)).toBe(180);
  });
});

describe('haimLerpSpan', () => {
  it('interpolates within the span', () => {
    expect(haimLerpSpan(5, 0, 10, 100, 200)).toBe(150);
  });

  it('clamps outside the span', () => {
    expect(haimLerpSpan(-5, 0, 10, 100, 200)).toBe(100);
    expect(haimLerpSpan(99, 0, 10, 100, 200)).toBe(200);
  });
});

describe('shouldDeferScrollLayoutResync', () => {
  it('defers while content-sync suppress is active', () => {
    expect(
      shouldDeferScrollLayoutResync({
        suppressed: true,
        tipTapFocused: false,
        cmFocused: false,
      }),
    ).toBe(true);
  });

  it('defers while either pane is focused (typing)', () => {
    expect(
      shouldDeferScrollLayoutResync({
        suppressed: false,
        tipTapFocused: true,
        cmFocused: false,
      }),
    ).toBe(true);
    expect(
      shouldDeferScrollLayoutResync({
        suppressed: false,
        tipTapFocused: false,
        cmFocused: true,
      }),
    ).toBe(true);
  });

  it('allows layout resync when idle and not suppressed', () => {
    expect(
      shouldDeferScrollLayoutResync({
        suppressed: false,
        tipTapFocused: false,
        cmFocused: false,
      }),
    ).toBe(false);
  });
});

describe('bindScrollEnd', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  function fakeScroller(withScrollEndProp: boolean): {
    el: EventTarget & { onscrollend?: null };
    add: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
  } {
    const listeners = new Map<string, Set<EventListener>>();
    const add = vi.fn((type: string, fn: EventListener) => {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type)!.add(fn);
    });
    const remove = vi.fn((type: string, fn: EventListener) => {
      listeners.get(type)?.delete(fn);
    });
    const el = {
      addEventListener: add,
      removeEventListener: remove,
      dispatchEvent(event: Event) {
        const set = listeners.get(event.type);
        if (set) for (const fn of set) fn(event);
        return true;
      },
    } as EventTarget & { onscrollend?: null };
    if (withScrollEndProp) {
      el.onscrollend = null;
    }
    return { el, add, remove };
  }

  it('uses native scrollend when the target exposes onscrollend', () => {
    const { el, add } = fakeScroller(true);
    const onEnd = vi.fn();
    // Force window path off by stubbing supports via element-only detection.
    const dispose = bindScrollEnd(el as HTMLElement, onEnd);
    expect(add).toHaveBeenCalledWith(
      'scrollend',
      onEnd,
      expect.objectContaining({ passive: true }),
    );
    el.dispatchEvent(new Event('scrollend'));
    expect(onEnd).toHaveBeenCalledTimes(1);
    dispose();
  });

  it('falls back to debounced scroll when scrollend is missing', () => {
    vi.useFakeTimers();
    const win = typeof window !== 'undefined' ? window : null;
    // If the runtime already has window.onscrollend, native path wins — skip.
    if (supportsScrollEndEvent(win)) {
      expect(supportsScrollEndEvent(win)).toBe(true);
      return;
    }
    const { el, add } = fakeScroller(false);
    const onEnd = vi.fn();
    const dispose = bindScrollEnd(el as HTMLElement, onEnd, 40);
    expect(add).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      expect.objectContaining({ passive: true }),
    );
    el.dispatchEvent(new Event('scroll'));
    expect(onEnd).not.toHaveBeenCalled();
    vi.advanceTimersByTime(40);
    expect(onEnd).toHaveBeenCalledTimes(1);
    dispose();
  });
});
