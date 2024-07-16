"use server";

import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";
import { cloudinary } from "@/lib/cloudinary";

import User from "@/lib/db/models/User";
import Dive from "@/lib/db/models/Dive";

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
    const user = await User.findById(session.user.id);

    // Delete the avatar from cloudinary
    if (user.avatar) {
      await deleteImageFromCloudinary(user.avatar);
    }

    // Get all dives related to the user
    const dives = await Dive.find({ userId: session.user.id });

    // For each dive, find the images and delete them from cloudinary
    dives.forEach(async (dive) => {
      // Fetch the .png file name from the image url
      if (dive.image) {
        const imageId = dive.image.split('/').pop().replace('.png', '');
        await deleteImageFromCloudinary(imageId);
      }
    });

    // Delete related dives to the user
    await Dive.deleteMany({ userId: session.user.id });

    // Final step is to delete the user itself
    await User.findByIdAndDelete(session.user.id);

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const deleteImageFromCloudinary = async (image) => {
  await new Promise((resolve) => {
    cloudinary.uploader.destroy(image).then(() => {
      resolve();
    });
  });
};
