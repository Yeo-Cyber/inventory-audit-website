import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/auth";
import { supabaseRequest } from "@/lib/cms";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = "cms-media";

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
    "/rest/v1/media_files?select=*&order=created_at.desc",
    {},
    true,
  );

  return NextResponse.json(rows ?? []);
}

export async function POST(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Supabase admin env is not configured." }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const category = String(formData.get("category") || "general");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  const path = `${category}/${Date.now()}-${safeName}`;
  const upload = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "true",
    },
    body: file,
  });

  if (!upload.ok) {
    return NextResponse.json({ error: await upload.text() }, { status: 500 });
  }

  const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
  const rows = await supabaseRequest(
    "/rest/v1/media_files",
    {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        bucket,
        path,
        url: publicUrl,
        alt_text: file.name,
        mime_type: file.type,
        size_bytes: file.size,
      }),
    },
    true,
  );

  return NextResponse.json(Array.isArray(rows) ? rows[0] : rows);
}
