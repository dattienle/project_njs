
import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  artwork_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artwork',
      required: true
    }
  ]
})

const Categories = mongoose.model('categories', categoriesSchema)
export default Categories
