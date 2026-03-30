import express from 'express'
import {
  getAllNFTs,
  createNFT,
  updateNFT,
  deleteNFT,
  getNFTById
} from '../controllers/nft.controller.js'

const router = express.Router()

router.get('/', getAllNFTs)
router.get('/:id', getNFTById)
router.post('/', createNFT)
router.put('/:id', updateNFT)
router.delete('/:id', deleteNFT)

export default router
