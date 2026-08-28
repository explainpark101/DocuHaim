export type OsDropPayload = {
  files: File[];
  dirHandles: FileSystemDirectoryHandle[];
};

async function readItemFileSystemHandle(
  item: DataTransferItem,
): Promise<FileSystemHandle | null> {
  const getter = (
    item as DataTransferItem & {
      getAsFileSystemHandle?: () => Promise<FileSystemHandle | null>;
    }
  ).getAsFileSystemHandle;
  if (typeof getter !== 'function') return null;
  try {
    return await getter.call(item);
  } catch {
    return null;
  }
}

function pushFile(files: File[], file: File | null | undefined): void {
  if (file) files.push(file);
}

/** Collect files and directory handles from a browser DataTransfer (web + Tauri HTML fallback). */
export async function collectOsDropPayload(dataTransfer: DataTransfer): Promise<OsDropPayload> {
  const files: File[] = [];
  const dirHandles: FileSystemDirectoryHandle[] = [];
  const items = dataTransfer.items;

  if (items?.length) {
    const tasks: Promise<void>[] = [];
    for (const item of Array.from(items)) {
      if (item.kind !== 'file') continue;
      const entry =
        typeof item.webkitGetAsEntry === 'function' ? item.webkitGetAsEntry() : null;
      if (entry?.isDirectory) {
        const handle = await readItemFileSystemHandle(item);
        if (handle && 'kind' in handle && handle.kind === 'directory') {
          dirHandles.push(handle as FileSystemDirectoryHandle);
        }
        continue;
      }
      if (entry?.isFile) {
        tasks.push(
          new Promise<void>((resolve, reject) => {
            (entry as FileSystemFileEntry).file(
              (file) => {
                pushFile(files, file);
                resolve();
              },
              reject,
            );
          }),
        );
        continue;
      }
      const handle = await readItemFileSystemHandle(item);
      if (handle?.kind === 'directory') {
        dirHandles.push(handle as FileSystemDirectoryHandle);
        continue;
      }
      pushFile(files, item.getAsFile());
    }
    await Promise.all(tasks);
  }

  if (files.length === 0 && dirHandles.length === 0) {
    for (const file of Array.from(dataTransfer.files || [])) {
      pushFile(files, file);
    }
  }

  return { files, dirHandles };
}
