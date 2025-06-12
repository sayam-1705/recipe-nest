import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { AuthData } from "./authDataType"; 

export async function auth(req: NextRequest): Promise<AuthData | null> {
  try {
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
      const decodedToken = jwt.verify(token, secret) as AuthData;
      return decodedToken;
    } catch (error) {
      NextResponse.json({ error: "Invalid token." }, { status: 401 });
      return null;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    NextResponse.json(
      { error: "An error occurred during authentication" },
      { status: 500 }
    );
    return null;
  }
}
