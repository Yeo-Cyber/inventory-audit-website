import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { getHardwareProducts } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ฮาร์ดแวร์",
  description: "อุปกรณ์ตรวจนับสินค้า Barcode Scanner และ Mobile Scanner Kit",
};

export default async function HardwarePage() {
  const products = await getHardwareProducts();

  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeader
            eyebrow="Hardware"
            title="อุปกรณ์ที่เปลี่ยนมือถือให้เป็นเครื่องตรวจนับสต๊อก"
            description="เพิ่มความเร็วและความแม่นยำในการสแกนสำหรับงานคลังที่มี SKU จำนวนมาก"
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
