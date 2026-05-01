import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description:
    "StockTake Pro คือทีมตรวจนับสต๊อกและผู้พัฒนาโซลูชัน Excel-based inventory audit สำหรับธุรกิจที่ต้องการยอดจริงจากหน้างาน",
};

const values = [
  {
    title: "นับจากของจริง",
    description:
      "ใช้แนวคิด Blind Count ลดการนับให้ตรงตัวเลขเดิม และช่วยให้เจ้าของเห็นความจริงของสต๊อก",
  },
  {
    title: "เริ่มจากระบบเดิม",
    description:
      "ไม่บังคับเปลี่ยน ERP หรือสร้าง database ใหม่ ลูกค้าเริ่มได้จาก Excel ที่มีอยู่แล้ว",
  },
  {
    title: "ต่อยอดเป็นระบบใหญ่",
    description:
      "เริ่มจากมือถือเครื่องเดียว แล้วขยายเป็น hardware kit, supervisor และ local sync สำหรับงานใหญ่ได้",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeader
            eyebrow="About StockTake Pro"
            title="เราไม่ได้ขายแค่การนับของ แต่ขายตัวเลขที่เจ้าของธุรกิจเชื่อถือได้"
            description="ธุรกิจจำนวนมากมียอดในระบบ แต่ไม่รู้ว่าสินค้าจริงอยู่ตรงไหน ขาดเท่าไหร่ หรือเงินจมอยู่กับสินค้าอะไร StockTake Pro จึงออกแบบบริการและซอฟต์แวร์ให้ตอบคำถามสำคัญที่สุด: มีเท่าไหร่ นับได้เท่าไหร่ ขาดเกินเท่าไหร่ และสินค้าอยู่ที่ไหน"
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border border-neutral-200 bg-yellow-50 p-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
                Business Model
              </p>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-neutral-950">
                Hybrid: Service + Software + Hardware
              </h1>
              <p className="mt-5 text-base leading-7 text-neutral-700">
                ลูกค้ารายเล็กใช้แอปและมือถือสแกนเองได้ ลูกค้าที่มีงานหนักซื้อ
                Pro Mobile Kit เพิ่มได้ และลูกค้าระดับโรงงานหรือ hypermarket
                ใช้บริการทีมคุมงานพร้อมอุปกรณ์เช่าได้ในโมเดลเดียวกัน
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
