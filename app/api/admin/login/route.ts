import { NextResponse } from "next/server";
import { setAdminSession } from "@/lib/auth";
import { isSupabaseAdminConfigured, supabaseRequest } from "@/lib/cms";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };

  if (!body.username || !body.password) {
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
        input_username: body.username,
        input_password: body.password,
      }),
    },
    true,
  );

  if (!verified) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  await setAdminSession(body.username);

  return NextResponse.json({ ok: true });
}
