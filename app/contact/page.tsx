import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description:
    "ติดต่อ StockTake Pro เพื่อประเมินบริการตรวจนับสต๊อก ซอฟต์แวร์จาก Excel และอุปกรณ์สแกนบาร์โค้ด",
};

export default function ContactPage() {
  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <SectionHeader
              eyebrow="Contact"
              title="ส่งโจทย์สต๊อกของคุณมาให้เราประเมิน"
              description="บอกประเภทธุรกิจ จำนวน SKU จำนวนสาขาหรือโซนคลัง และรูปแบบไฟล์ Excel ที่ใช้อยู่ เราจะช่วยแนะนำว่าเหมาะกับ software only, hardware kit หรือ managed audit"
            />
            <div className="mt-10 grid gap-4 text-sm text-neutral-600">
              <p>
                <span className="font-bold text-neutral-950">Email:</span>{" "}
                sales@stocktakepro.example
              </p>
              <p>
                <span className="font-bold text-neutral-950">Phone:</span>{" "}
                02-014-0128
              </p>
              <p>
                <span className="font-bold text-neutral-950">Service Area:</span>{" "}
                กรุงเทพฯ ปริมณฑล และงานโครงการทั่วประเทศ
              </p>
            </div>
          </div>
          <form className="rounded-lg border border-neutral-200 bg-yellow-50 p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-neutral-700">
                ชื่อ
                <input
                  name="firstName"
                  className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-950 outline-none transition focus:border-blue-700"
                  placeholder="ชื่อผู้ติดต่อ"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-neutral-700">
                บริษัท
                <input
                  name="company"
                  className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-950 outline-none transition focus:border-blue-700"
                  placeholder="ชื่อบริษัท"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-neutral-700 sm:col-span-2">
                อีเมลหรือเบอร์โทร
                <input
                  name="contact"
                  className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-950 outline-none transition focus:border-blue-700"
                  placeholder="email@company.com / 08x-xxx-xxxx"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-neutral-700 sm:col-span-2">
                รายละเอียดงาน
                <textarea
                  name="message"
                  rows={6}
                  className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-950 outline-none transition focus:border-blue-700"
                  placeholder="เช่น มี 3,000 SKU ใช้ Excel อยู่ ต้องการสแกน barcode และรายงานขาดเกิน"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 rounded-md bg-neutral-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              ส่งข้อมูลเพื่อประเมิน
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
