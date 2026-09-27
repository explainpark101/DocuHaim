/**
 * Global md-editor-rt config.
 * Mermaid is loaded on demand via useLazyMermaidRender (noMermaid on surfaces).
 * Import this module (or call ensureMdEditorConfig) before mounting MdEditor / MdPreview.
 *
 * Uses dynamic import so we wait for vendor-md-editor top-level-await (__tla)
 * before calling `config` (static import can see an uninitialized binding).
 */
import {
  applyAppMarkdownItConfig,
  applyAppMarkdownItPluginsFromList,
} from '@/utils/appMarkdownItPlugins';
import {
  CHAT_COMPOSER_MD_EDITOR_ID,
  loadChatComposerAutocompleteEnabled,
} from '@/utils/chatWithMyself/composerAutocompleteSettings';
import { loadEditorAutocompleteEnabled } from '@/utils/editorAutocompleteSettings';
import { HLJS_ATOM_ONE_DARK_CSS, HLJS_ATOM_ONE_LIGHT_CSS } from '@/utils/mdEditorCodeTheme';
import '@/styles/md-editor-rt/chat-saved-note.css';
import '@/styles/md-editor-rt/note-cover-placeholder.css';
import '@/styles/editor-image-align.css';
import '@/styles/md-editor-rt/plan-frontmatter.css';
import '@/styles/md-editor-rt/preview-heading-fold.css';
import '@/styles/md-editor-rt/mermaid-base64-fold.css';
import '@/styles/md-editor-rt/footnotes.css';
import '@/styles/md-editor-rt/code-one-dark.css';
import '@/styles/md-editor-rt/code-copy.css';
import '@/styles/md-editor-rt/toolbar-scroll.css';

function isAutocompleteEnabledForEditor(editorId: string | undefined): boolean {
  if (editorId === CHAT_COMPOSER_MD_EDITOR_ID) {
    return loadChatComposerAutocompleteEnabled();
  }
  return loadEditorAutocompleteEnabled();
}

type CodeMirrorExtensionEntry = {
  type?: string;
  extension?: unknown;
};

let ensurePromise: Promise<void> | null = null;

/** Idempotent: load md-editor-rt + apply global config once. */
export function ensureMdEditorConfig(): Promise<void> {
  if (!ensurePromise) {
    ensurePromise = (async () => {
      const [
        { config },
        { EditorView },
        { closeCompletion, completionStatus },
        KO_KR,
      ] = await Promise.all([
        import('md-editor-rt'),
        import('@codemirror/view'),
        import('@codemirror/autocomplete'),
        import('@vavt/cm-extension/dist/locale/ko-KR').then((m) => m.default),
      ]);

      if (typeof config !== 'function') {
        throw new Error('[mdEditorConfig] md-editor-rt config is not a function');
      }

      config({
        editorConfig: {
          languageUserDefined: {
            'ko-KR': KO_KR,
          },
        },
        editorExtensions: {
          highlight: {
            css: {
              'one-dark': {
                light: HLJS_ATOM_ONE_DARK_CSS,
                dark: HLJS_ATOM_ONE_DARK_CSS,
              },
              'one-light': {
                light: HLJS_ATOM_ONE_LIGHT_CSS,
                dark: HLJS_ATOM_ONE_LIGHT_CSS,
              },
            },
          },
          cropper: {
            instance: {},
          },
        },
        mermaidConfig(base) {
          return {
            ...base,
            securityLevel: 'loose',
            startOnLoad: false,
          };
        },
        markdownItConfig(md) {
          applyAppMarkdownItConfig(md);
        },
        markdownItPlugins(plugins) {
          return applyAppMarkdownItPluginsFromList(plugins);
        },
        codeMirrorExtensions(extensions, options) {
          const editorId = options?.editorId;
          const list = (extensions || []) as CodeMirrorExtensionEntry[];
          const next = list.filter((item) => item?.type !== 'linkShortener');
          if (next.some((item) => item?.type === 'autocompleteGate')) {
            return next as typeof extensions;
          }
          return [
            ...next,
            {
              type: 'autocompleteGate',
              extension: EditorView.updateListener.of((update) => {
                if (isAutocompleteEnabledForEditor(editorId)) return;
                if (completionStatus(update.state) === 'active') {
                  closeCompletion(update.view);
                }
              }),
            },
          ] as typeof extensions;
        },
      });
    })();
  }
  return ensurePromise;
}

// Side-effect import sites await this module's TLA before mounting MdEditor.
await ensureMdEditorConfig();
