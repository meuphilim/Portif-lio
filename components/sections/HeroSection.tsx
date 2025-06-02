interface HeroSectionProps {
  username: string
}

export default function HeroSection({ username }: HeroSectionProps) {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 overflow-hidden"
    >
      {/* Sutil gradiente de luz */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 w-[60vw] h-[60vw] bg-indigo-600 opacity-10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
      </div>

      {/* Gráfico de fundo animado */}
      <div className="absolute inset-0 bg-[radial-gradient(#2d2d2d_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Prazer, sou <span className="text-indigo-400">{username}</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-10 text-gray-300 max-w-xl">
              Desenvolvedor Full Stack com foco em performance, acessibilidade e soluções digitais que realmente fazem a
              diferença.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="bg-indigo-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-400 transition-colors shadow-md"
              >
                Ver Projetos
              </a>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-300 text-gray-100 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 hover:text-gray-900 transition-colors shadow-md"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <img
                src={`https://github.com/${username}.png?size=300`}
                alt={`${username} avatar`}
                className="w-64 h-64 lg:w-80 lg:h-80 rounded-full border-4 border-gray-700 shadow-xl"
              />
              {/* Ícone de terminal no canto inferior */}
              <div className="absolute -bottom-4 -right-4 bg-gray-800 border border-indigo-500 w-14 h-14 rounded-full flex items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
