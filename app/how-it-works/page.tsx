import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "ขั้นตอนการทำงาน",
  description: "ขั้นตอนการตรวจนับสต๊อกด้วย Excel, Barcode และรายงานขาดเกิน",
};

const steps = [
  "นำเข้าไฟล์ Excel ตั้งต้น",
  "กำหนด location หรือโซนตรวจนับ",
  "สแกน barcode และบันทึกยอดนับจริง",
  "ตรวจรายการขาด/เกิน และนับซ้ำเฉพาะจุด",
  "Export รายงาน Excel/PDF",
];

export default function HowItWorksPage() {
  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeader
            eyebrow="How it works"
            title="กระบวนการตรวจนับที่เรียบง่ายและตรวจสอบย้อนหลังได้"
            description="ออกแบบให้ทีมหน้างานใช้งานง่าย แต่เจ้าของกิจการได้ข้อมูลที่พร้อมตัดสินใจ"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step} className="rounded-lg border border-neutral-200 bg-yellow-50 p-5">
                <p className="text-sm font-black text-blue-700">0{index + 1}</p>
                <h2 className="mt-3 text-lg font-black text-neutral-950">{step}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
