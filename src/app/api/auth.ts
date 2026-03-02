import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function auth(req: NextRequest): Promise<AuthData | null> {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return null;

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : authHeader;

    if (!token?.trim()) return null;

    const secret = process.env.SECRET_KEY;
    if (!secret) return null;

    return jwt.verify(token, secret) as AuthData;
  } catch {
    return null;
  }
}
