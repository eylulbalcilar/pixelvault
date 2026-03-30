import mongoose from 'mongoose'

const nftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Art', 'Music', 'Gaming', 'Photography', 'Other'],
    default: 'Art'
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model('NFT', nftSchema)
