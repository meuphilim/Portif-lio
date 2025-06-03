'use client';

import { useEffect, useState } from 'react';
import type { Repository, PortfolioData } from '@/types/portfolio';

// Dados de fallback para quando a API não estiver disponível
const FALLBACK_REPOS: Repository[] = [
  {
    id: 1,
    name: 'portfolio-generator',
    description: 'Gerador automático de portfólio GitHub com deploy automático',
    html_url: 'https://github.com/meuphilim/portfolio-generator',
    homepage: null,
    language: 'TypeScript',
    topics: ['portfolio', 'github', 'automation', 'nextjs'],
    updated_at: new Date().toISOString(),
    stargazers_count: 0,
    forks_count: 0,
    owner: {
      login: 'meuphilim',
    },
  },
  {
    id: 2,
    name: 'octomind',
    description: 'Sistema inteligente de automação para portfólios GitHub',
    html_url: 'https://github.com/meuphilim/octomind',
    homepage: null,
    language: 'JavaScript',
    topics: ['automation', 'github-actions', 'portfolio'],
    updated_at: new Date().toISOString(),
    stargazers_count: 0,
    forks_count: 0,
    owner: {
      login: 'meuphilim',
    },
  },
];

export function usePortfolioData(): PortfolioData {
  const [repos, setRepos] = useState<Repository[]>(FALLBACK_REPOS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<string | null>('fallback');
  const [diagnosticInfo, setDiagnosticInfo] = useState<string | null>('Usando dados de exemplo');

  const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'meuphilim';

  useEffect(() => {
    async function fetchRepos() {
      try {
        console.log('🔍 Tentando buscar repositórios...');
        setDiagnosticInfo('Tentando conectar à API do GitHub...');

        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
          {
            headers: {
              'User-Agent': `${GITHUB_USERNAME}-portfolio`,
              Accept: 'application/vnd.github.v3+json',
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          const filteredRepos = data.filter(
            (repo: any) =>
              !repo.fork &&
              !repo.archived &&
              !repo.private &&
              repo.name &&
              !repo.name.startsWith('.'),
          );

          setRepos(filteredRepos);
          setAuthStatus('public');
          setDiagnosticInfo(
            `✅ Conectado à API do GitHub - ${filteredRepos.length} repositórios encontrados`,
          );
        } else {
          throw new Error(`API GitHub retornou: ${response.status}`);
        }
      } catch (err) {
        console.warn('⚠️ Não foi possível conectar à API do GitHub, usando dados de exemplo');
        setError(null);
        setAuthStatus('fallback');
        setDiagnosticInfo('⚠️ Usando dados de exemplo (não foi possível conectar à API do GitHub)');
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, [GITHUB_USERNAME]);

  return {
    repos,
    loading,
    error,
    authStatus,
    diagnosticInfo,
  };
}
