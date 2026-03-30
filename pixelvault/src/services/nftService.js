const BASE_URL = 'http://localhost:5001/api/nfts'

export const getAllNFTs = async () => {
  const response = await fetch(BASE_URL)
  return response.json()
}

export const createNFT = async (nftData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nftData)
  })
  return response.json()
}

export const updateNFT = async (id, nftData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nftData)
  })
  return response.json()
}

export const deleteNFT = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  })
}
