import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, tag, secret } = body;

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        message: `Path ${path} revalidated successfully`,
        revalidated: true,
        now: Date.now(),
      });
    }

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({
        message: `Tag ${tag} revalidated successfully`,
        revalidated: true,
        now: Date.now(),
      });
    }

    const pathsToRevalidate = ["/", "/api/getAllRecipes"];

    pathsToRevalidate.forEach((path) => {
      revalidatePath(path);
    });

    return NextResponse.json({
      message: "Common paths revalidated successfully",
      revalidated: true,
      paths: pathsToRevalidate,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const pathsToRevalidate = ["/", "/api/getAllRecipes"];

    pathsToRevalidate.forEach((path) => {
      revalidatePath(path);
    });

    return NextResponse.json({
      message: "Scheduled revalidation completed",
      revalidated: true,
      paths: pathsToRevalidate,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Scheduled revalidation error:", error);
    return NextResponse.json(
      {
        message: "Scheduled revalidation failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
