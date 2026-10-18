import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  HAIM_SCROLL_ALIGN_PAD_PX,
  HAIM_SCROLL_ECHO_TTL_MS,
  bindScrollEnd,
  classifyHaimPaneScroll,
  detectHaimScrollDir,
  haimAnchorY,
  haimComputeBottomOverscrollTarget,
  haimLerpSpan,
  haimMarkersContentBottom,
  haimMaxScrollTop,
  haimScrollTopForBottomAlign,
  planHaimFollowerScrollTop,
  shouldDeferScrollLayoutResync,
  shouldWriteFollowerScroll,
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

describe('bidirectional scroll sync', () => {
  it('applies a CM scroll down onto the WYSIWYG follower', () => {
    // Content-align end is far below scrollTop 100, so this is line mapping.
    // down: mappedY 900 sits on the follower bottom pad.
    // 900 - (500 - 32) = 432
    expect(
      planHaimFollowerScrollTop({
        dir: 'down',
        driverScrollTop: 100,
        driverClientHeight: 400,
        driverContentBottom: 5000,
        driverMaxScroll: 4000,
        followerClientHeight: 500,
        followerContentBottom: 4500,
        followerMaxScroll: 4000,
        mappedContentY: 900,
      }),
    ).toBe(432);
  });

  it('applies a WYSIWYG scroll up onto the CM follower', () => {
    // up: mappedY 240 sits on the follower top pad. 240 - 32 = 208
    expect(
      planHaimFollowerScrollTop({
        dir: 'up',
        driverScrollTop: 50,
        driverClientHeight: 500,
        driverContentBottom: 4000,
        driverMaxScroll: 3500,
        followerClientHeight: 400,
        followerContentBottom: 5000,
        followerMaxScroll: 2000,
        mappedContentY: 240,
      }),
    ).toBe(208);
  });

  it('maps CM bottom overscroll onto WYSIWYG padding', () => {
    // driver end = 1000 - (400 - 32) = 632, max 800, top 716 → progress 0.5
    // follower end = 900 - (300 - 32) = 632, max 900 → 632 + 0.5*268 = 766
    expect(
      planHaimFollowerScrollTop({
        dir: 'down',
        driverScrollTop: 716,
        driverClientHeight: 400,
        driverContentBottom: 1000,
        driverMaxScroll: 800,
        followerClientHeight: 300,
        followerContentBottom: 900,
        followerMaxScroll: 900,
        mappedContentY: 10,
      }),
    ).toBe(766);
  });

  it('maps WYSIWYG bottom overscroll onto CM padding', () => {
    // driver end = 900 - (300 - 32) = 632, max 1000, top 816 → progress 0.5
    // follower end = 1000 - (400 - 32) = 632, max 800 → 632 + 0.5*168 = 716
    expect(
      planHaimFollowerScrollTop({
        dir: 'down',
        driverScrollTop: 816,
        driverClientHeight: 300,
        driverContentBottom: 900,
        driverMaxScroll: 1000,
        followerClientHeight: 400,
        followerContentBottom: 1000,
        followerMaxScroll: 800,
        mappedContentY: 10,
      }),
    ).toBe(716);
  });

  it('does not invent a target when neither pane has a mapped line', () => {
    expect(
      planHaimFollowerScrollTop({
        dir: 'down',
        driverScrollTop: 0,
        driverClientHeight: 400,
        driverContentBottom: null,
        driverMaxScroll: 0,
        followerClientHeight: 400,
        followerContentBottom: null,
        followerMaxScroll: 0,
        mappedContentY: null,
      }),
    ).toBeNull();
    expect(
      planHaimFollowerScrollTop({
        dir: 'up',
        driverScrollTop: 20,
        driverClientHeight: 400,
        driverContentBottom: 800,
        driverMaxScroll: 400,
        followerClientHeight: 300,
        followerContentBottom: 700,
        followerMaxScroll: 400,
        mappedContentY: null,
      }),
    ).toBeNull();
  });

  it('treats the WYSIWYG echo of a CM write as not a new driver', () => {
    expect(
      classifyHaimPaneScroll({
        top: 432,
        echo: { top: 432, armedAt: 1_000 },
        now: 1_100,
      }),
    ).toBe('echo');
    expect(
      classifyHaimPaneScroll({
        top: 432.4,
        echo: { top: 432, armedAt: 1_000 },
        now: 1_100,
      }),
    ).toBe('echo');
  });

  it('treats the CM echo of a WYSIWYG write as not a new driver', () => {
    expect(
      classifyHaimPaneScroll({
        top: 208,
        echo: { top: 208, armedAt: 2_000 },
        now: 2_040,
      }),
    ).toBe('echo');
  });

  it('still applies a later CM gesture onto a focused WYSIWYG pane', () => {
    expect(
      classifyHaimPaneScroll({
        top: 800,
        echo: { top: 432, armedAt: 1_000 },
        now: 1_100,
      }),
    ).toBe('user');
    expect(
      shouldWriteFollowerScroll({
        userGesture: true,
        followerFocused: true,
      }),
    ).toBe(true);
  });

  it('still applies a later WYSIWYG gesture onto a focused CM pane', () => {
    expect(
      classifyHaimPaneScroll({
        top: 40,
        echo: { top: 208, armedAt: 2_000 },
        now: 2_100,
      }),
    ).toBe('user');
    expect(
      shouldWriteFollowerScroll({
        userGesture: true,
        followerFocused: true,
      }),
    ).toBe(true);
  });

  it('does not let layout resync yank either focused pane', () => {
    expect(
      shouldWriteFollowerScroll({
        userGesture: false,
        followerFocused: true,
      }),
    ).toBe(false);
    expect(
      shouldWriteFollowerScroll({
        userGesture: false,
        followerFocused: false,
      }),
    ).toBe(true);
  });

  it('expires an echo so a late scroll event cannot hold the other pane', () => {
    expect(
      classifyHaimPaneScroll({
        top: 432,
        echo: { top: 432, armedAt: 1_000 },
        now: 1_000 + HAIM_SCROLL_ECHO_TTL_MS + 1,
      }),
    ).toBe('user');
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
