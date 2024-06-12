import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../db/db";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        console.log("profile", profile);
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
        };
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, user }) {
      // Log the user and session objects

      // Add user details to the session object
      session.user.userId = user.id;
      session.user.name = user.name;
      session.user.email = user.email;

      console.log("session", session);

      return session;
    },
  },
};

export default NextAuth(authOptions);
