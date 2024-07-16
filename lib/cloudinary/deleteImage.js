import { cloudinary } from "@/lib/cloudinary";

export const deleteImage = async (image) => {
  await new Promise((resolve) => {
    cloudinary.uploader.destroy(image).then(() => {
      resolve();
    });
  });
};