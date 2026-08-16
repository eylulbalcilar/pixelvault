import NFT from '../models/nft.model.js'

export const getAllNFTs = async (req, res) => {
  try {
    const nfts = await NFT.find()
    res.status(200).json(nfts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const REQUIRED_FIELDS = ['name', 'creator', 'price', 'category', 'description', 'imageUrl']

export const createNFT = async (req, res) => {
  try {
    const missing = REQUIRED_FIELDS.filter((field) => !req.body[field])
    if (missing.length > 0) {
      return res.status(400).json({ message: `Missing fields: ${missing.join(', ')}` })
    }
    const { name, creator, price, category, description, imageUrl } = req.body
    const nft = new NFT({ name, creator, price, category, description, imageUrl })
    const saved = await nft.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateNFT = async (req, res) => {
  try {
    const { name, creator, price, category, description, imageUrl } = req.body
    const updated = await NFT.findByIdAndUpdate(
      req.params.id,
      { name, creator, price, category, description, imageUrl },
      { new: true, runValidators: true }
    )
    if (!updated) {
      return res.status(404).json({ message: 'NFT not found' })
    }
    res.status(200).json(updated)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteNFT = async (req, res) => {
  try {
    const deleted = await NFT.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'NFT not found' })
    }
    res.status(200).json({ message: 'NFT deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getNFTById = async (req, res) => {
  try {
    const nft = await NFT.findById(req.params.id)
    if (!nft) {
      return res.status(404).json({ message: 'NFT not found' })
    }
    res.status(200).json(nft)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
