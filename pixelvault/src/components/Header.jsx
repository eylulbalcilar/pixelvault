import { useNavigate } from 'react-router-dom'
import ConnectWallet from './ConnectWallet'

const Header = ({ onAddClick, search, onSearch }) => {
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
        <span className="logo-icon">⬡</span>
        <span className="logo-text">PixelVault</span>
      </div>
      <div className="header-search">
        <input
          placeholder="Search galleries, artists or works"
          value={search}
          onChange={onSearch}
        />
      </div>
      <div className="header-actions">
        <button className="btn-connect" onClick={onAddClick}>+ Add NFT</button>
        <ConnectWallet />
      </div>
    </header>
  )
}

export default Header
