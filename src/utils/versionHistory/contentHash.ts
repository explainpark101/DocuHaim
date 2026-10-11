/** Short content fingerprint for skip-identical note snapshots. */

export async function hashTextContent(text: string): Promise<string> {
  const data = new TextEncoder().encode(String(text ?? ''));
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 40);
  }
  let h = 0;
  const s = String(text ?? '');
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return `t${(h >>> 0).toString(16)}`;
}
