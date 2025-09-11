import { NextResponse } from 'next/server';

export async function GET() {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
    vercel: {
      region: process.env.VERCEL_REGION || 'local',
      url: process.env.VERCEL_URL || 'localhost',
    }
  };

  return NextResponse.json(healthCheck);
}

export async function HEAD() {
  return new Response(null, { status: 200 });
}
