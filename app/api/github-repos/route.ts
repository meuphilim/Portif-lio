import { NextResponse } from "next/server"

export const dynamic = "force-static"
export const revalidate = 3600 // Revalidate every hour

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
  fork: boolean
  archived: boolean
  private: boolean
}

interface ApiResponse {
  success: boolean
  count: number
  repos: Repository[]
  auth: "token" | "public" | "fallback"
  error?: string
  message?: string
}

// Fallback data for when API is unavailable
const FALLBACK_REPOS: Repository[] = [
  {
    id: 1,
    name: "portfolio-generator",
    description: "Automated GitHub portfolio generator with CI/CD deployment",
    html_url: "https://github.com/meuphilim/portfolio-generator",
    homepage: null,
    language: "TypeScript",
    topics: ["portfolio", "github", "automation", "nextjs", "vercel"],
    updated_at: new Date().toISOString(),
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    archived: false,
    private: false,
  },
  {
    id: 2,
    name: "octomind",
    description: "Intelligent automation system for GitHub portfolios",
    html_url: "https://github.com/meuphilim/octomind",
    homepage: null,
    language: "JavaScript",
    topics: ["automation", "github-actions", "portfolio", "ci-cd"],
    updated_at: new Date().toISOString(),
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    archived: false,
    private: false,
  },
]

async function fetchGitHubRepos(username: string, token?: string): Promise<Repository[]> {
  const headers: HeadersInit = {
    "User-Agent": `${username}-portfolio`,
    Accept: "application/vnd.github.v3+json",
  }

  if (token && token.trim() !== "") {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=public`,
      {
        headers,
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const repos: Repository[] = await response.json()
    return repos.filter(
      (repo) => !repo.fork && !repo.archived && !repo.private && repo.name && !repo.name.startsWith("."),
    )
  } catch (error) {
    console.error("Error fetching GitHub repos:", error)
    throw error
  }
}

export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    const GITHUB_USERNAME = process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "meuphilim"
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN

    console.log(`🔍 Fetching repositories for: ${GITHUB_USERNAME}`)

    try {
      const repos = await fetchGitHubRepos(GITHUB_USERNAME, GITHUB_TOKEN)

      console.log(`📚 Found ${repos.length} repositories`)

      return NextResponse.json({
        success: true,
        count: repos.length,
        repos,
        auth: GITHUB_TOKEN ? "token" : "public",
      })
    } catch (apiError) {
      console.warn("⚠️ GitHub API failed, using fallback data")

      return NextResponse.json({
        success: true,
        count: FALLBACK_REPOS.length,
        repos: FALLBACK_REPOS,
        auth: "fallback",
        error: apiError instanceof Error ? apiError.message : "Unknown error",
      })
    }
  } catch (error) {
    console.error("❌ Critical error:", error)

    return NextResponse.json(
      {
        success: false,
        count: FALLBACK_REPOS.length,
        repos: FALLBACK_REPOS,
        auth: "fallback",
        error: "Failed to fetch repositories",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 200 }, // Return 200 to avoid build failures
    )
  }
}
