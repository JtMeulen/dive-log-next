import credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { connectDB } from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    }),
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) {
          throw new Error("Email does not exist.");
        }

        const passwordMatch = await bcrypt.compare(
          credentials?.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Wrong Password.");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Store the user in the database if the login is through Google
      if (account.provider === "google") {
        const { name, email, image } = user;

        try {
          await connectDB();

          const userFound = await User.findOne({ email });

          if (userFound) {
            return { user: userFound };
          }

          // Just a random password, but is unused as the login is through Google
          const hashedPassword = await bcrypt.hash(`${Math.random()}`, 10);

          const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            avatar: image,
            birthdate: null,
          });

          await newUser.save();

          return { user: newUser };
        } catch (error) {
          return {
            error: error.message,
          };
        }
      }

      return user;
    },
  },
};
