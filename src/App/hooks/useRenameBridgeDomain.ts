// @ts-nocheck — thin re-export of FileSession rename helpers onto the AppLogic bag
/**
 * Exposes renameS3File / renameLocalFile from FileSession onto the compose bag.
 * Rename implementations live in useFileSessionDomain (no register*BridgeDeps).
 */
export function useRenameBridgeDomain(bag: Record<string, any>, glueRef?: { current: any }) {
  const { fileSessionApi } = bag;
  const renameS3File = (...args) => fileSessionApi.renameS3File?.(...args);
  const renameLocalFile = (...args) => fileSessionApi.renameLocalFile?.(...args);

  const api = {
    renameS3File,
    renameLocalFile,
  };
  Object.assign(bag, api);
  if (glueRef) Object.assign(glueRef.current, api);
  return api;
}
