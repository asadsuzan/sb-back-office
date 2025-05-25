// blog.route.ts
import express from 'express';
import { createBlog } from './blog.controller';
import { upload } from '../../middlewares/multer';

const router = express.Router();


router.post('/', upload.single(
    'featuredImage' // Assuming the field name for the image upload is 'featuredImage'
), createBlog);

export default router;
