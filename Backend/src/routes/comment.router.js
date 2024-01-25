import { Router } from 'express'
import {createCommentController,deleteCommentController,getCommentByArtworkController,updateCommentController} from '../controllers/comments.controller.js';

const comment = Router();

comment.get('/:artwork_id/comments', getCommentByArtworkController);
comment.post('/:artwork_id/comments', createCommentController);
comment.put('/comments/:comment_id', updateCommentController);
comment.delete('/comments/:comment_id', deleteCommentController);
export default comment
