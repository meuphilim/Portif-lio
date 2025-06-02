/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para export estático (GitHub Pages)
  output: "export",

  // Configurações específicas para GitHub Pages
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  // Base path para GitHub Pages (se necessário)
  basePath: process.env.NODE_ENV === "production" ? "/Portifolio" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/Portifolio/" : "",

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

  // Headers de segurança (não aplicáveis no GitHub Pages, mas mantidos para referência)
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

  // Configurações de webpack
  webpack: (config, { isServer }) => {
    // Configurações específicas para o build estático
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

  // Configurações experimentais removidas para compatibilidade
  experimental: {},
}

module.exports = nextConfig
