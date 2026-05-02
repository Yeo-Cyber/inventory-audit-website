import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { getSolutions } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "โซลูชัน",
  description:
    "โซลูชันตรวจนับสต๊อกสำหรับ SME ร้านอาหาร โรงงาน คลังสินค้า และ Hypermarket ที่ต้องการรายงานขาดเกินพร้อมใช้",
};

type Shortcut = {
  src: string;
  alt: string;
};

const smeShortcuts: Shortcut[] = [
  {
    src: "/images/projects/shortcuts/sme-excel-database.png",
    alt: "ใช้ Excel เป็นฐานข้อมูล",
  },
  {
    src: "/images/projects/shortcuts/sme-mobile-scanner.png",
    alt: "มือถือและ Scanner ตรวจนับ",
  },
  {
    src: "/images/projects/shortcuts/sme-instant-report.png",
    alt: "รายงานผลทันที",
  },
  {
    src: "/images/projects/shortcuts/sme-accurate-stock.png",
    alt: "เช็คสต๊อกแม่นยำ",
  },
  {
    src: "/images/projects/shortcuts/sme-save-time.png",
    alt: "ประหยัดเวลา",
  },
  {
    src: "/images/projects/shortcuts/sme-dashboard.png",
    alt: "สรุปภาพรวมเข้าใจง่าย",
  },
  {
    src: "/images/projects/shortcuts/sme-export-excel.png",
    alt: "ส่งออก Excel ได้",
  },
  {
    src: "/images/projects/shortcuts/sme-data-security.png",
    alt: "ปลอดภัย ข้อมูลไม่หาย",
  },
];

const restaurantShortcuts: Shortcut[] = [
  {
    src: "/images/projects/shortcuts/restaurant-short-cycle.png",
    alt: "ตรวจนับรอบสั้น",
  },
  {
    src: "/images/projects/shortcuts/restaurant-easy-scan.png",
    alt: "ใช้งานง่ายผ่านมือถือหรือสแกนบาร์โค้ด",
  },
  {
    src: "/images/projects/shortcuts/restaurant-clear-category.png",
    alt: "แยกประเภทของเสีย หมดอายุ และขาดเกิน",
  },
  {
    src: "/images/projects/shortcuts/restaurant-cost-report.png",
    alt: "รายงานต้นทุนจม",
  },
  {
    src: "/images/projects/shortcuts/restaurant-expiry-prevention.png",
    alt: "ป้องกันของหมดอายุ",
  },
  {
    src: "/images/projects/shortcuts/restaurant-food-cost-control.png",
    alt: "ควบคุมต้นทุนอาหาร",
  },
  {
    src: "/images/projects/shortcuts/restaurant-complete-report.png",
    alt: "รายงานครบถ้วน",
  },
  {
    src: "/images/projects/shortcuts/restaurant-trustworthy.png",
    alt: "แม่นยำ เชื่อถือได้",
  },
];

const warehouseShortcuts: Shortcut[] = [
  {
    src: "/images/projects/shortcuts/warehouse-barcode-count.png",
    alt: "ตรวจนับด้วย Barcode",
  },
  {
    src: "/images/projects/shortcuts/warehouse-location.png",
    alt: "รองรับ Location",
  },
  {
    src: "/images/projects/shortcuts/warehouse-lot-batch-serial.png",
    alt: "รองรับ Lot Batch Serial",
  },
  {
    src: "/images/projects/shortcuts/warehouse-expiry-date.png",
    alt: "รองรับ Expiry Date",
  },
  {
    src: "/images/projects/shortcuts/warehouse-complete-report.png",
    alt: "รายงานครบถ้วน",
  },
  {
    src: "/images/projects/shortcuts/warehouse-variance-report.png",
    alt: "รายงานความคลาดเคลื่อน",
  },
  {
    src: "/images/projects/shortcuts/warehouse-audit-report.png",
    alt: "รายงานสำหรับ Audit",
  },
  {
    src: "/images/projects/shortcuts/warehouse-secure-backup.png",
    alt: "ข้อมูลปลอดภัย สำรองได้",
  },
];

