import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { collectJsImportDiagnostics } from '../../scripts/check-js-imports.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const probePath = path.join(root, 'src/components/llm/__jsImportProbe.jsx');
const configPath = path.join(root, 'tsconfig.js-imports.json');

function createImportsProgram(): ts.Program {
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(configPath),
  );
  return ts.createProgram(parsed.fileNames, parsed.options);
}

describe('check-js-imports', () => {
  it(
    'flags imports of exports that do not exist on the target module',
    () => {
      const probe = `import { LLM_ASSIST_MAX_IMAGES } from '@/utils/llmAssistImages';
export default function JsImportProbe() {
  return LLM_ASSIST_MAX_IMAGES;
}
`;
      fs.writeFileSync(probePath, probe, 'utf8');
      try {
        const program = createImportsProgram();
        const diagnostics = collectJsImportDiagnostics(program);
        const messages = diagnostics.map((d) =>
          ts.flattenDiagnosticMessageText(d.messageText, ' '),
        );
        expect(messages.some((m) => m.includes('LLM_ASSIST_MAX_IMAGES'))).toBe(true);
      } finally {
        fs.unlinkSync(probePath);
      }
    },
    20_000,
  );
});
