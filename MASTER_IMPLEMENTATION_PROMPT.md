# Master Implementation Prompt — Earth’s Internet Traffic Flow

**Version:** 1.0  
**Prepared:** 2026-08-17  
**Target repository:** `Zoeruijtje/Earths-Internet-Traffic-Flow`  
**Working product title:** **The Internet, Live**  
**Purpose:** Governing implementation plan and executable prompt for future chat-based development passes.

---

# BEGIN MASTER PROMPT

You are the lead implementation team for `Zoeruijtje/Earths-Internet-Traffic-Flow`. Act as a coordinated group consisting of:

- a senior real-time WebGL/Three.js graphics engineer;
- a shader and physically based visualisation specialist;
- an Internet measurement researcher familiar with RIPE Atlas, traceroute, BGP, autonomous systems, IXPs, and observational uncertainty;
- a senior TypeScript/front-end architect;
- an interaction and mobile UX designer;
- a data-streaming and performance engineer;
- an accessibility engineer;
- a test automation and visual-QA engineer;
- and a sceptical technical product lead who refuses to describe mediocre work as polished.

Do not merely discuss or propose code. When this prompt is used for an implementation pass, inspect the live repository, implement a bounded phase, run the relevant tests, inspect screenshots yourself, update the repository documentation, and report exactly what is and is not complete.

The complete project may require multiple passes. That is acceptable. Rushing every planned feature into one unstable pass is not acceptable. Each pass must leave a coherent, tested, documented, runnable state.

---

## 1. Mission

Build a unique, cinematic, scientifically honest, real-time 3D observatory that lets a user watch the publicly observable Internet operate around a photorealistic Earth.

The finished experience should make a technically informed visitor say:

> “This is beautiful, but more importantly, I can inspect what each line actually means, where it was observed, when it occurred, and what the data does not prove.”

The experience must combine:

1. a genuinely high-quality Earth rendered from real satellite imagery;
2. real streamed Internet measurements and routing observations;
3. a clear distinction between measured endpoints, routing/control-plane events, registered infrastructure, mathematical visual derivations, and recorded replay data;
4. premium, custom interaction design rather than a generic AI-generated dashboard;
5. desktop and phone usability;
6. robust failure, stale-data, reconnect, and low-performance behaviour;
7. source attribution and data limitations that are visible without ruining the visual experience.

The site must not pretend to display every packet or the complete global Internet traffic matrix. It should present **everything publicly observable that is defensibly supported by enabled sources**, with coverage and blind spots exposed.

---

## 2. Read-first operating procedure

Before editing anything:

1. Make a live GitHub tool call and verify access to the target repository.
2. Inspect the repository tree, default branch, recent commits, open pull requests, and current deployment files.
3. Read `AGENTS.md`, this file, `project-docs/STATUS.md`, `project-docs/IMPLEMENTATION_LOG.md`, and `project-docs/SOURCE_REGISTRY.md`.
4. Identify the current stable phase and the next unmet exit gate.
5. State the bounded objective for the current pass.
6. Check whether relevant source APIs, documentation, authentication requirements, or usage terms have changed since the registry review date.
7. Do not ask the user to repeat information already present in the repository or current conversation.
8. Do not claim success based on code inspection alone when the feature requires runtime, browser, data, or visual evidence.

For substantial changes, work in a focused branch such as:

`build/phase-1-photoreal-earth`

Keep commits coherent. Open a pull request when appropriate. Do not merge a phase that fails its exit criteria.

---

## 3. Non-negotiable requirements

### 3.1 Real data only

Never fabricate live-looking Internet events, routes, traffic volumes, packet counts, timestamps, AS paths, outages, geolocations, latencies, or counters.

Allowed:

- genuine live public API/stream responses;
- genuine recorded public responses, clearly labelled `RECORDED` with original timestamps;
- registered infrastructure records, clearly labelled `INFRASTRUCTURE`;
- mathematical visualisations derived from real endpoints, clearly labelled `DERIVED VISUAL`;
- geometry-only test values that never appear as purported live data in production.

Not allowed:

- random arcs to make the globe busy;
- placeholder counters that resemble live totals;
- fake “events per second”;
- fake country-to-country byte flows;
- invented traceroute-hop locations;
- pseudo-live replay without the recorded date/time prominently available;
- silent switching from live data to fabricated data when a source disconnects.

### 3.2 Semantics must be visible

Use these exact conceptual labels throughout the product:

- **MEASURED** — direct active measurement result;
- **OBSERVED** — control-plane or externally observed event;
- **INFRASTRUCTURE** — registered/verified node or facility;
- **DERIVED VISUAL** — a visual relationship calculated from real records but not directly measured as a physical path;
- **RECORDED** — a genuine historical source response replayed locally.

The user must be able to open a compact “Why this is shown” explanation for every layer.

### 3.3 BGP is not traffic

RIPE RIS BGP messages must be described as routing announcements, withdrawals, path observations, or control-plane events. They are not byte traffic or packet flows.

Never label a BGP animation “traffic from A to B.”

### 3.4 Geographic lines are not automatically physical routes

A great-circle arc between known endpoints is a visual connection. Unless a separately verified physical path dataset directly supports the geometry, label it as a derived visual and state that the exact fibre/cable path is not measured.

Traceroute IP hops do not automatically have reliable geographic coordinates. Unknown hops belong in the inspector’s logical hop ladder, not at guessed positions on Earth.

### 3.5 Visual quality must be exceptional

Do not keep a visual result because it is merely functional or “pretty good.” The Earth, interface, motion, typography, spacing, input alignment, depth, and mobile composition must survive critical screenshot review.

Avoid the recognisable generic AI-dashboard look:

- no wall of floating rounded glass cards;
- no arbitrary purple/blue gradient background;
- no excessive pills;
- no giant marketing headline covering the globe;
- no meaningless sparkles or fake telemetry;
- no bloated sidebar of repetitive toggles;
- no over-bloomed neon atmosphere;
- no UI kit left at default styling.

The result should feel like a premium scientific observatory, broadcast graphics system, and modern interactive product—not a template.

### 3.6 Phone support is first-class

The core experience must work on a modern phone in portrait and landscape. Touch controls, bottom sheets, safe-area insets, dynamic viewport height, GPU/memory limits, orientation changes, and reduced information density must be deliberately designed.

Desktop-only controls followed by a late responsive patch are not acceptable.

### 3.7 Evidence and logging are mandatory

Every pass must update the append-only implementation log and current status. Major visual claims require screenshots at the required viewports. Every incomplete feature must be recorded for the next pass.

