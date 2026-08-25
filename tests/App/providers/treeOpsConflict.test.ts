import { describe, expect, it } from 'vitest';
import { resolveTreeDestName } from '@/utils/treeNameConflict';

describe('TreeOps conflict helpers', () => {
  it('keeps unique folder names without prompting', async () => {
    const used = new Set(['notes', 'archive']);
    const name = await resolveTreeDestName({
      name: 'drafts',
      usedNames: used,
      kind: 'folder',
      action: 'move',
      askConflict: async () => {
        throw new Error('should not ask');
      },
    });
    expect(name).toBe('drafts');
  });
});
