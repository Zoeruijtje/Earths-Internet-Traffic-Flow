# Architecture

## Current checkpoint

Phase 0 establishes a conventional Vite + React + strict TypeScript application with a direct Three.js renderer lifecycle. React owns low-frequency interface composition only. `EarthRenderer` owns WebGL scene creation, animation, resize handling and disposal.

## Coordinate convention

The entire future geographic scene will use one Earth-local frame:

- `+Y` = geographic north pole;
- `+X` = equator at longitude `0°`;
- `+Z` = equator at longitude `+90°E`.

All geographic markers, measurement arcs and later spatial overlays must be children of the Earth-local group rather than the scene root.

## Data state

No external network source is connected in Phase 0. The interface explicitly states `DATA NOT CONNECTED`. No pseudo-live counters, sample traffic, random routes or fabricated events are allowed.

## Build and deployment

`npm run build` writes Vite output to `dist/`. `npm run build:pages` regenerates `/docs` from that build and creates `/docs/.nojekyll`. `/docs` is generated output and must not be hand-edited.

The Vite base is relative (`./`) so production assets remain safe under the GitHub Pages repository subpath.

## Next renderer milestone

Phase 1 replaces the deliberately neutral foundation sphere with documented NASA-derived production assets, physically checked solar lighting, night emission, atmosphere, progressive texture tiers, tested screen-space arc geometry and complete multi-viewport screenshot evidence.
