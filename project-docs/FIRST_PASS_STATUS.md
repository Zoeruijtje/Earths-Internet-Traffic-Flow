# First Implementation Pass — Status Supplement

Date: 2026-08-17

Branch: `build/phase-0-1-earth-foundation`

This supplement is intentionally conservative. `project-docs/STATUS.md` remains the canonical current-status file when the full local implementation commit is present on the branch.

## Implemented checkpoint

- Direct Three.js Earth renderer.
- One Earth-local frame for the globe, markers and great-circle geometry.
- Genuine NASA Blue Marble day imagery and NASA night-lights imagery, visibly attributed and explicitly described as static rather than real-time.
- UTC-derived solar direction and a shader-controlled day/night transition.
- Conservative atmosphere and ocean-response treatment.
- Five exact latitude/longitude markers.
- Four great-circle ribbon prototypes with exact endpoints and screen-space width control.
- Desktop information panel and dedicated phone/tablet bottom-sheet layout.
- Pointer rotation, wheel/pinch zoom, marker selection, reduced-motion behaviour and aspect-aware camera fitting.
- Static GitHub Pages entry point under `/docs`.
- No custom GitHub Actions workflow and no Git LFS.

## Truth state

- Network-source adapters connected: **0**.
- Prototype routes: **`DERIVED VISUAL` geometry tests**.
- Claimed live Internet activity: **none**.
- NASA imagery claimed as real-time: **no**.

## Phase decision

- Phase 0 must remain open anywhere the repository's documented clean-install, typecheck, lint, unit-test, production-build and browser-test commands have not all been reproduced from the committed tree.
- Phase 1 is not declared complete. This is an Earth-only vertical-slice checkpoint.
- This branch/PR should remain draft until the canonical `STATUS.md`, append-only `IMPLEMENTATION_LOG.md`, exact command results and browser evidence are confirmed to refer to the same commit.

## Highest-value next pass

Reproduce the clean dependency install in an unrestricted package-network environment, run every repository-declared command against the resulting lockfile, finish the full Phase 1 material/interaction/performance gate, and only then connect one carefully bounded and timestamped measurement source. RIPE Atlas/RIS or Route Views are stronger first candidates than an ambiguous “live traffic” feed because their semantics can be stated precisely.
