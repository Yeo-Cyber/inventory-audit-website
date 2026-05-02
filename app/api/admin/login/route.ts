import { NextResponse } from "next/server";
import { setAdminSession } from "@/lib/auth";
import { isSupabaseAdminConfigured, supabaseRequest } from "@/lib/cms";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const isFormPost = contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data");
  const body = isFormPost
    ? Object.fromEntries((await request.formData()).entries())
    : ((await request.json()) as { username?: string; password?: string });
  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      { error: "Supabase environment variables are not configured." },
      { status: 500 },
    );
  }

  const verified = await supabaseRequest<boolean>(
    "/rest/v1/rpc/verify_admin_login",
    {
      method: "POST",
      body: JSON.stringify({
        input_username: username,
        input_password: password,
      }),
    },
    true,
  );

  if (!verified) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  await setAdminSession(username);

  if (isFormPost) {
    return NextResponse.redirect(new URL("/admin", request.url), { status: 303 });
  }

  return NextResponse.json({ ok: true });
}
