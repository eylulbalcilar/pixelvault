import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LiveTicker from "../components/LiveTicker";
import NFTForm from "../components/NFTForm";
import { updateNFT, deleteNFT } from "../services/nftService";

const NFTDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // REVIEW: The API URL is hardcoded here instead of using nftService.js. This duplicates
  // the base URL and means you'd have to update it in multiple places if it changes.
  // Use a getNFTById function from nftService instead.
  useEffect(() => {
    fetch(`https://pixelvault-e9lh.onrender.com/api/nfts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) setNft(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // REVIEW: handleEdit and handleDelete have no try/catch. If the API fails, the user gets
  // no feedback and the page may be left in an inconsistent state.
  const handleEdit = async (formData) => {
    await updateNFT(id, formData);
    // REVIEW: Hardcoded URL again — should reuse nftService.
    const updated = await fetch(
      `https://pixelvault-e9lh.onrender.com/api/nfts/${id}`,
    ).then((r) => r.json());
    setNft(updated);
    setShowForm(false);
  };

  const handleDelete = async () => {
    await deleteNFT(id);
    navigate("/");
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!nft) return <div className="error">NFT not found</div>;

  return (
    <div className="app">
      {/* REVIEW: Passing empty search="" and a no-op onSearch makes the search bar visible but
          non-functional on this page. Either hide it or wire it up to navigate back to HomePage
          with a search query. */}
      <Header
        onAddClick={() => setShowForm(true)}
        search=""
        onSearch={() => {}}
      />
      <LiveTicker />
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <NFTForm
              onSubmit={handleEdit}
              editingNFT={nft}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
      <div className="detail-page">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
        <div className="detail-content">
          <div className="detail-image">
            {/* REVIEW: Inline styles here duplicate/override the CSS class .detail-image img. Use
                the class-based styles for consistency and maintainability. Also, the fixed 500px
                width breaks responsiveness on smaller screens. */}
            <img
              src={nft.imageUrl}
              alt={nft.name}
              style={{
                width: "500px",
                height: "500px",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
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
              <button className="btn-edit" onClick={() => setShowForm(true)}>
                Edit
              </button>
              <button className="btn-delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NFTDetailPage;
