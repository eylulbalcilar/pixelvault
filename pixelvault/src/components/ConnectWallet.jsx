import { useState } from "react";

const ConnectWallet = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    // REVIEW: No check for window.ethereum existence. If MetaMask (or another wallet) is not
    // installed, this will throw "Cannot read properties of undefined". Should check first and
    // show a message like "Please install MetaMask".
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const shortAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  // REVIEW: Wallet connection state is stored only in React state, so it resets on every page
  // navigation or refresh. Consider persisting it or re-checking on mount with eth_accounts.
  return (
    <button className="btn-wallet" onClick={connectWallet}>
      {account ? shortAddress(account) : "Connect Wallet"}
    </button>
  );
};

export default ConnectWallet;
