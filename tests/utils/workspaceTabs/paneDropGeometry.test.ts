import { describe, expect, it, beforeEach } from 'vitest';
import {
  biasFromPreviousZone,
  edgePctForBias,
  resetPaneDropZoneHistory,
  zoneFromPanePoint,
  PANE_DROP_EDGE_PCT_FAVOR_CENTER,
  PANE_DROP_EDGE_PCT_FAVOR_EDGE,
} from '@/utils/workspaceTabs/paneDropGeometry';

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

  beforeEach(() => {
    resetPaneDropZoneHistory();
  });

  it('maps left/right/top/bottom edges without gaps', () => {
    expect(zoneFromPanePoint(50, 500, box)).toBe('left');
    expect(zoneFromPanePoint(950, 500, box)).toBe('right');
    expect(zoneFromPanePoint(500, 50, box)).toBe('top');
    expect(zoneFromPanePoint(500, 950, box)).toBe('bottom');
  });

  it('maps the center region at neutral thirds', () => {
    expect(zoneFromPanePoint(500, 500, box)).toBe('center');
    expect(zoneFromPanePoint(400, 500, box)).toBe('center');
    expect(zoneFromPanePoint(500, 400, box)).toBe('center');
  });

  it('uses 33% thirds for edge bands by default', () => {
    expect(zoneFromPanePoint(320, 500, box)).toBe('left');
    expect(zoneFromPanePoint(340, 500, box)).toBe('center');
    expect(zoneFromPanePoint(660, 500, box)).toBe('center');
    expect(zoneFromPanePoint(700, 500, box)).toBe('right');
  });

  it('snaps corners to the nearest edge (no empty zone)', () => {
    expect(zoneFromPanePoint(20, 20, box)).toBe('left');
    expect(zoneFromPanePoint(980, 20, box)).toBe('right');
  });

  it('expands edges when favoring edge bias (center → edge / outside → edge)', () => {
    const edgePct = edgePctForBias('edge');
    expect(edgePct).toBe(PANE_DROP_EDGE_PCT_FAVOR_EDGE);
    // 40% from left is center at 33%, but edge under favor-edge (46%)
    expect(zoneFromPanePoint(400, 500, box, edgePct)).toBe('left');
    expect(zoneFromPanePoint(500, 500, box, edgePct)).toBe('center');
  });

  it('expands center when favoring center bias (edge → center)', () => {
    const edgePct = edgePctForBias('center');
    expect(edgePct).toBe(PANE_DROP_EDGE_PCT_FAVOR_CENTER);
    // 25% from left is edge at 33%, but center under favor-center (18%)
    expect(zoneFromPanePoint(250, 500, box, edgePct)).toBe('center');
    expect(zoneFromPanePoint(100, 500, box, edgePct)).toBe('left');
  });
});

describe('biasFromPreviousZone', () => {
  it('favors edges when coming from outside or another leaf', () => {
    expect(biasFromPreviousZone(null, false)).toBe('edge');
    expect(biasFromPreviousZone('center', false)).toBe('edge');
    expect(biasFromPreviousZone('left', false)).toBe('edge');
  });

  it('favors edges when previous zone was center on the same leaf', () => {
    expect(biasFromPreviousZone('center', true)).toBe('edge');
  });

  it('favors center when previous zone was an edge on the same leaf', () => {
    expect(biasFromPreviousZone('left', true)).toBe('center');
    expect(biasFromPreviousZone('top', true)).toBe('center');
  });
});
