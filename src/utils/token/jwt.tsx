import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  sub: string;
  username: string;
  role: string;
  exp: number;
  iat: number;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  return decoded.exp * 1000 < Date.now();
}
