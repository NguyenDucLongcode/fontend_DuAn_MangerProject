import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  // Không có accessToken => cho đi tiếp, client sẽ handle refresh
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!accessToken) {
    return NextResponse.next();
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(accessToken, secret);

    if (typeof payload.role !== "string" || payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT verify failed", err);
    return NextResponse.next(); // Cho đi tiếp, client axios sẽ tự refresh token
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
