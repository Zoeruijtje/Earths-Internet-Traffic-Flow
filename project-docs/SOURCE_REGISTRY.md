# Source Registry and Data-Semantics Contract

**Last reviewed:** 2026-08-17  
**Purpose:** Record what each external source actually measures, how it may be accessed, what it must never be claimed to show, and what must be attributed or rechecked before release.

This document is operational, not merely informational. A data or imagery layer must not be enabled in production until its row is marked **Approved for current use** and its implementation preserves the semantics below.

## Global truth labels

| Label | Meaning | Example | Prohibited interpretation |
|---|---|---|---|
| **MEASURED** | A direct active measurement result returned by the source | RIPE Atlas RTT or traceroute result | “All Internet traffic between these countries” |
| **OBSERVED** | A control-plane or externally observed network event | RIS Live BGP announcement/withdrawal | Byte volume, packet flow, or exact physical route |
| **INFRASTRUCTURE** | A registered or verified infrastructure record | RIPE anchor or IXP location | Proof that traffic currently traverses it |
| **DERIVED VISUAL** | A mathematical rendering computed from real records | Great-circle arc between known endpoints | Literal fibre/cable path unless independently verified |
| **RECORDED** | A previously captured genuine public response | Offline/replay fixture with original timestamp | Current live activity |

## Production source matrix

### 1. RIPE Atlas Streaming API

| Field | Registry value |
|---|---|
| Status | **Approved for Phase 2 prototype**, subject to final terms/usage recheck before launch |
| Official documentation | `https://atlas.ripe.net/docs/apis/streaming-api/` |
| Primary use | Real-time public measurement results, measurement metadata, and probe status events |
| Access | Public WebSocket/streaming endpoint; include a meaningful `client` identifier |
| Authentication | Public read streaming can be used without embedding a secret for public data |
| Correct UI label | **MEASURED** |
| Useful fields | Measurement ID, probe ID, address family, target name/address, timestamp/end time, RTT values, traceroute hops, protocol, firmware/result-format version |
| Accuracy caveat | The result is accurate for the participating measurement probe and target at that time; it is not a complete view of the Internet |
| Geographic caveat | Probe coordinates are deliberately obfuscated/offset and must be displayed as approximate |
| Route caveat | Traceroute exposes logical IP hops and responses. It does not directly reveal the exact geographic fibre path for every hop |
| Rate/performance rule | Prefer streaming over tight REST polling; use bounded queues, accepted-field pruning where appropriate, and backpressure handling |
| Terms | RIPE Atlas Service Terms and Conditions; responsible use is required, and commercial use of RIPE Atlas data requires prior RIPE NCC permission under the currently reviewed terms |
| Attribution | Credit RIPE NCC / RIPE Atlas in the source drawer and documentation |
| Never claim | “Every packet,” “total global traffic,” exact residential probe address, or exact physical route |

#### Required implementation rules

- Subscribe only to a controlled set of real public measurements.
- Prefer anchor-to-anchor or probe-to-anchor measurements when both endpoint coordinate sources are defensible.
- Do not place an anycast service at a guessed physical server location.
- If only one endpoint has a known coordinate, show the measurement in an inspector/logical view instead of inventing the other endpoint.
- Parse multiple documented result-format/firmware versions defensively.
- Preserve original source timestamps.
- If messages are dropped because of backpressure, expose that fact in the data-health UI.

### 2. RIPE Atlas Probes and Anchors REST APIs

| Field | Registry value |
|---|---|
| Status | **Approved for Phase 2 prototype** |
| Official documentation | `https://atlas.ripe.net/docs/apis/rest-api-reference/probes/probes_list/` and `https://atlas.ripe.net/docs/apis/rest-api-reference/anchors/` |
| Primary use | Resolve probe/anchor metadata, approximate coordinates, ASN, country, status, and anchor identity |
| Access | Public read API for public resources |
| Correct UI label | **INFRASTRUCTURE**; coordinates additionally marked **APPROXIMATE** where relevant |
| Privacy caveat | Public probe geographic coordinates have an intentional random offset; the reviewed documentation states an offset of roughly 80–400 m |
| Cache rule | Cache metadata in IndexedDB with a controlled refresh interval; do not repeatedly refetch the full catalogue |
| Attribution/terms | Same RIPE Atlas terms and attribution as above |
| Never claim | Exact home/site address or precise point-level location of a public probe |

### 3. RIPE RIS Live

