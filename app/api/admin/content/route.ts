import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/auth";
import { supabaseRequest } from "@/lib/cms";

async function guard() {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

export async function GET(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  const key = new URL(request.url).searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  const rows = await supabaseRequest<Array<{ data: Record<string, unknown> }>>(
    `/rest/v1/content_blocks?key=eq.${encodeURIComponent(key)}&select=data&limit=1`,
    {},
    true,
  );

  return NextResponse.json(rows?.[0]?.data ?? {});
}

export async function PUT(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  const body = (await request.json()) as { key?: string; data?: Record<string, unknown> };

  if (!body.key || !body.data) {
    return NextResponse.json({ error: "Missing key or data" }, { status: 400 });
  }

  const rows = await supabaseRequest<Array<{ key: string; data: Record<string, unknown> }>>(
    `/rest/v1/content_blocks?on_conflict=key`,
    {
      method: "POST",
      headers: {
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify({
        key: body.key,
        data: body.data,
        updated_at: new Date().toISOString(),
      }),
    },
    true,
  );

  return NextResponse.json(rows?.[0] ?? { key: body.key, data: body.data });
}
