import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSessionToken, isAdminEnabled, verifyAdminPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAdminEnabled()) {
    return NextResponse.json({ message: "未配置管理员环境变量" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const password = String(body?.password || "");

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ message: "密码错误" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: getAdminSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return response;
}
