"use server";

import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";
import Dive from "@/lib/db/models/Dive";
import { uploadImage } from "@/lib/cloudinary/uploadImage";
import { deleteImage } from "@/lib/cloudinary/deleteImage";
import getSanitizedFormData from "@/lib/utils/getSanitizedFormData";
import emptyInput from "@/lib/utils/emptyInput";

export const updateDive = async (formData, id) => {
  const session = await getServerSession(authOptions);
  const sanitizedData = getSanitizedFormData(formData);

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

    let newCloudinaryImageUrl = oldDiveData.image;

    if (sanitizedData.get("image")?.size > 0) {
      const { imageUrl, error } = await uploadImage(sanitizedData.get("image"));

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
      title: sanitizedData.get("title"),
      location: sanitizedData.get("location"),
      description: sanitizedData.get("description"),
      date: sanitizedData.get("date"),
      time: sanitizedData.get("time"),
      depth: sanitizedData.get("depth"),
      notes: sanitizedData.get("notes"),
      seen_nudibranch: sanitizedData.get("seen_nudibranch") === "on",
      location_coords:
        sanitizedData.get("location_coords") || oldDiveData.location_coords,
      image: newCloudinaryImageUrl,
    };

    if (emptyInput(dive.title) || emptyInput(dive.date)) {
      return {
        error: "Fields cannot be empty.",
      };
    }

    const savedDive = await Dive.findByIdAndUpdate(id, dive);

    revalidatePath(`/dives/${id}`);
    revalidatePath("/dives");

    return {
      dive: JSON.parse(JSON.stringify(savedDive)),
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};
