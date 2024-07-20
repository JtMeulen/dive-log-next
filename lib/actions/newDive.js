"use server";

import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";
import Dive from "@/lib/db/models/Dive";
import { uploadImage } from "../cloudinary/uploadImage";

export const newDiveAction = async (formData) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    await connectDB();

    let cloudinaryImageUrl = "";

    if (formData.get("image")?.size > 0) {
      const { imageUrl, error } = await uploadImage(formData.get("image"));
  
      if (error) {
        throw new Error(error);
      }

      cloudinaryImageUrl = imageUrl;
    }

    const dive = new Dive({
      userEmail: session.user.email,
      title: formData.get("title"),
      location: formData.get("location"),
      description: formData.get("description"),
      date: formData.get("date"),
      time: formData.get("time"),
      depth: formData.get("depth"),
      notes: formData.get("notes"),
      seen_nudibranch: formData.get("seen_nudibranch") === "on",
      location_coords: formData.get("location_coords"),
      image: cloudinaryImageUrl,
    });

    const savedDive = await dive.save();

    return {
      dive: savedDive,
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};
