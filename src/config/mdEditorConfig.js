/**
 * Global md-editor-rt config.
 * Mermaid is loaded on demand via useLazyMermaidRender (noMermaid on surfaces).
 */
import { config } from 'md-editor-rt';
import { EditorView } from '@codemirror/view';
import { closeCompletion, completionStatus } from '@codemirror/autocomplete';
import {
  applyAppMarkdownItConfig,
  applyAppMarkdownItPluginsFromList,
} from '@/utils/appMarkdownItPlugins';
import { loadEditorAutocompleteEnabled } from '@/utils/editorAutocompleteSettings';
import { HLJS_ATOM_ONE_DARK_CSS } from '@/utils/mdEditorCodeTheme';
import '@/styles/md-editor-rt/chat-saved-note.css';
import '@/styles/md-editor-rt/note-cover-placeholder.css';
import '@/styles/md-editor-rt/plan-frontmatter.css';
import '@/styles/md-editor-rt/preview-heading-fold.css';
import '@/styles/md-editor-rt/mermaid-base64-fold.css';
import '@/styles/md-editor-rt/footnotes.css';
import '@/styles/md-editor-rt/code-one-dark.css';
import '@/styles/md-editor-rt/code-copy.css';
import '@/styles/md-editor-rt/toolbar-scroll.css';

config({
  editorExtensions: {
    highlight: {
      css: {
        'one-dark': {
          light: HLJS_ATOM_ONE_DARK_CSS,
          dark: HLJS_ATOM_ONE_DARK_CSS,
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
  codeMirrorExtensions(extensions) {
    const next = (extensions || []).filter((item) => item?.type !== 'linkShortener');
    if (next.some((item) => item?.type === 'autocompleteGate')) return next;
    return [
      ...next,
      {
        type: 'autocompleteGate',
        extension: EditorView.updateListener.of((update) => {
          if (loadEditorAutocompleteEnabled()) return;
          if (completionStatus(update.state) === 'active') {
            closeCompletion(update.view);
          }
        }),
      },
    ];
  },
});
