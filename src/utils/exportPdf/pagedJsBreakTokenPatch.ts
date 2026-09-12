/**
 * Helpers for correcting paged.js break tokens when a fenced code block
 * overflows a page.
 *
 * Policy:
 * - Prefer same/later .export-pdf-code-line tokens within the overflowing fence.
 * - For pre-split page chunks, resume at the overflowing chunk root (not a
 *   later sibling that shares data-export-pdf-code-id).
 * - Never return fence ancestors from line fallback; page-chunk fallback uses
 *   the chunk root only.
 */

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;

export type BreakTokenLike = {
  node: Node;
  offset: number;
  equals: (other: BreakTokenLike | null | undefined) => boolean;
  /** Required by paged.js Chunker.layout (breakToken.toJSON(true)). */
  toJSON: (hash?: boolean) => string | Record<string, never>;
};

export type OverflowLike = {
  startContainer?: Node | null;
  startOffset?: number;
};

export type BreakTokenInput = {
  node?: Node | null;
  offset?: number | null;
} | null | undefined;

function makeBreakToken(node: Node, offset = 0): BreakTokenLike {
  return {
    node,
    offset,
    equals(other) {
      if (!other) return false;
      if (this.node && other.node && this.node !== other.node) return false;
      if (
        this.offset != null
        && other.offset != null
        && this.offset !== other.offset
      ) {
        return false;
      }
      return true;
    },
    toJSON(hash) {
      if (!this.node) return {};
      let ref: string | undefined;
      if (
        this.node.nodeType === ELEMENT_NODE
        && (this.node as Element).getAttribute?.('data-ref')
      ) {
        ref = (this.node as Element).getAttribute('data-ref') ?? undefined;
      } else if (hash && this.node.parentElement?.getAttribute) {
        ref = this.node.parentElement.getAttribute('data-ref') ?? undefined;
      }
      let index = 0;
      if (this.node.parentElement) {
        index = Array.from(this.node.parentElement.childNodes).indexOf(
          this.node as ChildNode,
        );
      }
      return JSON.stringify({
        node: ref,
        index,
        offset: this.offset,
      });
    },
  };
}

function asElement(node: Node | null | undefined): Element | null {
  if (!node) return null;
  if (node.nodeType === ELEMENT_NODE) return node as Element;
  if (node.nodeType === TEXT_NODE) return (node as Text).parentElement;
  return null;
}

function codeLineFromNode(node: Node | null | undefined): Element | null {
  const el = asElement(node);
  if (!el) return null;
  if (el.classList?.contains('export-pdf-code-line')) return el;
  return typeof el.closest === 'function'
    ? el.closest('.export-pdf-code-line')
    : null;
}

const CODE_OVERFLOW_SELECTOR =
  '.export-pdf-code-line, .export-pdf-code-lines, .export-pdf-code-body, .export-pdf-code-pre, .export-pdf-code-paged, .md-editor-code';

const CODE_ROOT_SELECTOR = '.md-editor-code, .export-pdf-code-paged';

/** Nearest fenced-code root for an arbitrary DOM node. */
export function resolveCodeRootFromNode(
  node: Node | null | undefined,
): Element | null {
  const el = asElement(node);
  if (!el || typeof el.closest !== 'function') return null;
  return el.closest(CODE_ROOT_SELECTOR);
}

/** Resolve the overflowing code line (handles Range.selectNode → parent+offset). */
export function resolveOverflowCodeLine(
  overflow: OverflowLike | null | undefined,
): Element | null {
  if (!overflow?.startContainer) return null;
  const container = overflow.startContainer;
  const offset = overflow.startOffset ?? 0;

  if (container.nodeType === ELEMENT_NODE) {
    const atOffset = container.childNodes[offset] ?? null;
    const fromOffset = codeLineFromNode(atOffset);
    if (fromOffset) return fromOffset;

    if (offset > 0) {
      const before = container.childNodes[offset - 1] ?? null;
      const fromBefore = codeLineFromNode(before);
      if (fromBefore) return fromBefore;
    }
  }

  return codeLineFromNode(container);
}

