/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export production builds; let development return normal 404s for unknown slugs.
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
