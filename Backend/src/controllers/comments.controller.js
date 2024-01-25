import mongoose from 'mongoose';
import artwork from '../model/schema/artwork.schema.js';
import artworkComment from '../model/schema/comment.schema.js';
import comment from '../model/schema/comment.schema.js';
import commentService from '../services/comments.services.js';

export const createCommentController = async (req, res) => {
    const { comment } = req.body;
	const artwork_id = req.params.artwork_id;
	try {
		const newComment = await commentService.createComment(artwork_id, comment);
		res.status(200).json(newComment);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const getCommentByArtworkController = async (req, res) => {
   const artwork_id = req.params.artwork_id;
   try {
	   const comments = await commentService.getCommentByArtwork(artwork_id);
	   res.status(200).json(comments);
   } catch (error) {
	   res.status(400).json({ message: error.message });
   }

}

export const updateCommentController = async (req, res) => {
    const comment_id = req.params.comment_id;
	const { comment } = req.body;
	try {
		const updatedComment = await commentService.updateComment(comment_id, comment);
		res.status(200).json(updatedComment);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}

}

export const deleteCommentController = async (req, res) => {
    const comment_id = req.params.comment_id;
	try {
		await commentService.deleteComment(comment_id);
		res.status(200).json({ message: 'Comment deleted successfully' });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}