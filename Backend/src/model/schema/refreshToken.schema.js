import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const RefreshToken = mongoose.model('refreshToken', refreshTokenSchema);

export default RefreshToken; 