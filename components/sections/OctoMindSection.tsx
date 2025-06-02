interface OctoMindSectionProps {
  authStatus: string | null
  repoCount: number
}

export default function OctoMindSection({ authStatus, repoCount }: OctoMindSectionProps) {
  return (
    <section id="octomind" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <img
              src="/placeholder.svg?height=64&width=64"
              alt="OctoMind - Polvo inteligente representando automação GitHub"
              className="w-16 h-16 mr-4"
            />
            <h2 className="text-4xl font-bold text-gray-800">Projeto OctoMind</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sistema inteligente de automação que mantém este portfólio sempre atualizado com os repositórios mais
            recentes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card: Como Funciona */}
          <div className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-purple-600 flex items-center">
              <span className="text-2xl mr-2">⚙️</span>
              Como Funciona
            </h3>
            <p className="mb-4 text-gray-600">
              Este portfólio <strong>OctoMind</strong> é automatizado através de:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                <strong>Script Node.js</strong>: Coleta dados dos repositórios via API do GitHub
              </li>
              <li>
                <strong>GitHub Actions</strong>: Executa o script automaticamente a cada 12 horas
              </li>
              <li>
                <strong>Vercel & GitHub Pages</strong>: Deploy automático em múltiplas plataformas
              </li>
              <li>
                <strong>Cache Inteligente</strong>: Otimiza requisições e melhora performance
              </li>
            </ol>
          </div>

          {/* Card: Tecnologias */}
          <div className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-purple-600 flex items-center">
              <span className="text-2xl mr-2">🛠️</span>
              Tecnologias
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Node.js", color: "green-500" },
                { name: "GitHub Actions", color: "blue-500" },
                { name: "GitHub Pages", color: "purple-500" },
                { name: "GitHub API", color: "orange-500" },
                { name: "Vercel", color: "black" },
                { name: "Next.js", color: "blue-600" },
              ].map((tech) => (
                <div key={tech.name} className="flex items-center space-x-2">
                  <span className={`w-2 h-2 bg-${tech.color} rounded-full`}></span>
                  <span className="text-gray-700">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Benefícios */}
          <div className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-purple-600 flex items-center">
              <span className="text-2xl mr-2">✨</span>
              Benefícios
            </h3>
            <ul className="space-y-2 text-gray-700">
              {[
                "Atualização automática sem intervenção manual",
                "Estatísticas sempre precisas e atualizadas",
                "Deploy em múltiplas plataformas simultaneamente",
                "Fallback inteligente em caso de falhas",
              ].map((benefit) => (
                <li key={benefit} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Card: Monitoramento */}
          <div className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-4 text-purple-600 flex items-center">
              <span className="text-2xl mr-2">📊</span>
              Monitoramento
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Status da API</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {authStatus === "token" ? "Autenticada" : authStatus === "public" ? "Pública" : "Demonstração"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Repositórios</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{repoCount} ativos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Última atualização</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {new Date().toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Interessado no OctoMind?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Este sistema pode ser adaptado para automatizar seu próprio portfólio. Confira o código-fonte e
              documentação completa no GitHub.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/meuphilim/OctoMind"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Ver Código-Fonte
              </a>
              <a
                href="https://github.com/meuphilim/OctoMind/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                Documentação
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
