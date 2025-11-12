import type { Metadata } from "next";

export type NavLink = {
  label: string;
  href: string;
  accent?: boolean;
};

export type ContactLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const SITE_ORIGIN = "https://log.rasyid.codes";

export const SITE_METADATA: Metadata = {
  title: "Rasyid Portfolio Log",
  description: "Rasyid Portfolio Log",
  metadataBase: new URL(SITE_ORIGIN),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Rasyid's Portfolio Log",
    description: "Discover featured software projects crafted by Rasyid.",
    url: SITE_ORIGIN,
    siteName: "Rasyid's Portfolio Log",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rasyid's Portfolio Log",
    description: "Discover featured software projects crafted by Rasyid.",
  },
};

export const NAV_LINKS: NavLink[] = [
  { label: "Projects", href: "#projects", accent: true },
  { label: "About", href: "/about" },
];

export const CONTACT_LINKS: ContactLink[] = [
  { label: "Email", href: "mailto:annurdien.dev@gmail.com" },
  { label: "GitHub", href: "https://github.com/annurdien", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/annurdien", external: true },
];