### 3.8 Current hosting constraints

- Host on GitHub Pages.
- Do not add or depend on a custom GitHub Actions workflow under the current constraint.
- Build locally during the interactive pass.
- Commit generated production output to `/docs`.
- Configure Pages to publish from `main` → `/docs`.
- Do not use Git LFS.
- Do not expose client-side secrets.

---

## 4. Product concept and experience hierarchy

The product is not primarily a dashboard. The globe is the application’s central spatial instrument.

### 4.1 First-load experience

The first meaningful frame should arrive quickly:

1. A low-resolution but genuine satellite Earth appears immediately.
2. The real astronomical sunlight/terminator becomes visible.
3. Atmosphere and restrained star background resolve.
4. A compact source-health strip reports `CONNECTING`, not fake activity.
5. Higher-resolution textures progressively replace the initial surface when capability and bandwidth allow.
6. Real events appear only after the corresponding source confirms a connection and valid messages are parsed.

Never hide a long load behind an artificial percentage that is not connected to actual asset/network progress.

### 4.2 Primary user questions

The interface should answer:

- What happened?
- When did it happen?
- Which source observed or measured it?
- Where are the known endpoints or observer locations?
- What is approximate, inferred, or unknown?
- What does the event mean technically?
- What does it **not** prove?
- Is the source currently live, stale, reconnecting, or replaying recorded data?

### 4.3 Core modes

The architecture must support these independently toggleable modes. Implement them in phases; do not fake unavailable modes.

#### Mode A — Live Measurements

Primary source: RIPE Atlas.

Show real ping/traceroute/DNS/TLS/HTTP measurement observations only when the selected measurement type and endpoint semantics can be represented honestly.

Recommended default visual:

- source marker at approximate probe/anchor coordinate;
- target marker only where target coordinate is defensible;
- derived great-circle connection;
- one or more moving pulses representing the occurrence of the measurement, not packets;
- inspector with RTT, timestamp, probe ID, measurement ID, address family, target, protocol, hop count, completion status, and source links/attribution.

The pulse animation is a temporal visual metaphor for the measurement event. State this in the legend; do not call individual pulses packets.

#### Mode B — Routing Pulse

Primary source: RIPE RIS Live.

Render BGP control-plane observations with a visual language distinct from Atlas measurements. Preferred concept:

- a subtle orbital/routing halo around Earth;
- route collectors as known observer nodes;
- origin AS/network entities arranged in a logical constellation or tied to approximate registered geography only when defensible;
- announcements, withdrawals, path changes, and peer-state events with different motion signatures;
- an always-visible `LOGICAL ROUTING VIEW` semantic cue.

Do not draw a routing announcement as if it followed a physical path across the surface.

#### Mode C — Internet Infrastructure

Potential sources: RIPE Atlas anchors, PeeringDB, PCH after terms approval.

Show verified/registered:

- RIPE Atlas anchors;
- measurement probes at an appropriate aggregate zoom;
- Internet exchange points;
- facilities or network presence where source quality supports it.

Infrastructure markers indicate presence, not current traffic.

#### Mode D — Outage Signals

Potential source: IODA after API/terms verification.

Show near-real-time outage/connectivity signals with clear analytical uncertainty. Never infer cause, censorship intent, or affected population from an outage alert alone.

#### Mode E — Satellite Observation

Potential source: NASA GIBS.

Allow an optional near-real-time imagery layer with exact dataset/layer/date/time and coverage status. Current-day gaps must remain gaps; never fill missing acquisitions with fake current imagery.

### 4.4 Time Lens

Maintain a bounded rolling buffer of real events, initially 60–120 seconds depending on performance.

Controls:

- `LIVE` follow mode;
- pause/freeze;
- scrub within retained buffer;
- resume live;
- inspect a frozen event without losing incoming data, subject to bounded memory;
- optional replay of a recorded real session when offline.

A paused live buffer and a recorded historical session must look different and display different labels.

### 4.5 Source Health Drawer

For each source show:

- source name;
- semantic class;
- connection status;
- last valid source timestamp;
- browser receipt time;
- estimated data lag;
- active filters/subscriptions;
- dropped/coalesced message count;
- coverage explanation;
- attribution;
- terms-review date;
- whether the layer is live, stale, or recorded.

This drawer is a core trust feature, not an afterthought.

---

## 5. Visual design direction

### 5.1 Overall character

Aim for an **orbital network observatory**: calm, precise, cinematic, information-dense only when requested.

The default frame should be mostly Earth and space. Interface chrome should feel engineered into the viewport rather than scattered on top.

Use:

- deep neutral space tones;
- restrained cool highlights for live measurements;
- carefully differentiated routing/withdrawal/alert colours with accessible contrast;
- thin but readable rules and telemetry typography;
- deliberate asymmetry and edge-aligned instrument panels;
- compact data labels;
- subtle grain/dither only if it improves rendering and does not muddy text;
- purposeful transitions derived from user or data events.

Do not let every component glow. Contrast and hierarchy are stronger when emphasis is rare.

### 5.2 Typography

Use a high-quality system-first sans-serif stack and a system monospace stack unless a legally reusable, performance-appropriate font solution is deliberately selected and documented.

Typography rules:

- body text remains readable on a phone;
- numbers use tabular figures;
- units and timestamps align consistently;
- uppercase is reserved for short telemetry labels, not paragraphs;
- no excessive letter spacing;
- no tiny 10 px text used to cram content into panels;
- use plain technical language, not dramatic pseudo-science.

### 5.3 Desktop composition

Recommended layout:

- full-viewport WebGL canvas;
- narrow left mode rail integrated with viewport edge;
- top source/time/status strip;
- contextual right inspector that can collapse completely;
- bottom time lens with minimal height until expanded;
- small attribution/source control accessible without obscuring the globe;
- selected object linked visually to its inspector without a large floating card over the Earth.

Panels must not cover the region the user is actively inspecting. When the inspector opens, subtly shift the camera target or viewport framing rather than hiding the selected event.

### 5.4 Mobile composition

Recommended layout:

- canvas remains the full visual background;
- compact top bar: product mark, live status, current mode, source health;
- bottom navigation for major modes;
- draggable bottom sheet for event details and filters;
- sheet snap points that preserve enough globe visibility;
- controls respect `env(safe-area-inset-*)`;
- one-finger orbit, two-finger pinch zoom, double-tap focus/reset;
- dragging a panel must never rotate the globe underneath;
- tap targets at least approximately 44 × 44 CSS px;
- phone landscape gets a reduced side inspector rather than a tall bottom sheet.

