# Project Status

**Project:** Earth’s Internet Traffic Flow  
**Working product title:** The Internet, Live  
**Last updated:** 2026-08-17  
**Stable state:** Phase 0 rebuild in progress on `build/phase-0-foundation-rebuild`  
**Production deployment:** Not configured  
**Implementation code:** Source scaffold now exists; exit gate not yet passed

## Current objective

Replace the previous CDN-dependent static prototype with the repository-mandated Vite + React + strict TypeScript application, direct Three.js lifecycle, deterministic local QA commands, nested-path-safe Pages build tooling, and a truthful no-data interface shell. Phase 1 photorealistic Earth work remains blocked until the Phase 0 commands can be executed against the exact branch commit and reviewed with real screenshots.

## Fixed constraints

- Public repository: `Zoeruijtje/Earths-Internet-Traffic-Flow`.
- Hosting target: GitHub Pages.
- No custom GitHub Actions workflow under the current constraint.
- Generated static build must be committed to `/docs` and eventually served from `main` → `/docs`.
- No Git LFS.
- Real Internet data only; no fabricated live-looking demo events.
- Real satellite imagery for Earth, with source and attribution recorded before Phase 1 is accepted.
- Desktop and mobile are both first-class targets.
- Every implementation pass must update logs and state incomplete scope honestly.
- Major visual work requires actual browser screenshots and visual inspection, not only assertions.

## Phase roadmap

| Phase | Name | Status | Exit gate summary |
|---|---|---:|---|
| 0 | Repository and engineering foundation | **In progress — source scaffold implemented, runtime gate pending** | Clean install, typecheck/lint/unit/browser/build/Pages verification, screenshot review |
| 1 | Photorealistic Earth and premium interface shell | Not started on the rebuild branch | NASA-derived assets, Earth visual QA, geometry/input gate |
| 2 | RIPE Atlas measured live layer | Not started | Genuine streamed measurements, truthful endpoint semantics, robust reconnect/replay |
| 3 | RIPE RIS routing layer | Not started | Live BGP events shown as routing—not traffic—with bounded performance |
| 4 | Infrastructure, outages, and satellite extensions | Not started | Each source legally/technically verified and independently toggleable |
| 5 | Interaction depth, sonification, sharing, and cinematic polish | Not started | Complete UX, accessibility, performance, failure-state, and visual QA gates |
| 6 | Release hardening and public launch | Not started | Production build, attribution, documentation, regression suite, Pages publication |

## Implemented on the rebuild branch

- `package.json` with pinned React, Three.js, Vite, TypeScript, Vitest, ESLint and Playwright dependencies.
- Strict TypeScript configuration with `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`.
- React application shell with an explicit `DATA NOT CONNECTED` state.
- Direct Three.js `EarthRenderer` lifecycle outside React's frame loop.
- Bounded resize/DPR handling, pointer rotation, wheel zoom, reduced-motion-aware auto rotation, hidden-page render suppression and renderer disposal.
- One documented Earth-local coordinate convention and unit tests for cardinal positions, round trip and antipodal great-circle interpolation.
- Responsive desktop, portrait phone/tablet and landscape-phone shell CSS.
- Playwright shell test and seven-viewport screenshot harness.
- Deterministic `build:pages` and `verify:pages` scripts; Vite uses relative asset URLs for the Pages repository subpath.
- Architecture documentation.

## Important correction from the previous pass

The HTML report shown by the user on 2026-08-17 contains `FileNotFoundError` for publication/browser-review evidence and states that no screenshots were produced. Those results are a failed verification attempt. They are not evidence that the prior branch passed Phase 0 or Phase 1.

The previous `build/phase-0-1-earth-foundation` branch also contains a manually authored `/docs/index.html` that imports Three.js from a public CDN. It is therefore not being promoted as the source of truth for the rebuild.

## Locked architectural decisions

### AD-001 — Static GitHub Pages deployment

Use a modern local build toolchain, but commit generated static production output to `/docs`. GitHub Pages should ultimately publish `/docs` from `main`. Do not add a custom Actions workflow while the user’s Actions constraint remains active.

### AD-002 — Direct Three.js renderer

Use Three.js directly for the 3D scene and render loop. React owns low-frequency UI composition only.

### AD-003 — Truth-labelled layers

Every future visible data layer must expose **MEASURED**, **OBSERVED**, **INFRASTRUCTURE**, **DERIVED VISUAL**, or **RECORDED** semantics. Phase 0 intentionally displays no Internet events.

### AD-004 — Earth-local coordinate convention

Current implementation convention:

- `+Y` = geographic north pole;
- `+X` = equator / longitude `0°`;
- `+Z` = equator / longitude `+90°E`.

All geographic scene content must share the same Earth-local group.

### AD-005 — `/docs` is generated output

Human-authored documentation belongs in `/project-docs`. `/docs` must only be produced by `npm run build:pages`; do not hand-edit it.

## First unmet exit gate

A clean dependency installation and the following commands must be executed against one exact rebuild commit:

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

The resulting seven screenshots must then be inspected, not merely generated. Until that happens, Phase 0 remains open and `/docs` should not be committed as a purported verified production build.

## Known gaps / next pass

1. Produce and commit a lockfile from a clean package install.
2. Run the complete Phase 0 command gate against the exact commit and fix every failure.
3. Generate the seven viewport screenshots and visually inspect composition, clipping, text size, safe areas and WebGL runtime errors.
4. Only after the Phase 0 gate passes, begin Phase 1 with locally committed, processed NASA Blue Marble / Black Marble derivatives and complete asset provenance/checksums.
5. Do not connect RIPE Atlas or any other live data merely to make the interface look active.
