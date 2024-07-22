"use server";

import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";

import Dive from "@/lib/db/models/Dive";
import { deleteImage } from "@/lib/cloudinary/deleteImage";

export const deleteDive = async (id) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await connectDB();

    // Get the dive details to check if it belongs to the user and get the image id to delete
    const dive = await Dive.findById(id);

    if (dive.userEmail !== session.user.email) {
      return {
        error: "Unauthorized",
      };
    }

    // Delete the avatar from cloudinary
    if (dive.image) {
      const imageId = dive.image
        .split("/")
        .pop()
        .replace(/\.(.*)/, "");
      await deleteImage(imageId);
    }

    await Dive.findByIdAndDelete(id);

    revalidatePath("/dives");

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
