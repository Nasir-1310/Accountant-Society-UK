import { Schema, Document, model, models } from "mongoose";

interface INewsAndBlog extends Document {
  type: "news" | "blog" | "event";
  title: string;
  category: string;
  date: string;
  description: string;
  icon?: string;
  link?: string;
  tags?: string[];
}

const NewsAndBlogSchema = new Schema<INewsAndBlog>(
  {
    type: {
      type: String,
      enum: ["news", "blog", "event"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: String, // using string to store full formats like "27th May 2025 09:30 - 12:00"
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    link: {
      type: String,
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const NewsAndBlogModel =
  models.NewsAndBlog || model<INewsAndBlog>("NewsAndBlog", NewsAndBlogSchema);

export default NewsAndBlogModel;
