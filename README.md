# Earth’s Internet Traffic Flow

**Working product title:** **The Internet, Live**  
**Repository status:** Planning baseline; implementation has not started.

This project will become a high-fidelity, mobile-capable, real-time 3D observatory for the publicly observable Internet. It will combine a photorealistic Earth with live Internet measurements, live routing events, verified infrastructure data, and later near-real-time satellite and outage layers.

The project has one overriding rule:

> **Never fabricate Internet activity. Every displayed event must be measured, observed, registered infrastructure, or an explicitly labelled mathematical visualization derived from real source data.**

## Planned core experiences

- A cinematic, physically plausible Earth rendered with real NASA satellite imagery.
- Live RIPE Atlas measurements with inspectable timestamps, latency, hop counts, measurement IDs, and source metadata.
- Live RIPE RIS BGP announcements and withdrawals displayed as routing events—not falsely presented as packet traffic.
- A time lens for pausing, inspecting, and replaying a rolling buffer of real observations.
- Verified Internet infrastructure layers, such as RIPE Atlas anchors and Internet exchange points.
- Optional later layers for IODA outage observations and NASA GIBS near-real-time imagery.
- A responsive mobile interface with touch-first interaction and adaptive rendering quality.

## Important truth distinction

A geographically drawn arc does **not** automatically represent a physical fibre or submarine-cable path. The finished UI must clearly distinguish:

- **MEASURED** — direct measurement results, such as RIPE Atlas latency or traceroute data;
- **OBSERVED** — externally observed control-plane events, such as BGP updates;
- **INFRASTRUCTURE** — registered or verified facilities and measurement nodes;
- **DERIVED VISUAL** — a mathematical visual connection between known endpoints, not a claim about the exact physical path.

## Planning documents

- [`MASTER_IMPLEMENTATION_PROMPT.md`](MASTER_IMPLEMENTATION_PROMPT.md) — the complete build specification and execution prompt.
- [`AGENTS.md`](AGENTS.md) — mandatory operating rules for every coding agent or future chat pass.
- [`project-docs/STATUS.md`](project-docs/STATUS.md) — phase status, decisions, constraints, and current next step.
- [`project-docs/IMPLEMENTATION_LOG.md`](project-docs/IMPLEMENTATION_LOG.md) — append-only implementation and QA journal.
- [`project-docs/SOURCE_REGISTRY.md`](project-docs/SOURCE_REGISTRY.md) — source semantics, access constraints, licences, and attribution requirements.

## Hosting constraint

The production site is intended for GitHub Pages without a custom GitHub Actions workflow. The planned implementation will:

1. build locally during an interactive development pass;
2. commit the generated static site to `/docs`;
3. publish from `main` → `/docs` using GitHub Pages branch deployment.

The `/docs` folder is therefore reserved for generated production output. Human-authored project documentation belongs in `/project-docs`.

## Asset policy

- Do not use Git LFS.
- Do not commit oversized source imagery.
- Store only web-optimised, legally reusable assets with documented origin, attribution, processing steps, and checksums.
- Use progressive texture quality so mobile devices do not download desktop-grade assets unnecessarily.

## Current state

No website code, fabricated demo data, deployment workflow, or unverified asset has been added yet. The next implementation pass should begin with Phase 0 and Phase 1 in the master prompt: engineering foundation followed by the photorealistic Earth and visual QA gate.
