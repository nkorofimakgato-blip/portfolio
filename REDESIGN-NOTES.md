# Portfolio redesign — Minimal Premium

This update refreshes the portfolio with a light editorial visual system, restrained motion, responsive layouts and interactive project previews.

## Run locally

1. Install Node.js (current LTS).
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local URL printed by Vite.

## Build

Run `npm run build`.

## Notes
- Existing project images, profile photo, certificate, project links and Nkorofi AI chat widget are retained.
- Scroll reveals use the browser's Intersection Observer API and respect reduced-motion preferences.
- Add any required server credentials to a local `.env.local` file. Never commit or publish `.env*` files.
- Review the Neon Drift live URL in `src/components/Projects.tsx`; the existing URL appears to be a placeholder.
