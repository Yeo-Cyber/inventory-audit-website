"use client";

import { useState } from "react";

type Row = {
  id?: string;
  section?: string;
  data: Record<string, string>;
  sort_order?: number;
};

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "image" | "gallery";
};

type AdminEditorProps = {
  title: string;
  mode: "content" | "collection" | "navigation";
  contentKey?: string;
  section?: string;
  fields: Field[];
  initialContent?: Record<string, string>;
  initialRows?: Row[];
};

function emptyData(fields: Field[]) {
  return Object.fromEntries(fields.map((field) => [field.name, ""]));
}

function imageList(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((url) => url.trim())
    .filter(Boolean)
    .slice(0, 10);
}

export function AdminEditor({
  title,
  mode,
  contentKey,
  section,
  fields,
  initialContent = {},
  initialRows = [],
}: AdminEditorProps) {
  const [content, setContent] = useState<Record<string, string>>(initialContent);
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [editing, setEditing] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>(emptyData(fields));
  const [message, setMessage] = useState("");

  async function upload(file: File, target: (url: string) => void) {
    const form = new FormData();
    form.append("file", file);
    form.append("category", section || contentKey || "general");
    const response = await fetch("/api/admin/media", { method: "POST", body: form });
    const payload = await response.json();
    if (payload?.url) target(payload.url);
  }

  async function uploadGallery(files: FileList, value: string, target: (value: string) => void) {
    const existing = imageList(value);
    const availableSlots = Math.max(0, 10 - existing.length);
    const selectedFiles = Array.from(files).slice(0, availableSlots);
    const uploaded: string[] = [];

    for (const file of selectedFiles) {
      const form = new FormData();
      form.append("file", file);
      form.append("category", section || contentKey || "general");
      const response = await fetch("/api/admin/media", { method: "POST", body: form });
      const payload = await response.json();
      if (payload?.url) {
        uploaded.push(payload.url);
      }
    }

    target([...existing, ...uploaded].slice(0, 10).join("\n"));
  }

  function renderField(
    field: Field,
    data: Record<string, string>,
    setData: (next: Record<string, string>) => void,
  ) {
    const value = data[field.name] ?? "";
    const base = "rounded-md border border-neutral-300 px-3 py-2 text-sm";

    return (
      <label key={field.name} className="grid gap-2 text-sm font-bold text-neutral-700">
        {field.label}
        {field.type === "textarea" || field.type === "gallery" ? (
          <textarea
            rows={field.type === "gallery" ? 6 : 4}
            value={value}
            onChange={(event) => setData({ ...data, [field.name]: event.target.value })}
            className={base}
          />
        ) : (
          <input
            value={value}
            type={field.type === "number" ? "number" : "text"}
            onChange={(event) => setData({ ...data, [field.name]: event.target.value })}
            className={base}
          />
        )}
        {field.type === "image" ? (
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) upload(file, (url) => setData({ ...data, [field.name]: url }));
            }}
          />
        ) : null}
        {field.type === "gallery" ? (
          <div className="grid gap-2">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => {
                const files = event.target.files;
                if (files?.length) {
                  uploadGallery(files, value, (nextValue) => setData({ ...data, [field.name]: nextValue }));
                }
              }}
            />
            <p className="text-xs font-medium text-neutral-500">
              อัปโหลดได้สูงสุด 10 รูปต่อ 1 reference หรือวาง URL รูปภาพทีละบรรทัด
            </p>
            {imageList(value).length ? (
              <div className="grid grid-cols-5 gap-2">
                {imageList(value).map((url) => (
                  <img key={url} src={url} alt="" className="aspect-square rounded-md border border-neutral-200 object-cover" />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </label>
    );
  }

  async function saveContent() {
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: contentKey, data: content }),
    });
    setMessage("Saved");
  }

  async function saveRow() {
    const row = {
      id: editing?.id,
      section,
      data: draft,
      sort_order: Number(draft.sort_order || editing?.sort_order || 100),
    };
    const endpoint = mode === "navigation" ? "/api/admin/navigation" : "/api/admin/collection";
    const method = mode === "navigation" ? "POST" : editing?.id ? "PATCH" : "POST";
    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
    const payload = await response.json();
    setRows((current) => {
      const normalized = { ...payload, data: payload.data ?? draft };
      if (editing?.id) {
        return current.map((item) => (item.id === editing.id ? normalized : item));
      }
      return [...current, normalized];
    });
    setEditing(null);
    setDraft(emptyData(fields));
    setMessage("Saved");
  }

  async function deleteRow(row: Row) {
    if (!row.id) return;
    const endpoint = mode === "navigation" ? "/api/admin/navigation" : "/api/admin/collection";
    await fetch(`${endpoint}?id=${row.id}`, { method: "DELETE" });
    setRows((current) => current.filter((item) => item.id !== row.id));
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">{title}</h1>
          {message ? <p className="mt-2 text-sm font-bold text-blue-700">{message}</p> : null}
        </div>
      </div>

      {mode === "content" ? (
        <section className="mt-6 grid gap-4 rounded-lg border border-neutral-200 bg-white p-6">
          {fields.map((field) => renderField(field, content, setContent))}
          <div className="flex gap-3">
            <button onClick={saveContent} className="rounded-md bg-neutral-950 px-4 py-2 text-sm font-black text-white">
              Save
            </button>
            <button onClick={() => setContent(initialContent)} className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-black">
              Cancel
            </button>
          </div>
        </section>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <section className="grid gap-4 rounded-lg border border-neutral-200 bg-white p-6">
            <h2 className="text-xl font-black">{editing ? "Edit" : "Create"}</h2>
            {fields.map((field) => renderField(field, draft, setDraft))}
            <div className="flex flex-wrap gap-3">
              <button onClick={saveRow} className="rounded-md bg-neutral-950 px-4 py-2 text-sm font-black text-white">
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(null);
                  setDraft(emptyData(fields));
                }}
                className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-black"
              >
                Cancel
              </button>
            </div>
          </section>
          <section className="grid gap-3">
            {rows.map((row) => (
              <article key={row.id ?? JSON.stringify(row.data)} className="rounded-lg border border-neutral-200 bg-white p-4">
                <p className="text-xs font-bold uppercase text-blue-700">{row.data.label}</p>
                <h3 className="mt-1 text-lg font-black">{row.data.title || row.data.label}</h3>
                <p className="mt-2 text-sm text-neutral-600">{row.data.description || row.data.href}</p>
                {row.data.image_url ? <img src={row.data.image_url} alt="" className="mt-3 h-24 w-full rounded-md object-cover" /> : null}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(row);
                      setDraft({ ...row.data, sort_order: String(row.sort_order ?? 100) });
                    }}
                    className="rounded-md bg-yellow-400 px-3 py-2 text-xs font-black"
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteRow(row)} className="rounded-md bg-red-600 px-3 py-2 text-xs font-black text-white">
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
