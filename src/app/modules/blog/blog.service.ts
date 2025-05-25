// blog.service.ts
import Blog from './blog.model';
import { IBlogInput } from './blog.types';

const createBlog = async (data: IBlogInput) => {
  return await Blog.create(data);
};

const getAllBlogs = async () => {
  return await Blog.find().sort({ createdAt: -1 });
};

const getBlogBySlug = async (slug: string) => {
  return await Blog.findOne({ slug });
};

const updateBlog = async (slug: string, data: Partial<IBlogInput>) => {
  return await Blog.findOneAndUpdate({ slug }, data, { new: true });
};

const deleteBlog = async (slug: string) => {
  return await Blog.findOneAndDelete({ slug });
};

export default {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};
