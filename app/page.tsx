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

export default function Portfolio() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [authStatus, setAuthStatus] = useState<string | null>(null)
  const [diagnosticInfo, setDiagnosticInfo] = useState<string | null>(null)

  const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "meuphilim"

  useEffect(() => {
    async function fetchRepos() {
      try {
        console.log("🔍 Buscando repositórios...")
        setDiagnosticInfo("Iniciando requisição à API...")

        const timestamp = new Date().getTime()
        const response = await fetch(`/api/github-repos?_=${timestamp}`)
        setDiagnosticInfo(`Status da resposta: ${response.status} ${response.statusText}`)

        if (!response.ok) {
          const errorText = await response.text()
          console.error(`❌ API error: ${response.status} ${response.statusText}`)
          console.error(`Response body: ${errorText}`)
          setDiagnosticInfo(`Erro na API: ${response.status} ${response.statusText}\n${errorText}`)
          throw new Error(`Erro na API: ${response.status} ${response.statusText}`)
        }

        const data: ApiResponse = await response.json()
        console.log("📊 Resposta da API:", data)
        setDiagnosticInfo(`Dados recebidos: ${data.count} repositórios, autenticação: ${data.auth || "desconhecida"}`)

        if (data.success) {
          setRepos(data.repos)
          setAuthStatus(data.auth || "unknown")

          if (data.message) {
            setDiagnosticInfo(data.message)
          }
        } else {
          setError(data.error || "Erro ao carregar repositórios")
          setDiagnosticInfo(`Erro reportado pela API: ${data.error}`)
        }
      } catch (err) {
        console.error("❌ Erro:", err)
        setError(err instanceof Error ? err.message : "Erro de conexão")
        setDiagnosticInfo(`Exceção capturada: ${err instanceof Error ? err.message : "Erro desconhecido"}`)
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
          {diagnosticInfo && <p className="mt-2 text-xs text-gray-500 max-w-md mx-auto">{diagnosticInfo}</p>}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Erro ao carregar</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          {diagnosticInfo && (
            <div className="mb-4 p-3 bg-gray-100 rounded text-left">
              <p className="text-xs text-gray-500 font-mono whitespace-pre-wrap">{diagnosticInfo}</p>
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">{GITHUB_USERNAME}</h1>
          <nav className="space-x-6 hidden md:flex">
            <a href="#about" className="hover:text-blue-200 transition">
              Sobre
            </a>
            <a href="#projects" className="hover:text-blue-200 transition">
              Projetos
            </a>
            <a href="#skills" className="hover:text-blue-200 transition">
              Habilidades
            </a>
            <a href="#contact" className="hover:text-blue-200 transition">
              Contato
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="about"
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 overflow-hidden"
      >
        {/* Sutil gradiente de luz */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 w-[60vw] h-[60vw] bg-indigo-600 opacity-10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
        </div>

        {/* Gráfico de fundo animado */}
        <div className="absolute inset-0 bg-[radial-gradient(#2d2d2d_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Prazer, sou <span className="text-indigo-400">{GITHUB_USERNAME}</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-10 text-gray-300 max-w-xl">
                Desenvolvedor Full Stack com foco em performance, acessibilidade e soluções digitais que realmente fazem
                a diferença.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
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
                  alt={`${GITHUB_USERNAME} avatar`}
                  className="w-64 h-64 lg:w-80 lg:h-80 rounded-full border-4 border-gray-700 shadow-xl"
                />
                {/* Ícone de terminal no canto inferior */}
                <div className="absolute -bottom-4 -right-4 bg-gray-800 border border-indigo-500 w-14 h-14 rounded-full flex items-center justify-center shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OctoMind Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🚀 OctoMind: Portfólio GitHub Dinâmico</h2>
            <p className="text-lg text-gray-600 mb-6">
              Este portfólio é atualizado automaticamente com meus repositórios mais recentes, graças à magia do GitHub
              Actions!
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <a
                href="https://github.com/meuphilim/OctoMind/actions/workflows/update.yml"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.shields.io/github/actions/workflow/status/meuphilim/OctoMind/update.yml?branch=main&label=Atualização%20Automática&style=for-the-badge"
                  alt="Status da Atualização"
                  className="h-7"
                />
              </a>
              <img
                src={`https://img.shields.io/badge/Repositórios-${repos.length}-blue?style=for-the-badge`}
                alt="Repositórios"
                className="h-7"
              />
              <img
                src={`https://img.shields.io/badge/Linguagens-${new Set(repos.map((repo) => repo.language).filter(Boolean)).size}-orange?style=for-the-badge`}
                alt="Linguagens"
                className="h-7"
              />
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
                <img
                  src={`https://img.shields.io/badge/GitHub-${GITHUB_USERNAME}-lightgrey?style=for-the-badge&logo=github`}
                  alt="GitHub Profile"
                  className="h-7"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Status dos Repositórios */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Status dos Repositórios</h2>
            <p className="text-lg text-gray-600 mb-6">Explore alguns dos meus trabalhos e contribuições.</p>
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
                src={`https://img.shields.io/badge/Total_de_Stars-${repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)}-yellow?style=for-the-badge`}
                alt="Total de Stars"
                className="h-7"
              />
              <img
                src={`https://img.shields.io/badge/Total_de_Forks-${repos.reduce((acc, repo) => acc + repo.forks_count, 0)}-green?style=for-the-badge`}
                alt="Total de Forks"
                className="h-7"
              />
            </div>
            {authStatus && (
              <div
                className={`inline-block text-sm rounded-md px-4 py-2 ${
                  authStatus === "token"
                    ? "bg-green-100 text-green-800"
                    : authStatus === "fallback"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {authStatus === "token"
                  ? "✅ Usando API autenticada do GitHub"
                  : authStatus === "fallback"
                    ? "⚠️ Usando dados de exemplo (não foi possível conectar à API do GitHub)"
                    : "⚠️ Usando API pública do GitHub (limite de requisições reduzido)"}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Experiência</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Experience Item 1 */}
              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-600">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Desenvolvedor Full Stack</h3>
                  <span className="text-gray-500 text-sm">2023 - Presente</span>
                </div>
                <p className="text-gray-600 mb-3">Empresa XYZ</p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Desenvolvimento de aplicações web usando React, Node.js e TypeScript</li>
                  <li>• Implementação de APIs RESTful e integração com bancos de dados</li>
                  <li>• Colaboração em equipes ágeis usando metodologias Scrum</li>
                </ul>
              </div>

              {/* Experience Item 2 */}
              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-600">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Desenvolvedor Frontend</h3>
                  <span className="text-gray-500 text-sm">2022 - 2023</span>
                </div>
                <p className="text-gray-600 mb-3">Startup ABC</p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Criação de interfaces responsivas e acessíveis</li>
                  <li>• Otimização de performance e SEO</li>
                  <li>• Implementação de testes automatizados</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">🚀 Meus Projetos</h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Explore alguns dos meus trabalhos e contribuições de código aberto
          </p>

          {repos.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum projeto encontrado</h3>
              <p className="text-gray-500">Os projetos aparecerão aqui assim que forem detectados.</p>
              {diagnosticInfo && <p className="text-xs text-gray-400 mt-4 max-w-md mx-auto">{diagnosticInfo}</p>}
            </div>
          ) : (
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
                </div>
              ))}
            </div>
          )}

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

      {/* Linguagens Mais Utilizadas Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">📈 Linguagens Mais Utilizadas</h3>
            <p className="text-lg text-gray-600">Um panorama das principais tecnologias usadas em meus projetos.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {(() => {
              // Calcular estatísticas de linguagens
              const languageStats = repos.reduce(
                (acc, repo) => {
                  const lang = repo.language || "Outros"
                  acc[lang] = (acc[lang] || 0) + 1
                  return acc
                },
                {} as Record<string, number>,
              )

              const totalRepos = repos.length
              const sortedLanguages = Object.entries(languageStats)
                .sort(([, countA], [, countB]) => countB - countA)
                .slice(0, 8) // Mostrar apenas as 8 principais

              // Cores para os badges das linguagens
              const languageColors: Record<string, string> = {
                TypeScript: "3178C6",
                JavaScript: "F7DF1E",
                Python: "3776AB",
                Java: "ED8B00",
                "C++": "00599C",
                C: "A8B9CC",
                "C#": "239120",
                PHP: "777BB4",
                Ruby: "CC342D",
                Go: "00ADD8",
                Rust: "000000",
                Swift: "FA7343",
                Kotlin: "0095D5",
                Dart: "0175C2",
                HTML: "E34F26",
                CSS: "1572B6",
                Shell: "89E051",
                Vue: "4FC08D",
                React: "61DAFB",
                Angular: "DD0031",
                Outros: "6C757D",
              }

              // Logos para os badges
              const languageLogos: Record<string, string> = {
                TypeScript: "typescript",
                JavaScript: "javascript",
                Python: "python",
                Java: "java",
                "C++": "cplusplus",
                C: "c",
                "C#": "csharp",
                PHP: "php",
                Ruby: "ruby",
                Go: "go",
                Rust: "rust",
                Swift: "swift",
                Kotlin: "kotlin",
                Dart: "dart",
                HTML: "html5",
                CSS: "css3",
                Shell: "gnubash",
                Vue: "vuedotjs",
                React: "react",
                Angular: "angular",
              }

              return sortedLanguages.map(([language, count]) => {
                const percentage = totalRepos > 0 ? Math.round((count / totalRepos) * 100) : 0
                const color = languageColors[language] || languageColors.Outros
                const logo = languageLogos[language] ? `&logo=${languageLogos[language]}` : ""
                const textColor = ["F7DF1E", "89E051"].includes(color) ? "&logoColor=black" : ""

                const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(language)}-${count}_projeto${count !== 1 ? "s" : ""}_(${percentage}%25)-${color}?style=for-the-badge${logo}${textColor}`

                return (
                  <img
                    key={language}
                    src={badgeUrl || "/placeholder.svg"}
                    alt={`${language} - ${count} projeto${count !== 1 ? "s" : ""} (${percentage}%)`}
                    className="h-8 transition-transform hover:scale-105"
                    title={`${language}: ${count} projeto${count !== 1 ? "s" : ""} (${percentage}%)`}
                  />
                )
              })
            })()}
          </div>

          {repos.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                As estatísticas de linguagens aparecerão aqui quando os repositórios forem carregados.
              </p>
            </div>
          )}

          {/* Gráfico de barras visual */}
          {repos.length > 0 && (
            <div className="mt-12 max-w-4xl mx-auto">
              <h4 className="text-xl font-semibold text-gray-800 mb-6 text-center">Distribuição Visual</h4>
              <div className="bg-white rounded-lg p-6 shadow-md">
                {(() => {
                  const languageStats = repos.reduce(
                    (acc, repo) => {
                      const lang = repo.language || "Outros"
                      acc[lang] = (acc[lang] || 0) + 1
                      return acc
                    },
                    {} as Record<string, number>,
                  )

                  const totalRepos = repos.length
                  const sortedLanguages = Object.entries(languageStats)
                    .sort(([, countA], [, countB]) => countB - countA)
                    .slice(0, 6) // Top 6 para o gráfico

                  const languageColors: Record<string, string> = {
                    TypeScript: "59, 130, 246", // blue-500
                    JavaScript: "245, 158, 11", // amber-500
                    Python: "34, 197, 94", // green-500
                    Java: "239, 68, 68", // red-500
                    HTML: "249, 115, 22", // orange-500
                    CSS: "168, 85, 247", // purple-500
                    Shell: "132, 204, 22", // lime-500
                    Go: "6, 182, 212", // cyan-500
                    Rust: "115, 115, 115", // gray-500
                    Outros: "156, 163, 175", // gray-400
                  }

                  return (
                    <div className="space-y-4">
                      {sortedLanguages.map(([language, count]) => {
                        const percentage = (count / totalRepos) * 100
                        const color = languageColors[language] || languageColors.Outros

                        return (
                          <div key={language} className="flex items-center">
                            <div className="w-20 text-sm font-medium text-gray-700 text-right mr-4">{language}</div>
                            <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-1000 ease-out"
                                style={{
                                  width: `${percentage}%`,
                                  backgroundColor: `rgb(${color})`,
                                }}
                              />
                            </div>
                            <div className="w-16 text-sm text-gray-600 text-left ml-4">
                              {count} ({Math.round(percentage)}%)
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">🛠️ Habilidades Técnicas</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Frontend */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">🎨</span>
                Frontend
              </h3>
              <div className="space-y-2">
                {["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"].map((skill) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-gray-700">{skill}</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">⚙️</span>
                Backend
              </h3>
              <div className="space-y-2">
                {["Node.js", "Python", "Express.js", "PostgreSQL", "MongoDB", "REST APIs"].map((skill) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-gray-700">{skill}</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">🔧</span>
                Ferramentas
              </h3>
              <div className="space-y-2">
                {["Git", "Docker", "AWS", "Vercel", "GitHub Actions", "VS Code"].map((skill) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-gray-700">{skill}</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OctoMind Section */}
      <section id="octomind" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-6">
              <img
                src="/images/octomind.png"
                alt="OctoMind - Polvo inteligente representando automação GitHub"
                className="w-16 h-16 mr-4"
              />
              <h2 className="text-4xl font-bold text-gray-800">Projeto OctoMind</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sistema inteligente de automação que mantém este portfólio sempre atualizado com os repositórios mais recentes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Card: Como Funciona */}
            <div className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600 flex items-center">
                <span className="text-2xl mr-2">⚙️</span>
                Como Funciona
              </h3>
              <p className="mb-4 text-gray-600">
                Este portfólio <strong>OctoMind</strong> é automatizado através de:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>
                  <strong>Script Node.js</strong>: Coleta dados dos repositórios via API do GitHub
                </li>
                <li>
                  <strong>GitHub Actions</strong>: Executa o script automaticamente a cada 12 horas
                </li>
                <li>
                  <strong>Vercel & GitHub Pages</strong>: Deploy automático em múltiplas plataformas
                </li>
                <li>
                  <strong>Cache Inteligente</strong>: Otimiza requisições e melhora performance
                </li>
              </ol>
            </div>

            {/* Card: Tecnologias */}
            <div className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600 flex items-center">
                <span className="text-2xl mr-2">🛠️</span>
                Tecnologias
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-700">Node.js</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-700">GitHub Actions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-gray-700">GitHub Pages</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-gray-700">GitHub API</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  <span className="text-gray-700">Vercel</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span className="text-gray-700">Next.js</span>
                </div>
              </div>
            </div>

            {/* Card: Benefícios */}
            <div className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600 flex items-center">
                <span className="text-2xl mr-2">✨</span>
                Benefícios
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Atualização automática sem intervenção manual
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Estatísticas sempre precisas e atualizadas
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Deploy em múltiplas plataformas simultaneamente
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Fallback inteligente em caso de falhas
                </li>
              </ul>
            </div>

            {/* Card: Monitoramento */}
            <div className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600 flex items-center">
                <span className="text-2xl mr-2">📊</span>
                Monitoramento
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Status da API</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {authStatus === "token" ? "Autenticada" : "Pública"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Repositórios</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {repos.length} ativos
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Última atualização</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                    {new Date().toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Interessado no OctoMind?</h3>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Este sistema pode ser adaptado para automatizar seu próprio portfólio. 
                Confira o código-fonte e documentação completa no GitHub.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://github.com/meuphilim/OctoMind"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Ver Código-Fonte
                </a>
                <a
                  href="https://github.com/meuphilim/OctoMind/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Documentação
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">📬 Vamos Conversar</h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Entre em Contato</h3>
                <p className="text-gray-600 mb-6">
                  Estou sempre interessado em novas oportunidades e projetos interessantes. Vamos conversar sobre como
                  posso ajudar!
                </p>

                <div className="space-y-4">
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <span className="text-2xl">📂</span>
                    <span>github.com/{GITHUB_USERNAME}</span>
                  </a>

                  <a
                    href={`mailto:contato@${GITHUB_USERNAME}.dev`}
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <span className="text-2xl">📧</span>
                    <span>contato@{GITHUB_USERNAME}.dev</span>
                  </a>

                  <a
                    href={`https://linkedin.com/in/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <span className="text-2xl">💼</span>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Envie uma Mensagem</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Sua mensagem..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">{GITHUB_USERNAME}</h3>
              <p className="text-gray-400">Desenvolvedor Full Stack apaixonado por criar soluções inovadoras.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-white transition-colors">
                    Projetos
                  </a>
                </li>
                <li>
                  <a href="#skills" className="hover:text-white transition-colors">
                    Habilidades
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href={`https://linkedin.com/in/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} {GITHUB_USERNAME}. Feito com ❤️ e automação.
            </p>
            <p className="text-sm mt-2">Atualizado automaticamente via GitHub Actions</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
