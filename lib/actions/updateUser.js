"use server";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";
import { uploadImage } from "@/lib/cloudinary/uploadImage";
import { deleteImage } from "@/lib/cloudinary/deleteImage";
import User from "@/lib/db/models/User";

export const updateUser = async (formData) => {
  let success = false;
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await connectDB();

    const data = {
      name: formData.get("name"),
      birthdate: formData.get("birthdate"),
    };

    // If the user did not set a new avatar image, we don't need to upload/delete anything
    if (formData.get("avatar")?.size > 0) {
      const { imageUrl, error } = await uploadImage(formData.get("avatar"));

      if (error) {
        throw new Error(error);
      }

      data.avatar = imageUrl;

      // Delete the old avatar from cloudinary after a new one was uploaded successfully
      const user = await User.findById(session.user.id);

      if (user.avatar) {
        // Regex to remove the file extension
        const imageId = user.avatar
          .split("/")
          .pop()
          .replace(/\.(.*)/, "");
        await deleteImage(imageId);
      }
    }

    // Update the user in the database
    await User.findByIdAndUpdate(session.user.id, data);

    success = true;
  } catch (error) {
    return {
      error: error.message,
    };
  } finally {
    if (success) {
      // Workaround for redirect throwing an internal error (next js bug),
      // so we redirect in the finally block reading a variable set in the outer scope
      redirect("/profile");
    }
  }
};
