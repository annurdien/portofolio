import type { NextConfig } from "next";

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (supabaseUrl) {
  try {
    const { hostname } = new URL(supabaseUrl);

    // Allow Next Image to serve assets stored in the Supabase storage bucket.
    remotePatterns.push({
      protocol: "https",
      hostname,
      pathname: "/storage/v1/object/**",
    });
  } catch (error) {
    console.warn("Invalid NEXT_PUBLIC_SUPABASE_URL for Next/Image remote patterns", error);
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns,
  },
};

export default nextConfig;
