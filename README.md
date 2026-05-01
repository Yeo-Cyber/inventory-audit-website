# StockTake Pro Inventory

Production-ready company website for an inventory audit service, Excel-based stock counting software, and barcode scanning hardware business.

## Pages

- Home
- About
- Services
- Projects
- Reference
- Contact
- Dashboard placeholder at `/dashboard` for future authenticated reporting features

## Project Structure

```text
app/
  admin/
  api/admin/
  (dashboard)/dashboard/page.tsx
  about/page.tsx
  contact/page.tsx
  projects/page.tsx
  reference/page.tsx
  services/page.tsx
  globals.css
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  admin/
  Card.tsx
  Footer.tsx
  Hero.tsx
  Navbar.tsx
  SectionHeader.tsx
lib/
  auth.ts
  cms.ts
  defaults.ts
  site.ts
public/
  references/
  stocktake-dashboard.svg
  og-image.svg
```

## CMS

Admin URL:

```text
/admin
```

Supabase setup:

- `.env.local.example`
- `supabase/schema.sql`
- `docs/CMS_SETUP.md`

## Updating Reference Images

Place real project photos in `public/references`, then update the matching
`image` value in `lib/site.ts`.

Example:

```ts
image: "/references/warehouse-client-a.jpg"
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
