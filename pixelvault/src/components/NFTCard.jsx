import { useNavigate } from 'react-router-dom'

const NFTCard = ({ nft, onEdit, onDelete }) => {
  const navigate = useNavigate()

  return (
    <div className="nft-card" onClick={() => navigate(`/nft/${nft._id}`)}>
      <img src={nft.imageUrl} alt={nft.name} />
      <div className="nft-card-info">
        <h3>{nft.name}</h3>
        <p className="nft-creator">by {nft.creator}</p>
        <p className="nft-description">{nft.description}</p>
        <div className="nft-card-footer">
          <span className="nft-price">{nft.price} ETH</span>
          <span className="nft-category">{nft.category}</span>
        </div>
        <div className="nft-card-actions">
          <button onClick={(e) => { e.stopPropagation(); onEdit(nft) }}>Edit</button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(nft._id) }}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default NFTCard
