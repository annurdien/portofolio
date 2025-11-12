/** @type {import('next').NextConfig} */
const nextConfig = (() => {
  const remotePatterns = [];
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (supabaseUrl) {
    try {
      const { hostname } = new URL(supabaseUrl);
      remotePatterns.push({
        protocol: "https",
        hostname,
        pathname: "/storage/v1/object/**",
      });
    } catch (error) {
      console.warn(
        "Invalid NEXT_PUBLIC_SUPABASE_URL for Next/Image remote patterns",
        error,
      );
    }
  }

  return {
    reactStrictMode: true,
    images: {
      remotePatterns,
    },
  };
})();

export default nextConfig;
