/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ["github.com"],
  },
  env: {
    NEXT_PUBLIC_GITHUB_USERNAME: process.env.GITHUB_USERNAME,
  },
}

module.exports = nextConfig
