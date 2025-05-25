// blog.types.ts

export interface IArticle {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  tags?: string[];
  author: string;
  category?: string;
  published: boolean;
  publishedAt?: Date;
}

// Used for creating new blogs (e.g., from form data)
export type IBlogInput = Omit<IArticle, 'publishedAt'> & {
  publishedAt?: string | Date;
};
