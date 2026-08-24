/**
 * Mermaid flowchart labels with KaTeX `$$...$$` ignore "\\n" / <br> during
 * layout (createText converts <br>→newline, then KaTeX only splits on <br>).
 * Pre-render math and turn label escapes (\\n, \\") into Mermaid-safe forms
 * so the normal HTML label path measures and renders correctly.
 */
import katex from 'katex';

const KATEX_BLOCK_RE = /\$\$([\s\S]*?)\$\$/g;

/** Prepare mermaid source so label newlines, quotes + math layout correctly. */
export function prepareMermaidSource(text: string): string {
  // Render $$...$$ first so mermaid skips its broken KaTeX multi-line path.
  let out = text.replace(KATEX_BLOCK_RE, (_full, math: string) => {
    try {
      return katex
        .renderToString(String(math).trim(), {
          throwOnError: false,
          displayMode: true,
          output: 'mathml',
        })
        .replace(/\n/g, ' ')
        // Drop KaTeX annotation (duplicates visible source text).
        .replace(/<annotation[\s\S]*?<\/annotation>/g, '')
        // Keep HTML valid inside mermaid "..." labels (no raw double quotes).
        .replace(/"/g, "'");
    } catch {
      return `$$${math}$$`;
    }
  });
  // Escaped quote in labels → Mermaid entity (raw " would end the "..." string).
  out = out.replace(/\\"/g, '#quot;');
  // Literal backslash-n in labels → <br/> (statement newlines are real \\n already).
  out = out.replace(/\\n/g, '<br/>');
  return out;
}

type MermaidRenderResult = {
  svg: string;
  bindFunctions?: ((element: Element) => void) | undefined;
};

type MermaidLike = {
  render: (
    id: string,
    text: string,
    container?: Element | undefined,
  ) => Promise<MermaidRenderResult>;
};

/** Patch mermaid.render to prepare label newlines/math before parse/layout. */
export function patchMermaidRender(instance: MermaidLike): void {
  const original = instance.render.bind(instance);
  instance.render = async (id, text, container) =>
    original(id, prepareMermaidSource(text), container);
}
