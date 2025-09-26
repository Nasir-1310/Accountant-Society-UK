import mongoose, { Schema, models } from "mongoose";

const newsSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const News = models.News || mongoose.model("News", newsSchema);
export default News;
// This model defines the structure for news articles in the database.
// Each article has a title, content, and date of publication.
// The `date` field defaults to the current date if not provided.