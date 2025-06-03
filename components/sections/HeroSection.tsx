interface HeroSectionProps {
  username: string;
  scrollToSection?: (section: string) => void;
}

export default function HeroSection({ username, scrollToSection }: HeroSectionProps) {
  const handleScroll = (section: string) => {
    if (scrollToSection) {
      scrollToSection(section);
    } else {
      // Fallback para scroll padrão
      const element = document.querySelector(section);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center pt-20 relative bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* Efeito de fundo sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 w-[60vw] h-[60vw] bg-blue-500 opacity-5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>

      {/* Padrão de pontos de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

      <div className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center relative z-10">
        {/* Conteúdo de texto */}
        <div className="md:w-1/2 mb-12 md:mb-0 hero-text">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Transformando ideias
            </span>
            <br />
            em experiências digitais
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg">
            Sou {username}, desenvolvedor de soluções digitais com anos de experiência criando 
            aplicações inovadoras e impactantes para clientes em diversos setores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => handleScroll('#projects')}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Ver projetos
            </button>
            <button 
              onClick={() => handleScroll('#contact')}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-blue-500 hover:text-blue-500 hover:scale-105 transition-all duration-300"
            >
              Contato
            </button>
          </div>
        </div>

        {/* Imagem do avatar */}
        <div className="md:w-1/2 flex justify-center hero-image">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {/* Efeito de fundo gradiente */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse" />
            
            {/* Container do avatar */}
            <div className="absolute inset-0 bg-white rounded-full shadow-2xl flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-500">
              <img 
                src={`https://github.com/${username}.png?size=300`} 
                alt={`${username} avatar`} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Ícone de terminal no canto */}
            <div className="absolute -bottom-4 -right-4 bg-white border-2 border-blue-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
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
    </section>
  );
}