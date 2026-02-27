import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;