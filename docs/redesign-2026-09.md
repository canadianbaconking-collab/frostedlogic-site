# Frosted Logic site refresh — September 2026

The current public site consists of `/` and `/about.html`. They present security architecture, AI and cloud control work, the three-part doctrine, and a direct email contact path. The old navigation and tool catalogue are consolidated at `/old-website/`, linked only in the current site's footer. Legacy page URLs remain intact so earlier bookmarks and product links continue to resolve.

The brand mark at `/images/frosted-mark.svg` reconstructs the original logo's asymmetric slanted crystal bars, small side shards, and cool blue facets as vector geometry. The homepage adds symmetric circuit traces and a wordmark reveal. Motion finishes in about 1.3 seconds and does not block reading or navigation; reduced-motion users see the finished lockup immediately. No rasterized concept mockup is used in the page.

Hosting remains static Cloudflare Pages from the GitHub `main` branch. There is no package or build step. Run `python tests/check_site.py`, `node --check security.js`, and `git diff --check` before pushing. Pushing `main` triggers the existing Pages Git integration. No Cloudflare configuration, custom domain, redirects, or environment variables are changed by this update.
