const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let k = 0; k < 8; k += 1) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) {
    crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function writeUint16LE(view, offset, value) {
  view.setUint16(offset, value & 0xffff, true);
}

function writeUint32LE(view, offset, value) {
  view.setUint32(offset, value >>> 0, true);
}

/**
 * Build an uncompressed ZIP archive in browser.
 * @param {{ path: string, data: Uint8Array }[]} entries
 * @returns {Blob}
 */
export function buildZipBlob(entries) {
  const encoder = new TextEncoder();
  const UTF8_FILENAME_FLAG = 0x0800;
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const entry of entries) {
    const normalizedPath = (entry.path || '').replace(/^\/+/, '').replace(/\\/g, '/');
    if (!normalizedPath) continue;
    const fileNameBytes = encoder.encode(normalizedPath);
    const data = entry.data instanceof Uint8Array ? entry.data : new Uint8Array(entry.data || []);
    const checksum = crc32(data);

    const localHeader = new Uint8Array(30 + fileNameBytes.length);
    const localView = new DataView(localHeader.buffer);
    writeUint32LE(localView, 0, 0x04034b50);
    writeUint16LE(localView, 4, 20);
    writeUint16LE(localView, 6, UTF8_FILENAME_FLAG);
    writeUint16LE(localView, 8, 0);
    writeUint16LE(localView, 10, 0);
    writeUint16LE(localView, 12, 0);
    writeUint32LE(localView, 14, checksum);
    writeUint32LE(localView, 18, data.length);
    writeUint32LE(localView, 22, data.length);
    writeUint16LE(localView, 26, fileNameBytes.length);
    writeUint16LE(localView, 28, 0);
    localHeader.set(fileNameBytes, 30);
    localParts.push(localHeader, data);

    const centralHeader = new Uint8Array(46 + fileNameBytes.length);
    const centralView = new DataView(centralHeader.buffer);
    writeUint32LE(centralView, 0, 0x02014b50);
    writeUint16LE(centralView, 4, 20);
    writeUint16LE(centralView, 6, 20);
    writeUint16LE(centralView, 8, UTF8_FILENAME_FLAG);
    writeUint16LE(centralView, 10, 0);
    writeUint16LE(centralView, 12, 0);
    writeUint16LE(centralView, 14, 0);
    writeUint32LE(centralView, 16, checksum);
    writeUint32LE(centralView, 20, data.length);
    writeUint32LE(centralView, 24, data.length);
    writeUint16LE(centralView, 28, fileNameBytes.length);
    writeUint16LE(centralView, 30, 0);
    writeUint16LE(centralView, 32, 0);
    writeUint16LE(centralView, 34, 0);
    writeUint16LE(centralView, 36, 0);
    writeUint32LE(centralView, 38, 0);
    writeUint32LE(centralView, 42, offset);
    centralHeader.set(fileNameBytes, 46);
    centralParts.push(centralHeader);

    offset += localHeader.length + data.length;
  }

  const centralDirectorySize = centralParts.reduce((sum, p) => sum + p.length, 0);
  const centralDirectoryOffset = offset;

  const endRecord = new Uint8Array(22);
  const endView = new DataView(endRecord.buffer);
  writeUint32LE(endView, 0, 0x06054b50);
  writeUint16LE(endView, 4, 0);
  writeUint16LE(endView, 6, 0);
  writeUint16LE(endView, 8, centralParts.length);
  writeUint16LE(endView, 10, centralParts.length);
  writeUint32LE(endView, 12, centralDirectorySize);
  writeUint32LE(endView, 16, centralDirectoryOffset);
  writeUint16LE(endView, 20, 0);

  return new Blob([...localParts, ...centralParts, endRecord], { type: 'application/zip' });
}
