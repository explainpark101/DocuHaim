import { BlobWriter, TextReader, Uint8ArrayReader, ZipWriter } from '@zip.js/zip.js';

/**
 * Build ZIP archive in browser with zip.js.
 * @param {{ path: string, data: Uint8Array }[]} entries
 * @returns {Promise<Blob>}
 */
export async function buildZipBlob(entries: any) {
  const writer = new BlobWriter('application/zip');
  const zipWriter = new ZipWriter(writer, {
    useUnicodeFileNames: true,
    useWebWorkers: true,
  });
  for (const entry of entries) {
    const normalizedPath = (entry.path || '').replace(/^\/+/, '').replace(/\\/g, '/');
    if (!normalizedPath) continue;
    const data = entry.data instanceof Uint8Array ? entry.data : new Uint8Array(entry.data || []);
    const reader = data.length > 0
      ? new Uint8ArrayReader(data)
      : new TextReader('');
    await zipWriter.add(normalizedPath, reader, {
      level: 6,
    });
  }
  await zipWriter.close();
  return writer.getData();
}
