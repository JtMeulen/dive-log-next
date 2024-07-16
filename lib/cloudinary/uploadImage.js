import { cloudinary } from "@/lib/cloudinary";

export async function uploadImage(imageFile) {
  try {
    if (imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();

      const buffer = new Uint8Array(arrayBuffer);

      // TODO - Check if the file is an image
      // TODO - Check if the file is too large
      // TODO - Change the file size if it's too large

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
    }
  } catch (e) {
    return { error: e.message };
  }
}
