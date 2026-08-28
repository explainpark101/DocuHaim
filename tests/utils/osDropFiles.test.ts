import { describe, expect, it } from 'vitest';
import { filesFromOsPaths } from '@/utils/osDropFiles';

describe('filesFromOsPaths', () => {
  it('returns empty array outside desktop app', async () => {
    await expect(filesFromOsPaths(['/tmp/example.txt'])).resolves.toEqual([]);
  });
});
