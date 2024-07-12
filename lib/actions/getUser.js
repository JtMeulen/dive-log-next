"use server";

import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/db/mongodb";
import { authOptions } from "@/lib/db/auth";

import User from "@/lib/db/models/User";

export const getUser = async (req) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await connectDB();

  const user = await User.findById(session.user.id);

  if (!user) {
    return {
      error: 'User not found!',
    };
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    birthdate: user.birthdate,
  };
};
