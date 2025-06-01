import { NextResponse } from "next/server"

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "meuphilim"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

// Adicionar logs mais detalhados para debugging
export async function GET() {
  try {
    const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true"
    const isGitHubActions = process.env.GITHUB_ACTIONS === "true"

    console.log(`🔧 Ambiente: Vercel=${isVercel}, GitHub Actions=${isGitHubActions}`)
    console.log(`🔍 Buscando repositórios para: ${GITHUB_USERNAME}`)

    const headers: HeadersInit = {
      "User-Agent": `${GITHUB_USERNAME}-portfolio`,
      Accept: "application/vnd.github.v3+json",
    }

    if (GITHUB_TOKEN) {
      headers.Authorization = `token ${GITHUB_TOKEN}`
      console.log("🔑 Usando token de autenticação")
    } else {
      console.log("⚠️ Sem token - usando API pública")
    }

    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      headers,
      next: { revalidate: 600 }, // Cache por 10 minutos
    })

    if (!response.ok) {
      console.error(`❌ GitHub API error: ${response.status} ${response.statusText}`)
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const repos = await response.json()
    console.log(`📚 Encontrados ${repos.length} repositórios`)

    // Filtrar repositórios
    const filteredRepos = repos.filter(
      (repo: any) => !repo.fork && !repo.archived && !repo.private && repo.name && !repo.name.startsWith("."),
    )

    console.log(`🔍 Filtrados ${filteredRepos.length} repositórios`)

    return NextResponse.json({
      success: true,
      count: filteredRepos.length,
      repos: filteredRepos,
      environment: {
        vercel: isVercel,
        githubActions: isGitHubActions,
        username: GITHUB_USERNAME,
        hasToken: !!GITHUB_TOKEN,
      },
    })
  } catch (error) {
    console.error("❌ Erro ao buscar repositórios:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao buscar repositórios",
        message: error instanceof Error ? error.message : "Erro desconhecido",
        environment: {
          vercel: process.env.VERCEL === "1" || process.env.VERCEL === "true",
          githubActions: process.env.GITHUB_ACTIONS === "true",
          username: GITHUB_USERNAME,
          hasToken: !!GITHUB_TOKEN,
        },
      },
      { status: 500 },
    )
  }
}
