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
  const parsedPublishedAt = data.published ? new Date(data.published) : undefined;

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

  
sendSuccessResponse(
    res,
    201,
    'Blog created successfully',
    newBlog
)
});
