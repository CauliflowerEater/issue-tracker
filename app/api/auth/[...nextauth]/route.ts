import NextAuth from "next-auth";
import authOption from "../authOptions";

export const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
