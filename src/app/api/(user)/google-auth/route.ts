import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { dbConnect } from "../../mongodb";
import User from "@/models/User";
import { sign } from "jsonwebtoken";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { credential } = await req.json();

    if (!credential) {
      return NextResponse.json(
        { error: "Google credential is required" },
        { status: 400 }
      );
    }

    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid Google token" },
        { status: 400 }
      );
    }

    const { sub: googleId, email, name, picture } = payload;

    if (!email) {
      return NextResponse.json(
        { error: "Email not provided by Google" },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // User exists - handle account merging
      if (user.authProvider === 'email' && !user.googleId) {
        // Upgrade email account to support Google authentication
        user.authProvider = 'google';
        user.googleId = googleId;
        user.picture = picture;
        await user.save();
      } else if (user.authProvider === 'google' && !user.googleId) {
        // Fix inconsistent data: Google user without googleId
        user.googleId = googleId;
        user.picture = picture;
        await user.save();
      } else if (user.googleId && user.googleId !== googleId) {
        return NextResponse.json(
          { error: "Email already registered with different Google account" },
          { status: 400 }
        );
      }
    } else {
      // Create new user
      user = new User({
        name: name || email.split('@')[0],
        email,
        authProvider: 'google',
        googleId,
        picture,
      });
      await user.save();
    }

    // Generate JWT token
    const token = sign(
      { userId: user._id, email },
      process.env.SECRET_KEY as string,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "Google authentication successful",
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        picture: user.picture 
      },
      token,
    });
  } catch (error) {
    console.error("Google auth error:", error);
    return NextResponse.json(
      { error: "Google authentication failed" },
      { status: 500 }
    );
  }
}
