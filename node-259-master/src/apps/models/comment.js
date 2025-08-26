const mongoose = require("../../common/database")();
const commentSchema = new mongoose.Schema(
  {
    prd_id: {
      type: mongoose.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },/*
    slug: {
      type: String,
      required: true,
    },*/
    email: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const CommentModel = mongoose.model("Comment", commentSchema, "comments");
module.exports = CommentModel;
