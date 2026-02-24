# Frosted//Logic Website Spec Extraction

## 1) Product + Site Intent
- **Primary site goal:** Present Frosted//Logic as an independent studio focused on developer clarity, then route visitors into product pages (Tools), concept tracks (Instruments/Games), and contact.
- **Core positioning:** “Reduce cognitive friction” through deterministic, local-first software and readable systems.
- **Conversion model:** Lightweight brochure flow with direct CTAs to product pages, free web tools, and Payhip purchase links.

## 2) Information Architecture (IA)

### Primary navigation
- Tools
- Instruments
- Games
- About
- Contact (mailto)

### Top-level pages extracted
- `/` (home/brand narrative)
- `/tools.html` (tool index)
- `/instruments.html` (instrument concepts)
- `/games.html` (interactive systems concepts)
- `/about.html` (studio framing)
- `/envcheck.html` (tool landing)
- `/jsonsanity.html` (tool landing)
- `/schemafirst.html` (tool landing)
- `/glyphscope.html` (tool landing)

### Tool funnel structure
1. Discover tool from `/tools.html`
2. Read single-product pitch page
3. Click CTA to either:
   - Buy on Payhip
   - Open free/browser version (where available)

## 3) Global UX/UI Spec

### Layout system
- **Home (`/`)** uses centered page container and animated hero/logo sequence.
- **Section pages** (`tools/instruments/games/about`) use a 2-column layout:
  - Left sticky brand/nav rail (desktop)
  - Right content column
- **Product pages** use single-column marketing layout with topbar + hero + section stack.

### Visual design language
- **Background:** Blue diagonal gradient (`--site-bg`) for a consistent brand field.
- **Cards/surfaces:** Frosted-glass style blocks (semi-transparent white backgrounds + rounded corners + blur).
- **Typography:** System sans stack; heavy headings and plain-language body copy.
- **Buttons/links:** Rounded pills with white outlines; primary CTA buttons invert to white fill.

### Design tokens inferred
- `--site-bg: linear-gradient(135deg, #5B9FD4 0%, #4A8BC2 100%)`
- `--site-accent: #4A8BC2`
- Product page utility tokens:
  - `--fg`, `--muted`, `--card`, `--cardBorder`, `--btnBorder`

### Responsive behavior
- Breakpoints primarily at ~`820px` or `860px`.
- Desktop: sticky side rail where applicable.
- Mobile: layouts collapse to one column, nav/buttons stack, large headings scale down.

## 4) Motion + Interaction Spec

### Entry animation model
- Home page runs a staged logo sequence (`focus → retreat → reveal`) with timed blur/sharpen/position transitions.
- Non-home pages use staggered reveal-on-load by adding target classes + CSS transition delays.

### Navigation transition model
- Internal links are intercepted (same-origin path links).
- A full-screen overlay briefly fades in before route change (`BLANK_BEAT_MS`), creating a “blank beat” transition.
- External links, hashes, and modified clicks are not intercepted.

### Accessibility/reduced motion
- `prefers-reduced-motion: reduce` disables transition choreography and reveals content immediately.

## 5) Page-by-Page Functional Spec

## `/` Home
- Animated logo intro and staged reveal of nav/content.
- Narrative sections:
  - Who we are
  - How we design
  - Three system categories (Microtools, Instruments, Interactive Systems)
- Footer line + explicit site version label (`v6.00`).

## `/tools.html`
- Mission statement for tools.
- Grid/list of 4 tool cards with screenshot + short value prop:
  - EnvCheck
  - JSONSanity
  - SchemaFirst
  - GlyphScope
- Each card links to dedicated tool page.

## `/instruments.html`
- Defines “instruments” as decision-intelligence systems.
- Highlights SignalForge (active development) and AlphaTrace (internal research).

## `/games.html`
- Frames games as interactive decision systems.
- Lists active concepts: Fracture Protocol, The Iron Outlaw, Cascadia.

## `/about.html`
- Company/studio narrative and operating philosophy.
- Reinforces triad: microtools, instruments, interactive systems.

## `/envcheck.html`
- Product page for .env comparison tool.
- CTA set: Buy + free version link.
- Feature bullets, 3-step workflow, screenshot, FAQ, privacy emphasis (local-only).

## `/jsonsanity.html`
- Product page for offline JSON validator + sanity checker.
- CTA set: Buy.
- “What it does”, “Why offline”, 3-step process, screenshot, FAQ.

## `/schemafirst.html`
- Product page for schema-aware CSV→JSON conversion.
- CTA set: Buy.
- Feature bullets, 3-step process, screenshot, FAQ.

## `/glyphscope.html`
- Product page for deterministic regex explanation.
- CTA set: free online + offline pro buy link.
- Includes “what it is / not”, process, free vs pro, privacy, ZIP contents, getting started.

## 6) Copywriting + Messaging Spec (Feel & Tone Notes)

### Core tone profile
- **Pragmatic and anti-hype:** Avoids buzzwords, repeatedly rejects “vibes,” noise, and unnecessary complexity.
- **Engineering-forward:** Emphasizes deterministic behavior, local execution, and trust via explicit constraints.
- **Calm confidence:** Short declarative lines, direct claims, minimal fluff.
- **Privacy-assuring:** Repeated “runs locally,” “no uploads,” “no tracking,” “no backend” statements.

### Messaging patterns
- Frequent use of triads and contrasts:
  - “Clarity over feature count”
  - “Determinism where possible”
  - “Local-first by default”
- “What it is / what it is not” framing to narrow expectations.
- Outcome language centered on reduced cognitive load and faster, safer decisions.

### Brand personality distilled
- **Builder archetype:** disciplined, systems-oriented, reliability-first.
- **Audience assumption:** developers and technical operators who value predictability over novelty.

## 7) Content + Product Strategy Signals
- Studio is organized into three parallel tracks:
  1. Shipping microtools (current monetization path)
  2. Developing intelligence instruments (longer-horizon differentiation)
  3. Exploring game-like interactive systems (experimental R&D loop)
- Current commercial emphasis appears strongest in microtool pages via clear pay links and concrete utility framing.

## 8) Technical Implementation Notes (Extracted)
- Site is static HTML/CSS/JS (no framework dependency evident in the extracted pages).
- Shared behavior layers:
  - `brand.js` for reveal/nav transitions + bfcache recovery handling.
  - `shared-reveal.js` + `shared-reveal.css` for generic staggered reveal.
  - `brand.css` for overlay + reveal helpers + site-version styling.
- Version marker appears manually in page content (`Frosted//Logic site — v6.00`).

## 9) Spec Gaps / Ambiguities
- No explicit analytics/telemetry implementation found in extracted page set.
- No canonical design system doc; token usage is consistent but distributed across files.
- Some pages reference `/styles.css`; availability/usage is unclear from current top-level extraction.

## 10) Final Extraction Summary
Frosted//Logic is a static, clarity-first product studio website with a cohesive visual shell, lightweight motion system, and strongly opinionated technical voice. The site’s functional center is microtool conversion (product pages + buy links), while Instruments and Games communicate strategic direction and worldview. Tone is disciplined, privacy-forward, deterministic, and intentionally anti-marketing in style.
