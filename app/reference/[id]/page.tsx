import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReferenceCases } from "@/lib/cms";
import { matchesReferenceSlug, referenceImages } from "@/lib/reference";

export const dynamic = "force-dynamic";

type Params = {
  id: string;
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const references = await getReferenceCases();
  const item = references.find((reference, index) => matchesReferenceSlug(reference, id, index));

  if (!item) {
    return {
      title: "ไม่พบผลงานที่ผ่านมา",
    };
  }

  return {
    title: item.title,
    description: item.description,
  };
}

export default async function ReferenceDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const references = await getReferenceCases();
  const item = references.find((reference, index) => matchesReferenceSlug(reference, id, index));

  if (!item) {
    notFound();
  }

  const gallery = referenceImages(item);
  const heroImage = item.image_url || gallery[0] || "/references/sme-warehouse.svg";

  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <Link href="/reference" className="text-sm font-black text-blue-700 hover:text-neutral-950">
            ← กลับไปหน้าผลงานที่ผ่านมา
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
                {item.label || "Reference"}
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-neutral-950 lg:text-5xl">
                {item.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-2 text-sm font-bold text-neutral-700">
                {item.location ? (
                  <span className="rounded-md bg-yellow-100 px-3 py-1">{item.location}</span>
                ) : null}
                {item.period ? <span className="rounded-md bg-neutral-100 px-3 py-1">{item.period}</span> : null}
              </div>
              <p className="mt-6 text-lg leading-8 text-neutral-700">{item.description}</p>
              {item.details ? <p className="mt-5 text-base leading-8 text-neutral-600">{item.details}</p> : null}
            </div>

            <div className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 shadow-sm">
              <img src={heroImage} alt={item.title} className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {item.results ? (
        <section className="border-y border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
            <h2 className="text-2xl font-black tracking-tight text-neutral-950">ผลลัพธ์จากงานตรวจนับ</h2>
            <ul className="mt-6 grid gap-3 text-neutral-700 md:grid-cols-3">
              {item.results
                .split("\n")
                .map((result) => result.trim())
                .filter(Boolean)
                .map((result) => (
                  <li key={result} className="rounded-lg border border-neutral-200 bg-white p-5 text-sm leading-6 shadow-sm">
                    <span className="mb-4 block size-2 rounded-full bg-yellow-400" />
                    {result}
                  </li>
                ))}
            </ul>
          </div>
        </section>
      ) : null}

      {gallery.length ? (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Gallery</p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-950">รูปภาพเพิ่มเติม</h2>
              </div>
              <p className="text-sm font-bold text-neutral-500">{gallery.length}/10 รูป</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {gallery.map((url, index) => (
                <div key={url} className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
                  <img src={url} alt={`${item.title} รูปที่ ${index + 1}`} className="aspect-square w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

