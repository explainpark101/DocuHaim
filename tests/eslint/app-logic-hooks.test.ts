import { describe, expect, it } from 'vitest';
import { ESLint } from 'eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
/** Path only — used so flat-config `use*Domain.ts` globs apply (no disk write). */
const probePath = path.join(root, 'src/App/hooks/useProbeDomain.ts');

describe('eslint app logic hooks', () => {
  it(
    'flags undeclared bag identifiers in domain hooks',
    async () => {
      const probe = `export function probe(bag: Record<string, unknown>) {
  const { known } = bag;
  void known;
  void missingFromBag;
}
`;
      // Full project ESLint bootstrap is slow under Windows + forks pool load.
      const eslint = new ESLint({ cwd: root });
      const [result] = await eslint.lintText(probe, { filePath: probePath });
      const undef = (result?.messages ?? []).filter((m) => m.ruleId === 'no-undef');
      expect(undef.some((m) => m.message.includes('missingFromBag'))).toBe(true);
    },
    90_000,
  );
});