| Field | Registry value |
|---|---|
| Status | **Approved for Phase 3 prototype**, subject to final terms recheck |
| Official documentation | `https://ris-live.ripe.net/manual/` |
| Primary use | Real-time BGP messages observed by RIPE RIS route collectors |
| Access | Filterable WebSocket at `wss://ris-live.ripe.net/v1/ws/`; include a meaningful client identifier |
| Authentication | None currently required according to the reviewed manual; this may change |
| Supported useful filters | Collector/host, message type, announcements/withdrawals, peer, AS path, prefix, more/less-specific matching |
| Correct UI label | **OBSERVED ROUTING** |
| What it represents | BGP control-plane messages received by a particular collector from a particular peer |
| What it does not represent | Byte volume, application traffic, packet count, user activity, exact physical path, or a complete view from every router |
| Performance rule | Never consume the unrestricted firehose on a phone; use server-side filters, bounded parsing, coalescing, and a visual event budget |
| Failure rule | If the client cannot keep up and the stream closes, show degraded/reconnecting state rather than silently continuing with fake events |
| Attribution | Credit RIPE NCC / RIS Live in the source drawer and documentation |
| Never claim | “Traffic surged,” “packets moved from A to B,” or “this line is the cable path” based solely on BGP data |

#### Required visual distinction

RIS events should look and read differently from measured Atlas arcs. Recommended approach: a routing halo/constellation outside the Earth or collector-origin logical links with a persistent **LOGICAL ROUTING VIEW** legend. Do not reuse the exact same visual language as physical-looking endpoint measurements.

### 4. NASA Blue Marble: Next Generation

| Field | Registry value |
|---|---|
| Status | **Approved as the baseline Earth surface source after asset-specific credit verification** |
| Official collection/example | `https://visibleearth.nasa.gov/collection/1484/blue-marble` and individual monthly Visible Earth records |
| Primary use | High-resolution, cloud-free monthly global true-colour satellite composite for the baseline Earth surface |
| Available scale | Source collection includes global imagery up to 21,600 × 10,800 for relevant products |
| Correct UI description | **NASA satellite composite**, with month/acquisition period displayed; not “live Earth” |
| Processing rule | Produce web-optimised 2K, 4K, and 8K derivatives with mipmaps/KTX2 where viable; do not commit the largest raw source asset |
| Colour rule | Preserve realistic colour; no aggressive saturation, HDR halos, crushed blacks, or fake neon oceans |
| Attribution | Credit the specific Visible Earth record, named creator where provided (for example Reto Stöckli / NASA Earth Observatory), instrument/source, and NASA |
| NASA usage rule | Follow NASA media-usage guidance, do not imply NASA endorsement, and distinguish NASA logos/identifiers from generally reusable imagery |
| Never claim | Current cloud state or current-date satellite capture when using the historical composite |

### 5. NASA Earth at Night / Black Marble

| Field | Registry value |
|---|---|
| Status | **Approved for night-side emissive texture after selecting and recording the exact asset** |
| Official example | `https://visibleearth.nasa.gov/images/144898/earth-at-night-black-marble-2016-color-maps/` |
| Primary use | Real satellite-derived night-light emission map |
| Correct UI description | **Night-light composite**, with data year shown |
| Rendering rule | Multiply by the physically computed night-side mask; city lights must not glow equally on the sunlit side |
| Processing rule | Create compressed 2K/4K/8K derivatives; avoid excessive bloom that makes small settlements appear as giant luminous regions |
| Attribution | Credit NASA Earth Observatory and the named data/visualisation contributors on the selected record |
| Never claim | Real-time electricity use or current live lighting state |

### 6. NASA Global Imagery Browse Services (GIBS)

| Field | Registry value |
|---|---|
| Status | **Candidate for Phase 4; not yet approved for production implementation** |
| Official documentation | `https://nasa-gibs.github.io/gibs-api-docs/` |
| Primary use | Optional time-varying satellite visualisation layers through WMTS/WMS/TWMS/TMS |
| Access | Public standards-compliant services on the `gibs.earthdata.nasa.gov` domain |
| Time support | Daily or subdaily time dimensions depending on layer |
| Latency caveat | Many LANCE near-real-time visualisations are available within roughly 3.5 hours of observation, not instantaneously |
| Coverage caveat | Current-date imagery may be incomplete where acquisition/processing has not occurred; empty regions must not be filled with invented imagery |
| Correct UI label | **SATELLITE OBSERVATION**, plus exact layer and observation/date information |
| Required acknowledgment | “We acknowledge the use of imagery provided by services from NASA’s Global Imagery Browse Services (GIBS), part of NASA’s Earth Science Data and Information System (ESDIS).” |
| Engineering gate | Confirm browser CORS behaviour, tile projection/stitching, texture update cost, mobile memory, and attribution before enabling |
| Never claim | A complete real-time cloudless globe |

### 7. PeeringDB