export function isExportPdfCodeOverflow(
  overflow: OverflowLike | null | undefined,
): boolean {
  if (!overflow?.startContainer) return false;
  if (resolveOverflowCodeLine(overflow)) return true;
  const el = asElement(overflow.startContainer);
  return !!(el && typeof el.closest === 'function' && el.closest(CODE_OVERFLOW_SELECTOR));
}

/** Nearest fenced-code root for an overflow range. */
export function resolveOverflowCodeRoot(
  overflow: OverflowLike | null | undefined,
): Element | null {
  if (!overflow?.startContainer) return null;
  const line = resolveOverflowCodeLine(overflow);
  if (line) return resolveCodeRootFromNode(line);

  const container = overflow.startContainer;
  if (container.nodeType === ELEMENT_NODE) {
    const atOffset =
      (container as Element).childNodes[overflow.startOffset ?? 0] ?? null;
    const fromChild = resolveCodeRootFromNode(atOffset);
    if (fromChild) return fromChild;
  }
  return resolveCodeRootFromNode(container);
}

/**
 * True when tokenNode is the overflowing code root (or inside it).
 * Do NOT match solely on data-export-pdf-code-id — pre-split page chunks share
 * that id, and treating the *next* chunk as "inside" skips the overflowing chunk.
 */
export function isTokenInsideCodeOverflow(
  tokenNode: Node | null | undefined,
  overflow: OverflowLike | null | undefined,
): boolean {
  if (!tokenNode || !overflow?.startContainer) return false;
  const overflowRoot = resolveOverflowCodeRoot(overflow);
  if (!overflowRoot) return false;

  if (overflowRoot === tokenNode || overflowRoot.contains(tokenNode)) return true;

  const tokenEl = asElement(tokenNode);
  if (!tokenEl) return false;

  const overflowRef = overflowRoot.getAttribute('data-ref');
  if (overflowRef && tokenEl.getAttribute('data-ref') === overflowRef) return true;

  if (overflowRef) {
    const tokenRoot = resolveCodeRootFromNode(tokenEl);
    if (tokenRoot?.getAttribute('data-ref') === overflowRef) return true;
  }

  return false;
}

/**
 * True when tokenNode resolves to a code line at or after overflowLine
 * under the same .export-pdf-code-lines parent.
 */
export function isSameOrLaterCodeLine(
  tokenNode: Node | null | undefined,
  overflowLine: Element | null | undefined,
): boolean {
  if (!tokenNode || !overflowLine) return false;
  const tokenLine = codeLineFromNode(tokenNode);
  if (!tokenLine) return false;
  if (tokenLine === overflowLine) return true;

  const parent = overflowLine.parentElement;
  if (!parent || tokenLine.parentElement !== parent) return false;

  const siblings = Array.from(parent.children);
  const tokenIndex = siblings.indexOf(tokenLine);
  const overflowIndex = siblings.indexOf(overflowLine);
  if (tokenIndex < 0 || overflowIndex < 0) return false;
  return tokenIndex >= overflowIndex;
}

/** True when token points at a different pre-split chunk of the same fence. */
export function isLaterSiblingCodeChunk(
  tokenNode: Node | null | undefined,
  overflowRoot: Element | null | undefined,
): boolean {
  if (!tokenNode || !overflowRoot) return false;
  if (!overflowRoot.classList?.contains('export-pdf-code-page-chunk')) return false;

  const tokenRoot = resolveCodeRootFromNode(tokenNode);
  if (!tokenRoot?.classList?.contains('export-pdf-code-page-chunk')) return false;
  if (tokenRoot === overflowRoot) return false;

  const idA = overflowRoot.getAttribute('data-export-pdf-code-id');
  const idB = tokenRoot.getAttribute('data-export-pdf-code-id');
  return !!(idA && idB && idA === idB);
}

function sourceNodeForRef(
  source: ParentNode,
  ref: string,
): Node | null {
  const indexed = (
    source as ParentNode & { indexOfRefs?: Record<string, Node> }
  ).indexOfRefs?.[ref];
  if (indexed) return indexed;
  return source.querySelector?.(`[data-ref='${ref}']`) ?? null;
}

