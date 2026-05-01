# CMS Setup Guide

## 1. Create Supabase Project

Create a Supabase project, then copy:

- Project URL
- anon public key
- service role key

## 2. Run Database Schema

Open Supabase SQL Editor and run:

```text
supabase/schema.sql
```

Default admin login:

```text
username: admin
password: ChangeMe123!
```

Change this password in `admin_users` after first login.

## 3. Configure Environment Variables

Create `.env.local` for local development:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

Add the same variables in Vercel Project Settings > Environment Variables.

## 4. Run Locally

```bash
npm install
npm run dev -- --hostname 127.0.0.1
```

Open:

```text
http://127.0.0.1:3000/admin
```

## 5. Upload Images

Use Admin > Media Library, or upload directly from Homepage, Services, Software,
Hardware, and Pricing forms. Images are stored in Supabase Storage bucket
`cms-media`.

## 6. Deploy

```bash
npm run build
vercel deploy --prod
```

Public pages use `no-store` Supabase fetches, so saved CMS content appears on the
website automatically after refresh.
