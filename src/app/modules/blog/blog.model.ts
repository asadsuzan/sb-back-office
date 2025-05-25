// blog.model.ts
import mongoose, { Schema } from 'mongoose';
import { IArticle } from './blog.types';

const blogSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: String,
    featuredImage: String,
    tags: [String],
    author: { type: String, required: true },
    category: String,
    published: { type: Boolean, default: false },
    publishedAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IArticle>('Blog', blogSchema);
