import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rasyid Portfolio",
  description: "Showcasing impactful software projects with clean design and quick insights.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Rasyid Portfolio",
    description: "Discover featured software projects crafted by Rasyid.",
    url: "https://example.com",
    siteName: "Rasyid Portfolio",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Rasyid Portfolio",
    description: "Discover featured software projects crafted by Rasyid."
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
