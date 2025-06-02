import type { Metadata } from "next"
import "./globals.css"
import type { ReactNode } from "react"

const basePath = process.env.NODE_ENV === "production" ? "/Portifolio" : ""

export const metadata: Metadata = {
  title: "Portfólio de Desenvolvedor | meuphilim",
  description: "Explore o portfólio profissional de meuphilim, com projetos reais integrados diretamente do GitHub.",
  generator: "Next.js",
  keywords: ["portfólio", "desenvolvedor web", "GitHub", "projetos open source", "JavaScript", "React"],
  authors: [{ name: "meuphilim", url: "https://github.com/meuphilim" }],
  creator: "meuphilim",
  publisher: "meuphilim",
  metadataBase: new URL("https://meuphilim.github.io/Portifolio"),
  alternates: {
    canonical: "https://meuphilim.github.io/Portifolio/",
  },
  openGraph: {
    title: "Portfólio de Desenvolvedor | meuphilim",
    description:
      "Veja os projetos e habilidades do desenvolvedor meuphilim. Portfólio alimentado automaticamente via GitHub.",
    url: "https://meuphilim.github.io/Portifolio",
    siteName: "Portfólio | meuphilim",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: `${basePath}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Imagem de capa do portfólio de meuphilim",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfólio de Desenvolvedor | meuphilim",
    description: "Explore o portfólio profissional de meuphilim com projetos diretamente do GitHub.",
    images: [`${basePath}/og-image.png`],
    creator: "@meuphilim",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
        <link rel="icon" href={`${basePath}/icon.svg`} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={`${basePath}/apple-touch-icon.png`} />
        <link rel="manifest" href={`${basePath}/site.webmanifest`} />
        <meta name="theme-color" content="#0f172a" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
