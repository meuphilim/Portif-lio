/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: "out",
  
  // Configuração de imagens para export estático
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },

  // Variáveis de ambiente
  env: {
    GITHUB_USERNAME: process.env.GITHUB_USERNAME || "meuphilim",
    NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "meuphilim",
  },

  // Opções do compilador
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    styledComponents: true,
  },

  // Configurações de build
  eslint: {
    ignoreDuringBuilds: false, 
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  // Recursos experimentais
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
    webpackBuildWorker: true,
  },

  // Webpack customizado (opcional)
  webpack: (config) => {
    // Adicione plugins ou regras adicionais se necessário
    return config;
  }
}

module.exports = nextConfig