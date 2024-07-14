"use server";

import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";

import User from "@/lib/db/models/User";
import { redirect } from "next/navigation";

export const updateUser = async (formData) => {
  let success = false;
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    // TODO: fetch avatar file and save it to cloudinary
    // if old avatar, delete it from cloudinary

    const data = {
      name: formData.get("name"),
      birthdate: formData.get("birthdate"),
    };

    await connectDB();

    const user = await User.findByIdAndUpdate(session.user.id, data);

    success = true;
  } catch (error) {
    return {
      error: error.message,
    };
  } finally {
    if (success) {
      // Workaround for redirect throwing an internal error (next js bug), 
      // so we redirect in the finally block reading a variable set in the outer scope
      redirect("/profile");
    }
  }
};
