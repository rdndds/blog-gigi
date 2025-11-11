/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  // Disable Turbopack for build to use webpack
  experimental: {
    turbo: false,
  },
}

module.exports = nextConfig
