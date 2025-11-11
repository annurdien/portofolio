export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  category: string;
  year: number;
  status: "Shipped" | "In Beta" | "Exploration";
  featured?: boolean;
  metrics?: string;
  tags?: string[];
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "neural-voyager",
    title: "Neural Voyager",
    summary: "AI-powered travel planner that crafts personalized itineraries in seconds.",
    description:
      "Combines GPT-powered recommendations with real-time flight and accommodation data to generate travel plans tailored to budget, pace, and interests.",
    tech: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS"],
    links: [
      { label: "Live", href: "https://example.com/neural-voyager" },
      { label: "GitHub", href: "https://github.com/username/neural-voyager" }
    ],
    category: "AI Product",
    year: 2024,
    status: "Shipped",
    featured: true,
    metrics: "12k+ itineraries planned in launch quarter",
    tags: ["CLI"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "aurora-ui",
    title: "Aurora UI",
    summary: "Design system with token-based theming for rapid product teams.",
    description:
      "Delivers composable UI primitives and a design token pipeline that syncs Figma, Storybook, and production code in one workflow.",
    tech: ["React", "Storybook", "Radix UI", "Turborepo"],
    links: [
      { label: "Live", href: "https://example.com/aurora-ui" },
      { label: "GitHub", href: "https://github.com/username/aurora-ui" }
    ],
    category: "Design Systems",
    year: 2023,
    status: "Shipped",
    featured: true,
    metrics: "Cut handoff time by 46% across three product teams",
    tags: ["CLI"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "ledger-lite",
    title: "Ledger Lite",
    summary: "Minimal bookkeeping SaaS keeping solopreneurs audit-ready.",
    description:
      "Automates invoice parsing, real-time cash flow dashboards, and quarterly tax exports with bank-level security integrations.",
    tech: ["Remix", "PostgreSQL", "Prisma", "AWS"],
    links: [
      { label: "Live", href: "https://example.com/ledger-lite" },
      { label: "GitHub", href: "https://github.com/username/ledger-lite" }
    ],
    category: "Fintech SaaS",
    year: 2022,
    status: "Shipped",
    metrics: "Processes $4.2M in invoices each month",
    tags: ["CLI"]
  },
  {
    slug: "orbit-ops",
    title: "Orbit Ops",
    summary: "Mission control dashboard for scaling operations teams.",
    description:
      "Unified incident response, staffing insights, and SLAs into a single cockpit with command palettes and role-based automations.",
    tech: ["Next.js", "tRPC", "PlanetScale", "Tailwind CSS"],
    links: [
      { label: "Case Study", href: "https://example.com/orbit-ops" },
      { label: "GitHub", href: "https://github.com/username/orbit-ops" }
    ],
    category: "Tools & Utilities",
    year: 2024,
    status: "Shipped",
    featured: true,
    metrics: "Reduced on-call alert noise by 63%",
    tags: ["CLI"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "drift-metrics",
    title: "Drift Metrics",
    summary: "Product analytics suite built for live experimentation.",
    description:
      "Event pipelines, cohort analysis, and release impact snapshots with plug-and-play SDKs for web and mobile.",
    tech: ["Next.js", "ClickHouse", "Kafka", "Tailwind CSS"],
    links: [
      { label: "Live", href: "https://example.com/drift-metrics" },
      { label: "GitHub", href: "https://github.com/username/drift-metrics" }
    ],
    category: "Tools & Utilities",
    year: 2021,
    status: "Shipped",
    metrics: "Powers experiments for 18 product squads",
    tags: ["CLI"]
  },
  {
    slug: "canvas-cast",
    title: "Canvas Cast",
    summary: "Interactive storytelling tool for educators and creators.",
    description:
      "Drag-and-drop scene builder with multiplayer editing, asset libraries, and adaptive streaming outputs.",
    tech: ["Next.js", "WebRTC", "Tailwind CSS", "Supabase"],
    links: [
      { label: "Live", href: "https://example.com/canvas-cast" },
      { label: "GitHub", href: "https://github.com/username/canvas-cast" }
    ],
    category: "Tools & Utilities",
    year: 2023,
    status: "In Beta",
    metrics: "3.1k collaborative storyboards built to date",
    tags: ["CLI"]
  },
  {
    slug: "pulse-note",
    title: "Pulse Note",
    summary: "Research repository connecting user insights to product roadmaps.",
    description:
      "Supports transcripts, highlight reels, and stakeholder newsletters with automated tagging and AI-assisted synthesis.",
    tech: ["Next.js", "OpenAI", "Supabase", "Tailwind CSS"],
    links: [
      { label: "Live", href: "https://example.com/pulse-note" },
      { label: "GitHub", href: "https://github.com/username/pulse-note" }
    ],
    category: "Tools & Utilities",
    year: 2022,
    status: "Shipped",
    metrics: "Cut research turnaround from 10 days to 4",
    tags: ["CLI"]
  },
  {
    slug: "atlas-query",
    title: "Atlas Query",
    summary: "Self-serve data portal with contract testing and lineage maps.",
    description:
      "Empowered analysts to ship governed datasets faster with column-level lineage, drift alerts, and documentation hubs.",
    tech: ["Next.js", "GraphQL", "Hasura", "Tailwind CSS"],
    links: [
      { label: "Case Study", href: "https://example.com/atlas-query" },
      { label: "GitHub", href: "https://github.com/username/atlas-query" }
    ],
    category: "Tools & Utilities",
    year: 2021,
    status: "Shipped",
    metrics: "Serves 500+ curated datasets with SLA tracking",
    tags: ["Data", "Governance"]
  },
  {
    slug: "nimbus-guard",
    title: "Nimbus Guard",
    summary: "Cloud security agent delivering posture insights in minutes.",
    description:
      "Surface misconfigurations, drift, and compliance gaps across multi-cloud environments with real-time remediation guides.",
    tech: ["Next.js", "Rust", "gRPC", "Tailwind CSS"],
    links: [
      { label: "Live", href: "https://example.com/nimbus-guard" },
      { label: "GitHub", href: "https://github.com/username/nimbus-guard" }
    ],
    category: "Tools & Utilities",
    year: 2020,
    status: "Shipped",
    metrics: "Closed compliance gaps 70% faster for enterprise teams",
    tags: ["Security", "DevOps"]
  }
];
