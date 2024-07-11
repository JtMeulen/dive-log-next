import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";

export const authOptions = {
  providers: [
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
          throw new Error("Wrong Email");
        }

        const passwordMatch = await bcrypt.compare(
          credentials?.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Wrong Password");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      if (user?.userName) {
        token.userName = user.userName;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;

      return session;
    },
  },
};
