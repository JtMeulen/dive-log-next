"use server";

import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";
import Dive from "@/lib/db/models/Dive";
import { uploadImage } from "../cloudinary/uploadImage";
import getSanitizedFormData from "@/lib/utils/getSanitizedFormData";
import emptyInput from "@/lib/utils/emptyInput";

export const newDiveAction = async (formData) => {
  const session = await getServerSession(authOptions);
  const sanitizedData = getSanitizedFormData(formData);

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    await connectDB();

    if (
      emptyInput(sanitizedData.get("title")) ||
      emptyInput(sanitizedData.get("date"))
    ) {
      return {
        error: "Missing form data.",
      };
    }

    let cloudinaryImageUrl = "";

    if (sanitizedData.get("image")?.size > 0) {
      const { imageUrl, error } = await uploadImage(sanitizedData.get("image"));

      if (error) {
        throw new Error(error);
      }

      cloudinaryImageUrl = imageUrl;
    }

    const dive = new Dive({
      userEmail: session.user.email,
      title: sanitizedData.get("title"),
      location: sanitizedData.get("location"),
      description: sanitizedData.get("description"),
      date: sanitizedData.get("date"),
      time: sanitizedData.get("time"),
      depth: sanitizedData.get("depth"),
      notes: sanitizedData.get("notes"),
      seen_nudibranch: sanitizedData.get("seen_nudibranch") === "on",
      location_coords: sanitizedData.get("location_coords"),
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
