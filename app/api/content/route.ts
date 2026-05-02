import { NextResponse } from "next/server";
import { supabaseRequest } from "@/lib/cms";

export async function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  const rows = await supabaseRequest<Array<{ data: Record<string, unknown> }>>(
    `/rest/v1/content_blocks?key=eq.${encodeURIComponent(key)}&select=data&limit=1`,
  );

  return NextResponse.json(rows?.[0]?.data ?? {});
}
