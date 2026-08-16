import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LiveTicker from '../components/LiveTicker'
import NFTForm from '../components/NFTForm'
import { getNFTById, updateNFT, deleteNFT } from '../services/nftService'

const NFTDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nft, setNft] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    getNFTById(id)
      .then(data => {
        if (data && data._id) setNft(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  const handleEdit = async (formData) => {
    try {
      await updateNFT(id, formData)
      const updated = await getNFTById(id)
      setNft(updated)
      setShowForm(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteNFT(id)
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="loading">Loading...</div>
  if (!nft) return <div className="error">NFT not found</div>

  return (
    <div className="app">
      <Header onAddClick={() => setShowForm(true)} showSearch={false} />
      <LiveTicker />
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <NFTForm
              onSubmit={handleEdit}
              editingNFT={nft}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
      <div className="detail-page">
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <div className="detail-content">
          <div className="detail-image">
            <img src={nft.imageUrl} alt={nft.name} />
          </div>
          <div className="detail-info">
            <span className="detail-category">{nft.category}</span>
            <h1>{nft.name}</h1>
            <p className="detail-creator">by {nft.creator}</p>
            <p className="detail-description">{nft.description}</p>
            <div className="detail-price">
              <div className="detail-price-box">
                <p className="detail-price-label">Price</p>
                <span>{nft.price} ETH</span>
              </div>
            </div>
            <div className="detail-actions">
              <button className="btn-edit" onClick={() => setShowForm(true)}>Edit</button>
              <button className="btn-delete" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NFTDetailPage
