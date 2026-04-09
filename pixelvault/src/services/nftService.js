// REVIEW: The API URL is hardcoded. Use an environment variable (e.g. import.meta.env.VITE_API_URL)
// so it works in development (localhost) and production without manual changes.
const BASE_URL = "https://pixelvault-e9lh.onrender.com/api/nfts";

// REVIEW: None of these functions check response.ok before calling response.json(). If the
// server returns a 4xx/5xx error, you'll try to parse an error body as if it were valid data.
// Consider adding: if (!response.ok) throw new Error(`Request failed: ${response.status}`)

export const getAllNFTs = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const createNFT = async (nftData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nftData),
  });
  return response.json();
};

export const updateNFT = async (id, nftData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nftData),
  });
  return response.json();
};

export const deleteNFT = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};
