const API_URL = import.meta.env.VITE_API_URL || 'https://pixelvault-e9lh.onrender.com/api'
const BASE_URL = `${API_URL}/nfts`

export const getAllNFTs = async () => {
  const response = await fetch(BASE_URL)
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}

export const getNFTById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`)
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}

export const createNFT = async (nftData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nftData)
  })
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}

export const updateNFT = async (id, nftData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nftData)
  })
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}

export const deleteNFT = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
}
