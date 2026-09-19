import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  formatStatusBarClock,
  formatStatusBarClockPattern,
  loadStatusBarClockCustomPattern,
  loadStatusBarClockEnabled,
  loadStatusBarClockFormat,
  loadStatusBarClockShowDate,
  resolveStatusBarClockPattern,
  saveStatusBarClockEnabled,
  setStatusBarClockCustomPattern,
  setStatusBarClockFormat,
  setStatusBarClockShowDate,
} from '@/utils/statusBarClockSettings';

const ENABLED_KEY = 's3haim_status_bar_clock';
const SHOW_DATE_KEY = 's3haim_status_bar_clock_show_date';
const FORMAT_KEY = 's3haim_status_bar_clock_format';
const CUSTOM_KEY = 's3haim_status_bar_clock_custom_pattern';

function stubLocalStorage() {
  const map = new Map<string, string>();
  const storage = {
    getItem: (k: string) => (map.has(k) ? map.get(k)! : null),
    setItem: (k: string, v: string) => {
      map.set(k, String(v));
    },
    removeItem: (k: string) => {
      map.delete(k);
    },
    clear: () => {
      map.clear();
    },
  };
  vi.stubGlobal('localStorage', storage);
  vi.stubGlobal('window', {
    localStorage: storage,
    dispatchEvent: () => true,
  });
  return storage;
}

describe('statusBarClockSettings', () => {
  beforeEach(() => {
    stubLocalStorage();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('defaults to on', () => {
    expect(loadStatusBarClockEnabled()).toBe(true);
  });

  it('defaults showDate to off', () => {
    expect(loadStatusBarClockShowDate()).toBe(false);
  });

  it('persists enable/disable', () => {
    saveStatusBarClockEnabled(false);
    expect(window.localStorage.getItem(ENABLED_KEY)).toBe('0');
    expect(loadStatusBarClockEnabled()).toBe(false);

    saveStatusBarClockEnabled(true);
    expect(window.localStorage.getItem(ENABLED_KEY)).toBe('1');
    expect(loadStatusBarClockEnabled()).toBe(true);
  });

  it('persists showDate', () => {
    setStatusBarClockShowDate(true);
    expect(window.localStorage.getItem(SHOW_DATE_KEY)).toBe('1');
    expect(loadStatusBarClockShowDate()).toBe(true);
  });

  it('defaults format to 24h', () => {
    expect(loadStatusBarClockFormat()).toBe('24h');
  });

  it('persists format including custom', () => {
    setStatusBarClockFormat('12h');
    expect(window.localStorage.getItem(FORMAT_KEY)).toBe('12h');
    setStatusBarClockFormat('custom');
    expect(loadStatusBarClockFormat()).toBe('custom');
  });

  it('persists custom pattern', () => {
    setStatusBarClockCustomPattern('yy/MM/dd HH:mm');
    expect(window.localStorage.getItem(CUSTOM_KEY)).toBe('yy/MM/dd HH:mm');
    expect(loadStatusBarClockCustomPattern()).toBe('yy/MM/dd HH:mm');
  });

  it('resolves preset patterns with optional date', () => {
    expect(
      resolveStatusBarClockPattern({
        format: '24h',
        showDate: false,
        customPattern: '',
      }),
    ).toBe('HH:mm:ss');
    expect(
      resolveStatusBarClockPattern({
        format: '24h',
        showDate: true,
        customPattern: '',
      }),
    ).toBe('yyyy-MM-dd HH:mm:ss');
    expect(
      resolveStatusBarClockPattern({
        format: '12h',
        showDate: false,
        customPattern: '',
      }),
    ).toBe('hh:mm:ss A');
  });

  it('formats 24h as HH:mm:ss', () => {
    const label = formatStatusBarClock(new Date(2026, 0, 15, 15, 4, 5).getTime(), {
      format: '24h',
      showDate: false,
      customPattern: '',
    });
    expect(label).toBe('15:04:05');
  });

  it('formats 12h with AM/PM and optional date', () => {
    const timeOnly = formatStatusBarClock(new Date(2026, 0, 15, 15, 4, 5).getTime(), {
      format: '12h',
      showDate: false,
      customPattern: '',
    });
    expect(timeOnly).toBe('03:04:05 PM');

    const withDate = formatStatusBarClock(new Date(2026, 0, 15, 15, 4, 5).getTime(), {
      format: '12h',
      showDate: true,
      customPattern: '',
    });
    expect(withDate).toBe('2026-01-15 03:04:05 PM');
  });

  it('formats custom pattern tokens', () => {
    const date = new Date(2026, 0, 15, 15, 4, 5);
    expect(formatStatusBarClockPattern(date, 'yyyy/MM/dd HH:mm:ss')).toBe(
      '2026/01/15 15:04:05',
    );
    expect(
      formatStatusBarClock(date.getTime(), {
        format: 'custom',
        showDate: true,
        customPattern: 'MM-dd hh:mm a',
      }),
    ).toBe('01-15 03:04 pm');
  });
});
