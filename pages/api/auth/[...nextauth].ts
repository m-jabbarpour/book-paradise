import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as any;

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const body = JSON.stringify({
          email,
          password,
        });

        const requestOptions = {
          method: "POST",
          headers,
          body,
        };

        const res = await fetch(
          "https://book-paradise.ir/api/Account/Login",
          requestOptions
        );

        const user = await res.json();

        if (user) return user;
        else return null;
      },
    }),
  ],

  session: { strategy: "jwt" },

  pages: { signIn: "/login" },

  jwt: { maxAge: 60 * 60 * 24 * 30 },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
