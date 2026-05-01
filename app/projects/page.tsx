import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "โซลูชัน",
  description:
    "โซลูชันตรวจนับสต๊อกสำหรับ SME ร้านอาหาร โรงงาน คลังสินค้า และ Hypermarket ที่ต้องการรายงานขาดเกินพร้อมใช้",
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeader
            eyebrow="Solutions"
            title="โซลูชันตามตลาดที่มี pain point ชัดเจน"
            description="ไม่จำเป็นต้องเริ่มจากทั้งองค์กร เราสามารถเริ่มจากคลังเล็ก ร้านหลายสาขา หรือโซนสินค้ามูลค่าสูง แล้วค่อยขยายเมื่อเห็นผลจริง"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.title}
                title={project.title}
                description={project.description}
                label={project.industry}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
