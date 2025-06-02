/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: "out",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    GITHUB_USERNAME: process.env.GITHUB_USERNAME || "meuphilim",
    NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "meuphilim",
  },
  // Remover rewrites para export estático
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

module.exports = nextConfig
