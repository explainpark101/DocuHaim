import { describe, expect, it, vi } from 'vitest';
import {
  allocateEditorImagePath,
  uploadEditorImageViaWriteBytes,
} from '@/utils/vaultEditorImageUpload';

describe('vaultEditorImageUpload', () => {
  it('allocateEditorImagePath builds .images path with uuid and extension', async () => {
    const file = new File([new Uint8Array([0x89, 0x50, 0x4e, 0x47])], 'shot.png', {
      type: 'image/png',
    });
    const { path, contentType } = await allocateEditorImagePath(
      file,
      '.images/notes/demo',
    );
    expect(path).toMatch(/^\.images\/notes\/demo\/[0-9a-f-]+\.png$/i);
    expect(contentType).toBe('image/png');
  });

  it('uploadEditorImageViaWriteBytes writes bytes and returns path', async () => {
    const writes: Array<{ path: string; size: number; contentType?: string }> = [];
    const backend = {
      writeBytes: vi.fn(async (path: string, body: Uint8Array, contentType?: string) => {
        writes.push({ path, size: body.byteLength, contentType });
      }),
    };
    const file = new File([new Uint8Array([1, 2, 3, 4])], 'a.jpg', {
      type: 'image/jpeg',
    });
    const path = await uploadEditorImageViaWriteBytes(backend, file, {
      imagePathPrefix: '.images/n/t',
    });
    expect(path).toMatch(/^\.images\/n\/t\/.+\.jpg$/);
    expect(backend.writeBytes).toHaveBeenCalledOnce();
    expect(writes[0]?.size).toBe(4);
    expect(writes[0]?.contentType).toBe('image/jpeg');
  });

  it('uploadEditorImageViaWriteBytes aborts when signal is aborted', async () => {
    const backend = { writeBytes: vi.fn() };
    const file = new File([new Uint8Array([1])], 'a.png', { type: 'image/png' });
    const controller = new AbortController();
    controller.abort();
    await expect(
      uploadEditorImageViaWriteBytes(backend, file, { signal: controller.signal }),
    ).rejects.toMatchObject({ name: 'AbortError' });
    expect(backend.writeBytes).not.toHaveBeenCalled();
  });
});
