# PixelVault — project context for Claude

## What this is

An NFT gallery app (browse/add/edit/delete NFT listings, live crypto price ticker, MetaMask wallet connect display). Originally a school assignment for learning backend fundamentals — not a real web3/blockchain project. No smart contracts, no on-chain transactions. The Alchemy NFT API is used read-only to pull real NFT metadata for display; wallet connect only reads the address, never signs anything.

Owner is a student preparing this for LIA (internship) applications, both frontend and backend framing depending on the role.

## Live

- Frontend: https://pixelvault-three.vercel.app (Vercel, auto-deploys on push to `main`)
- Backend API: https://pixelvault-e9lh.onrender.com/api (Render, auto-deploys on push to `main`, free tier — spins down on inactivity, first request can take ~50s)
- Database: MongoDB Atlas, free M0 cluster

## Repo structure

```
pixelvault/
├── pixelvault/     # React + Vite frontend
│   └── src/{components,pages,hooks,services}/
└── vault-api/      # Express + Mongoose backend
    └── src/{controllers,models,routes}/, fetchNFTs.js (seed script)
```

## Current stack

- Frontend: React, Vite, React Router, plain JS (no TS), custom CSS (no framework)
- Backend: Node/Express, MongoDB/Mongoose, plain JS (no TS)
- No tests anywhere (frontend or backend)
- No CI/CD

## Roadmap / what's being worked toward next

The owner wants to develop this further to be a stronger portfolio piece. Planned work, roughly in order:

1. **TypeScript migration** — both frontend (React components, hooks, services) and backend (Express routes/controllers, Mongoose models). Do incrementally, not a big-bang rewrite.
2. **Testing** — frontend: Vitest + React Testing Library for components/hooks. Backend: Vitest or Jest + Supertest for the API routes, likely against an in-memory Mongo (mongodb-memory-server) rather than hitting Atlas.
3. Other likely gaps worth raising when relevant: accessibility (no aria labels/keyboard nav audit done), no CI pipeline, no input sanitization beyond required-field checks, price field has no positive-number validation.

When picking up this work, treat it as incremental improvement on a working, deployed app — don't break the live site. Confirm before any destructive DB operation (seeding wipes and reseeds the whole collection) or before pushing to `main` since it auto-deploys to production.

## Gotchas learned the hard way (don't re-learn these)

- **Alchemy NFT API URL format**: must be `https://{network}.g.alchemy.com/nft/v3/{apiKey}/...`, NOT `https://{network}.g.alchemy.com/v2/{apiKey}/nft/v3/...`. The `ALCHEMY_URL` env var is stored as the `/v2/{apiKey}` RPC URL; `fetchNFTs.js` derives the NFT API base by replacing `/v2/` with `/nft/v3/`.
- **Alchemy NFT API v3 response shape** (current, as of Aug 2026): NFT name is `nft.name` (not `nft.title`), token id is `nft.tokenId` as a plain decimal string (not `nft.id.tokenId`, not hex), image is `nft.image?.cachedUrl` or `nft.raw?.metadata?.image` (not `nft.metadata?.image` / `nft.media`). This API has changed shape before — if seeding produces empty/weird names again, re-inspect the raw response before assuming the old field names still apply.
- **Backend CORS**: reads `CLIENT_URL` env var, must be set on Render to the exact Vercel origin (`https://pixelvault-three.vercel.app`) or the frontend gets silent "Failed to fetch" errors. Falls back to `http://localhost:5173` if unset.
- **MongoDB Atlas network access**: must allow `0.0.0.0/0` in Network Access (Render has no fixed outbound IP).
- **`fetchNFTs.js` is destructive**: `deleteMany()` then `insertMany()` — wipes the whole `nfts` collection every run. It has a guard to skip if Alchemy returns zero NFTs, but it will happily nuke real data otherwise. Never wire this to an unauthenticated route (already tried once, correctly blocked).
- **Wallet auto-check regression**: an earlier attempt at auto-checking `window.ethereum` via `eth_accounts` on component mount (to persist wallet connection across refreshes) caused real wallet extensions to redirect the page on load. Removed. If re-adding "remember wallet connection," test it in a real browser with an actual wallet extension installed first, not just a clean automated browser.
- Local dev `.env` files (`vault-api/.env`, `pixelvault/.env`) are gitignored and not committed — recreate them locally when needed (`MONGO_URI`, `PORT`, `CLIENT_URL`, `ALCHEMY_URL` for backend; `VITE_API_URL` for frontend).

## Framing note

Don't market this as "web3 development" — it isn't (no smart contracts, no on-chain calls). Accurate framing: full-stack CRUD app with React frontend, Express/MongoDB backend, real third-party API integrations (Alchemy, CoinGecko), MetaMask address display. This is a stronger, more defensible pitch for internship applications than overselling blockchain expertise the project doesn't demonstrate.
