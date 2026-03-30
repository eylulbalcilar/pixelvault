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
    const newNFT = await createNFT(nftData)
    setNfts([...nfts, newNFT])
  }

  const editNFT = async (id, nftData) => {
    const updated = await updateNFT(id, nftData)
    setNfts(nfts.map(nft => nft._id === id ? updated : nft))
  }

  const removeNFT = async (id) => {
    await deleteNFT(id)
    setNfts(nfts.filter(nft => nft._id !== id))
  }

  return { nfts, loading, error, addNFT, editNFT, removeNFT }
}

export default useNFTs
