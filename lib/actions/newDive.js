"use server";

import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";
import Dive from "@/lib/db/models/Dive";
import { cloudinary } from "@/lib/cloudinary";

export const newDiveAction = async (formData) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  // TODO: Extract this logic to a separate function in a different file
  let cloudinaryUrl = "";

  try {
    const imageFile = formData.get("image");

    if (imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();

      const buffer = new Uint8Array(arrayBuffer);
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, function (error, result) {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          })
          .end(buffer);
      });

      cloudinaryUrl = uploadResponse?.secure_url;
    }
  } catch (e) {
    console.log("error:", e.message);
    return {
      error: "Failed to upload image",
    };
  }

  const data = {
    userId: session.user.id,
    title: formData.get("title"),
    location: formData.get("location"),
    description: formData.get("description"),
    date: formData.get("date"),
    time: formData.get("time"),
    depth: formData.get("depth"),
    notes: formData.get("notes"),
    seen_nudibranch: formData.get("seen_nudibranch") === "on",
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
    console.log("error:", e.message);
    return {
      error: e.message,
    };
  }
};