| Field | Registry value |
|---|---|
| Status | **Candidate for Phase 4 infrastructure layer; terms and query budget must be rechecked immediately before implementation** |
| Official documentation | `https://docs.peeringdb.com/` and `https://www.peeringdb.com/apidocs/` |
| Primary use | Community-maintained interconnection records for networks, IXPs, and facilities |
| Access | Anonymous simple read queries are supported at lower limits; authenticated access uses API keys and must never expose a key in the client |
| Correct UI label | **REGISTERED INFRASTRUCTURE** / **COMMUNITY-MAINTAINED** |
| Accuracy caveat | Records are user/community maintained and may be incomplete, stale, or represent administrative rather than exact physical coordinates |
| Usage caveat | Follow PeeringDB acceptable-use rules and avoid high-frequency client queries; prefer a documented, periodically refreshed static snapshot if permitted |
| Never claim | That current traffic is traversing an exchange merely because a network has a registered presence there |

### 8. Packet Clearing House IXP Directory

| Field | Registry value |
|---|---|
| Status | **Candidate; non-commercial/share-alike implications require an explicit decision before use** |
| Official documentation | `https://www.pch.net/ixp/data` |
| Primary use | Global IXP directory including status, city/country, peering subnets, equipment, locations, and membership fields where available |
| Correct UI label | **REGISTERED INFRASTRUCTURE** |
| Licence reviewed | Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported for the API dataset at the time of review |
| Product impact | Do not merge this dataset into a distributable combined database until share-alike and non-commercial obligations are understood and documented |
| Never claim | Real-time traffic merely from directory membership or location |

### 9. IODA (Internet Outage Detection and Analysis)

| Field | Registry value |
|---|---|
| Status | **Candidate for Phase 4; API, terms, and attribution still require implementation-time review** |
| Official project/API | `https://ioda.inetintel.cc.gatech.edu/` and `https://api.ioda.inetintel.cc.gatech.edu/v2/` |
| Primary use | Near-real-time macroscopic connectivity/outage signals and alerts at country, subnational, or ASN level |
| Source methodology | Combines signals including BGP visibility, active probing, and Internet background radiation; exact available signals may evolve |
| Correct UI label | **OUTAGE SIGNAL / INFERRED FROM MULTIPLE OBSERVATIONS** |
| Accuracy caveat | An alert is an analytical inference, not proof of the precise cause or intent of an outage |
| Never claim | Cause, censorship intent, number of affected people, or exact failure location unless independently sourced and explicitly supported |

### 10. Cloudflare Radar / NetFlows

| Field | Registry value |
|---|---|
| Status | **Deferred; not part of the no-backend MVP** |
| Primary use | Aggregated traffic observed at Cloudflare’s network edge, not the entire Internet |
| Technical constraint | Radar API access requires a token; a secret must never be embedded in GitHub Pages JavaScript |
| Licence concern | Reviewed Radar data terms included CC BY-NC 4.0 for relevant data; recheck before any use |
| Required architecture | Separately approved serverless proxy or pre-generated snapshot process; neither is currently in scope |
| Correct UI label | **TRAFFIC OBSERVED BY CLOUDFLARE** |
| Never claim | Total Internet traffic or exact country-to-country global byte flow |

### 11. Submarine-cable and terrestrial-route datasets

| Field | Registry value |
|---|---|
| Status | **Deferred pending a genuinely reusable, properly attributed dataset** |
| Reason | Many attractive cable maps do not grant free use of their geocoded route geometry in third-party interactive products |
| Rule | Never scrape or redraw proprietary cable geometry from a map image |
| Acceptable future sources | A source with explicit reusable geospatial-data rights, or a separately licensed dataset approved by the user |
| Visual rule | Even a real cable route must not be presented as the route of a particular measured packet unless directly established |

## Earth asset processing record template

Create one record for every production texture or sky asset:

```text
Asset ID:
Production path:
Purpose:
Original source page:
Original download URL:
Agency/creator:
Instrument/data source:
Acquisition/composite date:
Original dimensions and size:
Licence/usage terms reviewed on:
Required attribution:
Processing tools and command:
Crop/projection/colour changes:
Output variants:
Output dimensions and sizes:
SHA-256 checksums:
Visual QA screenshots:
Known limitations:
```

## Data adapter approval checklist

A source adapter is not production-ready until all items are true:

- [ ] Official documentation was rechecked during implementation.
- [ ] Terms, attribution, and commercial-use implications were recorded.
- [ ] Browser access/CORS or required proxy architecture was verified.
- [ ] Runtime schemas validate real captured messages.
- [ ] Rate limits and reconnect/backoff behaviour are implemented.
- [ ] The source’s coverage and blind spots are explained in the UI.
- [ ] The UI uses the correct truth label and terminology.
- [ ] Offline/replay fixtures are genuine recorded responses with original timestamps.
- [ ] No secret is present in source, build output, fixtures, logs, or screenshots.
- [ ] Failure and stale-data states were tested.
- [ ] Mobile data and rendering budgets were tested.
- [ ] The layer can be independently disabled without breaking the rest of the observatory.

## Final release rule

Before public launch, re-review every enabled source because APIs, terms, authentication requirements, and licences can change. The date at the top of this document must be updated, and any changed requirement must be reflected in the interface, attribution, architecture, and implementation log.
