"use server";

import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";
import Dive from "@/lib/db/models/Dive";
import { uploadImage } from "@/lib/cloudinary/uploadImage";
import { deleteImage } from "@/lib/cloudinary/deleteImage";

export const updateDive = async (formData, id) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    await connectDB();

    // Get dive from before update to remove cloudinary image if a new one is uploaded and check if the user is the owner
    const oldDiveData = await Dive.findById(id);

    if (oldDiveData.userEmail !== session.user.email) {
      return {
        error: "Unauthorized",
      };
    }

    let newCloudinaryImageUrl = "";

    if (formData.get("image")?.size > 0) {
      const { imageUrl, error } = await uploadImage(formData.get("image"));

      if (error) {
        throw new Error(error);
      }

      newCloudinaryImageUrl = imageUrl;

      // Delete the old image from cloudinary after a new one was uploaded successfully
      if (oldDiveData.image) {
        const imageId = oldDiveData.image
          .split("/")
          .pop()
          .replace(/\.(.*)/, "");
        await deleteImage(imageId);
      }
    }

    const dive = {
      title: formData.get("title"),
      location: formData.get("location"),
      description: formData.get("description"),
      date: formData.get("date"),
      time: formData.get("time"),
      depth: formData.get("depth"),
      notes: formData.get("notes"),
      seen_nudibranch: formData.get("seen_nudibranch") === "on",
      location_coords: formData.get("location_coords"),
      image: newCloudinaryImageUrl,
    };

    if (!dive.title || !dive.date) {
      return {
        error: "Fields cannot be empty.",
      };
    }

    const savedDive = await Dive.findByIdAndUpdate(id, dive);

    return {
      dive: savedDive,
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};
