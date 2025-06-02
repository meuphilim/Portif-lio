"use client"

import { useEffect, useState } from "react"

interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics: string[]
  updated_at: string
  stargazers_count: number
  forks_count: number
}

interface ApiResponse {
  success: boolean
  count: number
  repos: Repository[]
  error?: string
  message?: string
  auth?: string
}

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "meuphilim"

export default function Portfolio() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [authStatus, setAuthStatus] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true)

        // Tentar buscar da nossa rota de API primeiro
        const response = await fetch("/api/github-repos")

        if (response.ok) {
          const data: ApiResponse = await response.json()
          setRepos(data.repos)
          setAuthStatus(data.auth || "desconhecido")
          setError(null)
        } else {
          throw new Error(`API respondeu com status: ${response.status}`)
        }
      } catch (err) {
        console.error("Falha ao buscar repositórios:", err)
        setError(err instanceof Error ? err.message : "Erro desconhecido")

        // Fallback para chamada direta da API do GitHub
        try {
          const fallbackResponse = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
          )

          if (fallbackResponse.ok) {
            const fallbackRepos = await fallbackResponse.json()
            const filteredRepos = fallbackRepos.filter((repo: any) => !repo.fork && !repo.archived && !repo.private)
            setRepos(filteredRepos)
            setAuthStatus("publico-fallback")
            setError(null)
          }
        } catch (fallbackErr) {
          console.error("Fallback também falhou:", fallbackErr)
          setError("Não foi possível buscar os repositórios")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  const getLanguageEmoji = (language: string | null): string => {
    const emojis: Record<string, string> = {
      JavaScript: "🟨",
      TypeScript: "🔷",
      Python: "🐍",
      Java: "☕",
      "C++": "⚡",
      C: "🔧",
      "C#": "💜",
      PHP: "🐘",
      Ruby: "💎",
      Go: "🐹",
      Rust: "🦀",
      Swift: "🍎",
      Kotlin: "🎯",
      Dart: "🎯",
      HTML: "🌐",
      CSS: "🎨",
      Shell: "🐚",
      Vue: "💚",
      React: "⚛️",
      Angular: "🅰️",
    }
    return emojis[language || ""] || "📄"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando portfólio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Cabeçalho */}
      <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">{GITHUB_USERNAME}</h1>
          <nav className="space-x-6 hidden md:flex">
            <a href="#sobre" className="hover:text-blue-200 transition">
              Sobre
            </a>
            <a href="#projetos" className="hover:text-blue-200 transition">
              Projetos
            </a>
            <a href="#contato" className="hover:text-blue-200 transition">
              Contato
            </a>
          </nav>
        </div>
      </header>

      {/* Seção Hero */}
      <section
        id="sobre"
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Olá, eu sou <span className="text-indigo-400">{GITHUB_USERNAME}</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-10 text-gray-300 max-w-xl">
                Desenvolvedor Full Stack focado em performance, acessibilidade e soluções digitais que fazem a
                diferença.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#projetos"
                  className="bg-indigo-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-400 transition-colors shadow-md"
                >
                  Ver Projetos
                </a>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-gray-300 text-gray-100 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 hover:text-gray-900 transition-colors shadow-md"
                >
                  GitHub
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <img
                  src={`https://github.com/${GITHUB_USERNAME}.png?size=300`}
                  alt={`Avatar de ${GITHUB_USERNAME}`}
                  className="w-64 h-64 lg:w-80 lg:h-80 rounded-full border-4 border-gray-700 shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Status */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Status dos Repositórios</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <img
              src={`https://img.shields.io/badge/Total_de_Projetos-${repos.length}-blue?style=for-the-badge`}
              alt="Total de Projetos"
              className="h-7"
            />
            <img
              src={`https://img.shields.io/badge/Linguagens-${new Set(repos.map((repo) => repo.language).filter(Boolean)).size}-orange?style=for-the-badge`}
              alt="Linguagens"
              className="h-7"
            />
            <img
              src={`https://img.shields.io/badge/Total_de_Estrelas-${repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)}-yellow?style=for-the-badge`}
              alt="Total de Estrelas"
              className="h-7"
            />
          </div>
          {authStatus && (
            <div
              className={`inline-block text-sm rounded-md px-4 py-2 ${
                authStatus === "token"
                  ? "bg-green-100 text-green-800"
                  : authStatus === "fallback"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
              }`}
            >
              {authStatus === "token"
                ? "✅ Usando API autenticada do GitHub"
                : authStatus === "fallback"
                  ? "⚠️ Usando dados de fallback"
                  : "✅ Conectado à API pública do GitHub"}
            </div>
          )}
          {error && <div className="mt-2 text-xs text-red-600 max-w-md mx-auto">{error}</div>}
        </div>
      </section>

      {/* Seção de Projetos */}
      <section id="projetos" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">🚀 Meus Projetos</h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Explore alguns dos meus trabalhos e contribuições open source
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.slice(0, 6).map((repo) => (
              <div
                key={repo.id}
                className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 truncate">{repo.name}</h3>
                    <div className="flex space-x-2 text-sm text-gray-500">
                      <span className="flex items-center">⭐ {repo.stargazers_count}</span>
                      <span className="flex items-center">🍴 {repo.forks_count}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {repo.description || "Nenhuma descrição disponível."}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getLanguageEmoji(repo.language)}</span>
                      <span className="text-sm text-gray-600">{repo.language || "N/A"}</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(repo.updated_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span key={topic} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{repo.topics.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Ver Código
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-600 text-white text-center py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {repos.length > 6 && (
            <div className="text-center mt-12">
              <a
                href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Ver Todos os Projetos
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Seção de Contato */}
      <section id="contato" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">📬 Entre em Contato</h2>
          <p className="text-xl text-gray-600 mb-8">
            Estou sempre interessado em novas oportunidades e projetos interessantes.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:contato@${GITHUB_USERNAME}.dev`}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              E-mail
            </a>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} {GITHUB_USERNAME}. Feito com ❤️ e automação.
          </p>
          <p className="text-sm mt-2 text-gray-400">
            Atualizado automaticamente via GitHub Actions • Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
      </footer>
    </div>
  )
}
