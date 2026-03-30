import { useState } from 'react'

const ConnectWallet = () => {
  const [account, setAccount] = useState(null)

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      })
      setAccount(accounts[0])
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const shortAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  return (
    <button className="btn-wallet" onClick={connectWallet}>
      {account ? shortAddress(account) : 'Connect Wallet'}
    </button>
  )
}

export default ConnectWallet
