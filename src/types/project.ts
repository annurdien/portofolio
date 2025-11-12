export type ProjectStatus = "Shipped" | "In Beta" | "Exploration";

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectRecord = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  category: string;
  year: number;
  status: ProjectStatus;
  featured: boolean;
  metrics: string | null;
  tags: string[] | null;
  image: string | null;
  created_at: string;
  updated_at: string;
};

export type NewProjectPayload = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  category: string;
  year: number;
  status: ProjectStatus;
  featured?: boolean;
  metrics?: string | null;
  tags?: string[] | null;
  image?: string | null;
};
