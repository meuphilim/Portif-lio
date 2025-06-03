// utils/fetchLanguages.ts
import type { Repository } from "@/types/portfolio"

export async function fetchLanguages(repos: Repository[]) {
  const languagesData: Record<string, number> = {}

  const requests = repos.map(async (repo) => {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // opcional
          },
        }
      )

      const data = await res.json()

for (const [lang, bytes] of Object.entries(data) as [string, number][]) {
  languagesData[lang] = (languagesData[lang] || 0) + bytes
}
    } catch (err) {
      console.error(`Erro ao carregar linguagens de ${repo.name}`, err)
    }
  })

  await Promise.all(requests)

  return languagesData
}
