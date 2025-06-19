// blog.service.ts
import Blog from './blog.model';
import { IArticle, IBlogInput } from './blog.types';

const createBlog = async (data: IBlogInput) => {
  return await Blog.create(data);
};

const getAllBlogs = async () => {
  return await Blog.find().sort({ createdAt: -1 });
};

const getBlogBySlug = async (slug: string) => {
  return await Blog.findOne({ slug });
};



const updateBlogBySlug = async (
  slug: string,
  updateData: Partial<IArticle>
): Promise<IArticle | null> => {


    const updated = await Blog.findOneAndUpdate(
        { slug },
        updateData,     
        { new: true, runValidators: true }
    );
  if (!updated) {
    throw new Error('Blog not found');
  }
  return updated.toObject() as unknown as IArticle;
};




const deleteBlog = async (slug: string) => {
  return await Blog.findOneAndDelete({ slug });
};

export default {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlogBySlug,
  deleteBlog,
};
