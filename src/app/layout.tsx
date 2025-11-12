import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

import { SITE_METADATA } from "@/lib/constants/site";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-terminal",
});

export const metadata = SITE_METADATA;

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
