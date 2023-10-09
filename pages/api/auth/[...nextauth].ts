import NextAuth, { JWT, NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(tokenObject: JWT) {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
      id: tokenObject.id,
      userName: tokenObject.userName,
      email: tokenObject.email,
      token: tokenObject.token,
      refreshToken: tokenObject.refreshToken,
    });

    const requestOptions = {
      method: "POST",
      headers,
      body,
    };

    const res = await fetch(
      process.env.BASE_URL + "Account/RefreshToken",
      requestOptions
    );

    const user = await res.json();

    return { ...user, expiresAt: Date.now() + 60 * 1000 };
  } catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userName: { label: "Email", type: "text" },
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
          process.env.BASE_URL + "Account/Login",
          requestOptions
        );

        const user = await res.json();

        if (user) return { ...user, expiresAt: Date.now() + 60 * 1000 };
        else return null;
      },
    }),
  ],

  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },

  pages: { signIn: "/login" },

  callbacks: {
    async jwt({ token, user }) {
      const expiresAt = token.expiresAt as number;

      if (expiresAt && Date.now() > expiresAt) {
        const newToken = await refreshToken(token);
        return { ...token, ...newToken };
      }

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
