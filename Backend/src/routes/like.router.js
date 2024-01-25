import { Router } from 'express'
import { getLikesByArtworkIdController, likeArtworkController,unlikeArtworkController } from '../controllers/likes.controller.js'
const likesRouter = Router()

likesRouter.get('/:artwork_id', getLikesByArtworkIdController);
likesRouter.post('/:artwork_id', likeArtworkController);
likesRouter.delete('/:like_id', unlikeArtworkController);

export default likesRouter
