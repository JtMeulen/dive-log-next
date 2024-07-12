"use server";

import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";
import Dive from "@/lib/db/models/Dive";

// TODO: accept filter, sorting and pagination options
export const getDives = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    await connectDB();

    const dives = await Dive.find({ userId: session.user.id });

    const sortedByNewest = dives.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    return {
      dives: sortedByNewest,
    };
  } catch (e) {
    return {
      // TODO: throw new Error to show error page?
      error: e.message,
    };
  }
};
