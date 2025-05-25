import cloudinary from '../utils/cloudinary';

export const uploadImageToCloudinary = async (
  buffer: Buffer,
  folder = 'sb-projects',
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      })
      .end(buffer);
  });
};