### 5.5 Motion language

Motion should communicate state:

- connection established: restrained source indicator transition;
- measurement event: pulse travels once and decays;
- BGP announcement: outward logical propagation/ripple;
- withdrawal: contraction/fade, not a red explosion;
- selection: camera eases and event remains legible;
- stale source: motion reduces and status changes;
- reconnect: source indicator, not whole-screen loading animation;
- mode switch: layers cross-fade and camera remains spatially stable.

Respect `prefers-reduced-motion`. In reduced-motion mode, replace long paths/pulses with state changes and short fades while retaining all information.

### 5.6 Optional sonification

A later phase may map real events to restrained procedural audio:

- RTT or path length influences pitch/decay;
- announcement and withdrawal use distinct timbres;
- event density controls texture within strict limits.

Audio must be off by default, explicitly user-enabled, volume-limited, and accessible. It must not imply a packet sound for each BGP event.

---

## 6. Photorealistic Earth specification

The Earth is the visual quality anchor. Do not connect enough live data to distract from an Earth that has not passed its own quality gate.

### 6.1 Rendering architecture

Use Three.js directly with `WebGLRenderer` and WebGL2 as the stable primary renderer. Keep the scene/render loop outside React component re-rendering.

Use current stable versions at implementation time and pin them in the lockfile. Do not rely on an experimental renderer for the primary release without a proven fallback.

Recommended rendering structure:

```text
SceneRoot
├── StarBackground
├── SunLight / solar uniforms
├── EarthSystem (rotates as one local group)
│   ├── SurfaceSphere
│   ├── NightEmission contribution
│   ├── CloudLayer (only real-source mode when approved)
│   ├── AtmosphereInner
│   ├── AtmosphereOuter
│   ├── Geographic markers
│   ├── Measurement arcs
│   └── Selection overlays
├── RoutingHalo (logical, visually separated)
└── PostProcessing
```

All geographic markers and measured endpoint arcs must be children of the same Earth-local coordinate system so they rotate, orient, and scale consistently with Earth.

### 6.2 Surface imagery

Baseline source: a verified NASA Blue Marble: Next Generation monthly cloud-free satellite composite.

Required variants:

- fast placeholder: approximately 2K equirectangular;
- mobile standard: approximately 4K when supported;
- desktop high: approximately 8K when supported;
- never force 8K on low-memory devices.

Use KTX2/Basis Universal GPU-compressed textures when practical, with correct mipmaps and `KTX2Loader.detectSupport(renderer)`. Provide a widely compatible fallback asset if transcoding fails.

Record:

- exact source page and asset;
- acquisition/composite month;
- creator/agency/instrument attribution;
- original and output dimensions;
- processing commands;
- colour-space changes;
- file sizes;
- SHA-256 checksums.

Do not over-saturate. Oceans should not look like luminous blue plastic. Snow, deserts, tropical forests, shallow seas, and polar regions should retain detail without crushed blacks or clipped highlights.

### 6.3 Lighting and colour management

- Use correct sRGB colour-space handling for colour textures.
- Use linear-space lighting calculations.
- Use physically plausible tone mapping such as ACES Filmic only after visually comparing it against neutral output.
- Calculate sun direction from UTC using a validated astronomical algorithm.
- Orient the terminator correctly for date/time and Earth orientation.
- Avoid baked-lighting conflicts: if a source texture contains topographic shading, account for it when adding dynamic light.
- The night-side must retain dim surface detail rather than becoming a featureless black cutout.

### 6.4 Night lights

Use a verified NASA Black Marble/night-light composite.

Night emission must be multiplied by a smooth night-side/terminator mask. It must not glow at full intensity on the day side.

Bloom rules:

- selective bloom only;
- prevent large halos around ordinary cities;
- retain recognisable settlement patterns;
- cap intensity near densely lit regions;
- verify at multiple zoom levels.

Always display the night-light data year in the source information. Do not describe it as current electricity use.

### 6.5 Ocean response

Create or source a defensible land/ocean mask. Add restrained ocean specular response and sun glint:

- rough, broad highlights—not a mirror sphere;
- specular response only over water;
- no glint visible through the night side;
- highlight moves correctly with sun/camera geometry;
- avoid turning all coasts into bright outlines.

### 6.6 Topographic detail

Use a low-amplitude, verified elevation-derived normal/bump contribution only after source rights are documented.

Do not geometrically exaggerate mountains at planetary scale. A subtle normal effect is acceptable; obvious spikes are not.

### 6.7 Atmosphere

Implement a custom atmosphere shader or a carefully validated two-shell approximation with:

- view-angle Fresnel/rim response;
- sunlight dependence;
- stronger forward scattering near the sun-facing limb;
- restrained Rayleigh-like blue scattering;
- subtle warm Mie-like sunset rim near the terminator;
- reduced glow on the night-side far limb;
- correct depth and additive blending behaviour;
- no hard sphere edge or thick neon outline.

The atmosphere must be tested at close horizon zoom and from a distant full-globe view.

### 6.8 Clouds

Do not use a randomly generated moving cloud layer while presenting the visual as real/current.

Acceptable options:

1. baseline release has no independent cloud layer because Blue Marble is intentionally cloud-free;
2. a historical real cloud composite is offered and labelled with its date/source;
3. a NASA GIBS near-real-time layer is implemented later with exact acquisition time and gap handling.

If a historical real cloud texture is used decoratively, do not rotate it at an arbitrary high speed. Any motion must be clearly described as visual interpolation, not live weather.

### 6.9 Star background

Prefer a real, reusable all-sky/star panorama with recorded source/rights. If a procedural fallback is used, label it as decorative and keep it physically plausible:

- no giant saturated fantasy nebula directly behind Earth;
- star density varies subtly;
- bright stars are sparse;
- background does not rotate with Earth;
- no parallax that implies nearby particles unless explicitly designed.

### 6.10 Geometry orientation and texture seams

Explicitly test:

- longitude/latitude conversion at the equator, poles, prime meridian, and antimeridian;
- texture orientation relative to known coastlines;
- pole stretching;
- antimeridian seam;
- marker position over Amsterdam, Tokyo, Sydney, New York, and a Southern Hemisphere location;
- Earth axial orientation;
- camera reset orientation.

Never “fix” a texture orientation by randomly flipping axes until it looks close. Establish and document one coordinate convention.

### 6.11 Camera and controls

Use orbit-style controls with custom constraints and damping.

Requirements:

- no camera roll during normal interaction;
- sensible minimum distance that does not clip into atmosphere;
- maximum distance that preserves Earth visibility;
- smooth focus on selected event;
- camera target adjusts when inspector occupies viewport space;
- auto-rotation pauses immediately on user interaction;
- cinematic rotation is subtle and can be disabled;
- controls continue working after resize/orientation change;
- no stationary geographic overlays when Earth rotates.

### 6.12 Pointer and touch accuracy

Calculate normalized device coordinates from the canvas’s actual `getBoundingClientRect()`, not the full window. Account for device-pixel ratio only where required by renderer resolution; do not double-apply DPR.

Test selection accuracy after:

- resizing;
- changing DPR;
- opening/closing inspector;
- mobile browser toolbar changes;
- orientation change;
- canvas offset changes;
- pinch zoom;
- CSS transforms, which should generally be avoided on the canvas container.

A selected geographic point must appear under the pointer/tap, not shifted vertically or horizontally.

---

## 7. Arc, marker, and label correctness

### 7.1 Coordinate conversion

Create one tested utility converting WGS84-style latitude/longitude to Earth-local Cartesian coordinates. Document axis orientation and texture longitude convention.

Unit-test known positions and round-trip conversion within a defined tolerance.

### 7.2 Great-circle visual connections

Use spherical interpolation/great-circle geometry between endpoints.

Requirements:

- shortest-path handling across the antimeridian;
- stable handling of identical and nearly antipodal points;
- endpoints exactly meet marker positions;
- every intermediate point remains outside the Earth radius by a safe epsilon;
- arc height is derived from angular distance with sensible min/max limits;
- arc never passes through Earth;
- back-side portions are naturally occluded by depth;
- no horizon popping or z-fighting;
- curve segments adapt to distance/quality.

The line is a `DERIVED VISUAL` unless physical path data independently proves otherwise.

### 7.3 Screen-space line quality

Do not rely on native WebGL line width; it is effectively one pixel in common WebGL implementations.

Use a tested screen-space wide-line/ribbon approach such as Three.js `Line2`/`LineMaterial` or a custom mesh strip.

Requirements:

- update material resolution on every resize;
- line thickness remains readable but restrained across zoom levels;
- high-DPR phones do not produce hairlines or giant strokes;
- selected line has a controlled emphasis state;
- inactive lines fade rather than vanish abruptly;
- dash/pulse movement remains stable independent of frame rate.

### 7.4 Markers

Use pooled instanced markers or a similarly bounded implementation.

Markers must:

- remain attached to Earth-local coordinates;
- sit slightly above the surface without floating visibly at close zoom;
- scale within screen-space min/max limits;
- hide or fade on the back side;
- distinguish approximate coordinates;
- provide a larger invisible hit target than the visible dot;
- avoid thousands of DOM elements.

### 7.5 Labels

Use a bounded label system:

- only selected, hovered, or high-priority items get full labels;
- project world points to screen each frame only for the bounded active set;
- hide labels behind Earth using normal/camera tests and depth logic;
- prevent overlap with simple collision/priority rules;
- use leader lines sparingly;
- keep labels inside safe viewport margins;
- mobile default shows fewer labels.

---

## 8. Data architecture

### 8.1 Core principle

Incoming network messages must never directly create scene objects or trigger high-frequency React renders.

Use this pipeline:

```text
External stream/API
    ↓
Source adapter
    ↓ runtime schema validation
Normalised event model
    ↓
Web Worker / parser / enrichment
    ↓
Bounded ring buffer + coalescing + priorities
    ↓
Render-event scheduler
    ↓
Pooled Three.js visual objects
```

Low-frequency UI state may use React state/context. High-frequency stream and render state must use an external store/event bus with batched snapshots.

### 8.2 Normalised event model

Define a discriminated TypeScript model with fields such as:

```ts
interface BaseObservation {
  id: string;
  source: 'ripe-atlas' | 'ris-live' | 'ioda' | 'peeringdb' | 'pch' | 'nasa-gibs';
  semantics: Array<'MEASURED' | 'OBSERVED' | 'INFRASTRUCTURE' | 'DERIVED_VISUAL' | 'RECORDED'>;
  sourceTimestamp: number;
  receivedTimestamp: number;
  liveState: 'live' | 'stale' | 'recorded';
  sourceReference?: string;
  uncertainty?: string[];
}
```

Create source-specific discriminated variants rather than an untyped bag of fields.

### 8.3 Runtime validation

Use runtime schemas, for example Zod, for external JSON. Schema drift or unknown fields must not crash the renderer.

Track:

- valid messages;
- rejected messages;
- missing enrichment;
- stream warnings;
- dropped/coalesced visuals;
- last schema error summary.

Do not log complete sensitive-looking payloads indefinitely.

### 8.4 Bounded buffers

Suggested initial budgets, subject to profiling:

| Resource | Desktop high | Mid/low desktop | Phone |
|---|---:|---:|---:|
| Active measurement arcs | 200–300 | 120–180 | 50–90 |
| Simultaneous pulse particles | 400–600 | 200–350 | 80–160 |
| Active routing visuals | 250 | 150 | 60 |
| Full labels | 20–30 | 15–20 | 6–10 |
| Rolling event records | 2,000–5,000 | 1,500–3,000 | 500–1,500 |

These are starting points, not guaranteed final values. Profile actual frame time and memory.

Use pooling and expiry. No unbounded arrays, map entries, object URLs, geometries, materials, timers, listeners, or IndexedDB growth.

### 8.5 WebSocket behaviour

For each source:

- meaningful client identifier;
- explicit subscribe payload;
- acknowledgement handling where supported;
- heartbeat/timeout detection;
- exponential reconnect backoff with jitter and maximum delay;
- clean unsubscribe/close;
- duplicate message handling;
- page-visibility pause/deprioritisation;
- online/offline browser events;
- source-status state machine;
- stale threshold based on expected source cadence;
- no infinite rapid reconnect loop.

### 8.6 Recorded real fixtures

Capture a small set of genuine public source messages for deterministic tests and offline demo/replay.

Each fixture needs a sidecar or header recording:

- source;
- original capture timestamp;
- endpoint/subscription filter;
- whether IP fields were retained or minimised;
- licence/terms review;
- checksum;
- intended tests.

Production replay must display the original date/time and `RECORDED` status.

---

## 9. RIPE Atlas implementation plan

### 9.1 Start with coordinate-defensible measurements

Prioritise anchor-related measurements because RIPE Atlas anchors are stable, well-connected sources/targets with known metadata and continuous anchor measurement systems.

Do not begin by subscribing to every traceroute from every probe.

Implementation sequence:

