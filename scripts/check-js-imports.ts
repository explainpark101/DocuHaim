import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = path.join(root, 'tsconfig.js-imports.json');

/** Import/export resolution failures only (not general JS type errors). */
export const JS_IMPORT_DIAGNOSTIC_CODES = new Set([
  1192, // Module has no default export
  2305, // Module has no exported member
  2307, // Cannot find module
  2459, // Declares locally but not exported
  2613, // No default export (use named import)
  2614, // No exported member (use default import)
  2724, // No exported member named … (did you mean …)
]);

function isJsSourceFile(fileName: string): boolean {
  return /\.(js|jsx)$/i.test(fileName);
}

function formatDiagnostic(diagnostic: ts.Diagnostic): string {
  if (!diagnostic.file || diagnostic.start === undefined) {
    return ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
  }
  const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
  const file = path.relative(root, diagnostic.file.fileName);
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
  return `${file}:${line + 1}:${character + 1} - error TS${diagnostic.code}: ${message}`;
}

export function collectJsImportDiagnostics(
  program: ts.Program,
  codes: ReadonlySet<number> = JS_IMPORT_DIAGNOSTIC_CODES,
): ts.Diagnostic[] {
  return ts.getPreEmitDiagnostics(program).filter((diagnostic) => {
    if (!diagnostic.code || !codes.has(diagnostic.code)) return false;
    if (!diagnostic.file) return false;
    return isJsSourceFile(diagnostic.file.fileName);
  });
}

function main(): void {
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  if (configFile.error) {
    console.error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'));
    process.exit(1);
  }

  const parsed = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(configPath),
  );

  if (parsed.errors.length > 0) {
    for (const error of parsed.errors) {
      console.error(formatDiagnostic(error));
    }
    process.exit(1);
  }

  const program = ts.createProgram(parsed.fileNames, parsed.options);
  const diagnostics = collectJsImportDiagnostics(program);

  if (diagnostics.length > 0) {
    for (const diagnostic of diagnostics) {
      console.error(formatDiagnostic(diagnostic));
    }
    process.exit(1);
  }

  console.log('JS/JSX import checks passed.');
}

if (import.meta.main) {
  main();
}
