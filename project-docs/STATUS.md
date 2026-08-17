# Project Status

**Project:** Earth’s Internet Traffic Flow  
**Working product title:** The Internet, Live  
**Last updated:** 2026-08-17  
**Stable state:** Phase 0 rebuild and renderer hardening in progress on `build/phase-0-foundation-rebuild`  
**Production deployment:** Not configured  
**Implementation code:** Source scaffold exists; exit gate not yet passed

## Current objective

Finish a reproducible Phase 0 before enabling NASA production textures. The current branch replaces the previous CDN prototype with Vite + React + strict TypeScript, direct Three.js ownership, deterministic QA geometry, explicit renderer controls and a truthful no-data shell.

## Fixed constraints

- Public repository: `Zoeruijtje/Earths-Internet-Traffic-Flow`.
- Hosting target: GitHub Pages from generated `/docs` on `main`; no custom GitHub Actions workflow.
- No Git LFS.
- No fabricated live-looking Internet activity.
- NASA imagery requires recorded provenance/processing/checksums before Phase 1 acceptance.
- Desktop, tablet and phone are first-class targets.
- Visual claims require actual browser screenshots and inspection.

## Phase roadmap

| Phase | Name | Status | Exit gate summary |
|---|---|---:|---|
| 0 | Repository and engineering foundation | **In progress — source and renderer hardening implemented; runtime gate pending** | Clean install, lockfile, typecheck/lint/unit/browser/build/Pages verification, screenshot review |
| 1 | Photorealistic Earth and premium interface shell | Not started on rebuild branch | NASA derivatives, solar/night/atmosphere QA, geometry/input gate |
| 2 | RIPE Atlas measured live layer | Not started | Genuine measurements and source-health/reconnect semantics |
| 3 | RIPE RIS routing layer | Not started | BGP shown as routing, never traffic |
| 4 | Verified extension layers | Not started | Per-source legal/technical/semantic gate |
| 5 | Interaction depth and cinematic polish | Not started | UX/accessibility/performance gate |
| 6 | Release hardening | Not started | Full regression, attribution and Pages launch |

## Implemented on the rebuild branch

- Pinned Vite/React/TypeScript/Three.js/Vitest/ESLint/Playwright scaffold.
- Direct `EarthRenderer` outside React's frame loop.
- Deterministic decorative star geometry so screenshot comparisons are reproducible.
- Frame-rate-independent auto rotation rather than frame-count-dependent rotation.
- Hidden-page render suppression and WebGL context-loss/restoration state.
- `Performance`, `Balanced` and `High` DPR quality caps with user controls.
- Low-frequency renderer diagnostics sourced from `renderer.info`.
- Explicit pause/resume rotation and reset-view controls.
- Canonical Earth-local coordinate convention.
- Canvas-local pointer-to-NDC utility that deliberately avoids DPR double application.
- Unit-test coverage defined for coordinate and pointer mathematics.
- Responsive desktop/portrait/landscape shell and seven-viewport Playwright screenshot harness.
- Deterministic Pages build/verification tooling with relative Vite asset paths.
- Explicit `DATA NOT CONNECTED` state and zero fake network events.

## Important correction from the previous pass

The earlier HTML execution report supplied by the user contained `FileNotFoundError` for publication/browser review and said no screenshots were produced. It is failed evidence, not a completed gate. The previous branch also hand-authored `/docs` and imported Three.js from a CDN, so it is not the rebuild source of truth.

## Locked architectural decisions

### AD-001 — Static GitHub Pages deployment
Generated `/docs` only; no custom workflow under the current constraint.

### AD-002 — Direct Three.js renderer
React owns low-frequency UI only. Scene lifecycle and frame updates stay in Three.js.

### AD-003 — Truth-labelled data
Future layers use **MEASURED**, **OBSERVED**, **INFRASTRUCTURE**, **DERIVED VISUAL**, or **RECORDED**. Phase 0 shows no Internet events.

### AD-004 — Earth-local coordinates
`+Y` north, `+X` equator/0°, `+Z` equator/+90°E. All geographic objects share this frame.

### AD-005 — Pointer coordinates
Raycasting must derive NDC from `canvas.getBoundingClientRect()` in CSS pixels. DPR is renderer resolution only and must not be multiplied into pointer coordinates.

### AD-006 — `/docs` is generated output
Never hand-edit `/docs`; source must build and pass before generated output is committed.

## First unmet exit gate

A clean dependency installation and these commands still need to run against one exact rebuild commit:

```text
npm run typecheck
npm run lint
npm run test
npm run build
npm run build:pages
npm run verify:pages
npm run test:e2e
npm run test:visual
```

The seven resulting screenshots must then be inspected critically. Until that happens, Phase 0 remains open and the neutral globe must not be described as photorealistic or NASA-derived.

## Known gaps / next pass

1. Generate a clean lockfile and execute the complete command gate.
2. Fix compile/lint/browser defects discovered by that run.
3. Capture and inspect all seven required viewports, including controls and diagnostics states.
4. Generate `/docs` only from the passing source build.
5. Then begin Phase 1 with processed, locally committed NASA Blue Marble and Black Marble derivatives, asset checksums, UTC solar lighting and the first visually reviewed Earth shader.