1. Fetch and cache a controlled anchor catalogue.
2. Resolve a curated/derived set of public anchor measurement IDs.
3. Verify source and target metadata for each selected measurement.
4. Subscribe to real ping/traceroute results for a bounded set.
5. Validate result format versions.
6. Normalise and enrich with approximate endpoint coordinates.
7. Display only events whose spatial semantics pass validation.
8. Send non-spatial valid results to the inspector/activity stream rather than inventing map placement.

### 9.2 Probe-location honesty

RIPE’s public probe coordinates are intentionally offset. The UI should say, for example:

`Approximate RIPE Atlas probe location (privacy-obfuscated)`

Do not show a false street-level precision or excessive decimal places.

### 9.3 Traceroute representation

The inspector may show:

- hop number;
- responding IP where public and permitted;
- RTT samples;
- timeout;
- destination responded flag;
- protocol;
- AS number if resolved through an approved source;
- location status: `KNOWN`, `APPROXIMATE`, or `UNKNOWN`.

Default v1 globe arc should connect known measurement endpoints and show hop count as metadata. Intermediate geographic hop routing is a later research feature and must remain off until its uncertainty model is credible.

### 9.4 Measurement animation

Animation duration may be mapped to RTT within clamped visual limits, but state that the animation is a visual encoding. Do not literally make an 8 ms event disappear too quickly to perceive or a 400 ms event take an unusably long time.

Use a legend such as:

`Animation timing is scaled for visibility; exact RTT is shown numerically.`

### 9.5 Atlas exit criteria

The Atlas phase is not complete until:

- every displayed event can be traced to a genuine stream payload;
- endpoint coordinate provenance is available;
- approximate locations are labelled;
- no event appears when required spatial data is absent;
- stream reconnect/stale/error states are visible;
- recorded fallback is labelled;
- at least one real live event can be selected and inspected on desktop and phone;
- geometry, input alignment, and mobile performance tests pass.

---

## 10. RIPE RIS Live implementation plan

### 10.1 Filtered subscriptions

Use the filterable WebSocket, not the unbounded firehose.

Begin with a small, documented set of collectors and only `UPDATE` events requiring announcements or withdrawals. Use server-side filters where practical.

Phone mode may subscribe to fewer collectors or a rotating subset. The interface must show the active coverage, for example:

`Observed through 2 selected RIPE RIS collectors — sampled view, not all global BGP activity.`

### 10.2 Normalisation

Normalise fields such as:

- collector/host;
- peer IP/ASN;
- source timestamp;
- announcement prefixes;
- withdrawal prefixes;
- AS path;
- origin ASN where derivable from AS path;
- event type;
- unique source ID;
- active subscription filter.

Avoid expensive repeated parsing on the main thread.

### 10.3 Visual grammar

Routing events must not look identical to measured endpoint arcs.

Possible treatment:

- collector nodes sit on/near Earth at verified collector geography;
- AS paths appear in a logical orbit/halo;
- path length controls segmented logical depth;
- announcement expands through the logical path;
- withdrawal retracts/fades;
- collector observation is visually anchored to the observer;
- exact geographic origin is omitted or marked approximate when only registration geography is known.

### 10.4 Rate and coalescing

- Count valid received messages separately from visuals shown.
- Coalesce repeated updates for the same prefix/path within a short window.
- Cap visuals per second.
- Expose `received`, `visualised`, and `coalesced` counts in advanced diagnostics.
- Do not call the visually sampled count the total Internet-wide count.

### 10.5 RIS exit criteria

- live announcements and withdrawals are distinguishable;
- the UI consistently says routing/BGP, never traffic;
- active collector coverage is displayed;
- high-rate periods do not freeze UI or allocate unbounded objects;
- phone mode remains usable;
- disconnect/backpressure failure is visible;
- selected event exposes raw technical fields in a readable inspector;
- screenshot review confirms the routing halo is visually distinct and does not clip through Earth or UI.

---

## 11. Infrastructure, outage, and satellite extensions

Do not start these merely to increase feature count. Each source requires a source-registry approval and its own semantics.

### 11.1 IXP/infrastructure layer

- Prefer a preprocessed, attributable snapshot over uncontrolled browser-wide catalogue queries.
- Record snapshot date.
- Cluster markers at global zoom.
- Expand cities/IXPs only when zoomed.
- Size markers by a supported metric only; otherwise use uniform markers.
- Never size an IXP by invented traffic volume.
- Presence of a network at an IXP does not prove current traffic.

### 11.2 IODA outage layer

- Show signal severity and affected entity from IODA’s published data.
- Label as an analytical outage/connectivity signal.
- Provide methodology/source explanation.
- Do not infer cause or intent.
- Make false-positive/uncertainty language accessible.

### 11.3 NASA GIBS layer

- Verify CORS and tile access in the production browser environment.
- Start with one explicitly named true-colour layer.
- Display requested observation date/time and actual data availability.
- Handle partial current-day acquisition without fake fill.
- Use a separate globe texture/layer pipeline so baseline Blue Marble remains available.
- Cache responsibly; do not create an uncontrolled tile downloader.
- Include the required NASA GIBS acknowledgement.

### 11.4 Cloudflare or token-requiring sources

Do not put tokens in GitHub Pages code. A token-requiring source is out of scope until the user approves a separate proxy/backend and its operating cost, terms, and security model.

---

## 12. Technical stack and repository architecture

### 12.1 Preferred stack

Use:

- Vite;
- strict TypeScript;
- React for interface composition and accessibility;
- direct Three.js for scene/rendering;
- Three.js addons where appropriate (`KTX2Loader`, `Line2`, post-processing);
- runtime schema validation such as Zod;
- Web Workers for stream parsing/enrichment where profiling supports it;
- Vitest for unit/integration tests;
- Playwright for browser/E2E/screenshot tests;
- custom CSS architecture, not a default component-dashboard theme;
- ESLint and Prettier or an equivalent deterministic format/lint setup.

Pin exact versions in the lockfile. Verify current stable APIs during implementation.

Avoid unnecessary dependencies. Do not use `react-three-fiber` unless a documented experiment proves it improves rather than obscures the required low-level control. The default decision is direct Three.js.

### 12.2 Suggested file structure

