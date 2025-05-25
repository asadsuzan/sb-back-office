import { Schema, model } from 'mongoose';
import { IArticle } from './blog.types';


const blogSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    content: { type: String, required: true },
    excerpt: { type: String },

    featuredImage: { type: String },
    tags: [{ type: String }],
    category: { type: String },

    author: { type: String, required: true }, // Can be ObjectId if you want user relation

    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export default model<IArticle>('Blog', blogSchema);
