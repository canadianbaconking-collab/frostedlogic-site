# Frosted//Logic site specification

## Positioning

Independent systems and security practice. The canonical philosophy is:

**Trust deliberately. Enforce predictably. Keep systems understandable.**

The homepage introduces security focus areas as conversation topics, not verified professional credentials, contracted coverage, or a catalogue of guaranteed services. About identifies Richard McMillan and distinguishes the existing tools from the growing security focus.

## Presentation

- Homepage and About share `styles/security.css` and `security.js`.
- Dark glass surfaces, neutral readable text, and yellow → orange → purple ambient light.
- The ambient layer drifts on a 32-second alternating transform animation.
- Reduced-motion preferences produce a static composition.
- Glass has an opaque fallback without backdrop-filter.
- The existing logo assets are unmodified.
- System fonts avoid third-party font requests and additional build dependencies.
- Content is present immediately; navigation remains available without JavaScript.
- Mobile navigation uses an explicit Menu button with expanded state, Escape support, and focus handling.

## Routes and products

All existing top-level filenames remain unchanged:

`/`, `/about.html`, `/tools.html`, `/instruments.html`, `/games.html`,
`/operations-review.html`, `/envcheck.html`, `/jsonsanity.html`,
`/schemafirst.html`, `/glyphscope.html`.

Cloudflare handles extensionless paths as before. Do not add a router or rewrite rules.

Tools, Instruments, Games, Operations Review, and the product landing pages retain their content and links. The shared theme supplies the darker background and a contrast-safe accent on existing white buttons. Product-specific behavior remains factual feature copy, not a separate brand doctrine.

The homepage highlights EnvCheck with an explicitly illustrative comparison, not a customer case study. Payhip URLs and the existing public contact email are unchanged.

## Hosting contract

The repository is static HTML/CSS/JS, with no package manifest, generated output, Workers runtime, or build dependency. Cloudflare Pages' GitHub integration deployed baseline commit `8fcbd56b449e4c79d3d58e15ef61e3b59e86bc54` successfully.

Preserve the existing Pages project, publishing directory, build setting, production branch, DNS, custom domains, redirects, environment variables, and account permissions. None is changed by this redesign.

The homepage and About no longer load the legacy intro/navigation-transition scripts. Those files remain unchanged for other pages.

## Verification

Run the dependency-free checks from the repository root:

```powershell
Set-Location C:/dev/playground/frostedlogic-site
python tests/check_site.py
node --check security.js
git diff --check
python -m http.server 8080
```

The static checks cover changed-page landmarks, local assets and navigation destinations, anchors, logo dimensions, doctrine replacement, motion/fallback rules, and product/hosting preservation against the recorded baseline when Git is available. They are not a substitute for browser testing.

No npm build, lint, or test command exists; do not invent one. Cloudflare's actual preview deployment is the integration test for static publishing.

## Pre-existing route caveats

At baseline, the repository has no `envcheck/free/index.html`; the former tool is under `_old_site_backup`. A live request to `/envcheck/free/` returned homepage HTML. The free-tool link is preserved, not silently rerouted as part of this design change. Do not report it as a working free tool.

No backup files or product assets were deleted. Restoring archived tools is a separate task.
