import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['media.graphassets.com', 'eu-west-2.graphassets.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
    ],
  },
};

export default nextConfig;
