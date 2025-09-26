// src/models/NewsBlogs.ts
import mongoose, { Schema, models } from "mongoose";

const newsBlogsSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["news", "blog", "event"],
    },
    title: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true }, // e.g., "23rd May 2025"
    description: { type: String, required: true },
    icon: { type: String, default: "📄" },
    link: { type: String, required: true },

    // ✅ New fields to support publishing & filtering
    isPublished: { type: Boolean, default: true },
    tags: [{ type: String }],

    // ✅ Who created the post (optional but useful for populate)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // change "Admin" if your admin model is named differently
      required: false,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const NewsBlogs =
  models.NewsBlogs || mongoose.model("NewsBlogs", newsBlogsSchema);
export default NewsBlogs;
