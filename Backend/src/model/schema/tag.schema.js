import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  artwork_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artwork',
      required: true
    }
  ]
})
const Tag = mongoose.model('Tag', tagSchema)
export default Tag
