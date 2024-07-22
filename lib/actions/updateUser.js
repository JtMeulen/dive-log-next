"use server";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";
import { uploadImage } from "@/lib/cloudinary/uploadImage";
import { deleteImage } from "@/lib/cloudinary/deleteImage";
import User from "@/lib/db/models/User";
import getSanitizedFormData from "@/lib/utils/getSanitizedFormData";
import emptyInput from "@/lib/utils/emptyInput";

export const updateUser = async (formData) => {
  let success = false;
  try {
    const session = await getServerSession(authOptions);
    const sanitizedData = getSanitizedFormData(formData);

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await connectDB();

    const data = {
      name: sanitizedData.get("name"),
      birthdate: sanitizedData.get("birthdate"),
    };

    if (emptyInput(data.name)) {
      return {
        error: "Name is required",
      };
    }

    // If the user did not set a new avatar image, we don't need to upload/delete anything
    if (sanitizedData.get("avatar")?.size > 0) {
      const { imageUrl, error } = await uploadImage(
        sanitizedData.get("avatar")
      );

      if (error) {
        throw new Error(error);
      }

      data.avatar = imageUrl;

      // Delete the old avatar from cloudinary after a new one was uploaded successfully
      const user = await User.findOne({ email: session.user.email });

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
    await User.findOneAndUpdate({ email: session.user.email }, data);

    success = true;
    return;
  } catch (error) {
    return {
      error: error.message,
    };
  } finally {
    if (success) {
      // Workaround for redirect throwing an internal error (next js bug),
      // so we redirect in the finally block reading a variable set in the outer scope
      revalidatePath("/profile");
      redirect("/profile");
    }
  }
};
