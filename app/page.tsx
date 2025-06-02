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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold text-gray-800">{GITHUB_USERNAME}</div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
                Sobre
              </a>
              <a href="#experience" className="text-gray-600 hover:text-blue-600 transition-colors">
                Experiência
              </a>
              <a href="#projects" className="text-gray-600 hover:text-blue-600 transition-colors">
                Projetos
              </a>
              <a href="#skills" className="text-gray-600 hover:text-blue-600 transition-colors">
                Habilidades
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Olá, eu sou <span className="text-yellow-300">{GITHUB_USERNAME}</span>!
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100">
                Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e experiências digitais excepcionais.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                >
                  Ver Projetos
                </a>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
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
                  className="w-64 h-64 lg:w-80 lg:h-80 rounded-full border-8 border-white shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-green-400 w-16 h-16 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👋</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Status da API */}
      {authStatus && (
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-2">
            <div
              className={`text-sm rounded-md p-2 ${
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
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{repos.length}</div>
              <div className="text-gray-600">Repositórios Públicos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {new Set(repos.map((repo) => repo.language).filter(Boolean)).size}
              </div>
              <div className="text-gray-600">Linguagens</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">
                {repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)}
              </div>
              <div className="text-gray-600">Total de Stars</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {repos.reduce((acc, repo) => acc + repo.forks_count, 0)}
              </div>
              <div className="text-gray-600">Total de Forks</div>
            </div>
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
