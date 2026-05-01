import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { getAboutInfo } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description:
    "StockTake Pro คือทีมตรวจนับสต๊อกและผู้พัฒนาโซลูชัน Excel-based inventory audit สำหรับธุรกิจที่ต้องการยอดจริงจากหน้างาน",
};

export default async function AboutPage() {
  const about = await getAboutInfo();
  const values = [
    {
      title: about.value_1_title,
      description: about.value_1_description,
    },
    {
      title: about.value_2_title,
      description: about.value_2_description,
    },
    {
      title: about.value_3_title,
      description: about.value_3_description,
    },
  ];

  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeader
            eyebrow={about.eyebrow}
            title={about.title}
            description={about.description}
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border border-neutral-200 bg-yellow-50 p-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
                {about.model_label}
              </p>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-neutral-950">
                {about.model_title}
              </h1>
              <p className="mt-5 text-base leading-7 text-neutral-700">
                {about.model_description}
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {values.map((value) => (
                <Card
                  key={value.title}
                  title={value.title}
                  description={value.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

