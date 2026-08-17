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
