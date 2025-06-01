import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/api/mongodb";
import { z } from "zod";
import { validatePassword } from "@/app/api/(user)/validations";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const reqSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  await dbConnect();

  const { email } = await params;
  const { password } = await req.json();

  const data = reqSchema.safeParse({ email, password });
  if (!data.success) {
    return NextResponse.json({ error: data.error }, { status: 400 });
  }

  if (!validatePassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
  }

  await User.deleteOne({ email: email });

  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 }
  );
}
