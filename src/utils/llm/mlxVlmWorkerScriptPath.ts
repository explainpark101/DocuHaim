export const MLX_VLM_WORKER_SCRIPT_NAME = 'mlx_vlm_generate_worker.py';

/** Paths as declared in src-tauri/tauri.conf.json > bundle > resources. */
export const MLX_VLM_WORKER_RESOURCE_PATHS = [
  'resources/mlx_vlm_generate_worker.py',
  '../scripts/mlx_vlm_generate_worker.py',
  MLX_VLM_WORKER_SCRIPT_NAME,
] as const;

type PathJoin = (...paths: string[]) => Promise<string>;
type PathDirname = (path: string) => Promise<string>;
type PathExists = (path: string) => Promise<boolean>;

export async function findMlxVlmWorkerScriptInAncestors(
  startDirs: string[],
  join: PathJoin,
  dirname: PathDirname,
  exists: PathExists,
  maxDepth = 12,
): Promise<string | null> {
  for (const start of startDirs) {
    if (!start) continue;
    let dir = start;
    for (let depth = 0; depth < maxDepth; depth += 1) {
      const candidates = [
        await join(dir, 'resources', MLX_VLM_WORKER_SCRIPT_NAME),
        await join(dir, 'src-tauri', 'resources', MLX_VLM_WORKER_SCRIPT_NAME),
        await join(dir, 'scripts', MLX_VLM_WORKER_SCRIPT_NAME),
      ];
      for (const candidate of candidates) {
        try {
          if (await exists(candidate)) return candidate;
        } catch {
          // try next candidate
        }
      }
      const parent = await dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  return null;
}

export async function resolveMlxVlmWorkerScriptPath(): Promise<string> {
  const { resolveResource, join, dirname, executableDir, resourceDir } = await import(
    '@tauri-apps/api/path'
  );
  const { exists } = await import('@tauri-apps/plugin-fs');

  for (const resourcePath of MLX_VLM_WORKER_RESOURCE_PATHS) {
    try {
      const resolved = (await resolveResource(resourcePath)).trim();
      if (!resolved) continue;
      try {
        if (await exists(resolved)) return resolved;
      } catch {
        return resolved;
      }
    } catch {
      // try next configured resource path
    }
  }

  const startDirs: string[] = [];
  try {
    startDirs.push(await resourceDir());
  } catch {
    // ignore
  }
  try {
    startDirs.push(await executableDir());
  } catch {
    // ignore
  }

  const found = await findMlxVlmWorkerScriptInAncestors(startDirs, join, dirname, exists);
  if (found) return found;

  throw new Error(
    'mlx_vlm_generate_worker.py not found. Restart `bun run tauri:dev` after pulling, or rebuild the desktop app.',
  );
}
