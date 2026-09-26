/** High-quality SVG QR generation (node-qrcode, browser). */

export type QrCodeSvgOptions = {
  /** Output SVG width/height in px (vector scales cleanly). Default 512. */
  width?: number;
  /** Quiet-zone modules. Default 2. */
  margin?: number;
  /** Error correction: L | M | Q | H. Default H. */
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
};

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
    errorCorrectionLevel: options.errorCorrectionLevel ?? 'H',
    margin: options.margin ?? 2,
    width: options.width ?? 512,
    color: {
      dark: '#000000ff',
      light: '#ffffffff',
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
