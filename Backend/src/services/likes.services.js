import Likes from "../model/schema/like.schema.js";

 class LikeService {
    async likeArtwork(artwork_id){
        console.log(artwork_id);
        // console.log(user_id);
        const like = new Likes({
            artwork_id,
            user_id:'60b9b8b9e6b3c2b8b8e0a0a0',
            date: new Date()
        })
        console.log(like);
        await like.save();
        return like;
    }

    async unlikeArtwork(like_id){
        console.log(like_id);
        const like = await Likes.findById(like_id);
        console.log(like);
        await like.deleteOne({ "_id": like_id });
        return like;
    }

    async getLikesByArtworkId(artwork_id){
        console.log(artwork_id);
        const likes = await Likes.find({ "artwork_id": artwork_id });
        console.log(likes);
        return likes;
    }
 }

 const likeService = new LikeService();
    export default likeService;