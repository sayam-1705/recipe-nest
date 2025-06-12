import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface UserData {
  userId: string;
  email: string;
}

export async function auth(req: NextRequest): Promise<UserData | null> {
  const token = req.headers.get("Authorization") as string;
  if (!token) {
    NextResponse.json(
      { error: "Authorization token is missing." },
      { status: 401 }
    );
    return null;
  }

  try {
    const secret = process.env.SECRET_KEY as string;
    const decodedToken = jwt.verify(token, secret) as UserData;
    return decodedToken;
  } catch (error) {
    NextResponse.json({ error: "Invalid token." }, { status: 401 });
    return null;
  }
}
