// blog.route.ts
import express from 'express';
import {  createBlogPost, deleteBlog,  getBlogBySlug, updateBlog,  } from './blog.controller';
import { upload } from '../../middlewares/multer';

const router = express.Router();

router.post(
  '/',
  upload.fields(
    [
      { name: 'imageFiles', maxCount: 10 }, // For the featured image
      { name: 'thumbnail', maxCount: 1 }, // For the thumbnail image
    ] 

  ),
  createBlogPost,
);

// router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug); 
router.put('/:slug', upload.single('featuredImage'), updateBlog); 

router.delete('/:slug',deleteBlog)
export default router;
