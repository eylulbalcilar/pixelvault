import { useState, useEffect } from 'react'
import { getAllNFTs, createNFT, updateNFT, deleteNFT } from '../services/nftService'

const useNFTs = () => {
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchNFTs()
  }, [])

  const fetchNFTs = async () => {
    try {
      const data = await getAllNFTs()
      setNfts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addNFT = async (nftData) => {
    try {
      const newNFT = await createNFT(nftData)
      setNfts([...nfts, newNFT])
    } catch (err) {
      throw new Error('Failed to add NFT: ' + err.message)
    }
  }

  const editNFT = async (id, nftData) => {
    try {
      const updated = await updateNFT(id, nftData)
      setNfts(nfts.map(nft => nft._id === id ? updated : nft))
    } catch (err) {
      throw new Error('Failed to update NFT: ' + err.message)
    }
  }

  const removeNFT = async (id) => {
    try {
      await deleteNFT(id)
      setNfts(nfts.filter(nft => nft._id !== id))
    } catch (err) {
      throw new Error('Failed to delete NFT: ' + err.message)
    }
  }

  return { nfts, loading, error, addNFT, editNFT, removeNFT }
}

export default useNFTs
