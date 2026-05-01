# StockTake Pro Company Website

Production-ready company website for an inventory audit service, Excel-based stock counting software, and barcode scanning hardware business.

## Pages

- Home
- About
- Services
- Projects
- Contact
- Dashboard placeholder at `/dashboard` for future authenticated reporting features

## Project Structure

```text
app/
  (dashboard)/dashboard/page.tsx
  about/page.tsx
  contact/page.tsx
  projects/page.tsx
  services/page.tsx
  globals.css
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  Card.tsx
  Footer.tsx
  Hero.tsx
  Navbar.tsx
  SectionHeader.tsx
lib/
  site.ts
public/
  stocktake-dashboard.svg
  og-image.svg
```

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm run start
```

The project is ready to deploy on Vercel. Update `siteConfig.url` in `lib/site.ts` after assigning the production domain.
