"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  FileSpreadsheet,
  Handshake,
  PackageCheck,
  PackageSearch,
  ScanBarcode,
  ShieldCheck,
  ShoppingCart,
  Upload,
  Utensils,
  Warehouse,
} from "lucide-react";
import { InteractiveImage } from "@/components/InteractiveImage";

const badges = ["Inventory Audit", "Barcode Scan", "Excel Friendly", "Dashboard Report"];

type AboutCms = {
  [key: string]: string | undefined;
  eyebrow?: string;
  title?: string;
  description?: string;
  model_label?: string;
  model_title?: string;
  model_description?: string;
  hero_image_url?: string;
  business_image_url?: string;
  process_image_url?: string;
  trust_image_url?: string;
  cta_image_url?: string;
  value_1_title?: string;
  value_1_description?: string;
  value_2_title?: string;
  value_2_description?: string;
  value_3_title?: string;
  value_3_description?: string;
};

function CmsImage({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (!src) return null;

  return (
    <div className={`overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl shadow-blue-100/50 ${className}`}>
      <InteractiveImage src={src} alt={alt} className="h-full w-full" />
    </div>
  );
}

const solveCards = [
  {
    title: "ยอดในระบบไม่ตรงของจริง",
    description: "ข้อมูลใน Excel หรือระบบเดิมคลาดเคลื่อนจากสินค้าที่อยู่หน้างานจริง",
    Icon: FileSpreadsheet,
  },
  {
    title: "ไม่รู้ว่าสินค้าขาด/เกินเท่าไหร่",
    description: "เจ้าของธุรกิจไม่เห็นรายการที่ขาด เกิน หาย หรือยังไม่ถูกตรวจนับ",
    Icon: PackageSearch,
  },
  {
    title: "ตรวจนับช้า ใช้คนเยอะ",
    description: "การนับด้วยกระดาษหรือกรอกมือทำให้เสียเวลาและเกิด human error",
    Icon: Clock3,
  },
  {
    title: "ไม่มีรายงานสำหรับตัดสินใจ",
    description: "ข้อมูลหลังตรวจนับไม่ถูกสรุปเป็น report ที่นำไปใช้กับบัญชีหรือการสั่งซื้อได้",
    Icon: BarChart3,
  },
];

const businessModels = [
  {
    title: "Service",
    subtitle: "ทีมตรวจนับ / Audit / Verify",
    benefit: "เหมาะกับงานที่ต้องการคนกลางและความน่าเชื่อถือหน้างาน",
    Icon: Handshake,
  },
  {
    title: "Software",
    subtitle: "Web App / Dashboard / Export Excel",
    benefit: "ใช้ Excel เดิมเป็นฐาน แล้วสรุป Diff, No Count และ Dashboard ได้ทันที",
    Icon: BarChart3,
  },
  {
    title: "Hardware",
    subtitle: "Barcode Scanner / Mobile Kit / Handheld",
    benefit: "เพิ่มความเร็ว ลดการพิมพ์ผิด และรองรับงานตรวจนับจำนวนมาก",
    Icon: ScanBarcode,
  },
];

const processSteps = [
  {
    title: "Upload Excel",
    description: "นำไฟล์ stock ตั้งต้นจากระบบเดิมหรือ Excel เข้า workflow โดยไม่ต้องย้ายระบบ",
    Icon: Upload,
  },
  {
    title: "Scan / Count",
    description: "ใช้มือถือหรือ barcode scanner ตรวจนับสินค้าจริงตามพื้นที่จัดเก็บ",
    Icon: ScanBarcode,
  },
  {
    title: "Verify",
    description: "ตรวจซ้ำเฉพาะรายการที่ผิดปกติ เช่น ขาด เกิน หรือหาไม่เจอ",
    Icon: ClipboardCheck,
  },
  {
    title: "Generate Diff",
    description: "ระบบเทียบยอดตั้งต้นกับยอดนับจริงและสรุป variance ให้ทันที",
    Icon: PackageCheck,
  },
  {
    title: "Export Report / Dashboard",
    description: "ส่งออก Excel report หรือดู Dashboard Summary เพื่อใช้ตัดสินใจต่อ",
    Icon: BarChart3,
  },
];

const metrics = [
  { value: "50%+", label: "ลดเวลาตรวจนับ", Icon: Clock3 },
  { value: "99%+", label: "เพิ่มความแม่นยำ", Icon: ShieldCheck },
  { value: "100%", label: "ใช้กับ Excel เดิมได้", Icon: FileSpreadsheet },
  { value: "Real-time", label: "เห็นผลทันที", Icon: BarChart3 },
];

const audiences = [
  { title: "SME / Online Seller", description: "ร้านออนไลน์ Shopee / Lazada และคลังเล็ก", Icon: ShoppingCart },
  { title: "Restaurant / Cafe", description: "วัตถุดิบ ของเสีย และของหมดอายุ", Icon: Utensils },
  { title: "Factory / Warehouse", description: "Location, Lot, Batch, Serial และ Audit", Icon: Warehouse },
  { title: "Hypermarket / Multi-branch", description: "หลายสาขา หลายทีม และงานปิดงบขนาดใหญ่", Icon: Building2 },
];

const outputs = [
  "Stocktake Report",
  "Diff Report",
  "No Count Report",
  "Audit Sign-off",
  "Dashboard Summary",
  "Excel Export",
];

const faqs = [
  {
    question: "ต้องเปลี่ยนระบบเดิมไหม?",
    answer: "ไม่จำเป็น Stocktake Pro ออกแบบให้เริ่มจากไฟล์ Excel หรือ export จากระบบเดิมได้ทันที",
  },
  {
    question: "ใช้ Excel เดิมได้หรือไม่?",
    answer: "ใช้ได้ ระบบนำ Excel ตั้งต้นมาเปรียบเทียบกับยอดตรวจนับจริง แล้ว export รายงานกลับไปใช้งานต่อได้",
  },
  {
    question: "ใช้กับมือถือได้ไหม?",
    answer: "ใช้ได้ทั้งมือถือ กล้องสแกน และ barcode scanner สำหรับงานที่ต้องการความเร็วมากขึ้น",
  },
  {
    question: "เหมาะกับธุรกิจแบบไหน?",
    answer: "เหมาะกับ SME, ร้านอาหาร, คาเฟ่, โรงงาน, คลังสินค้า, multi-branch และงานตรวจนับเพื่อปิดงบ",
  },
  {
    question: "ได้รายงานอะไรหลังตรวจนับ?",
    answer: "ได้ Stocktake Report, Diff Report, No Count Report, Audit Sign-off, Dashboard Summary และ Excel Export",
  },
];

function DashboardMockup({ imageUrl }: { imageUrl?: string }) {
  if (imageUrl) {
    return (
      <CmsImage
        src={imageUrl}
        alt="Stocktake Pro about hero"
        className="aspect-[4/3] lg:aspect-[5/4]"
      />
    );
  }

  return (
    <div className="rounded-3xl border border-white bg-white p-5 shadow-2xl shadow-blue-100/70">
      <div className="rounded-2xl border border-neutral-200 bg-neutral-950 p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">
              Stocktake Workflow
            </p>
            <h2 className="mt-2 text-2xl font-black">Audit Dashboard</h2>
          </div>
          <div className="grid size-12 place-items-center rounded-2xl bg-yellow-400 text-neutral-950">
            <ClipboardCheck className="size-6" />
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Counted", "86%"],
            ["Diff", "42 SKU"],
            ["No Count", "18 SKU"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs font-bold text-neutral-300">{label}</p>
              <p className="mt-2 text-2xl font-black">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl bg-white p-5">
          <div className="space-y-4">
            {["Excel Master", "Barcode Count", "Verify Diff", "Export Report"].map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-xl bg-blue-50 text-xs font-black text-blue-700">
                  {index + 1}
                </span>
                <span className="h-3 flex-1 rounded-full bg-neutral-200" />
                <CheckCircle className="size-5 text-green-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const active = processSteps[activeStep];
  const ActiveIcon = active.Icon;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
      <div className="grid gap-4">
        {processSteps.map((step, index) => {
          const Icon = step.Icon;
          const active = activeStep === index;

          return (
            <button
              key={step.title}
              type="button"
              onClick={() => setActiveStep(index)}
              className={[
                "group flex items-start gap-4 rounded-3xl border bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl",
                active ? "border-blue-300 shadow-blue-100" : "border-neutral-200",
              ].join(" ")}
            >
              <span
                className={[
                  "grid size-12 shrink-0 place-items-center rounded-2xl border transition group-hover:scale-105",
                  active ? "border-blue-600 bg-blue-600 text-white" : "border-blue-100 bg-blue-50 text-blue-600",
                ].join(" ")}
              >
                <Icon className="size-5" />
              </span>
              <span>
                <span className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
                  Step {index + 1}
                </span>
                <span className="mt-1 block text-lg font-black text-neutral-950">{step.title}</span>
              </span>
            </button>
          );
        })}
      </div>
      <aside className="sticky top-24 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-yellow-50 p-8 shadow-xl shadow-blue-100/70">
        <div className="grid size-16 place-items-center rounded-3xl bg-blue-600 text-white shadow-lg shadow-blue-200">
          <ActiveIcon className="size-7" />
        </div>
        <p className="mt-8 text-sm font-black uppercase tracking-[0.18em] text-blue-700">
          Active Process
        </p>
        <h3 className="mt-3 text-3xl font-black tracking-tight text-neutral-950">{active.title}</h3>
        <p className="mt-4 text-sm leading-7 text-neutral-700">{active.description}</p>
        <div className="mt-8 h-2 overflow-hidden rounded-full bg-blue-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
          />
        </div>
      </aside>
    </div>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-4xl space-y-3">
      {faqs.map((faq, index) => {
        const open = openIndex === index;

        return (
          <article key={faq.question} className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-lg font-black text-neutral-950">{faq.question}</span>
              <ChevronDown className={`size-5 shrink-0 text-blue-700 transition ${open ? "rotate-180" : ""}`} />
            </button>
            {open ? <p className="border-t border-neutral-200 px-6 py-5 text-sm leading-7 text-neutral-700">{faq.answer}</p> : null}
          </article>
        );
      })}
    </div>
  );
}

export default function AboutPage() {
  const [aboutCms, setAboutCms] = useState<AboutCms>({});

  useEffect(() => {
    let active = true;

    fetch("/api/content?key=about", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : {}))
      .then((data: AboutCms) => {
        if (active) setAboutCms(data ?? {});
      })
      .catch(() => {
        if (active) setAboutCms({});
      });

    return () => {
      active = false;
    };
  }, []);

  const heroEyebrow = aboutCms.eyebrow || "About StockTake Pro";
  const heroTitle =
    aboutCms.title ||
    "เราไม่ได้ขายแค่การตรวจนับสินค้า แต่ขายตัวเลขที่เจ้าของธุรกิจเชื่อถือได้";
  const heroDescription =
    aboutCms.description ||
    "Stocktake Pro ช่วยให้ธุรกิจเห็นยอดจริงจากหน้างาน เทียบกับข้อมูลเดิมใน Excel หรือระบบคลัง และสรุปเป็นรายงานที่ใช้ตัดสินใจได้ทันที";
  const businessLabel = aboutCms.model_label || "Business Model";
  const businessTitle = aboutCms.model_title || "Hybrid: Service + Software + Hardware";
  const businessDescription = aboutCms.model_description || "";
  const displayedSolveCards = solveCards.map((card, index) => {
    const item = index + 1;

    return {
      ...card,
      title: aboutCms[`value_${item}_title`] || card.title,
      description: aboutCms[`value_${item}_description`] || card.description,
    };
  });

  return (
    <main className="bg-white">
      <section className="overflow-hidden border-b border-neutral-200 bg-gradient-to-br from-white via-blue-50/60 to-yellow-50/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
              {heroEyebrow}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span key={badge} className="rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-blue-700 shadow-sm">
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="mt-8 max-w-4xl text-5xl font-black tracking-tight text-neutral-950 sm:text-6xl">
              <span className="hidden">
              เราไม่ได้ขายแค่การตรวจนับสินค้า แต่ขายตัวเลขที่เจ้าของธุรกิจเชื่อถือได้
              </span>
              {heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-neutral-700">
              <span className="hidden">
              Stocktake Pro ช่วยให้ธุรกิจเห็นยอดจริงจากหน้างาน เทียบกับข้อมูลเดิมใน Excel หรือระบบคลัง และสรุปเป็นรายงานที่ใช้ตัดสินใจได้ทันที
              </span>
              {heroDescription}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/projects" className="inline-flex items-center justify-center rounded-2xl bg-neutral-950 px-6 py-4 text-sm font-black text-white shadow-lg shadow-neutral-300 transition hover:-translate-y-0.5 hover:bg-neutral-800">
                ดู Solution
                <ArrowRight className="ml-2 size-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-neutral-950 shadow-sm transition hover:-translate-y-0.5 hover:border-yellow-400 hover:bg-yellow-50">
                ขอใบเสนอราคา
              </Link>
            </div>
          </div>
          <DashboardMockup imageUrl={aboutCms.hero_image_url} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">What We Solve</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl">
            ปัญหาที่ทำให้สต๊อกไม่ตรงและกำไรหาย
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {displayedSolveCards.map((card) => (
            <article key={card.title} className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-200/70 transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
              <div className="grid size-12 place-items-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 transition group-hover:-translate-y-1">
                <card.Icon className="size-6" />
              </div>
              <h3 className="mt-6 text-xl font-black text-neutral-950">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">{businessLabel}</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-neutral-950">
              {businessTitle}
            </h2>
            {businessDescription ? (
              <p className="mt-5 text-base leading-8 text-neutral-600">
                {businessDescription}
              </p>
            ) : null}
          </div>
          <CmsImage
            src={aboutCms.business_image_url}
            alt="Stocktake Pro business model"
            className="mx-auto mt-10 aspect-[16/7] max-w-5xl"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {businessModels.map((model) => (
              <article key={model.title} className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
                <div className="grid size-14 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                  <model.Icon className="size-7" />
                </div>
                <h3 className="mt-6 text-2xl font-black text-neutral-950">{model.title}</h3>
                <p className="mt-3 text-sm font-bold text-blue-700">{model.subtitle}</p>
                <p className="mt-5 text-sm leading-7 text-neutral-600">{model.benefit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">Interactive Process</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-neutral-950">
            จาก Excel เดิม สู่รายงานที่เชื่อถือได้
          </h2>
        </div>
        <div className="mt-12">
          <CmsImage
            src={aboutCms.process_image_url}
            alt="Stocktake Pro process workflow"
            className="mb-10 aspect-[16/7]"
          />
          <ProcessStepper />
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <article key={metric.label} className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <metric.Icon className="size-8 text-blue-600" />
                <p className="mt-8 text-4xl font-black text-neutral-950">{metric.value}</p>
                <p className="mt-2 text-sm font-bold text-neutral-600">{metric.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">For Who</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-neutral-950">
            ออกแบบให้เหมาะกับหลายรูปแบบธุรกิจ
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item) => (
            <article key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
              <div className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <item.Icon className="size-6" />
              </div>
              <h3 className="mt-6 text-xl font-black text-neutral-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{item.description}</p>
              <Link href="/projects" className="mt-6 inline-flex items-center text-sm font-black text-blue-700">
                View Solution
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">Trust & Output</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-neutral-950">
              สิ่งที่ลูกค้าจะได้รับหลังตรวจนับ
            </h2>
          </div>
          <CmsImage
            src={aboutCms.trust_image_url}
            alt="Stocktake Pro report output"
            className="mx-auto mt-10 aspect-[16/7] max-w-5xl"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {outputs.map((output) => (
              <div key={output} className="flex items-center gap-3 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
                <CheckCircle className="size-6 shrink-0 text-blue-600" />
                <span className="text-lg font-black text-neutral-950">{output}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">FAQ</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-neutral-950">คำถามที่พบบ่อย</h2>
        </div>
        <div className="mt-12">
          <FaqAccordion />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-8 text-white shadow-2xl shadow-neutral-300 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-10"
          style={
            aboutCms.cta_image_url
              ? {
                  backgroundImage: `linear-gradient(90deg, rgba(10,10,10,0.92), rgba(10,10,10,0.72)), url(${aboutCms.cta_image_url})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }
              : undefined
          }
        >
          <div className="relative z-10">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-400">Ready to Audit</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              อยากรู้ว่าสต๊อกจริงของธุรกิจคุณตรงกับระบบหรือไม่?
            </h2>
          </div>
          <div className="relative z-10 mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Link href="/projects" className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-black text-neutral-950 transition hover:-translate-y-0.5 hover:bg-yellow-300">
              ดู Solution
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-yellow-300 hover:text-yellow-300">
              ขอใบเสนอราคา
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
