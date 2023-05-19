import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import connectToDb from "@utils/database";

import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDb();
        const isUserExists = await User.findOne({
          email: profile.email,
        });
        if (!isUserExists) {
          console.log(profile.name);
          await User.create({
            username: profile.name.toString().replace(" ", "").toLowerCase(),
            email: profile.email,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
