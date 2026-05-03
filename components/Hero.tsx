import Link from "next/link";
import { InteractiveImage } from "@/components/InteractiveImage";

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  imageSrc?: string;
};

export function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  imageSrc = "/stocktake-dashboard.svg",
}: HeroProps) {
  return (
    <section className="bg-[linear-gradient(120deg,#fff8d6_0%,#ffffff_45%,#eef6ff_100%)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-neutral-950">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryCta.href}
              className="inline-flex justify-center rounded-md bg-neutral-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex justify-center rounded-md border border-neutral-300 bg-white px-5 py-3 text-sm font-bold text-neutral-950 transition hover:border-neutral-500"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
        <InteractiveImage
            src={imageSrc}
            alt="Stock counting software and scanner dashboard preview"
          className="relative min-h-[360px] rounded-lg border border-neutral-200 bg-white shadow-xl shadow-neutral-200/70"
        />
      </div>
    </section>
  );
}
