import type { Repository } from "@/types/portfolio"
import { getLanguageEmoji } from "@/utils/portfolio"

interface ProjectsSectionProps {
  repos: Repository[]
  username: string
}

export default function ProjectsSection({ repos, username }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">🚀 Meus Projetos</h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Explore alguns dos meus trabalhos e contribuições de código aberto
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
                  {repo.description || "Sem descrição disponível."}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getLanguageEmoji(repo.language)}</span>
                    <span className="text-sm text-gray-600">{repo.language || "N/A"}</span>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(repo.updated_at).toLocaleDateString("pt-BR")}</span>
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
              href={`https://github.com/${username}?tab=repositories`}
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
  )
}
