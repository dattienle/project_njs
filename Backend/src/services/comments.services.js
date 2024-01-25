import Comments from '../model/schema/comment.schema.js';

class CommentService {


    // async getComment(id){
    //     const comment = await this._commentSchema.get(id);
    //     return comment;
    // }

    async getCommentByArtwork(artwork_id) {
        console.log(artwork_id);
        const comments = await Comments.find({ "artwork_id": artwork_id });
        console.log(comments);
        if (!comments) {
            throw new Error('No comments found');
        }

        return comments;
    }

    async createComment(artwork_id, comment) {
        console.log(artwork_id);
        console.log(comment);
        const newComment = new Comments({
            artwork_id: artwork_id,
            user_id: "65b0f0d8bf1a081fad2f0e2d",
            content: comment,
            date: Date.now(),
            likes: []
        });
        await newComment.save();
        return newComment;
    }

    async updateComment(id, comment) {
        console.log(id);
        console.log(comment);
        const updatedComment = await Comments.updateOne({ "_id": id }, { "content": comment });
        console.log(updatedComment);
        return updatedComment;
    }

    async deleteComment(id) {
        console.log(id);
        const deletedComment = await Comments.deleteOne({ "_id": id });
        console.log(deletedComment);
    }
}
const commentService = new CommentService();
export default commentService;