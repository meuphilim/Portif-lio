import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidar a cada hora

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  private: boolean;
}

interface ApiResponse {
  success: boolean;
  count: number;
  repos: Repository[];
  auth: 'token' | 'publico' | 'fallback';
  error?: string;
  message?: string;
}

// Dados de fallback para quando a API não estiver disponível
const FALLBACK_REPOS: Repository[] = [
  {
    id: 1,
    name: 'gerador-portfolio',
    description: 'Gerador automatizado de portfólio GitHub com deploy CI/CD',
    html_url: 'https://github.com/meuphilim/gerador-portfolio',
    homepage: null,
    language: 'TypeScript',
    topics: ['portfolio', 'github', 'automacao', 'nextjs', 'vercel'],
    updated_at: new Date().toISOString(),
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    archived: false,
    private: false,
  },
  {
    id: 2,
    name: 'octomind',
    description: 'Sistema inteligente de automação para portfólios GitHub',
    html_url: 'https://github.com/meuphilim/octomind',
    homepage: null,
    language: 'JavaScript',
    topics: ['automacao', 'github-actions', 'portfolio', 'ci-cd'],
    updated_at: new Date().toISOString(),
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    archived: false,
    private: false,
  },
];

async function fetchGitHubRepos(username: string, token?: string): Promise<Repository[]> {
  const headers: HeadersInit = {
    'User-Agent': `${username}-portfolio`,
    Accept: 'application/vnd.github.v3+json',
  };

  if (token && token.trim() !== '') {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=public`,
      {
        headers,
        next: { revalidate: 3600 }, // Cache por 1 hora
      },
    );

    if (!response.ok) {
      throw new Error(`Erro da API do GitHub: ${response.status} ${response.statusText}`);
    }

    const repos: Repository[] = await response.json();
    return repos.filter(
      (repo) =>
        !repo.fork && !repo.archived && !repo.private && repo.name && !repo.name.startsWith('.'),
    );
  } catch (error) {
    console.error('Erro ao buscar repositórios do GitHub:', error);
    throw error;
  }
}

export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    const GITHUB_USERNAME =
      process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'meuphilim';
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    console.log(`🔍 Buscando repositórios para: ${GITHUB_USERNAME}`);

    try {
      const repos = await fetchGitHubRepos(GITHUB_USERNAME, GITHUB_TOKEN);

      console.log(`📚 Encontrados ${repos.length} repositórios`);

      return NextResponse.json({
        success: true,
        count: repos.length,
        repos,
        auth: GITHUB_TOKEN ? 'token' : 'publico',
      });
    } catch (apiError) {
      console.warn('⚠️ API do GitHub falhou, usando dados de fallback');

      return NextResponse.json({
        success: true,
        count: FALLBACK_REPOS.length,
        repos: FALLBACK_REPOS,
        auth: 'fallback',
        error: apiError instanceof Error ? apiError.message : 'Erro desconhecido',
      });
    }
  } catch (error) {
    console.error('❌ Erro crítico:', error);

    return NextResponse.json(
      {
        success: false,
        count: FALLBACK_REPOS.length,
        repos: FALLBACK_REPOS,
        auth: 'fallback',
        error: 'Falha ao buscar repositórios',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 200 }, // Retornar 200 para evitar falhas de build
    );
  }
}
