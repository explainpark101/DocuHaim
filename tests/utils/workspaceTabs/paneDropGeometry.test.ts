import { describe, expect, it } from 'vitest';
import { zoneFromPanePoint } from '@/utils/workspaceTabs/paneDropGeometry';

function rect(w: number, h: number): DOMRect {
  return {
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    right: w,
    bottom: h,
    width: w,
    height: h,
    toJSON: () => ({}),
  } as DOMRect;
}

describe('zoneFromPanePoint', () => {
  const box = rect(1000, 1000);

  it('maps left/right/top/bottom edges without gaps', () => {
    expect(zoneFromPanePoint(50, 500, box)).toBe('left');
    expect(zoneFromPanePoint(950, 500, box)).toBe('right');
    expect(zoneFromPanePoint(500, 50, box)).toBe('top');
    expect(zoneFromPanePoint(500, 950, box)).toBe('bottom');
  });

  it('maps the center region', () => {
    expect(zoneFromPanePoint(500, 500, box)).toBe('center');
    // Outside the outer thirds (33%) → center
    expect(zoneFromPanePoint(400, 500, box)).toBe('center');
    expect(zoneFromPanePoint(500, 400, box)).toBe('center');
  });

  it('uses 33% thirds for edge bands', () => {
    expect(zoneFromPanePoint(320, 500, box)).toBe('left');
    expect(zoneFromPanePoint(340, 500, box)).toBe('center');
    expect(zoneFromPanePoint(660, 500, box)).toBe('center');
    expect(zoneFromPanePoint(700, 500, box)).toBe('right');
  });

  it('snaps corners to the nearest edge (no empty zone)', () => {
    expect(zoneFromPanePoint(20, 20, box)).toBe('left');
    expect(zoneFromPanePoint(980, 20, box)).toBe('right');
  });
});
