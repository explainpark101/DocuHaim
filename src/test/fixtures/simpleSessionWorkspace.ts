import simpleMarkdown from './simple.md?raw';
import {
  decodeSessionText,
  encodeSessionText,
  putSessionFileBytes,
  type SessionWorkspace,
} from '@/utils/sessionWorkspace';

export const SIMPLE_MD_SESSION_PATH = 'simple.md';

/** Download session workspace containing the two-line simple.md fixture. */
export function buildSimpleMdDownloadSession(): SessionWorkspace {
  return putSessionFileBytes(
    {
      origin: 'md',
      originName: SIMPLE_MD_SESSION_PATH,
      files: {},
    },
    SIMPLE_MD_SESSION_PATH,
    encodeSessionText(simpleMarkdown),
  );
}

export function readSessionMarkdown(workspace: SessionWorkspace, path: string): string {
  const record = workspace.files[path];
  if (!record) {
    throw new Error(`session file not found: ${path}`);
  }
  return decodeSessionText(record.bytes);
}
