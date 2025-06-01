"use client"

import { useEffect, useState } from "react"

interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  topics: string[]
  updated_at: string
  homepage: string | null
}

export default function PortfolioPage() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch("/api/github-repos")
        if (!response.ok) {
          throw new Error("Falha ao buscar repositórios")
        }
        const data = await response.json()
        setRepos(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Carregando portfólio...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Erro ao carregar portfólio</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <img
              src={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || "octocat"}.png?size=200`}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white"
            />
            <h1 className="text-4xl font-bold mb-2">Meu Portfólio</h1>
            <p className="text-xl opacity-90">Desenvolvedor apaixonado por criar soluções inovadoras</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🚀 Meus Projetos Recentes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <div key={repo.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">{repo.name}</h3>

                <p className="text-gray-600 mb-4 line-clamp-3">{repo.description || "Sem descrição disponível."}</p>

                <div className="mb-4">
                  {repo.language && (
                    <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2">
                      {repo.language}
                    </span>
                  )}
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-1 mb-1"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    Ver Código
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm"
                    >
                      Demo
                    </a>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Atualizado em: {new Date(repo.updated_at).toLocaleDateString("pt-BR")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="text-center">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">📈 Estatísticas</h3>
          <div className="flex justify-center gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-blue-600">{repos.length}</div>
              <div className="text-gray-600">Projetos</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-green-600">
                {new Set(repos.map((r) => r.language).filter(Boolean)).size}
              </div>
              <div className="text-gray-600">Linguagens</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Meu Portfólio. Feito com ❤️ e Next.js</p>
        </div>
      </footer>
    </div>
  )
}
