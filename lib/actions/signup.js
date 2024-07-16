"use server";

import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";

export const signupAction = async (formData) => {
  const data = {
    name: formData.get("name"),
    email: formData.get("email").toLowerCase(),
    password: formData.get("password"),
  };

  if (formData.get("password") !== formData.get("password-repeat")) {
    return {
      error: "Passwords do not match.",
    };
  }

  try {
    await connectDB();

    const userFound = await User.findOne({ email: data.email });

    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      avatar: "",
      birthdate: null,
    });

    const savedUser = await user.save();

    return {
      user: savedUser,
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};
