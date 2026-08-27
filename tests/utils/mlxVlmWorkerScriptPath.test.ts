import { describe, expect, it } from 'vitest';
import {
  findMlxVlmWorkerScriptInAncestors,
  MLX_VLM_WORKER_SCRIPT_NAME,
} from '@/utils/llm/mlxVlmWorkerScriptPath';

describe('findMlxVlmWorkerScriptInAncestors', () => {
  it('finds worker under src-tauri/resources when walking up from target/debug', async () => {
    const existing = new Set([
      '/Users/me/projects/s3haim/src-tauri/resources/mlx_vlm_generate_worker.py',
    ]);

    const join = async (...parts: string[]) => parts.filter(Boolean).join('/');
    const dirname = async (path: string) => path.replace(/\/[^/]+$/, '');
    const exists = async (path: string) => existing.has(path);

    const found = await findMlxVlmWorkerScriptInAncestors(
      ['/Users/me/projects/s3haim/src-tauri/target/debug'],
      join,
      dirname,
      exists,
    );

    expect(found).toBe(`/Users/me/projects/s3haim/src-tauri/resources/${MLX_VLM_WORKER_SCRIPT_NAME}`);
  });
});
