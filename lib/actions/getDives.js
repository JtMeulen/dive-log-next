"use server";

import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";
import Dive from "@/lib/db/models/Dive";

export const getDives = async (sort, search) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    await connectDB();

    const dives = await Dive.find({
      userEmail: session.user.email,
      $or: [
        { title: { $regex: search || "", $options: "i" } },
        { description: { $regex: search || "", $options: "i" } },
        { location: { $regex: search || "", $options: "i" } },
      ],
    });

    // Sorting
    switch (sort) {
      case "oldest":
        dives.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        break;
      case "newest":
        dives.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        break;
      case "deepest":
        dives.sort((a, b) => {
          return b.depth - a.depth;
        });
        break;
      case "shallowest":
        dives.sort((a, b) => {
          return a.depth - b.depth;
        });
        break;
      case "longest":
        dives.sort((a, b) => {
          return b.time - a.time;
        });
        break;
      case "shortest":
        dives.sort((a, b) => {
          return a.time - b.time;
        });
        break;
      case "a-z":
        dives.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        break;
      case "z-a":
        dives.sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
        break;
      default:
        break;
    }

    return {
      dives: JSON.parse(JSON.stringify(dives)),
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};
