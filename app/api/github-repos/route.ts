import { NextResponse } from "next/server"

export const dynamic = "force-static"
export const revalidate = 3600 // Revalidar a cada hora

export async function GET() {
  try {
    // Gerar dados estáticos durante o build
    const GITHUB_USERNAME = process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "meuphilim"
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN

    console.log(`🔍 Buscando repositórios para: ${GITHUB_USERNAME}`)

    const headers: HeadersInit = {
      "User-Agent": `${GITHUB_USERNAME}-portfolio`,
      Accept: "application/vnd.github.v3+json",
    }

    if (GITHUB_TOKEN && GITHUB_TOKEN.trim() !== "") {
      headers.Authorization = `Bearer ${GITHUB_TOKEN}`
      console.log("🔑 Usando token de autenticação")
    } else {
      console.log("⚠️ Sem token - usando API pública (limitada)")
    }

    console.log(`📡 Fazendo requisição para: https://api.github.com/users/${GITHUB_USERNAME}/repos`)
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      headers,
      // Remover next.revalidate para export estático
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ GitHub API error: ${response.status} ${response.statusText}`)
      console.error(`Response body: ${errorText}`)

      if ((response.status === 401 || response.status === 403) && headers.Authorization) {
        console.log("🔄 Tentando novamente sem token...")

        delete headers.Authorization

        const retryResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
          {
            headers,
          },
        )

        if (!retryResponse.ok) {
          throw new Error(`GitHub API retry failed: ${retryResponse.status} ${retryResponse.statusText}`)
        }

        const repos = await retryResponse.json()
        console.log(`📚 Encontrados ${repos.length} repositórios (sem autenticação)`)

        const filteredRepos = repos.filter(
          (repo: any) => !repo.fork && !repo.archived && !repo.private && repo.name && !repo.name.startsWith("."),
        )

        return NextResponse.json({
          success: true,
          count: filteredRepos.length,
          repos: filteredRepos,
          auth: "public",
        })
      }

      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const repos = await response.json()
    console.log(`📚 Encontrados ${repos.length} repositórios`)

    const filteredRepos = repos.filter(
      (repo: any) => !repo.fork && !repo.archived && !repo.private && repo.name && !repo.name.startsWith("."),
    )

    console.log(`🔍 Filtrados ${filteredRepos.length} repositórios`)

    return NextResponse.json({
      success: true,
      count: filteredRepos.length,
      repos: filteredRepos,
      auth: headers.Authorization ? "token" : "public",
    })
  } catch (error) {
    console.error("❌ Erro ao buscar repositórios:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao buscar repositórios",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
