import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      exp: number;
      iat: number;
      id: number;
      jti: string;
      token: string;
      refreshToken: string;
      sub: string;
      userName: string;
    };
  }
}
