import type { Repository } from "@/types/portfolio"
import { getLanguageColors, getLanguageLogos } from "@/utils/portfolio"

interface LanguagesSectionProps {
  repos: Repository[]
}

export default function LanguagesSection({ repos }: LanguagesSectionProps) {
  // Calcular estatísticas de linguagens
  const languageStats = repos.reduce(
    (acc, repo) => {
      const lang = repo.language || "Outros"
      acc[lang] = (acc[lang] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const totalRepos = repos.length
  const sortedLanguages = Object.entries(languageStats)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 8)

  const languageColors = getLanguageColors()
  const languageLogos = getLanguageLogos()

  // Mapeamento de cores RGB para o gráfico
  const colorMap: Record<string, string> = {
    TypeScript: "59, 130, 246",
    JavaScript: "245, 158, 11",
    Python: "34, 197, 94",
    Java: "239, 68, 68",
    HTML: "249, 115, 22",
    CSS: "168, 85, 247",
    Shell: "132, 204, 22",
    Go: "6, 182, 212",
    Rust: "115, 115, 115",
    Outros: "156, 163, 175",
  }

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">📈 Linguagens Mais Utilizadas</h3>
          <p className="text-lg text-gray-600">Distribuição percentual das linguagens nos projetos.</p>
        </div>

        {/* Badges como legenda visual */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-6">
          {sortedLanguages.map(([language, count]) => {
            const percentage = totalRepos > 0 ? Math.round((count / totalRepos) * 100) : 0
            const color = languageColors[language] || languageColors.Outros
            const logo = languageLogos[language] ? `&logo=${languageLogos[language]}` : ""
            const textColor = ["F7DF1E", "89E051"].includes(color) ? "&logoColor=black" : ""

            const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(language)}-${count}_projeto${count !== 1 ? "s" : ""}_(${percentage}%25)-${color}?style=for-the-badge${logo}${textColor}`

            return (
              <img
                key={language}
                src={badgeUrl || "/placeholder.svg"}
                alt={`${language} - ${count} projeto${count !== 1 ? "s" : ""} (${percentage}%)`}
                className="h-8 transition-transform hover:scale-105"
                title={`${language}: ${count} projeto${count !== 1 ? "s" : ""} (${percentage}%)`}
              />
            )
          })}
        </div>

        {/* Gráfico de barra única minimalista */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex relative">
              {sortedLanguages.map(([language, count]) => {
                const percentage = (count / totalRepos) * 100
                const color = colorMap[language] || colorMap.Outros
                
                return (
                  <div 
                    key={language}
                    className="h-full relative group"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: `rgb(${color})`,
                    }}
                    title={`${language}: ${Math.round(percentage)}%`}
                  >
                    {percentage > 10 && (
                      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white mix-blend-difference">
                        {Math.round(percentage)}%
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
