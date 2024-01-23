import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }],
  approved: { type: Boolean, required: true },
  date: { type: Date, required: true }
})
const Post = mongoose.model('Post', postSchema)
export default Post
