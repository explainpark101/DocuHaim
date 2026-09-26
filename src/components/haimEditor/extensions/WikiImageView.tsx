import { useMemo } from 'react';
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { WIKI_IMAGE_PLACEHOLDER_SRC } from '@/components/haimEditor/extensions/wikiImageConstants';
import { buildWikiImageStyle } from '@/utils/wikiImageSyntax';

function styleStringToObject(style: string | null): React.CSSProperties | undefined {
  if (!style) return undefined;
  const out: Record<string, string> = {};
  for (const part of style.split(';')) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const i = trimmed.indexOf(':');
    if (i < 0) continue;
    const key = trimmed.slice(0, i).trim();
    const val = trimmed.slice(i + 1).trim();
    const camel = key.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    out[camel] = val;
  }
  return out as React.CSSProperties;
}

/**
 * TipTap wiki-image node view: canonical <img data-wiki-path> for hydration.
 */
export default function WikiImageView({ node, selected }: NodeViewProps) {
  const path = String(node.attrs.path || '');
  const options = String(node.attrs.options || '');
  const alt = String(node.attrs.alt || path);
  const width = (node.attrs.width as string | null) || null;
  const height = (node.attrs.height as string | null) || null;
  const background = (node.attrs.background as string | null) || null;
  const imgStyle = useMemo(
    () =>
      styleStringToObject(
        buildWikiImageStyle({ width, height, background }),
      ),
    [width, height, background],
  );

  return (
    <NodeViewWrapper
      as="div"
      className={`haim-wiki-image-wrap${selected ? ' is-selected' : ''}`}
      data-drag-handle
    >
      <img
        src={WIKI_IMAGE_PLACEHOLDER_SRC}
        alt={alt}
        className="haim-wiki-image"
        data-wiki-path={path}
        {...(options ? { 'data-wiki-options': options } : {})}
        {...(width ? { 'data-wiki-width': width } : {})}
        {...(height ? { 'data-wiki-height': height } : {})}
        {...(background ? { 'data-wiki-bg': background } : {})}
        style={imgStyle}
        draggable={false}
      />
    </NodeViewWrapper>
  );
}
