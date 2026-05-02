type LogoMarqueeProps = {
  title?: string;
  items?: Array<string | { label: string; logoUrl?: string }>;
};

const defaultItems = [
  "SME Warehouse",
  "Factory Audit",
  "Restaurant Chain",
  "Online Seller",
  "Retail Store",
  "Cold Storage",
  "Spare Parts",
  "Distribution Center",
];

function logoMark(label: string) {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function normalizeItem(item: string | { label: string; logoUrl?: string }) {
  return typeof item === "string" ? { label: item, logoUrl: "" } : item;
}

export function LogoMarquee({
  title = "OUR CUSTOMER REFERENCED",
  items = defaultItems,
}: LogoMarqueeProps) {
  const logos = [...items.map(normalizeItem), ...items.map(normalizeItem)];

  return (
    <section className="overflow-hidden border-y border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
            Reference Network
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
          <div className="flex w-max animate-[stocktake-marquee_28s_linear_infinite] gap-8 hover:[animation-play-state:paused]">
            {logos.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className="grid h-28 w-44 shrink-0 place-items-center rounded-lg border border-neutral-200 bg-gradient-to-br from-white via-yellow-50/45 to-blue-50/50 p-4 shadow-sm shadow-neutral-200/60"
              >
                <div className="grid gap-3 text-center">
                  {item.logoUrl ? (
                    <div className="mx-auto grid h-14 w-28 place-items-center rounded-md bg-white p-2 shadow-sm ring-1 ring-neutral-200">
                      <img src={item.logoUrl} alt={`${item.label} logo`} className="max-h-10 max-w-24 object-contain" />
                    </div>
                  ) : (
                    <div className="mx-auto grid size-14 place-items-center rounded-md bg-neutral-950 text-lg font-black text-yellow-300">
                      {logoMark(item.label)}
                    </div>
                  )}
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-neutral-700">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
