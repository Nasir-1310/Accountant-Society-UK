// src/models/Slider.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISlider extends Document {
  title: string;
  description: string;
  image: string;
  url: string;
  dotColor: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SliderSchema = new Schema<ISlider>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
      trim: true,
    },
    dotColor: {
      type: String,
      default: 'bg-purple-500',
      enum: ['bg-purple-500', 'bg-green-500', 'bg-blue-500', 'bg-red-500', 'bg-yellow-500', 'bg-pink-500'],
    },
    order: {
      type: Number,
      default: 0,
      min: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
SliderSchema.index({ order: 1, active: 1 });
SliderSchema.index({ active: 1 });

const Slider: Model<ISlider> =
  mongoose.models.Slider || mongoose.model<ISlider>('Slider', SliderSchema);

export default Slider;