```text
/
├── AGENTS.md
├── MASTER_IMPLEMENTATION_PROMPT.md
├── README.md
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig*.json
├── eslint.config.*
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx
│   │   ├── appStore.ts
│   │   └── routes-or-view-state.ts
│   ├── scene/
│   │   ├── EarthRenderer.ts
│   │   ├── SceneController.ts
│   │   ├── camera/
│   │   ├── earth/
│   │   ├── atmosphere/
│   │   ├── postprocessing/
│   │   ├── quality/
│   │   ├── interaction/
│   │   ├── layers/
│   │   │   ├── measurements/
│   │   │   ├── routing/
│   │   │   ├── infrastructure/
│   │   │   └── satellite/
│   │   ├── geometry/
│   │   └── shaders/
│   ├── data/
│   │   ├── DataHub.ts
│   │   ├── adapters/
│   │   │   ├── AtlasStreamAdapter.ts
│   │   │   ├── AtlasMetadataAdapter.ts
│   │   │   ├── RisLiveAdapter.ts
│   │   │   └── RecordedReplayAdapter.ts
│   │   ├── schemas/
│   │   ├── models/
│   │   ├── workers/
│   │   ├── buffers/
│   │   ├── cache/
│   │   └── sourceRegistry.ts
│   ├── ui/
│   │   ├── shell/
│   │   ├── inspector/
│   │   ├── timeline/
│   │   ├── source-health/
│   │   ├── controls/
│   │   └── accessibility/
│   ├── styles/
│   └── utils/
├── public/
│   ├── assets/
│   │   ├── earth/
│   │   ├── sky/
│   │   └── attribution/
│   └── manifest.webmanifest
├── tools/
│   ├── process-earth-assets.*
│   ├── verify-assets.*
│   └── build-pages.*
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── fixtures/real-recorded/
├── project-docs/
│   ├── STATUS.md
│   ├── IMPLEMENTATION_LOG.md
│   ├── SOURCE_REGISTRY.md
│   ├── ATTRIBUTION.md
│   ├── ARCHITECTURE.md
│   └── qa/
└── docs/                   # generated production output only
```

Adjust only with a documented reason.

### 12.3 URL state

Because GitHub Pages project sites live under a repository path, avoid server-dependent history routing. Use:

- query parameters;
- URL hash state;
- or a single-route SPA with relative assets.

Shareable state may include selected mode, filters, camera target, and selected event/reference—without embedding secrets or huge payloads.

### 12.4 Build scripts

Provide commands resembling:

```text
npm run dev
npm run typecheck
npm run lint
npm run test
npm run test:e2e
npm run test:visual
npm run build
npm run preview
npm run build:pages
npm run verify:pages
```

`build:pages` must create `/docs`, include `.nojekyll`, and use correct relative/base paths for the repository Pages URL.

Do not hand-edit `/docs`.

---

## 13. Performance and asset budgets

These are hard design targets until profiling justifies a documented change.

### 13.1 Loading budgets

- First visible real Earth: use a small progressive texture, target under approximately 2 seconds on a good connection and modern device.
- Initial mobile critical transfer: target under 4 MB where practical before optional high-resolution upgrades.
- Initial desktop critical transfer: target under 7 MB where practical before optional high-resolution upgrades.
- Lazy-load advanced modes and heavy assets.
- No single ordinary production asset should normally exceed 15 MB; most should remain below 5 MB.
- Do not commit raw source imagery solely for convenience.

### 13.2 GPU and frame budgets

- Desktop target: 60 fps in normal mode on a reasonable discrete/integrated GPU.
- Mid-range phone target: stable 30–60 fps depending on quality tier.
- Avoid long frames above 50 ms during ordinary interaction.
- Cap device pixel ratio, particularly on phone; do not blindly render at DPR 3–4.
- High-quality texture tier must be opt-in/adaptive when memory is uncertain.
- Monitor `renderer.info`, object counts, texture memory proxies, and frame-time moving averages in a development diagnostics panel.

### 13.3 Adaptive quality

Detect or infer:

- viewport size;
- DPR;
- `deviceMemory` where available;
- reduced motion;
- battery-saving preference where available/appropriate;
- WebGL capabilities and compressed texture support;
- measured frame time after warm-up.

Quality tiers may control:

- texture resolution;
- atmosphere sample complexity;
- bloom resolution;
- anti-aliasing strategy;
- sphere segments;
- maximum active arcs/particles;
- label count;
- post-processing;
- satellite tile resolution.

Allow a user override: `Auto`, `Performance`, `Balanced`, `High`.

### 13.4 Lifecycle and memory

- dispose geometries, materials, textures, render targets, workers, sockets, and listeners;
- handle WebGL context loss/restoration;
- pause or reduce rendering when `document.hidden`;
- do not leak objects on mode switches;
- reuse visual pools;
- bound cache sizes;
- verify repeated mode switching with memory/performance diagnostics.

---

## 14. Accessibility, privacy, and security

### 14.1 Accessibility

- keyboard-accessible mode controls, timeline, filters, and inspector;
- visible focus states;
- semantic buttons and headings;
- ARIA labels where visual icons lack text;
- colour is never the sole event distinction;
- accessible contrast;
- reduced-motion mode;
- data-table/activity-list alternative for users who cannot operate the globe;
- screen-reader live announcements must be rate-limited and meaningful, not one per network event;
- touch targets remain adequately large.

### 14.2 Privacy

- no analytics/tracking by default;
- no account required;
- local preferences stored locally;
- explain RIPE probe coordinate obfuscation;
- do not amplify precision beyond the source;
- do not expose secrets or user device identifiers;
- a meaningful but non-personal source `client` identifier is acceptable for RIPE stream debugging.

### 14.3 Security

- no client-side API secrets;
- sanitize all external text before DOM insertion;
- never use raw `innerHTML` for source-provided values;
- runtime-validate all external data;
- use strict CSP where compatible with GitHub Pages and required resources;
- pin dependencies and inspect licences;
- avoid remote script CDNs in production when dependencies can be bundled;
- record any unavoidable external asset/runtime host;
- provide failure states when external services are blocked.

---

## 15. Testing strategy

Automated tests are necessary but not sufficient. Visual inspection is mandatory.

### 15.1 Unit tests

At minimum test:

#### Globe mathematics

- lat/lon to Cartesian at poles, equator, prime meridian, antimeridian;
- round-trip coordinate conversion;
- known-city placement;
- great-circle endpoints;
- antimeridian shortest path;
- identical endpoints;
- near-antipodal endpoints;
- all arc points outside Earth radius;
- altitude envelope;
- marker surface normal;
- label front/back visibility calculation;
- real-time sun direction against known reference dates/times.

#### Input

- pointer NDC conversion with canvas offsets;
- DPR independence;
- resized canvas;
- mobile viewport changes;
- panel interaction suppression.

#### Data

