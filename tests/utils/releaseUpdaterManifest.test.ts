import { describe, expect, it } from 'vitest';
import {
  buildUpdaterManifest,
  missingInstallers,
} from '@/utils/releaseUpdaterManifest';

const api = {
  apiBase: 'https://api.github.com',
  repository: 'explainpark101/DocuHaim',
  version: '2.4.0',
  notes: 'notes',
  pubDate: '2026-10-18T00:00:00.000Z',
};

describe('buildUpdaterManifest', () => {
  it('keeps every platform and does not let a lower-priority bundle replace NSIS', () => {
    const manifest = buildUpdaterManifest({
      ...api,
      assets: [
        { id: 1, name: 'DocuHaim_2.4.0_x64-setup.exe' },
        { id: 2, name: 'DocuHaim_2.4.0_x64-setup.exe.sig' },
        { id: 3, name: 'DocuHaim_2.4.0_x64_en-US.msi' },
        { id: 4, name: 'DocuHaim_2.4.0_x64_en-US.msi.sig' },
        { id: 5, name: 'DocuHaim.app.tar.gz' },
        { id: 6, name: 'DocuHaim.app.tar.gz.sig' },
        { id: 7, name: 'DocuHaim_2.4.0_universal.dmg' },
      ],
      signatures: {
        'DocuHaim_2.4.0_x64_en-US.msi.sig': 'msi-sig',
        'DocuHaim_2.4.0_x64-setup.exe.sig': 'nsis-sig',
        'DocuHaim.app.tar.gz.sig': 'mac-sig',
      },
    });

    expect(manifest.platforms['windows-x86_64']).toEqual({
      signature: 'nsis-sig',
      url: 'https://api.github.com/repos/explainpark101/DocuHaim/releases/assets/1',
    });
    expect(manifest.platforms['windows-x86_64-nsis']?.signature).toBe('nsis-sig');
    expect(manifest.platforms['windows-x86_64-msi']?.signature).toBe('msi-sig');
    expect(manifest.platforms['darwin-aarch64']?.url).toContain('/assets/5');
    expect(manifest.platforms['darwin-x86_64']?.signature).toBe('mac-sig');
    expect(manifest.platforms['darwin-aarch64-app']?.signature).toBe('mac-sig');
    expect(manifest.platforms['darwin-x86_64-app']?.signature).toBe('mac-sig');
    expect(Object.keys(manifest.platforms).some((key) => key.includes('dmg'))).toBe(false);
  });
});

describe('missingInstallers', () => {
  it('does not treat a signature as the installer it signs', () => {
    expect(missingInstallers(['DocuHaim.app.tar.gz.sig', 'DocuHaim_2.4.0_x64-setup.exe.sig'])).toEqual(
      expect.arrayContaining([
        'macOS updater archive (*.app.tar.gz)',
        'Windows NSIS installer (*-setup.exe)',
      ]),
    );
  });

  it('lists every installer family that is absent', () => {
    expect(missingInstallers(['DocuHaim_2.4.0_universal.dmg'])).toEqual(
      expect.arrayContaining([
        'macOS updater archive (*.app.tar.gz)',
        'Windows NSIS installer (*-setup.exe)',
        'Android arm64-v8a APK',
      ]),
    );
  });

  it('accepts the full desktop and Android set', () => {
    expect(
      missingInstallers([
        'DocuHaim_2.4.0_universal.dmg',
        'DocuHaim.app.tar.gz',
        'DocuHaim.app.tar.gz.sig',
        'DocuHaim_2.4.0_x64-setup.exe',
        'DocuHaim_2.4.0_x64-setup.exe.sig',
        'DocuHaim_2.4.0_arm64-v8a-debug.apk',
        'DocuHaim_2.4.0_armeabi-v7a-debug.apk',
        'DocuHaim_2.4.0_x86_64-debug.apk',
        'DocuHaim_2.4.0_x86-debug.apk',
        'DocuHaim_2.4.0_universal-debug.apk',
      ]),
    ).toEqual([]);
  });
});
