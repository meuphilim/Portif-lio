import { NextResponse } from "next/server"

const GITHUB_USERNAME = process.env.GITHUB_USERNAME
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

export async function GET() {
  try {
    if (!GITHUB_USERNAME) {
      return NextResponse.json({ error: "GITHUB_USERNAME não configurado" }, { status: 500 })
    }

    const headers: HeadersInit = {
      "User-Agent": `${GITHUB_USERNAME}-portfolio`,
      Accept: "application/vnd.github.v3+json",
    }

    if (GITHUB_TOKEN) {
      headers.Authorization = `token ${GITHUB_TOKEN}`
    }

    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      headers,
      next: { revalidate: 600 }, // Cache por 10 minutos
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const repos = await response.json()

    // Filtrar repositórios
    const filteredRepos = repos.filter(
      (repo: any) => !repo.fork && !repo.archived && !repo.private && repo.name && !repo.name.startsWith("."),
    )

    return NextResponse.json(filteredRepos)
  } catch (error) {
    console.error("Erro ao buscar repositórios:", error)
    return NextResponse.json({ error: "Falha ao buscar repositórios" }, { status: 500 })
  }
}
