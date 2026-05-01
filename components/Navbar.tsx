import Link from "next/link";
import { navItems, siteConfig } from "@/lib/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="bg-neutral-950 px-6 py-2 text-center text-xs font-medium text-white">
        ตรวจนับสต๊อกสินค้า | Software Excel-based | Barcode Scanner & Mobile Kit
      </div>
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-md bg-yellow-400 text-sm font-black text-neutral-950">
            ST
          </span>
          <span className="text-base font-bold tracking-tight text-neutral-950">
            {siteConfig.name}
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-bold text-neutral-950 transition hover:bg-yellow-300"
          >
            ขอใบเสนอราคา
          </Link>
        </div>
      </nav>
    </header>
  );
}
