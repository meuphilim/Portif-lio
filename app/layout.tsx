import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Portfólio de Desenvolvedor | meuphilim',
  description: 'Explore o portfólio profissional de meuphilim, com projetos reais integrados diretamente do GitHub.',
  generator: 'Next.js',
  keywords: ['portfólio', 'desenvolvedor web', 'GitHub', 'projetos open source', 'JavaScript', 'React'],
  authors: [{ name: 'meuphilim', url: 'https://github.com/meuphilim' }],
  creator: 'meuphilim',
  publisher: 'meuphilim',
  metadataBase: new URL('https://meuphilim.github.io'),
  alternates: {
    canonical: 'https://meuphilim.github.io/',
  },
  openGraph: {
    title: 'Portfólio de Desenvolvedor | meuphilim',
    description: 'Veja os projetos e habilidades do desenvolvedor meuphilim. Portfólio alimentado automaticamente via GitHub.',
    url: 'https://meuphilim.github.io',
    siteName: 'Portfólio | meuphilim',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://meuphilim.github.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Imagem de capa do portfólio de meuphilim',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfólio de Desenvolvedor | meuphilim',
    description: 'Explore o portfólio profissional de meuphilim com projetos diretamente do GitHub.',
    images: ['https://meuphilim.github.io/og-image.png'],
    creator: '@meuphilim',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0f172a" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
