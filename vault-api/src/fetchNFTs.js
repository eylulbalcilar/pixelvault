import mongoose from "mongoose";
import dotenv from "dotenv";
import NFT from "./models/nft.model.js";

dotenv.config();

const collections = [
  {
    address: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
    name: "Doodles",
    category: "Art",
  },
  {
    address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    name: "BAYC",
    category: "Art",
  },
  {
    address: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
    name: "Azuki",
    category: "Art",
  },
];

// REVIEW: The entire function lacks a try/catch. If any fetch or DB operation fails, the
// process crashes with an unhandled promise rejection and the DB connection is never closed.
const fetchAndSeedNFTs = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");

  let allNFTs = [];

  for (const collection of collections) {
    // REVIEW: No error handling on this fetch. If Alchemy is down or the key is invalid,
    // response.json() will throw or return unexpected data.
    const response = await fetch(
      `${process.env.ALCHEMY_URL}/nft/v3/getNFTsForCollection?contractAddress=${collection.address}&withMetadata=true&limit=8`,
    );
    const data = await response.json();

    const nfts = data.nfts.map((nft) => ({
      name: nft.title || `${collection.name} #${nft.id.tokenId}`,
      creator: collection.name,
      price: parseFloat((Math.random() * 50 + 1).toFixed(2)),
      category: collection.category,
      description: nft.description || `${collection.name} NFT`,
      // REVIEW: `nft.media[0]?.gateway` will throw if `nft.media` is undefined (optional
      // chaining is only on the array element, not the array itself). Use `nft.media?.[0]?.gateway`.
      imageUrl: (nft.metadata?.image || nft.media[0]?.gateway || "").replace(
        "ipfs://",
        "https://ipfs.io/ipfs/",
      ),
    }));

    allNFTs = [...allNFTs, ...nfts];
    console.log(`${collection.name} fetched`);
  }

  // REVIEW: deleteMany() with no filter wipes the entire collection every time this runs.
  // Consider an upsert strategy to avoid data loss if re-seeding.
  await NFT.deleteMany();
  await NFT.insertMany(allNFTs);
  console.log(`${allNFTs.length} NFTs seeded successfully `);
  mongoose.connection.close();
};

fetchAndSeedNFTs();
