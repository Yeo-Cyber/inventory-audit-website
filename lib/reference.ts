import type { CmsItem } from "@/lib/cms";

export function referenceSlug(item: CmsItem, index = 0) {
  return encodeURIComponent(item.id ?? String(item.sort_order ?? index + 1));
}

export function matchesReferenceSlug(item: CmsItem, slug: string, index = 0) {
  const decodedSlug = decodeURIComponent(slug);

  return item.id === decodedSlug || String(item.sort_order ?? index + 1) === decodedSlug;
}

export function referenceImages(item: CmsItem) {
  const gallery = Array.isArray(item.gallery_urls)
    ? item.gallery_urls
    : String(item.gallery_urls ?? "")
        .split(/\r?\n|,/)
        .map((url) => url.trim())
        .filter(Boolean);

  return Array.from(new Set(gallery)).slice(0, 10);
}

