import type { Repository } from "@/types/portfolio"

interface RepositoryStatusProps {
  repos: Repository[]
  authStatus: string | null
  diagnosticInfo: string | null
}

export default function RepositoryStatus({ repos, authStatus, diagnosticInfo }: RepositoryStatusProps) {
  return (
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
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
              }`}
            >
              {authStatus === "token"
                ? "✅ Usando API autenticada do GitHub"
                : authStatus === "fallback"
                  ? "⚠️ Usando dados de exemplo (modo demonstração)"
                  : "✅ Conectado à API pública do GitHub"}
            </div>
          )}
          
        </div>
      </div>
    </section>
  )
}