const solutionThemes = [
  {
    border: "hover:border-blue-300",
    accent: "bg-blue-600",
    arrow: "text-blue-700",
  },
  {
    border: "hover:border-green-300",
    accent: "bg-green-600",
    arrow: "text-green-700",
  },
  {
    border: "hover:border-purple-300",
    accent: "bg-purple-600",
    arrow: "text-purple-700",
  },
];

const defaultSolutionSlugs = [
  "sme-online-seller",
  "restaurant-cafe",
  "factory-warehouse",
];

function solutionSlugFor(
  solution: { label?: string; title?: string },
  index: number,
) {
  const text = `${solution.label ?? ""} ${solution.title ?? ""}`.toLowerCase();

  if (text.includes("restaurant") || text.includes("cafe") || text.includes("อาหาร")) {
    return "restaurant-cafe";
  }

  if (text.includes("factory") || text.includes("warehouse") || text.includes("โรงงาน")) {
    return "factory-warehouse";
  }

  if (text.includes("sme") || text.includes("online") || text.includes("ออนไลน์")) {
    return "sme-online-seller";
  }

  return defaultSolutionSlugs[index] ?? "sme-online-seller";
}

type ShortcutGridProps = {
  shortcuts: Shortcut[];
  tone: "blue" | "green" | "purple";
  label: string;
};

const shortcutGridTones = {
  blue: "border-blue-100 bg-blue-50/40",
  green: "border-green-100 bg-green-50/40",
  purple: "border-purple-100 bg-purple-50/40",
};

function ShortcutGrid({ shortcuts, tone, label }: ShortcutGridProps) {
  return (
    <div
      className={`grid grid-cols-4 gap-2 rounded-xl border p-2 ${shortcutGridTones[tone]}`}
      aria-label={label}
    >
      {shortcuts.map((shortcut) => (
        <div
          key={shortcut.src}
          className="overflow-hidden rounded-lg border border-white bg-white shadow-sm"
        >
          <Image
            src={shortcut.src}
            alt={shortcut.alt}
            width={340}
            height={425}
            className="h-auto w-full"
          />
        </div>
      ))}
    </div>
  );
}

function SolutionShortcutVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <ShortcutGrid
        shortcuts={smeShortcuts}
        tone="blue"
        label="SME shortcut features"
      />
    );
  }

  if (index === 1) {
    return (
      <ShortcutGrid
        shortcuts={restaurantShortcuts}
        tone="green"
        label="Restaurant and cafe shortcut features"
      />
    );
  }

  return (
    <ShortcutGrid
      shortcuts={warehouseShortcuts}
      tone="purple"
      label="Factory and warehouse shortcut features"
    />
  );
}

type SolutionCardProps = {
  href: string;
  label?: string;
  title: string;
  description: string;
  index: number;
};

function SolutionCard({ href, label, title, description, index }: SolutionCardProps) {
  const theme = solutionThemes[index] ?? solutionThemes[0];

  return (
    <Link
      href={href}
      className={[
        "group block h-full rounded-lg border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-200/70 transition duration-200 hover:-translate-y-1 hover:bg-neutral-50 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
        theme.border,
      ].join(" ")}
    >
      <article className="flex h-full min-h-[320px] flex-col">
        <SolutionShortcutVisual index={index} />
        <div className={`mt-6 h-1 w-12 rounded-full ${theme.accent}`} />
        {label ? (
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
            {label}
          </p>
        ) : null}
        <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-950">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-6 text-neutral-600">
          {description}
        </p>
        <p className={`mt-auto pt-8 text-sm font-black ${theme.arrow}`}>
          ดูรายละเอียดโซลูชัน
          <span className="ml-2 inline-block transition group-hover:translate-x-1">
            -&gt;
          </span>
        </p>
      </article>
    </Link>
  );
}

export default async function ProjectsPage() {
  const solutions = await getSolutions();

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
            {solutions.slice(0, 3).map((solution, index) => {
              const slug = solutionSlugFor(solution, index);

              return (
                <SolutionCard
                  key={solution.id ?? solution.title}
                  href={`/projects/${slug}`}
                  label={solution.label}
                  title={solution.title}
                  description={solution.description}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
