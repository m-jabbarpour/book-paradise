import NextAuth from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

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
      expiresAt: number;
    };
  }
  interface User {
    id: number;
    userName: string;
    email: string;
    token: string;
    refreshToken: string;
    expiresAt: number;
  }

  interface JWT {
    id?: number;
    userName?: string;
    email?: string;
    token?: string;
    refreshToken?: string;
    expiresAt?: number & DefaultJWT;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: number;
    userName?: string;
    email?: string;
    token?: string;
    refreshToken?: string;
    expiresAt?: number & DefaultJWT;
  }
}
