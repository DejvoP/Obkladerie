import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "gdkmulppckcfjacytwev.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/produkty/venkovni",
        destination: "/produkty/betonove-sterky",
        permanent: true,
      },
      {
        source: "/produkty/doplnky",
        destination: "/produkty/epoxidove-sterky",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
