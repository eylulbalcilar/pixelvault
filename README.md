# PixelVault

A full-stack NFT gallery app: browse, add, edit and delete NFT listings backed by real collection data (BAYC, Doodles, Azuki) pulled from the Alchemy NFT API, with a live crypto price ticker and MetaMask wallet connect.

Built to learn backend fundamentals — REST API design, MongoDB/Mongoose, and integrating third-party APIs — using an NFT theme as the subject matter. Wallet connect is display-only (shows the connected address); there's no on-chain read/write or smart contract interaction.

**Live demo:** [pixelvault-three.vercel.app](https://pixelvault-three.vercel.app) · **API:** [pixelvault-e9lh.onrender.com/api/nfts](https://pixelvault-e9lh.onrender.com/api/nfts)

##  Features

- Browse real NFTs fetched from the Alchemy NFT API (BAYC, Doodles, Azuki)
- Add, edit, and delete NFTs from the collection (CRUD against a MongoDB-backed REST API)
- Search and filter by name, creator, or category
- NFT detail page with full info
- Live crypto price ticker (BTC, ETH, SOL, DOGE, BNB) via CoinGecko
- Connect MetaMask wallet (address display only)
- Responsive layout (mobile / tablet / desktop)

##  Tech Stack

**Frontend**
- React + Vite
- React Router DOM
- Custom CSS

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Alchemy API (NFT data)
- CoinGecko API (crypto prices)

##  Getting Started

### Prerequisites
- Node.js
- MongoDB (running locally, or an Atlas connection string)
- MetaMask browser extension (optional, only needed to test wallet connect)
- An [Alchemy](https://www.alchemy.com/) API key (only needed to run the seed script)

### Backend Setup
```bash
cd vault-api
npm install
# Create a .env file with:
# MONGO_URI=mongodb://localhost:27017/nftvault
# PORT=5001
# CLIENT_URL=http://localhost:5173
# ALCHEMY_URL=https://eth-mainnet.g.alchemy.com/v2/<your-api-key>
npm run dev
```

### Seed NFT Data
Fetches fresh NFTs from Alchemy and replaces the current collection.
```bash
node src/fetchNFTs.js
```

### Frontend Setup
```bash
cd pixelvault
npm install
# Optional: create a .env with VITE_API_URL=http://localhost:5001/api
# to point at a local backend instead of the deployed one
npm run dev
```

##  Project Structure
```
pixelvault/
├── pixelvault/           # React frontend
│   └── src/
│       ├── components/   # Header, NFTCard, NFTForm...
│       ├── pages/        # HomePage, NFTDetailPage
│       ├── hooks/        # useNFTs
│       └── services/     # nftService
└── vault-api/             # Express backend
    └── src/
        ├── controllers/
        ├── models/
        ├── routes/
        └── fetchNFTs.js
```
