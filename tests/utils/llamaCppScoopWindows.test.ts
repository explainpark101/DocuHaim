import { describe, expect, it } from 'vitest';
import {
  buildLlamaCppScoopInstallShellArg,
  cudaSuffixToVersion,
  isLlamaCppScoopPackageName,
  listLlamaCppScoopCudaPackages,
  listLlamaCppScoopInstallCandidates,
  parseNvidiaSmiCudaVersion,
  scoopInstallLooksFailed,
} from '@/utils/llm/llamaCppScoopWindows';

describe('parseNvidiaSmiCudaVersion', () => {
  it('parses driver CUDA version from nvidia-smi table', () => {
    const output = `
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 560.94                 Driver Version: 560.94         CUDA Version: 12.6     |
+-----------------------------------------------------------------------------------------+
`;
    expect(parseNvidiaSmiCudaVersion(output)).toEqual({ major: 12, minor: 6 });
  });

  it('parses CUDA 13 without relying on a minor digit', () => {
    expect(parseNvidiaSmiCudaVersion('CUDA Version: 13.3')).toEqual({ major: 13, minor: 3 });
  });

  it('returns null when nvidia-smi is missing', () => {
    expect(parseNvidiaSmiCudaVersion("'nvidia-smi' is not recognized")).toBeNull();
  });
});

describe('cudaSuffixToVersion', () => {
  it('maps 2-digit family and 3-digit toolkit suffixes', () => {
    expect(cudaSuffixToVersion('13')).toEqual({ major: 13, minor: 0 });
    expect(cudaSuffixToVersion('124')).toEqual({ major: 12, minor: 4 });
    expect(cudaSuffixToVersion('133')).toEqual({ major: 13, minor: 3 });
  });
});

describe('listLlamaCppScoopInstallCandidates', () => {
  it('uses llama.cpp-cpu when auto has no CUDA', () => {
    expect(listLlamaCppScoopInstallCandidates('auto', null)).toEqual(['llama.cpp-cpu']);
  });

  it('prefers generated cu{major}{minor} then family then known compatible packages', () => {
    const pkgs = listLlamaCppScoopCudaPackages({ major: 12, minor: 6 });
    expect(pkgs[0]).toBe('llama.cpp-cu126');
    expect(pkgs).toContain('llama.cpp-cu12');
    expect(pkgs).toContain('llama.cpp-cu124');
    expect(pkgs).not.toContain('llama.cpp-cu133');
  });

  it('falls back to cpu after CUDA packages for auto', () => {
    const pkgs = listLlamaCppScoopInstallCandidates('auto', { major: 13, minor: 3 });
    expect(pkgs[0]).toBe('llama.cpp-cu133');
    expect(pkgs).toContain('llama.cpp-cu13');
    expect(pkgs.at(-1)).toBe('llama.cpp-cpu');
  });

  it('maps fixed backends to versions-bucket package names', () => {
    expect(listLlamaCppScoopInstallCandidates('opencl', null)).toEqual(['llama.cpp-opencl']);
    expect(listLlamaCppScoopInstallCandidates('openvino', null)).toEqual(['llama.cpp-openvino']);
    expect(listLlamaCppScoopInstallCandidates('sycl', null)).toEqual(['llama.cpp-sycl']);
    expect(listLlamaCppScoopInstallCandidates('vulkan', null)).toEqual(['llama.cpp-vulkan']);
    expect(listLlamaCppScoopInstallCandidates('hip-radeon', null)).toEqual([
      'llama.cpp-hip-radeon',
    ]);
  });
});

describe('buildLlamaCppScoopInstallShellArg', () => {
  it('adds versions bucket and installs a validated package', () => {
    expect(buildLlamaCppScoopInstallShellArg('llama.cpp-cpu')).toBe(
      'scoop bucket add versions >nul 2>&1 & scoop install llama.cpp-cpu',
    );
    expect(buildLlamaCppScoopInstallShellArg('llama.cpp-cu124')).toBe(
      'scoop bucket add versions >nul 2>&1 & scoop install llama.cpp-cu124',
    );
  });

  it('rejects extras-style llama.cpp and dll variants', () => {
    expect(isLlamaCppScoopPackageName('llama.cpp')).toBe(false);
    expect(isLlamaCppScoopPackageName('llama.cpp-cu124-dll')).toBe(false);
    expect(() => buildLlamaCppScoopInstallShellArg('llama.cpp')).toThrow(
      /Unsupported scoop llama.cpp package/,
    );
  });
});

describe('scoopInstallLooksFailed', () => {
  it('treats missing manifest as failure even when exit code is 0', () => {
    expect(
      scoopInstallLooksFailed(0, "Couldn't find manifest for 'llama.cpp'.\n", ''),
    ).toContain("Couldn't find manifest");
  });

  it('accepts a successful install', () => {
    expect(scoopInstallLooksFailed(0, "Installing 'llama.cpp-cpu' [64bit]\n", '')).toBeNull();
  });
});
