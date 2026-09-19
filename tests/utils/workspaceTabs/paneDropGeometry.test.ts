import { describe, expect, it, beforeEach } from 'vitest';
import {
  bandsFromPointerMotion,
  biasFromPreviousZone,
  edgePctForBias,
  resetPaneDropZoneHistory,
  zoneFromPanePoint,
  PANE_DROP_EDGE_PCT_EXPANDED,
  PANE_DROP_EDGE_PCT_SHRUNK,
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

  it('expands a single side when given asymmetric bands', () => {
    const bands = { left: PANE_DROP_EDGE_PCT_EXPANDED, right: 33, top: 33, bottom: 33 };
    expect(zoneFromPanePoint(400, 500, box, bands)).toBe('left');
    expect(zoneFromPanePoint(400, 500, box, 33)).toBe('center');
  });

  it('expands center when all edges are shrunk', () => {
    expect(zoneFromPanePoint(250, 500, box, PANE_DROP_EDGE_PCT_SHRUNK)).toBe('center');
    expect(zoneFromPanePoint(100, 500, box, PANE_DROP_EDGE_PCT_SHRUNK)).toBe('left');
  });
});

describe('bandsFromPointerMotion', () => {
  const box = rect(1000, 1000);

  it('expands left when moving left', () => {
    const { bands, favor } = bandsFromPointerMotion({
      clientX: 400,
      clientY: 500,
      rect: box,
      prevClientX: 450,
      prevClientY: 500,
      enteringLeaf: false,
    });
    expect(favor).toBe('left');
    expect(bands.left).toBe(PANE_DROP_EDGE_PCT_EXPANDED);
    expect(bands.right).toBe(33);
  });

  it('expands top when moving up', () => {
    const { bands, favor } = bandsFromPointerMotion({
      clientX: 500,
      clientY: 400,
      rect: box,
      prevClientX: 500,
      prevClientY: 480,
      enteringLeaf: false,
    });
    expect(favor).toBe('top');
    expect(bands.top).toBe(PANE_DROP_EDGE_PCT_EXPANDED);
  });

  it('shrinks edges when moving toward center', () => {
    const { bands, favor } = bandsFromPointerMotion({
      clientX: 450,
      clientY: 500,
      rect: box,
      prevClientX: 200,
      prevClientY: 500,
      enteringLeaf: false,
    });
    expect(favor).toBe('center');
    expect(bands.left).toBe(PANE_DROP_EDGE_PCT_SHRUNK);
    expect(bands.right).toBe(PANE_DROP_EDGE_PCT_SHRUNK);
  });

  it('expands nearest edge when entering a leaf', () => {
    const { bands, favor } = bandsFromPointerMotion({
      clientX: 40,
      clientY: 500,
      rect: box,
      prevClientX: Number.NaN,
      prevClientY: Number.NaN,
      enteringLeaf: true,
    });
    expect(favor).toBe('left');
    expect(bands.left).toBe(PANE_DROP_EDGE_PCT_EXPANDED);
  });
});

describe('legacy bias helpers', () => {
  it('still maps previous-zone bias', () => {
    expect(biasFromPreviousZone(null, false)).toBe('edge');
    expect(biasFromPreviousZone('center', true)).toBe('edge');
    expect(biasFromPreviousZone('left', true)).toBe('center');
    expect(edgePctForBias('edge')).toBe(PANE_DROP_EDGE_PCT_FAVOR_EDGE);
    expect(edgePctForBias('center')).toBe(PANE_DROP_EDGE_PCT_FAVOR_CENTER);
  });
});