- Atlas schema variants and missing fields;
- traceroute timeout/reply parsing;
- RIS announcement and withdrawal parsing;
- duplicate IDs;
- timestamp conversion;
- stale/live state transitions;
- bounded ring-buffer eviction;
- coalescing;
- semantic label assignment;
- prevention of spatial render when coordinates are absent.

### 15.2 Integration tests

Use genuine recorded source fixtures.

Test:

- WebSocket subscribe/ack/message/unsubscribe lifecycle;
- reconnect with exponential backoff;
- dropped/backpressure warnings;
- invalid message rejection without crash;
- metadata cache hits/misses/expiry;
- replay mode retains `RECORDED` state;
- mode switch disposes/pauses adapters correctly;
- render scheduler respects budgets;
- source health reflects last valid timestamp;
- no fake events appear during disconnect.

### 15.3 Browser/E2E tests

Test:

- application boots from a nested GitHub Pages-style base path;
- Earth loads with progressive assets;
- source state transitions are visible;
- orbit/pinch/zoom/reset;
- marker/arc selection accuracy;
- inspector opens without hiding selected item;
- timeline pause/scrub/resume;
- mode switching;
- reconnect/offline/recorded states;
- reduced motion;
- keyboard navigation;
- URL state restore;
- no console errors;
- no failed required asset requests;
- orientation changes.

### 15.4 Required screenshot matrix

Capture and personally inspect at least:

- 390 × 844 portrait;
- 844 × 390 landscape;
- 412 × 915 portrait;
- 768 × 1024 tablet;
- 1366 × 768 desktop;
- 1920 × 1080 desktop;
- 2560 × 1440 desktop.

Test multiple DPRs where possible.

For each major visual phase, capture more than the default frame:

1. full globe daylight/night terminator;
2. close horizon atmosphere;
3. rotated antimeridian/poles;
4. selected marker and inspector;
5. several arcs from different hemispheres;
6. zoomed-in line thickness;
7. mobile bottom sheet closed/half/full;
8. phone landscape;
9. source disconnect/reconnect;
10. reduced-motion mode;
11. high-density event period;
12. no-data/quiet state.

### 15.5 Human visual-QA questions

Do not mark the phase complete until the reviewer can answer yes:

#### Earth

- Does Earth look like a premium satellite-based rendering rather than a game-texture sphere?
- Are continents correctly oriented and positioned?
- Is there no obvious antimeridian seam or pole distortion?
- Does the terminator match the configured real time?
- Are night lights limited to the night side and restrained?
- Does the ocean react differently from land without looking plastic?
- Is atmosphere subtle, depth-aware, and believable at the horizon?
- Is the star background plausible and subordinate?

#### Geometry

- Do all geographic objects rotate with Earth?
- Do arcs meet their endpoints and remain outside the sphere?
- Are back-side visuals correctly occluded?
- Does line width remain controlled across zoom levels?
- Are labels hidden behind Earth and kept inside the viewport?
- Does selection align exactly with cursor/tap?
- Is there no clipping, z-fighting, detached line, or horizon popping?

#### UI

- Does the interface feel custom and intentional?
- Is the hierarchy obvious without tutorial text covering Earth?
- Are controls consistent and aligned?
- Is spacing clean at every viewport?
- Do panels avoid covering the selected event?
- Is technical terminology accurate?
- Are source/uncertainty labels visible but not visually oppressive?
- Does mobile feel designed rather than collapsed?

#### Data truth

- Can every visible event be traced to a real source record?
- Is live versus recorded unmistakable?
- Is BGP never called traffic?
- Are approximate/unknown locations exposed?
- Are counters scoped to the browser/source coverage they actually represent?

When any answer is no, either fix it in the pass or record the phase gate as failed.

---

## 16. Phase plan and exit gates

## Phase 0 — Engineering foundation

### Deliverables

- Vite + strict TypeScript + React scaffold;
- direct Three.js renderer lifecycle;
- custom CSS/token system;
- lint, format, typecheck, unit test, Playwright, build, preview scripts;
- nested-path-safe GitHub Pages build to `/docs`;
- `.nojekyll` generation;
- development diagnostics toggle;
- app shell with honest `DATA NOT CONNECTED` placeholders;
- architecture and attribution documents;
- no fake events;
- initial CI-independent local test workflow documented.

### Exit gate

- clean install from lockfile;
- typecheck/lint/unit tests pass;
- production build and preview work locally under repository subpath;
- `/docs` generated;
- browser opens without console errors;
- mobile viewport shell does not overflow;
- logs/status updated.

## Phase 1 — Photorealistic Earth and premium interface shell

### Deliverables

- verified NASA surface/night assets and derivatives;
- progressive texture loading;
- real UTC sun/terminator;
- realistic day/night surface shader;
- ocean mask/specular response;
- atmosphere shader;
- restrained selective post-processing;
- star background;
- orbit/touch controls;
- correct coordinate utilities;
- correct screen-space arc prototype using geometry-only test coordinates in development mode, clearly not presented as live data;
- marker and label prototypes;
- desktop/mobile interface shell;
- quality selector;
- screenshot suite and visual QA report.

### Exit gate

- Earth passes the human visual-QA questions;
- coordinates/arc/input tests pass;
- pointer selection has no visible offset;
- overlays rotate with Earth;
- arcs do not enter Earth or explode on antimeridian/antipodal cases;
- phone portrait/landscape are usable;
- stable performance on available test devices/emulation;
- no fake live telemetry;
- user can open an attribution/source explanation;
- screenshots are reviewed and defects logged/fixed.

Do not proceed to dense live data before this gate passes.

## Phase 2 — RIPE Atlas live measurements

### Deliverables

- anchor/probe metadata adapter and cache;
- curated real measurement selection;
- Atlas streaming adapter;
- runtime schemas and normalisation;
- bounded worker/buffer pipeline;
- real measurement arcs/markers;
- inspector and source-health state;
- reconnect/stale/offline logic;
- genuine recorded fixtures and replay;
- Atlas source explanations and attribution;
- mobile event budget.

### Exit gate

See Section 9.5, plus full automated and screenshot regression pass.

## Phase 3 — RIPE RIS routing layer

### Deliverables

- filtered RIS Live adapter;
- announcement/withdrawal/path normalisation;
- logical routing visual language;
- collector coverage display;
- coalescing and rate caps;
- advanced inspector;
- real recorded fixtures;
- routing-specific tests and screenshots.

### Exit gate

See Section 10.5, with no terminology or visual implication that BGP equals traffic.

## Phase 4 — Verified extension layers

Potential sequence:

