import { createContext } from 'react';

/** Session download workspace handlers for AppLayout. */
export type SessionWorkspaceValue = {
  closeSessionWorkspace: (...args: any[]) => any;
  handleOpenSessionFiles: (...args: any[]) => any;
  handleOpenSessionDirectory: (...args: any[]) => any;
  handleDropSessionTransfer: (...args: any[]) => any;
  handleDropSessionPaths: (...args: any[]) => any;
  handleRequestSaveSessionToNote: (...args: any[]) => any;
  handleRequestSessionTransformDownload: (...args: any[]) => any;
  isOpeningSession: boolean;
  requestNewTempFile: (...args: any[]) => any;
};

export const SESSION_WORKSPACE_KEYS = [
  'closeSessionWorkspace',
  'handleOpenSessionFiles',
  'handleOpenSessionDirectory',
  'handleDropSessionTransfer',
  'handleDropSessionPaths',
  'handleRequestSaveSessionToNote',
  'handleRequestSessionTransformDownload',
  'isOpeningSession',
  'requestNewTempFile',
] as const satisfies readonly (keyof SessionWorkspaceValue)[];

export const SessionWorkspaceContext = createContext<SessionWorkspaceValue | null>(null);
