// blog.controller.ts
import { Request, Response } from 'express';

import blogService from './blog.service';
import asyncHandler from '../../utils/asyncHandler';
import { uploadImageToCloudinary } from '../../utils/imageUploadService';

import sendSuccessResponse from '../../utils/successResponse';

export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  // Check if the request has a file
  if (!req.file) {
    sendSuccessResponse(res, 400, 'Featured image is required');
    return;
  }

  // Parse the request body
  if (!req.body.data) {
    sendSuccessResponse(res, 400, 'Blog data is required');
    return;
  }

  const data = JSON.parse(req.body.data);

  // Parse necessary fields
  const parsedTags = data.tags ? JSON.parse(data.tags) : [];
  const parsedPublished = data.published === 'true' || data.published === true;
  const parsedPublishedAt = data.published
    ? new Date(data.published)
    : undefined;

  // Upload image
  let featuredImageUrl = '';
  if (req.file) {
    featuredImageUrl = await uploadImageToCloudinary(req.file.buffer);
  }

  const newBlog = await blogService.createBlog({
    ...data,
    published: parsedPublished,
    publishedAt: parsedPublishedAt,
    featuredImage: featuredImageUrl,

    tags: parsedTags,
  });

  sendSuccessResponse(res, 201, 'Blog created successfully', newBlog);
});

// @desc    Get all blogs
export const getAllBlogs = asyncHandler(async (req: Request, res: Response) => {
  const blogs = await blogService.getAllBlogs();
  sendSuccessResponse(res, 200, 'Blogs fetched successfully', blogs);
});

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