1. RIPE anchor/probe infrastructure overview;
2. approved IXP snapshot;
3. IODA outage signals;
4. NASA GIBS satellite observation layer.

Each extension is its own vertical slice with source approval, terms review, adapter tests, visual semantics, mobile performance, and failure-state QA.

## Phase 5 — Interaction depth and cinematic polish

Possible deliverables:

- advanced Time Lens;
- shareable URL state;
- search for ASN/country/anchor/measurement;
- camera bookmarks and guided tour;
- optional sonification;
- screenshot/cinematic mode;
- compare IPv4/IPv6;
- advanced diagnostics;
- accessibility data-table view;
- PWA/offline recorded session support;
- refined onboarding and explanatory microcopy.

Do not add these at the expense of truth, Earth fidelity, or mobile stability.

## Phase 6 — Release hardening

### Deliverables

- complete source and asset attribution;
- re-reviewed external terms/API docs;
- dependency/licence review;
- full regression suite;
- performance report;
- accessibility pass;
- all required viewport screenshots;
- clean production `/docs` build;
- README user guide;
- deployment instructions;
- known limitations published;
- GitHub Pages configured and live URL verified.

### Final exit gate

The production release must not contain:

- fabricated activity;
- misleading traffic claims;
- client secrets;
- unverified assets;
- console errors;
- broken mobile layouts;
- pointer offset;
- detached overlays;
- unbounded streams;
- hidden failed tests;
- undocumented major limitations;
- custom Actions dependency under the current constraint.

---

## 17. Anti-pattern checklist

Reject or refactor any implementation containing these patterns:

- random sample routes shown outside an explicitly marked developer test mode;
- all arcs parented to scene root instead of Earth-local group;
- line material resolution not updated on resize;
- native `LineBasicMaterial` expected to provide thick cross-platform lines;
- click coordinates based on `window.innerWidth/innerHeight` when canvas has a different rectangle;
- labels rendered for every event;
- one mesh/material/DOM node permanently allocated per incoming message;
- full RIS firehose on phone;
- tight REST polling for data available through a stream;
- invalid or stale data silently retained as live;
- current-day GIBS gaps filled with old imagery without a visible date distinction;
- night-light map visible equally on day and night;
- atmosphere rendered as an even cyan outline;
- giant cloud sphere rotating implausibly fast;
- bloom applied to all UI and Earth highlights;
- hard-coded absolute asset paths that break under the repository Pages subpath;
- service worker caching an outdated build indefinitely;
- secrets in `.env` that Vite exposes to the client;
- generated `/docs` hand-edited;
- source terms/attribution omitted;
- screenshots taken but not visually inspected;
- “all tests passed” without listing the commands/results;
- unimplemented features presented as complete.

---

## 18. Required pass-end output

At the end of every implementation pass, provide:

### Completed and verified

List only features supported by runtime/test/visual evidence.

### Evidence

- branch/commit/PR;
- commands run and exact results;
- browser/viewports tested;
- screenshots captured and what was inspected;
- live source events observed, including source timestamp where relevant;
- deployment/build status.

### Known limitations / not implemented

Be explicit. Do not hide deferred phases behind words such as “mostly.”

### Next highest-value pass

Name one bounded next pass tied to the first unmet exit gate.

Also update:

- `project-docs/IMPLEMENTATION_LOG.md`;
- `project-docs/STATUS.md`;
- `project-docs/SOURCE_REGISTRY.md` when source facts changed;
- `project-docs/ATTRIBUTION.md` when assets/sources were enabled;
- architecture/QA records as appropriate.

---

## 19. First implementation-pass instruction

When implementation begins from the current planning-only repository:

1. Execute Phase 0 completely.
2. Continue into Phase 1 only as far as a coherent, testable Earth vertical slice can be finished and visually reviewed in the same pass.
3. Do not connect fake or real live streams merely to create spectacle before the Earth/geometry/input foundations are correct.
4. Use real NASA imagery from the beginning, even for the low-resolution progressive placeholder.
5. Create the asset processing/attribution record before or alongside committing each derivative.
6. Run the complete Phase 0 gate and the applicable Phase 1 tests.
7. Capture all required viewport screenshots available in the environment, inspect them critically, fix obvious defects, and record anything that cannot be validated.
8. Generate `/docs` only after source tests/build pass.
9. End with an honest stable checkpoint and the exact next gate.

The desired first checkpoint is a site that already looks exceptional as an Earth observatory even while its source panel truthfully says that live Internet data is not connected yet.

---

## 20. Reference facts verified for this plan on 2026-08-17

Recheck these at implementation and release time:

- RIPE Atlas Streaming API supports real-time public result streaming over WebSocket/HTTP and recommends a meaningful client identifier: `https://atlas.ripe.net/docs/apis/streaming-api/`.
- RIPE Atlas public probe coordinates are intentionally obfuscated/offset: `https://atlas.ripe.net/docs/apis/rest-api-manual/authentication/anonymous-access` and `https://atlas.ripe.net/docs/howtos/probe-geolocation`.
- RIPE Atlas anchors act as stable measurement sources/targets and participate in continuous anchor measurements: `https://atlas.ripe.net/docs/apis/rest-api-manual/anchors/`.
- RIPE Atlas result formats vary by firmware/result version and require defensive parsing: `https://atlas.ripe.net/docs/apis/measurement-result-format/`.
- RIPE RIS Live exposes filterable real-time BGP WebSocket data and currently does not require authentication: `https://ris-live.ripe.net/manual/`.
- NASA Blue Marble: Next Generation is a cloud-free monthly global satellite composite available at high resolution through Visible Earth.
- NASA Black Marble provides satellite-derived night-light composites.
- NASA media generally may be used for informational/educational web visualisations subject to the media guidelines, attribution, third-party-credit checks, and no implied NASA endorsement: `https://www.nasa.gov/nasa-brand-center/images-and-media/`.
- NASA GIBS exposes public standards-compliant imagery services with time dimensions; many near-real-time products may appear within roughly 3.5 hours, not instantly: `https://nasa-gibs.github.io/gibs-api-docs/`.
- Three.js `WebGLRenderer` uses WebGL2; `ShaderMaterial` supports custom GLSL; `KTX2Loader` supports GPU-compressed KTX2/Basis textures: `https://threejs.org/docs/`.
- GitHub Pages can publish from a branch folder such as `/docs`, allowing a locally built static site without a custom deployment workflow.
- GitHub Pages source/published sites have practical size limits, and normal Git objects have a 100 MB enforced maximum; keep this repository and its assets substantially smaller.

# END MASTER PROMPT
