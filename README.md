# Rasyid Portfolio

A focused Next.js archive for browsing software projects. The homepage provides a search box and a grid of project cards; each card links to a dedicated detail page. Built with Tailwind CSS and ready to deploy on Vercel.

## Tech Stack

- [Next.js 14](https://nextjs.org/) with the App Router
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- ESLint with the `next/core-web-vitals` config

## Getting Started

```bash
npm install
npm run dev
```

The development server runs on [http://localhost:3000](http://localhost:3000). The project uses the App Router, so pages live inside `src/app`.

### Useful Scripts

- `npm run dev` – start the local development server
- `npm run lint` – run ESLint
- `npm run build` – create a production build
- `npm run start` – serve the production build locally

## Project Structure

```
src/
  app/
    layout.tsx      # Global layout, metadata, and shared styles
    page.tsx        # Projects list with search box
    projects/
      [slug]/page.tsx # Detail page for each project
    globals.css     # Tailwind layer imports and global theming
  components/
    ProjectGallery.tsx # Search input plus project grid
    Header.tsx      # Minimal navigation
    ProjectCard.tsx # Linkable project card
    Footer.tsx
  data/
    projects.ts     # Source of truth for project content
```

## Adding or Updating Projects

1. Open `src/data/projects.ts`.
2. Add or update an entry in the `projects` array. Each project includes:
  - `slug`: unique identifier for routing/keys
  - `title`, `summary`, `description`: copy used on the card and detail page
  - `tech`: string array displayed on both card and detail page
  - `links`: array of `{ label, href }` entries for live demos, repos, case studies
  - `category`: focus area shown on the detail page
  - `year`: launch year (used for ordering and card header)
  - `status`: one of `"Shipped" | "In Beta" | "Exploration"`
  - Optional `featured`: currently unused but kept for potential future ordering
  - Optional `metrics`: supplemental note on the detail page
  - Optional `tags`: additional labels on the detail page
3. Save the file—the project list and detail routes update automatically.

`ProjectGallery` renders a single search input and the filtered cards in a responsive grid.

## Theming & Styling Notes

- Tailwind utilities power the layout and components. Extend the theme in `tailwind.config.ts` for new colors, fonts, or effects.
- Global backdrop gradients live in `src/app/globals.css`. Adjust or replace them to match your personal brand.
- Interactive states (hover, focus) are already styled; maintain them for accessibility.

## Deployment

1. Push the repository to GitHub (or another git host).
2. Create a new Vercel project and import the repository.
3. Vercel automatically detects Next.js and uses `npm run build` as the production command.
4. Set custom environment variables in Vercel if you introduce API access or analytics.

## Accessibility & Performance

- Semantic HTML structure is used for sections and navigation landmarks.
- The base `Inter` font is loaded via `next/font` for optimal performance.
- Decorative gradients are implemented with CSS and do not require images.

## Next Steps

- Replace placeholder project data and external links with your own.
- Update contact details in `Footer.tsx` if needed.
- Optionally introduce analytics or additional metadata once ready.

Happy shipping!
