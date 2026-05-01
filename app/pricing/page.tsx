import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { getPricingPackages } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ราคา",
  description: "แพ็กเกจราคา Software, Hardware Kit และ Managed Audit",
};

export default async function PricingPage() {
  const packages = await getPricingPackages();

  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeader
            eyebrow="Pricing"
            title="แพ็กเกจสำหรับเริ่มเล็กและขยายเป็นงานใหญ่"
            description="ปรับชื่อ ราคา และรายละเอียดแพ็กเกจได้จากหน้า Admin"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {packages.map((item) => (
              <article
                key={item.id ?? item.title}
                className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-bold text-blue-700">{item.label}</p>
                <h2 className="mt-3 text-2xl font-black text-neutral-950">{item.title}</h2>
                <p className="mt-3 text-xl font-black text-neutral-950">{item.price}</p>
                <p className="mt-4 text-sm leading-6 text-neutral-600">{item.description}</p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex rounded-md bg-neutral-950 px-4 py-2 text-sm font-bold text-white hover:bg-neutral-800"
                >
                  ติดต่อสอบถาม
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