function fallbackBreakTokenForPageChunk(
  overflowRoot: Element,
  source: ParentNode,
): BreakTokenLike | undefined {
  const ref = overflowRoot.getAttribute('data-ref');
  if (ref) {
    const srcNode = sourceNodeForRef(source, ref);
    if (srcNode) return makeBreakToken(srcNode, 0);
  }
  let candidate: Element | null = overflowRoot;
  while (candidate) {
    const candidateRef = candidate.getAttribute?.('data-ref');
    if (candidateRef) {
      const srcNode = sourceNodeForRef(source, candidateRef);
      if (srcNode) return makeBreakToken(srcNode, 0);
    }
    if (
      candidate.classList?.contains('md-editor-code')
      || candidate.classList?.contains('export-pdf-code-paged')
    ) {
      break;
    }
    candidate = candidate.parentElement;
  }
  return undefined;
}

/**
 * Map an overflowing rendered node to a source resume point via data-ref.
 * Page chunks resume at the chunk root; otherwise at the overflowing line.
 */
export function fallbackBreakTokenFromOverflow(
  overflow: OverflowLike | null | undefined,
  source: ParentNode | null | undefined,
): BreakTokenLike | undefined {
  if (!overflow?.startContainer || !source) return undefined;

  const overflowRoot = resolveOverflowCodeRoot(overflow);
  if (overflowRoot?.classList.contains('export-pdf-code-page-chunk')) {
    return fallbackBreakTokenForPageChunk(overflowRoot, source);
  }

  const line = resolveOverflowCodeLine(overflow);
  if (!line) return undefined;

  const ref = line.getAttribute?.('data-ref');
  if (!ref) return undefined;

  const srcNode = sourceNodeForRef(source, ref);
  if (!srcNode) return undefined;

  const srcEl = asElement(srcNode);
  if (!srcEl?.classList?.contains('export-pdf-code-line')) return undefined;

  return makeBreakToken(srcNode, 0);
}

/**
 * Decide whether onBreakToken should replace the engine token.
 * Returns a replacement token, or undefined to keep the existing one.
 *
 * Never overwrite tokens outside the overflowing fence (headings, paragraphs).
 * That replacement made boundary headings vanish.
 */
export function resolveCodeBreakTokenReplacement(
  breakToken: BreakTokenInput,
  overflow: OverflowLike | null | undefined,
  source: ParentNode | null | undefined,
): BreakTokenLike | undefined {
  if (!isExportPdfCodeOverflow(overflow)) return undefined;

  const overflowRoot = resolveOverflowCodeRoot(overflow);
  const overflowLine = resolveOverflowCodeLine(overflow);

  // Engine jumped to the next pre-split chunk of the same fence — pull back.
  if (
    breakToken?.node
    && overflowRoot
    && isLaterSiblingCodeChunk(breakToken.node, overflowRoot)
  ) {
    return source
      ? fallbackBreakTokenForPageChunk(overflowRoot, source)
      : undefined;
  }

  // Heading / paragraph / other content outside this fence — keep.
  if (
    breakToken?.node
    && !isTokenInsideCodeOverflow(breakToken.node, overflow)
  ) {
    return undefined;
  }

  if (
    breakToken?.node
    && overflowLine
    && isTokenInsideCodeOverflow(breakToken.node, overflow)
  ) {
    const tokenLine = codeLineFromNode(breakToken.node);
    if (tokenLine) {
      const tokenRef = tokenLine.getAttribute('data-ref');
      const overflowRef = overflowLine.getAttribute('data-ref');
      if (tokenRef && overflowRef && tokenRef === overflowRef) {
        return undefined;
      }
      if (isSameOrLaterCodeLine(breakToken.node, overflowLine)) {
        return undefined;
      }
    } else if (
      overflowRoot?.classList.contains('export-pdf-code-page-chunk')
      && (breakToken.node === overflowRoot
        || overflowRoot.contains(breakToken.node))
    ) {
      return undefined;
    }
  }

  return fallbackBreakTokenFromOverflow(overflow, source);
}
