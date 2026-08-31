/**
 * Scoop (Windows) llama.cpp package names live in the `versions` bucket,
 * not extras. extras no longer ships a `llama.cpp` manifest.
 */

export type LlamaCppScoopBackendId =
  | 'auto'
  | 'cpu'
  | 'cuda'
  | 'opencl'
  | 'openvino'
  | 'sycl'
  | 'vulkan'
  | 'hip-radeon';

export type LlamaCppCudaVersion = {
  major: number;
  minor: number;
};

export type LlamaCppWindowsCudaProbe = {
  nvidiaSmiAvailable: boolean;
  cuda: LlamaCppCudaVersion | null;
  detail?: string;
};

/** Known Scoop Versions CUDA suffixes, newest first (as of 2026). */
export const KNOWN_LLAMA_CPP_SCOOP_CUDA_SUFFIXES = [
  '133',
  '131',
  '13',
  '124',
  '117',
] as const;

export const LLAMA_CPP_SCOOP_PACKAGE_RE =
  /^llama\.cpp-(cpu|opencl|openvino|sycl|vulkan|hip-radeon|cu[0-9]{2,3})$/;

const FIXED_BACKEND_PACKAGES: Record<
  Exclude<LlamaCppScoopBackendId, 'auto' | 'cuda'>,
  string
> = {
  cpu: 'llama.cpp-cpu',
  opencl: 'llama.cpp-opencl',
  openvino: 'llama.cpp-openvino',
  sycl: 'llama.cpp-sycl',
  vulkan: 'llama.cpp-vulkan',
  'hip-radeon': 'llama.cpp-hip-radeon',
};

export const LLAMA_CPP_SCOOP_BACKEND_OPTIONS: ReadonlyArray<{
  id: LlamaCppScoopBackendId;
  label: string;
}> = [
  { id: 'auto', label: '자동 (CUDA 감지 / CPU)' },
  { id: 'cpu', label: 'CPU' },
  { id: 'cuda', label: 'CUDA (NVIDIA)' },
  { id: 'opencl', label: 'OpenCL' },
  { id: 'openvino', label: 'OpenVINO' },
  { id: 'sycl', label: 'SYCL' },
  { id: 'vulkan', label: 'Vulkan' },
  { id: 'hip-radeon', label: 'HIP (Radeon)' },
];

export function isLlamaCppScoopBackendId(value: string): value is LlamaCppScoopBackendId {
  return LLAMA_CPP_SCOOP_BACKEND_OPTIONS.some((opt) => opt.id === value);
}

export function isLlamaCppScoopPackageName(name: string): boolean {
  return LLAMA_CPP_SCOOP_PACKAGE_RE.test(name);
}

export function parseNvidiaSmiCudaVersion(output: string): LlamaCppCudaVersion | null {
  const text = String(output || '');
  const match = text.match(/CUDA Version:\s*(\d+)(?:\.(\d+))?/i);
  if (!match) return null;
  const major = Number(match[1]);
  const minor = Number(match[2] || '0');
  if (!Number.isInteger(major) || major < 1 || !Number.isInteger(minor) || minor < 0) {
    return null;
  }
  return { major, minor };
}

export function cudaSuffixToVersion(suffix: string): LlamaCppCudaVersion | null {
  const s = String(suffix || '').trim();
  if (/^\d{2}$/.test(s)) {
    return { major: Number(s), minor: 0 };
  }
  if (/^\d{3}$/.test(s)) {
    const n = Number(s);
    return { major: Math.floor(n / 10), minor: n % 10 };
  }
  return null;
}

export function formatLlamaCppCudaVersion(cuda: LlamaCppCudaVersion): string {
  return `${cuda.major}.${cuda.minor}`;
}

function cudaVersionLte(left: LlamaCppCudaVersion, right: LlamaCppCudaVersion): boolean {
  return left.major < right.major || (left.major === right.major && left.minor <= right.minor);
}

function pushUnique(out: string[], name: string): void {
  if (!isLlamaCppScoopPackageName(name)) return;
  if (out.includes(name)) return;
  out.push(name);
}

/**
 * Preferred Scoop CUDA packages for a driver-reported CUDA version.
 * Tries `llama.cpp-cu{major}{minor}` and `llama.cpp-cu{major}`, then known suffixes
 * that are less than or equal to the detected version, then CPU.
 */
export function listLlamaCppScoopCudaPackages(cuda: LlamaCppCudaVersion | null): string[] {
  const out: string[] = [];
  if (cuda) {
    if (cuda.minor >= 0 && cuda.minor <= 9) {
      pushUnique(out, `llama.cpp-cu${cuda.major}${cuda.minor}`);
    }
    if (cuda.major >= 10 && cuda.major <= 99) {
      pushUnique(out, `llama.cpp-cu${cuda.major}`);
    }
    for (const suffix of KNOWN_LLAMA_CPP_SCOOP_CUDA_SUFFIXES) {
      const pkgCuda = cudaSuffixToVersion(suffix);
      if (!pkgCuda || !cudaVersionLte(pkgCuda, cuda)) continue;
      pushUnique(out, `llama.cpp-cu${suffix}`);
    }
  } else {
    for (const suffix of KNOWN_LLAMA_CPP_SCOOP_CUDA_SUFFIXES) {
      pushUnique(out, `llama.cpp-cu${suffix}`);
    }
  }
  return out;
}

export function listLlamaCppScoopInstallCandidates(
  backend: LlamaCppScoopBackendId,
  cuda: LlamaCppCudaVersion | null,
): string[] {
  if (backend === 'cpu' || backend === 'opencl' || backend === 'openvino' || backend === 'sycl' || backend === 'vulkan' || backend === 'hip-radeon') {
    return [FIXED_BACKEND_PACKAGES[backend]];
  }

  const cudaPkgs = listLlamaCppScoopCudaPackages(cuda);
  if (backend === 'cuda') {
    return cudaPkgs.length > 0 ? cudaPkgs : ['llama.cpp-cpu'];
  }

  // auto
  if (cuda) {
    const out: string[] = [];
    for (const pkg of cudaPkgs) pushUnique(out, pkg);
    pushUnique(out, 'llama.cpp-cpu');
    return out;
  }
  return ['llama.cpp-cpu'];
}

export function buildLlamaCppScoopInstallShellArg(packageName: string): string {
  const pkg = String(packageName || '').trim();
  if (!isLlamaCppScoopPackageName(pkg)) {
    throw new Error(`Unsupported scoop llama.cpp package: ${pkg}`);
  }
  return `scoop bucket add versions >nul 2>&1 & scoop install ${pkg}`;
}

export function scoopInstallLooksFailed(
  code: number,
  stdout: string,
  stderr: string,
): string | null {
  const text = `${stdout}\n${stderr}`;
  const manifest = text.match(/Couldn't find manifest for '([^']+)'/i);
  if (manifest) {
    return `Couldn't find manifest for '${manifest[1]}'.`;
  }
  if (/is not recognized as an internal or external command/i.test(text)) {
    return 'scoop was not found on PATH. Install Scoop first.';
  }
  if (code !== 0) {
    return stderr.trim() || stdout.trim() || `scoop install failed (exit ${code}).`;
  }
  return null;
}
