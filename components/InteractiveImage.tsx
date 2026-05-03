"use client";

import { useEffect, useState } from "react";
import { X, ZoomIn } from "lucide-react";

type InteractiveImageProps = {
  src?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
};

export function InteractiveImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  fit = "cover",
}: InteractiveImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!src) return null;

  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative block overflow-hidden text-left outline-none focus-visible:ring-4 focus-visible:ring-blue-200 ${className}`}
        aria-label={`ดูรูป: ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          className={`h-full w-full ${fitClass} transition duration-500 ease-out group-hover:scale-[1.035] ${imageClassName}`}
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/35 via-neutral-950/0 to-white/0 opacity-0 transition duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute right-4 top-4 inline-flex translate-y-1 items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-black text-neutral-950 opacity-0 shadow-lg shadow-neutral-900/10 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ZoomIn className="size-4" />
          ดูรูป
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-neutral-950/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white text-neutral-950 shadow-lg transition hover:bg-yellow-300"
            aria-label="ปิดรูป"
          >
            <X className="size-5" />
          </button>
          <div
            className="max-h-[88vh] w-full max-w-6xl overflow-hidden rounded-3xl border border-white/20 bg-white p-2 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={src} alt={alt} className="max-h-[84vh] w-full rounded-2xl object-contain" />
          </div>
        </div>
      ) : null}
    </>
  );
}
