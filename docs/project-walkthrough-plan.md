# Service-linked engineering walkthroughs

Accepted direction: demonstrated methods (option 2) plus service-linked evidence (option 4).

## Implementation

1. Place selected engineering work directly after Services. Feature Coldgate, then Driftglass and SignalForge. Keep the established terminal theme and existing Cloudflare Pages integration.
2. Add /work/coldgate.html, /work/driftglass.html and /work/signalforge.html. Each explains a problem, synthetic input, reproduced result, interpretation, limits, source revision and relevant engagement.
3. Give service cards separate enquiry and example links. Link AI security to Coldgate/Driftglass, systems decisions to SignalForge, reviews to Coldgate and implementation to Driftglass. Preserve the existing service catalogue.
4. Publish inspectable JSON evidence and a dependency-free reproduction script. Pin source commits; do not imply live enforcement, customer outcomes, independent validation or calibrated confidence.
5. Run existing site checks, check new local links/anchors and syntax, verify the demonstrations, and open a PR against main. Main is the existing production deployment branch; no hosting migration is part of this work.

## Acceptance

- Work navigation reaches implemented projects rather than prospective engagements.
- All three pages are readable without JavaScript; tables/code remain usable at narrow widths.
- Every output is marked synthetic, dated and tied to its source commit.
- Each page links evidence, repository, limitations and a relevant enquiry.
- Existing brand assets, legacy routes, contact address and hosting settings remain intact.

## Follow-up

Before production merge, visually review desktop/mobile rendering and the Cloudflare preview if available. Later replace or supplement synthetic walkthroughs with permissioned independent pilot evidence. Refresh pinned evidence only by rerunning and reviewing outputs. No mutable PR or test-count badges on marketing pages.

## First implementation — 2026-10-16

Completed homepage placement, service/example links, About navigation, three walkthrough pages, dedicated responsive CSS, and full synthetic evidence JSON. The reproduction script checks clean pinned checkouts and asserts the public result claims. All three examples reproduced on Linux / Node 24.19.0; the five existing site checks, JavaScript syntax and diff whitespace checks passed. A separate structural check covered all five current pages, their local links, anchors and assets.

Browser rendering was not inspected: this managed runtime has no supported browser QA tool. Desktop/mobile visual review remains an explicit PR gate. This branch is a reviewable first revision; production deployment is not claimed.
