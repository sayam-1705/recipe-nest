import { NextRequest } from "next/server";
import { dbConnect } from "../../mongodb";
import { schemas } from "../validations";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { apiResponse } from "@/utils/api";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const result = schemas.signupSchema.safeParse(body);

    if (!result.success) {
      return apiResponse.badRequest(result.error.errors[0].message);
    }

    const { name, email, password } = result.data;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return apiResponse.badRequest("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return apiResponse.success(
      {
        message: "User created successfully",
        user: { name: newUser.name, email: newUser.email },
      },
      201
    );
  } catch {
    return apiResponse.error("Signup failed");
  }
}
