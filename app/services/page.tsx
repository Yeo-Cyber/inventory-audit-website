import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  ClipboardCheck,
  FileSpreadsheet,
  ScanBarcode,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { InteractiveImage } from "@/components/InteractiveImage";
import { getServices, getServicesPage, type CmsItem } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "บริการ",
  description:
    "บริการตรวจนับสต๊อกสินค้า ซอฟต์แวร์ตรวจนับจาก Excel และอุปกรณ์ Barcode Scanner สำหรับธุรกิจที่ต้องการยอดจริงและรายงานที่เชื่อถือได้",
};

const fallbackServices: CmsItem[] = [
  {
    label: "Service",
    title: "รับจ้างตรวจนับสต๊อกสินค้า",
    description:
      "ทีมงานเข้าหน้างาน ตรวจนับแบบ Blind Count เทียบยอดกับไฟล์ตั้งต้น และส่งรายงานผลต่างที่ตรวจสอบย้อนหลังได้",
  },
  {
    label: "Software",
    title: "แอปตรวจนับจากไฟล์ Excel",
    description:
      "นำเข้า Excel สแกนบาร์โค้ด ใส่จำนวน ระบุตำแหน่ง และ export รายงานโดยไม่ต้องเก็บข้อมูลบน cloud",
  },
  {
    label: "Hardware",
    title: "Mobile Scanner Kit",
    description:
      "เปลี่ยนมือถือเป็นเครื่องตรวจนับด้วย Bluetooth barcode scanner, ring scanner หรือ handheld ที่เหมาะกับงานหนัก",
  },
];

const iconMap = {
  service: UsersRound,
  software: FileSpreadsheet,
  hardware: ScanBarcode,
  enterprise: ShieldCheck,
};

const fallbackMeta = {
  service: {
    Icon: UsersRound,
    tone: "blue",
    benefit: "เหมาะกับลูกค้าที่ต้องการทีมกลางเข้าไปตรวจนับและยืนยันผล",
    features: ["Blind Count", "หน้างานจริง", "Audit Report"],
  },
  software: {
    Icon: FileSpreadsheet,
    tone: "green",
    benefit: "เหมาะกับลูกค้าที่อยากประหยัดและเริ่มจาก Excel เดิม",
    features: ["Excel-based", "Barcode Scan", "Export Report"],
  },
  hardware: {
    Icon: ScanBarcode,
    tone: "purple",
    benefit: "เหมาะกับงานหนักที่ต้องการความเร็วและลด manual error",
    features: ["Bluetooth Scanner", "Mobile Kit", "Heavy Workload"],
  },
  enterprise: {
    Icon: ShieldCheck,
    tone: "yellow",
    benefit: "เหมาะกับโรงงาน คลังใหญ่ หรือหลายสาขาที่ต้องมี supervisor คุมงาน",
    features: ["Supervisor", "Multi-team", "Sign-off"],
  },
};

const toneClasses = {
  blue: {
    icon: "bg-blue-50 text-blue-700 ring-blue-100",
    border: "hover:border-blue-300",
    badge: "bg-blue-50 text-blue-700",
  },
  green: {
    icon: "bg-green-50 text-green-700 ring-green-100",
    border: "hover:border-green-300",
    badge: "bg-green-50 text-green-700",
  },
  purple: {
    icon: "bg-purple-50 text-purple-700 ring-purple-100",
    border: "hover:border-purple-300",
    badge: "bg-purple-50 text-purple-700",
  },
  yellow: {
    icon: "bg-yellow-50 text-yellow-700 ring-yellow-100",
    border: "hover:border-yellow-300",
    badge: "bg-yellow-50 text-yellow-800",
  },
};

function lines(value: unknown) {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }

  return String(value ?? "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getFallbackMeta(label?: string) {
  const key = String(label || "").toLowerCase();

  if (key.includes("software")) return fallbackMeta.software;
  if (key.includes("hardware")) return fallbackMeta.hardware;
  if (key.includes("enterprise") || key.includes("managed")) return fallbackMeta.enterprise;

  return fallbackMeta.service;
}

