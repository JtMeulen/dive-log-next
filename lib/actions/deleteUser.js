"use server";

import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";

import User from "@/lib/db/models/User";
import { redirect } from "next/navigation";

export const deleteUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await connectDB();

    // TODO: find all related dives for the user and delete them
    // TODO: delete all dive images from cloudinary
    // TODO: find the avatar url and delete it from cloudinary

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
