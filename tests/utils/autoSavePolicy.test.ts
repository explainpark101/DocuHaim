import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  AUTO_SAVE_POLICY_DEFAULT,
  autoSaveDelayToMs,
  convertAutoSaveAmount,
  loadAutoSavePolicy,
  saveAutoSavePolicy,
} from '@/utils/workspaceTabsSettings';

describe('autoSavePolicy', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('converts seconds and milliseconds without shrinking below the minimum', () => {
    expect(convertAutoSaveAmount(5, 's', 'ms')).toBe(5000);
    expect(convertAutoSaveAmount(1500, 'ms', 's')).toBe(2);
    expect(convertAutoSaveAmount(50, 'ms', 'ms')).toBe(100);
    expect(autoSaveDelayToMs({ amount: 2, unit: 's' })).toBe(2000);
  });

  it('migrates a legacy focus-change mode and otherwise defaults to idle save', () => {
    const store = new Map<string, string>();
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => {
          store.set(key, value);
        },
      },
      dispatchEvent: () => true,
    });

    expect(loadAutoSavePolicy()).toEqual(AUTO_SAVE_POLICY_DEFAULT);

    store.set('s3haim_workspace_tabs_auto_save', 'onFocusChange');
    expect(loadAutoSavePolicy().mode).toBe('onFocusChange');

    const saved = saveAutoSavePolicy({ mode: 'afterDelay', amount: 800, unit: 'ms' });
    expect(saved).toEqual({ mode: 'afterDelay', amount: 800, unit: 'ms' });
    store.delete('s3haim_workspace_tabs_auto_save');
    expect(loadAutoSavePolicy()).toEqual(saved);
  });
});
