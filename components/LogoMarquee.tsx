type LogoMarqueeProps = {
  eyebrow?: string;
  title?: string;
  items?: Array<string | { label: string; logoUrl?: string; href?: string }>;
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

function normalizeItem(item: string | { label: string; logoUrl?: string; href?: string }) {
  return typeof item === "string" ? { label: item, logoUrl: "", href: "" } : item;
}

export function LogoMarquee({
  eyebrow = "Reference Network",
  title = "OUR CUSTOMER REFERENCED",
  items = defaultItems,
}: LogoMarqueeProps) {
  const logos = [...items.map(normalizeItem), ...items.map(normalizeItem)];

  return (
    <section className="overflow-hidden border-y border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
          <div className="flex w-max animate-[stocktake-marquee_28s_linear_infinite] gap-8 hover:[animation-play-state:paused]">
            {logos.map((item, index) => {
              const content = (
                <div className="grid gap-3 text-center">
                  {item.logoUrl ? (
                    <div className="flex h-[120px] w-full items-center justify-center rounded-md bg-white p-4 shadow-sm ring-1 ring-neutral-200">
                      <img
                        src={item.logoUrl}
                        alt={`${item.label} logo`}
                        className="max-h-20 max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-[120px] w-full items-center justify-center rounded-md bg-white p-4 shadow-sm ring-1 ring-neutral-200">
                      <span className="grid size-16 place-items-center rounded-md bg-neutral-950 text-lg font-black text-yellow-300">
                      {logoMark(item.label)}
                      </span>
                    </div>
                  )}
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-neutral-700">
                    {item.label}
                  </p>
                </div>
              );

              const className =
                "grid w-52 shrink-0 place-items-center rounded-lg border border-neutral-200 bg-gradient-to-br from-white via-yellow-50/45 to-blue-50/50 p-4 shadow-sm shadow-neutral-200/60 transition hover:border-yellow-300 hover:shadow-md";

              return item.href ? (
                <a key={`${item.label}-${index}`} href={item.href} className={className}>
                  {content}
                </a>
              ) : (
                <div key={`${item.label}-${index}`} className={className}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
