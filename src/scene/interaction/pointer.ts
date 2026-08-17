export interface CanvasRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface NormalizedDeviceCoordinates {
  x: number;
  y: number;
}

/** Convert CSS-pixel pointer coordinates to WebGL normalized device coordinates.
 * Device-pixel ratio is deliberately absent: getBoundingClientRect() and pointer
 * coordinates are both expressed in CSS pixels, so applying DPR here would
 * introduce the exact selection offset this project is required to avoid.
 */
export function pointerToNdc(clientX: number, clientY: number, rect: CanvasRect): NormalizedDeviceCoordinates {
  if (rect.width <= 0 || rect.height <= 0) throw new Error('Canvas rectangle must have positive dimensions.');

  return {
    x: ((clientX - rect.left) / rect.width) * 2 - 1,
    y: -((clientY - rect.top) / rect.height) * 2 + 1,
  };
}
