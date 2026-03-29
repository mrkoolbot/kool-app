import { NextResponse } from "next/server";

export async function GET() {
  const hasKey = !!process.env.RESEND_API_KEY;
  if (hasKey) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false }, { status: 404 });
}
