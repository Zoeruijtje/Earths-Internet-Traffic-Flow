import * as THREE from 'three';

export interface LatLon {
  lat: number;
  lon: number;
}

/**
 * Earth-local convention used throughout the project:
 * +Y = geographic north pole
 * +X = longitude 0° at the equator
 * +Z = longitude +90°E at the equator
 *
 * This makes longitude increase counter-clockwise when viewed from +Y.
 */
export function latLonToCartesian(lat: number, lon: number, radius = 1): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(lat);
  const lambda = THREE.MathUtils.degToRad(lon);
  const cosPhi = Math.cos(phi);

  return new THREE.Vector3(
    radius * cosPhi * Math.cos(lambda),
    radius * Math.sin(phi),
    radius * cosPhi * Math.sin(lambda),
  );
}

export function cartesianToLatLon(position: THREE.Vector3): LatLon {
  const radius = position.length();
  if (radius === 0) throw new Error('Cannot convert the zero vector to latitude/longitude.');

  const lat = THREE.MathUtils.radToDeg(Math.asin(THREE.MathUtils.clamp(position.y / radius, -1, 1)));
  const lon = THREE.MathUtils.radToDeg(Math.atan2(position.z, position.x));
  return { lat, lon };
}

export function greatCirclePoint(start: THREE.Vector3, end: THREE.Vector3, t: number): THREE.Vector3 {
  const a = start.clone().normalize();
  const b = end.clone().normalize();
  const dot = THREE.MathUtils.clamp(a.dot(b), -1, 1);

  if (dot > 0.999999) return a.lerp(b, t).normalize();

  if (dot < -0.999999) {
    const fallbackAxis = Math.abs(a.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
    const axis = new THREE.Vector3().crossVectors(a, fallbackAxis).normalize();
    return a.applyAxisAngle(axis, Math.PI * t).normalize();
  }

  const omega = Math.acos(dot);
  const sinOmega = Math.sin(omega);
  const scaleA = Math.sin((1 - t) * omega) / sinOmega;
  const scaleB = Math.sin(t * omega) / sinOmega;
  return a.multiplyScalar(scaleA).addScaledVector(b, scaleB).normalize();
}
