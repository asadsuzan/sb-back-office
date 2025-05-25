import { Document } from "mongoose";

export interface IArticle extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;

  featuredImage?: string;
  tags?: string[];

  author: string; // could be ObjectId reference if you have user model
  category?: string;

  published: boolean;
  publishedAt?: Date;
}
