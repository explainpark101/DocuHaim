import { describe, expect, it } from 'vitest';
import {
  advanceTaskCheckboxMarker,
  advanceTaskCheckboxStatus,
  countTaskCheckboxLines,
  cycleTaskCheckboxStatus,
  parseTaskCheckboxMarker,
  serializeTaskCheckboxMarker,
  serializeTaskCheckboxMarkerForKind,
  taskCheckboxKindFromAttrs,
  taskCheckboxKindFromMarker,
  taskCheckboxStatusFromAttrs,
  toggleTaskCheckboxStatus,
} from '@/utils/taskCheckboxStatus';

describe('taskCheckboxStatus', () => {
  it('parses markers', () => {
    expect(parseTaskCheckboxMarker(' ')).toBe('todo');
    expect(parseTaskCheckboxMarker('~')).toBe('doing');
    expect(parseTaskCheckboxMarker('x')).toBe('done');
    expect(parseTaskCheckboxMarker('X')).toBe('done');
    expect(parseTaskCheckboxMarker('?')).toBe('todo');
  });

  it('serializes canonically', () => {
    expect(serializeTaskCheckboxMarker('todo')).toBe(' ');
    expect(serializeTaskCheckboxMarker('doing')).toBe('~');
    expect(serializeTaskCheckboxMarker('done')).toBe('x');
  });

  it('cycles status: todo → doing → done → todo', () => {
    expect(cycleTaskCheckboxStatus('todo')).toBe('doing');
    expect(cycleTaskCheckboxStatus('doing')).toBe('done');
    expect(cycleTaskCheckboxStatus('done')).toBe('todo');
  });

  it('toggles check binary: todo ↔ done', () => {
    expect(toggleTaskCheckboxStatus('todo')).toBe('done');
    expect(toggleTaskCheckboxStatus('done')).toBe('todo');
    expect(toggleTaskCheckboxStatus('doing')).toBe('done');
  });

  it('advances by kind', () => {
    expect(advanceTaskCheckboxStatus('todo', 'check')).toBe('done');
    expect(advanceTaskCheckboxStatus('done', 'check')).toBe('todo');
    expect(advanceTaskCheckboxStatus('doing', 'check')).toBe('done');
    expect(advanceTaskCheckboxStatus('todo', 'status')).toBe('doing');
    expect(advanceTaskCheckboxStatus('doing', 'status')).toBe('done');
    expect(advanceTaskCheckboxStatus('done', 'status')).toBe('todo');
  });

  it('advances markdown markers (source / checklist)', () => {
    expect(advanceTaskCheckboxMarker(' ')).toBe('x');
    expect(advanceTaskCheckboxMarker('x')).toBe(' ');
    expect(advanceTaskCheckboxMarker('~')).toBe('x');
    expect(advanceTaskCheckboxMarker('X')).toBe(' ');
  });

  it('infers kind from marker and attrs', () => {
    expect(taskCheckboxKindFromMarker('~')).toBe('status');
    expect(taskCheckboxKindFromMarker(' ')).toBe('check');
    expect(taskCheckboxKindFromAttrs({ kind: 'status', status: 'todo' })).toBe(
      'status',
    );
    expect(taskCheckboxKindFromAttrs({ status: 'doing' })).toBe('status');
    expect(taskCheckboxKindFromAttrs({ checked: false })).toBe('check');
  });

  it('serializes for kind without writing ~ on check', () => {
    expect(serializeTaskCheckboxMarkerForKind('doing', 'check')).toBe(' ');
    expect(serializeTaskCheckboxMarkerForKind('doing', 'status')).toBe('~');
    expect(serializeTaskCheckboxMarkerForKind('done', 'check')).toBe('x');
  });

  it('resolves attrs', () => {
    expect(taskCheckboxStatusFromAttrs({ status: 'doing' })).toBe('doing');
    expect(taskCheckboxStatusFromAttrs({ checked: true })).toBe('done');
    expect(taskCheckboxStatusFromAttrs({ checked: false })).toBe('todo');
  });

  it('counts lines with doing as pending', () => {
    const md = `- [ ] a\n- [~] b\n- [x] c\n- [X] d\nplain\n`;
    expect(countTaskCheckboxLines(md)).toEqual({
      total: 4,
      completed: 2,
      pending: 2,
    });
  });
});
