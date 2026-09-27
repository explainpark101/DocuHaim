/** High-quality SVG QR generation (node-qrcode, browser). */

export type QrErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type QrCodeSvgOptions = {
  /** Output SVG width/height in px (vector scales cleanly). Default 512. */
  width?: number;
  /** Quiet-zone modules. Default 2. */
  margin?: number;
  /** Error correction: L | M | Q | H. Default H. */
  errorCorrectionLevel?: QrErrorCorrectionLevel;
  /** Module colors as CSS hex (#rrggbb or #rrggbbaa). */
  color?: {
    dark?: string;
    light?: string;
  };
};

export const QR_DEFAULT_WIDTH = 512;
export const QR_DEFAULT_MARGIN = 2;
export const QR_DEFAULT_ERROR_CORRECTION: QrErrorCorrectionLevel = 'H';
export const QR_DEFAULT_DARK = '#000000ff';
export const QR_DEFAULT_LIGHT = '#ffffffff';

/**
 * node-qrcode expects 8-digit hex RGBA (e.g. #000000ff).
 */
export function toQrCodeColorHex(raw: string | undefined, fallback: string): string {
  const value = String(raw ?? '').trim();
  const withHash = value.startsWith('#') ? value : value ? `#${value}` : '';
  if (/^#[0-9a-fA-F]{8}$/.test(withHash)) return withHash.toLowerCase();
  if (/^#[0-9a-fA-F]{6}$/.test(withHash)) return `${withHash.toLowerCase()}ff`;
  const fb = String(fallback || '#000000ff').trim();
  if (/^#[0-9a-fA-F]{8}$/.test(fb)) return fb.toLowerCase();
  if (/^#[0-9a-fA-F]{6}$/.test(fb)) return `${fb.toLowerCase()}ff`;
  return '#000000ff';
}

/**
 * Encode `text` as an SVG QR string.
 */
export async function generateQrCodeSvg(
  text: string,
  options: QrCodeSvgOptions = {},
): Promise<string> {
  const trimmed = String(text ?? '').trim();
  if (!trimmed) {
    throw new Error('QR code text is empty');
  }
  const QRCode = (await import('qrcode')).default;
  return QRCode.toString(trimmed, {
    type: 'svg',
    errorCorrectionLevel: options.errorCorrectionLevel ?? QR_DEFAULT_ERROR_CORRECTION,
    margin: options.margin ?? QR_DEFAULT_MARGIN,
    width: options.width ?? QR_DEFAULT_WIDTH,
    color: {
      dark: toQrCodeColorHex(options.color?.dark, QR_DEFAULT_DARK),
      light: toQrCodeColorHex(options.color?.light, QR_DEFAULT_LIGHT),
    },
  });
}

/**
 * Build a vault-uploadable SVG File from an SVG string.
 */
export function qrCodeSvgToFile(svg: string, textHint = ''): File {
  const slug = String(textHint || '')
    .trim()
    .slice(0, 24)
    .replace(/[^\w.-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  const name = `qrcode-${slug || Date.now()}.svg`;
  return new File([svg], name, { type: 'image/svg+xml' });
}
