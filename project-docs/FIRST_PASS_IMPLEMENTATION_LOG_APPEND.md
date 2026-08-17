# Implementation Log Append — 2026-08-17

This entry is formatted for append-only transfer into `project-docs/IMPLEMENTATION_LOG.md` if the full local implementation commit was not transported to the branch.

## 2026-08-17 — Phase 0 foundation and Phase 1 Earth checkpoint

### Scope

Established the application/rendering foundation and advanced Phase 1 only to a source-honest Earth vertical slice. Network data integrations remain disconnected.

### Added

- Direct Three.js WebGL renderer and a single Earth-local scene frame.
- NASA Blue Marble day texture and NASA night-lights texture with visible attribution.
- UTC-derived Earth-fixed solar vector, day/night shader transition, restrained ocean highlight and atmosphere shell.
- Deterministic latitude/longitude conversion and Earth-local marker placement.
- Great-circle interpolation and screen-space ribbon extrusion with exact endpoints.
- Five reference markers and four routes used exclusively as `DERIVED VISUAL` geometry tests.
- Desktop inspector and dedicated phone/tablet bottom-sheet layouts.
- Pointer rotation, wheel/pinch zoom, selection, aspect-aware camera framing and reduced-motion behaviour.
- Static GitHub Pages output under `/docs` without a custom workflow.
- Expanded disconnected source-candidate registry with strict source-activation gates.

### Defects identified during the local browser-review cycle

- Strict unchecked-index access in arc-strip generation.
- Phone and portrait-tablet composition that allowed the information surface to obscure the globe.
- Phone landscape being treated as a desktop layout.
- A fixed-delay bottom-sheet assertion that sampled the panel mid-transition under slow software rendering.
- Prototype route geometry touching a viewport edge.
- Narrow-layout attribution becoming partially obscured by the expanded information surface.

### Corrections applied in the local implementation

- Validated arc inputs and used proven indices.
- Moved viewports at or below 900 px to the dedicated bottom-sheet experience.
- Added aspect-aware camera fit and a separate phone-landscape composition.
- Replaced the timing assumption with a geometry-based readiness condition.
- Increased framing margin and kept a compact NASA credit visible in narrow layouts.
- Isolated software-WebGL browser runs by viewport to avoid resource leakage.

### Truth constraints

- No route is represented as measured, current, physical or live.
- No animated particle is used to imply packets or throughput.
- No source is connected merely to hide incomplete Earth rendering.
- Candidate sources remain disconnected until licence, temporal semantics, sampling, uncertainty and UI language are documented and tested.

### Gate decision

This is a coherent checkpoint, not a declaration that all of Phase 1 is complete. The phase may exit only when the committed tree, exact automated-command report and reviewed screenshots are tied to the same commit and every documented exit condition passes.
