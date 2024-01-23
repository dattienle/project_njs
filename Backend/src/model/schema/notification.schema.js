
import mongoose from 'mongoose'
const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['comment', 'like','follow'],
    required: true
  },
  date: {
    type: Date,
    required: true
  }
})
const Notification = mongoose.model('Notification', notificationSchema)
export default Notification