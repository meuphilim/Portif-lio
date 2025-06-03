import React, { useEffect, useState } from "react";

interface Repository {
  name: string;
  full_name: string;
}

interface LanguageData {
  [language: string]: number;
}

interface LanguagesSectionProps {
  username: string; // Nome do usuário do GitHub
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ username }) => {
  const [languageStats, setLanguageStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const languageColors: Record<string, string> = {
    TypeScript: "#3B82F6",
    JavaScript: "#F59E0B",
    Python: "#22C55E",
    Java: "#EF4444",
    HTML: "#F97316",
    CSS: "#8B5CF6",
    Shell: "#84CC16",
    Go: "#06B6D4",
    Rust: "#737373",
    Outros: "#9CA3AF",
  };

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
  };

  useEffect(() => {
    const fetchReposAndLanguages = async () => {
      try {
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        if (!reposResponse.ok) throw new Error("Erro ao buscar repositórios");

        const repos: Repository[] = await reposResponse.json();
        const allLanguageData: Record<string, number> = {};

        for (const repo of repos) {
          const langResponse = await fetch(`https://api.github.com/repos/${repo.full_name}/languages`);
          if (!langResponse.ok) continue;

          const langData: LanguageData = await langResponse.json();

          Object.entries(langData).forEach(([lang, bytes]) => {
            allLanguageData[lang] = (allLanguageData[lang] || 0) + bytes;
          });
        }

        setLanguageStats(allLanguageData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os dados do GitHub.");
        setLoading(false);
      }
    };

    fetchReposAndLanguages();
  }, [username]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Carregando...</h3>
          <div className="animate-pulse h-4 bg-gray-200 rounded w-full max-w-4xl mx-auto"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  const totalBytes = Object.values(languageStats).reduce((acc, val) => acc + val, 0);
  const sortedLanguages = Object.entries(languageStats)
    .map(([name, bytes]) => ({
      name,
      percentage: ((bytes / totalBytes) * 100).toFixed(1),
    }))
    .filter(lang => parseFloat(lang.percentage) > 0.1)
    .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage))
    .slice(0, 8);

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">📈 Linguagens Mais Utilizadas</h3>
          <p className="text-lg text-gray-600">Distribuição percentual real das linguagens nos projetos.</p>
        </div>

        {/* Badges como legenda visual */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-6">
          {sortedLanguages.map(({ name, percentage }) => {
            const color = languageColors[name] || languageColors.Outros;
            // Garante que a porcentagem esteja formatada corretamente
const labelText = encodeURIComponent(language); // Ex: JavaScript
const messageText = encodeURIComponent(`${count} projeto${count !== 1 ? 's' : ''} (${percentage}%)`);
const textColorParam = ["F7DF1E", "89E051"].includes(color) ? "&logoColor=black" : "&logoColor=white";
const logoParam = languageLogos[language] ? `&logo=${encodeURIComponent(languageLogos[language])}` : '';
const badgeUrl = `https://img.shields.io/badge/${labelText}-${messageText}-${color}?style=for-the-badge${logoParam}${textColorParam}`;
            return (
              <img
                key={name}
                src={badgeUrl}
                alt={`${name} - ${percentage}%`}
                className="h-8 transition-transform hover:scale-105"
                title={`${name}: ${percentage}%`}
              />
            );
          })}
        </div>

        {/* Gráfico de barra única minimalista */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex relative">
              {sortedLanguages.map(({ name, percentage }) => {
                const color = colorMap[name] || colorMap.Outros;
                return (
                  <div
                    key={name}
                    className="h-full group relative"
                    style={{ width: `${percentage}%`, backgroundColor: `rgb(${color})` }}
                    title={`${name}: ${Math.round(parseFloat(percentage))}%`}
                  >
                    {parseFloat(percentage) > 10 && (
                      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white mix-blend-difference">
                        {Math.round(parseFloat(percentage))}%
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;
