# PixelVault 

A modern NFT collection manager. Browse, manage, and track real NFTs from top collections like BAYC, Doodles, and Azuki.

##  Features

- Browse real NFTs fetched from Alchemy API (BAYC, Doodles, Azuki)
- Add, edit, and delete NFTs from your collection
- Search and filter by name, creator, or category
- NFT detail page with full info
- Live crypto price ticker (BTC, ETH, SOL, DOGE, BNB)
- Connect MetaMask wallet
- Responsive, clean UI

## 🛠 Tech Stack

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
- MongoDB (running locally)
- MetaMask browser extension

### Backend Setup
```bash
cd vault-api
npm install
# Create .env file with:
# MONGO_URI=mongodb://localhost:27017/nftvault
# ALCHEMY_URL=your_alchemy_url
# PORT=5001
npm run dev
```

### Seed NFT Data
```bash
node src/fetchNFTs.js
```

### Frontend Setup
```bash
cd pixelvault
npm install
npm run dev
```

## 📁 Project Structure
```
nft_collection/
├── pixelvault/          # React frontend
│   └── src/
│       ├── components/  # Header, NFTCard, NFTForm...
│       ├── pages/       # HomePage, NFTDetailPage
│       ├── hooks/       # useNFTs
│       └── services/    # nftService
└── vault-api/           # Express backend
    └── src/
        ├── controllers/
        ├── models/
        ├── routes/
        └── fetchNFTs.js
```
