# Rasyid Portfolio

A Next.js 14 portfolio backed by Supabase for content and authentication. The public site lists projects with search and detail views, while an admin dashboard lets you add or remove entries (including image uploads to Supabase Storage).

## Tech Stack

- [Next.js 14](https://nextjs.org/) App Router with React 18 and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Supabase](https://supabase.com/) for Postgres, Auth, and Storage
- [Zod](https://zod.dev/) for server-action validation
- ESLint with the `next/core-web-vitals` config

## Getting Started

```bash
npm install
npm run dev
```

The development server runs on [http://localhost:3000](http://localhost:3000).

### Required Environment Variables

Create a `.env.local` file with the Supabase credentials for your project:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

The service role key is used only in server-side scripts (like the seeding utility). Do not expose it to the client.

### Useful Scripts

- `npm run dev` – start the local development server
- `npm run lint` – run ESLint
- `npm run build` – create a production build (also verifies Supabase types at compile-time)
- `npm run start` – serve the production build locally

## Supabase Setup

1. Create a `projects` table matching the schema in `src/types/supabase.ts`.
2. Create a `profiles` table and policies by running the SQL in `supabase/security.sql` (see below).
3. Create a public storage bucket named `project-images` (or update `src/lib/constants/project.ts` if you prefer another name).
4. Enable email+password authentication and create admin accounts via Supabase Auth.

### Database & Policy Setup

Run the statements in `supabase/security.sql` inside the Supabase SQL editor. This script:

- Creates the `profiles` table (with roles) and a trigger to insert a `viewer` profile for each new user.
- Enables Row Level Security (RLS) on both `profiles` and `projects`.
- Adds policies so anyone can read projects, but only `admin` roles can insert/update/delete them.
- Locks the `project-images` storage bucket so only admins can write while keeping reads public.

After executing the script, promote the desired accounts to admin:

```sql
update public.profiles set role = 'admin'
where id = '<auth-user-uuid>';
```

## Seeding Project Data

Legacy project content lives in `src/data/projects.ts` as `projectSeedData`. To seed or refresh Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=... \
SUPABASE_SERVICE_ROLE_KEY=... \
npx tsx scripts/seed-projects.ts
```

The script upserts by slug, so rerunning it safely updates existing rows.

## Project Structure

```
src/
  app/
    page.tsx                # Project listing with filters
    projects/[slug]/page.tsx # Project detail view
    admin/                  # Auth-protected dashboard & server actions
  components/               # Shared UI widgets and admin forms
  lib/
    repositories/projects.ts # Supabase data access layer
    supabase/               # Browser/server/admin client factories
  data/projects.ts          # Seed data for migrations/scripts
  types/                    # Shared runtime and Supabase types
scripts/
  seed-projects.ts          # CLI to populate Supabase
```

## Content Management

- Use the admin dashboard at `/admin` to sign in (email/password) and create or delete projects. Image uploads are stored in Supabase Storage and linked automatically.
- For bulk updates, edit `src/data/projects.ts` and rerun the seeding script.

## Theming & Styling Notes

- Tailwind utilities power the layout; extend `tailwind.config.ts` for custom palettes.
- Global gradients and typography live in `src/app/globals.css`.
- Interactive states (hover, focus) are already styled; keep them for accessibility.

## Deployment

1. Push the repository to your git host.
2. On Vercel, set the same Supabase environment variables in the project settings.
3. Deploy; Vercel runs `npm run build` and uses `next start` for production.

## Next Steps

- Grant additional roles or expand policies as your needs grow (e.g., editors vs admins).
- Extend the admin dashboard with update/edit flows or metrics tracking.
- Replace placeholder images in `public/images` with production assets.
