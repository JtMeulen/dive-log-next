"use server";

import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";
import Dive from "@/lib/db/models/Dive";

export const debug_db_populate = async () => {
  const session = await getServerSession(authOptions);

  if (!session || process.env.NODE_ENV !== "development") {
    return {
      error: "Unauthorized",
    };
  }

  await connectDB();

  const numberOfDives = 25; // Change this to the desired number of dummy dives

  for (let i = 0; i < numberOfDives; i++) {
    const dive = new Dive({
      userId: session.user.id,
      title: `Dummy Dive ${i + 1}`,
      location: `Dummy Location ${i + 1}`,
      description: `Dummy Description ${i + 1}`,
      date: new Date(Date.now() - Math.floor(Math.random() * 94608000000) - 78840000000), // Random date within the last 3 years (94608000000 milliseconds in a year, 78840000000 milliseconds in 2 years)
      time: Math.floor(Math.random() * 60) + 1,
      depth: Math.floor(Math.random() * 30) + 1,
      notes: `Dummy Notes ${i + 1}`,
      seen_nudibranch: Math.random() < 0.5,
      location_coords: `${Math.random() * 180 - 90},${Math.random() * 360 - 180}`,
      image: null,
    });

    await dive.save();
  }

  return {
    success: true,
  };
};
