import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { cartesianToLatLon, greatCirclePoint, latLonToCartesian } from '../../src/scene/geometry/coordinates';

const EPS = 1e-6;

describe('Earth-local coordinate conversion', () => {
  it('maps prime meridian equator to +X', () => {
    const p = latLonToCartesian(0, 0);
    expect(p.x).toBeCloseTo(1, 6);
    expect(p.y).toBeCloseTo(0, 6);
    expect(p.z).toBeCloseTo(0, 6);
  });

  it('maps 90E equator to +Z', () => {
    const p = latLonToCartesian(0, 90);
    expect(p.x).toBeCloseTo(0, 6);
    expect(p.y).toBeCloseTo(0, 6);
    expect(p.z).toBeCloseTo(1, 6);
  });

  it('maps poles correctly', () => {
    expect(latLonToCartesian(90, 0).y).toBeCloseTo(1, 6);
    expect(latLonToCartesian(-90, 0).y).toBeCloseTo(-1, 6);
  });

  it('round-trips known coordinates', () => {
    const input = { lat: 52.3676, lon: 4.9041 };
    const output = cartesianToLatLon(latLonToCartesian(input.lat, input.lon, 2.5));
    expect(output.lat).toBeCloseTo(input.lat, 6);
    expect(output.lon).toBeCloseTo(input.lon, 6);
  });
});

describe('great-circle interpolation', () => {
  it('returns exact normalized endpoints', () => {
    const a = latLonToCartesian(10, 20);
    const b = latLonToCartesian(-30, 80);
    expect(greatCirclePoint(a, b, 0).distanceTo(a.normalize())).toBeLessThan(EPS);
    expect(greatCirclePoint(a, b, 1).distanceTo(b.normalize())).toBeLessThan(EPS);
  });

  it('handles identical endpoints', () => {
    const a = latLonToCartesian(0, 0);
    expect(greatCirclePoint(a, a, 0.5).distanceTo(a)).toBeLessThan(EPS);
  });

  it('handles antipodal endpoints without NaN', () => {
    const a = new THREE.Vector3(1, 0, 0);
    const b = new THREE.Vector3(-1, 0, 0);
    const p = greatCirclePoint(a, b, 0.5);
    expect(Number.isFinite(p.x)).toBe(true);
    expect(Number.isFinite(p.y)).toBe(true);
    expect(Number.isFinite(p.z)).toBe(true);
    expect(p.length()).toBeCloseTo(1, 6);
  });
});
