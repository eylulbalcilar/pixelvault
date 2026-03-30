import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NFTDetailPage from './pages/NFTDetailPage'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nft/:id" element={<NFTDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
