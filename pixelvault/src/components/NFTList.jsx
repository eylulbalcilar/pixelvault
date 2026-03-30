import NFTCard from './NFTCard'

const NFTList = ({ nfts, onEdit, onDelete }) => {
  if (nfts.length === 0) {
    return (
      <div className="empty-state">
        <p>No NFTs in your collection yet. Add your first one!</p>
      </div>
    )
  }

  return (
    <div className="nft-grid">
      {nfts.map(nft => (
        <NFTCard
          key={nft._id}
          nft={nft}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default NFTList
