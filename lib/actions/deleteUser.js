"use server";

import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";

import User from "@/lib/db/models/User";
import Dive from "@/lib/db/models/Dive";
import { deleteImage } from "@/lib/cloudinary/deleteImage";

export const deleteUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await connectDB();

    // Get the user details to find the related dives and their images
    const user = await User.findOne({ email: session.user.email });

    // Delete the avatar from cloudinary
    if (user.avatar) {
      const avatarId = user.avatar
        .split("/")
        .pop()
        .replace(/\.(.*)/, "");
      await deleteImage(avatarId);
    }

    // Get all dives related to the user
    const dives = await Dive.find({ userEmail: session.user.email });

    // For each dive, find the images and delete them from cloudinary
    dives.forEach(async (dive) => {
      // Fetch the .png file name from the image url
      if (dive.image) {
        // Regex to remove the file extension
        const imageId = dive.image
          .split("/")
          .pop()
          .replace(/\.(.*)/, "");
        await deleteImage(imageId);
      }
    });

    // Delete related dives to the user
    await Dive.deleteMany({ userEmail: session.user.email });

    // Final step is to delete the user itself
    await User.findOneAndDelete({ email: session.user.email });

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
