import { describe, expect, it } from 'vitest';
import { isAndroidContentUri } from '@/utils/shared/desktopOpenFiles';

describe('isAndroidContentUri', () => {
  it('detects content URIs that must skip plugin-fs', () => {
    expect(isAndroidContentUri('content://media/external/images/1')).toBe(true);
    expect(isAndroidContentUri('  CONTENT://media/1')).toBe(true);
  });

  it('leaves filesystem paths on the plugin-fs path', () => {
    expect(isAndroidContentUri('/storage/emulated/0/Download/a.md')).toBe(false);
    expect(isAndroidContentUri('file:///sdcard/a.md')).toBe(false);
    expect(isAndroidContentUri('')).toBe(false);
  });
});
