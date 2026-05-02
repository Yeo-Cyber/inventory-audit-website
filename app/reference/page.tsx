import type { Metadata } from "next";
import Link from "next/link";
import { LogoMarquee } from "@/components/LogoMarquee";
import { SectionHeader } from "@/components/SectionHeader";
import { getCustomerLogos, getReferenceCases } from "@/lib/cms";
import { referenceImages, referenceSlug } from "@/lib/reference";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ผลงานที่ผ่านมา",
  description:
    "ตัวอย่างงานตรวจนับสต๊อกสินค้า พร้อมรูปภาพหน้างาน ผลลัพธ์ และรูปแบบรายงานที่ StockTake Pro เคยให้บริการ",
};

export default async function ReferencePage() {
  const [referenceCases, customerLogos] = await Promise.all([
    getReferenceCases(),
    getCustomerLogos(),
  ]);
  const logoItems = customerLogos
    .map((item) => ({
      label: item.title || item.label || "Customer",
      logoUrl: item.image_url,
      href: item.href,
    }))
    .filter((item) => item.label);
  const referenceLogoItems = referenceCases
    .map((item) => ({
      label: item.label || item.title,
      logoUrl: item.customer_logo_url,
    }))
    .filter((item) => item.label);

  return (
    <main>
      <LogoMarquee items={logoItems.length ? logoItems : referenceLogoItems.length ? referenceLogoItems : undefined} />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeader
            eyebrow="Reference"
            title="ตัวอย่างงานตรวจนับสต๊อกที่ผ่านมา"
            description="หน้านี้ใช้แสดงผลงานจริง เช่น ประเภทธุรกิจ พื้นที่ตรวจนับ รูปภาพหน้างาน และผลลัพธ์ที่ลูกค้าได้รับ โดยแก้ไขได้จากเมนูผลงานที่ผ่านมาใน CMS"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {referenceCases.map((item, index) => {
              const href = `/reference/${referenceSlug(item, index)}`;
              const thumbnail = item.image_url || referenceImages(item)[0] || "/references/sme-warehouse.svg";

              return (
                <Link
                  key={item.id ?? item.title}
                  href={href}
                  className="group overflow-hidden rounded-lg border border-neutral-200 bg-gradient-to-br from-white via-yellow-50/45 to-blue-50/50 shadow-sm shadow-neutral-200/60 transition hover:-translate-y-1 hover:border-yellow-300 hover:shadow-md"
                >
                  <div className="aspect-[4/3] bg-neutral-100">
                    <img
                      src={thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-bold text-blue-700">{item.label}</p>
                    <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-950">
                      {item.title}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-neutral-700">
                      {item.location ? (
                        <span className="rounded-md bg-yellow-100 px-3 py-1">{item.location}</span>
                      ) : null}
                      {item.period ? (
                        <span className="rounded-md bg-neutral-100 px-3 py-1">{item.period}</span>
                      ) : null}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-neutral-600">{item.description}</p>
                    {item.results ? (
                      <ul className="mt-5 grid gap-2 text-sm text-neutral-700">
                        {item.results
                          .split("\n")
                          .map((result) => result.trim())
                          .filter(Boolean)
                          .map((result) => (
                            <li key={result} className="flex gap-2">
                              <span className="mt-2 size-2 rounded-full bg-yellow-400" />
                              <span>{result}</span>
                            </li>
                          ))}
                      </ul>
                    ) : null}
                    <p className="mt-5 text-sm font-black text-neutral-950">
                      ดูรายละเอียดเพิ่มเติม
                      <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
