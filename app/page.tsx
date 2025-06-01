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
}

export default function Portfolio() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "meuphilim"

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch("/api/github-repos")
        const data: ApiResponse = await response.json()

        if (data.success) {
          setRepos(data.repos)
        } else {
          setError(data.error || "Erro ao carregar repositórios")
        }
      } catch (err) {
        setError("Erro de conexão")
        console.error("Erro:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  const getLanguageEmoji = (language: string | null) => {
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Erro ao carregar</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6">
            <img
              src={`https://github.com/${GITHUB_USERNAME}.png?size=120`}
              alt={`${GITHUB_USERNAME} avatar`}
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div>
              <h1 className="text-3xl font-bold">Olá, eu sou {GITHUB_USERNAME}!</h1>
              <p className="text-blue-100 mt-2">Desenvolvedor apaixonado por criar soluções inovadoras</p>
              <div className="flex space-x-4 mt-3">
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  📂 GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="text-3xl font-bold text-blue-600">{repos.length}</div>
            <div className="text-gray-600">Repositórios Públicos</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="text-3xl font-bold text-green-600">
              {new Set(repos.map((repo) => repo.language).filter(Boolean)).size}
            </div>
            <div className="text-gray-600">Linguagens</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="text-3xl font-bold text-yellow-600">
              {repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)}
            </div>
            <div className="text-gray-600">Total de Stars</div>
          </div>
        </div>

        {/* Projects */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🚀 Meus Projetos</h2>

          {repos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum projeto encontrado</h3>
              <p className="text-gray-500">Os projetos aparecerão aqui assim que forem detectados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo) => (
                <div
                  key={repo.id}
                  className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{repo.name}</h3>
                    <div className="flex space-x-2 text-sm text-gray-500">
                      <span>⭐ {repo.stargazers_count}</span>
                      <span>🍴 {repo.forks_count}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {repo.description || "Sem descrição disponível."}
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
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} {GITHUB_USERNAME}. Feito com ❤️ e automação.
          </p>
          <p className="text-gray-400 text-sm mt-2">Atualizado automaticamente via GitHub Actions</p>
        </div>
      </footer>
    </div>
  )
}
