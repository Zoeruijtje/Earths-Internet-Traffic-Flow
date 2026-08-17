# Source Registry — First-Pass Expansion

This file supplements `SOURCE_REGISTRY.md` for the first implementation pass. Nothing listed as a candidate is connected, queried, cached, transformed, animated, or represented as live data in this pass.

## Status vocabulary

- **Implemented asset:** used in the rendered Earth with attribution and a fixed source identity.
- **Candidate / disconnected:** potentially useful, but no runtime integration exists.
- **Deferred:** unsuitable for the current pass because licensing, access, semantics, or engineering scope is unresolved.
- **Rejected:** must not be used for the proposed claim.

## Implemented imagery assets

| Provider / product | Intended use | Status | Required interpretation |
|---|---|---|---|
| NASA Visible Earth — Blue Marble (`land_ocean_ice_2048.png`) | Day-side Earth base colour | **Implemented asset** | Static composite imagery. It is not current weather and not a live view of Earth. |
| NASA Visible Earth / Earth Observatory — night-lights composite (`land_ocean_ice_lights_2048.png`) | Night-side visual context | **Implemented asset** | Static contextual imagery. Brightness must not be presented as current traffic, electricity consumption, population, or current outages. |
| NASA GIBS / Worldview | Future dated imagery and scientific overlays | **Candidate / disconnected** | Exact layer ID, acquisition time, tile terms, attribution, cache policy and missing-tile behaviour must be documented before activation. |

## Network measurement and routing candidates

| Source | Potential use | Status | Accuracy and product-language controls |
|---|---|---|---|
| RIPE Atlas | Active latency, traceroute, DNS and reachability measurements | **Candidate / disconnected** | Probe- and test-specific observations. Never generalise a measurement into global traffic volume. Preserve probe, target, test, timestamp and result status. |
| RIPE RIS / RIPEstat | BGP routing state, prefixes and routing events | **Candidate / disconnected** | Collector-dependent control-plane visibility. Preserve collector, peer, prefix, timestamp and query provenance. Not byte-volume traffic. |
| Route Views | BGP routing archives | **Candidate / disconnected** | Routing-control-plane evidence only. Collector coverage and archive timestamp must remain visible. |
| CAIDA Ark | Traceroute-derived topology research | **Candidate / disconnected** | Sampled and inferred topology, not a complete physical map. Dataset-specific access and redistribution terms apply. |
| CAIDA IODA | Multi-signal outage inference | **Candidate / disconnected** | Present as an inference with its component signals and confidence limitations, not definitive live availability. |
| Cloudflare Radar | Aggregate traffic trends, routing and disruption context | **Candidate / disconnected** | Validate the exact API/product terms and aggregation semantics. One network's observation must not be labelled as the whole Internet. |
| M-Lab | Open broadband performance measurements | **Candidate / disconnected** | User-initiated measurements are selection-biased. Preserve test type, time, location granularity and client context. |
| Ookla Open Data | Aggregated fixed/mobile performance tiles | **Candidate / disconnected** | Revalidate current licence and attribution. Performance samples do not represent traffic flow. |
| APNIC Labs | Internet measurement research datasets | **Candidate / disconnected** | Each dataset requires its own methodology, temporal semantics, reuse rights and uncertainty statement. |

## Infrastructure and facility candidates

| Source | Potential use | Status | Accuracy and product-language controls |
|---|---|---|---|
| PeeringDB | Networks, facilities, exchanges and presence metadata | **Candidate / disconnected** | Primarily self-reported directory data. Co-location does not prove an active interconnection or current route. Preserve record timestamps. |
| IXPDB / Euro-IX | Internet exchange metadata | **Candidate / disconnected** | Revalidate API and redistribution terms. Reconcile identifiers explicitly; never silently merge conflicting exchange records. |
| Packet Clearing House | IXP directory and related research data | **Candidate / disconnected** | Use only fields with clear provenance and reuse terms. Presence metadata is not traffic data. |
| TeleGeography submarine cable map/data | Submarine cable-system context | **Deferred** | Commercial and redistribution constraints require an explicit licence or a suitably licensed alternative. Cable geometry is not assumed to be exact seabed routing. |
| Operator-published network maps | Named backbone or cable context | **Deferred** | Marketing diagrams vary in precision and licence. Require explicit reuse rights and a visible operator/date/source label. |

## Statistical and contextual candidates

| Source | Potential use | Status | Accuracy and product-language controls |
|---|---|---|---|
| ITU DataHub | Country-level connectivity and ICT indicators | **Candidate / disconnected** | Periodic national statistics. Always show indicator definition, reference year and methodology. Not live traffic. |
| World Bank indicators | Country-level digital-development context | **Candidate / disconnected** | Preserve indicator code, reference year, revision and aggregation limitations. |
| Natural Earth | Coastlines and political-boundary context | **Candidate / disconnected** | Cartographic context only. Boundary disputes and data scale must be handled explicitly. |
| User-supplied verified datasets | Reproducible project-specific overlays | **Deferred** | Require source URL, licence, schema, timestamp, transformation log, uncertainty field and validation report before import. |

## Activation gate for every candidate

A candidate may be activated only after all of the following are recorded and tested:

1. Exact product, endpoint, version or dataset release.
2. Licence, attribution, redistribution and cache permissions.
3. Measurement semantics: what was actually observed, by whom, where and when.
4. Geographic, temporal and sampling coverage.
5. Rate limits, authentication, failure modes and freshness policy.
6. Raw-response retention policy and deterministic transformation steps.
7. Identifier reconciliation and deduplication rules.
8. Uncertainty/confidence representation.
9. UI wording that cannot be mistaken for global live traffic.
10. Tests using fixtures, stale data, missing data, partial data and contradictory sources.

No quantity may be labelled “live Internet traffic” unless the connected source directly supports that claim at the displayed scope and time resolution.
