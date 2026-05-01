import Link from "next/link";
import { Card } from "@/components/Card";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import {
  defaultMetrics,
  getHardwareProducts,
  getHomepage,
  getPricingPackages,
  getServices,
  getSoftwareProducts,
} from "@/lib/cms";
import { projects } from "@/lib/site";

export const dynamic = "force-dynamic";

const workflow = [
  "นำเข้าไฟล์ Excel ตั้งต้น",
  "เลือกตำแหน่งสินค้า",
  "สแกนบาร์โค้ดและใส่ยอดนับจริง",
  "ระบบคำนวณขาด/เกินทันที",
  "Export รายงาน Excel/PDF",
];

const reports = [
  ["บาร์โค้ด", "ชื่อสินค้า", "ตำแหน่ง", "ยอดตั้งต้น", "นับได้", "ผลต่าง"],
  ["885-001", "กาแฟคั่วเข้ม", "A1-02", "100", "95", "-5"],
  ["885-118", "น้ำเชื่อมวานิลลา", "B2-01", "48", "48", "0"],
  ["885-204", "แก้ว 16 oz.", "หน้าร้าน", "220", "236", "+16"],
];

export default async function HomePage() {
  const [homepage, services, software, hardware, pricing] = await Promise.all([
    getHomepage(),
    getServices(),
    getSoftwareProducts(),
    getHardwareProducts(),
    getPricingPackages(),
  ]);
  const productKits = [...pricing, ...software, ...hardware].slice(0, 3);

  return (
    <main>
      <Hero
        eyebrow={homepage.eyebrow}
        title={homepage.hero_title}
        description={homepage.hero_subtitle}
        primaryCta={{ label: homepage.primary_cta_text, href: homepage.primary_cta_href }}
        secondaryCta={{ label: homepage.secondary_cta_text, href: homepage.secondary_cta_href }}
        imageSrc={homepage.banner_image}
      />

      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 sm:grid-cols-3 lg:px-8">
          {defaultMetrics.map((metric) => (
            <div key={metric.value} className="border-l-4 border-yellow-400 pl-4">
              <p className="text-3xl font-black tracking-tight text-neutral-950">
                {metric.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeader
          eyebrow="ธุรกิจหลัก"
          title="ขายได้ทั้งบริการ ซอฟต์แวร์ และอุปกรณ์ตรวจนับ"
          description="โมเดลเริ่มจากงานง่ายสำหรับรายเล็ก แล้ว scale ไปสู่งานที่ซับซ้อนขึ้นด้วย hardware, supervisor และการ customize QR code แบบคิดค่าใช้จ่ายเพิ่ม"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.id ?? service.title}
              title={service.title}
              description={service.description}
              label={service.label}
            />
          ))}
        </div>
      </section>

      <section className="bg-neutral-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-yellow-300">
              No Database Workflow
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              ข้อมูลลูกค้าอยู่ในไฟล์ของลูกค้า นับเสร็จได้รายงานพร้อมใช้
            </h2>
            <p className="mt-5 text-base leading-7 text-neutral-300">
              ระบบใช้ Excel เป็น master file อ่านข้อมูลเข้าหน่วยความจำระหว่างนับ
              แล้วสร้างไฟล์รายงานใหม่เมื่อจบงาน เหมาะกับลูกค้าที่ต้องการความเป็นส่วนตัว
              ใช้งาน offline และไม่อยากเสียค่า server รายเดือน
            </p>
            <div className="mt-8 grid gap-3">
              {workflow.map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-md bg-yellow-400 text-sm font-black text-neutral-950">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-neutral-100">{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white text-neutral-950">
            <div className="bg-yellow-400 px-5 py-4 text-sm font-black">
              ตัวอย่าง Variance Report
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <tbody>
                  {reports.map((row, rowIndex) => (
                    <tr
                      key={row.join("-")}
                      className={rowIndex === 0 ? "bg-neutral-100 font-bold" : "border-t border-neutral-200"}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={`${cell}-${cellIndex}`}
                          className={[
                            "px-4 py-3",
                            cell.startsWith("-")
                              ? "font-bold text-red-600"
                              : cell.startsWith("+")
                                ? "font-bold text-blue-700"
                                : "",
                          ].join(" ")}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeader
          eyebrow="Product Kit"
          title="เริ่มเล็กได้ แต่พร้อมโตเป็นงานใหญ่"
          description="ให้ลูกค้าเลือกจ่ายตามความจำเป็น ตั้งแต่ใช้มือถือสแกนเอง ไปจนถึงชุดอุปกรณ์และทีมคุมงานสำหรับคลังขนาดใหญ่"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {productKits.map((kit) => (
            <article
              key={kit.id ?? kit.title}
              className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-bold text-blue-700">{kit.price ?? kit.label}</p>
              <h3 className="mt-3 text-2xl font-black text-neutral-950">{kit.title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{kit.description}</p>
              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-md bg-neutral-950 px-4 py-2 text-sm font-bold text-white hover:bg-neutral-800"
              >
                สอบถามแพ็กเกจ
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
              Barcode First
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
              เน้นบาร์โค้ดแท่งเป็นมาตรฐาน และเปิดทาง QR Customize
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Card
              label="Standard"
              title="Barcode Package"
              description="เหมาะกับ SME และคลังทั่วไป ใช้รหัสบาร์โค้ดเทียบกับ Excel เพื่อรู้ยอดตั้งต้น ยอดนับจริง ผลต่าง และตำแหน่งสินค้า"
            />
            <Card
              label="Add-on"
              title="Custom QR Code"
              description="คิดค่า setup เพิ่มเมื่อ QR มีข้อมูลซับซ้อน เช่น lot number, expiry date, serial number หรือ format เฉพาะของโรงงาน"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeader
          eyebrow="กลุ่มลูกค้า"
          title="ตอบโจทย์รายเล็ก โรงงาน และโซนเฉพาะของ Hypermarket"
          description="กลยุทธ์คือไม่แข่งด้วยจำนวนคน แต่แข่งด้วยความเร็ว ความโปร่งใส รายงานทันที และต้นทุนที่ฉลาดกว่า"
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
      </section>

      <section className="bg-yellow-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-neutral-950">
              อยากเริ่มจากไฟล์ Excel ที่มีอยู่แล้ว?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-800">
              ส่งตัวอย่างไฟล์มาให้เราประเมิน workflow, hardware ที่เหมาะสม และรูปแบบรายงานที่ควรใช้ก่อนเริ่มงานจริง
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex justify-center rounded-md bg-neutral-950 px-5 py-3 text-sm font-bold text-white hover:bg-neutral-800"
          >
            นัดคุยโซลูชัน
          </Link>
        </div>
      </section>
    </main>
  );
}
