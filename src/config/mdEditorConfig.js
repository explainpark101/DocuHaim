/**
 * md-editor-rt global config.
 * Loaded at app entry (main.jsx) so Export PDF and other MdPreview-only pages
 * share the same markdown-it 15.0.0 plugin stack.
 */
import { config } from 'md-editor-rt';
import { EditorView } from '@codemirror/view';
import { closeCompletion, completionStatus } from '@codemirror/autocomplete';
import mermaid from 'mermaid';
import {
  applyAppMarkdownItConfig,
  applyAppMarkdownItPluginsFromList,
} from '@/utils/appMarkdownItPlugins';
import { loadEditorAutocompleteEnabled } from '@/utils/editorAutocompleteSettings';
import { HLJS_ATOM_ONE_DARK_CSS } from '@/utils/mdEditorCodeTheme';
import { patchMermaidRender } from '@/utils/mermaidFixLabelNewlines';
import '@/styles/md-editor-rt/chat-saved-note.css';
import '@/styles/md-editor-rt/note-cover-placeholder.css';
import '@/styles/md-editor-rt/plan-frontmatter.css';
import '@/styles/md-editor-rt/preview-heading-fold.css';
import '@/styles/md-editor-rt/footnotes.css';
import '@/styles/md-editor-rt/code-one-dark.css';
import '@/styles/md-editor-rt/code-copy.css';

patchMermaidRender(mermaid);

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
    mermaid: {
      instance: mermaid,
    },
  },
  mermaidConfig(config) {
    return {
      ...config,
      securityLevel: 'loose',
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
