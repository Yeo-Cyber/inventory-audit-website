import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | บริการตรวจนับสต๊อก Software และ Hardware`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "ตรวจนับสต๊อก",
    "รับจ้างนับสต๊อก",
    "inventory audit",
    "barcode scanner",
    "software ตรวจนับสินค้า",
    "อุปกรณ์ตรวจนับสินค้า",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | บริการตรวจนับสต๊อก Software และ Hardware`,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} inventory audit website preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | บริการตรวจนับสต๊อก Software และ Hardware`,
    description: siteConfig.description,
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
