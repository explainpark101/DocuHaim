import { afterEach, describe, expect, it, vi } from 'vitest';

describe('isSearchIsolationReady (Tauri)', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('is true when VITE_ELECTRON marks a Tauri shell (Android included)', async () => {
    vi.stubEnv('VITE_ELECTRON', 'true');
    const { isSearchIsolationReady } = await import(
      '@/utils/advancedSearch/isolation'
    );
    expect(isSearchIsolationReady()).toBe(true);
  });
});
