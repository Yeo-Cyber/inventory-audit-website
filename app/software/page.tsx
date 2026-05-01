import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { getSoftwareProducts } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ซอฟต์แวร์",
  description: "ซอฟต์แวร์ตรวจนับสต๊อกจาก Excel สำหรับสแกนบาร์โค้ดและออกรายงานขาดเกิน",
};

export default async function SoftwarePage() {
  const products = await getSoftwareProducts();

  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeader
            eyebrow="Software"
            title="ซอฟต์แวร์ตรวจนับที่เริ่มจากไฟล์ Excel"
            description="จัดการรอบตรวจนับ สแกน barcode ระบุตำแหน่ง และ export รายงานโดยไม่ต้องสร้าง database กลาง"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {products.map((item) => (
              <Card
                key={item.id ?? item.title}
                title={item.title}
                description={item.description}
                label={item.label}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
