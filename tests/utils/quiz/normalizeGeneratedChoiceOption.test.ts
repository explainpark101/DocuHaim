import { describe, expect, it } from 'vitest';
import { normalizeGeneratedChoiceOption } from '@/utils/quiz/normalizeGeneratedChoiceOption';

describe('normalizeGeneratedChoiceOption', () => {
  it('strips numeric + alphabetic prefixes', () => {
    expect(normalizeGeneratedChoiceOption('1. a. 전압은 일정하다')).toBe('전압은 일정하다');
    expect(normalizeGeneratedChoiceOption('2. b) 저항이 증가한다')).toBe('저항이 증가한다');
  });

  it('strips standalone numeric or alphabetic prefixes', () => {
    expect(normalizeGeneratedChoiceOption('3. 전류가 감소한다')).toBe('전류가 감소한다');
    expect(normalizeGeneratedChoiceOption('c. 옴의 법칙')).toBe('옴의 법칙');
    expect(normalizeGeneratedChoiceOption('(4) 전력')).toBe('전력');
    expect(normalizeGeneratedChoiceOption('④ 순환')).toBe('순환');
    expect(normalizeGeneratedChoiceOption('가. 정의')).toBe('정의');
  });

  it('leaves inline math and body text intact', () => {
    expect(normalizeGeneratedChoiceOption('$V=IR$ 관계')).toBe('$V=IR$ 관계');
    expect(normalizeGeneratedChoiceOption('  본문만  ')).toBe('본문만');
  });
});
