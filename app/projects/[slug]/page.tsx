import type { ComponentType } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CheckCircle,
  ClipboardCheck,
  Clock3,
  Factory,
  FileSpreadsheet,
  HelpCircle,
  MapPinned,
  PackageSearch,
  ScanBarcode,
  ShieldCheck,
  ShoppingCart,
  Trash2,
  Utensils,
  Warehouse,
} from "lucide-react";
import { InteractiveImage } from "@/components/InteractiveImage";
import { getProjectDetails } from "@/lib/cms";
import { projects } from "@/lib/projects";
import { SolutionFaqAccordion, SolutionWorkflowStepper } from "./SolutionInteractiveSections";

export const dynamic = "force-dynamic";

type Params = {
  slug: string;
};

type Tone = "blue" | "green" | "purple";

type DetailConfig = {
  slug: string;
  label: string;
  title: string;
  subtitle: string;
  badges: string[];
  tone: Tone;
  heroImage: string;
  solutionImage: string;
  heroAlt: string;
  solutionAlt: string;
  Icon: ComponentType<{ className?: string }>;
  painIntro: string;
  solutionTitle: string;
  solutionDescription: string;
  painPoints: {
    title: string;
    description: string;
    Icon: ComponentType<{ className?: string }>;
  }[];
  solutionBullets: string[];
  workflow: {
    title: string;
    description: string;
    icon: "upload" | "scan" | "verify" | "report" | "export" | "calendar" | "location";
  }[];
  reports: {
    title: string;
    description: string;
    Icon: ComponentType<{ className?: string }>;
    bars: string[];
  }[];
  benefits: string[];
  gallery: {
    src: string;
    alt: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  ctaTitle: string;
};

const toneClasses = {
  blue: {
    text: "text-blue-700",
    icon: "border-blue-100 bg-blue-50 text-blue-600",
    border: "hover:border-blue-200",
    soft: "from-white to-blue-50/60 border-blue-100",
    hero: "from-white via-blue-50/60 to-yellow-50/50",
  },
  green: {
    text: "text-green-700",
    icon: "border-green-100 bg-green-50 text-green-600",
    border: "hover:border-green-200",
    soft: "from-white to-green-50/60 border-green-100",
    hero: "from-white via-green-50/60 to-yellow-50/45",
  },
  purple: {
    text: "text-purple-700",
    icon: "border-purple-100 bg-purple-50 text-purple-600",
    border: "hover:border-purple-200",
    soft: "from-white to-purple-50/60 border-purple-100",
    hero: "from-white via-purple-50/60 to-yellow-50/45",
  },
};

const detailPages: DetailConfig[] = [
  {
    slug: "sme-online-seller",
    label: "SME / Online Seller",
    title: "SME / Online Seller Stocktake Solution",
    subtitle: "ระบบตรวจนับสต๊อกสำหรับร้านออนไลน์ Shopee / Lazada / คลังเล็ก",
    badges: ["Excel Base", "Barcode Scan", "Stock Diff Report", "No Setup Required"],
    tone: "blue",
    heroImage: "/images/projects/sme-detail-hero.svg",
    solutionImage: "/images/projects/sme-detail-solution.svg",
    heroAlt: "Excel barcode and stock diff icon illustration",
    solutionAlt: "Excel scan verify and report workflow icon illustration",
    Icon: ShoppingCart,
    painIntro:
      "ออกแบบสำหรับธุรกิจที่ยังใช้ Excel เป็นหลัก แต่ต้องการความแม่นยำและรายงานที่นำไปใช้ต่อได้ทันที",
    solutionTitle: "ใช้ Excel เดิม แล้วเพิ่ม workflow ตรวจนับที่แม่นยำกว่า",
    solutionDescription:
      "ไม่ต้องเริ่มจากระบบใหญ่ ใช้ข้อมูลที่มีอยู่แล้วเป็นฐาน แล้วเพิ่มขั้นตอน scan, count, verify และ report ให้ครบในรอบเดียว",
    painPoints: [
      {
        title: "Excel ไม่ตรงกับของจริง",
        description: "ยอดตั้งต้นคลาดเคลื่อนจากสินค้าที่อยู่ในคลังจริง ทำให้สั่งของหรือขายต่อผิดพลาด",
        Icon: FileSpreadsheet,
      },
      {
        title: "สินค้าหาย / หาไม่เจอ",
        description: "สินค้าอยู่ผิดตำแหน่งหรือถูกหยิบออกไปแล้วไม่มีหลักฐาน ทำให้เสียเวลาไล่เช็ก",
        Icon: PackageSearch,
      },
      {
        title: "ตรวจนับช้า ใช้คนเยอะ",
        description: "การนับด้วยกระดาษหรือกรอกมือทำให้ใช้เวลานานและผิดพลาดง่าย",
        Icon: Clock3,
      },
      {
        title: "ไม่มีรายงานสรุป",
        description: "ไม่เห็นภาพรวมว่าสินค้าใดขาด เกิน หาย หรือยังไม่ถูกตรวจนับ",
        Icon: BarChart3,
      },
    ],
    solutionBullets: [
      "ใช้ Excel เดิมเป็นฐานข้อมูลเริ่มต้น",
      "ตรวจนับด้วยมือถือหรือ Barcode Scanner",
      "ระบบรวมผล Count / Verify / Diff อัตโนมัติ",
      "Export Excel และ Dashboard ได้ทันที",
    ],
    workflow: [
      { title: "Upload Excel Stock", description: "นำไฟล์ stock ตั้งต้นจาก Excel เข้า workflow", icon: "upload" },
      { title: "Scan / Count", description: "ตรวจนับด้วยมือถือหรือ barcode scanner", icon: "scan" },
      { title: "Verify Difference", description: "ตรวจซ้ำเฉพาะรายการที่ยอดต่าง", icon: "verify" },
      { title: "Generate Report", description: "สร้าง Stocktake, Diff และ No Count Report", icon: "report" },
      { title: "Export / Dashboard", description: "ส่งออก Excel หรือดู Dashboard", icon: "export" },
    ],
    reports: [
      { title: "Stocktake Report", description: "รายการตรวจนับจริงพร้อมจำนวนและตำแหน่ง", Icon: ClipboardCheck, bars: ["w-10", "w-16", "w-12"] },
      { title: "Diff Report", description: "เทียบยอดตั้งต้นกับยอดนับจริง", Icon: AlertTriangle, bars: ["w-16", "w-8", "w-14"] },
      { title: "No Count Report", description: "รายการสินค้าที่ยังไม่ถูกตรวจนับ", Icon: PackageSearch, bars: ["w-8", "w-12", "w-10"] },
      { title: "Summary Dashboard", description: "ภาพรวมสำหรับเจ้าของกิจการ", Icon: BarChart3, bars: ["w-12", "w-20", "w-16"] },
    ],
    benefits: [
      "ลดเวลาตรวจนับมากกว่า 50%",
      "ลดความผิดพลาดจาก manual count",
      "รู้สินค้าเกิน / ขาด / หาย ได้ทันที",
      "ใช้งานต่อกับ Excel เดิมได้",
    ],
    gallery: [
      { src: "/images/projects/sme-gallery-excel.svg", alt: "Excel master file icon illustration" },
      { src: "/images/projects/sme-gallery-scan.svg", alt: "Mobile barcode scan icon illustration" },
      { src: "/images/projects/sme-gallery-report.svg", alt: "Diff report and dashboard icon illustration" },
    ],
    faqs: [
      { question: "ต้องเปลี่ยนระบบเดิมไหม?", answer: "ไม่จำเป็น ระบบออกแบบให้ใช้ Excel เดิมเป็นฐานข้อมูลเริ่มต้น" },
      { question: "ใช้กับ Excel ได้ไหม?", answer: "ได้ สามารถนำข้อมูลจาก Excel มาเทียบกับยอดตรวจนับจริงและ export กลับไปใช้งานต่อได้" },
      { question: "ใช้กับมือถือได้ไหม?", answer: "ใช้ได้ทั้งมือถือและ barcode scanner สำหรับงานที่ต้องการความเร็วสูง" },
      { question: "หลังตรวจนับได้รายงานอะไรบ้าง?", answer: "ได้ Stocktake Report, Diff Report, No Count Report และ Summary Dashboard" },
    ],
    ctaTitle: "เริ่มตรวจนับสต๊อกแบบง่ายและแม่นยำสำหรับธุรกิจออนไลน์ของคุณ",
  },
  {
    slug: "restaurant-cafe",
    label: "Restaurant / Cafe",
    title: "Restaurant / Cafe Stocktake Solution",
    subtitle: "ระบบตรวจนับวัตถุดิบ ของเสีย และของหมดอายุสำหรับร้านอาหารและคาเฟ่",
    badges: ["Short Cycle Count", "Waste Tracking", "Expiry Alert", "Food Cost Report"],
    tone: "green",
    heroImage: "/images/projects/restaurant-detail-hero.svg",
    solutionImage: "/images/projects/restaurant-detail-solution.svg",
    heroAlt: "Restaurant inventory audit icon illustration",
    solutionAlt: "Ingredient count waste expiry and cost workflow illustration",
    Icon: Utensils,
    painIntro:
      "เหมาะกับร้านอาหาร คาเฟ่ หรือครัวกลางที่ต้องการควบคุมวัตถุดิบ ของเสีย ของหมดอายุ และต้นทุนอาหารเป็นรอบสั้น",
    solutionTitle: "แยกวัตถุดิบ ของเสีย และต้นทุนให้เห็นเป็นตัวเลข",
    solutionDescription:
      "ออกแบบให้ตรวจนับรอบสั้นได้ง่าย แยกสถานะของวัตถุดิบ และสรุป variance รายสัปดาห์หรือรายเดือนให้เจ้าของกิจการ",
    painPoints: [
      { title: "วัตถุดิบสูญหาย", description: "ของถูกหยิบใช้หรือสูญเสียระหว่างวัน แต่ไม่มีตัวเลขให้ตรวจสอบ", Icon: PackageSearch },
      { title: "ของหมดอายุ", description: "วัตถุดิบค้างสต๊อกจนหมดอายุและกลายเป็นต้นทุนสูญเสีย", Icon: CalendarCheck },
      { title: "ต้นทุนอาหารคุมยาก", description: "ไม่รู้ต้นทุนจมและ variance ของวัตถุดิบแต่ละกลุ่ม", Icon: BarChart3 },
      { title: "ตรวจรอบสั้นไม่ต่อเนื่อง", description: "ทีมงานไม่มี workflow ที่ชัดเจนสำหรับการเช็กรายสัปดาห์หรือรายเดือน", Icon: Clock3 },
    ],
    solutionBullets: [
      "ตรวจนับรอบสั้น รายสัปดาห์หรือรายเดือน",
      "แยกของเสีย ของหมดอายุ และของขาดเกิน",
      "สรุปต้นทุนจมและ monthly variance",
      "Export รายงาน Ingredient, Waste และ Expiry ได้ทันที",
    ],
    workflow: [
      { title: "Prepare Ingredient List", description: "เตรียมรายการวัตถุดิบและหน่วยนับจาก Excel", icon: "upload" },
      { title: "Count by Zone", description: "ตรวจนับแยกครัว ห้องเย็น หน้าร้าน หรือสาขา", icon: "location" },
      { title: "Classify Waste / Expiry", description: "แยกของเสีย หมดอายุ และของขาดเกิน", icon: "verify" },
      { title: "Food Cost Summary", description: "สรุปต้นทุนจมและ variance รายเดือน", icon: "report" },
      { title: "Export Reports", description: "ส่งออกไฟล์ให้เจ้าของกิจการและทีมบัญชี", icon: "export" },
    ],
    reports: [
      { title: "Ingredient Count Report", description: "ยอดวัตถุดิบจริงแยกตามพื้นที่", Icon: ClipboardCheck, bars: ["w-12", "w-14", "w-10"] },
      { title: "Waste Report", description: "ของเสียและต้นทุนสูญเสีย", Icon: Trash2, bars: ["w-10", "w-16", "w-8"] },
      { title: "Expiry Report", description: "รายการที่ใกล้หมดอายุหรือหมดอายุแล้ว", Icon: CalendarCheck, bars: ["w-16", "w-12", "w-14"] },
      { title: "Monthly Variance Summary", description: "สรุปส่วนต่างรายเดือน", Icon: BarChart3, bars: ["w-20", "w-12", "w-16"] },
    ],
    benefits: [
      "ลดของเสียและของหมดอายุ",
      "เห็นต้นทุนจมเป็นตัวเลข",
      "ควบคุมวัตถุดิบรายสาขาได้ดีขึ้น",
      "ตรวจรอบสั้นได้ต่อเนื่อง",
    ],
    gallery: [
      { src: "/images/projects/restaurant-gallery-count.svg", alt: "Restaurant ingredient count illustration" },
      { src: "/images/projects/restaurant-gallery-waste.svg", alt: "Restaurant waste and expiry illustration" },
      { src: "/images/projects/restaurant-gallery-cost.svg", alt: "Restaurant food cost dashboard illustration" },
    ],
    faqs: [
      { question: "เหมาะกับร้านหลายสาขาไหม?", answer: "เหมาะมาก เพราะสามารถแยกพื้นที่หรือสาขาและสรุป variance แต่ละจุดได้" },
      { question: "ตรวจของหมดอายุได้ไหม?", answer: "ได้ สามารถเพิ่มคอลัมน์วันหมดอายุใน Excel และแยกเป็น Expiry Report ได้" },
      { question: "ต้องใช้ barcode ทุกชิ้นไหม?", answer: "ไม่จำเป็น รายการที่ไม่มี barcode สามารถเลือกจากรายการและกรอกจำนวนได้" },
      { question: "ได้รายงานอะไรบ้าง?", answer: "ได้ Ingredient Count, Waste, Expiry และ Monthly Variance Summary" },
    ],
    ctaTitle: "เริ่มควบคุมวัตถุดิบ ของเสีย และต้นทุนอาหารให้ชัดเจนขึ้น",
  },
  {
    slug: "factory-warehouse",
    label: "Factory / Warehouse",
    title: "Factory / Warehouse Stocktake Solution",
    subtitle: "ระบบตรวจนับสำหรับคลังใหญ่ โรงงาน ปิดงบ และงาน audit",
    badges: ["Location Control", "Lot / Batch / Serial", "Expiry", "Audit Sign-off"],
    tone: "purple",
    heroImage: "/images/projects/warehouse-detail-hero.svg",
    solutionImage: "/images/projects/warehouse-detail-solution.svg",
    heroAlt: "Factory warehouse barcode audit icon illustration",
    solutionAlt: "Warehouse scan reconcile and audit workflow illustration",
    Icon: Warehouse,
    painIntro:
      "เหมาะกับโรงงานและคลังสินค้าที่มีหลายพื้นที่ ต้องควบคุม location, lot, batch, serial และต้องใช้รายงานสำหรับ finance หรือ auditor",
    solutionTitle: "ตรวจนับคลังใหญ่ด้วย barcode และรายงานที่ตรวจสอบย้อนหลังได้",
    solutionDescription:
      "ช่วยวาง workflow ตั้งแต่ cut-off, mapping master file, scan ตาม location, reconcile และออก audit sign-off report",
    painPoints: [
      { title: "ปิดงบล่าช้า", description: "ข้อมูล stock ไม่พร้อม ทำให้ finance และ auditor ใช้เวลาตรวจสอบนาน", Icon: Clock3 },
      { title: "Stock card ไม่ตรง", description: "ยอดตามระบบไม่ตรงกับยอดจริงในคลังและต้องตรวจซ้ำหลายรอบ", Icon: AlertTriangle },
      { title: "Lot / Serial คุมยาก", description: "สินค้าแยก lot, batch หรือ serial แต่ข้อมูลไม่เป็นระบบ", Icon: ScanBarcode },
      { title: "ตำแหน่งสินค้าไม่ชัด", description: "สินค้าอยู่หลาย zone, rack, bin ทำให้หาและตรวจสอบย้อนหลังยาก", Icon: MapPinned },
    ],
    solutionBullets: [
      "ตรวจนับด้วย barcode สำหรับงาน volume สูง",
      "รองรับ Location, Lot, Batch, Expiry, Serial",
      "Reconcile กับ stock card หรือ ERP export",
      "มี report สำหรับ audit และ finance",
    ],
    workflow: [
      { title: "Plan Cut-off", description: "วางแผนหยุดรับจ่ายและกำหนดพื้นที่ตรวจนับ", icon: "calendar" },
      { title: "Map Master File", description: "เตรียมไฟล์และ mapping column สำคัญ", icon: "upload" },
      { title: "Scan by Location", description: "ตรวจนับตาม warehouse, zone, rack และ bin", icon: "scan" },
      { title: "Reconcile Variance", description: "เทียบยอดจริงกับ stock card หรือ ERP export", icon: "verify" },
      { title: "Audit Sign-off", description: "ออก report สำหรับ finance และ auditor", icon: "report" },
    ],
    reports: [
      { title: "Location Report", description: "ยอดตรวจนับแยกตามพื้นที่จัดเก็บ", Icon: MapPinned, bars: ["w-14", "w-18", "w-10"] },
      { title: "Lot / Batch Report", description: "ติดตาม lot, batch และ serial", Icon: ScanBarcode, bars: ["w-20", "w-12", "w-16"] },
      { title: "Variance Report", description: "ส่วนต่างระหว่างยอดจริงกับระบบ", Icon: AlertTriangle, bars: ["w-12", "w-8", "w-16"] },
      { title: "Audit Sign-off Report", description: "รายงานพร้อมตรวจสอบสำหรับ auditor", Icon: ShieldCheck, bars: ["w-16", "w-20", "w-12"] },
    ],
    benefits: [
      "ลดความเสี่ยงตัวเลขปิดงบผิด",
      "ตรวจสอบย้อนหลังตาม location และ lot ได้",
      "ช่วย finance และ auditor ใช้ข้อมูลต่อได้ง่าย",
      "รองรับงานตรวจนับขนาดใหญ่",
    ],
    gallery: [
      { src: "/images/projects/warehouse-gallery-location.svg", alt: "Warehouse location control illustration" },
      { src: "/images/projects/warehouse-gallery-lot.svg", alt: "Warehouse lot batch serial illustration" },
      { src: "/images/projects/warehouse-gallery-audit.svg", alt: "Warehouse audit report illustration" },
    ],
    faqs: [
      { question: "รองรับหลาย location ไหม?", answer: "รองรับการตรวจนับแยก warehouse, zone, rack และ bin ได้" },
      { question: "รองรับ Lot / Batch / Serial ไหม?", answer: "รองรับได้ผ่านโครงสร้าง Excel และ workflow ตรวจนับที่กำหนด field เพิ่มเติม" },
      { question: "ใช้กับงานปิดงบได้ไหม?", answer: "ได้ โดยเน้น variance report และ audit sign-off report สำหรับทีมบัญชีและผู้สอบบัญชี" },
      { question: "ต้องต่อ ERP โดยตรงไหม?", answer: "ไม่จำเป็น สามารถใช้ไฟล์ export จาก ERP หรือ stock card เป็น master file ตั้งต้นได้" },
    ],
    ctaTitle: "เริ่มตรวจนับคลังและโรงงานด้วยข้อมูลที่ตรวจสอบย้อนหลังได้",
  },
];

type CmsSolutionDetail = Partial<Record<string, unknown>> & {
  slug?: string;
};

const contentIcons = {
  alert: AlertTriangle,
  chart: BarChart3,
  calendar: CalendarCheck,
  check: CheckCircle,
  clipboard: ClipboardCheck,
  clock: Clock3,
  excel: FileSpreadsheet,
  factory: Factory,
  help: HelpCircle,
  location: MapPinned,
  package: PackageSearch,
  scan: ScanBarcode,
  shield: ShieldCheck,
  shopping: ShoppingCart,
  trash: Trash2,
  utensils: Utensils,
  warehouse: Warehouse,
};

const defaultPainIcons = ["excel", "package", "clock", "chart"];
const defaultReportIcons = ["clipboard", "alert", "package", "chart"];

function lines(value: unknown) {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }

  return String(value ?? "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function text(value: unknown, fallback: string) {
  const next = String(value ?? "").trim();
  return next || fallback;
}

function list(value: unknown, fallback: string[]) {
  const next = lines(value);
  return next.length ? next : fallback;
}

function imageList(value: unknown, fallback: DetailConfig["gallery"]) {
  const urls = String(value ?? "")
    .split(/\r?\n|,/)
    .map((url) => url.trim())
    .filter(Boolean);

  if (!urls.length) {
    return fallback;
  }

  return urls.slice(0, 10).map((src, index) => ({
    src,
    alt: `Solution gallery image ${index + 1}`,
  }));
}

function icon(name: unknown, fallback: keyof typeof contentIcons) {
  const key = String(name ?? "").trim() as keyof typeof contentIcons;
  return contentIcons[key] ?? contentIcons[fallback];
}

function parseCards(
  value: unknown,
  fallback: DetailConfig["painPoints"],
  fallbackIcons: string[],
) {
  const rows = lines(value);
  if (!rows.length) {
    return fallback;
  }

  return rows.map((row, index) => {
    const [title, description, iconName] = row.split("|").map((part) => part.trim());
    return {
      title: title || fallback[index]?.title || `Item ${index + 1}`,
      description: description || fallback[index]?.description || "",
      Icon: icon(iconName, (fallbackIcons[index] || "check") as keyof typeof contentIcons),
    };
  });
}

function parseWorkflow(value: unknown, fallback: DetailConfig["workflow"]) {
  const rows = lines(value);
  if (!rows.length) {
    return fallback;
  }

  return rows.map((row, index) => {
    const [title, description, iconName] = row.split("|").map((part) => part.trim());
    return {
      title: title || fallback[index]?.title || `Step ${index + 1}`,
      description: description || fallback[index]?.description || "",
      icon: (
        ["upload", "scan", "verify", "report", "export", "calendar", "location"].includes(iconName)
          ? iconName
          : fallback[index]?.icon || "verify"
      ) as DetailConfig["workflow"][number]["icon"],
    };
  });
}

function parseReports(value: unknown, fallback: DetailConfig["reports"]) {
  const rows = lines(value);
  if (!rows.length) {
    return fallback;
  }

  return rows.map((row, index) => {
    const [title, description, iconName] = row.split("|").map((part) => part.trim());
    return {
      title: title || fallback[index]?.title || `Report ${index + 1}`,
      description: description || fallback[index]?.description || "",
      Icon: icon(iconName, (defaultReportIcons[index] || "chart") as keyof typeof contentIcons),
      bars: fallback[index]?.bars || ["w-12", "w-16", "w-10"],
    };
  });
}

function parseFaqs(value: unknown, fallback: DetailConfig["faqs"]) {
  const rows = lines(value);
  if (!rows.length) {
    return fallback;
  }

  return rows.map((row, index) => {
    const [question, answer] = row.split("|").map((part) => part.trim());
    return {
      question: question || fallback[index]?.question || `FAQ ${index + 1}`,
      answer: answer || fallback[index]?.answer || "",
    };
  });
}

function mergeDetail(defaultDetail: DetailConfig, cms?: CmsSolutionDetail): DetailConfig {
  if (!cms) {
    return defaultDetail;
  }

  return {
    ...defaultDetail,
    label: text(cms.label, defaultDetail.label),
    title: text(cms.detailTitle, defaultDetail.title),
    subtitle: text(cms.detailSubtitle, defaultDetail.subtitle),
    badges: list(cms.badges, defaultDetail.badges),
    heroImage: text(cms.detailHeroImage, defaultDetail.heroImage),
    solutionImage: text(cms.detailSolutionImage, defaultDetail.solutionImage),
    heroAlt: text(cms.heroAlt, defaultDetail.heroAlt),
    solutionAlt: text(cms.solutionAlt, defaultDetail.solutionAlt),
    painIntro: text(cms.painIntro, defaultDetail.painIntro),
    solutionTitle: text(cms.solutionTitle, defaultDetail.solutionTitle),
    solutionDescription: text(cms.solutionDescription, defaultDetail.solutionDescription),
    painPoints: parseCards(cms.painPointCards, defaultDetail.painPoints, defaultPainIcons),
    solutionBullets: list(cms.solutionBullets, defaultDetail.solutionBullets),
    workflow: parseWorkflow(cms.workflowSteps, defaultDetail.workflow),
    reports: parseReports(cms.reportCards, defaultDetail.reports),
    benefits: list(cms.benefits, defaultDetail.benefits),
    gallery: imageList(cms.gallery_urls, defaultDetail.gallery),
    faqs: parseFaqs(cms.faqs, defaultDetail.faqs),
    ctaTitle: text(cms.ctaTitle, defaultDetail.ctaTitle),
  };
}

function getDefaultDetail(slug: string) {
  return detailPages.find((page) => page.slug === slug);
}

async function getDetail(slug: string) {
  const fallback = getDefaultDetail(slug);
  if (!fallback) {
    return null;
  }

  const cmsDetails = (await getProjectDetails()) as Array<CmsSolutionDetail>;
  const cms = cmsDetails.find((item) => item.slug === slug);

  return mergeDetail(fallback, cms);
}

function SectionIntro({
  eyebrow,
  title,
  description,
  tone,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone: Tone;
}) {
  const theme = toneClasses[tone];

  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className={`text-sm font-black uppercase tracking-[0.2em] ${theme.text}`}>
        {eyebrow}
      </p>
      <h2 className="mt-4 text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-8 text-neutral-600">{description}</p>
      ) : null}
    </div>
  );
}

