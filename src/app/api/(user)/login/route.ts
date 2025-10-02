import { NextRequest } from "next/server";
import { dbConnect } from "../../mongodb";
import { schemas } from "../validations";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { createJwt } from "../helpers";
import { apiResponse } from "@/utils/api";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const result = schemas.loginSchema.safeParse(body);
    
    if (!result.success) {
      return apiResponse.badRequest(result.error.errors[0].message);
    }

    const { email, password } = result.data;

    const user = await User.findOne({ email });
    if (!user) {
      return apiResponse.notFound("User");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return apiResponse.unauthorized("Invalid credentials");
    }

    const token = createJwt(user._id, email);

    return apiResponse.success({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch {
    return apiResponse.error("Login failed");
  }
}
