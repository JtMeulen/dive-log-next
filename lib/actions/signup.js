"use server";

import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";
import { passwordPattern, emailPattern } from "@/utils/validation/patterns";
import getSanitizedFormData from "@/lib/utils/getSanitizedFormData";
import emptyInput from "@/lib/utils/emptyInput";

export const signupAction = async (formData) => {
  const sanitizedData = getSanitizedFormData(formData);

  const data = {
    name: sanitizedData.get("name"),
    email: sanitizedData.get("email").toLowerCase(),
    password: sanitizedData.get("password"),
  };

  // TODO: Aggregate all errors before returning. Also return the field name so we can add an error message to the specific field.

  if (emptyInput(data.name) || emptyInput(data.email) || emptyInput(data.password)) {
    return {
      error: "Missing form data.",
    };
  }

  if (new RegExp(passwordPattern).test(data.password) === false) {
    return {
      error:
        "Password must minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.",
    };
  }

  if (new RegExp(emailPattern).test(data.email) === false) {
    return {
      error:
        "Please provide a valid email address.",
    };
  }

  if (sanitizedData.get("password") !== sanitizedData.get("password-repeat")) {
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
      user: JSON.parse(JSON.stringify(savedUser)),
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
};
