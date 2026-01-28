# Buy Links Audit (repo-wide)

Generated: 2026-01-28

## Summary of findings

- **Current live purchase links are Payhip URLs**, not Lemon Squeezy or Gumroad.
  - EnvCheck: `https://payhip.com/b/oOtWK`
  - JSONSanity: `https://payhip.com/b/delz3`
- **No active Gumroad links or `GUMROAD_URL_PLACEHOLDER` occurrences were found** in the code-search results used for this audit.
- **Lemon Squeezy is referenced only as a script include** (not a checkout link) in `indexoldv2.html`:
  - `https://app.lemonsqueezy.com/js/lemon.js`

> Note: GitHub code search API responses are limited to 10 results per query, so results may be incomplete. To review additional matches in the GitHub UI, use the search links provided at the bottom of this document.

## EnvCheck link locations (file path + current URL)

- `index.html` — `https://payhip.com/b/oOtWK`
- `envcheck/index.html` — `https://payhip.com/b/oOtWK`

## JSONSanity link locations (file path + current URL)

- `index.html` — `https://payhip.com/b/delz3`
- `jsonsanity/index.html` — `https://payhip.com/b/delz3`

## Other purchase/checkout-related hits (not EnvCheck/JSONSanity purchase links)

- `indexoldv2.html` — includes Lemon Squeezy script: `https://app.lemonsqueezy.com/js/lemon.js` (script include, not a checkout link)
- `indexoldv2.html` — contains a placeholder button: `<a href="#" ...>Buy Microtool</a>`

## GitHub UI search links (for completeness)

- Lemon Squeezy:
  - https://github.com/canadianbaconking-collab/frostedlogic-site/search?q=lemonsqueezy&type=code
  - https://github.com/canadianbaconking-collab/frostedlogic-site/search?q=%22app.lemonsqueezy.com%22&type=code
  - https://github.com/canadianbaconking-collab/frostedlogic-site/search?q=%22frostedlogic.lemonsqueezy.com%22&type=code
- Gumroad:
  - https://github.com/canadianbaconking-collab/frostedlogic-site/search?q=gumroad&type=code
  - https://github.com/canadianbaconking-collab/frostedlogic-site/search?q=GUMROAD_URL_PLACEHOLDER&type=code
- Generic checkout/buy:
  - https://github.com/canadianbaconking-collab/frostedlogic-site/search?q=checkout&type=code
  - https://github.com/canadianbaconking-collab/frostedlogic-site/search?q=buy&type=code
