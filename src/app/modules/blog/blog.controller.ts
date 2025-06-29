/* eslint-disable @typescript-eslint/no-explicit-any */
// blog.controller.ts
import { Request, Response } from 'express';

import blogService from './blog.service';
import asyncHandler from '../../utils/asyncHandler';
import { uploadImageToCloudinary } from '../../utils/imageUploadService';
import fs from 'fs';

import sendSuccessResponse from '../../utils/successResponse';
import blogModel from './blog.model';

// export const createBlog = asyncHandler(async (req: Request, res: Response) => {
//   // Check if the request has a file
//   if (!req.file) {
//     sendSuccessResponse(res, 400, 'Featured image is required');
//     return;
//   }

//   // Parse the request body
//   if (!req.body.data) {
//     sendSuccessResponse(res, 400, 'Blog data is required');
//     return;
//   }

//   const data = JSON.parse(req.body.data);

//   // Parse necessary fields
//   const parsedTags = data.tags ? JSON.parse(data.tags) : [];
//   const parsedPublished = data.published === 'true' || data.published === true;
//   const parsedPublishedAt = data.published
//     ? new Date(data.published)
//     : undefined;

//   // Upload image
//   let featuredImageUrl = '';
//   if (req.file) {
//     featuredImageUrl = await uploadImageToCloudinary(req.file.buffer);
//   }

//   const newBlog = await blogService.createBlog({
//     ...data,
//     published: parsedPublished,
//     publishedAt: parsedPublishedAt,
//     featuredImage: featuredImageUrl,

//     tags: parsedTags,
//   });

//   sendSuccessResponse(res, 201, 'Blog created successfully', newBlog);
// });

// // @desc    Get all blogs
// export const getAllBlogs = asyncHandler(async (req: Request, res: Response) => {
//   const blogs = await blogService.getAllBlogs();
//   sendSuccessResponse(res, 200, 'Blogs fetched successfully', blogs);
// });
// Create a new blog post
// export const createBlogPost = asyncHandler(async (req:Request, res:Response) => {
//   try {
//     const { title, contentBlocks: contentBlocksJson } = req.body;
//     const thumbnailUrl = '';
//     const uploadedImageUrls: Record<string, string> = {}; // To store URLs of inline images

//     // Parse content blocks from JSON string
//     const contentBlocks = JSON.parse(contentBlocksJson);

//     const files = req.files as Express.Multer.File[];
//     if (!files || files.length === 0) {
//           sendSuccessResponse(res, 400, 'At least one screenshot is required for new projects');
//           return;
//         }
    
    
       
//           const imgUrl = await uploadImageToCloudinary(files?.buffer);
        
          
//     // Handle thumbnail upload if present
//     // if (
//     //   req.files &&
//     //   !Array.isArray(req.files) &&
//     //   (req.files as { [fieldname: string]: Express.Multer.File[] })['thumbnail'] &&
//     //   (req.files as { [fieldname: string]: Express.Multer.File[] })['thumbnail'][0]
//     // ) {
//     //   const thumbnailFile = (req.files as { [fieldname: string]: Express.Multer.File[] })['thumbnail'][0];
//     //   const thumbnailBuffer = await fs.promises.readFile(thumbnailFile.path);
//     //   thumbnailUrl = await uploadImageToCloudinary(thumbnailBuffer);
//     //   await fs.promises.unlink(thumbnailFile.path); // Delete local file after upload
//     // }

//     // Handle inline image uploads
//     if (
//       req.files &&
//       !Array.isArray(req.files) &&
//       (req.files as { [fieldname: string]: Express.Multer.File[] })['imageFiles']
//     ) {
//       const imageFiles = (req.files as { [fieldname: string]: Express.Multer.File[] })['imageFiles'];
//       for (const file of imageFiles) {
//         const imageBuffer = await fs.promises.readFile(file.path);
//         const imageUrl = await uploadImageToCloudinary(imageBuffer);
//         uploadedImageUrls[file.fieldname] = imageUrl; // Store with original fieldname (e.g., 'imageFiles[0]')
//         await fs.promises.unlink(file.path); // Delete local file after upload
//       }
//     }

//     // Update contentBlocks with actual Cloudinary URLs
//     interface ImageBlock {
//       type: 'image';
//       url?: string;
//       [key: string]: any;
//     }

//     interface TextBlock {
//       type: string;
//       [key: string]: any;
//     }

//     type ContentBlock = ImageBlock | TextBlock;

//     const finalContentBlocks: ContentBlock[] = contentBlocks.map((block: ContentBlock, index: number): ContentBlock => {
//       if (block.type === 'image') {
//         // Check if this image block had a file uploaded
//         const uploadedUrl = uploadedImageUrls[`imageFiles[${index}]`];
//         if (uploadedUrl) {
//           return { ...block, url: uploadedUrl };
//         }
//       }
//       return block;
//     });

//     const newBlogPost = new blogModel({
//       title,
//       thumbnailUrl,
//       contentBlocks: finalContentBlocks,
//     });

//     await newBlogPost.save();
//     res.status(201).json({ message: 'Blog post created successfully', blogPost: newBlogPost });
//   } catch (error) {
//     console.error('Error creating blog post:', error);
//     const errorMessage = (error instanceof Error) ? error.message : String(error);
//     res.status(500).json({ message: 'Failed to create blog post', error: errorMessage });
//   }
// })

export const createBlogPost = asyncHandler((req:Request,res:Response)=>{
  console.log('Request body:', req.body);
  res.status(200).json({ message: 'Blog post created successfully' });

})
// @desc    Get a blog by slug  

export const getBlogBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    if (!slug) {
      sendSuccessResponse(res, 400, 'Slug is required');
      return;
    }
    const blog = await blogService.getBlogBySlug(slug);

    if (!blog) {
      sendSuccessResponse(res, 404, 'Blog not found');
      return;
    }

    sendSuccessResponse(res, 200, 'Blog fetched successfully', blog);
  },
);
export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (!slug) {
    sendSuccessResponse(res, 400, 'Slug is required');
    return;
  }

  if(!req.body.data) {
    sendSuccessResponse(res, 400, 'Blog data is required');
    return;
  }





  // Parse the `data` text field
  const parsedData = JSON.parse(req.body.data);

  let featuredImage: string | undefined;

  if (req.file) {
    featuredImage = await uploadImageToCloudinary(req.file.buffer);
  }

  const updatedBlog = await blogService.updateBlogBySlug(slug, {
    ...parsedData,
    ...(featuredImage && { featuredImage }),
  });
  console.log('Updated blog:', updatedBlog);

  res.status(200).json({ success: true, data: updatedBlog });
});


// @desc    Delete a blog by slug
export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (!slug) {
    sendSuccessResponse(res, 400, 'Slug is required');
    return;
  }

  const deletedBlog = await blogService.deleteBlog(slug);
  if (!deletedBlog) {
    sendSuccessResponse(res, 404, 'Blog not found');
    return;
  }

  sendSuccessResponse(res, 200, 'Blog deleted successfully', deletedBlog);
});
