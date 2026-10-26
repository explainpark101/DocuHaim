import { Editor } from '@tiptap/core';
import { describe, expect, it } from 'vitest';
import { createHaimExtensions } from '@/components/haimEditor/createHaimExtensions';
import { isRenderableImageSrc } from '@/components/haimEditor/extensions/stockImageSrc';
import { isStorageImageSrc } from '@/utils/storageImagePath';

const SRC = 'attachment:51a532f8-364a-4d50-8974-48e0f09a395e.png';

function openEditor(markdown: string) {
  return new Editor({
    extensions: createHaimExtensions({ placeholder: '', profile: 'note' }),
    content: markdown,
    contentType: 'markdown',
  });
}

function paragraphImage(editor: Editor) {
  let paragraphPos = -1;
  let imageInline = false;
  let imageSrc = '';
  let parentName = '';
  editor.state.doc.descendants((node, pos) => {
    if (node.type.name === 'paragraph' && paragraphPos < 0) paragraphPos = pos;
    if (node.type.name !== 'image') return;
    imageInline = node.isInline;
    imageSrc = String(node.attrs.src || '');
    parentName = editor.state.doc.resolve(pos).parent.type.name;
  });
  return { paragraphPos, imageInline, imageSrc, parentName };
}

describe('stock markdown image', () => {
  it('treats attachment urls as unloadable and not vault keys', () => {
    expect(isRenderableImageSrc(SRC)).toBe(false);
    expect(isRenderableImageSrc('')).toBe(false);
    expect(isRenderableImageSrc('https://example.com/a.png')).toBe(true);
    expect(isRenderableImageSrc('./pictures/a.png')).toBe(true);
    expect(isStorageImageSrc(SRC)).toBe(false);
    expect(isStorageImageSrc('./pictures/a.png')).toBe(true);
    expect(isStorageImageSrc('https://example.com/a.png')).toBe(false);
  });

  it('opens a missing attachment image without a schema error', () => {
    const editor = openEditor(`![image.png](${SRC})\n`);
    try {
      expect(() => editor.state.doc.check()).not.toThrow();
      const found = paragraphImage(editor);
      expect(found.imageSrc).toBe(SRC);
      expect(found.imageInline).toBe(true);
      expect(found.parentName).toBe('paragraph');
      const paragraph = editor.state.doc.nodeAt(found.paragraphPos);
      expect(() => {
        editor.state.tr.setNodeMarkup(found.paragraphPos, undefined, {
          ...paragraph!.attrs,
          id: 'test-id',
        });
      }).not.toThrow();
      expect(editor.getMarkdown()).toContain(SRC);
    } finally {
      editor.destroy();
    }
  });

  it('keeps an inline missing image inside a sentence', () => {
    const editor = openEditor(`see ![image.png](${SRC}) here\n`);
    try {
      expect(() => editor.state.doc.check()).not.toThrow();
      const found = paragraphImage(editor);
      expect(found.parentName).toBe('paragraph');
      expect(found.imageInline).toBe(true);
      expect(editor.state.doc.textContent).toContain('see');
      expect(editor.state.doc.textContent).toContain('here');
      expect(editor.getMarkdown()).toContain(SRC);
    } finally {
      editor.destroy();
    }
  });
});
