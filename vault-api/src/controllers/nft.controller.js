import NFT from "../models/nft.model.js";

export const getAllNFTs = async (req, res) => {
  try {
    const nfts = await NFT.find();
    res.status(200).json(nfts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REVIEW: No input validation or sanitization. req.body is passed directly to Mongoose.
// Consider validating required fields and stripping unexpected properties before saving.
export const createNFT = async (req, res) => {
  try {
    const nft = new NFT(req.body);
    const saved = await nft.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateNFT = async (req, res) => {
  try {
    const updated = await NFT.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // REVIEW: If the id doesn't match any document, `updated` is null but you still return
    // 200 with null. Should check for null and return 404.
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteNFT = async (req, res) => {
  try {
    // REVIEW: Same issue — findByIdAndDelete returns null if the id doesn't exist, but you
    // still return 200 "deleted successfully". Should check and return 404 if not found.
    await NFT.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "NFT deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNFTById = async (req, res) => {
  try {
    const nft = await NFT.findById(req.params.id);
    // REVIEW: No null check — returns 200 with null body when the NFT doesn't exist.
    // Should return 404 with an appropriate message.
    res.status(200).json(nft);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
