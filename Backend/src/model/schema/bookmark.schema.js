import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  artwork_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artwork",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;