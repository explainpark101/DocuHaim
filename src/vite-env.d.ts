/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BUILD_ID?: string;
  readonly VITE_ELECTRON?: string;
  readonly VITE_BASE_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
