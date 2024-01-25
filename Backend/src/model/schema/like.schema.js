
import mongoose from 'mongoose'
const likeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  artwork_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
    required: true
  },
  date: {
    type: Date,
    required: true
  }
})
const Likes = mongoose.model('Like', likeSchema)
export default Likes
