import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../mongodb";
import { z } from "zod";
import { validatePassword } from "../validations";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { createJwt } from "../helpers";

const reqSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const bodyData = reqSchema.safeParse(body);
    if (!bodyData.success) {
      return NextResponse.json({ error: bodyData.error }, { status: 400 });
    }

    const { email, password } = bodyData.data;

    if (!validatePassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 401 }
      );
    }

    const token = createJwt(user._id, email);

    return NextResponse.json(
      {
        message: "Login successful",
        user: { id: user._id, name: user.name, email: user.email },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
