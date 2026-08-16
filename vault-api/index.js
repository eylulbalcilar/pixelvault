import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import nftRoutes from './src/routes/nft.routes.js'

dotenv.config()

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/nfts', nftRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected ✅')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`)
    })
  })
  .catch((err) => {
    console.log('MongoDB error ❌', err)
    process.exit(1)
  })
