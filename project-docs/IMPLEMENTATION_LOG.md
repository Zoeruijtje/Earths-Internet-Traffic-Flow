# Implementation Log

This is an append-only engineering, data, and visual-QA journal. Add a new dated entry for every meaningful implementation pass. Do not delete failed attempts; record corrections in a later entry.

---

## 2026-08-17 — Planning baseline established

**Time:** 2026-08-17 UTC  
**Repository:** `Zoeruijtje/Earths-Internet-Traffic-Flow`  
**Branch:** `main`  
**Objective:** Establish the master implementation specification, continuity rules, source-governance structure, phase roadmap, and deployment constraints before writing website code.

### Repository state inspected

- Confirmed live GitHub access to the repository.
- Confirmed the repository was public, writable, and completely empty.
- Confirmed the default branch was `main`.

### Files introduced

- `README.md`
- `AGENTS.md`
- `project-docs/STATUS.md`
- `project-docs/IMPLEMENTATION_LOG.md`
- `project-docs/SOURCE_REGISTRY.md`
- `MASTER_IMPLEMENTATION_PROMPT.md`

### Decisions made

- Work toward a static GitHub Pages deployment from `main` → `/docs`.
- Do not use a custom GitHub Actions workflow under the current usage constraint.
- Do not use Git LFS.
- Reserve `/docs` for locally generated production output and `/project-docs` for human-authored records.
- Use a direct Three.js scene renderer, with the UI framework kept outside the frame loop.
- Require explicit data-semantics labels: `MEASURED`, `OBSERVED`, `INFRASTRUCTURE`, `DERIVED VISUAL`, and `RECORDED`.
- Never fabricate activity to make the globe appear busy.
- Use real NASA Earth imagery and record attribution, processing, dimensions, file size, and checksum for every derivative.
- Treat mobile rendering and touch interaction as first-class acceptance criteria.
- Require screenshot-based visual review and explicit reporting of incomplete work.

### External technical facts verified for the plan

- RIPE Atlas provides a browser-accessible real-time streaming API for public results and supports result, metadata, and probe-status streams.
- RIPE Atlas probe public coordinates are deliberately obfuscated/offset and must not be presented as exact addresses.
- RIPE Atlas anchors provide stable, well-connected measurement sources and targets, including continuous anchor measurements.
- RIS Live provides filterable real-time BGP messages over WebSocket and can be filtered by collector, update type, announcements/withdrawals, peer, path, and prefix.
- BGP messages describe routing/control-plane observations, not byte traffic.
- NASA Blue Marble Next Generation provides high-resolution, cloud-free monthly global satellite composites.
- NASA Black Marble provides real night-light composites.
- NASA GIBS exposes public standards-based WMTS/WMS/TMS imagery services and supports time-varying near-real-time layers.
- Three.js supports WebGL2, custom `ShaderMaterial`, and KTX2 GPU-compressed textures through `KTX2Loader`.
- GitHub Pages can publish from a branch folder such as `/docs`; a custom workflow is not required for this project structure.
- GitHub Pages and normal Git repositories impose practical size constraints, supporting the decision to optimise imagery and avoid LFS.

### Tests run

No implementation code exists, so no build, unit, integration, E2E, performance, or visual tests were run.

### Screenshot review

Not applicable. No website exists yet.

### Honest limitations

- The visual design has been specified but not rendered.
- No source API has yet been connected from application code.
- No imagery has yet been downloaded, processed, committed, or visually inspected.
- No GitHub Pages deployment has been configured.
- No source licence/terms review should be treated as permanently complete; terms must be rechecked when a source is enabled and before public launch.

### Next recommended action

Execute Phase 0 and the Earth-only portion of Phase 1 from `MASTER_IMPLEMENTATION_PROMPT.md`. Do not connect live data until coordinate conversion, globe-local arc geometry, pointer alignment, responsive rendering, and screenshot QA are stable.

---

## 2026-08-17 — Phase 0 rebuild started after failed verification report

**Time:** 2026-08-17 15:05 UTC  
**Branch:** `build/phase-0-foundation-rebuild`  
**Commit/PR:** branch created from `main`; PR not opened yet  
**Objective:** Replace the prior CDN-dependent prototype with the mandated reproducible source scaffold and establish an auditable Phase 0 gate before any Phase 1 claim.

### Repository state inspected

- Live GitHub access confirmed.
- `main` remains the planning baseline.
- Existing `build/phase-0-1-earth-foundation` draft PR #1 remains open and unmerged.
- The user supplied an HTML execution-report screenshot showing `FileNotFoundError` for publication and browser review and explicitly stating that no screenshots were produced.
- The previous branch's `/docs/index.html` was verified to import Three.js from jsDelivr at runtime and to be manually authored rather than generated from the repository-mandated Vite source tree.

### Changes implemented

- Added `package.json` with pinned React, Three.js, Vite, TypeScript, Vitest, ESLint and Playwright dependencies and all required Phase 0 scripts.
- Added strict `tsconfig.json`.
- Added Vite configuration with relative production assets for GitHub Pages subpath safety.
- Added React entry point and a restrained responsive observatory shell.
- Added `EarthRenderer` using direct Three.js outside React's render cycle.
- Added hidden-page throttling, capped DPR, resize lifecycle, pointer rotation, wheel zoom, reduced-motion-aware rotation and full disposal.
- Defined the canonical Earth-local coordinate convention and added unit tests for cardinal coordinates, round trip, identical endpoints and antipodal great-circle interpolation.
- Added browser shell test and seven-viewport screenshot test harness.
- Added deterministic Pages build and verification scripts.
- Added `project-docs/ARCHITECTURE.md`.
- Updated `project-docs/STATUS.md` to report the actual open gate instead of claiming a completed implementation.

