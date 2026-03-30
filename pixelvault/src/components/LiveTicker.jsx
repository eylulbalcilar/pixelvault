import { useState, useEffect } from 'react'

const LiveTicker = () => {
  const [prices, setPrices] = useState([])

  useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,dogecoin,binancecoin&vs_currencies=usd&include_24hr_change=true'
      )
      const data = await res.json()
      setPrices([
        { name: 'BTC', price: data.bitcoin.usd, change: data.bitcoin.usd_24h_change },
        { name: 'ETH', price: data.ethereum.usd, change: data.ethereum.usd_24h_change },
        { name: 'SOL', price: data.solana.usd, change: data.solana.usd_24h_change },
        { name: 'DOGE', price: data.dogecoin.usd, change: data.dogecoin.usd_24h_change },
        { name: 'BNB', price: data.binancecoin.usd, change: data.binancecoin.usd_24h_change },
      ])
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 30000)
    return () => clearInterval(interval)
  }, [])

  if (prices.length === 0) return null

  return (
    <div className="ticker-wrapper">
      <div className="ticker-track">
        {[...prices, ...prices].map((coin, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-name">{coin.name}</span>
            <span className="ticker-price">${coin.price.toLocaleString()}</span>
            <span className={`ticker-change ${coin.change >= 0 ? 'up' : 'down'}`}>
              {coin.change >= 0 ? '▲' : '▼'} {Math.abs(coin.change).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LiveTicker
