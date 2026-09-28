import { describe, expect, it } from 'vitest';
import {
  countTaskCheckboxLines,
  cycleTaskCheckboxStatus,
  parseTaskCheckboxMarker,
  serializeTaskCheckboxMarker,
  taskCheckboxStatusFromAttrs,
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

  it('cycles todo → doing → done → todo', () => {
    expect(cycleTaskCheckboxStatus('todo')).toBe('doing');
    expect(cycleTaskCheckboxStatus('doing')).toBe('done');
    expect(cycleTaskCheckboxStatus('done')).toBe('todo');
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
