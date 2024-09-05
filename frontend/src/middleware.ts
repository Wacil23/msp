import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req) {
  const token = await getToken({ req });
  const isExpired = Date.now() >= (token?.expires_at ?? 0) * 1000;

  if (token?.error === "RefreshAccessTokenError" || isExpired) {
    return NextResponse.redirect(new URL("/connexion", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/chat",
    "/dashboard/membres",
    "/dashboard/parametres",
  ],
};
