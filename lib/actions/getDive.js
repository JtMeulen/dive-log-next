"use server";

import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";
import Dive from "@/lib/db/models/Dive";

export const getDive = async (id) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    await connectDB();

    const dive = await Dive.findById(id);

    return {
      dive: dive,
    };
  } catch (e) {
    return {
      // TODO: throw new Error to show error page?
      error: e.message,
    };
  }
};