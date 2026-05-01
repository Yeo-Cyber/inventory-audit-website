"use client";

import { useState } from "react";

type Media = {
  id: string;
  url: string;
  alt_text: string;
  path: string;
};

export function MediaLibrary({ initialMedia }: { initialMedia: Media[] }) {
  const [media, setMedia] = useState(initialMedia);

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    form.append("category", "media-library");
    const response = await fetch("/api/admin/media", { method: "POST", body: form });
    const payload = await response.json();
    if (payload?.id) setMedia((current) => [payload, ...current]);
  }

  return (
    <div>
      <h1 className="text-3xl font-black">Media Library</h1>
      <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-6">
        <input type="file" accept="image/*" onChange={upload} />
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {media.map((item) => (
          <article key={item.id} className="rounded-lg border border-neutral-200 bg-white p-4">
            <img src={item.url} alt={item.alt_text} className="aspect-[4/3] w-full rounded-md object-cover" />
            <p className="mt-3 break-all text-xs text-neutral-600">{item.url}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
