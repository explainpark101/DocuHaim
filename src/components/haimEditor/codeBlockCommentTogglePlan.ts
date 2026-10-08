/**
 * Pure comment/uncomment planning (CodeMirror-compatible line/block toggle).
 * Used by TipTap code blocks and CM fenced-code bodies.
 */

export type CommentTextChange = {
  from: number;
  to?: number;
  insert: string;
};

export type CommentLineInfo = {
  /** Absolute document position of the line start. */
  from: number;
  text: string;
};

/**
 * Plan line-comment toggle for the given lines (already intersecting selection).
 * Mirrors @codemirror/commands changeLineComment Toggle behavior.
 */
export function planToggleLineComment(
  lines: readonly CommentLineInfo[],
  token: string,
): CommentTextChange[] | null {
  if (!token || lines.length === 0) return null;

  type Row = {
    from: number;
    text: string;
    comment: number;
    indent: number;
    empty: boolean;
    single: boolean;
  };

  const rows: Row[] = [];
  let minIndent = 1e9;

  for (const line of lines) {
    const indent = /^\s*/.exec(line.text)?.[0].length ?? 0;
    const empty = indent === line.text.length;
    const comment =
      line.text.slice(indent, indent + token.length) === token ? indent : -1;
    if (indent < line.text.length && indent < minIndent) {
      minIndent = indent;
    }
    rows.push({
      from: line.from,
      text: line.text,
      comment,
      indent,
      empty,
      single: false,
    });
  }

  if (minIndent < 1e9) {
    for (const row of rows) {
      if (row.indent < row.text.length) row.indent = minIndent;
    }
  }
  if (rows.length === 1) rows[0]!.single = true;

  const shouldComment = rows.some(
    (l) => l.comment < 0 && (!l.empty || l.single),
  );

  if (shouldComment) {
    const changes: CommentTextChange[] = [];
    for (const row of rows) {
      if (row.single || !row.empty) {
        changes.push({ from: row.from + row.indent, insert: `${token} ` });
      }
    }
    return changes.length > 0 ? changes : null;
  }

  if (rows.some((l) => l.comment >= 0)) {
    const changes: CommentTextChange[] = [];
    for (const row of rows) {
      if (row.comment < 0) continue;
      let delFrom = row.from + row.comment;
      let delTo = delFrom + token.length;
      if (row.text[row.comment + token.length] === ' ') delTo += 1;
      changes.push({ from: delFrom, to: delTo, insert: '' });
    }
    return changes.length > 0 ? changes : null;
  }

  return null;
}

/**
 * One selected line range for block wrap: from first non-ws to line end.
 * `content` is the substring between from and to.
 */
export type BlockLineRange = {
  from: number;
  to: number;
  content: string;
};

type FoundBlock = {
  openPos: number;
  openMargin: number;
  closePos: number;
  closeMargin: number;
};

function findBlockOnRange(
  range: BlockLineRange,
  open: string,
  close: string,
): FoundBlock | null {
  const { from, to, content } = range;
  if (content.length < open.length + close.length) return null;

  const startSpace = /^\s*/.exec(content)?.[0].length ?? 0;
  const endSpace = /\s*$/.exec(content)?.[0].length ?? 0;
  const endOff = content.length - endSpace - close.length;
  if (
    content.slice(startSpace, startSpace + open.length) === open &&
    endOff >= startSpace + open.length &&
    content.slice(endOff, endOff + close.length) === close
  ) {
    return {
      openPos: from + startSpace + open.length,
      openMargin: /\s/.test(content.charAt(startSpace + open.length)) ? 1 : 0,
      closePos: to - endSpace - close.length,
      closeMargin: endOff > 0 && /\s/.test(content.charAt(endOff - 1)) ? 1 : 0,
    };
  }
  return null;
}

/**
 * Plan block-comment wrap/unwrap for whole selected lines
 * (CodeMirror toggleBlockCommentByLine style).
 */
export function planToggleBlockCommentByLine(
  ranges: readonly BlockLineRange[],
  open: string,
  close: string,
): CommentTextChange[] | null {
  if (!open || !close || ranges.length === 0) return null;

  const comments = ranges.map((r) => findBlockOnRange(r, open, close));

  if (!comments.every((c) => c)) {
    const changes: CommentTextChange[] = [];
    for (let i = 0; i < ranges.length; i += 1) {
      if (comments[i]) continue;
      const range = ranges[i]!;
      changes.push(
        { from: range.from, insert: `${open} ` },
        { from: range.to, insert: ` ${close}` },
      );
    }
    return changes.length > 0 ? changes : null;
  }

  const changes: CommentTextChange[] = [];
  for (let i = 0; i < comments.length; i += 1) {
    const comment = comments[i];
    if (!comment) continue;
    changes.push(
      {
        from: comment.openPos - open.length,
        to: comment.openPos + comment.openMargin,
        insert: '',
      },
      {
        from: comment.closePos - comment.closeMargin,
        to: comment.closePos + close.length,
        insert: '',
      },
    );
  }
  return changes.length > 0 ? changes : null;
}

/** Apply changes from high → low so offsets stay valid. */
export function sortCommentChangesDescending(
  changes: readonly CommentTextChange[],
): CommentTextChange[] {
  return [...changes].sort((a, b) => b.from - a.from || (b.to ?? b.from) - (a.to ?? a.from));
}
