import { dbConnect } from "@/app/api/mongodb";
import User from "@/models/User";
import { NextRequest } from "next/server";
import { apiResponse } from "@/utils/api";
import { validate } from "@/utils/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await dbConnect();
    const { userId } = await params;

    if (!validate.objectId(userId)) {
      return apiResponse.badRequest("Invalid user ID format");
    }

    const user = await User.findById(userId);
    if (!user) {
      return apiResponse.notFound("User");
    }

    return apiResponse.success({ user });
  } catch {
    return apiResponse.error("Failed to fetch user");
  }
}
