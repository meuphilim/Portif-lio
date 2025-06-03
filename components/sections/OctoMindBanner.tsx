import type { Repository } from '@/types/portfolio';

interface OctoMindBannerProps {
  repos: Repository[];
  username: string;
}

export default function OctoMindBanner({ repos, username }: OctoMindBannerProps) {
  return (
    <section className="py-12 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🚀 OctoMind: Portfólio GitHub Dinâmico
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Este portfólio é atualizado automaticamente com meus repositórios mais recentes, graças
            à magia do GitHub Actions!
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href={`https://github.com/${username}/OctoMind/actions/workflows/update.yml`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`https://img.shields.io/github/actions/workflow/status/${username}/OctoMind/update.yml?branch=main&label=Atualização%20Automática&style=for-the-badge`}
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
            <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
              <img
                src={`https://img.shields.io/badge/GitHub-${username}-lightgrey?style=for-the-badge&logo=github`}
                alt="GitHub Profile"
                className="h-7"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
