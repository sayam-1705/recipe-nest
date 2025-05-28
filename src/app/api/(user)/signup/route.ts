import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { dbConnect } from "../../mongodb";
import { validateEmail, validatePassword } from "../../validations";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const reqSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();

  const bodyData = reqSchema.safeParse(body);
  if (!bodyData.success) {
    return NextResponse.json({ error: bodyData.error }, { status: 400 });
  }

  const { name, email, password } = body;

  if (!validateEmail(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }
  if (!validatePassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  return NextResponse.json(
    {
      message: "User created successfully",
      user: { name: newUser.name, email: newUser.email },
    },
    { status: 201 }
  );
}