function MiniReportPreview({ bars, tone }: { bars: string[]; tone: Tone }) {
  const dot = tone === "blue" ? "bg-blue-500" : tone === "green" ? "bg-green-500" : "bg-purple-500";

  return (
    <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
      <div className="flex items-center gap-2">
        <span className="size-3 rounded-full bg-red-300" />
        <span className="size-3 rounded-full bg-yellow-300" />
        <span className="size-3 rounded-full bg-green-300" />
      </div>
      <div className="mt-5 space-y-3">
        {bars.map((bar, index) => (
          <div key={`${bar}-${index}`} className="flex items-center gap-3">
            <span className={`h-3 w-3 rounded-full ${dot}`} />
            <span className={`h-3 rounded-full bg-neutral-300 ${bar}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PremiumDetailPage({ detail }: { detail: DetailConfig }) {
  const theme = toneClasses[detail.tone];
  const Icon = detail.Icon;

  return (
    <main className="bg-white">
      <section className={`overflow-hidden border-b border-neutral-200 bg-gradient-to-br ${theme.hero}`}>
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <Link href="/projects" className={`text-sm font-black ${theme.text} hover:text-neutral-950`}>
              &larr; กลับไปหน้าโซลูชัน
            </Link>
            <div className="mt-8 flex flex-wrap gap-2">
              {detail.badges.map((badge) => (
                <span
                  key={badge}
                  className={`rounded-full border bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.12em] shadow-sm ${theme.soft} ${theme.text}`}
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className={`grid size-14 place-items-center rounded-2xl border ${theme.icon}`}>
                <Icon className="size-7" />
              </div>
              <p className={`text-sm font-black uppercase tracking-[0.18em] ${theme.text}`}>
                {detail.label}
              </p>
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-neutral-950 sm:text-6xl">
              {detail.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-neutral-700">
              {detail.subtitle}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-yellow-400 px-6 py-4 text-sm font-black text-neutral-950 shadow-lg shadow-yellow-200 transition hover:-translate-y-0.5 hover:bg-yellow-300"
              >
                ขอใบเสนอราคา
                <ArrowRight className="ml-2 size-4" />
              </Link>
              <Link
                href="#workflow"
                className={`inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-neutral-950 shadow-sm transition hover:-translate-y-0.5 ${theme.border}`}
              >
                ดูขั้นตอนการทำงาน
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white bg-white shadow-2xl shadow-neutral-200/80">
            <InteractiveImage
              src={detail.heroImage}
              alt={detail.heroAlt}
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionIntro
          eyebrow="Pain Point"
          title={`ปัญหาหลักของ ${detail.label}`}
          description={detail.painIntro}
          tone={detail.tone}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {detail.painPoints.map((item) => (
            <article
              key={item.title}
              className={`rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-200/70 transition duration-200 hover:-translate-y-1 hover:shadow-xl ${theme.border}`}
            >
              <div className={`grid size-12 place-items-center rounded-2xl border ${theme.icon}`}>
                <item.Icon className="size-6" />
              </div>
              <h3 className="mt-6 text-xl font-black text-neutral-950">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <p className={`text-sm font-black uppercase tracking-[0.2em] ${theme.text}`}>
              Solution
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-neutral-950">
              {detail.solutionTitle}
            </h2>
            <p className="mt-5 text-lg leading-8 text-neutral-600">
              {detail.solutionDescription}
            </p>
            <ul className="mt-8 grid gap-4">
              {detail.solutionBullets.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-neutral-800">
                  <CheckCircle className={`mt-0.5 size-5 shrink-0 ${theme.text}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-first overflow-hidden rounded-3xl border border-white bg-white shadow-2xl shadow-neutral-200/80 lg:order-none">
            <InteractiveImage
              src={detail.solutionImage}
              alt={detail.solutionAlt}
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionIntro
          eyebrow="Interactive Workflow"
          title="ตรวจนับเป็นขั้นตอน เห็นผลต่างได้ชัดเจน"
          description="เลือกหรือ hover แต่ละ step เพื่อดู workflow ตั้งแต่ไฟล์ตั้งต้นจนถึงรายงานสรุป"
          tone={detail.tone}
        />
        <div className="mt-12">
          <SolutionWorkflowStepper steps={detail.workflow} tone={detail.tone} />
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionIntro eyebrow="Report Output" title="รายงานพร้อมใช้สำหรับการตัดสินใจ" tone={detail.tone} />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {detail.reports.map((report) => (
              <article
                key={report.title}
                className={`rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl ${theme.border}`}
              >
                <div className={`grid size-12 place-items-center rounded-2xl ${theme.icon}`}>
                  <report.Icon className="size-6" />
                </div>
                <h3 className="mt-6 text-xl font-black text-neutral-950">{report.title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{report.description}</p>
                <MiniReportPreview bars={report.bars} tone={detail.tone} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionIntro eyebrow="KPI / Benefit" title="ผลลัพธ์ที่เห็นได้จากรอบตรวจนับ" tone={detail.tone} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {detail.benefits.map((benefit, index) => (
            <article
              key={benefit}
              className={`rounded-3xl border bg-gradient-to-br p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl ${theme.soft}`}
            >
              <div className={`text-4xl font-black ${theme.text}`}>0{index + 1}</div>
              <p className="mt-8 text-lg font-black leading-7 text-neutral-950">{benefit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionIntro eyebrow="Gallery" title={`ภาพประกอบการใช้งาน ${detail.label}`} tone={detail.tone} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {detail.gallery.map((image) => (
              <div
                key={image.src}
                className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
              >
                <InteractiveImage
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionIntro eyebrow="FAQ" title="คำถามที่พบบ่อย" tone={detail.tone} />
        <div className="mt-12">
          <SolutionFaqAccordion faqs={detail.faqs} tone={detail.tone} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8 text-white shadow-2xl shadow-neutral-300 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-400">
              Start Stocktake
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              {detail.ctaTitle}
            </h2>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-yellow-400 px-6 py-4 text-sm font-black text-neutral-950 transition hover:-translate-y-0.5 hover:bg-yellow-300"
            >
              ขอใบเสนอราคา
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-yellow-300 hover:text-yellow-300"
            >
              ติดต่อทีมงาน
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getDetail(slug);

  if (!detail) {
    return {
      title: "ไม่พบโซลูชัน",
    };
  }

  return {
    title: detail.title,
    description: detail.subtitle,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const detail = await getDetail(slug);

  if (!detail) {
    notFound();
  }

  return <PremiumDetailPage detail={detail} />;
}