### Data/API assumptions verified

- No network source is connected by this branch.
- No random routes, pseudo-live counters, packets, BGP messages, outage signals or fake source timestamps are produced.
- The Phase 0 globe is intentionally a neutral renderer placeholder; it is **not** described as a photorealistic NASA Earth.
- Phase 1 remains blocked until actual NASA-derived assets are processed, attributed and visually reviewed.

### Commands and tests run

| Command/test | Result | Evidence/notes |
|---|---:|---|
| Live repository/branch/PR inspection | PASS | GitHub connector calls succeeded. |
| Source-tree audit | PASS | Rebuild branch contains the mandated initial source/test/build structure. |
| `npm install` / clean lockfile install | **NOT RUN** | This chat runtime does not currently expose an unrestricted local Node package-install execution environment tied to the GitHub branch. |
| `npm run typecheck` | **NOT RUN** | Must be executed against an exact installed commit. |
| `npm run lint` | **NOT RUN** | Same blocker. |
| `npm run test` | **NOT RUN** | Same blocker. |
| `npm run build` | **NOT RUN** | Same blocker. |
| `npm run build:pages` | **NOT RUN** | `/docs` deliberately not generated/committed without the source gate. |
| `npm run verify:pages` | **NOT RUN** | Depends on a valid generated build. |
| `npm run test:e2e` | **NOT RUN** | Browser runtime evidence not available yet. |
| `npm run test:visual` | **NOT RUN** | Screenshot harness exists, but no screenshots are claimed. |

### Screenshots reviewed

| Viewport | State/mode | Pass/fail | Defects found or notes |
|---|---|---:|---|
| User-supplied previous report | Failed execution report | **FAIL** | Publication/browser-review `FileNotFoundError`; report states no screenshots were produced. |
| 390 × 844 | Rebuild | NOT RUN | Harness added; no screenshot claim. |
| 844 × 390 | Rebuild | NOT RUN | Harness added; no screenshot claim. |
| 412 × 915 | Rebuild | NOT RUN | Harness added; no screenshot claim. |
| 768 × 1024 | Rebuild | NOT RUN | Harness added; no screenshot claim. |
| 1366 × 768 | Rebuild | NOT RUN | Harness added; no screenshot claim. |
| 1920 × 1080 | Rebuild | NOT RUN | Harness added; no screenshot claim. |
| 2560 × 1440 | Rebuild | NOT RUN | Harness added; no screenshot claim. |

### Defects found and fixed

- Corrected process-level status: a failed `FileNotFoundError` report is no longer represented as browser/screenshot evidence.
- Replaced the architectural direction of the CDN prototype with a bundled dependency scaffold.
- Established a documented coordinate basis instead of an ad hoc globe basis.
- Added a generated-output workflow so future `/docs` content is not hand-authored.
- Added actual test files and screenshot harnesses instead of relying on claimed but missing evidence.

### Completed and verified

- GitHub branch creation and repository write access.
- Presence of the Phase 0 source, test, build and architecture scaffold in GitHub.
- Explicit disconnected/no-fake-data product state in source.
- Canonical Earth-local coordinate implementation and its intended unit-test coverage.

### Known limitations / not implemented

- The Phase 0 exit gate is not passed because package installation, typecheck, lint, unit tests, build, browser tests and screenshot generation have not been executed against the exact branch commit.
- No `package-lock.json` has been generated yet.
- `/docs` has not been generated from source on this rebuild branch.
- No NASA Earth textures are enabled yet.
- No visual claim such as “photorealistic,” “polished,” or “mobile verified” is made for this branch.
- No live or recorded Internet-data adapter is implemented.

### Next highest-value pass

Run the complete clean-install Phase 0 command gate in a package-capable browser/test environment, fix every compile/lint/runtime defect, generate and inspect the seven mandatory screenshots, then commit the resulting lockfile and generated `/docs`. Only after that should Phase 1 begin with processed NASA Blue Marble and Black Marble derivatives.

---

## Entry template for future passes

### YYYY-MM-DD — Short pass title

**Time:** UTC  
**Branch:**  
**Commit/PR:**  
**Objective:**

#### Repository state inspected

#### Changes implemented

#### Data/API assumptions verified

#### Commands and tests run

| Command/test | Result | Evidence/notes |
|---|---:|---|
|  |  |  |

#### Screenshots reviewed

| Viewport | State/mode | Pass/fail | Defects found or notes |
|---|---|---:|---|
| 390 × 844 |  |  |  |
| 844 × 390 |  |  |  |
| 412 × 915 |  |  |  |
| 768 × 1024 |  |  |  |
| 1366 × 768 |  |  |  |
| 1920 × 1080 |  |  |  |
| 2560 × 1440 |  |  |  |

#### Defects found and fixed

#### Completed and verified

#### Known limitations / not implemented

#### Next highest-value pass
