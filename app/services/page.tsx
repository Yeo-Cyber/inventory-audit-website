import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "บริการ",
  description:
    "บริการตรวจนับสต๊อก ซอฟต์แวร์ตรวจนับจาก Excel อุปกรณ์สแกนบาร์โค้ด และโซลูชันสำหรับงานคลังขนาดใหญ่",
};

const packages = [
  {
    title: "Stock Audit Service",
    description: "เหมาะกับลูกค้าที่ต้องการทีมเข้าไปตรวจนับและส่งรายงานผลต่าง",
  },
  {
    title: "Excel Scan Software",
    description: "เหมาะกับลูกค้าที่ต้องการนับเอง ลดค่าใช้จ่าย และเก็บข้อมูลไว้กับตัวเอง",
  },
  {
    title: "Hardware Bundle",
    description: "เหมาะกับงานที่ต้องการความเร็วสูงกว่าใช้กล้องมือถือ เช่น คลังหลายพัน SKU",
  },
  {
    title: "Enterprise Pilot",
    description: "เริ่มจากโซนสินค้า high-value หรือ problem zone ก่อนขยายทั้งสาขา",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeader
            eyebrow="Services"
            title="เลือกบริการตามระดับความพร้อมของลูกค้า"
            description="ลูกค้าที่อยากประหยัดเริ่มจาก software only ได้ ส่วนลูกค้าที่ต้องการความเร็ว ความน่าเชื่อถือ และทีมคุมงาน สามารถขยับเป็น hardware หรือ managed audit ได้ทันที"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <Card
                key={service.title}
                title={service.title}
                description={service.description}
                label={service.label}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-4">
            {packages.map((item, index) => (
              <div key={item.title} className="rounded-lg border border-white/10 p-6">
                <p className="text-sm font-black text-yellow-300">0{index + 1}</p>
                <h2 className="mt-3 text-xl font-black tracking-tight">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
