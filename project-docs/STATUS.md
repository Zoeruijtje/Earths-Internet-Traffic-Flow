# Project Status

**Project:** Earth’s Internet Traffic Flow  
**Working product title:** The Internet, Live  
**Last updated:** 2026-08-17  
**Stable state:** Planning baseline only  
**Production deployment:** Not configured  
**Implementation code:** Not started

## Current objective

Prepare a sufficiently exact implementation specification that future chat-based coding passes can build the project in controlled phases without inventing data, degrading visual fidelity, depending on exhausted GitHub Actions usage, or losing continuity between agents.

## Fixed constraints

- Public repository: `Zoeruijtje/Earths-Internet-Traffic-Flow`.
- Hosting target: GitHub Pages.
- No custom GitHub Actions workflow under the current constraint.
- Generated static build will be committed to `/docs` and served from `main` → `/docs`.
- No Git LFS.
- Real Internet data only; no fabricated live-looking demo events.
- Real satellite imagery for Earth, with source and attribution recorded.
- Desktop and mobile are both first-class targets.
- Every implementation pass must update logs and state its incomplete scope honestly.
- Major visual work requires browser screenshots and human visual inspection, not only automated assertions.

## Phase roadmap

| Phase | Name | Status | Exit gate summary |
|---|---|---:|---|
| 0 | Repository and engineering foundation | Not started | Local build, tests, linting, `/docs` output, source registry, no Actions |
| 1 | Photorealistic Earth and premium interface shell | Not started | “Wow” visual review passes desktop/mobile screenshots; no fake data |
| 2 | RIPE Atlas measured live layer | Not started | Genuine streamed measurements, truthful endpoint semantics, robust reconnect/replay |
| 3 | RIPE RIS routing layer | Not started | Live BGP events shown as routing—not traffic—with bounded performance |
| 4 | Infrastructure, outages, and satellite extensions | Not started | Each source legally/technically verified and independently toggleable |
| 5 | Interaction depth, sonification, sharing, and cinematic polish | Not started | Complete UX, accessibility, performance, failure-state, and visual QA gates |
| 6 | Release hardening and public launch | Not started | Production build, attribution, documentation, regression suite, Pages publication |

## Locked architectural decisions

### AD-001 — Static GitHub Pages deployment

Use a modern local build toolchain, but commit the generated static production site to `/docs`. GitHub Pages should publish `/docs` from `main`. Do not add a custom Actions workflow while the user’s Actions constraint remains active.

### AD-002 — Direct Three.js renderer

Use Three.js directly for the 3D scene and render loop. A component framework may manage the interface, but it must not own or re-render the scene for every incoming event. This preserves rendering control, pooling, shader precision, and high-volume stream performance.

### AD-003 — Truth-labelled layers

Every visible layer must expose one of these semantics in the UI: **MEASURED**, **OBSERVED**, **INFRASTRUCTURE**, **DERIVED VISUAL**, or **RECORDED**. An event can carry more than one label when appropriate, but the user must never be left to infer whether a line is a physical route.

### AD-004 — Known-coordinate endpoint rule

The default globe view may only anchor live arcs to locations with a defensible coordinate source. RIPE Atlas probe coordinates are approximate/obfuscated and must be described as such. Unknown or inferred traceroute-hop locations are not silently placed on Earth.

### AD-005 — Progressive Earth assets

Load a small real satellite texture first, then progressively replace it with higher-quality compressed textures based on device capability. Desktop may use an 8K-class derivative; mobile must normally use 2K/4K assets. Source imagery must not be committed at its original enormous resolution when an optimised derivative is sufficient.

### AD-006 — No simulated activity

The site may use real recorded responses as a labelled replay fallback. It may not create random points, fake counters, synthetic traffic, invented latency, or pseudo-live events to fill quiet periods.

### AD-007 — `/docs` is generated output

Human-authored documentation belongs in `/project-docs`. The `/docs` directory is reserved for production output and must never be manually edited.

## Known gaps / next pass

1. Scaffold the TypeScript/Vite project and local QA toolchain.
2. Produce the first photorealistic Earth vertical slice using verified NASA assets.
3. Establish compressed-texture asset processing and attribution records.
4. Implement correct globe-local marker/arc geometry with unit tests before connecting live data.
5. Establish browser screenshot capture and QA reporting at the required viewports.
6. Configure GitHub Pages manually to publish `main` → `/docs` after the first valid production build exists.

## Definition of the next successful checkpoint

The next checkpoint is **not** “the full Internet observatory.” It is a stable, tested Phase 0 + early Phase 1 release containing:

- a premium photorealistic Earth;
- correct camera, pointer, touch, resizing, and safe-area behaviour;
- real-time sun/terminator calculation;
- atmosphere, night-light, and post-processing shaders;
- a restrained premium UI shell with source-status placeholders that clearly say data is not connected yet;
- no fake live events;
- production output in `/docs`;
- desktop/mobile screenshot evidence and an updated implementation log.
