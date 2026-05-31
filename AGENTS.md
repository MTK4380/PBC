# AGENTS.md

Guidance for AI agents working in this repository.

## Project overview

**Pneumatic Business Consultants (PBC)** is a static marketing and tyre-catalog website (HTML, CSS, vanilla JavaScript). There is no backend, no build step, and no `package.json`. Data lives in embedded JS catalog modules; the quotation basket and admin listings use browser `localStorage` / `sessionStorage`.

Production is deployed via GitHub Actions to GitHub Pages (see `.github/workflows/pages.yml`).

## Cursor Cloud specific instructions

### Services

| Service | Required locally? | Notes |
|---------|-------------------|--------|
| Static HTTP server | **Yes** | Serve the repo root. Any static server works (`python3 -m http.server`, `npx serve`, etc.). |
| Browser | **Yes** | For shop filters, quotation basket, admin UI, and WhatsApp quote handoff. |
| Google Fonts CDN | Optional | Loaded from HTML; falls back to system fonts if offline. |
| WhatsApp (`wa.me`) | Optional | External; needed only to complete the full quote handoff flow. |

There are **no** databases, APIs, Docker Compose stacks, or in-repo microservices.

### Running locally

From the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/` (or `127.0.0.1`). Port is arbitrary; `8000` is a common default.

Use **tmux** (or similar) for long-running dev servers so sessions survive backgrounding.

### Lint / test / build

This repo has **no** configured ESLint, Prettier, unit tests, or bundler. “Verification” for changes is:

1. Serve the site over HTTP (not `file://` — `localStorage` and some paths behave poorly on `file://`).
2. Manually or programmatically exercise affected pages in a browser.

For automated smoke/E2E of the quotation flow, Playwright against `http://127.0.0.1:8000` works well (install Playwright outside the repo if needed).

### Key pages and flows

- **Shop:** `shop.html` — filter catalogue, **Add to Quote** (writes `pbc-quotation-items` in `localStorage`).
- **Quotation:** `quote.html` — basket UI in `#quotation-root`; WhatsApp send via `js/quote-actions.js`.
- **Admin:** `admin.html` — client-side login; default password in `js/config.js` (`PBC_CONFIG.admin.password`, default `pbcadmin`).

### Gotchas

- Always test over **HTTP**, not by opening HTML files directly in the browser.
- Quotation state is per-origin in `localStorage`; clear `pbc-quotation-items` when you need a clean basket.
- PayPal/JazzCash entries in `js/config.js` are placeholders; payment SDKs are not wired in the frontend.
