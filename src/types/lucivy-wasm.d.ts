/// <reference types="vite/client" />

declare module 'lucivy-wasm' {
  export class Lucivy {
    constructor(workerUrl: string);
    ready: Promise<unknown>;
    create(
      path: string,
      fields: Array<{ name: string; type: string }>,
      stemmer?: string,
    ): Promise<LucivyIndex>;
    open(path: string): Promise<LucivyIndex>;
    importSnapshot(data: Uint8Array, path: string): Promise<LucivyIndex>;
    terminate(): void;
  }

  export class LucivyIndex {
    path: string;
    add(docId: number, fields: Record<string, string>): Promise<unknown>;
    update(docId: number, fields: Record<string, string>): Promise<unknown>;
    remove(docId: number): Promise<unknown>;
    commit(): Promise<unknown>;
    search(
      query: unknown,
      options?: { limit?: number; highlights?: boolean; fields?: boolean },
    ): Promise<unknown>;
    exportSnapshot(): Promise<Uint8Array | ArrayBuffer>;
    close(): Promise<unknown>;
    destroy(): Promise<unknown>;
  }
}

declare module 'lucivy-wasm/worker' {
  const url: string;
  export default url;
}
