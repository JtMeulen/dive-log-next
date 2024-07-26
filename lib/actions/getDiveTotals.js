"use server";

import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";
import Dive from "@/lib/db/models/Dive";

export const getDiveTotals = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    await connectDB();

    const dives = await Dive.find({ userEmail: session.user.email });

    dives.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    const data = {
      totalDives: dives.length,
      totalTime: dives.reduce((acc, dive) => acc + parseInt(dive.time || 0), 0),

      averageDepth: dives.length
        ? Math.round(
            dives.reduce((acc, dive) => acc + parseInt(dive.depth || 0), 0) /
            dives.length
          )
        : 0,

      timeSinceLastDive: dives.length
        ? Math.round(
            (Date.now() -
              new Date(
                dives.filter((a) => new Date(a.date) < new Date())[0].date
              ).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : 0,

      nudibranchesSeen: dives.filter((a) => a.seen_nudibranch).length,
    };

    return {
      data,
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};
