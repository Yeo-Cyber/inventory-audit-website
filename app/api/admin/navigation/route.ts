import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/auth";
import { supabaseRequest } from "@/lib/cms";

async function guard() {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;

  const rows = await supabaseRequest(
    "/rest/v1/navigation_items?select=id,data,sort_order&order=sort_order.asc",
    {},
    true,
  );

  return NextResponse.json(rows ?? []);
}

export async function POST(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  const body = (await request.json()) as {
    id?: string;
    data?: { label: string; href: string };
    sort_order?: number;
  };

  if (!body.data) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const payload = {
    data: body.data,
    sort_order: body.sort_order ?? 100,
    updated_at: new Date().toISOString(),
  };

  if (body.id) {
    const rows = await supabaseRequest(
      `/rest/v1/navigation_items?id=eq.${encodeURIComponent(body.id)}`,
      {
        method: "PATCH",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify(payload),
      },
      true,
    );
    return NextResponse.json(Array.isArray(rows) ? rows[0] : rows);
  }

  const rows = await supabaseRequest(
    "/rest/v1/navigation_items",
    {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(payload),
    },
    true,
  );

  return NextResponse.json(Array.isArray(rows) ? rows[0] : rows);
}

export async function DELETE(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await supabaseRequest(`/rest/v1/navigation_items?id=eq.${id}`, { method: "DELETE" }, true);
  return NextResponse.json({ ok: true });
}
