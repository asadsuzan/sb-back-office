// src/utils/imageUploadService.ts

import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import config from '../config';

// Configure Cloudinary (ensure these are loaded from environment variables)
cloudinary.config({
 cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
  secure: true,
});

/**
 * Uploads an image buffer to Cloudinary.
 * @param buffer The image buffer.
 * @returns The Cloudinary URL of the uploaded image.
 */
export const uploadImageToCloudinary = async (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'project-screenshots' }, // Optional: specify a folder
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(error);
        }
        if (result && result.secure_url) {
          resolve(result.secure_url);
        } else {
          reject(new Error('Cloudinary upload failed: No secure_url in result.'));
        }
      }
    );

    // Convert buffer to a readable stream and pipe to uploadStream
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null); // No more data
    readableStream.pipe(uploadStream);
  });
};

/**
 * Extracts the public ID from a Cloudinary image URL.
 * @param url The Cloudinary image URL.
 * @returns The public ID or null if not found.
 */
export const extractPublicIdFromCloudinaryUrl = (url: string): string | null => {
  const parts = url.split('/');
  const uploadIndex = parts.indexOf('upload');
  if (uploadIndex === -1 || uploadIndex + 1 >= parts.length) {
    return null; // 'upload' not found or no parts after it
  }

  // The public ID is typically the last part before the extension, sometimes with a folder prefix
  const publicIdWithExtension = parts.slice(uploadIndex + 2).join('/'); // Skip 'v<version>' and get remaining path
  const lastDotIndex = publicIdWithExtension.lastIndexOf('.');
  if (lastDotIndex !== -1) {
    return publicIdWithExtension.substring(0, lastDotIndex);
  }
  return publicIdWithExtension; // In case there's no extension (e.g., raw files)
};

/**
 * Deletes an image from Cloudinary using its public ID.
 * @param publicId The public ID of the image to delete.
 */
// export const deleteImageFromCloudinary = async (publicId: string): Promise<void> => {
//   try {
//     const result = await cloudinary.uploader.destroy(publicId);
//     if (result.result === 'ok') {
//       console.log(`Successfully deleted image with public ID: ${publicId}`);
//     } else {
//       console.warn(`Failed to delete image with public ID: ${publicId}. Result:`, result);
//       // You might want to throw an error here or handle it based on your retry strategy
//     }
//   } catch (error) {
//     console.error(`Error deleting image ${publicId} from Cloudinary:`, error);
//     throw error; // Re-throw to be caught by asyncHandler
//   }
// };

// Delete single image
export const deleteImageFromCloudinary = async (url: string) => {
  try {
    // Extract public ID from URL
    const publicId = url.split('/').pop()?.split('.')[0] || '';
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(`Error deleting image ${url}:`, error);
    throw error;
  }
};

// Delete multiple images
export const deleteImagesFromCloudinary = async (urls: string[]) => {
  try {
    await Promise.all(urls.map(url => deleteImageFromCloudinary(url)));
  } catch (error) {
    console.error('Error deleting images:', error);
    throw error;
  }
};