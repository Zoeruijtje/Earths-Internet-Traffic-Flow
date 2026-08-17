# AGENTS.md — Mandatory Operating Rules

These rules apply to every AI agent, coding assistant, or future chat pass that reads or modifies this repository. They are not optional suggestions.

## 1. Start every pass by establishing reality

Before changing code:

1. Make a live GitHub tool call and verify access to `Zoeruijtje/Earths-Internet-Traffic-Flow`.
2. Inspect the default branch, recent commits, open pull requests, current files, and `project-docs/STATUS.md`.
3. Read this file, `MASTER_IMPLEMENTATION_PROMPT.md`, `project-docs/IMPLEMENTATION_LOG.md`, and `project-docs/SOURCE_REGISTRY.md`.
4. State the exact phase and bounded objective of the pass.
5. Do not claim that something exists, works, is deployed, or was tested without direct evidence.

## 2. Data truth is the highest product requirement

The site may only display:

- real measurement results;
- real observed routing/control-plane events;
- verified infrastructure records;
- or explicitly labelled visual derivations computed from those real records.

Never fabricate Internet events, routes, counters, traffic volumes, outages, locations, AS paths, latencies, packet rates, or timestamps to make the globe look busy.

Recorded fallback/replay data must come from genuine public source responses, retain its original source timestamp, and be labelled **RECORDED**, never **LIVE**.

### Mandatory terminology

- RIPE Atlas result: **measurement**.
- RIPE RIS message: **routing event**, **BGP announcement**, or **BGP withdrawal**.
- Great-circle line between known coordinates: **derived visual connection**, not physical cable route.
- PeeringDB/PCH record: **registered infrastructure**, not observed traffic.
- Estimated or uncertain location: display uncertainty; never silently present it as precise.

BGP data must never be described as byte traffic or packet flow. Traceroute hop IPs must not be placed at invented physical positions.

## 3. Visual quality gate

“Technically functional” is not enough. Do not keep a design merely because it is acceptable.

Every visual pass must be judged for:

- physical plausibility;
- Earth texture fidelity;
- atmosphere and terminator realism;
- correct depth, occlusion, scaling, and attachment of arcs and markers;
- alignment between pointer/touch input and selected objects;
- clean hierarchy and typography;
- absence of clipping, z-fighting, seams, stretched poles, layout overlap, and generic AI-dashboard styling;
- desktop, tablet, and phone quality.

When the result is only “okay,” continue refining within the current pass or record the failed gate explicitly. Do not describe it as polished.

## 4. Required implementation workflow

Use a focused branch for substantial implementation work when branch creation is possible. Suggested naming:

`build/phase-<number>-<short-description>`

A pass should produce a coherent vertical slice, not a pile of partially connected features.

Before publishing or opening a pull request:

1. run formatting and static analysis;
2. run unit tests;
3. run integration tests relevant to the change;
4. create a production build locally;
5. run browser/E2E tests;
6. inspect browser console and network failures;
7. take and inspect screenshots at the required viewports;
8. update the implementation log, status, source registry, and known limitations;
9. commit generated `/docs` output only after the source build passes.

Do not merge a major phase that fails its phase exit criteria. Do not hide missing work. Record it in `project-docs/STATUS.md` under **Known gaps / next pass**.

## 5. Logging requirements

`project-docs/IMPLEMENTATION_LOG.md` is append-only. Each pass must add:

- date and time in UTC;
- branch and commit/PR identifiers;
- objective;
- files or systems changed;
- source/API assumptions verified;
- commands and tests run with exact results;
- screenshots reviewed and viewports;
- defects found and fixed;
- unresolved defects or incomplete scope;
- next recommended action.

Never rewrite history to make a failed attempt disappear. Correct prior entries with a new dated note.

`project-docs/STATUS.md` must always reflect the actual current stable state.

## 6. GitHub Pages and build constraints

The user has exhausted normal GitHub Actions usage. Do not add or rely on a custom GitHub Actions workflow unless the user later explicitly changes this constraint.

Default deployment model:

- source code in the repository root and `/src`;
- locally generated production output in `/docs`;
- GitHub Pages configured to publish from `main` → `/docs`;
- `.nojekyll` included in `/docs`;
- no server-side runtime assumed.

Do not hand-edit generated files in `/docs`. Fix source, rebuild, retest, then replace `/docs`.

## 7. Asset and repository constraints

- Do not use Git LFS.
- Never commit a single normal Git object approaching GitHub’s 100 MB hard limit.
- Keep individual production assets preferably below 15 MB and normally below 5 MB.
- Keep the initial mobile transfer aggressively smaller than desktop assets.
- Do not commit raw 21,600 × 10,800 source imagery when an optimised derivative is sufficient.
- Document original source URL, creator/agency, acquisition date if applicable, licence/terms, processing, output dimensions, output size, and checksum.
- Add required attribution to the in-app source drawer and repository documentation.
- Never use a texture or dataset with unclear rights merely because it looks good.

## 8. Security and privacy

- Never place an API token, secret, private endpoint, or credential in client-side code, the repository, build output, screenshots, fixtures, or logs.
- Prefer anonymous public read APIs.
- Any future token-requiring source needs a separately approved proxy design.
- Do not collect personal user data or add analytics/tracking by default.
- Treat public probe locations as approximate/obfuscated and explain this in the UI.
- Sanitize all external strings before rendering.
- Validate streamed JSON at runtime and handle schema drift safely.

## 9. Performance discipline

The render loop and incoming data stream must be decoupled. Use bounded queues, pooling, coalescing, and adaptive quality. Never create an unbounded object, event, label, or DOM-node stream.

Required principles:

- no per-event permanent mesh allocation;
- no React/UI re-render for every network message;
- no full RIS firehose on mobile;
- no polling where a supported stream exists;
- exponential reconnect backoff with jitter;
- context-loss handling;
- pause rendering when the page is hidden;
- respect reduced-motion and battery-saving modes.

## 10. Testing evidence

A statement such as “responsive,” “mobile friendly,” “realistic,” or “working” requires evidence.

At minimum, major visual milestones must be reviewed at:

- 390 × 844 portrait;
- 844 × 390 landscape;
- 412 × 915 portrait;
- 768 × 1024 tablet;
- 1366 × 768 desktop;
- 1920 × 1080 desktop;
- 2560 × 1440 desktop.

Also test at multiple device-pixel ratios and with reduced motion. Screenshot inspection must include more than the landing frame: rotate Earth, zoom to the horizon, open panels, select markers/arcs, switch modes, pause/replay, and test failure/reconnect states.

## 11. Scope honesty

It is acceptable for a pass to implement only part of the roadmap. It is not acceptable to imply the rest is complete.

End each pass with three explicit sections:

- **Completed and verified**
- **Known limitations / not implemented**
- **Next highest-value pass**

## 12. Conflict rule

When a later user instruction conflicts with this file, follow the user’s latest explicit instruction and update this file and the decision log so future agents understand the change. Otherwise, these rules remain binding.
