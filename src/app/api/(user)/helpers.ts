import { sign } from "jsonwebtoken";

export const createJwt = (userId: string, email: string) => {
  const payload = { userId, email };
  const secret = process.env.SECRET_KEY as string;
  const token = sign(payload, secret, { expiresIn: "1h" });
  return token;
};
