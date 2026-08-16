import mongoose from 'mongoose'
import dotenv from 'dotenv'
import NFT from './models/nft.model.js'

dotenv.config()

const collections = [
  
    {
    address: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e',
    name: 'Doodles',
    category: 'Art'
    },
    {
    address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    name: 'BAYC',
    category: 'Art'
  },
  {
    address: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
    name: 'Azuki',
    category: 'Art'
  },
  
]

const fetchAndSeedNFTs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')

    let allNFTs = []

    for (const collection of collections) {
      const response = await fetch(
        `${process.env.ALCHEMY_URL}/nft/v3/getNFTsForCollection?contractAddress=${collection.address}&withMetadata=true&limit=12`
      )
      const data = await response.json()

      const nfts = data.nfts.map(nft => {
        const tokenId = nft.id.tokenId.startsWith('0x')
          ? parseInt(nft.id.tokenId, 16)
          : nft.id.tokenId
        return {
          name: nft.title || `${collection.name} #${tokenId}`,
          creator: collection.name,
          price: parseFloat((Math.random() * 50 + 1).toFixed(2)),
          category: collection.category,
          description: nft.description || `${collection.name} NFT`,
          imageUrl: (nft.metadata?.image || nft.media?.[0]?.gateway || '').replace('ipfs://', 'https://ipfs.io/ipfs/'),
        }
      })

      allNFTs = [...allNFTs, ...nfts]
      console.log(`${collection.name} fetched`)
    }

    if (allNFTs.length === 0) {
      console.log('No NFTs fetched, aborting seed to avoid wiping the collection')
      return
    }

    await NFT.deleteMany()
    await NFT.insertMany(allNFTs)
    console.log(`${allNFTs.length} NFTs seeded successfully `)
  } catch (err) {
    console.error('Seeding failed:', err)
  } finally {
    await mongoose.connection.close()
  }
}

fetchAndSeedNFTs()
