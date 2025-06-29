import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // 👇 Add this section to allow cross-origin in dev
  allowedDevOrigins: [
    'http://localhost:5173',
    'https://5173-firebase-studio-1751109979693.cluster-ikxjzjhlifcwuroomfkjrx437g.cloudworkstations.dev',
  ],
};

export default nextConfig;
