import { useState, useEffect } from 'react'
import Header from '../components/Header'
import NFTList from '../components/NFTList'
import NFTForm from '../components/NFTForm'
import Notification from '../components/Notification'
import Footer from '../components/Footer'
import LiveTicker from '../components/LiveTicker'
import useNFTs from '../hooks/useNFTs'

const HomePage = () => {
  const { nfts, loading, error, addNFT, editNFT, removeNFT } = useNFTs()
  const [editingNFT, setEditingNFT] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState({ message: '', type: '' })

  const filteredNFTs = nfts.filter(nft =>
    nft.name.toLowerCase().includes(search.toLowerCase()) ||
    nft.creator.toLowerCase().includes(search.toLowerCase()) ||
    nft.category.toLowerCase().includes(search.toLowerCase())
  )
  useEffect(() => {
  const params = new URLSearchParams(window.location.search)
    if (params.get('addNFT') === 'true') {
        setShowForm(true)
        window.history.replaceState({}, '', '/')
    }
    }, [])

  const showNotification = (message, type) => {
    setNotification({ message, type })
  }

  const handleSubmit = async (formData) => {
    if (editingNFT) {
      await editNFT(editingNFT._id, formData)
      showNotification('NFT updated successfully!', 'success')
      setEditingNFT(null)
    } else {
      await addNFT(formData)
      showNotification('NFT added successfully!', 'success')
    }
    setShowForm(false)
  }

  const handleDelete = async (id) => {
    await removeNFT(id)
    showNotification('NFT deleted successfully!', 'error')
  }

  const handleEdit = (nft) => {
    setEditingNFT(nft)
    setShowForm(true)
  }

  const handleCancel = () => {
    setEditingNFT(null)
    setShowForm(false)
  }

  if (loading) return <div className="loading">Loading your collection...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="app">
      <Header
        onAddClick={() => setShowForm(true)}
        search={search}
        onSearch={(e) => setSearch(e.target.value)}
      />
      <LiveTicker />
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      {showForm && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <NFTForm
              onSubmit={handleSubmit}
              editingNFT={editingNFT}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
      <main className="main-content">
        <NFTList
          nfts={filteredNFTs}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
