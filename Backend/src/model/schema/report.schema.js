// interface Report{
//   _id: ObjectId,
//   user_id: ObjectId,
//   resource_id: ObjectId,
//   reason: String,
//   created_at: Date,
// } 
import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resource_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  }
})
const Report = mongoose.model('Report', reportSchema)
export default Report