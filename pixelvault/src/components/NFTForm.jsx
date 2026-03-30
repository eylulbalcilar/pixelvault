import { useState, useEffect } from 'react'

const initialState = {
  name: '',
  creator: '',
  price: '',
  category: 'Art',
  description: '',
  imageUrl: ''
}

const NFTForm = ({ onSubmit, editingNFT, onCancel }) => {
  const [formData, setFormData] = useState(initialState)

  useEffect(() => {
    if (editingNFT) {
      setFormData(editingNFT)
    } else {
      setFormData(initialState)
    }
  }, [editingNFT])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.creator || !formData.price || !formData.description || !formData.imageUrl) {
      alert('Please fill in all fields')
      return
    }
    onSubmit(formData)
    setFormData(initialState)
  }

  return (
    <form className="nft-form" onSubmit={handleSubmit}>
      <h2>{editingNFT ? 'Edit NFT' : 'Add New NFT'}</h2>
      <input name="name" placeholder="NFT Name" value={formData.name} onChange={handleChange} />
      <input name="creator" placeholder="Creator" value={formData.creator} onChange={handleChange} />
      <input name="price" type="number" placeholder="Price (ETH)" value={formData.price} onChange={handleChange} />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option>Art</option>
        <option>Music</option>
        <option>Gaming</option>
        <option>Photography</option>
        <option>Other</option>
      </select>
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
      <div className="form-buttons">
        <button type="submit">{editingNFT ? 'Update NFT' : 'Add NFT'}</button>
        {editingNFT && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}

export default NFTForm