function getEditableMeta(service: CmsItem) {
  const fallback = getFallbackMeta(service.icon_key || service.label);
  const toneKey = String(service.tone || fallback.tone);
  const iconKey = String(service.icon_key || "").toLowerCase();
  const Icon = iconMap[iconKey as keyof typeof iconMap] || fallback.Icon;

  return {
    Icon,
    tone: toneKey in toneClasses ? toneKey : fallback.tone,
    benefit: service.benefit || fallback.benefit,
    features: lines(service.features).length ? lines(service.features) : fallback.features,
    ctaText: service.cta_text || "ขอคำปรึกษาบริการนี้",
    ctaHref: service.cta_href || "/contact",
  };
}

function PageImage({
  src,
  alt,
  className = "",
  fit = "contain",
}: {
  src?: string;
  alt: string;
  className?: string;
  fit?: "contain" | "cover";
}) {
  if (!src) return null;

  return (
    <div className={`overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl shadow-blue-100/50 ${className}`}>
      <InteractiveImage
        src={src}
        alt={alt}
        fit={fit}
        className="h-full w-full"
        imageClassName={fit === "contain" ? "p-4" : ""}
      />
    </div>
  );
}

export default async function ServicesPage() {
  const page = await getServicesPage();
  const cmsServices = await getServices();
  const services = cmsServices.length ? cmsServices : fallbackServices;
  const packageSteps = [
    {
      title: page.level_1_title,
      description: page.level_1_description,
      imageUrl: page.level_1_image_url,
      Icon: FileSpreadsheet,
    },
    {
      title: page.level_2_title,
      description: page.level_2_description,
      imageUrl: page.level_2_image_url,
      Icon: ScanBarcode,
    },
    {
      title: page.level_3_title,
      description: page.level_3_description,
      imageUrl: page.level_3_image_url,
      Icon: ClipboardCheck,
    },
  ];

  return (
    <main className="bg-white">
      <section className="overflow-hidden border-b border-neutral-200 bg-gradient-to-br from-white via-blue-50/60 to-yellow-50/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-700 shadow-sm">
              <Sparkles className="size-4" />
              {page.eyebrow}
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
              {page.hero_title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-neutral-700">
              {page.hero_description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={page.primary_cta_href}
                className="inline-flex items-center justify-center rounded-2xl bg-neutral-950 px-6 py-4 text-sm font-black text-white shadow-lg shadow-neutral-300 transition hover:-translate-y-0.5 hover:bg-neutral-800"
              >
                {page.primary_cta_text}
                <ArrowRight className="ml-2 size-4" />
              </Link>
              <Link
                href={page.secondary_cta_href}
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-neutral-950 shadow-sm transition hover:-translate-y-0.5 hover:border-yellow-400 hover:bg-yellow-50"
              >
                {page.secondary_cta_text}
              </Link>
            </div>
          </div>

          {page.hero_image_url ? (
            <PageImage
              src={page.hero_image_url}
              alt="StockTake Pro services hero"
              className="aspect-[16/10] max-h-[440px] lg:aspect-[4/3]"
            />
          ) : (
            <div className="rounded-3xl border border-white bg-white p-5 shadow-2xl shadow-blue-100/70">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-950 p-6 text-white">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">
                  {page.visual_label}
                </p>
                <PageImage
                  src={page.visual_image_url}
                  alt="StockTake Pro service model"
                  className="mt-6 aspect-[16/9] border-white/10 shadow-none"
                />
                <div className="mt-6 grid gap-3">
                  {packageSteps.map((step, index) => (
                    <div key={step.title} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-yellow-400 text-neutral-950">
                        <step.Icon className="size-5" />
                      </span>
                      <div>
                        <p className="text-xs font-black text-neutral-400">0{index + 1}</p>
                        <h2 className="text-lg font-black">{step.title}</h2>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-white p-5 text-neutral-950">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="size-6 text-blue-700" />
                    <p className="text-sm font-black">{page.visual_report_title}</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {page.visual_report_description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="service-options" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
            {page.service_section_eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-neutral-950">
            {page.service_section_title}
          </h2>
        </div>
        <PageImage
          src={page.service_section_image_url}
          alt="StockTake Pro service options"
          className="mx-auto mt-10 aspect-[16/7] max-w-5xl"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((service) => {
            const meta = getEditableMeta(service);
            const tone = toneClasses[meta.tone as keyof typeof toneClasses];

            return (
              <article
                key={service.id || service.title}
                className={`group rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm shadow-neutral-200/70 transition duration-200 hover:-translate-y-1 hover:shadow-2xl ${tone.border}`}
              >
                {service.image_url ? (
                  <div className="-mx-7 -mt-7 mb-7 aspect-[16/10] overflow-hidden rounded-t-3xl bg-gradient-to-br from-white to-neutral-50">
                    <InteractiveImage
                      src={service.image_url}
                      alt={service.title}
                      fit="contain"
                      className="h-full w-full"
                      imageClassName="p-4"
                    />
                  </div>
                ) : null}
                <div className={`grid size-16 place-items-center rounded-2xl ring-1 ${tone.icon}`}>
                  <meta.Icon className="size-8 transition duration-200 group-hover:scale-110" />
                </div>
                <p className={`mt-7 inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${tone.badge}`}>
                  {service.label}
                </p>
                <h3 className="mt-5 text-2xl font-black tracking-tight text-neutral-950">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-neutral-700">{service.description}</p>
                <p className="mt-5 rounded-2xl bg-neutral-50 p-4 text-sm font-bold leading-6 text-neutral-700">
                  {meta.benefit}
                </p>
                <div className="mt-6 grid gap-3">
                  {meta.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm font-bold text-neutral-700">
                      <CheckCircle className="size-5 shrink-0 text-blue-700" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Link href={meta.ctaHref} className="mt-8 inline-flex items-center text-sm font-black text-blue-700">
                  {meta.ctaText}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
                {page.upgrade_eyebrow}
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-neutral-950">
                {page.upgrade_title}
              </h2>
              <p className="mt-5 text-base leading-8 text-neutral-600">
                {page.upgrade_description}
              </p>
              <PageImage
                src={page.upgrade_image_url}
                alt="StockTake Pro upgrade path"
                className="mt-8 aspect-[4/3]"
              />
            </div>

            <div className="grid gap-4">
              {packageSteps.map((step, index) => (
                <article key={step.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  {step.imageUrl ? (
                    <div className="-mx-6 -mt-6 mb-5 aspect-[16/8] overflow-hidden rounded-t-3xl bg-gradient-to-br from-white to-neutral-50">
                      <InteractiveImage
                        src={step.imageUrl}
                        alt={step.title}
                        fit="contain"
                        className="h-full w-full"
                        imageClassName="p-4"
                      />
                    </div>
                  ) : null}
                  <div className="flex gap-4">
                    <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                      <step.Icon className="size-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
                        Level {index + 1}
                      </p>
                      <h3 className="mt-1 text-xl font-black text-neutral-950">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-neutral-600">{step.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-8 text-white shadow-2xl shadow-neutral-300 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-10"
          style={
            page.cta_image_url
              ? {
                  backgroundImage: `linear-gradient(90deg, rgba(10,10,10,0.92), rgba(10,10,10,0.72)), url(${page.cta_image_url})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }
              : undefined
          }
        >
          <div className="relative z-10">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-400">
              {page.cta_eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight">
              {page.cta_title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-300">
              {page.cta_description}
            </p>
          </div>
          <Link
            href={page.cta_button_href}
            className="relative z-10 mt-8 inline-flex items-center justify-center rounded-2xl bg-yellow-400 px-6 py-4 text-sm font-black text-neutral-950 transition hover:-translate-y-0.5 hover:bg-yellow-300 lg:mt-0"
          >
            {page.cta_button_text}
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
