import { cloudinary } from "@/lib/cloudinary";
import { track } from "@vercel/analytics/server";

const validImageTypes = ["image/png", "image/jpeg", "image/jpg", "image/heic", "image/heif"];

export async function uploadImage(imageFile) {
  try {
    if (imageFile.size > 0) {
      track("upload-image");

      // Check if the size is less than 7mb
      if (imageFile.size > 4 * 1024 * 1024) {
        return { error: "Image is too large. Max size is 7mb." };
      }

      // Check if the file is an image
      if (!validImageTypes.includes(imageFile.type)) {
        return { error: "Invalid image type. Please upload a PNG, JPG, JPEG, HEIC or HEIF file." };
      }

      const arrayBuffer = await imageFile.arrayBuffer();

      const buffer = new Uint8Array(arrayBuffer);

      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, function (error, result) {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          })
          .end(buffer);
      });

      return {
        imageUrl: uploadResponse?.secure_url,
      };
    } else {
      return { error: "No image provided." };
    }
  } catch (e) {
    return { error: e.message };
  }
}
