import { describe, expect, it } from 'vitest';
import { toQrCodeColorHex } from '@/utils/qrCodeSvg';

describe('toQrCodeColorHex', () => {
  it('keeps 8-digit hex', () => {
    expect(toQrCodeColorHex('#010599FF', '#000000ff')).toBe('#010599ff');
  });

  it('pads 6-digit hex with opaque alpha', () => {
    expect(toQrCodeColorHex('#112233', '#000000ff')).toBe('#112233ff');
  });

  it('falls back for invalid input', () => {
    expect(toQrCodeColorHex('not-a-color', '#ffffffff')).toBe('#ffffffff');
  });
});
