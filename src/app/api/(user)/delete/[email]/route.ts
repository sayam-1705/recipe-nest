import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/api/mongodb";
import { z } from "zod";
import { validatePassword } from "@/app/api/(user)/validations";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { auth } from "@/app/api/auth";

const reqSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  await dbConnect();

  const authData = await auth(req);
  if (!authData) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const { email } = await params;

  if (authData.email !== email) {
    return NextResponse.json(
      { error: "You can only delete your own account" },
      { status: 403 }
    );
  }

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
