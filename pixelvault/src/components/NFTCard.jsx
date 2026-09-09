import { useNavigate } from 'react-router-dom'

const FALLBACK_IMAGE = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 280"><rect width="300" height="280" fill="#f1f0eb"/><text x="150" y="145" font-size="14" text-anchor="middle" fill="#999" font-family="sans-serif">Image unavailable</text></svg>'
)

const NFTCard = ({ nft, onEdit, onDelete }) => {
  const navigate = useNavigate()

  return (
    <div className="nft-card" onClick={() => navigate(`/nft/${nft._id}`)}>
      <img
        src={nft.imageUrl}
        alt={nft.name}
        onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE }}
      />
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
