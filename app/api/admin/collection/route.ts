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

  const section = new URL(request.url).searchParams.get("section");
  if (!section) {
    return NextResponse.json({ error: "Missing section" }, { status: 400 });
  }

  const rows = await supabaseRequest(
    `/rest/v1/collection_items?section=eq.${encodeURIComponent(section)}&select=id,section,data,sort_order&order=sort_order.asc,created_at.asc`,
    {},
    true,
  );

  return NextResponse.json(rows ?? []);
}

export async function POST(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  const body = (await request.json()) as {
    section?: string;
    data?: Record<string, unknown>;
    sort_order?: number;
  };

  if (!body.section || !body.data) {
    return NextResponse.json({ error: "Missing section or data" }, { status: 400 });
  }

  const rows = await supabaseRequest(
    "/rest/v1/collection_items",
    {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        section: body.section,
        data: body.data,
        sort_order: body.sort_order ?? 100,
      }),
    },
    true,
  );

  return NextResponse.json(Array.isArray(rows) ? rows[0] : rows);
}

export async function PATCH(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  const body = (await request.json()) as {
    id?: string;
    data?: Record<string, unknown>;
    sort_order?: number;
  };

  if (!body.id || !body.data) {
    return NextResponse.json({ error: "Missing id or data" }, { status: 400 });
  }

  const rows = await supabaseRequest(
    `/rest/v1/collection_items?id=eq.${encodeURIComponent(body.id)}`,
    {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        data: body.data,
        sort_order: body.sort_order ?? 100,
        updated_at: new Date().toISOString(),
      }),
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

  await supabaseRequest(
    `/rest/v1/collection_items?id=eq.${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    },
    true,
  );

  return NextResponse.json({ ok: true });
}
