import Link from "next/link";
import { navItems, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.3fr_0.7fr_0.7fr] lg:px-8">
        <div>
          <Link href="/" className="text-lg font-bold tracking-tight text-neutral-950">
            {siteConfig.name}
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-neutral-600">
            โซลูชันตรวจนับสต๊อกสำหรับธุรกิจที่ต้องการตัวเลขจริงจากหน้างาน:
            บริการตรวจนับ ซอฟต์แวร์จาก Excel และอุปกรณ์สแกนบาร์โค้ด
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-950">เมนูหลัก</p>
          <div className="mt-4 grid gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-neutral-600 transition hover:text-neutral-950"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-950">ติดต่อ</p>
          <div className="mt-4 grid gap-3 text-sm text-neutral-600">
            <a href="mailto:sales@stocktakepro.example" className="hover:text-neutral-950">
              sales@stocktakepro.example
            </a>
            <a href="tel:+6620140128" className="hover:text-neutral-950">
              02-014-0128
            </a>
            <p>กรุงเทพฯ และให้บริการทั่วประเทศ</p>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-200 px-6 py-5">
        <p className="mx-auto max-w-7xl text-xs text-neutral-500 lg:px-8">
          © 2026 {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
