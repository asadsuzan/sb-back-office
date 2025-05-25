// blog.route.ts
import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getBlogBySlug, updateBlog,  } from './blog.controller';
import { upload } from '../../middlewares/multer';

const router = express.Router();

router.post(
  '/',
  upload.single(
    'featuredImage', 
  ),
  createBlog,
);

router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug); 
router.put('/:slug', upload.single('featuredImage'), updateBlog); 

router.delete('/:slug',deleteBlog)
export default router;
