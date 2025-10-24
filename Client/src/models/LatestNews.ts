// src/models/LatestNews.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILatestNews extends Document {
  title: string;
  description: string;
  date: Date;
  image: string;
  link?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LatestNewsSchema = new Schema<ILatestNews>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    link: {
      type: String,
      trim: true,
      default: null,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
LatestNewsSchema.index({ date: -1 });
LatestNewsSchema.index({ published: 1 });
LatestNewsSchema.index({ createdAt: -1 });

const LatestNews: Model<ILatestNews> =
  mongoose.models.LatestNews || mongoose.model<ILatestNews>('LatestNews', LatestNewsSchema);

export default LatestNews;