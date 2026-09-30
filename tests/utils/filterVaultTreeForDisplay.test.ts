import { describe, expect, it } from 'vitest';
import { filterVaultTree } from '@/utils/filterVaultTreeForDisplay';

type Node = {
  type: 'file' | 'folder';
  name: string;
  path: string;
  children?: Node[];
};

describe('filterVaultTree', () => {
  const sample: Node[] = [
    {
      type: 'folder',
      name: 'notes',
      path: 'notes/',
      children: [
        { type: 'file', name: 'a.md', path: 'notes/a.md' },
        {
          type: 'folder',
          name: '.secret',
          path: 'notes/.secret/',
          children: [{ type: 'file', name: 'x.md', path: 'notes/.secret/x.md' }],
        },
      ],
    },
    {
      type: 'folder',
      name: '.trash',
      path: '.trash/',
      children: [{ type: 'file', name: 'gone.md', path: '.trash/gone.md' }],
    },
    { type: 'file', name: 'root.md', path: 'root.md' },
  ];

  it('hides dot folders when hideDotFolders is true', () => {
    const out = filterVaultTree(sample, { hideDotFolders: true });
    const notes = out.find((n) => n.path === 'notes/');
    expect(notes?.children?.some((c) => c.name === '.secret')).toBe(false);
    expect(notes?.children?.some((c) => c.name === 'a.md')).toBe(true);
    // .trash is controlled by hideTrashFolder, not hideDotFolders
    expect(out.some((n) => n.path === '.trash/')).toBe(true);
  });

  it('hides trash when hideTrashFolder is true', () => {
    const out = filterVaultTree(sample, { hideTrashFolder: true });
    expect(out.some((n) => n.path === '.trash/')).toBe(false);
    expect(out.some((n) => n.path === 'notes/')).toBe(true);
  });

  it('keeps trash and dot folders when both flags are off', () => {
    const out = filterVaultTree(sample, {
      hideDotFolders: false,
      hideTrashFolder: false,
    });
    expect(out.some((n) => n.path === '.trash/')).toBe(true);
    const notes = out.find((n) => n.path === 'notes/');
    expect(notes?.children?.some((c) => c.name === '.secret')).toBe(true);
  });
});
