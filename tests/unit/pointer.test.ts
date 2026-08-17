import { describe, expect, it } from 'vitest';
import { pointerToNdc } from '../../src/scene/interaction/pointer';

const rect = { left: 100, top: 50, width: 800, height: 400 };

describe('pointerToNdc', () => {
  it('maps the actual canvas centre to the NDC origin', () => {
    expect(pointerToNdc(500, 250, rect)).toEqual({ x: 0, y: 0 });
  });

  it('honours a non-zero canvas offset', () => {
    expect(pointerToNdc(100, 50, rect)).toEqual({ x: -1, y: 1 });
    expect(pointerToNdc(900, 450, rect)).toEqual({ x: 1, y: -1 });
  });

  it('is independent of device-pixel ratio by construction', () => {
    const cssPoint = pointerToNdc(300, 150, rect);
    expect(cssPoint.x).toBeCloseTo(-0.5, 10);
    expect(cssPoint.y).toBeCloseTo(0.5, 10);
  });

  it('rejects zero-size canvas rectangles', () => {
    expect(() => pointerToNdc(0, 0, { left: 0, top: 0, width: 0, height: 100 })).toThrow();
  });
});
