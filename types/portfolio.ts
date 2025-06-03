export interface Repository {
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
  owner: {
    login: string;
  };
}

export interface ApiResponse {
  success: boolean;
  count: number;
  repos: Repository[];
  error?: string;
  message?: string;
  auth?: string;
}

export interface PortfolioData {
  repos: Repository[];
  loading: boolean;
  error: string | null;
  authStatus: string | null;
  diagnosticInfo: string | null;
}
