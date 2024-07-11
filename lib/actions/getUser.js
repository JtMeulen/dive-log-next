"use server";

import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";

import User from "@/lib/db/models/User";

export const getUser = async (req) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  await connectDB();

  const user = await User.findById(session.user.id);

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    birthdate: user.birthdate,
  };
};
