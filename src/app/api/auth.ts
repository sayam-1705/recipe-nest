import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function auth(req: NextRequest): Promise<AuthData | null> {
  try {
    const authHeader = req.headers.get("Authorization") as string;
    if (!authHeader) {
      console.log("No authorization header found");
      return null;
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith("Bearer ") 
      ? authHeader.substring(7) 
      : authHeader;

    if (!token || token.trim() === "") {
      console.log("No token found after parsing header");
      return null;
    }

    try {
      const secret = process.env.SECRET_KEY as string;
      if (!secret) {
        console.error("SECRET_KEY environment variable is not defined");
        return null;
      }
      
      console.log("Attempting to verify token...");
      const decodedToken = jwt.verify(token, secret) as AuthData;
      console.log("Token verified successfully for user:", decodedToken.userId);
      return decodedToken;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.error("Token has expired:", error);
      } else if (error instanceof jwt.JsonWebTokenError) {
        console.error("Invalid token:", error.message);
      } else {
        console.error("Token verification error:", error);
      }
      return null;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}
