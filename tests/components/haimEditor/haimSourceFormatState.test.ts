import { describe, expect, it } from 'vitest';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { queryHaimSourceFormatState } from '@/components/haimEditor/haimSourceFormatState';

function flagsAt(doc: string, from: number, to: number = from) {
  const state = EditorState.create({
    doc,
    selection: { anchor: from, head: to },
    extensions: [markdown()],
  });
  return queryHaimSourceFormatState(state);
}

function caretIn(doc: string, needle: string, offset = 0) {
  const at = doc.indexOf(needle);
  expect(at).toBeGreaterThanOrEqual(0);
  return flagsAt(doc, at + offset);
}

describe('queryHaimSourceFormatState', () => {
  it('marks bold inside ** and not italic', () => {
    const got = caretIn('**bold**', 'bold', 1);
    expect(got.bold).toBe(true);
    expect(got.italic).toBe(false);
  });

  it('marks italic inside a single star pair', () => {
    const got = caretIn('*italic*', 'italic', 1);
    expect(got.italic).toBe(true);
    expect(got.bold).toBe(false);
  });

  it('marks both bold and italic inside ***', () => {
    const got = caretIn('***both***', 'both', 1);
    expect(got.bold).toBe(true);
    expect(got.italic).toBe(true);
  });

  it('clears inline marks once the caret leaves the closer', () => {
    const doc = '**bold**';
    const got = flagsAt(doc, doc.length);
    expect(got.bold).toBe(false);
    expect(got.italic).toBe(false);
  });

  it('keeps bold when the whole token or its inner text is selected', () => {
    const doc = '**bold**';
    expect(flagsAt(doc, 0, doc.length).bold).toBe(true);
    const inner = doc.indexOf('bold');
    expect(flagsAt(doc, inner, inner + 4).bold).toBe(true);
  });

  it('does not mark bold when the selection runs past the token', () => {
    const doc = '**bold** tail';
    expect(flagsAt(doc, 2, doc.length).bold).toBe(false);
  });

  it('marks strike without treating ~~ as subscript', () => {
    const got = caretIn('~~strike~~', 'strike', 1);
    expect(got.strike).toBe(true);
    expect(got.sub).toBe(false);
  });

  it('marks subscript and superscript wraps', () => {
    expect(caretIn('~sub~', 'sub', 1).sub).toBe(true);
    expect(caretIn('^sup^', 'sup', 1).sup).toBe(true);
    expect(caretIn('~sub~', 'sub', 1).strike).toBe(false);
  });

  it('marks underline inside u tags', () => {
    const got = caretIn('<u>under</u>', 'under', 1);
    expect(got.underline).toBe(true);
  });

  it('marks inline code and ignores emphasis inside it', () => {
    const doc = '`**no**` **yes**';
    const insideCode = caretIn(doc, 'no', 1);
    expect(insideCode.code).toBe(true);
    expect(insideCode.bold).toBe(false);
    const yes = doc.indexOf('yes');
    const insideBold = flagsAt(doc, yes + 1);
    expect(insideBold.bold).toBe(true);
    expect(insideBold.code).toBe(false);
  });

  it('marks bold and italic that wrap inline code', () => {
    const bold = caretIn('**`code`**', 'code', 1);
    expect(bold.code).toBe(true);
    expect(bold.bold).toBe(true);
    expect(bold.italic).toBe(false);
    const italic = caretIn('*`code`*', 'code', 1);
    expect(italic.code).toBe(true);
    expect(italic.italic).toBe(true);
    expect(italic.bold).toBe(false);
  });

  it('marks a fenced code block and ignores inner emphasis', () => {
    const doc = '```\n**no**\n```';
    const at = doc.indexOf('no');
    const got = flagsAt(doc, at + 1);
    expect(got.codeBlock).toBe(true);
    expect(got.bold).toBe(false);
    expect(got.code).toBe(false);
  });

  it('marks ATX headings', () => {
    expect(caretIn('# One', 'One').h1).toBe(true);
    expect(caretIn('## Two', 'Two').h2).toBe(true);
    expect(caretIn('### Three', 'Three').h3).toBe(true);
    expect(caretIn('# One', 'One').h2).toBe(false);
  });

  it('marks setext heading 1', () => {
    const doc = 'Title\n=====\n';
    expect(flagsAt(doc, 1).h1).toBe(true);
  });

  it('marks lists, and task lines instead of the parent list', () => {
    expect(caretIn('- item', 'item').bullet).toBe(true);
    expect(caretIn('- item', 'item').task).toBe(false);
    expect(caretIn('1. item', 'item').ordered).toBe(true);
    const task = caretIn('- [ ] todo', 'todo');
    expect(task.task).toBe(true);
    expect(task.bullet).toBe(false);
    const orderedTask = caretIn('1. [x] todo', 'todo');
    expect(orderedTask.task).toBe(true);
    expect(orderedTask.ordered).toBe(false);
  });

  it('keeps task active on a wrapped continuation line', () => {
    const doc = '- [ ] todo\n  more';
    const at = doc.indexOf('more');
    const got = flagsAt(doc, at + 1);
    expect(got.task).toBe(true);
    expect(got.bullet).toBe(false);
  });

  it('marks blockquote', () => {
    expect(caretIn('> quoted', 'quoted').quote).toBe(true);
  });

  it('marks markdown links but not images', () => {
    const link = caretIn('[alt](https://example.com)', 'alt');
    expect(link.link).toBe(true);
    const image = caretIn('![alt](https://example.com)', 'alt');
    expect(image.link).toBe(false);
  });

  it('marks angle-bracket autolinks', () => {
    const got = caretIn('<https://example.com>', 'example');
    expect(got.link).toBe(true);
  });
});
