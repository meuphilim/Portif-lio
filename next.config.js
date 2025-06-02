/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para export estático
  output: "export",

  // Desabilitar otimizações que podem causar problemas no export
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  // Configurações de imagem para export estático
  images: {
    unoptimized: true,
    loader: "custom",
    loaderFile: "./lib/imageLoader.js",
  },

  // Configurações de build
  distDir: ".next",

  // Configurações de TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configurações de ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ]
  },

  // Configurações experimentais removidas para evitar conflitos
  experimental: {
    // Removido para compatibilidade com export estático
  },

  // Configurações de webpack
  webpack: (config, { isServer }) => {
    // Configurações específicas para o build
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    return config
  },
}

module.exports = nextConfig
