import mongoose from 'mongoose'

const userShema = new mongoose.Schema({
 
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  avatar: {
    type: String,
  },
  bookmark: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bookmark'
    }
  ],

})
const Users = mongoose.model('user', userShema)
export default Users
  