"use server";

import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";
import Dive from "@/lib/db/models/Dive";

export const newDiveAction = async (formData) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  // Get image from form data
  const image = formData.get("image");

  // TODO: Store image in Cloudinary and retrieve the url
  const cloudinaryUrl = "";

  const data = {
    userId: session.user.id,
    title: formData.get("title"),
    location: formData.get("location"),
    description: formData.get("description"),
    date: formData.get("date"),
    time: formData.get("time"),
    depth: formData.get("depth"),
    notes: formData.get("notes"),
    image: cloudinaryUrl,
  };

  try {
    await connectDB();

    const dive = new Dive({ ...data });

    const savedDive = await dive.save();

    return {
      dive: savedDive,
    };
  } catch (e) {
    console.log('error:', e.message)
    return {
      error: e.message,
    };
  }
};
