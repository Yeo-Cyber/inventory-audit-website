import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "พื้นที่เตรียมต่อยอดเป็น dashboard สำหรับดูผลตรวจนับ รายงานขาดเกิน และการรวมไฟล์จากหลายเครื่อง",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-yellow-300">
          Future dashboard
        </p>
        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
          เตรียมพื้นที่สำหรับ Dashboard ตรวจนับ
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-300">
          route นี้แยกไว้สำหรับอนาคต เช่น import Excel, ดูผลขาด/เกิน,
          รวมไฟล์จากหลายเครื่อง, export report และระบบสิทธิ์ผู้ใช้งาน
          โดยไม่กระทบหน้า public website
        </p>
      </div>
    </main>
  );
}
