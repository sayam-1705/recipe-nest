import { sign } from "jsonwebtoken";

export const createJwt = (userId: string, email: string) => {
  try {
    const payload = { userId, email };

    const secret = process.env.SECRET_KEY as string;
    if (!secret) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }

    const token = sign(payload, secret, { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.error("Error creating JWT:", error);
    throw new Error("Failed to create authentication token");
  }
};
