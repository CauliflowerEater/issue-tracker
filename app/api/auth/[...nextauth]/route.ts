import NextAuth from "next-auth";
import authOption from "../authOptions";

const handler = NextAuth(authOption);

export const GET=handler;
export const POST=handler;
