import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-terminal",
});

export const metadata: Metadata = {
  title: "Rasyid Portfolio Log",
  description: "Showcasing impactful software projects with clean design and quick insights.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Rasyid Portfolio Log",
    description: "Discover featured software projects crafted by Rasyid.",
    url: "https://example.com",
    siteName: "Rasyid Portfolio Log",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Rasyid Portfolio Log",
    description: "Discover featured software projects crafted by Rasyid."
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${plexMono.variable}`}>
      <body className="bg-background-950 text-primary-50 antialiased">
        {children}
      </body>
    </html>
  );
}
